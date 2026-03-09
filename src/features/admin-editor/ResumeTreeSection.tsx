"use client";

import { useCallback, useMemo, useState } from "react";
import useLocalizedField from "@/features/admin-editor/useLocalizedField";
import {
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
    TextField,
    Checkbox,
    Tooltip,
    Paper,
    Button,
    useTheme,
} from "@mui/material";
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
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { getThemeColor } from "@/shared/lib/theme";
import { IconPickerButton } from "@/features/admin-editor";
import { __ } from "@/shared/lib/i18n";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TreeItem {
    id: number;
    sort_order: number;
    label_en: string;
    label_ru: string;
    icon: string;
    parent_id: number | null;
}

export interface TreeDataItem {
    id: number;
    sort_order: number;
    field_key: string;
    label_en: string;
    label_ru: string;
    value_en: string;
    value_ru: string;
    is_full_line: number;
    [key: string]: unknown;
}

interface ResumeTreeSectionProps {
    items: TreeItem[];
    data: TreeDataItem[];
    foreignKey: string;
    onItemsChange: (items: TreeItem[]) => void;
    onDataChange: (data: TreeDataItem[]) => void;
    onSave: (newItems?: TreeItem[], newData?: TreeDataItem[]) => void;
    nextTempId: () => number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function stampSortOrder<T extends { id: number | string }>(arr: T[]): (T & { sort_order: number })[] {
    return arr.map((item, i) => ({ ...item, sort_order: i + 1 }));
}

// ─── DataItemRow ─────────────────────────────────────────────────────────────

interface DataItemRowProps {
    item: TreeDataItem;
    onChange: (field: string, value: unknown) => void;
    onDelete: () => void;
    onSave: () => void;
}

function DataItemRow({ item, onChange, onDelete, onSave }: DataItemRowProps) {
    const theme = useTheme();
    const { lk, lv, lang } = useLocalizedField();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    const tooltipFullLine = __("Display as full line", lang);

    return (
        <Paper
            ref={setNodeRef}
            style={style}
            elevation={isDragging ? 4 : 0}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                px: 1.5,
                py: 1,
                mb: 1,
                border: `1px solid ${theme.palette.divider}`,
                background: getThemeColor("barBackground", theme),
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton size="small" {...attributes} {...listeners} sx={{ cursor: "grab", flexShrink: 0 }}>
                    <DragIndicatorIcon fontSize="small" />
                </IconButton>
                <TextField
                    label={__("Label", lang)}
                    size="small"
                    value={lv(item, "label")}
                    onChange={(e) => onChange(lk("label"), e.target.value)}
                    onBlur={onSave}
                    sx={{ flex: item.is_full_line ? 1 : "0 0 200px" }}
                />
                {!item.is_full_line && (
                    <TextField
                        label={__("Value", lang)}
                        size="small"
                        value={lv(item, "value")}
                        onChange={(e) => onChange(lk("value"), e.target.value)}
                        onBlur={onSave}
                        sx={{ flex: 1 }}
                    />
                )}
                <Tooltip title={tooltipFullLine} placement="top">
                    <Checkbox
                        size="small"
                        checked={item.is_full_line === 1}
                        onChange={(e) => { onChange("is_full_line", e.target.checked ? 1 : 0); onSave(); }}
                        sx={{ flexShrink: 0 }}
                    />
                </Tooltip>
                <IconButton size="small" onClick={onDelete} sx={{ flexShrink: 0, color: getThemeColor("tabIcon", theme), "&:hover": { color: theme.palette.error.main } }}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>
            {!!item.is_full_line && (
                <TextField
                    label={__("Value", lang)}
                    size="small"
                    fullWidth
                    multiline
                    minRows={1}
                    value={lv(item, "value")}
                    onChange={(e) => onChange(lk("value"), e.target.value)}
                    onBlur={onSave}
                />
            )}
        </Paper>
    );
}

// ─── DataList ─────────────────────────────────────────────────────────────────

interface DataListProps {
    items: TreeDataItem[];
    onReorder: (reordered: TreeDataItem[]) => void;
    onChange: (id: number, field: string, value: unknown) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
    onSave: () => void;
}

function DataList({ items, onReorder, onChange, onDelete, onAdd, onSave }: DataListProps) {
    const { lang } = useLocalizedField();
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((i) => i.id === active.id);
            const newIndex = items.findIndex((i) => i.id === over.id);
            onReorder(arrayMove(items, oldIndex, newIndex));
        }
    };

    const addLabel = __("Data entry", lang);

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                {items.map((item) => (
                    <DataItemRow
                        key={item.id}
                        item={item}
                        onChange={(field, value) => onChange(item.id, field, value)}
                        onDelete={() => onDelete(item.id)}
                        onSave={onSave}
                    />
                ))}
            </SortableContext>
            <Button variant="outlined" color="regular" startIcon={<AddIcon />} onClick={onAdd} sx={{ alignSelf: "flex-start" }}>
                {addLabel}
            </Button>
        </DndContext>
    );
}

// ─── TreeItemRow ──────────────────────────────────────────────────────────────

interface TreeItemRowProps {
    item: TreeItem;
    depth: number;
    allItems: TreeItem[];
    allData: TreeDataItem[];
    foreignKey: string;
    onItemChange: (id: number, field: string, value: unknown) => void;
    onItemDelete: (id: number) => void;
    onChildReorder: (parentId: number, reordered: TreeItem[]) => void;
    onChildAdd: (parentId: number) => void;
    onDataReorder: (parentId: number, reordered: TreeDataItem[]) => void;
    onDataAdd: (parentId: number) => void;
    onDataChange: (id: number, field: string, value: unknown) => void;
    onDataDelete: (id: number) => void;
    onSave: (newItems?: TreeItem[], newData?: TreeDataItem[]) => void;
    nextTempId: () => number;
}

function TreeItemRow({
    item, depth, allItems, allData, foreignKey,
    onItemChange, onItemDelete,
    onChildReorder, onChildAdd,
    onDataReorder, onDataAdd,
    onDataChange, onDataDelete,
    onSave, nextTempId,
}: TreeItemRowProps) {
    const theme = useTheme();
    const { lk, lv, lang } = useLocalizedField();
    const [expanded, setExpanded] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    const children = useMemo(
        () => allItems.filter((i) => i.parent_id === item.id).sort((a, b) => a.sort_order - b.sort_order),
        [allItems, item.id],
    );
    const dataItems = useMemo(
        () => allData.filter((d) => d[foreignKey] === item.id).sort((a, b) => a.sort_order - b.sort_order),
        [allData, foreignKey, item.id],
    );

    const hasChildren = children.length > 0;
    const hasData = dataItems.length > 0;
    const isEmpty = !hasChildren && !hasData;

    const bgMap = ["titleBg", "layoutBackground", "barBackground"] as const;
    const bg = getThemeColor(bgMap[Math.min(depth, 2)], theme);

    const addChildLabel = __("Element", lang);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const handleChildDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = children.findIndex((c) => c.id === active.id);
            const newIndex = children.findIndex((c) => c.id === over.id);
            onChildReorder(item.id, arrayMove(children, oldIndex, newIndex));
        }
    };

    return (
        <Box ref={setNodeRef} style={style} sx={{ opacity: isDragging ? 0.5 : 1, mb: 1 }}>
            <Accordion
                expanded={expanded}
                onChange={() => {}}
                disableGutters
                sx={{
                    background: bg,
                    boxShadow: "none",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "6px !important",
                    overflow: "visible",
                    "&:before": { display: "none" },
                    "& .MuiAccordionSummary-root": { minHeight: "42px", padding: "0 10px", cursor: "default" },
                    "& .MuiAccordionSummary-content": { margin: "6px 0", width: "100%" },
                    "& .MuiAccordionDetails-root": {
                        padding: "10px 12px",
                        background: getThemeColor("layoutBackground", theme),
                        borderTop: `1px solid ${theme.palette.divider}`,
                        borderRadius: "0 0 6px 6px",
                    },
                }}
            >
                <AccordionSummary>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 1 }} onClick={(e) => e.stopPropagation()}>
                        <IconButton size="small" {...attributes} {...listeners} sx={{ cursor: "grab", flexShrink: 0 }}>
                            <DragIndicatorIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => setExpanded((v) => !v)}
                            sx={{ flexShrink: 0, color: getThemeColor("regularIcon", theme) }}
                        >
                            {expanded ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                        </IconButton>
                        <IconPickerButton value={item.icon} onChange={(v) => { onItemChange(item.id, "icon", v); onSave(); }} sx={{ width: 28, height: 28 }} />
                        <TextField
                            label={__("Label", lang)}
                            size="small"
                            value={lv(item, "label")}
                            onChange={(e) => onItemChange(item.id, lk("label"), e.target.value)}
                            onBlur={() => onSave()}
                            sx={{ flex: 1, minWidth: 100 }}
                        />
                        <IconButton size="small" onClick={() => onItemDelete(item.id)} sx={{ flexShrink: 0, color: getThemeColor("tabIcon", theme), "&:hover": { color: theme.palette.error.main } }}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    {isEmpty && (
                        <Box sx={{ display: "flex", gap: "10px" }}>
                            {depth < 2 && (
                                <Button variant="outlined" color="regular" startIcon={<AddIcon />} onClick={() => onChildAdd(item.id)} sx={{ alignSelf: "flex-start" }}>
                                    {addChildLabel}
                                </Button>
                            )}
                            <Button variant="outlined" color="regular" startIcon={<AddIcon />} onClick={() => onDataAdd(item.id)} sx={{ alignSelf: "flex-start" }}>
                                {__("Data entry", lang)}
                            </Button>
                        </Box>
                    )}

                    {hasChildren && (
                        <>
                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleChildDragEnd}>
                                <SortableContext items={children.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                                    {children.map((child) => (
                                        <TreeItemRow
                                            key={child.id}
                                            item={child}
                                            depth={depth + 1}
                                            allItems={allItems}
                                            allData={allData}
                                            foreignKey={foreignKey}
                                            onItemChange={onItemChange}
                                            onItemDelete={onItemDelete}
                                            onChildReorder={onChildReorder}
                                            onChildAdd={onChildAdd}
                                            onDataReorder={onDataReorder}
                                            onDataAdd={onDataAdd}
                                            onDataChange={onDataChange}
                                            onDataDelete={onDataDelete}
                                            onSave={onSave}
                                            nextTempId={nextTempId}
                                        />
                                    ))}
                                </SortableContext>
                            </DndContext>
                            {depth < 2 && (
                                <Button variant="outlined" color="regular" startIcon={<AddIcon />} onClick={() => onChildAdd(item.id)} sx={{ alignSelf: "flex-start" }}>
                                    {addChildLabel}
                                </Button>
                            )}
                        </>
                    )}

                    {hasData && (
                        <DataList
                            items={dataItems}
                            onReorder={(reordered) => onDataReorder(item.id, reordered)}
                            onChange={onDataChange}
                            onDelete={onDataDelete}
                            onAdd={() => onDataAdd(item.id)}
                            onSave={onSave}
                        />
                    )}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

// ─── ResumeTreeSection ────────────────────────────────────────────────────────

export default function ResumeTreeSection({
    items, data, foreignKey,
    onItemsChange, onDataChange,
    onSave,
    nextTempId,
}: ResumeTreeSectionProps) {
    const { lang } = useLocalizedField();
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const roots = useMemo(
        () => items.filter((i) => i.parent_id === null).sort((a, b) => a.sort_order - b.sort_order),
        [items],
    );

    const handleItemChange = useCallback((id: number, field: string, value: unknown) => {
        onItemsChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
    }, [items, onItemsChange]);

    const handleItemDelete = useCallback((id: number) => {
        const descendants = (parentId: number): number[] => {
            const kids = items.filter((i) => i.parent_id === parentId).map((i) => i.id);
            return [...kids, ...kids.flatMap((k) => descendants(k))];
        };
        const toRemove = new Set([id, ...descendants(id)]);
        const newItems = stampSortOrder(items.filter((i) => !toRemove.has(i.id)));
        const newData = data.filter((d) => !toRemove.has(d[foreignKey] as number));
        onItemsChange(newItems);
        onDataChange(newData);
        onSave(newItems, newData);
    }, [items, data, foreignKey, onItemsChange, onDataChange, onSave]);

    const handleChildReorder = useCallback((parentId: number, reordered: TreeItem[]) => {
        const ordered = stampSortOrder(reordered);
        const otherItems = items.filter((i) => i.parent_id !== parentId);
        const newItems = [...otherItems, ...ordered];
        onItemsChange(newItems);
        onSave(newItems);
    }, [items, onItemsChange, onSave]);

    const handleChildAdd = useCallback((parentId: number) => {
        const newItem: TreeItem = {
            id: nextTempId(),
            sort_order: items.filter((i) => i.parent_id === parentId).length + 1,
            label_en: "",
            label_ru: "",
            icon: "",
            parent_id: parentId,
        };
        const newItems = [...items, newItem];
        onItemsChange(newItems);
        onSave(newItems);
    }, [items, nextTempId, onItemsChange, onSave]);

    const handleTopLevelDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = roots.findIndex((i) => i.id === active.id);
            const newIndex = roots.findIndex((i) => i.id === over.id);
            const reordered = stampSortOrder(arrayMove(roots, oldIndex, newIndex));
            const nonRoots = items.filter((i) => i.parent_id !== null);
            const newItems = [...reordered, ...nonRoots];
            onItemsChange(newItems);
            onSave(newItems);
        }
    }, [roots, items, onItemsChange, onSave]);

    const handleAddRoot = useCallback(() => {
        const newItem: TreeItem = {
            id: nextTempId(),
            sort_order: roots.length + 1,
            label_en: "",
            label_ru: "",
            icon: "",
            parent_id: null,
        };
        const newItems = [...items, newItem];
        onItemsChange(newItems);
        onSave(newItems);
    }, [items, roots, nextTempId, onItemsChange, onSave]);

    const handleDataReorder = useCallback((parentId: number, reordered: TreeDataItem[]) => {
        const ordered = stampSortOrder(reordered);
        const otherData = data.filter((d) => d[foreignKey] !== parentId);
        const newData = [...otherData, ...ordered];
        onDataChange(newData);
        onSave(undefined, newData);
    }, [data, foreignKey, onDataChange, onSave]);

    const handleDataAdd = useCallback((parentId: number) => {
        const newDataItem: TreeDataItem = {
            id: nextTempId(),
            sort_order: data.filter((d) => d[foreignKey] === parentId).length + 1,
            field_key: `field_${Date.now()}`,
            label_en: "",
            label_ru: "",
            value_en: "",
            value_ru: "",
            is_full_line: 0,
            [foreignKey]: parentId,
        };
        const newData = [...data, newDataItem];
        onDataChange(newData);
        onSave(undefined, newData);
    }, [data, foreignKey, nextTempId, onDataChange, onSave]);

    const handleDataChange = useCallback((id: number, field: string, value: unknown) => {
        onDataChange(data.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
    }, [data, onDataChange]);

    const handleDataDelete = useCallback((id: number) => {
        const newData = data.filter((d) => d.id !== id);
        onDataChange(newData);
        onSave(undefined, newData);
    }, [data, onDataChange, onSave]);

    const addRootLabel = __("Element", lang);

    return (
        <Box>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleTopLevelDragEnd}>
                <SortableContext items={roots.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                    {roots.map((root) => (
                        <TreeItemRow
                            key={root.id}
                            item={root}
                            depth={0}
                            allItems={items}
                            allData={data}
                            foreignKey={foreignKey}
                            onItemChange={handleItemChange}
                            onItemDelete={handleItemDelete}
                            onChildReorder={handleChildReorder}
                            onChildAdd={handleChildAdd}
                            onDataReorder={handleDataReorder}
                            onDataAdd={handleDataAdd}
                            onDataChange={handleDataChange}
                            onDataDelete={handleDataDelete}
                            onSave={onSave}
                            nextTempId={nextTempId}
                        />
                    ))}
                </SortableContext>
            </DndContext>
            <Button variant="outlined" color="regular" startIcon={<AddIcon />} onClick={handleAddRoot} sx={{ alignSelf: "flex-start" }}>
                {addRootLabel}
            </Button>
        </Box>
    );
}
