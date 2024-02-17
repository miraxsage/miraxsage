import { Box } from "@mui/material";
import AccentedTabs from "../AccentedTabs";
import TerminalIcon from "@mui/icons-material/Terminal";
import MonitorIcon from "@mui/icons-material/Monitor";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LanguageIcon from "../Icons/LanguageIcon";
import LightModeIcon from "@mui/icons-material/LightMode";
import { motion } from "framer-motion";
import { useAppearance } from "../Contexts/AppearanceContext";
import { useThemeColor } from "../Contexts/Theme";

const terminalIcon = <TerminalIcon />;
const monitorIcon = <MonitorIcon />;
const darkModeIcon = <Brightness4Icon />;
const lightModeIcon = <LightModeIcon />;

export default function AsideMenu() {
    const appearanceContext = useAppearance();
    const isDarkMode = appearanceContext.colorMode == "dark";
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
                    { icon: terminalIcon },
                    { icon: monitorIcon },
                    {
                        icon: isDarkMode ? lightModeIcon : darkModeIcon,
                        notTogglable: true,
                        onClick() {
                            appearanceContext.update((old) => ({
                                colorMode:
                                    old.colorMode == "dark" ? "light" : "dark",
                            }));
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
                ]}
            </AccentedTabs>
        </Box>
    );
}
