"use client";

import __ from "@/shared/lib/i18n/translation";
import { useUiLabels } from "@/entities/ui-labels/model/uiLabelsContext";
import { Box, Button, IconButton, SxProps, alpha, styled, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode } from "react";
import TelegramIcon from "@/shared/icons/TelegramIcon";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import MessageIcon from "@mui/icons-material/Message";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { GitHub } from "@mui/icons-material";
import { getThemeColor } from "@/shared/lib/theme";
import ProjectFiltersList, { projectsCategoriesTreeViewData } from "@/entities/project/ui/FiltersList";
import CustomScrollbar from "@/shared/ui/Scrollbar";
import AboutCategoriesList, { abouteCategoriesTreeViewData } from "@/entities/resume/ui/CategoriesList";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LanguageIcon from "@/shared/icons/LanguageIcon";
import LightModeIcon from "@mui/icons-material/LightMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import TerminalIcon from "@mui/icons-material/Terminal";
import MonitorIcon from "@mui/icons-material/Monitor";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useColorMode, useLanguage, useScreenMode, useSiteMapVisibility, useViewMode } from "@/shared/lib/store/appearanceSlice";
import { cubicBezier, motion } from "framer-motion";
import AccentedTreeView, { AccentedTreeItemProps } from "@/shared/ui/AccentedTreeView";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { CategoryLabelsContext } from "@/entities/resume/model/categoryLabels";
import { capitalize } from "@/shared/lib/string";

const TransparentButton = styled(Button)(({ theme }) => ({
    color: getThemeColor("regularText", theme),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 0,
    minWidth: "150px",
    maxWidth: "180px",
    fontSize: "1rem",
    padding: "3px 10px",
    justifyContent: "start",
    transition: "all 0.2s",
    borderColor: `transparent`,
    "&:hover": {
        background: alpha(theme.palette.divider, 0.3),
        borderColor: theme.palette.divider,
    },
    "& > .MuiSvgIcon-root": {
        fontSize: "19px",
        marginRight: "8px",
        color: getThemeColor("regularIcon", theme),
    },
    "&.accented": {
        color: getThemeColor("secondaryHoverText", theme),
        background: getThemeColor("secondaryBg", theme),
        border: `1px solid ${getThemeColor("secondaryHoverText", theme)}`,
        "& > .MuiSvgIcon-root": {
            color: getThemeColor("secondaryHoverText", theme),
        },
        "&:hover": {
            background: getThemeColor("secondaryHoverBg", theme),
        },
    },
}));

function SpecialButton({
    action,
    className,
    sx,
    children,
}: {
    action: string | (() => void);
    children: ReactNode;
    sx?: SxProps;
    className?: string;
}) {
    const siteMapVisibility = useSiteMapVisibility();
    const router = useRouter();
    const onClick = () => {
        if (typeof action == "function") return action();
        siteMapVisibility.update("collapsed");
        if (action.startsWith("/")) router.push(action);
        else window.open(action, "_blank");
    };
    return (
        <TransparentButton className={className} onClick={onClick} sx={{ minWidth: "150px", ...sx }}>
            {children}
        </TransparentButton>
    );
}

const links: Record<string, string> = {
    resume: "/about",
    biography: "/about/biography",
    general: "/about/biography/general",
    education: "/about/biography/education",
    labor: "/about/biography/labor",
    questionaire: "/about/biography/questionaire",
    experience: "/about/experience",
    technologies: "/about/experience/technologies",
    achievements: "/about/experience/achievements",
    projects: "/about/experience/projects",
    specifications: "/about/specifications",
    "soft-skills": "/about/specifications/soft-skills",
    "hard-skills": "/about/specifications/hard-skills",
    metrics: "/about/specifications/metrics",
    snippets: "/about/snippets",
    telegram: "https://t.me/miraxsage",
    email: "mailto:manin.maxim@mail.ru",
    linkedin: "https://www.linkedin.com/in/miraxsage",
    github: "https://github.com/miraxsage/",
    frontend: "/projects?techs=frontend",
    backend: "/projects?techs=backend",
    desktop: "/projects?techs=desktop",
    contacts: "/interact",
    write: "/interact",
    portfolio: "/projects",
};

function navigateToSection(
    section: string,
    router: ReturnType<typeof useRouter>,
    siteMapVisibility: ReturnType<typeof useSiteMapVisibility>,
    t: (key: string) => string
) {
    siteMapVisibility.update("collapsed");
    if (section in links) {
        const link = links[section as keyof typeof links];
        if (link.match("^(https?:|mailto:)")) window.open(link, "_blank");
        else return router.push(links[section as keyof typeof links]);
    }
    if (section == "download-pdf") {
        window.open(`/${t("Resume (Miraxsage)")}.pdf`, "_blank");
        return;
    }
    router.push(`/projects?techs=${section.toLowerCase()}`);
}

function findActiveCategoriesData(data: AccentedTreeItemProps[], matches: AccentedTreeItemProps[], pathname: string) {
    const stack = [...data];
    while (stack.length > 0) {
        const item = stack.shift()!;
        const link = item.id in links ? links[item.id] : null;
        if (!link) continue;
        if (pathname.includes(link)) matches.push(item);
        if (item.children && item.children.length > 0) stack.push(...item.children);
    }
    return matches;
}

function allCategoriesTreeViewData(pathname: string, selectedItems?: string[], activePathData?: AccentedTreeItemProps[], labelFn?: (slug: string) => string, t?: (key: string) => string) {
    const _ = t ?? __;
    const data = [
        {
            id: "resume",
            title: _("Resume"),
            icon: <AssignmentIndIcon />,
            children: [
                { id: "download-pdf", title: _("Download PDF"), icon: <PictureAsPdfIcon /> },
                ...abouteCategoriesTreeViewData(labelFn),
            ],
        },
        { id: "portfolio", title: _("Portfolio"), children: projectsCategoriesTreeViewData() },
        {
            id: "contacts",
            title: _("Interact"),
            icon: <PhoneIcon />,
            children: [
                { id: "telegram", title: "Telegram", icon: <TelegramIcon /> },
                { id: "email", title: "E-mail", icon: <AlternateEmailOutlinedIcon /> },
                { id: "linkedin", title: "LinkedIn", icon: <LinkedInIcon /> },
                { id: "github", title: "GitHub", icon: <GitHub /> },
                { id: "write", title: _("Write"), icon: <MessageIcon /> },
            ],
        },
    ];
    const matches: AccentedTreeItemProps[] = [];
    findActiveCategoriesData(data, matches, pathname);
    if (activePathData) activePathData.push(...matches);
    if (matches.length > 0) {
        if (matches.length == 1) {
            const match = matches[0]!;
            if (match.children && match.children.length > 0) matches[0].isAccented = true;
            else selectedItems?.push(matches[0].id);
        } else {
            selectedItems?.push(matches.at(-1)!.id);
            matches.at(-2)!.isAccented = true;
        }
    }
    return data;
}

function useCatLabelFn() {
    const labels = useContext(CategoryLabelsContext);
    const lang = useLanguage();
    return (slug: string) => {
        const entry = labels[slug];
        if (!entry) return __(capitalize(slug));
        return lang.lang === "en" ? entry.label_en : entry.label_ru;
    };
}

function MobileSiteMapTreeView() {
    const router = useRouter();
    const pathname = usePathname();
    const theme = useTheme();
    const siteMapVisibility = useSiteMapVisibility();
    const labelFn = useCatLabelFn();
    const t = useUiLabels();
    const itemsToSelect: string[] = [];
    const data = allCategoriesTreeViewData(pathname, itemsToSelect, undefined, labelFn, t);
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <ColorModeButton sx={{ gridArea: "1/5/1/5" }} />
            <LanguageButton sx={{ gridArea: "2/5/2/5" }} />
            <SpecialButton action="/">
                <HomeIcon />
                {t("Home")}
            </SpecialButton>
            <AccentedTreeView
                intend="double"
                initiallyExpandedNodes={["resume", "portfolio", "contacts"]}
                selectionMode="single"
                selectedItems={itemsToSelect.length > 0 ? itemsToSelect[0] : undefined}
                onItemsSelect={(e) => navigateToSection(e.id, router, siteMapVisibility, t)}
                sx={{
                    "& .MuiTreeItem-root .MuiTreeItem-content": {
                        outline: `0px solid ${theme.palette.divider}`,
                        "&:hover": {
                            background: alpha(theme.palette.divider, 0.15),
                            outline: `1px solid ${theme.palette.divider}`,
                            transition: "all 0.3s",
                        },
                    },
                }}
            >
                {data}
            </AccentedTreeView>
        </Box>
    );
}

function ColorModeButton({ sx }: { sx: SxProps }) {
    const colorMode = useColorMode();
    const isDarkMode = colorMode.dark;
    const t = useUiLabels();
    return (
        <SpecialButton action={colorMode.toggle} sx={{ "& .MuiSvgIcon-root": { margin: "0px 7px 0 -2px" }, ...sx }}>
            {isDarkMode ? <LightModeIcon /> : <Brightness4Icon />}
            {t(!isDarkMode ? "Dark mode" : "Light mode")}
        </SpecialButton>
    );
}
function LanguageButton({ sx }: { sx: SxProps }) {
    const lang = useLanguage();
    const t = useUiLabels();
    return (
        <SpecialButton
            action={lang.toggle}
            sx={{
                "& img": {
                    width: "15px",
                    height: "15px",
                    marginRight: "10px",
                    alignSelf: "center",
                    lineHeight: 1,
                },
                ...sx,
            }}
        >
            <LanguageIcon language={lang.lang} />
            {t(lang.ru ? "Русский язык" : "English")}
        </SpecialButton>
    );
}
function ScreenModeButton({ sx }: { sx: SxProps }) {
    const screenMode = useScreenMode();
    const t = useUiLabels();
    return (
        <SpecialButton
            action={screenMode.toggle}
            sx={{
                "& .MuiSvgIcon-root": { margin: "-2px 7px 0 -2px" },
                ...sx,
            }}
        >
            {screenMode.full ? <FullscreenExitIcon /> : <FullscreenIcon />}
            {t(!screenMode.full ? "Full screen" : "In window")}
        </SpecialButton>
    );
}
function ViewModeButton({ sx }: { sx: SxProps }) {
    const viewMode = useViewMode();
    const t = useUiLabels();
    return (
        <SpecialButton
            action={viewMode.toggle}
            sx={{
                "& .MuiSvgIcon-root": { margin: "-2px 7px 0 -2px" },
                ...sx,
            }}
        >
            {viewMode.desktop ? <TerminalIcon /> : <MonitorIcon />}
            {t(viewMode.desktop ? "Console" : "User_interface")}
        </SpecialButton>
    );
}
function ContactButton({
    contact,
    accented,
    borders = "1",
    hoverBorders = "1",
}: {
    contact: "telegram" | "email" | "linkedin" | "github" | "write";
    accented?: boolean;
    borders?: string;
    hoverBorders?: string;
}) {
    const t = useUiLabels();
    const details: { action: string; content: ReactNode } = { action: "", content: "" };
    if (contact == "telegram") {
        details.action = "https://t.me/miraxsage";
        details.content = (
            <>
                <TelegramIcon />
                {"Telegram"}
            </>
        );
    }
    if (contact == "email") {
        details.action = "mailto:manin.maxim@mail.ru";
        details.content = (
            <>
                <AlternateEmailOutlinedIcon />
                {"E-mail"}
            </>
        );
    }
    if (contact == "linkedin") {
        details.action = "https://www.linkedin.com/in/miraxsage";
        details.content = (
            <>
                <LinkedInIcon />
                {"LinkedIn"}
            </>
        );
    }
    if (contact == "github") {
        details.action = "https://github.com/miraxsage/";
        details.content = (
            <>
                <GitHub />
                {"GitHub"}
            </>
        );
    }
    if (contact == "write") {
        details.action = "/interact";
        details.content = (
            <>
                <MessageIcon />
                {t("Write")}
            </>
        );
    }
    const theme = useTheme();
    const contactBorderColor = accented ? getThemeColor("secondaryText", theme) : theme.palette.divider;
    const contactsColor = getThemeColor(accented ? "secondaryHoverText" : "regularText", theme);
    const contactsBackground = accented ? getThemeColor("secondaryHoverBg", theme) : alpha(theme.palette.divider, 0.3);
    return (
        <SpecialButton
            action={details.action}
            sx={{
                borderColor: borders.replaceAll("0", "transparent").replaceAll("1", contactBorderColor),
                "&:hover": {
                    borderColor: hoverBorders.replaceAll("0", "transparent").replaceAll("1", contactBorderColor),
                    color: contactsColor,
                    background: contactsBackground,
                    "& .MuiSvgIcon-root": accented
                        ? {
                              color: contactsColor,
                          }
                        : {},
                },
            }}
        >
            {details.content}
        </SpecialButton>
    );
}

export default function SiteMap() {
    const theme = useTheme();
    const pathname = usePathname();
    const lessMdScreen = useMediaQuery(theme.breakpoints.down("md"));
    const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const betweenSmLgScreen = useMediaQuery(theme.breakpoints.between("sm", "lg"));
    const router = useRouter();
    const siteMapVisibility = useSiteMapVisibility();
    const screenMode = useScreenMode();
    const labelFn = useCatLabelFn();
    const t = useUiLabels();

    let activeChapter = "";
    let activeGroup = "";
    let activeItem = "";

    if (!smScreen) {
        const itemsToSelect: string[] = [];
        const activePathData: AccentedTreeItemProps[] = [];
        allCategoriesTreeViewData(pathname, itemsToSelect, activePathData, labelFn, t);
        if (activePathData.length > 0) {
            activeChapter = activePathData.shift()!.id;
            if (activePathData.length > 1) activeGroup = activePathData.shift()!.id;
            if (activePathData.length > 0) activeItem = activePathData.shift()!.id;
        }
    }

    const isContactsPage = activeChapter == "contacts";

    return (
        <>
            <motion.div
                onClick={siteMapVisibility.toggle}
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 3,
                    background: alpha(getThemeColor("barBackground", theme), 0.8),
                    backdropFilter: "blur(4px)",
                }}
                initial={false}
                animate={{
                    opacity: siteMapVisibility.shown ? 1 : 0,
                    visibility: siteMapVisibility.shown ? "visible" : "hidden",
                    transition: {
                        duration: 0.5,
                        visibility: { delay: siteMapVisibility.shown ? 0 : 0.6 },
                    },
                }}
            ></motion.div>
            <motion.div
                style={{
                    position: "absolute",
                    ...(betweenSmLgScreen && screenMode.window ? { inset: 0 } : { left: 0, top: 0 }),
                    height: "100%",
                    background: getThemeColor("layoutBackground", theme),
                    borderRight: `1px solid ${theme.palette.divider}`,
                    zIndex: 3,
                }}
                initial={false}
                animate={{
                    transition: {
                        duration: 0.3,
                        ease: cubicBezier(0.715, 0.01, 0.915, 0.46),
                    },
                    clipPath: siteMapVisibility.shown
                        ? "xywh(0% calc(-1 * min(15%, 15vh)) 110% calc(min(130%, 130vh)) round 0vmin 0vmin 0vmin 0vmin)"
                        : "xywh(-110% calc(-1 * min(30%, 15vh)) 110% calc(min(160%, 130vh)) round 0vmin 100vmin 100vmin 0vmin)",
                }}
            >
                <IconButton
                    onClick={siteMapVisibility.toggle}
                    sx={{
                        position: "absolute",
                        color: theme.palette.divider,
                        right: (betweenSmLgScreen && screenMode.window) || lessMdScreen ? "10px" : "-54px",
                        top: "10px",
                        zIndex: 4,
                        transition: "all 0.3s",
                        "&:hover": {
                            color: getThemeColor("regularText", theme),
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <CustomScrollbar>
                    <Box
                        sx={{
                            padding: "20px 35px",
                            [theme.breakpoints.between("md", "lg")]: {
                                padding: "20px 25px",
                            },
                            [theme.breakpoints.between("sm", "md")]: {
                                padding: "20px",
                            },
                            [theme.breakpoints.down("sm")]: {
                                padding: "15px",
                                minWidth: "300px",
                            },
                        }}
                    >
                        {smScreen && <MobileSiteMapTreeView />}
                        {!smScreen && (
                            <>
                                <Box
                                    sx={{
                                        fontFamily: "Cascadia",
                                        fontWeight: "500",
                                        display: "grid",
                                        gridTemplate: "auto auto auto auto / 35px 35px auto 75px 1fr",
                                        "& .connective-line": {
                                            borderColor: theme.palette.divider,
                                            position: "relative",
                                            marginTop: "19px",
                                            "&.accented": {
                                                borderColor: getThemeColor("secondaryText", theme),
                                                "&:after": {
                                                    background: getThemeColor("secondaryText", theme),
                                                },
                                            },
                                            "&:after": {
                                                content: '""',
                                                display: "block",
                                                position: "absolute",
                                                height: "6px",
                                                width: "6px",
                                                top: "-4px",
                                                right: "-4px",
                                                background: theme.palette.divider,
                                                borderRadius: "50%",
                                            },
                                        },
                                        "& button": {
                                            marginLeft: "20px",
                                        },
                                        [theme.breakpoints.between("sm", "lg")]: {
                                            gridTemplate: "auto auto auto auto / 35px 35px auto 75px 1fr",
                                        },
                                    }}
                                >
                                    <Box
                                        className="connective-line"
                                        sx={{
                                            borderWidth: "1px 0px 0px 1px",
                                            gridArea: "1/1/3/3",
                                            height: "50px",
                                            transformOrigin: "0% 0%",
                                            transform: "scaleY(-1)",
                                        }}
                                    ></Box>
                                    <Box
                                        className={`connective-line${activeChapter == "resume" ? " accented" : ""}`}
                                        sx={{
                                            borderWidth: "1px 0px 0px 1px",
                                            gridArea: "2/1/5/3",
                                        }}
                                    ></Box>
                                    <Box
                                        className={`connective-line${activeChapter == "portfolio" ? " accented" : ""}`}
                                        sx={{
                                            borderWidth: "1px 0px 0px 1px",
                                            gridArea: "3/2/5/3",
                                        }}
                                    ></Box>
                                    <Box
                                        className={`connective-line${activeChapter == "contacts" ? " accented" : ""}`}
                                        sx={{
                                            background:
                                                activeChapter == "contacts"
                                                    ? getThemeColor("secondaryText", theme)
                                                    : theme.palette.divider,
                                            width: "1px",
                                            gridArea: "4/3/5/3",
                                        }}
                                    ></Box>

                                    <SpecialButton action="/" sx={{ gridArea: "1/3/1/3" }}>
                                        <HomeIcon />
                                        {t("Home")}
                                    </SpecialButton>
                                    <SpecialButton
                                        action="/about"
                                        className={activeChapter == "resume" ? "accented" : undefined}
                                        sx={{ gridArea: "2/3/2/3" }}
                                    >
                                        <AssignmentIndIcon />
                                        {t("Resume")}
                                    </SpecialButton>
                                    <SpecialButton
                                        action="/projects"
                                        className={activeChapter == "portfolio" ? "accented" : undefined}
                                        sx={{ gridArea: "3/3/3/3" }}
                                    >
                                        <RocketLaunchIcon />
                                        {t("Portfolio")}
                                    </SpecialButton>
                                    <SpecialButton
                                        action="/interact"
                                        className={activeChapter == "contacts" ? "accented" : undefined}
                                        sx={{ gridArea: "4/3/4/3" }}
                                    >
                                        <PhoneIcon />
                                        {t("Interact")}
                                    </SpecialButton>
                                    <ColorModeButton sx={{ gridArea: "1/5/1/5" }} />
                                    <LanguageButton sx={{ gridArea: "2/5/2/5" }} />
                                    {!lessMdScreen && <ScreenModeButton sx={{ gridArea: "3/5/3/5" }} />}
                                    {!lessMdScreen && <ViewModeButton sx={{ gridArea: "4/5/4/5" }} />}
                                </Box>
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplate: "35px 35px 35px auto / 35px 35px auto 35px auto 35px 1fr",
                                        [theme.breakpoints.between("sm", "lg")]: {
                                            gridTemplate: "35px 35px 35px auto / 35px 35px auto 1px auto 1px 1fr",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: "122.5px",
                                            transition: "all 0.3s",
                                            transitionProperty: "height, width",
                                            borderColor:
                                                activeChapter == "resume"
                                                    ? getThemeColor("secondaryText", theme)
                                                    : theme.palette.divider,
                                            borderWidth: "0px 0px 1px 1px",
                                            gridArea: "1/1/4/3",
                                            [theme.breakpoints.between("sm", "lg")]: {
                                                borderWidth: "0px 0px 0px 1px",
                                                height: "104.5px",
                                            },
                                        }}
                                    ></Box>
                                    <Box
                                        sx={{
                                            transition: "height 0.3s",
                                            borderColor:
                                                activeChapter == "portfolio"
                                                    ? getThemeColor("secondaryText", theme)
                                                    : theme.palette.divider,
                                            borderWidth: "0px 0px 1px 1px",
                                            gridArea: "1/2/3/5",
                                        }}
                                    ></Box>
                                    <Box
                                        sx={{
                                            transition: "height 0.3s",
                                            borderColor:
                                                activeChapter == "portfolio"
                                                    ? getThemeColor("secondaryText", theme)
                                                    : theme.palette.divider,
                                            borderWidth: "1px 1px 0px 0px",
                                            marginTop: "-1px",
                                            width: "15px",
                                            gridArea: "3/5/3/5",
                                        }}
                                    ></Box>
                                    <Box
                                        sx={{
                                            background:
                                                activeChapter == "contacts"
                                                    ? getThemeColor("secondaryText", theme)
                                                    : theme.palette.divider,
                                            width: "1px",
                                            gridArea: "1/3/1/3",
                                        }}
                                    ></Box>
                                    <Box
                                        sx={{
                                            background:
                                                activeChapter == "contacts"
                                                    ? getThemeColor("secondaryText", theme)
                                                    : theme.palette.divider,
                                            height: "1px",
                                            gridArea: "2/3/2/7",
                                        }}
                                    ></Box>
                                    <Box
                                        sx={{
                                            background:
                                                activeChapter == "contacts"
                                                    ? getThemeColor("secondaryText", theme)
                                                    : theme.palette.divider,
                                            width: "1px",
                                            gridArea: "2/7/4/7",
                                        }}
                                    ></Box>
                                    <AboutCategoriesList
                                        activeItem={activeGroup}
                                        selectionMode="single"
                                        selectedItems={activeItem}
                                        initiallyExpandedNodes={["biography", "experience", "specifications"]}
                                        intend="double"
                                        onItemsSelect={(e: AccentedTreeItemProps) => navigateToSection(e.id, router, siteMapVisibility, t)}
                                        sx={{
                                            minWidth: "220px",
                                            "& .MuiTreeItem-content": {
                                                outline: `0px solid ${theme.palette.divider}`,
                                                "&:hover": {
                                                    background: alpha(theme.palette.divider, 0.15),
                                                    outline: `1px solid ${theme.palette.divider}`,
                                                    transition: "all 0.3s",
                                                },
                                            },
                                            gridArea: "4/3/4/4",
                                            [theme.breakpoints.between("sm", "lg")]: {
                                                gridArea: "4/1/4/4",
                                            },
                                        }}
                                    />
                                    <ProjectFiltersList
                                        checkable={false}
                                        intend="double"
                                        selectedItems={[activeItem]}
                                        initiallyExpandedNodes={["frontend", "backend"]}
                                        onItemsSelect={(e: AccentedTreeItemProps[] | null) =>
                                            e &&
                                            Array.isArray(e) &&
                                            e.length > 0 &&
                                            navigateToSection(e[0].id, router, siteMapVisibility, t)
                                        }
                                        sx={{
                                            minWidth: "230px",
                                            "& .MuiTreeItem-content": {
                                                outline: `0px solid ${theme.palette.divider}`,
                                                "&:hover": {
                                                    background: alpha(theme.palette.divider, 0.15),
                                                    outline: `1px solid ${theme.palette.divider}`,
                                                    transition: "all 0.3s",
                                                },
                                            },
                                            gridArea: "4/5/4/6",
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            gridArea: "4/7/4/8",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "start",
                                            width: "150px",
                                            "& button": {
                                                width: "100%",
                                                margin: 0,
                                            },
                                        }}
                                    >
                                        <ContactButton contact="telegram" accented={isContactsPage} borders="0 0 1 1" />
                                        <ContactButton
                                            contact="email"
                                            accented={isContactsPage}
                                            borders="0 1 1 0"
                                            hoverBorders="0 1 1 1"
                                        />
                                        <ContactButton
                                            contact="linkedin"
                                            accented={isContactsPage}
                                            borders="0 0 1 1"
                                            hoverBorders="0 1 1 1"
                                        />
                                        <ContactButton
                                            contact="github"
                                            accented={isContactsPage}
                                            borders="0 1 0 0"
                                            hoverBorders="0 1 0 1"
                                        />
                                        <ContactButton contact="write" accented={isContactsPage} />
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Box>
                </CustomScrollbar>
            </motion.div>
        </>
    );
}
