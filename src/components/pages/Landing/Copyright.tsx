import { useColorMode, useLanguage } from "@/store/appearanceSlice";
import { Box, alpha, useTheme } from "@mui/material";
import { useLandingColor } from ".";
import TransparentButton from "./TransparentButton";
import TelegramIcon from "@/components/icons/TelegramIcon";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { GitHub } from "@mui/icons-material";
import { lighten } from "@mui/material";
import { useThemeColor } from "@/components/contexts/Theme";

export default function Copyright() {
    const lang = useLanguage();
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    const color = useLandingColor("noteless");
    const accentColor = useLandingColor("accentA");
    return (
        <Box
            sx={{
                background: alpha(useThemeColor("barBackground"), 0.67),
                width: "100%",
                borderColor: alpha(theme.palette.divider, 0.5),
                borderWidth: "1px 0px 0px 0px",
                bottom: "0",
                padding: "50px 0px",
                position: "absolute",
            }}
        >
            <Box
                sx={{
                    fontSize: "20px",
                    fontFamily: "Cascadia",
                    width: "fit-content",
                    margin: "0 auto",
                    color,
                    lineHeight: 1.25,
                }}
            >
                {lang.ru ? (
                    <>
                        © 2024 Miraxsage. Все права защищены.
                        <br />
                        Все материалы на сайте (товарные знаки, логотипы и изображения за исключением ряда <br />
                        иллюстраций, заимствованных в свободном доступе) являются собственностью владельца <br />
                        (Манина Максима Павловича) и могут быть использованы только с личного разрешения.
                    </>
                ) : (
                    <>
                        © 2024 Miraxsage. All rights reserved.
                        <br />
                        All materials on the website (trademarks, logos, and images excluding certain <br />
                        illustrations sourced from public domain) are the property of the owner (Manin <br />
                        Maxim) and may only be used with personal permission.
                    </>
                )}
                <Box
                    className="grid"
                    sx={{
                        justifyContent: "center",
                        marginTop: "25px",
                        "& button": {
                            color: alpha(color, 0.6),
                            "&:hover": {
                                color: isDarkMode ? lighten(color, 0.3) : accentColor,
                            },
                        },
                    }}
                >
                    <Box className="flex">
                        <TransparentButton>
                            <TelegramIcon />
                        </TransparentButton>
                        <TransparentButton>
                            <AlternateEmailOutlinedIcon />
                        </TransparentButton>
                        <TransparentButton>
                            <LinkedInIcon />
                        </TransparentButton>
                        <TransparentButton dividerSize="collapsed">
                            <GitHub />
                        </TransparentButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
