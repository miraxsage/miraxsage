import { useTheme } from "@mui/material";
import AccentedTabs from "../AccentedTabs";
import TerminalIcon from "@mui/icons-material/Terminal";
import MonitorIcon from "@mui/icons-material/Monitor";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LanguageIcon from "../icons/LanguageIcon";
import LightModeIcon from "@mui/icons-material/LightMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { getThemeColor } from "../contexts/Theme";
import { motion } from "framer-motion";
import { useAsideMenuVisibility, useColorMode, useLanguage, useScreenMode, useViewMode } from "@/store/appearanceSlice";

export default function AsideMenu() {
    const colorMode = useColorMode();
    const screenMode = useScreenMode();

    const theme = useTheme();
    const asideMenuVisibility = useAsideMenuVisibility();
    const viewMode = useViewMode();
    const isDarkMode = colorMode.dark;
    const lang = useLanguage();
    return (
        <motion.aside
            style={{ borderColor: theme.palette.divider }}
            animate={{
                maxWidth: asideMenuVisibility.shown ? "65px" : "0px",
                borderRightWidth: asideMenuVisibility.shown ? "1px" : "0px",
            }}
        >
            <AccentedTabs
                activeTab={viewMode.value}
                onTabSelect={(tab) => viewMode.update(tab.id as "desktop" | "console")}
                underline={false}
                mode="full"
                orientation="vertical"
                sx={{
                    "& .MuiTab-root": { color: getThemeColor("tabIcon", theme) },
                    "& .MuiTab-root:hover": {
                        color: getThemeColor("tabHoverIcon", theme),
                    },
                    "& .MuiTab-root.Mui-selected": {
                        color: getThemeColor("tabActiveText", theme),
                    },
                }}
            >
                {[
                    { id: "desktop", icon: <MonitorIcon /> },
                    { id: "console", icon: <TerminalIcon /> },
                    {
                        id: "color-mode",
                        icon: isDarkMode ? <LightModeIcon /> : <Brightness4Icon />,
                        notTogglable: true,
                        onClick() {
                            colorMode.update((old) => (old == "dark" ? "light" : "dark"));
                        },
                    },
                    {
                        id: "language",
                        notTogglable: true,
                        icon: (hovered: boolean) => (
                            <motion.div
                                animate={{
                                    filter: hovered ? "grayscale(0)" : "grayscale(1)",
                                    opacity: hovered ? 1 : isDarkMode ? 0.5 : 0.4,
                                }}
                            >
                                <LanguageIcon language={lang.lang} />
                            </motion.div>
                        ),
                        onClick() {
                            lang.toggle();
                        },
                    },
                    {
                        id: "screen-mode",
                        icon: screenMode.window ? <FullscreenIcon /> : <FullscreenExitIcon />,
                        notTogglable: true,
                        onClick() {
                            screenMode.toggle();
                        },
                    },
                    {
                        id: "aside-menu-visibility",
                        icon: <FirstPageIcon />,
                        notTogglable: true,
                        onClick() {
                            asideMenuVisibility.update("collapsed");
                        },
                    },
                ]}
            </AccentedTabs>
        </motion.aside>
    );
}
