"use client";

import { Theme } from "@mui/material";
import { getThemeColor } from "@/shared/lib/theme";
import type { InfoDrawerBlock } from "@/shared/lib/infoDrawerDefaults";

const VARIANT_LAYOUTS = ["donut", "compact", "pie"] as const;

/**
 * Convert any CSS color (hex, rgb, rgba) to 6-digit hex without '#'.
 * For rgba with alpha < 1, flattens against bgHex.
 */
export function toHex(color: string, bgHex = "ffffff"): string {
    color = color.trim();

    // Already hex
    if (color.startsWith("#")) {
        const hex = color.slice(1);
        if (hex.length === 3) return hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        return hex.slice(0, 6);
    }

    // rgb(r, g, b) or rgba(r, g, b, a)
    const match = color.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\s*\)/);
    if (match) {
        let r = Math.round(Number(match[1]));
        let g = Math.round(Number(match[2]));
        let b = Math.round(Number(match[3]));
        const a = match[4] !== undefined ? Number(match[4]) : 1;

        if (a < 1) {
            // Flatten against background
            const bgR = parseInt(bgHex.slice(0, 2), 16);
            const bgG = parseInt(bgHex.slice(2, 4), 16);
            const bgB = parseInt(bgHex.slice(4, 6), 16);
            r = Math.round(r * a + bgR * (1 - a));
            g = Math.round(g * a + bgG * (1 - a));
            b = Math.round(b * a + bgB * (1 - a));
        }

        return (
            r.toString(16).padStart(2, "0") +
            g.toString(16).padStart(2, "0") +
            b.toString(16).padStart(2, "0")
        );
    }

    // Fallback
    return "888888";
}

export function buildBlockUrl(block: InfoDrawerBlock, theme: Theme, username: string, locale: "en" | "ru" = "en"): string {
    const bg = toHex(getThemeColor("layoutBackground", theme));
    const title = toHex(theme.palette.primary.main);
    const text = toHex(getThemeColor("menuText", theme), bg);
    const icon = toHex(getThemeColor("regularText", theme), bg);
    const border = toHex(theme.palette.divider, bg);

    switch (block.id) {
        case "stats":
            return `https://github-readme-stats.vercel.app/api?username=${username}&locale=${locale}&bg_color=${bg}&title_color=${title}&text_color=${text}&icon_color=${icon}&border_color=${border}&hide_border=false`;

        case "languages": {
            const layout = VARIANT_LAYOUTS[block.variant] ?? "donut";
            return `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&locale=${locale}&layout=${layout}&bg_color=${bg}&title_color=${title}&text_color=${text}&icon_color=${icon}&border_color=${border}&hide_border=false`;
        }

        case "streak":
            return `https://streak-stats.demolab.com/?user=${username}&locale=${locale}&background=${bg}&ring=${title}&fire=${title}&currStreakLabel=${text}&sideLabels=${text}&currStreakNum=${title}&sideNums=${title}&dates=${icon}&border=${border}`;

        case "activity":
            return `https://github-readme-activity-graph.vercel.app/graph?username=${username}&bg_color=${bg}&color=${text}&line=${title}&point=${title}&area_color=${title}&area=true&hide_border=false`;

        default:
            return "";
    }
}
