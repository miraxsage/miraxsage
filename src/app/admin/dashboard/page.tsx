"use client";

import Link from "next/link";
import { Box, Card, CardContent, Typography, Grid, useTheme, alpha } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CallIcon from "@mui/icons-material/Call";
import SettingsIcon from "@mui/icons-material/Settings";
import { getThemeColor } from "@/shared/lib/theme";

const SECTIONS = [
    { label: "Landing", icon: HomeIcon, path: "/admin/landing", description: "Manage landing page content" },
    { label: "Resume", icon: AssignmentIndIcon, path: "/admin/resume", description: "Edit resume and CV data" },
    { label: "Projects", icon: RocketLaunchIcon, path: "/admin/projects", description: "Manage portfolio projects" },
    { label: "Contacts", icon: CallIcon, path: "/admin/contacts", description: "View and manage contacts" },
    { label: "Settings", icon: SettingsIcon, path: "/admin/settings", description: "Application settings" },
] as const;

export default function AdminDashboardPage() {
    const theme = useTheme();
    const regularText = getThemeColor("regularText", theme);
    const menuText = getThemeColor("menuText", theme);

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
                <DashboardIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: menuText }}>
                    Dashboard
                </Typography>
            </Box>

            {/* Welcome card */}
            <Card
                sx={{
                    mb: 4,
                    background: alpha(theme.palette.primary.main, 0.06),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                }}
                elevation={0}
            >
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: menuText, mb: 1 }}>
                        Welcome to the Admin Panel
                    </Typography>
                    <Typography sx={{ color: regularText, fontSize: "0.95rem" }}>
                        Manage your portfolio content, resume data, projects, and site settings from here.
                        Use the sidebar navigation or the quick links below to get started.
                    </Typography>
                </CardContent>
            </Card>

            {/* Quick links */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: menuText, mb: 2 }}>
                Quick Links
            </Typography>
            <Grid container spacing={2}>
                {SECTIONS.map(({ label, icon: Icon, path, description }) => (
                    <Grid item xs={12} sm={6} md={4} key={path}>
                        <Card
                            component={Link}
                            href={path}
                            sx={{
                                display: "block",
                                textDecoration: "none",
                                border: `1px solid ${theme.palette.divider}`,
                                background: getThemeColor("barBackground", theme),
                                transition: "all 0.2s",
                                "&:hover": {
                                    borderColor: alpha(theme.palette.primary.main, 0.4),
                                    bgcolor: getThemeColor("cardHoverBg", theme),
                                },
                            }}
                            elevation={0}
                        >
                            <CardContent sx={{ p: 2.5 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                                    <Icon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                                    <Typography sx={{ fontWeight: 600, color: menuText, fontSize: "0.95rem" }}>
                                        {label}
                                    </Typography>
                                </Box>
                                <Typography sx={{ color: regularText, fontSize: "0.85rem" }}>
                                    {description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
