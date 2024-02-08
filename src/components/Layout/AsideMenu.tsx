import { Box } from "@mui/material";
import AccentedTabs from "../AccentedTabs";
import TerminalIcon from "@mui/icons-material/Terminal";
import MonitorIcon from "@mui/icons-material/Monitor";
import Brightness4Icon from "@mui/icons-material/Brightness4";

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
                {[terminalIcon, monitorIcon, lightModeIcon].map((icon) => ({
                    icon,
                }))}
            </AccentedTabs>
        </Box>
    );
}
