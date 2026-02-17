"use client";

import { useState, FormEvent } from "react";
import { Box, TextField, Button, Typography, Alert, Card, CardContent, useTheme } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { getThemeColor } from "@/shared/lib/theme";

export default function AdminSettingsPage() {
    const theme = useTheme();
    const menuText = getThemeColor("menuText", theme);

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
            setError("New passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters");
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

            setSuccess("Password updated successfully");
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
                    Settings
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
                        Change Password
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
                            label="Current Password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            margin="normal"
                            autoComplete="current-password"
                            required
                        />
                        <TextField
                            fullWidth
                            label="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            margin="normal"
                            autoComplete="new-password"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Confirm New Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            margin="normal"
                            autoComplete="new-password"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, py: 1.2 }}
                        >
                            {loading ? "Updating..." : "Update Password"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
