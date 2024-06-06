import { Box, alpha, useTheme } from "@mui/material";
import { HorizontalPanelButton } from "../PanelButtons";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import VKIcon from "../icons/VKIcon";
import TelegramIcon from "../icons/TelegramIcon";
import { GitHub as GithubIcon } from "@mui/icons-material";
import { useThemeColor } from "../contexts/Theme";
import { useColorMode } from "@/store/appearanceSlice";

export default function BottomBar() {
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    return (
        <Box
            component="footer"
            sx={{
                borderTop: 1,
                borderColor: "divider",
                backgroundColor: useThemeColor("barBackground"),
            }}
            className="flex"
        >
            <HorizontalPanelButton iconMode={true}>
                <InfoOutlinedIcon />
            </HorizontalPanelButton>
            <div
                className="flex-grow flex items-center px-[22px] py-[18px] leading-[1.2rem] justify-center"
                style={{ color: alpha(theme.palette.divider, isDarkMode ? 0.5 : 1) }}
            >
                © 2024 Miraxsage
            </div>
            <HorizontalPanelButton dividerSide="left" iconMode={true}>
                <TelegramIcon />
            </HorizontalPanelButton>
            <HorizontalPanelButton dividerSide="left" dividerSize="squeezed" iconMode={true}>
                <AlternateEmailOutlinedIcon />
            </HorizontalPanelButton>
            <HorizontalPanelButton dividerSide="left" dividerSize="squeezed" iconMode={true}>
                <VKIcon />
            </HorizontalPanelButton>
            <HorizontalPanelButton dividerSide="left" dividerSize="squeezed" iconMode={true}>
                <GithubIcon />
            </HorizontalPanelButton>
        </Box>
    );
}
