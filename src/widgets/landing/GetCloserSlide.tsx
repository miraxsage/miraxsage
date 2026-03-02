"use client";
import { getThemeColor, useLandingColor } from "@/shared/lib/theme";
import { mix } from "@/shared/lib/colors";
import { Box, SxProps, alpha, lighten, useMediaQuery, useTheme } from "@mui/material";
import FloatingLine from "./FloatingLine";
import { useColorMode, useLanguage } from "@/shared/lib/store/appearanceSlice";
import LandingLink from "./LandingLink";
import __ from "@/shared/lib/i18n/translation";
import { useUiLabels } from "@/entities/ui-labels/model/uiLabelsContext";
import { CategoryLabelsContext } from "@/entities/resume/model/categoryLabels";
import AccentedTreeView from "@/shared/ui/AccentedTreeView";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AssessmentIcon from "@mui/icons-material/Assessment";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import PsychologyIcon from "@mui/icons-material/Psychology";
import DataObjectIcon from "@mui/icons-material/DataObject";
import MusclesIcon from "@/shared/icons/MusclesIcon";
import TransparentButton from "./TransparentButton";
import TelegramIcon from "@/shared/icons/TelegramIcon";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import MessageIcon from "@mui/icons-material/Message";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { GitHub } from "@mui/icons-material";
import { ReactNode, useContext, useState } from "react";
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
                justifyContent: "start",
                "& .MuiSvgIcon-root": {
                    fontSize: "25px",
                    marginRight: "10px",
                },
                border: "1px solid white",
                padding: "5px 20px",
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

function arrayContainsSubstring(array: string[], substring: string) {
    return array.some((item) => item.includes(substring));
}

export default function GetCloserSlide() {
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
    const darkPaleAccent = mix(accentColor, "#777777", 0.6);
    const paleTextColor = isDarkMode ? lighten(theme.palette.divider, 0.35) : lighten(textColor, 0.2);
    const textGradiend = `linear-gradient(200deg, ${alpha(
        mix(layoutBackgroundColor, useLandingColor("accentB"), 0.08),
        1
    )}, ${layoutBackgroundColor} 40%)`;
    const sm = useMediaQuery(theme.breakpoints.down("sm"));
    const [openedNodes, setOpenedNodes] = useState([
        "/about/biography/general",
        "/about/experience/technologies",
        "/about/specifications",
    ]);

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
                        {lang.ru ? "Познакомимся " : "Let's get  "}
                        <Box
                            sx={{
                                display: "inline-block",
                                background: `linear-gradient(25deg, ${useLandingColor("accentA")}, ${useLandingColor(
                                    "accentB"
                                )})`,
                                lineHeight: 1.25,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {lang.ru ? "ближе" : "closer"}
                        </Box>
                        ?{" "}
                        <Box
                            component="span"
                            sx={{ fontSize: "45px", position: "relative", top: "-4px", whiteSpace: "nowrap" }}
                        >
                            🫱🫲
                        </Box>
                    </Box>
                    <Box sx={{ height: "25px" }}></Box>
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
                            gridTemplate: "auto auto auto / 25px 25px 1fr",
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
                        <Box
                            className="connective-line"
                            sx={{
                                borderWidth: "1px 0px 0px 1px",
                                gridArea: "1/2/4/2",
                            }}
                        ></Box>
                        <Box
                            className="connective-line"
                            sx={{
                                borderWidth: "1px 0px 0px 1px",
                                gridArea: "2/1/4/3",
                            }}
                        ></Box>
                        <Box
                            className="connective-line"
                            sx={{
                                background: theme.palette.divider,
                                width: "1px",
                                gridArea: "3/3/3/3",
                            }}
                        ></Box>
                        {lang.ru ? (
                            <>
                                <Box sx={{ gridArea: "1/3/1/3", marginLeft: "20px" }}>
                                    <Box
                                        component="span"
                                        sx={{ WebkitBackgroundClip: "unset", WebkitTextFillColor: "white" }}
                                    >
                                        📜
                                    </Box>{" "}
                                    Вы можете ознакомиться с моим подробным{" "}
                                    <LandingLink href="/about">{t("resume")}</LandingLink>
                                </Box>
                                <Box sx={{ gridArea: "2/3/2/3", marginLeft: "20px" }}>
                                    <Box
                                        component="span"
                                        sx={{ WebkitBackgroundClip: "unset", WebkitTextFillColor: "white" }}
                                    >
                                        💼
                                    </Box>{" "}
                                    Посмотреть <LandingLink href="/projects">{t("portfolio")}</LandingLink> с самыми
                                    интересными работами
                                </Box>
                                <Box sx={{ gridArea: "3/3/3/3", marginLeft: "20px" }}>
                                    <Box
                                        component="span"
                                        sx={{ WebkitBackgroundClip: "unset", WebkitTextFillColor: "white" }}
                                    >
                                        🤝
                                    </Box>{" "}
                                    Cвязаться со мной в соцсетях или оставить{" "}
                                    <LandingLink href="/interact">{t("message")}</LandingLink>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{ gridArea: "1/3/1/3", marginLeft: "20px" }}>
                                    <Box
                                        component="span"
                                        sx={{ WebkitBackgroundClip: "unset", WebkitTextFillColor: "white" }}
                                    >
                                        📜
                                    </Box>{" "}
                                    You can review my detailed <LandingLink href="/about">{t("resume")}</LandingLink>
                                </Box>
                                <Box sx={{ gridArea: "2/3/2/3", marginLeft: "20px" }}>
                                    <Box
                                        component="span"
                                        sx={{ WebkitBackgroundClip: "unset", WebkitTextFillColor: "white" }}
                                    >
                                        💼
                                    </Box>{" "}
                                    Check out the <LandingLink href="/projects">{t("portfolio")}</LandingLink> with my
                                    most interesting works
                                </Box>
                                <Box sx={{ gridArea: "3/3/3/3", marginLeft: "20px" }}>
                                    <Box
                                        component="span"
                                        sx={{ WebkitBackgroundClip: "unset", WebkitTextFillColor: "white" }}
                                    >
                                        🤝
                                    </Box>{" "}
                                    Connect with me on social media or leave a{" "}
                                    <LandingLink href="/interact">{t("message")}</LandingLink>
                                </Box>
                            </>
                        )}
                    </Box>
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
                        <Box
                            sx={{
                                ...(arrayContainsSubstring(openedNodes, "biography")
                                    ? arrayContainsSubstring(openedNodes, "experience")
                                        ? {
                                              height: sm ? "258.5px" : "274.5px",
                                              width: "95px",
                                          }
                                        : {
                                              height: sm ? "176.5px" : "187.5px",
                                              width: "53px",
                                          }
                                    : arrayContainsSubstring(openedNodes, "experience")
                                    ? { height: sm ? "187px" : "196px", width: "95px" }
                                    : {
                                          height: sm ? "104px" : "109px",
                                          width: "53px",
                                      }),
                                transition: "all 0.3s",
                                transitionProperty: "height, width",
                                borderColor: theme.palette.divider,
                                borderWidth: "0px 0px 1px 1px",
                                gridArea: "1/1/4/4",
                            }}
                        ></Box>
                        <Box
                            sx={{
                                height: sm ? "70px" : "73px",
                                transition: "height 0.3s",
                                borderColor: theme.palette.divider,
                                borderWidth: "0px 0px 1px 1px",
                                gridArea: "1/2/4/2",
                            }}
                        ></Box>
                        <Box sx={{ background: theme.palette.divider, width: "1px", gridArea: "1/3/1/3" }}></Box>
                        <Box sx={{ background: theme.palette.divider, height: "1px", gridArea: "2/3/2/5" }}></Box>
                        <Box sx={{ background: theme.palette.divider, width: "1px", gridArea: "2/5/2/5" }}></Box>
                        <AccentedTreeView
                            intend="double"
                            selectionMode="single"
                            onToggle={(_e, toggled) => setOpenedNodes(toggled)}
                            onItemsSelect={(item) => {
                                router.push(item.id);
                            }}
                            initiallyExpandedNodes={[
                                "/about/biography/general",
                                "/about/experience/technologies",
                                "/about/specifications",
                            ]}
                            sx={{
                                gridArea: "3/3/3/4",
                                minWidth: "248px",
                                "& .MuiTreeItem-root": {
                                    "&:before": {
                                        top: "28px",
                                    },
                                    "&:last-child:before": {
                                        top: "28px",
                                        height: "calc(100% - 28px)",
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
                            {[
                                {
                                    id: "/about/biography/general",
                                    title: catLabel("biography"),
                                    icon: <PersonIcon />,
                                    children: [
                                        {
                                            id: "/about/biography/education",
                                            title: catLabel("education"),
                                            icon: <SchoolIcon />,
                                        },
                                        {
                                            id: "/about/biography/labor",
                                            title: catLabel("labor"),
                                            icon: <BusinessCenterIcon />,
                                        },
                                    ],
                                },
                                {
                                    id: "/about/experience/technologies",
                                    title: catLabel("experience"),
                                    icon: <MusclesIcon />,
                                    children: [
                                        {
                                            id: "/about/experience/achievements",
                                            title: catLabel("achievements"),
                                            icon: <EmojiEventsIcon />,
                                        },
                                        {
                                            id: "/projects",
                                            title: t("Projects"),
                                            icon: <RocketLaunchIcon />,
                                        },
                                    ],
                                },
                                {
                                    id: "/about/specifications",
                                    title: catLabel("specifications"),
                                    icon: <AssessmentIcon />,
                                    children: [
                                        {
                                            id: "/about/specifications/soft-skills",
                                            title: catLabel("soft-skills"),
                                            icon: <PsychologyAltIcon />,
                                        },
                                        {
                                            id: "/about/specifications/hard-skills",
                                            title: catLabel("hard-skills"),
                                            icon: <PsychologyIcon />,
                                        },
                                    ],
                                },
                                {
                                    id: "/about/snippets",
                                    title: catLabel("snippets"),
                                    icon: <DataObjectIcon />,
                                },
                            ]}
                        </AccentedTreeView>
                        <Box
                            sx={{
                                gridArea: "3/5/3/6",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                            }}
                        >
                            <SpecialButton link="https://t.me/miraxsage" sx={{ borderWidth: "0px 0px 1px 1px" }}>
                                <TelegramIcon />
                                {!sm && "Telegram"}
                            </SpecialButton>
                            <SpecialButton link="mailto:manin.maxim@mail.ru" sx={{ borderWidth: "0px 1px 1px 0px" }}>
                                <AlternateEmailOutlinedIcon />
                                {!sm && "Email"}
                            </SpecialButton>
                            <SpecialButton
                                link="https://www.linkedin.com/in/miraxsage"
                                sx={{ borderWidth: "0px 0px 1px 1px" }}
                            >
                                <LinkedInIcon />
                                {!sm && "LinkedIn"}
                            </SpecialButton>
                            <SpecialButton link="https://github.com/miraxsage/" sx={{ borderWidth: "0px 1px 0px 0px" }}>
                                <GitHub />
                                {!sm && "Github"}
                            </SpecialButton>
                            <SpecialButton link="/interact">
                                <MessageIcon />
                                {!sm && t("Write")}
                            </SpecialButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Copyright />
        </Box>
    );
}
