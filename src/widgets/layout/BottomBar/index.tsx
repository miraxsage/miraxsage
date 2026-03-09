"use client";

import { Box, alpha, useMediaQuery, useTheme } from "@mui/material";
import { HorizontalPanelButton } from "@/shared/ui/PanelButtons";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useThemeColor } from "@/shared/lib/theme";
import { useColorMode } from "@/shared/lib/store/appearanceSlice";
import type { ContactItem } from "@/widgets/landing/MainSlide";
import DynamicIcon from "@/shared/ui/DynamicIcon";

export default function BottomBar({ contacts }: { contacts: ContactItem[] }) {
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
                    <HorizontalPanelButton iconMode={true} sx={{ width: "64px" }}>
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
            {contacts.map((contact, i) => (
                <HorizontalPanelButton
                    key={contact.id}
                    onClick={goTo(contact.url)}
                    dividerSide="left"
                    dividerSize={i === 0 ? (smScreen ? "removed" : "full") : "squeezed"}
                    iconMode={true}
                >
                    <DynamicIcon svg={contact.icon_svg} name={contact.icon} />
                </HorizontalPanelButton>
            ))}
        </Box>
    );
}
