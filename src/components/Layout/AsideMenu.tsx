import { Box } from "@mui/material";
import AccentedTabs from "../AccentedTabs";
import TerminalIcon from "@mui/icons-material/Terminal";
import MonitorIcon from "@mui/icons-material/Monitor";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LanguageIcon from "../Icons/LanguageIcon";
import { motion } from "framer-motion";

const terminalIcon = <TerminalIcon />;
const monitorIcon = <MonitorIcon />;
const lightModeIcon = <Brightness4Icon />;

export default function AsideMenu() {
    return (
        <Box
            component="aside"
            sx={{
                borderRight: 1,
                borderColor: "divider",
            }}
        >
            <AccentedTabs underline={false} mode="full" orientation="vertical">
                {[
                    { icon: terminalIcon },
                    { icon: monitorIcon },
                    { icon: lightModeIcon, notTogglable: true },
                    {
                        notTogglable: true,
                        icon: (hovered: boolean) => (
                            <motion.div
                                animate={{
                                    filter: hovered
                                        ? "grayscale(0)"
                                        : "grayscale(1)",
                                    opacity: hovered ? 1 : 0.5,
                                }}
                            >
                                <LanguageIcon language="en" colored={true} />
                            </motion.div>
                        ),
                    },
                ]}
            </AccentedTabs>
        </Box>
    );
}
