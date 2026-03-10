"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import {
    Box,
    Tabs,
    Tab,
    TextField,
    Typography,
    CircularProgress,
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
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
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
    text: string;
}

interface TechnologyCategoryItem {
    id: number;
    slug: string;
    sort_order: number;
    icon: string;
    label_en: string;
    label_ru: string;
}

interface TechnologyItem {
    id: number;
    category_id: number;
    sort_order: number;
    name_en: string;
    name_ru: string;
    docs_link: string;
    icon: string;
    skill_level: number;
    experience_years: number;
    projects_count: number;
    color: string;
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
    technology_categories: TechnologyCategoryItem[];
    technologies: TechnologyItem[];
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
    "Hard Skills",
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
    error?: boolean;
}

function Field({ label, value, onChange, onBlur, multiline, size = "small", sx, select, children, error }: FieldProps) {
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
            error={error}
            sx={{ ...sx }}
        >
            {children}
        </TextField>
    );
}

function parseLevelValues(json: string): [number, number, number, number] {
    try {
        const arr = JSON.parse(json);
        if (arr.length >= 4) return [arr[0], arr[1], arr[2], arr[3]];
        const [l, t, a] = arr as [number, number, number];
        return [l, t, t > 0 ? Math.round(100 * a / t) : 0, t > 0 ? Math.round(100 * l / t) : 0];
    } catch { return [0, 100, 0, 0]; }
}

function LevelValuesEditor({ item, updateItem, saveSection, lang }: {
    item: { id: number; level_values: string };
    updateItem: (section: "soft_skills", id: number, key: string, value: string) => void;
    saveSection: (section: "soft_skills") => void;
    lang: "en" | "ru";
}) {
    const [num, den, pct2, pct3] = parseLevelValues(item.level_values);
    const [frac, setFrac] = useState(`${num}/${den}`);
    const [v2, setV2] = useState(String(pct2));
    const [v3, setV3] = useState(String(pct3));

    const prevJson = useRef(item.level_values);
    if (item.level_values !== prevJson.current) {
        prevJson.current = item.level_values;
        const [n, d, p2, p3] = parseLevelValues(item.level_values);
        setFrac(`${n}/${d}`);
        setV2(String(p2));
        setV3(String(p3));
    }

    const fracValid = /^\d+\s*\/\s*[1-9]\d*$/.test(frac);
    const v2Valid = /^\d+$/.test(v2);
    const v3Valid = /^\d+$/.test(v3);

    const handleBlur = () => {
        if (!fracValid || !v2Valid || !v3Valid) return;
        const [a, b] = frac.split("/").map((s) => parseInt(s.trim()));
        const json = JSON.stringify([a, b, parseInt(v2), parseInt(v3)]);
        updateItem("soft_skills", item.id, "level_values", json);
        saveSection("soft_skills");
    };

    return (
        <Box sx={{ display: "flex", gap: 1 }}>
            <Field label={lang === "ru" ? "Показатель А" : "Indicator A"} value={frac} onChange={setFrac} onBlur={handleBlur} error={!fracValid} sx={{ flex: "1 1 0" }} />
            <Field label={(lang === "ru" ? "Показатель Б" : "Indicator B") + " %"} value={v2} onChange={setV2} onBlur={handleBlur} error={!v2Valid} sx={{ flex: "1 1 0" }} />
            <Field label={(lang === "ru" ? "Показатель В" : "Indicator C") + " %"} value={v3} onChange={setV3} onBlur={handleBlur} error={!v3Valid} sx={{ flex: "1 1 0" }} />
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Hard Skills Tab
// ---------------------------------------------------------------------------

interface HardSkillsTabProps {
    categories: TechnologyCategoryItem[];
    technologies: TechnologyItem[];
    lang: "en" | "ru";
    lk: (base: string) => string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lv: (item: any, base: string) => string;
    updateItem: <K extends keyof ResumeData>(section: K, id: number | string, key: string, value: string) => void;
    updateItemAndSave: <K extends keyof ResumeData>(section: K, id: number | string, key: string, value: string) => void;
    saveSection: (section: keyof ResumeData) => void;
    setData: React.Dispatch<React.SetStateAction<ResumeData | null>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    save: (payload: any) => void;
}

function TechIndicatorField({ label, value, onChange, onBlur, validate, sx }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    onBlur: () => void;
    validate: (v: string) => boolean;
    sx?: object;
}) {
    return (
        <Field
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={!validate(value)}
            sx={sx}
        />
    );
}

function TechItemEditor({ item, lang, lk, lv, updateItem, saveSection, updateItemAndSave }: {
    item: TechnologyItem;
    lang: "en" | "ru";
    lk: (base: string) => string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lv: (item: any, base: string) => string;
    updateItem: HardSkillsTabProps["updateItem"];
    saveSection: HardSkillsTabProps["saveSection"];
    updateItemAndSave: HardSkillsTabProps["updateItemAndSave"];
}) {
    const [level, setLevel] = useState(String(item.skill_level));
    const [exp, setExp] = useState(String(item.experience_years));
    const [projects, setProjects] = useState(String(item.projects_count));

    const prevItem = useRef({ skill_level: item.skill_level, experience_years: item.experience_years, projects_count: item.projects_count });
    if (item.skill_level !== prevItem.current.skill_level || item.experience_years !== prevItem.current.experience_years || item.projects_count !== prevItem.current.projects_count) {
        prevItem.current = { skill_level: item.skill_level, experience_years: item.experience_years, projects_count: item.projects_count };
        setLevel(String(item.skill_level));
        setExp(String(item.experience_years));
        setProjects(String(item.projects_count));
    }

    const levelValid = (v: string) => /^\d+$/.test(v) && Number(v) >= 0 && Number(v) <= 100;
    const expValid = (v: string) => /^\d{1,2}([.,]\d)?$/.test(v);
    const projectsValid = (v: string) => /^\d+$/.test(v) && Number(v) >= 0;

    const handleBlur = () => {
        if (!levelValid(level) || !expValid(exp) || !projectsValid(projects)) return;
        const normExp = exp.replace(",", ".");
        updateItem("technologies", item.id, "skill_level", level);
        updateItem("technologies", item.id, "experience_years", normExp);
        updateItem("technologies", item.id, "projects_count", projects);
        saveSection("technologies");
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <IconPickerButton value={item.icon} onChange={(v) => updateItemAndSave("technologies", item.id, "icon", v)} />
                <Field label={__("Name", lang)} value={lv(item, "name")} onChange={(v) => updateItem("technologies", item.id, lk("name"), v)} onBlur={() => saveSection("technologies")} sx={{ flex: "1 1 auto" }} />
                <Field label={__("Docs link", lang)} value={item.docs_link} onChange={(v) => updateItem("technologies", item.id, "docs_link", v)} onBlur={() => saveSection("technologies")} sx={{ flex: "1 1 auto" }} />
                <Field label={__("Color", lang)} value={item.color ?? ""} onChange={(v) => updateItem("technologies", item.id, "color", v)} onBlur={() => saveSection("technologies")} sx={{ flex: "0 0 100px" }} />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
                <TechIndicatorField
                    label={__("Level", lang) + " (0-100)"}
                    value={level}
                    onChange={setLevel}
                    onBlur={handleBlur}
                    validate={levelValid}
                    sx={{ flex: "1 1 0" }}
                />
                <TechIndicatorField
                    label={__("Experience", lang) + " (" + __("years", lang) + ")"}
                    value={exp}
                    onChange={(v) => setExp(v.replace(",", "."))}
                    onBlur={handleBlur}
                    validate={expValid}
                    sx={{ flex: "1 1 0" }}
                />
                <TechIndicatorField
                    label={__("Projects", lang)}
                    value={projects}
                    onChange={setProjects}
                    onBlur={handleBlur}
                    validate={projectsValid}
                    sx={{ flex: "1 1 0" }}
                />
            </Box>
        </Box>
    );
}

function HardSkillsTab({ categories, technologies, lang, lk, lv, updateItem, updateItemAndSave, saveSection, setData, save }: HardSkillsTabProps) {
    const theme = useTheme();
    const [expandedCats, setExpandedCats] = useState<Set<number>>(new Set());

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const sortedCats = useMemo(
        () => [...categories].sort((a, b) => a.sort_order - b.sort_order),
        [categories],
    );

    const toggleCat = (id: number) => {
        setExpandedCats((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const handleCatDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = sortedCats.findIndex((c) => c.id === active.id);
        const newIndex = sortedCats.findIndex((c) => c.id === over.id);
        const reordered = stampSortOrder(arrayMove(sortedCats, oldIndex, newIndex));
        setData((prev) => prev ? { ...prev, technology_categories: reordered } : prev);
        save({ section: "technology_categories", data: reordered });
    };

    const handleTechDragEnd = (catId: number) => (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const catTechs = technologies.filter((t) => t.category_id === catId).sort((a, b) => a.sort_order - b.sort_order);
        const oldIndex = catTechs.findIndex((t) => t.id === active.id);
        const newIndex = catTechs.findIndex((t) => t.id === over.id);
        const reordered = stampSortOrder(arrayMove(catTechs, oldIndex, newIndex));
        const otherTechs = technologies.filter((t) => t.category_id !== catId);
        const all = [...otherTechs, ...reordered];
        setData((prev) => prev ? { ...prev, technologies: all } : prev);
        save({ section: "technologies", data: all });
    };

    const addCategory = () => {
        const newCat: TechnologyCategoryItem = {
            id: nextTempId(),
            slug: "",
            sort_order: categories.length + 1,
            icon: "",
            label_en: "",
            label_ru: "",
        };
        const newCats = [...categories, newCat];
        setData((prev) => prev ? { ...prev, technology_categories: newCats } : prev);
        save({ section: "technology_categories", data: newCats });
        setExpandedCats((prev) => new Set(prev).add(newCat.id));
    };

    const deleteCategory = (id: number) => {
        const newCats = categories.filter((c) => c.id !== id);
        const newTechs = technologies.filter((t) => t.category_id !== id);
        setData((prev) => prev ? { ...prev, technology_categories: newCats, technologies: newTechs } : prev);
        save({ section: "technology_categories", data: newCats });
        save({ section: "technologies", data: newTechs });
    };

    const addTech = (catId: number) => {
        const catTechs = technologies.filter((t) => t.category_id === catId);
        const newTech: TechnologyItem = {
            id: nextTempId(),
            category_id: catId,
            sort_order: catTechs.length + 1,
            name_en: "",
            name_ru: "",
            docs_link: "",
            icon: "",
            skill_level: 0,
            experience_years: 0,
            projects_count: 0,
            color: "",
        };
        const all = [...technologies, newTech];
        setData((prev) => prev ? { ...prev, technologies: all } : prev);
        save({ section: "technologies", data: all });
    };

    const deleteTech = (id: number) => {
        const newTechs = technologies.filter((t) => t.id !== id);
        setData((prev) => prev ? { ...prev, technologies: newTechs } : prev);
        save({ section: "technologies", data: newTechs });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleCatDragEnd}>
                <SortableContext items={sortedCats.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                    {sortedCats.map((cat) => {
                        const catTechs = technologies
                            .filter((t) => t.category_id === cat.id)
                            .sort((a, b) => a.sort_order - b.sort_order);
                        const expanded = expandedCats.has(cat.id);
                        return (
                            <HardSkillCategoryRow
                                key={cat.id}
                                cat={cat}
                                expanded={expanded}
                                onToggle={() => toggleCat(cat.id)}
                                lang={lang}
                                lk={lk}
                                lv={lv}
                                updateItem={updateItem}
                                updateItemAndSave={updateItemAndSave}
                                saveSection={saveSection}
                                onDelete={() => deleteCategory(cat.id)}
                                onAddTech={() => addTech(cat.id)}
                                onDeleteTech={deleteTech}
                                catTechs={catTechs}
                                handleTechDragEnd={handleTechDragEnd(cat.id)}
                            />
                        );
                    })}
                </SortableContext>
            </DndContext>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                <IconButton onClick={addCategory} color="primary" sx={{ border: `1px dashed ${theme.palette.divider}`, borderRadius: "8px", px: 3 }}>
                    <AddIcon fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>{__("Add Category", lang)}</Typography>
                </IconButton>
            </Box>
        </Box>
    );
}

function HardSkillCategoryRow({ cat, expanded, onToggle, lang, lk, lv, updateItem, updateItemAndSave, saveSection, onDelete, onAddTech, onDeleteTech, catTechs, handleTechDragEnd }: {
    cat: TechnologyCategoryItem;
    expanded: boolean;
    onToggle: () => void;
    lang: "en" | "ru";
    lk: (base: string) => string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lv: (item: any, base: string) => string;
    updateItem: HardSkillsTabProps["updateItem"];
    updateItemAndSave: HardSkillsTabProps["updateItemAndSave"];
    saveSection: HardSkillsTabProps["saveSection"];
    onDelete: () => void;
    onAddTech: () => void;
    onDeleteTech: (id: number) => void;
    catTechs: TechnologyItem[];
    handleTechDragEnd: (event: DragEndEvent) => void;
}) {
    const theme = useTheme();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: cat.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    return (
        <Box ref={setNodeRef} style={style} sx={{ opacity: isDragging ? 0.5 : 1 }}>
            <Accordion
                expanded={expanded}
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
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 1 }} onClick={(e) => e.stopPropagation()}>
                        <IconButton size="small" {...attributes} {...listeners} sx={{ cursor: "grab", flexShrink: 0 }}>
                            <DragIndicatorIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={onToggle} sx={{ flexShrink: 0, color: getThemeColor("regularIcon", theme) }}>
                            {expanded ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                        </IconButton>
                        <IconPickerButton value={cat.icon} onChange={(v) => updateItemAndSave("technology_categories", cat.id, "icon", v)} />
                        <Field label={__("Label", lang)} value={lv(cat, "label")} onChange={(v) => updateItem("technology_categories", cat.id, lk("label"), v)} onBlur={() => saveSection("technology_categories")} sx={{ flex: "1 1 auto" }} />
                        <IconButton size="small" onClick={onDelete} color="error" sx={{ flexShrink: 0 }}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleTechDragEnd}>
                        <SortableContext items={catTechs.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                            {catTechs.map((tech) => (
                                <SortableTechRow key={tech.id} tech={tech} lang={lang} lk={lk} lv={lv} updateItem={updateItem} updateItemAndSave={updateItemAndSave} saveSection={saveSection} onDelete={() => onDeleteTech(tech.id)} />
                            ))}
                        </SortableContext>
                    </DndContext>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                        <IconButton onClick={onAddTech} size="small" sx={{ border: `1px dashed ${theme.palette.divider}`, borderRadius: "8px", px: 2 }}>
                            <AddIcon fontSize="small" />
                            <Typography variant="caption" sx={{ ml: 0.5 }}>{__("Add Technology", lang)}</Typography>
                        </IconButton>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

function SortableTechRow({ tech, lang, lk, lv, updateItem, updateItemAndSave, saveSection, onDelete }: {
    tech: TechnologyItem;
    lang: "en" | "ru";
    lk: (base: string) => string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lv: (item: any, base: string) => string;
    updateItem: HardSkillsTabProps["updateItem"];
    updateItemAndSave: HardSkillsTabProps["updateItemAndSave"];
    saveSection: HardSkillsTabProps["saveSection"];
    onDelete: () => void;
}) {
    const theme = useTheme();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tech.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <Paper
            ref={setNodeRef}
            style={style}
            elevation={isDragging ? 4 : 0}
            sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                px: 1.5,
                py: 1,
                mb: 1,
                border: `1px solid ${theme.palette.divider}`,
                background: getThemeColor("barBackground", theme),
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <IconButton size="small" {...attributes} {...listeners} sx={{ cursor: "grab", flexShrink: 0, mt: "4px" }}>
                <DragIndicatorIcon fontSize="small" />
            </IconButton>
            <Box sx={{ flex: 1 }}>
                <TechItemEditor
                    item={tech}
                    lang={lang}
                    lk={lk}
                    lv={lv}
                    updateItem={updateItem}
                    saveSection={saveSection}
                    updateItemAndSave={updateItemAndSave}
                />
            </Box>
            <IconButton size="small" onClick={onDelete} color="error" sx={{ flexShrink: 0, mt: "4px" }}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Paper>
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
                                        <IconPickerButton value={item.icon} onChange={(v) => updateItemAndSave("questionnaire_items", item.id, "icon", v)} />
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
                                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                        <IconPickerButton value={item.icon} onChange={(v) => updateItemAndSave("soft_skills", item.id, "icon", v)} />
                                        <Field label={__("Label", lang)} value={lv(item, "label")} onChange={(v) => updateItem("soft_skills", item.id, lk("label"), v)} onBlur={() => saveSection("soft_skills")} sx={{ flex: "1 1 auto" }} />
                                    </Box>
                                    <Field label={__("Description", lang)} value={lv(item, "description")} onChange={(v) => updateItem("soft_skills", item.id, lk("description"), v)} onBlur={() => saveSection("soft_skills")} multiline />
                                    <LevelValuesEditor item={item} updateItem={updateItem} saveSection={saveSection} lang={lang} />
                                </Box>
                            )}
                        />
                    </AdminSection>
                );

            // ----- HARD SKILLS -----
            case 7:
                return (
                    <AdminSection saving={saving} error={error} success={success}>
                        <HardSkillsTab
                            categories={data.technology_categories}
                            technologies={data.technologies}
                            lang={lang}
                            lk={lk}
                            lv={lv}
                            updateItem={updateItem}
                            updateItemAndSave={updateItemAndSave}
                            saveSection={saveSection}
                            setData={setData}
                            save={save}
                        />
                    </AdminSection>
                );

            // ----- METRICS -----
            case 8: {
                const metric = data.metrics[0];
                return (
                    <AdminSection saving={saving} error={error} success={success}>
                        <Field
                            label={__("Text", lang)}
                            value={metric?.text ?? ""}
                            onChange={(v) => metric && updateItem("metrics", metric.id, "text", v)}
                            onBlur={() => saveSection("metrics")}
                            multiline
                            sx={{ width: "100%" }}
                        />
                    </AdminSection>
                );
            }

            // ----- GENERAL LABELS -----
            case 9:
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
