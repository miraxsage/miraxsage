"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import {
    Box,
    Tabs,
    Tab,
    TextField,
    Typography,
    CircularProgress,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    IconButton,
    useTheme,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Switch,
    Paper,
    Tooltip,
} from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
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
import { SortableList, AdminSection, useAdminData, useLocalizedField, AdminKeyChip, IconPickerButton } from "@/features/admin-editor";
import UiLabelsEditor from "@/features/admin-editor/UiLabelsEditor";
import type { UiLabelItem } from "@/features/admin-editor/UiLabelsEditor";
import ResumeTreeSection from "@/features/admin-editor/ResumeTreeSection";
import type { TreeItem, TreeDataItem } from "@/features/admin-editor/ResumeTreeSection";
import { __ } from "@/shared/lib/i18n";
import { getThemeColor } from "@/shared/lib/theme";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Category {
    id: number;
    slug: string;
    sort_order: number;
    icon: string;
    label_en: string;
    label_ru: string;
    parent_id: number | null;
    is_visible: number;
    is_landing_visible: number;
}

interface GeneralDataItem {
    id: number;
    sort_order: number;
    field_key: string;
    label_en: string;
    label_ru: string;
    value_en: string;
    value_ru: string;
    value_format: string;
}

interface EducationItem {
    id: number;
    sort_order: number;
    label_en: string;
    label_ru: string;
    icon: string;
    parent_id: number | null;
}

interface EducationDataItem {
    id: number;
    education_item_id: number;
    sort_order: number;
    field_key: string;
    label_en: string;
    label_ru: string;
    value_en: string;
    value_ru: string;
    is_full_line: number;
}

interface LaborItem {
    id: number;
    sort_order: number;
    label_en: string;
    label_ru: string;
    icon: string;
    parent_id: number | null;
}

interface LaborDataItem {
    id: number;
    labor_item_id: number;
    sort_order: number;
    field_key: string;
    label_en: string;
    label_ru: string;
    value_en: string;
    value_ru: string;
    is_full_line: number;
}

interface QuestionnaireItem {
    id: number;
    sort_order: number;
    question_en: string;
    question_ru: string;
    answer_en: string;
    answer_ru: string;
    icon: string;
    parent_id: number | null;
}

interface AchievementItem {
    id: number;
    sort_order: number;
    content_en: string;
    content_ru: string;
}

interface SoftSkillItem {
    id: number;
    slug: string;
    label_en: string;
    label_ru: string;
    description_en: string;
    description_ru: string;
    icon: string;
    level_values: string;
}

interface MetricItem {
    id: number;
    slug: string;
    label_en: string;
    label_ru: string;
    chart_type: string;
    chart_data: string;
}

interface ResumeData {
    categories: Category[];
    general_data: GeneralDataItem[];
    education_items: EducationItem[];
    education_data: EducationDataItem[];
    labor_items: LaborItem[];
    labor_data: LaborDataItem[];
    questionnaire_items: QuestionnaireItem[];
    achievements: AchievementItem[];
    soft_skills: SoftSkillItem[];
    metrics: MetricItem[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let _nextTempId = -1;
function nextTempId() {
    return _nextTempId--;
}

const TAB_LABELS = [
    "Categories",
    "General",
    "Education",
    "Labor",
    "Questionnaire",
    "Achievements",
    "Soft Skills",
    "Metrics",
    "General Labels",
];

function stampSortOrder<T extends { id: number | string }>(items: T[]): (T & { sort_order: number })[] {
    return items.map((item, i) => ({ ...item, sort_order: i + 1 }));
}

// ---------------------------------------------------------------------------
// Categories Tab components
// ---------------------------------------------------------------------------

interface CategoryRowSharedProps {
    category: Category;
    lang: "en" | "ru";
    lk: (base: string) => string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lv: (item: any, base: string) => string;
    onUpdateField: (field: string, value: string) => void;
    onUpdateAndSave: (field: string, value: unknown) => void;
    onSave: () => void;
}

function CategoryAccordionRow({
    category,
    lang,
    lk,
    lv,
    onUpdateField,
    onUpdateAndSave,
    onSave,
    children,
    hasChildren,
}: CategoryRowSharedProps & { children?: React.ReactNode; hasChildren: boolean }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const landingVisibilityColor = isDark ? theme.palette.secondary.light : theme.palette.primary.light;
    const [expanded, setExpanded] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: category.id });

    const style = { transform: CSS.Transform.toString(transform), transition };

    const summaryRow = (
        <Box
            sx={{ display: "flex", alignItems: "center", width: "100%", gap: 1 }}
            onClick={(e) => e.stopPropagation()}
        >
            <IconButton size="small" {...attributes} {...listeners} sx={{ cursor: "grab", flexShrink: 0 }}>
                <DragIndicatorIcon fontSize="small" />
            </IconButton>
            <IconButton
                size="small"
                onClick={() => hasChildren && setExpanded((v) => !v)}
                sx={{ flexShrink: 0, opacity: hasChildren ? 1 : 0, pointerEvents: hasChildren ? "auto" : "none", color: getThemeColor("regularIcon", theme) }}
            >
                {expanded ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
            </IconButton>
            <Tooltip title={__("General visibility", lang)} placement="top">
                <Switch
                    checked={category.is_visible === 1}
                    onChange={(e) => onUpdateAndSave("is_visible", e.target.checked ? 1 : 0)}
                    size="small"
                    sx={{ flexShrink: 0 }}
                />
            </Tooltip>
            <Tooltip title={__("Landing visibility", lang)} placement="top">
                <Switch
                    checked={category.is_landing_visible === 1}
                    disabled={category.is_visible === 0}
                    onChange={(e) => onUpdateAndSave("is_landing_visible", e.target.checked ? 1 : 0)}
                    size="small"
                    sx={{
                        flexShrink: 0,
                        "& .MuiSwitch-switchBase.Mui-checked": { color: landingVisibilityColor },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: landingVisibilityColor },
                    }}
                />
            </Tooltip>
            <AdminKeyChip label={__(category.slug.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase()), lang)} sx={{ flexShrink: 0, width: "155px" }} />
            <IconPickerButton
                value={category.icon}
                onChange={(v) => onUpdateAndSave("icon", v)}
            />
            <TextField
                label={__("Label", lang)}
                size="small"
                value={lv(category, "label")}
                onChange={(e) => onUpdateField(lk("label"), e.target.value)}
                onBlur={onSave}
                sx={{ flex: 1, minWidth: 120 }}
            />
        </Box>
    );

    return (
        <Box ref={setNodeRef} style={style} sx={{ opacity: isDragging ? 0.5 : 1, mb: 1 }}>
            <Accordion
                expanded={hasChildren && expanded}
                onChange={() => {}}
                disableGutters
                sx={{
                    background: getThemeColor("titleBg", theme),
                    boxShadow: "none",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "6px !important",
                    "&:before": { display: "none" },
                    "& .MuiAccordionSummary-root": { minHeight: "42px", padding: "0 14px", cursor: "default" },
                    "& .MuiAccordionSummary-content": { margin: "8px 0", width: "100%" },
                    "& .MuiAccordionDetails-root": {
                        padding: "12px",
                        background: getThemeColor("layoutBackground", theme),
                        borderTop: `1px solid ${theme.palette.divider}`,
                    },
                }}
            >
                <AccordionSummary>
                    {summaryRow}
                </AccordionSummary>
                {hasChildren && <AccordionDetails>{children}</AccordionDetails>}
            </Accordion>
        </Box>
    );
}

function ChildCategoryRow({ category, lang, lk, lv, onUpdateField, onUpdateAndSave, onSave }: CategoryRowSharedProps) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const landingVisibilityColor = isDark ? theme.palette.secondary.light : theme.palette.primary.light;
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: category.id });

    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <Paper
            ref={setNodeRef}
            style={style}
            elevation={isDragging ? 4 : 0}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 1,
                mb: 1,
                border: `1px solid ${theme.palette.divider}`,
                background: getThemeColor("barBackground", theme),
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <IconButton size="small" {...attributes} {...listeners} sx={{ cursor: "grab", flexShrink: 0 }}>
                <DragIndicatorIcon fontSize="small" />
            </IconButton>
            <Tooltip title={__("General visibility", lang)} placement="top">
                <Switch
                    checked={category.is_visible === 1}
                    onChange={(e) => onUpdateAndSave("is_visible", e.target.checked ? 1 : 0)}
                    size="small"
                    sx={{ flexShrink: 0 }}
                />
            </Tooltip>
            <Tooltip title={__("Landing visibility", lang)} placement="top">
                <Switch
                    checked={category.is_landing_visible === 1}
                    disabled={category.is_visible === 0}
                    onChange={(e) => onUpdateAndSave("is_landing_visible", e.target.checked ? 1 : 0)}
                    size="small"
                    sx={{
                        flexShrink: 0,
                        "& .MuiSwitch-switchBase.Mui-checked": { color: landingVisibilityColor },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: landingVisibilityColor },
                    }}
                />
            </Tooltip>
            <AdminKeyChip label={__(category.slug.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase()), lang)} sx={{ flexShrink: 0, width: "155px" }} />
            <IconPickerButton
                value={category.icon}
                onChange={(v) => onUpdateAndSave("icon", v)}
            />
            <TextField
                label={__("Label", lang)}
                size="small"
                value={lv(category, "label")}
                onChange={(e) => onUpdateField(lk("label"), e.target.value)}
                onBlur={onSave}
                sx={{ flex: 1, minWidth: 120 }}
            />
        </Paper>
    );
}

interface ChildrenDndListProps extends Omit<CategoryRowSharedProps, "category" | "onUpdateField" | "onUpdateAndSave" | "onSave"> {
    parentId: number;
    items: Category[];
    onReorder: (parentId: number, reordered: Category[]) => void;
    onUpdateField: (id: number, field: string, value: string) => void;
    onUpdateAndSave: (id: number, field: string, value: unknown) => void;
    onSave: () => void;
}

function ChildrenDndList({ parentId, items, onReorder, onUpdateField, onUpdateAndSave, onSave, lang, lk, lv }: ChildrenDndListProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((c) => c.id === active.id);
            const newIndex = items.findIndex((c) => c.id === over.id);
            onReorder(parentId, arrayMove(items, oldIndex, newIndex));
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                {items.map((child) => (
                    <ChildCategoryRow
                        key={child.id}
                        category={child}
                        lang={lang}
                        lk={lk}
                        lv={lv}
                        onUpdateField={(field, value) => onUpdateField(child.id, field, value)}
                        onUpdateAndSave={(field, value) => onUpdateAndSave(child.id, field, value)}
                        onSave={onSave}
                    />
                ))}
            </SortableContext>
        </DndContext>
    );
}

interface CategoriesTabProps extends Omit<CategoryRowSharedProps, "category" | "onUpdateField" | "onUpdateAndSave" | "onSave"> {
    categories: Category[];
    onReorderTopLevel: (reordered: Category[]) => void;
    onReorderChildren: (parentId: number, reordered: Category[]) => void;
    onUpdateField: (id: number, field: string, value: string) => void;
    onUpdateAndSave: (id: number, field: string, value: unknown) => void;
    onSave: () => void;
}

function CategoriesTab({ categories, onReorderTopLevel, onReorderChildren, onUpdateField, onUpdateAndSave, onSave, lang, lk, lv }: CategoriesTabProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const topLevel = useMemo(
        () => categories.filter((c) => c.parent_id === null).sort((a, b) => a.sort_order - b.sort_order),
        [categories],
    );

    const handleTopLevelDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = topLevel.findIndex((c) => c.id === active.id);
            const newIndex = topLevel.findIndex((c) => c.id === over.id);
            onReorderTopLevel(arrayMove(topLevel, oldIndex, newIndex));
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleTopLevelDragEnd}>
            <SortableContext items={topLevel.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                {topLevel.map((cat) => {
                    const kids = categories
                        .filter((c) => c.parent_id === cat.id)
                        .sort((a, b) => a.sort_order - b.sort_order);
                    return (
                        <CategoryAccordionRow
                            key={cat.id}
                            category={cat}
                            hasChildren={kids.length > 0}
                            lang={lang}
                            lk={lk}
                            lv={lv}
                            onUpdateField={(field, value) => onUpdateField(cat.id, field, value)}
                            onUpdateAndSave={(field, value) => onUpdateAndSave(cat.id, field, value)}
                            onSave={onSave}
                        >
                            {kids.length > 0 && (
                                <ChildrenDndList
                                    parentId={cat.id}
                                    items={kids}
                                    onReorder={onReorderChildren}
                                    onUpdateField={onUpdateField}
                                    onUpdateAndSave={onUpdateAndSave}
                                    onSave={onSave}
                                    lang={lang}
                                    lk={lk}
                                    lv={lv}
                                />
                            )}
                        </CategoryAccordionRow>
                    );
                })}
            </SortableContext>
        </DndContext>
    );
}

// ---------------------------------------------------------------------------
// Field helpers (small reusable row renderers)
// ---------------------------------------------------------------------------

interface FieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    onBlur?: () => void;
    multiline?: boolean;
    size?: "small";
    sx?: object;
    select?: boolean;
    children?: React.ReactNode;
}

function Field({ label, value, onChange, onBlur, multiline, size = "small", sx, select, children }: FieldProps) {
    return (
        <TextField
            label={label}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            size={size}
            fullWidth
            multiline={multiline}
            minRows={multiline ? 2 : undefined}
            select={select}
            sx={{ ...sx }}
        >
            {children}
        </TextField>
    );
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function AdminResumePage() {
    const theme = useTheme();
    const menuText = getThemeColor("menuText", theme);
    const { lang, lk, lv } = useLocalizedField();

    const { data, setData, loading, saving, error, success, save } = useAdminData<ResumeData>({
        url: "/api/resume",
    });

    const { data: labelsRaw, setData: setLabelsRaw, loading: labelsLoading, saving: labelsSaving, error: labelsError, success: labelsSuccess, save: labelsSave } = useAdminData<UiLabelItem[]>({
        url: "/api/ui-labels",
    });

    const labelsItems = labelsRaw ?? [];

    const updateLabel = useCallback(
        (id: number | string, field: string, value: string) => {
            setLabelsRaw((prev) => {
                if (!prev) return prev;
                return prev.map((item) => (item.id === id ? { ...item, [field]: value } : item));
            });
        },
        [setLabelsRaw],
    );

    const saveLabels = useCallback(
        (items: UiLabelItem[]) => {
            const categoryItems = items.filter((it) => it.category === "resume_general");
            labelsSave({ category: "resume_general", data: categoryItems });
        },
        [labelsSave],
    );

    // Keep a ref to always have the latest data for computing new state in handlers
    const dataRef = useRef<ResumeData | null>(null);
    dataRef.current = data;

    const [tab, setTab] = useState(0);

    // -- Generic save helpers -----------------------------------------------

    const saveSection = useCallback(
        (section: keyof ResumeData) => {
            if (!dataRef.current) return;
            save({ section, data: dataRef.current[section] });
        },
        [save],
    );

    // -- Generic updaters ---------------------------------------------------

    const updateItem = useCallback(
        <K extends keyof ResumeData>(section: K, id: number | string, key: string, value: string) => {
            if (!dataRef.current) return;
            const newSection = (dataRef.current[section] as unknown as Array<Record<string, unknown>>).map((item) =>
                item.id === id ? { ...item, [key]: value } : item,
            );
            setData((prev) => {
                if (!prev) return prev;
                return { ...prev, [section]: newSection } as unknown as ResumeData;
            });
        },
        [setData],
    );

    const reorderItems = useCallback(
        <K extends keyof ResumeData>(section: K, items: Array<{ id: number | string }>) => {
            const ordered = stampSortOrder(items);
            setData((prev) => {
                if (!prev) return prev;
                return { ...prev, [section]: ordered } as unknown as ResumeData;
            });
            save({ section, data: ordered });
        },
        [setData, save],
    );

    const deleteItem = useCallback(
        <K extends keyof ResumeData>(section: K, id: number | string) => {
            if (!dataRef.current) return;
            const newSection = (dataRef.current[section] as unknown as Array<{ id: number | string }>).filter(
                (item) => item.id !== id,
            );
            setData((prev) => {
                if (!prev) return prev;
                return { ...prev, [section]: newSection } as unknown as ResumeData;
            });
            save({ section, data: newSection });
        },
        [setData, save],
    );

    const addItem = useCallback(
        <K extends keyof ResumeData>(section: K, template: ResumeData[K][number]) => {
            if (!dataRef.current) return;
            const list = dataRef.current[section] as unknown as Array<Record<string, unknown>>;
            const newItem = { ...template, id: nextTempId(), sort_order: list.length + 1 };
            const newSection = [...list, newItem];
            setData((prev) => {
                if (!prev) return prev;
                return { ...prev, [section]: newSection } as unknown as ResumeData;
            });
            save({ section, data: newSection });
        },
        [setData, save],
    );

    const updateItemAndSave = useCallback(
        <K extends keyof ResumeData>(section: K, id: number | string, key: string, value: string) => {
            if (!dataRef.current) return;
            const newSection = (dataRef.current[section] as unknown as Array<Record<string, unknown>>).map((item) =>
                item.id === id ? { ...item, [key]: value } : item,
            );
            setData((prev) => {
                if (!prev) return prev;
                return { ...prev, [section]: newSection } as unknown as ResumeData;
            });
            save({ section, data: newSection });
        },
        [setData, save],
    );

    // -- Category-specific handlers (preserve top-level/children on reorder) -

    const updateCategoryAndSave = useCallback(
        (id: number, field: string, value: unknown) => {
            if (!dataRef.current) return;
            const updates: Record<string, unknown> = { [field]: value };
            if (field === "is_visible") updates.is_landing_visible = value;
            const newCats = dataRef.current.categories.map((c) => (c.id === id ? { ...c, ...updates } : c));
            setData((prev) => (prev ? { ...prev, categories: newCats } : prev));
            save({ section: "categories", data: newCats });
        },
        [setData, save],
    );

    const reorderTopLevelCats = useCallback(
        (reordered: Category[]) => {
            if (!dataRef.current) return;
            const newTop = stampSortOrder(reordered);
            const kids = dataRef.current.categories.filter((c) => c.parent_id !== null);
            const all = [...newTop, ...kids];
            setData((prev) => (prev ? { ...prev, categories: all } : prev));
            save({ section: "categories", data: all });
        },
        [setData, save],
    );

    const reorderChildCats = useCallback(
        (parentId: number, reordered: Category[]) => {
            if (!dataRef.current) return;
            const newKids = stampSortOrder(reordered);
            const top = dataRef.current.categories.filter((c) => c.parent_id === null);
            const otherKids = dataRef.current.categories.filter((c) => c.parent_id !== null && c.parent_id !== parentId);
            const all = [...top, ...otherKids, ...newKids];
            setData((prev) => (prev ? { ...prev, categories: all } : prev));
            save({ section: "categories", data: all });
        },
        [setData, save],
    );

    // -- Loading state ------------------------------------------------------

    if (loading || labelsLoading || !data) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 48px)" }}>
                <CircularProgress />
            </Box>
        );
    }

    // -- Render sections ----------------------------------------------------

    const renderContent = () => {
        switch (tab) {
            // ----- CATEGORIES -----
            case 0:
                return (
                    <AdminSection saving={saving} error={error} success={success}>
                        <CategoriesTab
                            categories={data.categories}
                            onReorderTopLevel={reorderTopLevelCats}
                            onReorderChildren={reorderChildCats}
                            onUpdateField={(id, field, value) => updateItem("categories", id, field, value)}
                            onUpdateAndSave={updateCategoryAndSave}
                            onSave={() => saveSection("categories")}
                            lang={lang}
                            lk={lk}
                            lv={lv}
                        />
                    </AdminSection>
                );

            // ----- GENERAL DATA -----
            case 1:
                return (
                    <AdminSection
                        saving={saving}
                        error={error}
                        success={success}
                    >
                        <SortableList
                            items={data.general_data}
                            onReorder={(items) => reorderItems("general_data", items)}
                            onDelete={(id) => deleteItem("general_data", id)}
                            onAdd={() =>
                                addItem("general_data", {
                                    id: 0,
                                    sort_order: 0,
                                    field_key: "",
                                    label_en: "",
                                    label_ru: "",
                                    value_en: "",
                                    value_ru: "",
                                    value_format: "rich",
                                } as GeneralDataItem)
                            }
                            addLabel={__("Add Field", lang)}
                            renderItem={(item) => (
                                <Box sx={{ display: "flex", gap: 1, alignItems: "center", width: "100%" }}>
                                    <AdminKeyChip label={__(item.field_key.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase()), lang)} sx={{ flexShrink: 0, width: "180px" }} />
                                    <Field label={__("Label", lang)} value={lv(item, "label")} onChange={(v) => updateItem("general_data", item.id, lk("label"), v)} onBlur={() => saveSection("general_data")} sx={{ flex: "0 0 25%" }} />
                                    <Field label={__("Value", lang)} value={lv(item, "value")} onChange={(v) => updateItem("general_data", item.id, lk("value"), v)} onBlur={() => saveSection("general_data")} sx={{ flex: "1 1 auto" }} />
                                </Box>
                            )}
                        />
                    </AdminSection>
                );

            // ----- EDUCATION -----
            case 2:
                return (
                    <AdminSection saving={saving} error={error} success={success}>
                        <ResumeTreeSection
                            items={data.education_items as unknown as TreeItem[]}
                            data={data.education_data as unknown as TreeDataItem[]}
                            foreignKey="education_item_id"
                            onItemsChange={(newItems) => {
                                setData((prev) => prev ? { ...prev, education_items: newItems as unknown as EducationItem[] } : prev);
                            }}
                            onDataChange={(newData) => {
                                setData((prev) => prev ? { ...prev, education_data: newData as unknown as EducationDataItem[] } : prev);
                            }}
                            onSave={(newItems, newData) => {
                                const itemsToSave = newItems ?? dataRef.current?.education_items;
                                const dataToSave = newData ?? dataRef.current?.education_data;
                                if (itemsToSave) save({ section: "education_items", data: itemsToSave });
                                if (dataToSave) save({ section: "education_data", data: dataToSave });
                            }}
                            nextTempId={nextTempId}
                        />
                    </AdminSection>
                );

            // ----- LABOR -----
            case 3:
                return (
                    <AdminSection saving={saving} error={error} success={success}>
                        <ResumeTreeSection
                            items={data.labor_items as unknown as TreeItem[]}
                            data={data.labor_data as unknown as TreeDataItem[]}
                            foreignKey="labor_item_id"
                            onItemsChange={(newItems) => {
                                setData((prev) => prev ? { ...prev, labor_items: newItems as unknown as LaborItem[] } : prev);
                            }}
                            onDataChange={(newData) => {
                                setData((prev) => prev ? { ...prev, labor_data: newData as unknown as LaborDataItem[] } : prev);
                            }}
                            onSave={(newItems, newData) => {
                                const itemsToSave = newItems ?? dataRef.current?.labor_items;
                                const dataToSave = newData ?? dataRef.current?.labor_data;
                                if (itemsToSave) save({ section: "labor_items", data: itemsToSave });
                                if (dataToSave) save({ section: "labor_data", data: dataToSave });
                            }}
                            nextTempId={nextTempId}
                        />
                    </AdminSection>
                );

            // ----- QUESTIONNAIRE -----
            case 4:
                return (
                    <AdminSection
                        saving={saving}
                        error={error}
                        success={success}
                    >
                        <SortableList
                            items={data.questionnaire_items}
                            onReorder={(items) => reorderItems("questionnaire_items", items)}
                            onDelete={(id) => deleteItem("questionnaire_items", id)}
                            onAdd={() =>
                                addItem("questionnaire_items", {
                                    id: 0,
                                    sort_order: 0,
                                    question_en: "",
                                    question_ru: "",
                                    answer_en: "",
                                    answer_ru: "",
                                    icon: "",
                                    parent_id: null,
                                } as QuestionnaireItem)
                            }
                            addLabel={__("Add Question", lang)}
                            renderItem={(item) => (
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <IconPickerButton value={item.icon} onChange={(v) => { updateItem("questionnaire_items", item.id, "icon", v); saveSection("questionnaire_items"); }} />
                                        <Field label={__("Question", lang)} value={lv(item, "question")} onChange={(v) => updateItem("questionnaire_items", item.id, lk("question"), v)} onBlur={() => saveSection("questionnaire_items")} sx={{ flex: "1 1 auto" }} />
                                    </Box>
                                    <Field label={__("Answer", lang)} value={lv(item, "answer")} onChange={(v) => updateItem("questionnaire_items", item.id, lk("answer"), v)} onBlur={() => saveSection("questionnaire_items")} multiline sx={{ flex: "1 1 100%" }} />
                                </Box>
                            )}
                        />
                    </AdminSection>
                );

            // ----- ACHIEVEMENTS -----
            case 5:
                return (
                    <AdminSection
                        saving={saving}
                        error={error}
                        success={success}
                    >
                        <SortableList
                            items={data.achievements}
                            onReorder={(items) => reorderItems("achievements", items)}
                            onDelete={(id) => deleteItem("achievements", id)}
                            onAdd={() =>
                                addItem("achievements", {
                                    id: 0,
                                    sort_order: 0,
                                    content_en: "",
                                    content_ru: "",
                                } as AchievementItem)
                            }
                            addLabel={__("Add Achievement", lang)}
                            renderItem={(item) => (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    <Field label={__("Content", lang)} value={lv(item, "content")} onChange={(v) => updateItem("achievements", item.id, lk("content"), v)} onBlur={() => saveSection("achievements")} multiline sx={{ flex: "1 1 100%" }} />
                                </Box>
                            )}
                        />
                    </AdminSection>
                );

            // ----- SOFT SKILLS -----
            case 6:
                return (
                    <AdminSection
                        saving={saving}
                        error={error}
                        success={success}
                    >
                        <SortableList
                            items={data.soft_skills}
                            onReorder={(items) => reorderItems("soft_skills", items)}
                            onDelete={(id) => deleteItem("soft_skills", id)}
                            onAdd={() =>
                                addItem("soft_skills", {
                                    id: 0,
                                    slug: "",
                                    label_en: "",
                                    label_ru: "",
                                    description_en: "",
                                    description_ru: "",
                                    icon: "",
                                    level_values: "[]",
                                } as SoftSkillItem)
                            }
                            addLabel={__("Add Soft Skill", lang)}
                            renderItem={(item) => (
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                        <Field label={__("Slug", lang)} value={item.slug} onChange={(v) => updateItem("soft_skills", item.id, "slug", v)} onBlur={() => saveSection("soft_skills")} sx={{ flex: "1 1 120px" }} />
                                        <IconPickerButton value={item.icon} onChange={(v) => { updateItem("soft_skills", item.id, "icon", v); saveSection("soft_skills"); }} />
                                        <Field label={__("Label", lang)} value={lv(item, "label")} onChange={(v) => updateItem("soft_skills", item.id, lk("label"), v)} onBlur={() => saveSection("soft_skills")} sx={{ flex: "1 1 200px" }} />
                                    </Box>
                                    <Field label={__("Description", lang)} value={lv(item, "description")} onChange={(v) => updateItem("soft_skills", item.id, lk("description"), v)} onBlur={() => saveSection("soft_skills")} multiline sx={{ flex: "1 1 100%" }} />
                                    <Field label={__("Level Values (JSON)", lang)} value={item.level_values} onChange={(v) => updateItem("soft_skills", item.id, "level_values", v)} onBlur={() => saveSection("soft_skills")} sx={{ flex: "1 1 100%" }} />
                                </Box>
                            )}
                        />
                    </AdminSection>
                );

            // ----- METRICS -----
            case 7:
                return (
                    <AdminSection
                        saving={saving}
                        error={error}
                        success={success}
                    >
                        <SortableList
                            items={data.metrics}
                            onReorder={(items) => reorderItems("metrics", items)}
                            onDelete={(id) => deleteItem("metrics", id)}
                            onAdd={() =>
                                addItem("metrics", {
                                    id: 0,
                                    slug: "",
                                    label_en: "",
                                    label_ru: "",
                                    chart_type: "bar",
                                    chart_data: "{}",
                                } as MetricItem)
                            }
                            addLabel={__("Add Metric", lang)}
                            renderItem={(item) => (
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                        <Field label={__("Slug", lang)} value={item.slug} onChange={(v) => updateItem("metrics", item.id, "slug", v)} onBlur={() => saveSection("metrics")} sx={{ flex: "1 1 120px" }} />
                                        <Field label={__("Label", lang)} value={lv(item, "label")} onChange={(v) => updateItem("metrics", item.id, lk("label"), v)} onBlur={() => saveSection("metrics")} sx={{ flex: "1 1 220px" }} />
                                        <FormControl size="small" sx={{ flex: "0 0 140px" }}>
                                            <InputLabel>{__("Chart Type", lang)}</InputLabel>
                                            <Select
                                                label={__("Chart Type", lang)}
                                                value={item.chart_type ?? "bar"}
                                                onChange={(e) =>
                                                    updateItemAndSave("metrics", item.id, "chart_type", e.target.value)
                                                }
                                            >
                                                <MenuItem value="bar">Bar</MenuItem>
                                                <MenuItem value="pie">Pie</MenuItem>
                                                <MenuItem value="line">Line</MenuItem>
                                                <MenuItem value="doughnut">Doughnut</MenuItem>
                                                <MenuItem value="radar">Radar</MenuItem>
                                                <MenuItem value="polar">Polar</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Field label={__("Chart Data (JSON)", lang)} value={item.chart_data} onChange={(v) => updateItem("metrics", item.id, "chart_data", v)} onBlur={() => saveSection("metrics")} multiline />
                                </Box>
                            )}
                        />
                    </AdminSection>
                );

            // ----- GENERAL LABELS -----
            case 8:
                return (
                    <AdminSection
                        saving={labelsSaving}
                        error={labelsError}
                        success={labelsSuccess}
                    >
                        <UiLabelsEditor
                            category="resume_general"
                            items={labelsItems}
                            onUpdate={updateLabel}
                            onSave={saveLabels}
                        />
                    </AdminSection>
                );

            default:
                return null;
        }
    };

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <AssignmentIndIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: menuText }}>
                    {__("Resume Management", lang)}
                </Typography>
            </Box>

            <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    mb: 3,
                    borderBottom: 1,
                    borderColor: "divider",
                    "& .MuiTab-root": { textTransform: "none", fontWeight: 500 },
                }}
            >
                {TAB_LABELS.map((label) => (
                    <Tab key={label} label={__(label, lang)} />
                ))}
            </Tabs>

            {renderContent()}
        </Box>
    );
}
