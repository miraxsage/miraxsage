"use client";

import { Box, Typography, Alert, CircularProgress, useTheme } from "@mui/material";
import { getThemeColor } from "@/shared/lib/theme";

interface AdminSectionProps {
    title: string;
    icon?: React.ReactNode;
    saving?: boolean;
    error?: string;
    success?: string;
    children: React.ReactNode;
}

export default function AdminSection({
    title,
    icon,
    saving,
    error,
    success,
    children,
}: AdminSectionProps) {
    const theme = useTheme();
    const menuText = getThemeColor("menuText", theme);

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                    gap: 1.5,
                }}
            >
                {icon}
                <Typography variant="h5" sx={{ fontWeight: 600, color: menuText }}>
                    {title}
                </Typography>
                {saving && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 0.5 }}>
                        <CircularProgress size={14} color="inherit" />
                        <Typography variant="caption" color="text.secondary">
                            Saving...
                        </Typography>
                    </Box>
                )}
            </Box>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                </Alert>
            )}
            {children}
        </Box>
    );
}
