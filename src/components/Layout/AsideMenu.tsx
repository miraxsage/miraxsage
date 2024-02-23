import { Box } from "@mui/material";
import AccentedTabs from "../AccentedTabs";
import TerminalIcon from "@mui/icons-material/Terminal";
import MonitorIcon from "@mui/icons-material/Monitor";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LanguageIcon from "../icons/LanguageIcon";
import LightModeIcon from "@mui/icons-material/LightMode";
import LaunchIcon from "@mui/icons-material/Launch";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { motion } from "framer-motion";
import { useThemeColor } from "../contexts/Theme";
import { useColorMode } from "@/store/appearanceSlice";

const terminalIcon = <TerminalIcon />;
const monitorIcon = <MonitorIcon />;
const darkModeIcon = <Brightness4Icon />;
const lightModeIcon = <LightModeIcon />;
const unfoldIcon = <LaunchIcon />;
const foldLeftIcon = <KeyboardDoubleArrowLeftIcon />;

export default function AsideMenu() {
    const colorMode = useColorMode();
    const isDarkMode = colorMode.dark;
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
                                <LanguageIcon language="en" />
                            </motion.div>
                        ),
                    },
                    { icon: unfoldIcon, notTogglable: true },
                    { icon: foldLeftIcon, notTogglable: true },
                ]}
            </AccentedTabs>
        </Box>
    );
}
