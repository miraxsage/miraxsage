"use client";

import { useEffect, useState } from "react";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import type { InfoDrawerBlock } from "@/shared/lib/infoDrawerDefaults";
import type { ProcessedGitHubStats } from "@/app/api/github-stats/route";
import BlockRenderer from "./blocks/BlockRenderer";

interface StatsBlocksProps {
    blocks: InfoDrawerBlock[];
    username: string;
}

export default function StatsBlocks({ blocks, username }: StatsBlocksProps) {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [data, setData] = useState<ProcessedGitHubStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        fetch(`/api/github-stats?username=${username}`)
            .then((res) => res.json())
            .then((json) => {
                if (!cancelled) {
                    setData(json);
                    setLoading(false);
                }
            })
            .catch(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, [username]);

    const visibleBlocks = blocks.filter((b) => b.is_visible);
    if (visibleBlocks.length === 0) return null;

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4, mt: 2 }}>
                <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} />
            </Box>
        );
    }

    if (!data) return null;

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: smScreen ? "1fr" : "1fr 1fr",
                gap: 1.5,
                mt: 2.5,
            }}
        >
            {visibleBlocks.map((block) => (
                <Box
                    key={block.id}
                    sx={{
                        gridColumn: (smScreen ? 1 : block.col_span) === 2 ? "span 2" : undefined,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        overflow: "hidden",
                        p: 1.5,
                    }}
                >
                    <BlockRenderer blockId={block.id} data={data} username={username} />
                </Box>
            ))}
        </Box>
    );
}
