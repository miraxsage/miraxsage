"use client";
import { ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import { getThemeColor } from "@/shared/lib/theme";
import { useColorMode } from "@/shared/lib/store/appearanceSlice";

interface ProjectContentRendererProps {
    html: string;
    mediaId: string;
    images: Array<{ slug: string; original_ext: string }>;
    onImageClick?: (imgSlug: string) => void;
}

export default function ProjectContentRenderer({ html, mediaId, images, onImageClick }: ProjectContentRendererProps) {
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    if (!html) return null;

    // Add text-indent and text-align to all <p> tags
    const styledHtml = html.replace(/<p([^>]*)>/g, (match, attrs: string) => {
        if (attrs.includes("style=")) {
            return match.replace(/style="/, 'style="text-indent:40px;text-align:justify;');
        }
        return `<p${attrs} style="text-indent:40px;text-align:justify;">`;
    });

    const IMAGE_RE = /\[Image:([a-z0-9_-]+)\]/g;
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let imageCount = 0;
    let match: RegExpExecArray | null;

    while ((match = IMAGE_RE.exec(styledHtml)) !== null) {
        if (match.index > lastIndex) {
            parts.push(
                <div key={`html-${lastIndex}`} dangerouslySetInnerHTML={{ __html: styledHtml.slice(lastIndex, match.index) }} />
            );
        }

        const slug = match[1];
        const side: "left" | "right" = imageCount % 2 === 0 ? "left" : "right";
        const image = images.find((i) => i.slug === slug);

        if (image) {
            const imgSrc = `/img/projects/${mediaId}/${slug}-tiny.webp`;
            const imgSx = {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "opacity 0.2s, transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
            } as const;
            parts.push(
                <Box
                    key={`img-${slug}`}
                    onClick={() => onImageClick?.(slug)}
                    sx={{
                        width: "380px",
                        height: "200px",
                        float: side,
                        margin: side === "left" ? "15px 25px 15px 0px" : "15px 0px 15px 25px",
                        borderRadius: "4px",
                        border: `1px solid ${theme.palette.divider}`,
                        cursor: onImageClick ? "pointer" : "default",
                        position: "relative",
                        overflow: "hidden",
                        background: getThemeColor("layoutBackground", theme),
                        "&:hover img:last-of-type": {
                            opacity: isDarkMode ? 0.8 : 1,
                            transform: "scale(1.05)",
                        },
                        "@media (max-width: 520px)": {
                            float: "none",
                            clear: "both",
                            margin: "15px auto",
                            display: "block",
                        },
                        [theme.breakpoints.down("sm")]: {
                            width: "340px",
                            height: "179px",
                        },
                        "@media (max-width: 375px)": {
                            width: "330px",
                            height: "173px",
                        },
                    }}
                >
                    <Box
                        component="img"
                        src={imgSrc}
                        alt={slug}
                        sx={{
                            ...imgSx,
                            mixBlendMode: isDarkMode ? "soft-light" : "normal",
                            filter: isDarkMode ? "grayscale(1) contrast(0.6)" : "grayscale(1)",
                            opacity: isDarkMode ? 1 : 0.55,
                        }}
                    />
                    <Box
                        component="img"
                        src={imgSrc}
                        alt={slug}
                        sx={{
                            ...imgSx,
                            position: "absolute",
                            top: 0,
                            left: 0,
                            opacity: 0,
                        }}
                    />
                </Box>
            );
            imageCount++;
        }

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < styledHtml.length) {
        parts.push(
            <div key={`html-${lastIndex}`} dangerouslySetInnerHTML={{ __html: styledHtml.slice(lastIndex) }} />
        );
    }

    return (
        <Box sx={{ background: getThemeColor("layoutBackground", theme) }}>
            {parts}
        </Box>
    );
}
