import { Box, darken, useTheme } from "@mui/material";
import { HorizontalPanelButton } from "../PanelButtons";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import VKIcon from "../Icons/VKIcon";
import TelegramIcon from "../Icons/TelegramIcon";
import { GitHub as GithubIcon } from "@mui/icons-material";

export default function BottomBar() {
    const theme = useTheme();
    return (
        <Box
            component="footer"
            sx={{
                borderTop: 1,
                borderColor: "divider",
                backgroundColor: darken(theme.palette.bg.dark, 0.08),
            }}
            className="flex"
        >
            <HorizontalPanelButton iconMode={true}>
                <InfoOutlinedIcon />
            </HorizontalPanelButton>
            <div className="flex-grow flex items-center px-[22px] py-[18px] leading-[1.2rem]">
                Status
            </div>
            <HorizontalPanelButton dividerSide="left" iconMode={true}>
                <AlternateEmailOutlinedIcon />
            </HorizontalPanelButton>
            <HorizontalPanelButton
                dividerSide="left"
                dividerSize="squeezed"
                iconMode={true}
            >
                <TelegramIcon />
            </HorizontalPanelButton>
            <HorizontalPanelButton
                dividerSide="left"
                dividerSize="squeezed"
                iconMode={true}
            >
                <VKIcon />
            </HorizontalPanelButton>
            <HorizontalPanelButton
                dividerSide="left"
                dividerSize="squeezed"
                iconMode={true}
            >
                <GithubIcon />
            </HorizontalPanelButton>
        </Box>
    );
}
