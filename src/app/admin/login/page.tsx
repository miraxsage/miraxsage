"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Box, Card, CardContent, TextField, Button, Typography, Alert, useTheme } from "@mui/material";
import LogoIcon from "@/shared/icons/Logo";
import { __ } from "@/shared/lib/i18n";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { getThemeColor } from "@/shared/lib/theme";

export default function AdminLoginPage() {
    const theme = useTheme();
    const router = useRouter();
    const { lang } = useLanguage();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.error || "Invalid credentials");
            }

            router.push("/admin/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: getThemeColor("layoutBackground", theme),
                p: 2,
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    background: getThemeColor("barBackground", theme),
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "6px",
                }}
                elevation={0}
            >
                <CardContent sx={{ p: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mb: 3,
                        }}
                    >
                        <Box sx={{ width: 56, height: 56, mb: 2, display: "flex", alignItems: "center", justifyContent: "center", "& svg": { width: 50, height: 50 } }}>
                            <LogoIcon />
                        </Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                color: getThemeColor("menuText", theme),
                            }}
                        >
                            Miraxsage
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label={__("Username", lang)}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="dense"
                            size="small"
                            autoComplete="username"
                            autoFocus
                            required
                        />
                        <TextField
                            fullWidth
                            label={__("Password", lang)}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="dense"
                            size="small"
                            autoComplete="current-password"
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="regular"
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >
                            {loading ? __("Signing in...", lang) : __("Sign In", lang)}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
