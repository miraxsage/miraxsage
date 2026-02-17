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
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    Box,
    IconButton,
    Paper,
    useTheme,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getThemeColor } from "@/shared/lib/theme";

interface SortableItemProps {
    id: string | number;
    children: React.ReactNode;
    onDelete?: () => void;
}

function SortableItem({ id, children, onDelete }: SortableItemProps) {
    const theme = useTheme();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <Paper
            ref={setNodeRef}
            style={style}
            elevation={isDragging ? 4 : 0}
            sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                p: 1.5,
                mb: 1,
                border: `1px solid ${theme.palette.divider}`,
                background: getThemeColor("barBackground", theme),
            }}
        >
            <IconButton
                size="small"
                {...attributes}
                {...listeners}
                sx={{ cursor: "grab", mt: 0.5 }}
            >
                <DragIndicatorIcon fontSize="small" />
            </IconButton>
            <Box sx={{ flex: 1 }}>{children}</Box>
            {onDelete && (
                <IconButton
                    size="small"
                    onClick={onDelete}
                    sx={{ color: theme.palette.error.main, mt: 0.5 }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            )}
        </Paper>
    );
}

export interface SortableListProps<T extends { id: number | string }> {
    items: T[];
    onReorder: (items: T[]) => void;
    onDelete?: (id: number | string) => void;
    onAdd?: () => void;
    addLabel?: string;
    renderItem: (item: T, index: number) => React.ReactNode;
}

export default function SortableList<T extends { id: number | string }>({
    items,
    onReorder,
    onDelete,
    onAdd,
    addLabel = "Add Item",
    renderItem,
}: SortableListProps<T>) {
    const theme = useTheme();
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            onReorder(arrayMove(items, oldIndex, newIndex));
        }
    };

    return (
        <Box>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items.map((i) => i.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map((item, index) => (
                        <SortableItem
                            key={item.id}
                            id={item.id}
                            onDelete={onDelete ? () => onDelete(item.id) : undefined}
                        >
                            {renderItem(item, index)}
                        </SortableItem>
                    ))}
                </SortableContext>
            </DndContext>
            {onAdd && (
                <IconButton
                    onClick={onAdd}
                    sx={{
                        mt: 1,
                        border: `1px dashed ${theme.palette.divider}`,
                        borderRadius: 1,
                        width: "100%",
                        py: 1,
                        color: theme.palette.primary.main,
                    }}
                >
                    <AddIcon sx={{ mr: 0.5 }} /> {addLabel}
                </IconButton>
            )}
        </Box>
    );
}

export { SortableItem };
