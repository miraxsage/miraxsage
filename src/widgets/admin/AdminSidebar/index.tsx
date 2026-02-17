"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Button,
    Divider,
    useTheme,
    alpha,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CallIcon from "@mui/icons-material/Call";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MiraxsageIcon from "@/shared/icons/MiraxsageIcon";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { getThemeColor } from "@/shared/lib/theme";

const NAV_ITEMS = [
    { label: "Dashboard", icon: DashboardIcon, path: "/admin/dashboard" },
    { label: "Landing", icon: HomeIcon, path: "/admin/landing" },
    { label: "Resume", icon: AssignmentIndIcon, path: "/admin/resume" },
    { label: "Projects", icon: RocketLaunchIcon, path: "/admin/projects" },
    { label: "Contacts", icon: CallIcon, path: "/admin/contacts" },
    { label: "Settings", icon: SettingsIcon, path: "/admin/settings" },
] as const;

interface AdminSidebarProps {
    onNavigate?: () => void;
}

export default function AdminSidebar({ onNavigate }: AdminSidebarProps) {
    const theme = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const { lang, update: updateLanguage } = useLanguage();

    const regularText = getThemeColor("regularText", theme);
    const activeText = getThemeColor("tabActiveText", theme);
    const hoverBg = getThemeColor("tabHoverBg", theme);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
        } finally {
            router.push("/admin/login");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
            {/* Logo area */}
            <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box sx={{ width: 36, height: 36, flexShrink: 0 }}>
                    <MiraxsageIcon />
                </Box>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        color: getThemeColor("menuText", theme),
                        whiteSpace: "nowrap",
                    }}
                >
                    Admin Panel
                </Typography>
            </Box>

            <Divider />

            {/* Locale selector */}
            <Box sx={{ px: 2, py: 1, display: "flex", gap: 0.5 }}>
                {(["ru", "en"] as const).map((locale) => (
                    <Button
                        key={locale}
                        size="small"
                        variant={lang === locale ? "contained" : "text"}
                        onClick={() => updateLanguage(locale)}
                        sx={{
                            minWidth: 40,
                            fontSize: "0.75rem",
                            fontWeight: lang === locale ? 700 : 400,
                            color: lang === locale ? undefined : regularText,
                            textTransform: "uppercase",
                        }}
                    >
                        {locale}
                    </Button>
                ))}
            </Box>

            <Divider />

            {/* Navigation */}
            <List sx={{ flex: 1, overflow: "auto", px: 1, py: 1 }}>
                {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
                    const isActive = pathname === path || pathname.startsWith(path + "/");
                    return (
                        <ListItemButton
                            key={path}
                            component={Link}
                            href={path}
                            onClick={onNavigate}
                            selected={isActive}
                            sx={{
                                borderRadius: 1,
                                mb: 0.5,
                                color: isActive ? activeText : regularText,
                                bgcolor: isActive ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                                "&:hover": {
                                    bgcolor: isActive ? alpha(theme.palette.primary.main, 0.15) : hoverBg,
                                },
                                "& .MuiListItemIcon-root": {
                                    color: isActive ? activeText : getThemeColor("regularIcon", theme),
                                    minWidth: 40,
                                },
                            }}
                        >
                            <ListItemIcon>
                                <Icon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary={label}
                                primaryTypographyProps={{
                                    fontSize: "0.9rem",
                                    fontWeight: isActive ? 600 : 400,
                                }}
                            />
                        </ListItemButton>
                    );
                })}
            </List>

            <Divider />

            {/* Logout */}
            <Box sx={{ p: 1 }}>
                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        borderRadius: 1,
                        color: regularText,
                        "&:hover": {
                            bgcolor: hoverBg,
                            color: theme.palette.error.main,
                            "& .MuiListItemIcon-root": { color: theme.palette.error.main },
                        },
                        "& .MuiListItemIcon-root": { color: getThemeColor("regularIcon", theme), minWidth: 40 },
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Logout"
                        primaryTypographyProps={{ fontSize: "0.9rem" }}
                    />
                </ListItemButton>
            </Box>
        </Box>
    );
}
