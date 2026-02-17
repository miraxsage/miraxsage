"use client";

import { Box, Typography, Button, Alert, CircularProgress, useTheme } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { getThemeColor } from "@/shared/lib/theme";

interface AdminSectionProps {
    title: string;
    icon?: React.ReactNode;
    saving?: boolean;
    error?: string;
    success?: string;
    onSave?: () => void;
    children: React.ReactNode;
}

export default function AdminSection({
    title,
    icon,
    saving,
    error,
    success,
    onSave,
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
                    justifyContent: "space-between",
                    mb: 3,
                    flexWrap: "wrap",
                    gap: 1,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    {icon}
                    <Typography variant="h5" sx={{ fontWeight: 600, color: menuText }}>
                        {title}
                    </Typography>
                </Box>
                {onSave && (
                    <Button
                        variant="contained"
                        startIcon={saving ? <CircularProgress size={16} /> : <SaveIcon />}
                        onClick={onSave}
                        disabled={saving}
                        sx={{ py: 1 }}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
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
