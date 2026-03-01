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
    Collapse,
    useTheme,
} from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { SortableList, AdminSection, useAdminData, useLocalizedField } from "@/features/admin-editor";
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
];

function stampSortOrder<T extends { id: number | string }>(items: T[]): (T & { sort_order: number })[] {
    return items.map((item, i) => ({ ...item, sort_order: i + 1 }));
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
// Sub-data editor for Education / Labor items
// ---------------------------------------------------------------------------

interface SubDataEditorProps<D extends { id: number; sort_order: number; field_key: string; label_en: string; label_ru: string; value_en: string; value_ru: string }> {
    parentId: number;
    foreignKey: string;
    allData: D[];
    setAllData: (updater: (prev: D[]) => D[]) => void;
    onAutoSave?: () => void;
    lang: "en" | "ru";
    lk: (base: string) => string;
}

function SubDataEditor<D extends { id: number; sort_order: number; field_key: string; label_en: string; label_ru: string; value_en: string; value_ru: string }>({
    parentId,
    foreignKey,
    allData,
    setAllData,
    onAutoSave,
    lang,
    lk,
}: SubDataEditorProps<D>) {
    const items = useMemo(
        () => allData.filter((d) => (d as Record<string, unknown>)[foreignKey] === parentId),
        [allData, parentId, foreignKey],
    );

    const updateField = (id: number | string, key: keyof D, value: string) => {
        setAllData((prev) => prev.map((d) => (d.id === id ? { ...d, [key]: value } : d)));
    };

    const handleReorder = (reordered: D[]) => {
        const otherItems = allData.filter((d) => (d as Record<string, unknown>)[foreignKey] !== parentId);
        setAllData(() => [...otherItems, ...stampSortOrder(reordered)]);
        onAutoSave?.();
    };

    const handleDelete = (id: number | string) => {
        setAllData((prev) => prev.filter((d) => d.id !== id));
        onAutoSave?.();
    };

    const handleAdd = () => {
        const newItem = {
            id: nextTempId(),
            [foreignKey]: parentId,
            sort_order: items.length + 1,
            field_key: "",
            label_en: "",
            label_ru: "",
            value_en: "",
            value_ru: "",
        } as unknown as D;
        setAllData((prev) => [...prev, newItem]);
        onAutoSave?.();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lv = (item: any, base: string): string => (item[`${base}_${lang}`] as string) ?? "";

    return (
        <Box sx={{ mt: 1, pl: 2, borderLeft: "2px solid", borderColor: "divider" }}>
            <Typography variant="caption" sx={{ mb: 1, display: "block", fontWeight: 600 }}>
                {__("Data rows", lang)}
            </Typography>
            <SortableList
                items={items}
                onReorder={handleReorder}
                onDelete={handleDelete}
                onAdd={handleAdd}
                addLabel={__("Add Data Row", lang)}
                renderItem={(item) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        <Field label={__("Key", lang)} value={item.field_key} onChange={(v) => updateField(item.id, "field_key" as keyof D, v)} onBlur={onAutoSave} sx={{ flex: "1 1 120px" }} />
                        <Field label={__("Label", lang)} value={lv(item, "label")} onChange={(v) => updateField(item.id, lk("label") as keyof D, v)} onBlur={onAutoSave} sx={{ flex: "1 1 180px" }} />
                        <Field label={__("Value", lang)} value={lv(item, "value")} onChange={(v) => updateField(item.id, lk("value") as keyof D, v)} onBlur={onAutoSave} sx={{ flex: "1 1 220px" }} />
                    </Box>
                )}
            />
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Expandable wrapper for education / labor items
// ---------------------------------------------------------------------------

function ExpandableItem({ label, children }: { label: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: open ? 1 : 0 }}>
                <IconButton size="small" onClick={() => setOpen((o) => !o)}>
                    {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                </IconButton>
                <Typography variant="body2" sx={{ fontWeight: 500, cursor: "pointer" }} onClick={() => setOpen((o) => !o)}>
                    {label || "Untitled"}
                </Typography>
            </Box>
            <Collapse in={open}>{children}</Collapse>
        </Box>
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

    // -- Sub-data setters for education_data / labor_data -------------------

    const setEducationData = useCallback(
        (updater: (prev: EducationDataItem[]) => EducationDataItem[]) => {
            setData((prev) => {
                if (!prev) return prev;
                return { ...prev, education_data: updater(prev.education_data) };
            });
        },
        [setData],
    );

    const setLaborData = useCallback(
        (updater: (prev: LaborDataItem[]) => LaborDataItem[]) => {
            setData((prev) => {
                if (!prev) return prev;
                return { ...prev, labor_data: updater(prev.labor_data) };
            });
        },
        [setData],
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

    const saveEducationData = useCallback(() => {
        if (!dataRef.current) return;
        save({ section: "education_data", data: dataRef.current.education_data });
    }, [save]);

    const saveLaborData = useCallback(() => {
        if (!dataRef.current) return;
        save({ section: "labor_data", data: dataRef.current.labor_data });
    }, [save]);

    // -- Loading state ------------------------------------------------------

    if (loading || !data) {
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
                    <AdminSection
                        title={__("Categories", lang)}
                        saving={saving}
                        error={error}
                        success={success}
                    >
                        <SortableList
                            items={data.categories}
                            onReorder={(items) => reorderItems("categories", items)}
                            onDelete={(id) => deleteItem("categories", id)}
                            onAdd={() =>
                                addItem("categories", {
                                    id: 0,
                                    slug: "",
                                    sort_order: 0,
                                    icon: "",
                                    label_en: "",
                                    label_ru: "",
                                    parent_id: null,
                                } as Category)
                            }
                            addLabel={__("Add Category", lang)}
                            renderItem={(item) => (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    <Field label={__("Slug", lang)} value={item.slug} onChange={(v) => updateItem("categories", item.id, "slug", v)} onBlur={() => saveSection("categories")} sx={{ flex: "1 1 120px" }} />
                                    <Field label={__("Icon", lang)} value={item.icon} onChange={(v) => updateItem("categories", item.id, "icon", v)} onBlur={() => saveSection("categories")} sx={{ flex: "1 1 100px" }} />
                                    <Field label={__("Label", lang)} value={lv(item, "label")} onChange={(v) => updateItem("categories", item.id, lk("label"), v)} onBlur={() => saveSection("categories")} sx={{ flex: "1 1 200px" }} />
                                    <Field
                                        label={__("Parent ID", lang)}
                                        value={item.parent_id != null ? String(item.parent_id) : ""}
                                        onChange={(v) => updateItem("categories", item.id, "parent_id", v)}
                                        onBlur={() => saveSection("categories")}
                                        sx={{ flex: "0 0 100px" }}
                                    />
                                </Box>
                            )}
                        />
                    </AdminSection>
                );

            // ----- GENERAL DATA -----
            case 1:
                return (
                    <AdminSection
                        title={__("General Data", lang)}
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
                                    value_format: "",
                                } as GeneralDataItem)
                            }
                            addLabel={__("Add Field", lang)}
                            renderItem={(item) => (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    <Field label={__("Key", lang)} value={item.field_key} onChange={(v) => updateItem("general_data", item.id, "field_key", v)} onBlur={() => saveSection("general_data")} sx={{ flex: "1 1 120px" }} />
                                    <Field label={__("Label", lang)} value={lv(item, "label")} onChange={(v) => updateItem("general_data", item.id, lk("label"), v)} onBlur={() => saveSection("general_data")} sx={{ flex: "1 1 180px" }} />
                                    <Field label={__("Value", lang)} value={lv(item, "value")} onChange={(v) => updateItem("general_data", item.id, lk("value"), v)} onBlur={() => saveSection("general_data")} sx={{ flex: "1 1 220px" }} />
                                    <Field label={__("Format", lang)} value={item.value_format} onChange={(v) => updateItem("general_data", item.id, "value_format", v)} onBlur={() => saveSection("general_data")} sx={{ flex: "0 0 120px" }} />
                                </Box>
                            )}
                        />
                    </AdminSection>
                );

            // ----- EDUCATION -----
            case 2:
                return (
                    <AdminSection
                        title={__("Education", lang)}
                        saving={saving}
                        error={error}
                        success={success}
                    >
                        <SortableList
                            items={data.education_items}
                            onReorder={(items) => reorderItems("education_items", items)}
                            onDelete={(id) => {
                                deleteItem("education_items", id);
                                setEducationData((prev) => prev.filter((d) => d.education_item_id !== id));
                            }}
                            onAdd={() =>
                                addItem("education_items", {
                                    id: 0,
                                    sort_order: 0,
                                    label_en: "",
                                    label_ru: "",
                                    icon: "",
                                    parent_id: null,
                                } as EducationItem)
                            }
                            addLabel={__("Add Education Item", lang)}
                            renderItem={(item) => (
                                <Box>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                                        <Field label={__("Label", lang)} value={lv(item, "label")} onChange={(v) => updateItem("education_items", item.id, lk("label"), v)} onBlur={() => saveSection("education_items")} sx={{ flex: "1 1 220px" }} />
                                        <Field label={__("Icon", lang)} value={item.icon} onChange={(v) => updateItem("education_items", item.id, "icon", v)} onBlur={() => saveSection("education_items")} sx={{ flex: "0 0 140px" }} />
                                        <Field
                                            label={__("Parent ID", lang)}
                                            value={item.parent_id != null ? String(item.parent_id) : ""}
                                            onChange={(v) => updateItem("education_items", item.id, "parent_id", v)}
                                            onBlur={() => saveSection("education_items")}
                                            sx={{ flex: "0 0 100px" }}
                                        />
                                    </Box>
                                    <ExpandableItem label={`${__("Data rows", lang)}: ${lv(item, "label") || "Untitled"}`}>
                                        <SubDataEditor
                                            parentId={item.id as number}
                                            foreignKey="education_item_id"
                                            allData={data.education_data}
                                            setAllData={setEducationData}
                                            onAutoSave={saveEducationData}
                                            lang={lang}
                                            lk={lk}
                                        />
                                    </ExpandableItem>
                                </Box>
                            )}
                        />
                    </AdminSection>
                );

            // ----- LABOR -----
            case 3:
                return (
                    <AdminSection
                        title={__("Labor", lang)}
                        saving={saving}
                        error={error}
                        success={success}
                    >
                        <SortableList
                            items={data.labor_items}
                            onReorder={(items) => reorderItems("labor_items", items)}
                            onDelete={(id) => {
                                deleteItem("labor_items", id);
                                setLaborData((prev) => prev.filter((d) => d.labor_item_id !== id));
                            }}
                            onAdd={() =>
                                addItem("labor_items", {
                                    id: 0,
                                    sort_order: 0,
                                    label_en: "",
                                    label_ru: "",
                                    icon: "",
                                    parent_id: null,
                                } as LaborItem)
                            }
                            addLabel={__("Add Labor Item", lang)}
                            renderItem={(item) => (
                                <Box>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                                        <Field label={__("Label", lang)} value={lv(item, "label")} onChange={(v) => updateItem("labor_items", item.id, lk("label"), v)} onBlur={() => saveSection("labor_items")} sx={{ flex: "1 1 220px" }} />
                                        <Field label={__("Icon", lang)} value={item.icon} onChange={(v) => updateItem("labor_items", item.id, "icon", v)} onBlur={() => saveSection("labor_items")} sx={{ flex: "0 0 140px" }} />
                                        <Field
                                            label={__("Parent ID", lang)}
                                            value={item.parent_id != null ? String(item.parent_id) : ""}
                                            onChange={(v) => updateItem("labor_items", item.id, "parent_id", v)}
                                            onBlur={() => saveSection("labor_items")}
                                            sx={{ flex: "0 0 100px" }}
                                        />
                                    </Box>
                                    <ExpandableItem label={`${__("Data rows", lang)}: ${lv(item, "label") || "Untitled"}`}>
                                        <SubDataEditor
                                            parentId={item.id as number}
                                            foreignKey="labor_item_id"
                                            allData={data.labor_data}
                                            setAllData={setLaborData}
                                            onAutoSave={saveLaborData}
                                            lang={lang}
                                            lk={lk}
                                        />
                                    </ExpandableItem>
                                </Box>
                            )}
                        />
                    </AdminSection>
                );

            // ----- QUESTIONNAIRE -----
            case 4:
                return (
                    <AdminSection
                        title={__("Questionnaire", lang)}
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
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                        <Field label={__("Icon", lang)} value={item.icon} onChange={(v) => updateItem("questionnaire_items", item.id, "icon", v)} onBlur={() => saveSection("questionnaire_items")} sx={{ flex: "0 0 140px" }} />
                                        <Field
                                            label={__("Parent ID", lang)}
                                            value={item.parent_id != null ? String(item.parent_id) : ""}
                                            onChange={(v) => updateItem("questionnaire_items", item.id, "parent_id", v)}
                                            onBlur={() => saveSection("questionnaire_items")}
                                            sx={{ flex: "0 0 100px" }}
                                        />
                                    </Box>
                                    <Field label={__("Question", lang)} value={lv(item, "question")} onChange={(v) => updateItem("questionnaire_items", item.id, lk("question"), v)} onBlur={() => saveSection("questionnaire_items")} multiline sx={{ flex: "1 1 100%" }} />
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
                        title={__("Achievements", lang)}
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
                        title={__("Soft Skills", lang)}
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
                                        <Field label={__("Icon", lang)} value={item.icon} onChange={(v) => updateItem("soft_skills", item.id, "icon", v)} onBlur={() => saveSection("soft_skills")} sx={{ flex: "0 0 140px" }} />
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
                        title={__("Metrics", lang)}
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
