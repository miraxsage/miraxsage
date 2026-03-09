"use client";

import { useTheme } from "@mui/material";
import AccentedTabs from "@/shared/ui/AccentedTabs";
import TerminalIcon from "@mui/icons-material/Terminal";
import MonitorIcon from "@mui/icons-material/Monitor";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LanguageIcon from "@/shared/icons/LanguageIcon";
import LightModeIcon from "@mui/icons-material/LightMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { getThemeColor } from "@/shared/lib/theme";
import { motion } from "framer-motion";
import { useAsideMenuVisibility, useColorMode, useLanguage, useScreenMode, useViewMode } from "@/shared/lib/store/appearanceSlice";

export default function AsideMenu() {
    const colorMode = useColorMode();
    const screenMode = useScreenMode();

    const theme = useTheme();
    const asideMenuVisibility = useAsideMenuVisibility();
    const viewMode = useViewMode();
    const isDarkMode = colorMode.dark;
    const lang = useLanguage();
    return (
        <aside
            style={{
                borderColor: theme.palette.divider,
                borderRightStyle: "solid",
                borderRightWidth: asideMenuVisibility.shown ? "1px" : "0px",
                overflow: "hidden",
                width: "65px",
                maxWidth: asideMenuVisibility.shown ? "65px" : "0px",
                transition: "max-width 0.3s ease, border-right-width 0.3s ease",
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
                                initial={{
                                    filter: "grayscale(1)",
                                    opacity: isDarkMode ? 0.5 : 0.4,
                                }}
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
        </aside>
    );
}
