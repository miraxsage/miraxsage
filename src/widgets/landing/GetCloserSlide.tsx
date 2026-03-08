"use client";
import { getThemeColor, useLandingColor } from "@/shared/lib/theme";
import { mix } from "@/shared/lib/colors";
import { Box, SxProps, alpha, lighten, useMediaQuery, useTheme } from "@mui/material";
import FloatingLine from "./FloatingLine";
import { useColorMode, useLanguage } from "@/shared/lib/store/appearanceSlice";
import __ from "@/shared/lib/i18n/translation";
import { useUiLabels } from "@/entities/ui-labels/model/uiLabelsContext";
import { CategoryLabelsContext } from "@/entities/resume/model/categoryLabels";
import type { GetCloserItem, FooterItem, ContactItem } from "./MainSlide";
import renderContent from "./AboutSlide/renderContent";
import AccentedTreeView from "@/shared/ui/AccentedTreeView";
import DynamicIcon from "@/shared/ui/DynamicIcon";
import TransparentButton from "./TransparentButton";
import MessageIcon from "@mui/icons-material/Message";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import Copyright from "./Copyright";
import { useRouter } from "next/navigation";

type SpecialButtonProps = {
    children: ReactNode;
    sx?: SxProps;
    link: string;
};
export function SpecialButton({ children, link, sx }: SpecialButtonProps) {
    const isDarkMode = useColorMode().dark;
    const theme = useTheme();
    const textColor = useLandingColor("contrast");
    const paleTextColor = isDarkMode ? lighten(theme.palette.divider, 0.35) : lighten(textColor, 0.2);
    const router = useRouter();
    const linkClick = () => {
        if (link.startsWith("/")) router.push(link);
        else window.open(link, "_blank");
    };
    return (
        <TransparentButton
            onClick={linkClick}
            dividerSize="removed"
            sx={{
                width: "225px",
                fontSize: "22px",
                lineHeight: 1.1,
                textAlign: "left",
                justifyContent: "start",
                "& .MuiSvgIcon-root": {
                    fontSize: "25px",
                    marginRight: "10px",
                },
                border: "1px solid white",
                padding: "12px 20px",
                color: paleTextColor,
                borderColor: theme.palette.divider,
                [theme.breakpoints.down("sm")]: {
                    fontSize: "20px",
                    width: "auto",
                    padding: "8px 0px 8px 8px",
                },
                ...sx,
            }}
        >
            {children}
        </TransparentButton>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sortBySortOrder(items: any[]): any[] {
    return items
        .filter(Boolean)
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map(({ sort_order: _so, ...rest }) => rest);
}

function arrayContainsSubstring(array: string[], substring: string) {
    return array.some((item) => item.includes(substring));
}

function parseTitleParts(raw: string): [string, string, string, string?] {
    const match = raw.match(/^(.*?)\[(.+?)\](.+?)(?:\s+(.+))?$/);
    if (!match) return [raw, "", "", undefined];
    return [match[1].trimEnd(), match[2], match[3], match[4]?.trim() || undefined];
}

export default function GetCloserSlide({ getCloser, footer, contacts }: { getCloser: GetCloserItem | null; footer: FooterItem[]; contacts: ContactItem[] }) {
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    const router = useRouter();
    const lang = useLanguage();
    const t = useUiLabels();
    const catLabels = useContext(CategoryLabelsContext);
    const catLabel = (slug: string) => {
        const entry = catLabels[slug];
        if (!entry) return __(slug.charAt(0).toUpperCase() + slug.slice(1));
        return lang.lang === "en" ? entry.label_en : entry.label_ru;
    };
    const layoutBackgroundColor = getThemeColor("layoutBackground", theme);
    const textColor = useLandingColor("contrast");
    const accentColor = useLandingColor("accentA");
    const accentBColor = useLandingColor("accentB");
    const darkPaleAccent = mix(accentColor, "#777777", 0.6);
    const paleTextColor = isDarkMode ? lighten(theme.palette.divider, 0.35) : lighten(textColor, 0.2);
    const textGradiend = `linear-gradient(200deg, ${alpha(
        mix(layoutBackgroundColor, accentBColor, 0.08),
        1
    )}, ${layoutBackgroundColor} 40%)`;
    const sm = useMediaQuery(theme.breakpoints.down("sm"));
    const [openedNodes, setOpenedNodes] = useState(() =>
        [
            catLabels["biography"] ? "/about/biography" : null,
            catLabels["experience"] ? "/about/experience" : null,
            catLabels["specifications"] ? "/about/specifications" : null,
        ].filter(Boolean) as string[]
    );

    const hasTreeItems = !!(
        catLabels["biography"] ||
        catLabels["experience"] ||
        catLabels["specifications"] ||
        catLabels["snippets"]
    );
    const bioOpen = !!catLabels["biography"] && arrayContainsSubstring(openedNodes, "biography");
    const expOpen = !!catLabels["experience"] && arrayContainsSubstring(openedNodes, "experience");

    const treeRef = useRef<HTMLDivElement>(null);
    const catLabelsRef = useRef(catLabels);
    useEffect(() => { catLabelsRef.current = catLabels; }, [catLabels]);
    const [treeHeight, setTreeHeight] = useState(0);
    useEffect(() => {
        const el = treeRef.current;
        if (!el) return;
        const getContentHeight = () => {
            const treeEl = el.querySelector('[role="tree"]') as HTMLElement | null;
            if (!treeEl) return (el.firstElementChild as HTMLElement)?.scrollHeight ?? 0;
            const topItems = Array.from(treeEl.querySelectorAll(':scope > li[role="treeitem"]')) as HTMLElement[];
            const treeRefTop = el.getBoundingClientRect().top;
            // If projects is visible, stop at its center (id ends with "-/projects")
            if (catLabelsRef.current["projects"]) {
                const projectsEl = treeEl.querySelector('[id$="-/projects"]') as HTMLElement | null;
                if (projectsEl) {
                    const pRect = projectsEl.getBoundingClientRect();
                    return pRect.top + 20 - treeRefTop;
                }
            }
            // Fallback: if snippets is last, stop before it
            if (catLabelsRef.current["snippets"] && topItems.length > 1) {
                const snippetsEl = topItems[topItems.length - 1];
                return snippetsEl.getBoundingClientRect().top - treeRefTop;
            }
            return treeEl.scrollHeight;
        };
        const observer = new ResizeObserver(() => setTreeHeight(getContentHeight()));
        const treeEl = el.querySelector('[role="tree"]');
        observer.observe(treeEl ?? el);
        setTreeHeight(getContentHeight());
        return () => observer.disconnect();
    }, []);

    const contentRaw = getCloser
        ? (lang.ru ? getCloser.content_ru : getCloser.content_en)
        : (lang.ru
            ? "📜 Вы можете ознакомиться с моим подробным [резюме](/about)\n💼 Посмотреть [портфолио](/projects) с самыми интересными работами\n🤝 Связаться со мной в соцсетях или оставить [сообщение](/interact)"
            : "📜 You can review my detailed [resume](/about)\n💼 Check out the [portfolio](/projects) with my most interesting works\n🤝 Connect with me on social media or leave a [message](/interact)");
    const visibleLines = contentRaw.split("\n").filter((line) => {
        if (line.includes("/about")) return hasTreeItems;
        if (line.includes("/projects")) return !!catLabels["experience"] && !!catLabels["projects"];
        return true;
    });
    const n = visibleLines.length;
    const portfolioLineIdx = visibleLines.findIndex(l => l.includes("/projects"));
    const portfolioRow = portfolioLineIdx + 1; // 1-indexed for CSS grid

    const contactsOnlyBtnSx = !hasTreeItems ? {
        width: "225px",
        [theme.breakpoints.down("sm")]: {
            fontSize: "20px",
            width: "225px",
            padding: "12px 20px",
        },
    } : {};
    const contactsButtons = contacts.length > 0 ? (
        <>
            {contacts.map((contact, i) => {
                const isLast = i === contacts.length - 1;
                const bw = i % 2 === 0
                    ? `0px 0px ${isLast ? "0px" : "1px"} 1px`
                    : `0px 1px ${isLast ? "0px" : "1px"} 0px`;
                return (
                    <SpecialButton key={contact.id} link={contact.url} sx={{ borderWidth: bw, ...contactsOnlyBtnSx }}>
                        <DynamicIcon svg={contact.icon_svg} name={contact.icon} />
                        {(!sm || !hasTreeItems) && (lang.ru ? contact.title_ru : contact.title_en)}
                    </SpecialButton>
                );
            })}
            <SpecialButton link="/interact" sx={contactsOnlyBtnSx}>
                <MessageIcon />
                {(!sm || !hasTreeItems) && t("Write")}
            </SpecialButton>
        </>
    ) : (
        <SpecialButton link="/interact" sx={contactsOnlyBtnSx}>
            <MessageIcon />
            {(!sm || !hasTreeItems) && t("Write")}
        </SpecialButton>
    );

    const treeSection = hasTreeItems ? (
        <Box ref={treeRef} sx={{ gridArea: "3/3/3/4", minWidth: "248px" }}>
        <AccentedTreeView
            intend="double"
            selectionMode="single"
            onToggle={(_e, toggled) => setOpenedNodes(toggled)}
            onItemsSelect={(item) => {
                router.push(item.id);
            }}
            initiallyExpandedNodes={[
                catLabels["biography"] ? "/about/biography" : null,
                catLabels["experience"] ? "/about/experience" : null,
                catLabels["specifications"] ? "/about/specifications" : null,
            ].filter(Boolean) as string[]}
            sx={{
                "& .MuiTreeItem-root": {
                    "&:before": {
                        top: "20px",
                    },
                    "&:last-child:before": {
                        top: "20px",
                        height: "calc(100% - 20px)",
                    },
                    "& .MuiTreeItem-content": {
                        background: "transparent !important",
                        "&:hover .MuiTreeItem-label, &:hover .MuiTreeItem-iconContainer svg": {
                            color: (isDarkMode ? textColor : accentColor) + " !important",
                        },
                        "& .MuiTreeItem-label": {
                            transition: "color 0.2s",
                            fontSize: "22px",
                            marginLeft: "5px",
                            color: paleTextColor + " !important",
                        },
                    },
                },
                "& .MuiTreeItem-root .MuiTreeItem-content .MuiTreeItem-iconContainer svg": {
                    fontSize: "25px",
                    transition: "color 0.2s",
                    color: paleTextColor + " !important",
                },
                "& .MuiTreeItem-root .MuiTreeItem-root .MuiTreeItem-content .MuiTreeItem-iconContainer svg":
                    {
                        marginLeft: "5px",
                    },
                [theme.breakpoints.down("sm")]: {
                    [`& .MuiTreeItem-root .MuiTreeItem-content .MuiTreeItem-iconContainer svg,
                        & .MuiTreeItem-root .MuiTreeItem-content .MuiTreeItem-label`]: {
                        fontSize: "20px",
                    },
                },
            }}
        >
            {sortBySortOrder([
                catLabels["biography"] && {
                    id: "/about/biography",
                    title: catLabel("biography"),
                    icon: <DynamicIcon name={catLabels["biography"].icon} svg={catLabels["biography"].icon_svg} />,
                    sort_order: catLabels["biography"]?.sort_order ?? 0,
                    children: sortBySortOrder([
                        catLabels["general"] && { id: "/about/biography/general", title: catLabel("general"), icon: <DynamicIcon name={catLabels["general"].icon} svg={catLabels["general"].icon_svg} />, sort_order: catLabels["general"]?.sort_order ?? 0 },
                        catLabels["education"] && { id: "/about/biography/education", title: catLabel("education"), icon: <DynamicIcon name={catLabels["education"].icon} svg={catLabels["education"].icon_svg} />, sort_order: catLabels["education"]?.sort_order ?? 0 },
                        catLabels["labor"] && { id: "/about/biography/labor", title: catLabel("labor"), icon: <DynamicIcon name={catLabels["labor"].icon} svg={catLabels["labor"].icon_svg} />, sort_order: catLabels["labor"]?.sort_order ?? 0 },
                        catLabels["questionaire"] && { id: "/about/biography/questionaire", title: catLabel("questionaire"), icon: <DynamicIcon name={catLabels["questionaire"].icon} svg={catLabels["questionaire"].icon_svg} />, sort_order: catLabels["questionaire"]?.sort_order ?? 0 },
                    ]),
                },
                catLabels["experience"] && {
                    id: "/about/experience",
                    title: catLabel("experience"),
                    icon: <DynamicIcon name={catLabels["experience"].icon} svg={catLabels["experience"].icon_svg} />,
                    sort_order: catLabels["experience"]?.sort_order ?? 0,
                    children: sortBySortOrder([
                        catLabels["technologies"] && { id: "/about/experience/technologies", title: catLabel("technologies"), icon: <DynamicIcon name={catLabels["technologies"].icon} svg={catLabels["technologies"].icon_svg} />, sort_order: catLabels["technologies"]?.sort_order ?? 0 },
                        catLabels["achievements"] && { id: "/about/experience/achievements", title: catLabel("achievements"), icon: <DynamicIcon name={catLabels["achievements"].icon} svg={catLabels["achievements"].icon_svg} />, sort_order: catLabels["achievements"]?.sort_order ?? 0 },
                        catLabels["projects"] && { id: "/projects", title: catLabel("projects"), icon: <DynamicIcon name={catLabels["projects"].icon} svg={catLabels["projects"].icon_svg} />, sort_order: catLabels["projects"]?.sort_order ?? 0 },
                    ]),
                },
                catLabels["specifications"] && {
                    id: "/about/specifications",
                    title: catLabel("specifications"),
                    icon: <DynamicIcon name={catLabels["specifications"].icon} svg={catLabels["specifications"].icon_svg} />,
                    sort_order: catLabels["specifications"]?.sort_order ?? 0,
                    children: sortBySortOrder([
                        catLabels["soft-skills"] && { id: "/about/specifications/soft-skills", title: catLabel("soft-skills"), icon: <DynamicIcon name={catLabels["soft-skills"].icon} svg={catLabels["soft-skills"].icon_svg} />, sort_order: catLabels["soft-skills"]?.sort_order ?? 0 },
                        catLabels["hard-skills"] && { id: "/about/specifications/hard-skills", title: catLabel("hard-skills"), icon: <DynamicIcon name={catLabels["hard-skills"].icon} svg={catLabels["hard-skills"].icon_svg} />, sort_order: catLabels["hard-skills"]?.sort_order ?? 0 },
                        catLabels["metrics"] && { id: "/about/specifications/metrics", title: catLabel("metrics"), icon: <DynamicIcon name={catLabels["metrics"].icon} svg={catLabels["metrics"].icon_svg} />, sort_order: catLabels["metrics"]?.sort_order ?? 0 },
                    ]),
                },
                catLabels["snippets"] && {
                    id: "/about/snippets",
                    title: catLabel("snippets"),
                    icon: <DynamicIcon name={catLabels["snippets"].icon} svg={catLabels["snippets"].icon_svg} />,
                    sort_order: catLabels["snippets"]?.sort_order ?? 0,
                },
            ])}
        </AccentedTreeView>
        </Box>
    ) : null;

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                minHeight: "100vh",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: "100%",
                    overflow: "hidden",
                    height: "150%",
                    transformOrigin: "0% 0%",
                    transform: "skew(0, -10deg) translateY(calc(0.1763269807 * 100dvw))",
                    borderTop: `1px solid ${theme.palette.divider}`,
                    background: textGradiend,
                }}
            >
                {!sm && (
                    <Box sx={{ width: "100%", height: "100%", opacity: 0.7 }}>
                        <FloatingLine shift={-25} />
                        <FloatingLine shift={-10} />
                        <FloatingLine shift={0} />
                        <FloatingLine shift={15} />
                        <FloatingLine shift={25} />
                    </Box>
                )}
            </Box>

            <Box
                className="container"
                sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100dvh",
                    margin: "0 auto",
                    padding: "calc(0.1763269807 * 100dvw + 50px) 0 calc(0.1763269807 * 30dvw + 50px)",
                    [theme.breakpoints.down("sm")]: {
                        padding: "calc(0.1763269807 * 100dvw + 50px) 10px calc(0.1763269807 * 30dvw + 50px)",
                    },
                }}
            >
                <Box
                    sx={{
                        fontFamily: "NeueMachina",
                        color: textColor,
                        fontSize: "57px",
                        lineHeight: 1,
                        width: "fit-content",
                        margin: "0 auto",
                        [theme.breakpoints.down("md")]: {
                            fontSize: "42px",
                        },
                    }}
                >
                    <Box
                        sx={{
                            [theme.breakpoints.down("lg")]: {
                                textAlign: "center",
                            },
                        }}
                    >
                        {(() => {
                            const titleRaw = getCloser
                                ? (lang.ru ? getCloser.title_ru : getCloser.title_en)
                                : (lang.ru ? "Познакомимся [ближе]? 🫱🫲" : "Let's get [closer]? 🫱🫲");
                            const [prefix, accent, suffix, emoji] = parseTitleParts(titleRaw);
                            return (
                                <>
                                    {prefix}
                                    {" "}
                                    <Box
                                        sx={{
                                            display: "inline-block",
                                            background: `linear-gradient(25deg, ${accentColor}, ${accentBColor})`,
                                            lineHeight: 1.25,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {accent}
                                    </Box>
                                    {suffix}
                                    {" "}
                                    {emoji && (
                                        <Box
                                            component="span"
                                            sx={{ fontSize: "45px", position: "relative", top: "-4px", whiteSpace: "nowrap" }}
                                        >
                                            {emoji}
                                        </Box>
                                    )}
                                </>
                            );
                        })()}
                    </Box>
                    <Box sx={{ height: "25px" }}></Box>
                    {n > 0 && (
                    <Box
                        sx={{
                            background: `linear-gradient(90deg, ${textColor} 30%, ${darkPaleAccent})`,
                            fontFamily: "Cascadia",
                            lineHeight: 1.5,
                            fontSize: "22px",
                            fontWeight: "500",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "grid",
                            gridTemplate: `${visibleLines.map(() => "auto").join(" ")} / 25px 25px 1fr`,
                            marginTop: "25px",
                            "& .connective-line": {
                                borderColor: theme.palette.divider,
                                position: "relative",
                                marginTop: "20px",
                                "&:after": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    height: "8px",
                                    width: "8px",
                                    top: "-4px",
                                    right: "-4px",
                                    background: theme.palette.divider,
                                    borderRadius: "50%",
                                },
                            },
                            [theme.breakpoints.down("sm")]: {
                                fontSize: "20px",
                            },
                        }}
                    >
                        {n > 1 && (
                        <Box
                            className="connective-line"
                            sx={{ borderWidth: "1px 0px 0px 1px", gridArea: `1/2/${n + 1}/2` }}
                        ></Box>
                        )}
                        {n > 1 && (
                            <Box
                                className="connective-line"
                                sx={{
                                    borderWidth: "0px",
                                    gridArea: `2/2/3/3`,
                                }}
                            ></Box>
                        )}
                        {portfolioRow > 0 && (bioOpen || expOpen) && (
                        <Box
                            sx={{
                                borderColor: theme.palette.divider,
                                borderWidth: "1px 0px 0px 1px",
                                marginTop: "20px",
                                gridArea: `${portfolioRow}/1/${n + 1}/3`,
                            }}
                        ></Box>
                        )}
                        <Box
                            className="connective-line"
                            sx={{ background: theme.palette.divider, width: "1px", gridArea: `${n}/3/${n}/3` }}
                        ></Box>
                        {visibleLines.map((line, i) => (
                            <Box key={i} sx={{ gridArea: `${i + 1}/3/${i + 1}/3`, marginLeft: "20px" }}>
                                {renderContent(line, textColor)}
                            </Box>
                        ))}
                    </Box>
                    )}
                    {hasTreeItems ? (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplate: "25px 25px auto / 25px 25px auto 100px 1fr",
                            [theme.breakpoints.down("md")]: {
                                gridTemplate: "25px 25px auto / 25px 25px auto 50px 1fr",
                            },
                            [theme.breakpoints.down("md")]: {
                                gridTemplate: "25px 25px auto / 25px 25px auto 25px 1fr",
                            },
                            [theme.breakpoints.down("sm")]: {
                                gridTemplate: "25px 25px auto / 25px 25px auto minmax(5px, 15px) 1fr",
                            },
                        }}
                    >
                        {portfolioRow > 0 && (bioOpen || expOpen) && (
                        <Box
                            sx={{
                                width: "95px",
                                height: `${50 + treeHeight}px`,
                                transition: "height 0.3s",
                                borderColor: theme.palette.divider,
                                borderWidth: "0px 0px 1px 1px",
                                gridArea: "1/1/4/4",
                            }}
                        ></Box>
                        )}
                        <Box
                            sx={{
                                height: sm ? "70px" : "73px",
                                borderColor: theme.palette.divider,
                                borderWidth: "0px 0px 1px 1px",
                                gridArea: "1/2/4/2",
                            }}
                        ></Box>
                        <Box sx={{ background: theme.palette.divider, width: "1px", gridArea: "1/3/1/3" }}></Box>
                        <Box sx={{ background: theme.palette.divider, height: "1px", gridArea: "2/3/2/5" }}></Box>
                        <Box sx={{ background: theme.palette.divider, width: "1px", gridArea: "2/5/2/5" }}></Box>
                        {treeSection}
                        <Box
                            sx={{
                                gridArea: "3/5/3/6",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                            }}
                        >
                            {contactsButtons}
                        </Box>
                    </Box>
                    ) : contacts.length > 0 ? (
                    <Box
                        sx={{
                            display: "grid",
                            width: "100%",
                            gridTemplate: "25px 25px auto / 25px 25px calc(50% - 162px) auto",
                        }}
                    >
                        <Box sx={{ background: theme.palette.divider, width: "1px", gridArea: "1/3/1/3" }}></Box>
                        <Box sx={{ background: theme.palette.divider, height: "1px", gridArea: "2/3/2/4" }}></Box>
                        <Box sx={{ background: theme.palette.divider, width: "1px", gridArea: "2/4/2/4" }}></Box>
                        <Box
                            sx={{
                                gridArea: "3/4/3/4",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                            }}
                        >
                            {contactsButtons}
                        </Box>
                    </Box>
                    ) : null}
                </Box>
            </Box>
            <Copyright footer={footer} contacts={contacts} />
        </Box>
    );
}
