"use client";

import { Box, alpha, useMediaQuery, useTheme } from "@mui/material";
import { HorizontalPanelButton } from "@/shared/ui/PanelButtons";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getThemeColor, useThemeColor } from "@/shared/lib/theme";
import type { ContactItem } from "@/widgets/landing/MainSlide";
import DynamicIcon from "@/shared/ui/DynamicIcon";
import SharePopup, { useSharePopup } from "@/shared/ui/SharePopup";
import { useUiLabels } from "@/entities/ui-labels/model/uiLabelsContext";
import { useInfoDrawerVisibility } from "@/shared/lib/store/appearanceSlice";

export default function BottomBar({ contacts }: { contacts: ContactItem[] }) {
    const theme = useTheme();
    const goTo = (link: string) => () => {
        window.open(link, "_blank");
    };
    const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const t = useUiLabels();
    const footerText = t("Footer").replace(/\[CurrentYear\]/g, String(new Date().getFullYear()));
    const infoDrawerVisibility = useInfoDrawerVisibility();
    const sharePopup = useSharePopup();
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
                    <HorizontalPanelButton
                        iconMode={true}
                        onClick={infoDrawerVisibility.toggle}
                        sx={{
                            width: "64px",
                            transition: "all 0.4s",
                            ...(infoDrawerVisibility.shown
                                ? {
                                      "&.MuiButton-root": {
                                          color: getThemeColor("accentedText", theme),
                                          backgroundColor: alpha(getThemeColor("accentedBg", theme), 0.07),
                                          "&:hover": {
                                              backgroundColor: getThemeColor("accentedHoverBg", theme),
                                              color: getThemeColor("accentedHoverText", theme),
                                          },
                                      },
                                  }
                                : {}),
                        }}
                    >
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
                        style={{ color: theme.palette.divider }}
                    >
                        {footerText}
                    </Box>
                </>
            )}
            {contacts.map((contact, i) => (
                <HorizontalPanelButton
                    key={contact.id}
                    onClick={contact.type === "share" ? sharePopup.handleOpen : goTo(contact.url)}
                    dividerSide="left"
                    dividerSize={i === 0 ? "removed" : "squeezed"}
                    iconMode={true}
                >
                    <DynamicIcon svg={contact.icon_svg} name={contact.icon} />
                </HorizontalPanelButton>
            ))}
            <SharePopup {...sharePopup} mode="panel" />
        </Box>
    );
}
