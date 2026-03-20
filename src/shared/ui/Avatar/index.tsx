"use client";

import MiraxsageIcon from "@/shared/icons/MiraxsageIcon";
import { Box, alpha, useTheme } from "@mui/material";
import { useSiteSettings } from "@/shared/lib/siteSettings";

export default function Avatar({ contrast }: { contrast?: boolean }) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const settings = useSiteSettings();
    const customSrc = isDarkMode ? settings.avatar_dark : settings.avatar_light;
    const gridPaleColor = alpha(theme.palette.divider, 0.25);
    const gridStrongColor = alpha(theme.palette.divider, 0.4);
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `repeating-linear-gradient(
                    to right,
                    transparent 0px,
                    transparent 9px,
                    ${gridPaleColor} 9px,
                    ${gridPaleColor} 10px
                  ),
                  repeating-linear-gradient(
                    to right,
                    transparent 0px,
                    transparent 49px,
                    ${gridStrongColor} 49px,
                    ${gridStrongColor} 50px
                  ),
                  repeating-linear-gradient(
                    to bottom,
                    transparent 0px,
                    transparent 9px,
                    ${gridPaleColor} 9px,
                    ${gridPaleColor} 10px
                  ),
                  repeating-linear-gradient(
                    to bottom,
                    transparent 0px,
                    transparent 49px,
                    ${gridStrongColor} 49px,
                    ${gridStrongColor} 50px
                  )`,
            }}
        >
            {customSrc ? (
                <Box
                    component="img"
                    src={customSrc}
                    alt="Avatar"
                    sx={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                    }}
                />
            ) : (
                <Box sx={{ width: "248px" }}>
                    <MiraxsageIcon contrast={contrast} />
                </Box>
            )}
        </Box>
    );
}
