"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Box, Typography, useTheme } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import TuneIcon from "@mui/icons-material/Tune";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CallIcon from "@mui/icons-material/Call";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoIcon from "@/shared/icons/Logo";
import LanguageIcon from "@/shared/icons/LanguageIcon";
import AccentedTabs from "@/shared/ui/AccentedTabs";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { __ } from "@/shared/lib/i18n";
import { getThemeColor } from "@/shared/lib/theme";
import { motion } from "framer-motion";

const NAV_ITEMS = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { label: "Landing", icon: <HomeIcon />, path: "/admin/landing" },
    { label: "Details", icon: <TuneIcon />, path: "/admin/details" },
    { label: "Resume", icon: <AssignmentIndIcon />, path: "/admin/resume", sub: true },
    { label: "Projects", icon: <RocketLaunchIcon />, path: "/admin/projects", sub: true },
    { label: "Contacts", icon: <CallIcon />, path: "/admin/contacts", sub: true },
    { label: "Settings", icon: <SettingsIcon />, path: "/admin/settings" },
];

interface AdminSidebarProps {
    onNavigate?: () => void;
}

export default function AdminSidebar({ onNavigate }: AdminSidebarProps) {
    const theme = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const { lang, update: updateLanguage } = useLanguage();
    const isDarkMode = theme.palette.mode === "dark";

    const activePath = NAV_ITEMS.find(
        ({ path }) => pathname === path || pathname.startsWith(path + "/")
    )?.path ?? null;

    // +2: +1 for the language toggle at children[0], +1 because AccentedTabs uses i+1 for data-tab-id
    const subPaddingSx = Object.fromEntries(
        NAV_ITEMS
            .map((n, i) => ({ ...n, tabIndex: i + 2 }))
            .filter((n) => n.sub)
            .map(({ tabIndex }) => [
                `& .MuiTab-root[data-tab-id="${tabIndex}"]`,
                { padding: "12px 38px 12px 34px !important" },
            ]),
    );

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
        } finally {
            router.push("/admin/login");
        }
    };

    const tabColorsSx = {
        "& .MuiTab-root": { color: getThemeColor("tabIcon", theme), gap: "8px", justifyContent: "flex-start", padding: "12px 38px 12px 18px" },
        "& .MuiTab-root:hover": { color: getThemeColor("tabHoverIcon", theme) },
        "& .MuiTab-root.Mui-selected": { color: getThemeColor("tabActiveText", theme) },
        "& .MuiTab-root::before": { width: "100%", left: "0" },
        "& .MuiTab-root:last-of-type::before": { display: "none" },
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
            {/* Logo area */}
            <Box
                component={Link}
                href="/"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    pl: "18px",
                    pr: "38px",
                    minHeight: 55,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    textDecoration: "none",
                }}
            >
                <Box
                    sx={{
                        width: 30,
                        height: 30,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "& svg": { width: 26, height: 26 },
                        color: getThemeColor("tabIcon", theme),
                    }}
                >
                    <LogoIcon />
                </Box>
                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: "1.05rem",
                        color: getThemeColor("tabIcon", theme),
                        whiteSpace: "nowrap",
                    }}
                >
                    Miraxsage
                </Typography>
            </Box>

            {/* Navigation */}
            <Box sx={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <AccentedTabs
                    activeTab={activePath}
                    orientation="vertical"
                    mode="full"
                    underline={false}
                    onTabSelect={(tab) => {
                        router.push(tab.id as string);
                        onNavigate?.();
                    }}
                    sx={{ ...tabColorsSx, ...subPaddingSx }}
                >
                    {[
                        {
                            id: "language",
                            title: lang === "ru" ? "Русский" : "English",
                            notTogglable: true,
                            icon: (hovered: boolean) => (
                                <motion.div
                                    animate={{
                                        filter: hovered ? "grayscale(0)" : "grayscale(1)",
                                        opacity: hovered ? 1 : isDarkMode ? 0.5 : 0.4,
                                    }}
                                >
                                    <LanguageIcon language={lang} />
                                </motion.div>
                            ),
                            onClick() {
                                updateLanguage(lang === "ru" ? "en" : "ru");
                            },
                        },
                        ...NAV_ITEMS.map(({ label, icon, path }) => ({
                            id: path,
                            title: __(label, lang),
                            icon,
                        })),
                    ]}
                </AccentedTabs>
            </Box>

            {/* Logout */}
            <Box
                onClick={handleLogout}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    minHeight: 55,
                    padding: "12px 38px 12px 18px",
                    cursor: "pointer",
                    color: getThemeColor("tabIcon", theme),
                    borderTop: `1px solid ${theme.palette.divider}`,
                    ...theme.typography.button,
                    transition: "color 0.3s, background 0.2s ease-in-out 0.1s",
                    "&:hover": {
                        color: theme.palette.error.main,
                        backgroundColor: getThemeColor("tabHoverBg", theme),
                    },
                }}
            >
                <LogoutIcon />
                <span>{__("Logout", lang)}</span>
            </Box>
        </Box>
    );
}
