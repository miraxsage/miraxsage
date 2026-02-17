"use client";

import { Box, alpha, useMediaQuery, useTheme } from "@mui/material";
import { HorizontalPanelButton } from "@/shared/ui/PanelButtons";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@/shared/icons/TelegramIcon";
import { GitHub as GithubIcon } from "@mui/icons-material";
import { useThemeColor } from "@/shared/lib/theme";
import { useColorMode } from "@/shared/lib/store/appearanceSlice";

export default function BottomBar() {
    const theme = useTheme();
    const goTo = (link: string) => () => {
        window.open(link, "_blank");
    };
    const isDarkMode = useColorMode().dark;
    const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Box
            component="footer"
            sx={{
                borderTop: 1,
                borderColor: "divider",
                backgroundColor: useThemeColor("barBackground"),
                justifyContent: "center",
                display: "flex",
            }}
        >
            {!smScreen && (
                <>
                    <HorizontalPanelButton iconMode={true}>
                        <InfoOutlinedIcon />
                    </HorizontalPanelButton>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            px: "22px",
                            py: "18px",
                            lineHeight: "1.2rem",
                            justifyContent: "center",
                        }}
                        style={{ color: alpha(theme.palette.divider, isDarkMode ? 0.5 : 1) }}
                    >
                        © 2024-{new Date().getFullYear()} Miraxsage
                    </Box>
                </>
            )}
            <HorizontalPanelButton
                onClick={goTo("https://t.me/miraxsage")}
                dividerSide="left"
                dividerSize={smScreen ? "removed" : "full"}
                iconMode={true}
            >
                <TelegramIcon />
            </HorizontalPanelButton>
            <HorizontalPanelButton
                onClick={goTo("mailto:manin.maxim@mail.ru")}
                dividerSide="left"
                dividerSize="squeezed"
                iconMode={true}
            >
                <AlternateEmailOutlinedIcon />
            </HorizontalPanelButton>
            <HorizontalPanelButton
                onClick={goTo("https://www.linkedin.com/in/miraxsage")}
                dividerSide="left"
                dividerSize="squeezed"
                iconMode={true}
            >
                <LinkedInIcon />
            </HorizontalPanelButton>
            <HorizontalPanelButton
                onClick={goTo("https://github.com/miraxsage/")}
                dividerSide="left"
                dividerSize="squeezed"
                iconMode={true}
            >
                <GithubIcon />
            </HorizontalPanelButton>
        </Box>
    );
}
