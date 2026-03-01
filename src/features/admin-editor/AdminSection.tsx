"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Box, Typography, Alert, CircularProgress, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AnimatePresence, motion } from "framer-motion";
import { getThemeColor } from "@/shared/lib/theme";

interface AdminSectionProps {
    title: string;
    icon?: React.ReactNode;
    saving?: boolean;
    error?: string;
    success?: string;
    children: React.ReactNode;
}

type IndicatorState = "hidden" | "saving" | "success";

export default function AdminSection({
    title,
    icon,
    saving,
    error,
    success,
    children,
}: AdminSectionProps) {
    const theme = useTheme();
    const menuText = getThemeColor("menuText", theme);

    const [indicator, setIndicator] = useState<IndicatorState>("hidden");
    const successDelayRef = useRef<ReturnType<typeof setTimeout>>();
    const hideRef = useRef<ReturnType<typeof setTimeout>>();

    const clearTimers = useCallback(() => {
        if (successDelayRef.current) clearTimeout(successDelayRef.current);
        if (hideRef.current) clearTimeout(hideRef.current);
    }, []);

    useEffect(() => {
        if (saving) {
            clearTimers();
            setIndicator("saving");
        } else if (success) {
            // Delay showing check so rapid saves stay on spinner
            clearTimers();
            successDelayRef.current = setTimeout(() => {
                setIndicator("success");
                hideRef.current = setTimeout(() => setIndicator("hidden"), 1500);
            }, 400);
        }
    }, [saving, success, clearTimers]);

    useEffect(() => clearTimers, [clearTimers]);

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                    gap: 1.5,
                }}
            >
                {icon}
                <Typography variant="h5" sx={{ fontWeight: 600, color: menuText }}>
                    {title}
                </Typography>
            </Box>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <AnimatePresence>
                {indicator !== "hidden" && (
                    <motion.div
                        key="save-indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: "fixed",
                            top: 16,
                            right: 16,
                            zIndex: 1300,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {indicator === "saving" ? (
                                <motion.div
                                    key="spinner"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    style={{ display: "flex" }}
                                >
                                    <CircularProgress size={20} color="inherit" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="check"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    style={{ display: "flex" }}
                                >
                                    <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 24 }} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </Box>
    );
}
