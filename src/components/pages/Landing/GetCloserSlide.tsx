import { getThemeColor, useThemeColor } from "@/components/contexts/Theme";
import { mix } from "@/utilities/colors";
import { Box, SxProps, alpha, lighten, useTheme } from "@mui/material";
import FloatingLine from "./FloatingLine";
import { useColorMode, useLanguage } from "@/store/appearanceSlice";
import { useLandingColor } from ".";
import LandingLink from "./LandingLink";
import __ from "@/utilities/transtation";
import AccentedTreeView from "@/components/AccentedTreeView";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AssessmentIcon from "@mui/icons-material/Assessment";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import PsychologyIcon from "@mui/icons-material/Psychology";
import DataObjectIcon from "@mui/icons-material/DataObject";
import MusclesIcon from "../../icons/MusclesIcon";
import TransparentButton from "./TransparentButton";
import TelegramIcon from "@/components/icons/TelegramIcon";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import MessageIcon from "@mui/icons-material/Message";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { GitHub } from "@mui/icons-material";
import { ReactNode, useState } from "react";
import Copyright from "./Copyright";

type SpecialButtonProps = {
    children: ReactNode;
    sx?: SxProps;
};
function SpecialButton({ children, sx }: SpecialButtonProps) {
    const isDarkMode = useColorMode().dark;
    const theme = useTheme();
    const textColor = useLandingColor("contrast");
    const paleTextColor = isDarkMode ? lighten(theme.palette.divider, 0.35) : lighten(textColor, 0.2);
    return (
        <TransparentButton
            dividerSize="removed"
            sx={{
                width: "225px",
                fontSize: "27px",
                justifyContent: "start",
                "& .MuiSvgIcon-root": {
                    fontSize: "30px",
                    marginRight: "10px",
                },
                border: "1px solid white",
                padding: "5px 20px",
                color: paleTextColor,
                borderColor: theme.palette.divider,
                ...sx,
            }}
        >
            {children}
        </TransparentButton>
    );
}

export default function GetCloserSlide() {
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    const lang = useLanguage();
    const layoutBackgroundColor = getThemeColor("layoutBackground", theme);
    const textColor = useLandingColor("contrast");
    const accentColor = useLandingColor("accentA");
    const darkPaleAccent = mix(accentColor, "#777777", 0.6);
    const paleTextColor = isDarkMode ? lighten(theme.palette.divider, 0.35) : lighten(textColor, 0.2);

    const [openedNodes, setOpenedNodes] = useState(["bio", "exp", "spec"]);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: 0,
                minHeight: "135vh",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "-16%",
                    width: "100%",
                    overflow: "hidden",
                    height: "150%",
                    transform: "skew(0, -10deg)",
                    borderTop: `1px solid ${theme.palette.divider}`,
                    background: `linear-gradient(200deg, ${alpha(
                        mix(layoutBackgroundColor, useLandingColor("accentB"), 0.08),
                        1
                    )}, ${layoutBackgroundColor} 50%)`,
                }}
            >
                <Box sx={{ width: "100%", height: "100%", opacity: 0.7 }}>
                    <FloatingLine shift={-25} />
                    <FloatingLine shift={-10} />
                    <FloatingLine shift={0} />
                    <FloatingLine shift={15} />
                    <FloatingLine shift={25} />
                </Box>
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
                    <Box component="span" sx={{ fontSize: "45px", position: "relative", top: "-4px" }}>
                        🫱🫲
                    </Box>
                    <Box sx={{ height: "25px" }}></Box>
                    <Box
                        sx={{
                            background: `linear-gradient(90deg, ${textColor} 30%, ${darkPaleAccent})`,
                            fontFamily: "Cascadia",
                            lineHeight: 1.5,
                            fontSize: "27px",
                            fontWeight: "500",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "grid",
                            gridTemplate: "auto auto auto / 25px 25px auto",
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
                                    <LandingLink href="/about">{__("resume")}</LandingLink>
                                </Box>
                                <Box sx={{ gridArea: "2/3/2/3", marginLeft: "20px" }}>
                                    <Box
                                        component="span"
                                        sx={{ WebkitBackgroundClip: "unset", WebkitTextFillColor: "white" }}
                                    >
                                        💼
                                    </Box>{" "}
                                    Посмотреть <LandingLink href="/projects">{__("portfolio")}</LandingLink> с самыми
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
                                    <LandingLink href="/interact">{__("message")}</LandingLink>
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
                                    You can review my detailed <LandingLink href="/about">{__("resume")}</LandingLink>
                                </Box>
                                <Box sx={{ gridArea: "2/3/2/3", marginLeft: "20px" }}>
                                    <Box
                                        component="span"
                                        sx={{ WebkitBackgroundClip: "unset", WebkitTextFillColor: "white" }}
                                    >
                                        💼
                                    </Box>{" "}
                                    Check out the <LandingLink href="/projects">{__("portfolio")}</LandingLink> with my
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
                                    <LandingLink href="/interact">{__("message")}</LandingLink>
                                </Box>
                            </>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplate: "25px 25px auto / 25px 25px auto 100px 1fr",
                        }}
                    >
                        <Box
                            sx={{
                                ...(openedNodes.includes("bio")
                                    ? openedNodes.includes("exp")
                                        ? { height: "311.5px", width: "95px" }
                                        : { height: "214px", width: "53px" }
                                    : openedNodes.includes("exp")
                                    ? { height: "219px", width: "95px" }
                                    : { height: "120px", width: "53px" }),
                                transition: "all 0.3s",
                                transitionProperty: "height, width",
                                borderColor: theme.palette.divider,
                                borderWidth: "0px 0px 1px 1px",
                                gridArea: "1/1/4/4",
                            }}
                        ></Box>
                        <Box
                            sx={{
                                height: "75px",
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
                            onToggle={(_e, toggled) => setOpenedNodes(toggled)}
                            expandedNodes={["bio", "exp", "spec"]}
                            sx={{
                                gridArea: "3/3/3/4",
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
                                            fontSize: "27px",
                                            marginLeft: "5px",
                                            color: paleTextColor + " !important",
                                        },
                                    },
                                },
                                "& .MuiTreeItem-root .MuiTreeItem-content .MuiTreeItem-iconContainer svg": {
                                    fontSize: "27px",
                                    transition: "color 0.2s",
                                    color: paleTextColor + " !important",
                                },
                                "& .MuiTreeItem-root .MuiTreeItem-root .MuiTreeItem-content .MuiTreeItem-iconContainer svg":
                                    {
                                        marginLeft: "5px",
                                    },
                            }}
                        >
                            {[
                                {
                                    id: "bio",
                                    title: __("Biography"),
                                    icon: <PersonIcon />,
                                    children: [
                                        { id: "edu", title: __("Education"), icon: <SchoolIcon /> },
                                        { id: "work", title: __("Labor"), icon: <BusinessCenterIcon /> },
                                    ],
                                },
                                {
                                    id: "exp",
                                    title: __("Experience"),
                                    icon: <MusclesIcon />,
                                    children: [
                                        { id: "ach", title: __("Achievements"), icon: <EmojiEventsIcon /> },
                                        { id: "projs", title: __("Projects"), icon: <RocketLaunchIcon /> },
                                    ],
                                },
                                {
                                    id: "spec",
                                    title: __("Specifications"),
                                    icon: <AssessmentIcon />,
                                    children: [
                                        { id: "soft", title: __("Soft-skills"), icon: <PsychologyAltIcon /> },
                                        { id: "hard", title: __("Hard-skills"), icon: <PsychologyIcon /> },
                                    ],
                                },
                                {
                                    id: "snip",
                                    title: __("Snippets|1"),
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
                            <SpecialButton sx={{ borderWidth: "0px 0px 1px 1px" }}>
                                <TelegramIcon />
                                Telegram
                            </SpecialButton>
                            <SpecialButton sx={{ borderWidth: "0px 1px 1px 0px" }}>
                                <AlternateEmailOutlinedIcon />
                                Email
                            </SpecialButton>
                            <SpecialButton sx={{ borderWidth: "0px 0px 1px 1px" }}>
                                <LinkedInIcon />
                                LinkedIn
                            </SpecialButton>
                            <SpecialButton sx={{ borderWidth: "0px 1px 0px 0px" }}>
                                <GitHub />
                                Github
                            </SpecialButton>
                            <SpecialButton>
                                <MessageIcon />
                                {__("Write")}
                            </SpecialButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Copyright />
        </Box>
    );
}