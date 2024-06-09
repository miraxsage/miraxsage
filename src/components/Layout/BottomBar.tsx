import { Box, alpha, useMediaQuery, useTheme } from "@mui/material";
import { HorizontalPanelButton } from "../PanelButtons";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "../icons/TelegramIcon";
import { GitHub as GithubIcon } from "@mui/icons-material";
import { useThemeColor } from "../contexts/Theme";
import { useColorMode } from "@/store/appearanceSlice";

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
            }}
            className="flex"
        >
            {!smScreen && (
                <>
                    <HorizontalPanelButton iconMode={true}>
                        <InfoOutlinedIcon />
                    </HorizontalPanelButton>
                    <div
                        className="flex-grow flex items-center px-[22px] py-[18px] leading-[1.2rem] justify-center"
                        style={{ color: alpha(theme.palette.divider, isDarkMode ? 0.5 : 1) }}
                    >
                        © 2024 Miraxsage
                    </div>
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
                onClick={goTo("https://www.linkedin.com/in/manin-maxim-ba74a6221/")}
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
