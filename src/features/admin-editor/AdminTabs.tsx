"use client";

import { useState, useCallback, useRef, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Box, Tabs, Tab, useTheme } from "@mui/material";
import { __ } from "@/shared/lib/i18n";

interface AdminTabsProps {
    value: number;
    onChange: (value: number) => void;
    labels: string[];
    lang: "en" | "ru";
    sx?: Record<string, unknown>;
}

export default function AdminTabs({ value, onChange, labels, lang, sx }: AdminTabsProps) {
    const theme = useTheme();
    const tabsRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    const measure = useCallback(() => {
        const container = tabsRef.current;
        if (!container) return;
        const activeTab = container.querySelectorAll(".MuiTab-root")[value] as HTMLElement | null;
        const scroller = container.querySelector(".MuiTabs-scroller") as HTMLElement | null;
        if (activeTab && scroller) {
            const scrollerRect = scroller.getBoundingClientRect();
            const tabRect = activeTab.getBoundingClientRect();
            const left = tabRect.left - scrollerRect.left;
            const width = tabRect.width;
            setIndicatorStyle((prev) =>
                prev.left === left && prev.width === width ? prev : { left, width },
            );
        }
    }, [value, lang]);

    const callbackRef = useCallback((node: HTMLDivElement | null) => {
        tabsRef.current = node;
        if (node) setMounted(true);
    }, []);

    useLayoutEffect(measure, [measure]);
    useEffect(() => { if (mounted) measure(); }, [mounted, measure]);
    useEffect(() => {
        const scroller = tabsRef.current?.querySelector(".MuiTabs-scroller");
        if (!scroller) return;
        const onScroll = () => measure();
        scroller.addEventListener("scroll", onScroll);
        return () => scroller.removeEventListener("scroll", onScroll);
    }, [mounted, measure]);

    return (
        <Box sx={{ position: "relative", mb: 3, ...sx }}>
            <Tabs
                ref={callbackRef}
                value={value}
                onChange={(_, v) => onChange(v)}
                variant="scrollable"
                scrollButtons="auto"
                TabIndicatorProps={{ style: { display: "none" } }}
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    "& .MuiTab-root": { textTransform: "none", fontWeight: 500 },
                    "& .MuiTabScrollButton-root.Mui-disabled": { width: 0, opacity: 0, transition: "width 0.3s, opacity 0.3s" },
                }}
            >
                {labels.map((label) => (
                    <Tab key={label} label={__(label, lang)} />
                ))}
            </Tabs>
            <motion.div
                animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                style={{
                    position: "absolute",
                    bottom: 0,
                    height: 2,
                    backgroundColor: theme.palette.primary.main,
                    pointerEvents: "none",
                }}
            />
        </Box>
    );
}
