"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Box, Card, CardContent, TextField, Button, Typography, Alert, useTheme } from "@mui/material";
import MiraxsageIcon from "@/shared/icons/MiraxsageIcon";
import { getThemeColor } from "@/shared/lib/theme";

export default function AdminLoginPage() {
    const theme = useTheme();
    const router = useRouter();
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
                        <Box sx={{ width: 56, height: 56, mb: 2 }}>
                            <MiraxsageIcon />
                        </Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                color: getThemeColor("menuText", theme),
                            }}
                        >
                            Admin Panel
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
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            autoComplete="username"
                            autoFocus
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            autoComplete="current-password"
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, py: 1.2 }}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
