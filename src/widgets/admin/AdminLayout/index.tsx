"use client";

import { useState } from "react";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getThemeColor } from "@/shared/lib/theme";
import AdminSidebar from "@/widgets/admin/AdminSidebar";

const SIDEBAR_WIDTH = 280;

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            {/* Sidebar */}
            <Box
                sx={{
                    width: SIDEBAR_WIDTH,
                    minWidth: SIDEBAR_WIDTH,
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
                              left: sidebarOpen ? 0 : -SIDEBAR_WIDTH,
                              zIndex: 1200,
                              transition: "left 0.3s ease",
                          }
                        : {}),
                }}
            >
                <AdminSidebar onNavigate={() => isSmallScreen && setSidebarOpen(false)} />
            </Box>

            {/* Overlay for small screens */}
            {isSmallScreen && sidebarOpen && (
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
                {isSmallScreen && (
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

                <Box sx={{ p: 3 }}>{children}</Box>
            </Box>
        </Box>
    );
}
