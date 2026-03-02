"use client";

import { useState } from "react";
import {
    Box,
    Tabs,
    Tab,
    TextField,
    Switch,
    FormControlLabel,
    Typography,
    CircularProgress,
    useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { SortableList, AdminSection, useAdminData, useLocalizedField } from "@/features/admin-editor";
import { __ } from "@/shared/lib/i18n";
import { getThemeColor } from "@/shared/lib/theme";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TitleVariant {
    id: number;
    sort_order: number;
    text_en: string;
    text_ru: string;
}

interface LandingButton {
    id: number;
    sort_order: number;
    label_en: string;
    label_ru: string;
    icon: string;
    url: string;
}

interface InfoBlock {
    id: number;
    slug: string;
    sort_order: number;
    title_en: string;
    title_ru: string;
    content_en: string;
    content_ru: string;
    illustration: string;
    image_url: string;
    additional_content_type: string;
    additional_content_data: string;
    is_visible: number;
}

interface FooterItem {
    id: number;
    content_en: string;
    content_ru: string;
}

interface LandingData {
    title_variants: TitleVariant[];
    buttons: LandingButton[];
    info_blocks: InfoBlock[];
    footer: FooterItem[];
}

type SectionKey = keyof LandingData;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SECTION_TAB_KEYS: { key: SectionKey; label: string }[] = [
    { key: "title_variants", label: "Title Variants" },
    { key: "buttons", label: "Buttons" },
    { key: "info_blocks", label: "Info Blocks" },
    { key: "footer", label: "Footer" },
];

let tempIdCounter = -1;
function nextTempId() {
    return tempIdCounter--;
}

// ---------------------------------------------------------------------------
// Field row component
// ---------------------------------------------------------------------------

function FieldRow({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 1 }}>
            {children}
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AdminLandingPage() {
    const theme = useTheme();
    const menuText = getThemeColor("menuText", theme);
    const { lang, lk, lv } = useLocalizedField();

    const [tab, setTab] = useState(0);

    const { data, setData, loading, saving, error, success, save } = useAdminData<LandingData>({
        url: "/api/landing",
    });

    // ----- section-level data helpers -----

    const getSection = <K extends SectionKey>(key: K): LandingData[K] => {
        if (!data) return [] as unknown as LandingData[K];
        return data[key];
    };

    const updateSection = <K extends SectionKey>(key: K, items: LandingData[K]) => {
        if (!data) return;
        setData({ ...data, [key]: items });
    };

    // Generic item updater for any section
    const updateItem = <K extends SectionKey>(
        key: K,
        id: number | string,
        field: string,
        value: unknown,
    ) => {
        const items = getSection(key) as unknown as Array<Record<string, unknown> & { id: number | string }>;
        updateSection(
            key,
            items.map((item) => (item.id === id ? { ...item, [field]: value } : item)) as unknown as LandingData[K],
        );
    };

    // Save a section — reads current data state (safe to call on blur after onChange updates)
    const saveSection = (key: SectionKey, items?: LandingData[SectionKey]) => {
        const sectionItems = (items ?? getSection(key)) as unknown as Array<Record<string, unknown>>;
        const ordered = sectionItems.map((it, i) => ({ ...it, sort_order: i }));
        save({ section: key, data: ordered });
    };

    // Updater that also saves immediately — use for switches, reorder, delete, add
    const updateItemAndSave = <K extends SectionKey>(
        key: K,
        id: number | string,
        field: string,
        value: unknown,
    ) => {
        const items = getSection(key) as unknown as Array<Record<string, unknown> & { id: number | string }>;
        const newItems = items.map((item) => (item.id === id ? { ...item, [field]: value } : item)) as unknown as LandingData[K];
        updateSection(key, newItems);
        saveSection(key, newItems);
    };

    // ----- add helpers per section -----

    const addTitleVariant = () => {
        const items = getSection("title_variants");
        const newItem: TitleVariant = {
            id: nextTempId(),
            sort_order: items.length,
            text_en: "",
            text_ru: "",
        };
        const newItems = [...items, newItem];
        updateSection("title_variants", newItems);
        saveSection("title_variants", newItems);
    };

    const addButton = () => {
        const items = getSection("buttons");
        const newItem: LandingButton = {
            id: nextTempId(),
            sort_order: items.length,
            label_en: "",
            label_ru: "",
            icon: "",
            url: "",
        };
        const newItems = [...items, newItem];
        updateSection("buttons", newItems);
        saveSection("buttons", newItems);
    };

    const addInfoBlock = () => {
        const items = getSection("info_blocks");
        const newItem: InfoBlock = {
            id: nextTempId(),
            slug: "",
            sort_order: items.length,
            title_en: "",
            title_ru: "",
            content_en: "",
            content_ru: "",
            illustration: "",
            image_url: "",
            additional_content_type: "",
            additional_content_data: "",
            is_visible: 1,
        };
        const newItems = [...items, newItem];
        updateSection("info_blocks", newItems);
        saveSection("info_blocks", newItems);
    };

    const addFooterItem = () => {
        const items = getSection("footer");
        const newItem: FooterItem = {
            id: nextTempId(),
            content_en: "",
            content_ru: "",
        };
        const newItems = [...items, newItem];
        updateSection("footer", newItems);
        saveSection("footer", newItems);
    };

    // ----- render -----

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 48px)" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <AdminSection
            title={__("Landing", lang)}
            icon={<HomeIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />}
            saving={saving}
            error={error}
            success={success}
        >
            <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 3, borderBottom: `1px solid ${theme.palette.divider}` }}
            >
                {SECTION_TAB_KEYS.map((s) => (
                    <Tab key={s.key} label={__(s.label, lang)} />
                ))}
            </Tabs>

            {/* ===== Title Variants ===== */}
            {tab === 0 && (
                <SortableList
                    items={getSection("title_variants")}
                    onReorder={(items) => {
                        updateSection("title_variants", items);
                        saveSection("title_variants", items);
                    }}
                    onDelete={(id) => {
                        const newItems = getSection("title_variants").filter((it) => it.id !== id);
                        updateSection("title_variants", newItems);
                        saveSection("title_variants", newItems);
                    }}
                    onAdd={addTitleVariant}
                    addLabel={__("Add Title Variant", lang)}
                    renderItem={(item) => (
                        <TextField
                            label={__("Text", lang)}
                            size="small"
                            value={lv(item, "text")}
                            onChange={(e) => updateItem("title_variants", item.id, lk("text"), e.target.value)}
                            onBlur={() => saveSection("title_variants")}
                            fullWidth
                        />
                    )}
                />
            )}

            {/* ===== Buttons ===== */}
            {tab === 1 && (
                <SortableList
                    items={getSection("buttons")}
                    onReorder={(items) => {
                        updateSection("buttons", items);
                        saveSection("buttons", items);
                    }}
                    onDelete={(id) => {
                        const newItems = getSection("buttons").filter((it) => it.id !== id);
                        updateSection("buttons", newItems);
                        saveSection("buttons", newItems);
                    }}
                    onAdd={addButton}
                    addLabel={__("Add Button", lang)}
                    renderItem={(item) => (
                        <FieldRow>
                            <TextField
                                label={__("Label", lang)}
                                size="small"
                                value={lv(item, "label")}
                                onChange={(e) => updateItem("buttons", item.id, lk("label"), e.target.value)}
                                onBlur={() => saveSection("buttons")}
                                sx={{ flex: 1, minWidth: 140 }}
                            />
                            <TextField
                                label={__("URL", lang)}
                                size="small"
                                value={item.url}
                                onChange={(e) => updateItem("buttons", item.id, "url", e.target.value)}
                                onBlur={() => saveSection("buttons")}
                                sx={{ flex: 2, minWidth: 200 }}
                            />
                            <TextField
                                label={__("Icon", lang)}
                                size="small"
                                value={item.icon}
                                onChange={(e) => updateItem("buttons", item.id, "icon", e.target.value)}
                                onBlur={() => saveSection("buttons")}
                                sx={{ flex: 1, minWidth: 100 }}
                            />
                        </FieldRow>
                    )}
                />
            )}

            {/* ===== Info Blocks ===== */}
            {tab === 2 && (
                <SortableList
                    items={getSection("info_blocks")}
                    onReorder={(items) => {
                        updateSection("info_blocks", items);
                        saveSection("info_blocks", items);
                    }}
                    onDelete={(id) => {
                        const newItems = getSection("info_blocks").filter((it) => it.id !== id);
                        updateSection("info_blocks", newItems);
                        saveSection("info_blocks", newItems);
                    }}
                    onAdd={addInfoBlock}
                    addLabel={__("Add Info Block", lang)}
                    renderItem={(item) => (
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={item.is_visible === 1}
                                        onChange={(e) =>
                                            updateItemAndSave("info_blocks", item.id, "is_visible", e.target.checked ? 1 : 0)
                                        }
                                        size="small"
                                    />
                                }
                                label={
                                    <Typography variant="body2" sx={{ color: menuText }}>
                                        {__("Visible", lang)}
                                    </Typography>
                                }
                                sx={{ gap: 0.5, mb: "12px" }}
                            />
                            <FieldRow>
                                <TextField
                                    label={__("Slug", lang)}
                                    size="small"
                                    value={item.slug}
                                    onChange={(e) => updateItem("info_blocks", item.id, "slug", e.target.value)}
                                    onBlur={() => saveSection("info_blocks")}
                                    sx={{ flex: 1, minWidth: 140 }}
                                />
                                <TextField
                                    label={__("Title", lang)}
                                    size="small"
                                    value={lv(item, "title")}
                                    onChange={(e) => updateItem("info_blocks", item.id, lk("title"), e.target.value)}
                                    onBlur={() => saveSection("info_blocks")}
                                    sx={{ flex: 2, minWidth: 200 }}
                                />
                            </FieldRow>
                            <FieldRow>
                                <TextField
                                    label={__("Illustration", lang)}
                                    size="small"
                                    value={item.illustration}
                                    onChange={(e) => updateItem("info_blocks", item.id, "illustration", e.target.value)}
                                    onBlur={() => saveSection("info_blocks")}
                                    sx={{ flex: 1, minWidth: 140 }}
                                />
                                <TextField
                                    label={__("Image URL", lang)}
                                    size="small"
                                    value={item.image_url}
                                    onChange={(e) => updateItem("info_blocks", item.id, "image_url", e.target.value)}
                                    onBlur={() => saveSection("info_blocks")}
                                    sx={{ flex: 1, minWidth: 140 }}
                                />
                            </FieldRow>
                            <TextField
                                label={__("Content", lang)}
                                size="small"
                                multiline
                                minRows={3}
                                fullWidth
                                value={lv(item, "content")}
                                onChange={(e) => updateItem("info_blocks", item.id, lk("content"), e.target.value)}
                                onBlur={() => saveSection("info_blocks")}
                                sx={{ mb: 1 }}
                            />
                            <FieldRow>
                                <TextField
                                    label={__("Additional Content Type", lang)}
                                    size="small"
                                    value={item.additional_content_type}
                                    onChange={(e) =>
                                        updateItem("info_blocks", item.id, "additional_content_type", e.target.value)
                                    }
                                    onBlur={() => saveSection("info_blocks")}
                                    sx={{ flex: 1, minWidth: 160 }}
                                />
                                <TextField
                                    label={__("Additional Content Data", lang)}
                                    size="small"
                                    multiline
                                    minRows={2}
                                    value={item.additional_content_data}
                                    onChange={(e) =>
                                        updateItem("info_blocks", item.id, "additional_content_data", e.target.value)
                                    }
                                    onBlur={() => saveSection("info_blocks")}
                                    sx={{ flex: 2, minWidth: 200 }}
                                />
                            </FieldRow>
                        </Box>
                    )}
                />
            )}

            {/* ===== Footer ===== */}
            {tab === 3 && (
                <SortableList
                    items={getSection("footer")}
                    onReorder={(items) => {
                        updateSection("footer", items);
                        saveSection("footer", items);
                    }}
                    onDelete={(id) => {
                        const newItems = getSection("footer").filter((it) => it.id !== id);
                        updateSection("footer", newItems);
                        saveSection("footer", newItems);
                    }}
                    onAdd={addFooterItem}
                    addLabel={__("Add Footer Item", lang)}
                    renderItem={(item) => (
                        <TextField
                            label={__("Content", lang)}
                            size="small"
                            multiline
                            minRows={2}
                            fullWidth
                            value={lv(item, "content")}
                            onChange={(e) => updateItem("footer", item.id, lk("content"), e.target.value)}
                            onBlur={() => saveSection("footer")}
                        />
                    )}
                />
            )}
        </AdminSection>
    );
}
