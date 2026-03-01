"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getThemeColor } from "@/shared/lib/theme";
import AdminSidebar from "@/widgets/admin/AdminSidebar";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
    const pathname = usePathname();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isLoginPage = pathname === "/admin/login";

    return (
        <Box sx={{ display: "flex", height: "100vh", width: "100%", overflow: "hidden" }}>
            {/* Sidebar — hidden on login page */}
            {!isLoginPage && (
                <Box
                    sx={{
                        flexShrink: 0,
                        width: 248,
                        height: "100vh",
                        background: getThemeColor("barBackground", theme),
                        borderRight: `1px solid ${theme.palette.divider}`,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        ...(isSmallScreen
                            ? {
                                  position: "fixed",
                                  top: 0,
                                  left: 0,
                                  zIndex: 1200,
                                  transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
                                  transition: "transform 0.3s ease",
                              }
                            : {}),
                    }}
                >
                    <AdminSidebar onNavigate={() => isSmallScreen && setSidebarOpen(false)} />
                </Box>
            )}

            {/* Overlay for small screens */}
            {!isLoginPage && isSmallScreen && sidebarOpen && (
                <Box
                    onClick={() => setSidebarOpen(false)}
                    sx={{
                        position: "fixed",
                        inset: 0,
                        bgcolor: "rgba(0,0,0,0.5)",
                        zIndex: 1199,
                    }}
                />
            )}

            {/* Content area */}
            <Box
                sx={{
                    flex: 1,
                    height: "100vh",
                    overflow: "auto",
                    background: getThemeColor("layoutBackground", theme),
                }}
            >
                {/* Mobile header */}
                {!isLoginPage && isSmallScreen && (
                    <Box
                        sx={{
                            p: 1,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            background: getThemeColor("barBackground", theme),
                        }}
                    >
                        <IconButton onClick={() => setSidebarOpen(true)} size="small">
                            <MenuIcon />
                        </IconButton>
                    </Box>
                )}

                <Box sx={{ p: isLoginPage ? 0 : 3 }}>{children}</Box>
            </Box>
        </Box>
    );
}
