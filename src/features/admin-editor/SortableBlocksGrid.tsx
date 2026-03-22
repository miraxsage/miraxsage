"use client";

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { Box, CircularProgress, IconButton, Typography, alpha, useTheme } from "@mui/material";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getThemeColor } from "@/shared/lib/theme";
import type { InfoDrawerBlock } from "@/shared/lib/infoDrawerDefaults";
import type { ProcessedGitHubStats } from "@/app/api/github-stats/route";
import BlockRenderer from "@/widgets/layout/InfoDrawer/blocks/BlockRenderer";
import type { Theme } from "@mui/material";
import __ from "@/shared/lib/i18n/translation";

function BarsLoader({ color, size = 20 }: { color: string; size?: number }) {
    return (
        <Box
            sx={{
                width: size,
                aspectRatio: "5/4",
                "--c": `no-repeat linear-gradient(${color} 0 0)`,
                background: "var(--c), var(--c), var(--c)",
                animation: "bars-size 1s infinite, bars-pos 1s infinite",
                "@keyframes bars-size": {
                    "0%, 100%": { backgroundSize: "20% 100%" },
                    "33%, 66%": { backgroundSize: "20% 40%" },
                },
                "@keyframes bars-pos": {
                    "0%, 33%": { backgroundPosition: "0 0, 50% 100%, 100% 0" },
                    "66%, 100%": { backgroundPosition: "0 100%, 50% 0, 100% 100%" },
                },
            } as Record<string, unknown>}
        />
    );
}

const BLOCK_LABEL_KEYS: Record<string, string> = {
    profile: "Profile overview",
    calendar: "Contribution calendar",
    stats: "Stats",
    streak: "Streak",
    languages_repo: "Languages by repo",
    languages_commits: "Languages by commits",
    commits_hour: "Commits by hour",
    activity: "Activity graph",
};

interface SortableBlocksGridProps {
    blocks: InfoDrawerBlock[];
    onReorder: (blocks: InfoDrawerBlock[]) => void;
    onUpdate: (id: string, field: string, value: number) => void;
    onHide: (id: string) => void;
    username: string;
}

interface SortableBlockItemProps {
    block: InfoDrawerBlock;
    onUpdate: (id: string, field: string, value: number) => void;
    onHide: (id: string) => void;
    data: ProcessedGitHubStats | null;
    username: string;
    theme: Theme;
}

function SortableBlockItem({ block, onUpdate, onHide, data, username, theme }: SortableBlockItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: block.id });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const iconButtonSx = {
        color: theme.palette.divider,
        "&:hover": { color: getThemeColor("regularText", theme) },
    };

    return (
        <Box
            ref={setNodeRef}
            style={style}
            sx={{
                gridColumn: block.col_span === 2 ? "span 2" : undefined,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header bar */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "6px 10px",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    background: alpha(theme.palette.divider, 0.1),
                }}
            >
                <Typography
                    {...attributes}
                    {...listeners}
                    variant="subtitle2"
                    sx={{ cursor: "grab", flex: 1 }}
                >
                    {__(BLOCK_LABEL_KEYS[block.id] ?? block.id)}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {block.id === "languages" && (
                        <IconButton
                            size="small"
                            onClick={() => onUpdate(block.id, "variant", (block.variant + 1) % 3)}
                            sx={iconButtonSx}
                        >
                            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "0.75rem", lineHeight: 1 }}>
                                {block.variant + 1}
                            </Typography>
                        </IconButton>
                    )}
                    <IconButton
                        size="small"
                        onClick={() => onUpdate(block.id, "col_span", block.col_span === 1 ? 2 : 1)}
                        sx={iconButtonSx}
                    >
                        {block.col_span === 1 ? (
                            <ViewColumnIcon fontSize="small" />
                        ) : (
                            <ViewStreamIcon fontSize="small" />
                        )}
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => onHide(block.id)}
                        sx={iconButtonSx}
                    >
                        <VisibilityOffIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            {/* Body — block content */}
            <Box sx={{ p: 1.5, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {data ? (
                    <BlockRenderer blockId={block.id} data={data} username={username} />
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            py: 3,
                        }}
                    >
                        <BarsLoader color={theme.palette.divider} />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default function SortableBlocksGrid({
    blocks,
    onReorder,
    onUpdate,
    onHide,
    username,
}: SortableBlocksGridProps) {
    const theme = useTheme();
    const [data, setData] = useState<ProcessedGitHubStats | null>(null);

    useEffect(() => {
        let cancelled = false;
        fetch(`/api/github-stats?username=${username}`)
            .then((res) => res.json())
            .then((json) => { if (!cancelled) setData(json); })
            .catch(() => {});
        return () => { cancelled = true; };
    }, [username]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = blocks.findIndex((b) => b.id === active.id);
            const newIndex = blocks.findIndex((b) => b.id === over.id);
            onReorder(arrayMove(blocks, oldIndex, newIndex));
        }
    };

    return (
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={blocks.map((b) => b.id)}
                    strategy={rectSortingStrategy}
                >
                    {blocks.map((block) => (
                        <SortableBlockItem
                            key={block.id}
                            block={block}
                            onUpdate={onUpdate}
                            onHide={onHide}
                            data={data}
                            username={username}
                            theme={theme}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </Box>
    );
}
