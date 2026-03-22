"use client";

import { Box, IconButton, Typography, alpha, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getThemeColor } from "@/shared/lib/theme";
import { useInfoDrawerVisibility, useLanguage, useScreenMode } from "@/shared/lib/store/appearanceSlice";
import { cubicBezier, motion } from "framer-motion";
import CustomScrollbar from "@/shared/ui/Scrollbar";
import { useInfoDrawerData } from "@/shared/lib/infoDrawerData";
import DynamicIcon from "@/shared/ui/DynamicIcon";
import StatsBlocks from "./StatsBlocks";

export default function InfoDrawer() {
    const theme = useTheme();
    const infoDrawerVisibility = useInfoDrawerVisibility();
    const screenMode = useScreenMode();
    const betweenSmLgScreen = useMediaQuery(theme.breakpoints.between("sm", "lg"));
    const lessMdScreen = useMediaQuery(theme.breakpoints.down("md"));
    const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const lang = useLanguage();
    const data = useInfoDrawerData();

    const copyright = ((lang.ru ? data.copyright_ru : data.copyright_en) ?? "")
        .replace(/\[CurrentYear\]/g, String(new Date().getFullYear()));
    const statusText = lang.ru ? data.status_text_ru : data.status_text_en;
    const locationText = lang.ru ? data.location_ru : data.location_en;

    const hasStatusRow = statusText || data.timezone || locationText;

    return (
        <>
            <motion.div
                onClick={infoDrawerVisibility.toggle}
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 3,
                    background: alpha(getThemeColor("barBackground", theme), 0.8),
                    backdropFilter: "blur(4px)",
                }}
                initial={false}
                animate={{
                    opacity: infoDrawerVisibility.shown ? 1 : 0,
                    visibility: infoDrawerVisibility.shown ? "visible" : "hidden",
                    transition: {
                        duration: 0.5,
                        visibility: { delay: infoDrawerVisibility.shown ? 0 : 0.6 },
                    },
                }}
            ></motion.div>
            <motion.div
                style={{
                    position: "absolute",
                    ...(betweenSmLgScreen && screenMode.window ? { inset: 0 } : { left: 0, top: 0 }),
                    height: "100%",
                    maxWidth: smScreen ? undefined : "min(75%, 800px)",
                    background: getThemeColor("layoutBackground", theme),
                    borderRight: `1px solid ${theme.palette.divider}`,
                    zIndex: 3,
                }}
                initial={false}
                animate={{
                    transition: {
                        duration: 0.3,
                        ease: cubicBezier(0.715, 0.01, 0.915, 0.46),
                    },
                    clipPath: infoDrawerVisibility.shown
                        ? "xywh(0% calc(-1 * min(15%, 15vh)) 110% calc(min(130%, 130vh)) round 0vmin 0vmin 0vmin 0vmin)"
                        : "xywh(-110% calc(-1 * min(30%, 15vh)) 110% calc(min(160%, 130vh)) round 0vmin 100vmin 100vmin 0vmin)",
                }}
            >
                <IconButton
                    onClick={infoDrawerVisibility.toggle}
                    sx={{
                        position: "absolute",
                        color: theme.palette.divider,
                        right: (betweenSmLgScreen && screenMode.window) || lessMdScreen ? "10px" : "-54px",
                        top: "10px",
                        zIndex: 4,
                        transition: "all 0.3s",
                        "&:hover": {
                            color: getThemeColor("regularText", theme),
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <CustomScrollbar>
                    <Box
                        sx={{
                            padding: "20px 22px",
                            fontFamily: "Cascadia",
                            fontWeight: 500,
                            [theme.breakpoints.between("sm", "md")]: {
                                padding: "20px 18px",
                            },
                            [theme.breakpoints.down("sm")]: {
                                padding: "15px",
                                minWidth: "300px",
                            },
                        }}
                    >
                        {/* Status / Timezone / Location — single row on desktop, column on mobile */}
                        {hasStatusRow && (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    gap: 2.5,
                                    [theme.breakpoints.down("sm")]: {
                                        flexDirection: "column",
                                        gap: 1.5,
                                    },
                                }}
                            >
                                {statusText && (
                                    <InfoRow
                                        iconName={data.status_icon}
                                        iconSvg={data.status_icon_svg}
                                        text={statusText}
                                    />
                                )}
                                {data.timezone && (
                                    <InfoRow
                                        iconName={data.timezone_icon}
                                        iconSvg={data.timezone_icon_svg}
                                        text={data.timezone}
                                    />
                                )}
                                {locationText && (
                                    <InfoRow
                                        iconName={data.location_icon}
                                        iconSvg={data.location_icon_svg}
                                        text={locationText}
                                    />
                                )}
                            </Box>
                        )}

                        {/* Copyright / Cookie text */}
                        {copyright && (
                            <Box
                                sx={{
                                    color: getThemeColor("regularText", theme),
                                    fontSize: "1rem",
                                    lineHeight: 1.6,
                                    mt: hasStatusRow ? 2.5 : 0,
                                    "& a": {
                                        color: getThemeColor("accentedText", theme),
                                        textDecoration: "none",
                                        "&:hover": { textDecoration: "underline" },
                                    },
                                    "& p": {
                                        margin: "4px 0",
                                    },
                                }}
                                dangerouslySetInnerHTML={{ __html: copyright }}
                            />
                        )}

                        {/* GitHub Stats Blocks */}
                        {data.blocks.length > 0 && (
                            <StatsBlocks
                                blocks={data.blocks}
                                username={data.github_username}
                            />
                        )}
                    </Box>
                </CustomScrollbar>
            </motion.div>
        </>
    );
}

function InfoRow({ iconName, iconSvg, text }: { iconName: string; iconSvg?: string; text: string }) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: getThemeColor("regularText", theme),
                whiteSpace: "nowrap",
                "& .MuiSvgIcon-root, & svg": {
                    fontSize: "19px",
                    color: getThemeColor("regularIcon", theme),
                    flexShrink: 0,
                },
            }}
        >
            <DynamicIcon name={iconName} svg={iconSvg} />
            <Typography
                sx={{
                    fontSize: "0.95rem",
                    fontFamily: "Cascadia",
                }}
            >
                {text}
            </Typography>
        </Box>
    );
}
