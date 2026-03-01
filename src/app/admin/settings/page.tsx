"use client";

import { useState, FormEvent } from "react";
import { Box, TextField, Button, Typography, Alert, Card, CardContent, useTheme } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { __ } from "@/shared/lib/i18n";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { getThemeColor } from "@/shared/lib/theme";

export default function AdminSettingsPage() {
    const theme = useTheme();
    const menuText = getThemeColor("menuText", theme);
    const { lang } = useLanguage();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        if (newPassword !== confirmPassword) {
            setError(__("New passwords do not match", lang));
            return;
        }

        if (newPassword.length < 6) {
            setError(__("New password must be at least 6 characters", lang));
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.error || "Failed to update password");
            }

            setSuccess(__("Password updated successfully", lang));
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
                <SettingsIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: menuText }}>
                    {__("Settings", lang)}
                </Typography>
            </Box>

            <Card
                sx={{
                    maxWidth: 500,
                    border: `1px solid ${theme.palette.divider}`,
                    background: getThemeColor("barBackground", theme),
                }}
                elevation={0}
            >
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: menuText, mb: 2 }}>
                        {__("Change Password", lang)}
                    </Typography>

                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {success}
                        </Alert>
                    )}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label={__("Current Password", lang)}
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            margin="dense"
                            size="small"
                            autoComplete="current-password"
                            required
                        />
                        <TextField
                            fullWidth
                            label={__("New Password", lang)}
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            margin="dense"
                            size="small"
                            autoComplete="new-password"
                            required
                        />
                        <TextField
                            fullWidth
                            label={__("Confirm New Password", lang)}
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            margin="dense"
                            size="small"
                            autoComplete="new-password"
                            required
                        />
                        <Button
                            type="submit"
                            variant="outlined"
                            color="regular"
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >
                            {loading ? __("Updating...", lang) : __("Update Password", lang)}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
