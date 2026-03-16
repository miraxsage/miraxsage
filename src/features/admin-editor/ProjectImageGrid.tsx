"use client";

import { useState } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Button, CircularProgress, IconButton, Typography, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getThemeColor } from "@/shared/lib/theme";
import { __ } from "@/shared/lib/i18n";
import type { ProjectImage } from "@/entities/project/model/projectImage";
import ImageModal from "./ImageModal";
import useLocalizedField from "./useLocalizedField";

interface ProjectImageGridProps {
    projectId: number;
    mediaId: string;
    images: ProjectImage[];
    onImagesChange: (images: ProjectImage[]) => void;
    loading?: boolean;
}

function SortableImageCell({
    image,
    mediaId,
    projectId,
    onImagesChange,
    images,
    onClick,
}: {
    image: ProjectImage;
    mediaId: string;
    projectId: number;
    onImagesChange: (images: ProjectImage[]) => void;
    images: ProjectImage[];
    onClick: () => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: image.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const res = await fetch(`/api/projects/${projectId}/images`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image_id: image.id }),
            });
            if (res.ok) {
                onImagesChange(images.filter((img) => img.id !== image.id));
            }
        } catch {
            // silent
        }
    };

    const isCover = image.is_cover === 1;

    return (
        <Box
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={onClick}
            sx={{
                position: "relative",
                aspectRatio: "1",
                borderRadius: "6px",
                overflow: "hidden",
                cursor: "pointer",
                outline: isCover ? "2px solid" : undefined,
                outlineColor: isCover ? "secondary.main" : undefined,
                outlineOffset: "3px",
                "&:hover .delete-btn": { opacity: 1 },
            }}
        >
            <Box
                component="img"
                src={`/img/projects/${mediaId}/${image.slug}-tiny.webp`}
                alt={image.slug}
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "4px",
                    display: "block",
                }}
            />
            {isCover && (
                <Typography
                    sx={{
                        position: "absolute",
                        top: 4,
                        left: 4,
                        bgcolor: "secondary.main",
                        color: "#fff",
                        fontSize: 9,
                        lineHeight: 1,
                        px: 0.5,
                        py: 0.25,
                        borderRadius: 0.5,
                        fontWeight: 700,
                    }}
                >
                    COVER
                </Typography>
            )}
            <IconButton
                className="delete-btn"
                size="small"
                onClick={handleDelete}
                sx={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    opacity: 0,
                    transition: "opacity 0.2s",
                    bgcolor: "rgba(128,128,128,0.7)",
                    color: "#fff",
                    width: 22,
                    height: 22,
                    "&:hover": { bgcolor: "error.main" },
                }}
            >
                <DeleteIcon sx={{ fontSize: 14 }} />
            </IconButton>
        </Box>
    );
}

export default function ProjectImageGrid({
    projectId,
    mediaId,
    images,
    onImagesChange,
    loading,
}: ProjectImageGridProps) {
    const theme = useTheme();
    const { lang } = useLocalizedField();
    const menuText = getThemeColor("menuText", theme);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);
    const [modalMode, setModalMode] = useState<"view" | "create">("view");

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = images.findIndex((img) => img.id === active.id);
        const newIndex = images.findIndex((img) => img.id === over.id);
        const reordered = arrayMove(images, oldIndex, newIndex);

        const order = reordered.map((img, i) => ({
            id: img.id,
            sort_order: i,
        }));

        onImagesChange(reordered);

        try {
            await fetch(`/api/projects/${projectId}/images/reorder`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order }),
            });
        } catch {
            // silent
        }
    };

    const handleImageClick = (index: number) => {
        setModalIndex(index);
        setModalMode("view");
        setModalOpen(true);
    };

    const handleAddClick = () => {
        setModalMode("create");
        setModalOpen(true);
    };

    return (
        <Box>
            <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: menuText, mb: 1 }}
            >
                {__("Images", lang)}
            </Typography>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={images.map((img) => img.id)}
                    strategy={rectSortingStrategy}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(8, 1fr)",
                            gap: 1,
                        }}
                    >
                        {images.map((image, index) => (
                            <SortableImageCell
                                key={image.id}
                                image={image}
                                mediaId={mediaId}
                                projectId={projectId}
                                onImagesChange={onImagesChange}
                                images={images}
                                onClick={() => handleImageClick(index)}
                            />
                        ))}
                    </Box>
                </SortableContext>
            </DndContext>

            {loading && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.75, color: "regular.main", fontSize: "1.05rem", lineHeight: 1.75 }}>
                    <CircularProgress size={20} color="inherit" />
                    {__("Loading...", lang)}
                </Box>
            )}

            <Button
                variant="outlined"
                color="regular"
                startIcon={<AddIcon />}
                onClick={handleAddClick}
                sx={{ mt: loading ? 0 : 1 }}
            >
                {__("Image", lang)}
            </Button>

            <ImageModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                projectId={projectId}
                mediaId={mediaId}
                images={images}
                initialIndex={modalIndex}
                mode={modalMode}
                onImagesChange={onImagesChange}
            />
        </Box>
    );
}
