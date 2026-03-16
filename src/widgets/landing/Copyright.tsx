"use client";
import { useColorMode, useLanguage } from "@/shared/lib/store/appearanceSlice";
import { Box, alpha, useTheme } from "@mui/material";
import { useLandingColor, useThemeColor } from "@/shared/lib/theme";
import TransparentButton from "./TransparentButton";
import { lighten } from "@mui/material";
import { useRouter } from "next/navigation";
import type { FooterItem, ContactItem } from "./MainSlide";
import DynamicIcon from "@/shared/ui/DynamicIcon";
import renderContent from "./AboutSlide/renderContent";

export default function Copyright({ footer, contacts }: { footer: FooterItem[]; contacts: ContactItem[] }) {
    const lang = useLanguage();
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    const color = useLandingColor("noteless");
    const accentColor = useLandingColor("accentA");
    const router = useRouter();
    const linkClick = (link: string) => {
        return () => {
            if (link.startsWith("/")) router.push(link);
            else window.open(link, "_blank");
        };
    };
    return (
        <Box
            sx={{
                background: alpha(useThemeColor("barBackground"), 0.67),
                width: "100%",
                borderColor: alpha(theme.palette.divider, 0.5),
                borderWidth: "1px 0px 0px 0px",
                padding: "50px 0px",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    fontSize: "20px",
                    fontFamily: "Cascadia",
                    width: "fit-content",
                    margin: "0 auto",
                    color,
                    padding: "0 15px",
                    lineHeight: 1.25,
                }}
            >
                {footer.map((item) => {
                    const text = (lang.ru ? item.content_ru : item.content_en)
                        .replace(/\[CurrentYear\]/g, String(new Date().getFullYear()));
                    return renderContent(text, color);
                })}
                <Box
                    sx={{
                        display: "grid",
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
                    <Box sx={{ display: "flex" }}>
                        {contacts.map((contact, i) => (
                            <TransparentButton
                                key={contact.id}
                                onClick={linkClick(contact.url)}
                                dividerSize={i === contacts.length - 1 ? "collapsed" : undefined}
                            >
                                <DynamicIcon svg={contact.icon_svg} name={contact.icon} />
                            </TransparentButton>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
