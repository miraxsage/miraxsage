"use client";
import { ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import { getThemeColor } from "@/shared/lib/theme";

interface ProjectContentRendererProps {
    html: string;
    mediaId: string;
    images: Array<{ slug: string; original_ext: string }>;
    onImageClick?: (imgSlug: string) => void;
}

export default function ProjectContentRenderer({ html, mediaId, images, onImageClick }: ProjectContentRendererProps) {
    const theme = useTheme();
    if (!html) return null;

    const IMAGE_RE = /\[Image:([a-z0-9_-]+)\]/g;
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let imageCount = 0;
    let match: RegExpExecArray | null;

    while ((match = IMAGE_RE.exec(html)) !== null) {
        if (match.index > lastIndex) {
            parts.push(
                <div key={`html-${lastIndex}`} dangerouslySetInnerHTML={{ __html: html.slice(lastIndex, match.index) }} />
            );
        }

        const slug = match[1];
        const side: "left" | "right" = imageCount % 2 === 0 ? "left" : "right";
        const image = images.find((i) => i.slug === slug);

        if (image) {
            parts.push(
                <Box
                    key={`img-${slug}`}
                    component="img"
                    src={`/img/projects/${mediaId}/${slug}${image.original_ext}`}
                    alt={slug}
                    onClick={() => onImageClick?.(slug)}
                    sx={{
                        width: "380px",
                        height: "200px",
                        objectFit: "cover",
                        float: side,
                        margin: side === "left" ? "15px 25px 15px 0px" : "15px 0px 15px 25px",
                        borderRadius: "4px",
                        border: `1px solid ${theme.palette.divider}`,
                        cursor: onImageClick ? "pointer" : "default",
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
                />
            );
            imageCount++;
        }

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < html.length) {
        parts.push(
            <div key={`html-${lastIndex}`} dangerouslySetInnerHTML={{ __html: html.slice(lastIndex) }} />
        );
    }

    return (
        <Box sx={{ background: getThemeColor("layoutBackground", theme) }}>
            {parts}
        </Box>
    );
}
