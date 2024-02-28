import { Box } from "@mui/material";
import AccentedTabs from "../AccentedTabs";
import TerminalIcon from "@mui/icons-material/Terminal";
import MonitorIcon from "@mui/icons-material/Monitor";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LanguageIcon from "../icons/LanguageIcon";
import LightModeIcon from "@mui/icons-material/LightMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { motion } from "framer-motion";
import { useThemeColor } from "../contexts/Theme";
import { useColorMode, useLanguage } from "@/store/appearanceSlice";

const terminalIcon = <TerminalIcon />;
const monitorIcon = <MonitorIcon />;
const darkModeIcon = <Brightness4Icon />;
const lightModeIcon = <LightModeIcon />;
const fullscreenIcon = <FullscreenIcon />;
const foldLeftIcon = <FirstPageIcon />;

export default function AsideMenu() {
    const colorMode = useColorMode();
    const isDarkMode = colorMode.dark;
    const lang = useLanguage();
    return (
        <Box
            component="aside"
            sx={{
                borderRight: 1,
                borderColor: "divider",
            }}
        >
            <AccentedTabs
                underline={false}
                mode="full"
                orientation="vertical"
                sx={{
                    "& .MuiTab-root": { color: useThemeColor("tabIcon") },
                    "& .MuiTab-root:hover": {
                        color: useThemeColor("tabHoverIcon"),
                    },
                    "& .MuiTab-root.Mui-selected": {
                        color: useThemeColor("tabActiveText"),
                    },
                }}
            >
                {[
                    { icon: monitorIcon },
                    { icon: terminalIcon },
                    {
                        icon: isDarkMode ? lightModeIcon : darkModeIcon,
                        notTogglable: true,
                        onClick() {
                            colorMode.update((old) =>
                                old == "dark" ? "light" : "dark"
                            );
                        },
                    },
                    {
                        notTogglable: true,
                        icon: (hovered: boolean) => (
                            <motion.div
                                animate={{
                                    filter: hovered
                                        ? "grayscale(0)"
                                        : "grayscale(1)",
                                    opacity: hovered
                                        ? 1
                                        : isDarkMode
                                        ? 0.5
                                        : 0.3,
                                }}
                            >
                                <LanguageIcon language={lang.lang} />
                            </motion.div>
                        ),
                        onClick() {
                            lang.toggle();
                        },
                    },
                    { icon: fullscreenIcon, notTogglable: true },
                    { icon: foldLeftIcon, notTogglable: true },
                ]}
            </AccentedTabs>
        </Box>
    );
}
