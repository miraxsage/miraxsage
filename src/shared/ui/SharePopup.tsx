"use client";

import { useState, useCallback, useMemo } from "react";
import { Box, Popper, Portal, Paper, ClickAwayListener, ButtonBase, alpha, useTheme } from "@mui/material";
import { getThemeColor } from "@/shared/lib/theme";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { useSharingLinks } from "@/shared/lib/sharingLinksContext";
import DynamicIcon from "@/shared/ui/DynamicIcon";
import getShareUrl from "@/shared/lib/getShareUrl";

interface SharePopupProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    /** "bottom" = prefer opening downward, "top" = prefer opening upward */
    preferDirection?: "bottom" | "top";
    iconFontSize?: string;
    /**
     * "dropdown" — Popper-based, opens near the anchor button
     * "panel" — fixed panel: right-aligned with layout edge, bottom above footer
     */
    mode?: "dropdown" | "panel";
}

function ShareItems({ links, iconFontSize, onClose, lang }: {
    links: Array<{ id: number; type: string; title_en: string; title_ru: string; icon: string; icon_svg?: string }>;
    iconFontSize: string;
    onClose: () => void;
    lang: { ru: boolean };
}) {
    const theme = useTheme();
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const pageTitle = typeof document !== "undefined" ? document.title : "";

    return (
        <>
            {links.map((link) => (
                <ButtonBase
                    key={link.id}
                    onClick={() => {
                        const url = getShareUrl(link.type, pageUrl, pageTitle);
                        if (url.startsWith("mailto:") || url.startsWith("viber:")) {
                            window.location.href = url;
                        } else {
                            window.open(url, "_blank", "noopener,noreferrer");
                        }
                        onClose();
                    }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        width: "100%",
                        px: 2,
                        py: 0.75,
                        justifyContent: "flex-start",
                        font: "inherit",
                        color: getThemeColor("menuText", theme),
                        "&:hover": {
                            backgroundColor: alpha(theme.palette.action.hover, 0.08),
                        },
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                        <DynamicIcon svg={link.icon_svg} name={link.icon} fontSize={iconFontSize} />
                    </Box>
                    <Box sx={{ whiteSpace: "nowrap" }}>
                        {lang.ru ? link.title_ru : link.title_en}
                    </Box>
                </ButtonBase>
            ))}
        </>
    );
}

export default function SharePopup({ anchorEl, open, onClose, preferDirection = "bottom", iconFontSize = "1.5rem", mode = "dropdown" }: SharePopupProps) {
    const sharingLinks = useSharingLinks();
    const lang = useLanguage();
    const theme = useTheme();
    const visibleLinks = sharingLinks.filter((l) => l.is_visible === 1);

    // Calculate positioning from the anchor element
    const positionInfo = useMemo(() => {
        if (!anchorEl || !open) return { panel: {}, dropdownMaxHeight: "60vh" as string | number };
        const anchorRect = anchorEl.getBoundingClientRect();
        const margin = 8;

        // Dropdown mode: calculate max height based on available space
        const spaceBelow = window.innerHeight - anchorRect.bottom - margin;
        const spaceAbove = anchorRect.top - margin;
        const dropdownMaxHeight = preferDirection === "top"
            ? Math.max(spaceAbove, 120)
            : Math.max(Math.max(spaceBelow, spaceAbove), 120);

        if (mode !== "panel") return { panel: {}, dropdownMaxHeight };

        // Panel mode: fixed position right-aligned with layout container
        const footerEl = anchorEl.closest("footer") ?? anchorEl.parentElement;
        if (!footerEl) return { panel: {}, dropdownMaxHeight };
        const footerRect = footerEl.getBoundingClientRect();
        let container = footerEl.parentElement;
        while (container && container !== document.body) {
            const br = getComputedStyle(container).borderRadius;
            if (br && br !== "0px") break;
            container = container.parentElement;
        }
        const containerRect = container?.getBoundingClientRect();
        const containerRight = containerRect ? window.innerWidth - containerRect.right : 0;
        const containerTop = containerRect?.top ?? 0;
        // Find the header: look for <header> element, or first child of the grid container
        const headerEl = container?.querySelector("header")
            ?? container?.firstElementChild;
        const headerBottom = headerEl
            ? (headerEl as HTMLElement).getBoundingClientRect().bottom
            : containerTop;

        return {
            panel: {
                right: containerRight,
                bottom: window.innerHeight - footerRect.top,
                maxHeight: footerRect.top - headerBottom,
            },
            dropdownMaxHeight,
        };
    }, [mode, anchorEl, open, preferDirection]);

    if (!open || !anchorEl || visibleLinks.length === 0) return null;

    const paperSx = {
        border: `1px solid ${theme.palette.divider}`,
        background: getThemeColor("barBackground", theme),
        borderRadius: "12px",
        minWidth: 160,
        overflow: "hidden" as const,
        fontFamily: "Cascadia, monospace",
        fontSize: "1.0715rem",
    };

    const scrollSx = {
        overflowY: "auto" as const,
        py: 0.5,
        mr: "3px",
        "&::-webkit-scrollbar": { width: "2px" },
        "&::-webkit-scrollbar-track": { background: "transparent" },
        "&::-webkit-scrollbar-thumb": {
            background: getThemeColor("scrollbarHandle", theme),
            borderRadius: "1px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            background: getThemeColor("scrollbarHoverHandle", theme),
        },
        "@supports not selector(::-webkit-scrollbar)": {
            scrollbarWidth: "thin",
            scrollbarColor: `${getThemeColor("scrollbarHandle", theme)} transparent`,
        },
    };

    if (mode === "panel") {
        return (
            <Portal>
                <ClickAwayListener onClickAway={onClose}>
                    <Paper
                        elevation={8}
                        sx={{
                            ...paperSx,
                            position: "fixed",
                            right: positionInfo.panel.right ?? 0,
                            bottom: positionInfo.panel.bottom ?? 0,
                            zIndex: theme.zIndex.modal,
                        }}
                    >
                        <Box sx={{ ...scrollSx, maxHeight: positionInfo.panel.maxHeight ?? "80vh" }}>
                            <ShareItems links={visibleLinks} iconFontSize={iconFontSize} onClose={onClose} lang={lang} />
                        </Box>
                    </Paper>
                </ClickAwayListener>
            </Portal>
        );
    }

    const isSmallScreen = typeof window !== "undefined" && window.innerWidth <= 768;

    if (isSmallScreen) {
        const anchorRect = anchorEl.getBoundingClientRect();
        const margin = 8;
        // Find container bounds: walk up to find the content container
        // Try border-radius first, then fall back to narrowest ancestor smaller than viewport
        let boundsRect: DOMRect | null = null;
        let node: HTMLElement | null = anchorEl.parentElement;
        while (node && node !== document.body) {
            const br = getComputedStyle(node).borderRadius;
            if (br && br !== "0px") { boundsRect = node.getBoundingClientRect(); break; }
            node = node.parentElement;
        }
        if (!boundsRect) {
            // Fallback: find the content container — the first ancestor wider than the buttons row
            const rowRect = anchorEl.parentElement?.getBoundingClientRect();
            const rowWidth = rowRect?.width ?? 0;
            node = anchorEl.parentElement?.parentElement ?? null;
            while (node && node !== document.body) {
                const r = node.getBoundingClientRect();
                if (r.width > rowWidth && r.width < window.innerWidth - 20) {
                    boundsRect = r;
                    break;
                }
                node = node.parentElement;
            }
        }
        const leftBound = (boundsRect?.left ?? 0) + margin;
        const rightBound = window.innerWidth - (boundsRect?.right ?? window.innerWidth) + margin;
        const spaceBelow = window.innerHeight - anchorRect.bottom - margin;
        const spaceAbove = anchorRect.top - margin;
        const openUp = spaceBelow < 200 && spaceAbove > spaceBelow;
        const maxH = openUp ? spaceAbove : spaceBelow;

        return (
            <Portal>
                <ClickAwayListener onClickAway={onClose}>
                    <Paper
                        elevation={8}
                        sx={{
                            ...paperSx,
                            position: "fixed",
                            left: leftBound,
                            right: rightBound,
                            ...(openUp
                                ? { bottom: window.innerHeight - anchorRect.top + 4 }
                                : { top: anchorRect.bottom + 4 }),
                            zIndex: theme.zIndex.modal,
                        }}
                    >
                        <Box sx={{ ...scrollSx, maxHeight: maxH }}>
                            <ShareItems links={visibleLinks} iconFontSize={iconFontSize} onClose={onClose} lang={lang} />
                        </Box>
                    </Paper>
                </ClickAwayListener>
            </Portal>
        );
    }

    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement={preferDirection === "top" ? "top" : "bottom"}
            modifiers={[
                { name: "flip", enabled: true },
                { name: "offset", options: { offset: [0, 4] } },
            ]}
            style={{ zIndex: theme.zIndex.modal }}
        >
            <ClickAwayListener onClickAway={onClose}>
                <Paper elevation={8} sx={paperSx}>
                    <Box sx={{ ...scrollSx, maxHeight: positionInfo.dropdownMaxHeight }}>
                        <ShareItems links={visibleLinks} iconFontSize={iconFontSize} onClose={onClose} lang={lang} />
                    </Box>
                </Paper>
            </ClickAwayListener>
        </Popper>
    );
}

/** Hook to manage share popup state — returns props compatible with SharePopup spread */
export function useSharePopup() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);
    const onClose = useCallback(() => {
        setAnchorEl(null);
    }, []);
    return { anchorEl, open, handleOpen, onClose };
}
