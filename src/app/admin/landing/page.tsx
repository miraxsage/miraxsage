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
import { SortableList, AdminSection, useAdminData } from "@/features/admin-editor";
import { getThemeColor } from "@/shared/lib/theme";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeaderItem {
    id: number;
    sort_order: number;
    type: string;
    label_en: string;
    label_ru: string;
    icon: string;
    url: string;
    is_visible: number;
}

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
    header_items: HeaderItem[];
    title_variants: TitleVariant[];
    buttons: LandingButton[];
    info_blocks: InfoBlock[];
    footer: FooterItem[];
}

type SectionKey = keyof LandingData;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SECTION_TABS: { key: SectionKey; label: string }[] = [
    { key: "header_items", label: "Header Items" },
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

    const removeItem = <K extends SectionKey>(key: K, id: number | string) => {
        const items = getSection(key) as unknown as Array<{ id: number | string }>;
        updateSection(key, items.filter((item) => item.id !== id) as unknown as LandingData[K]);
    };

    // ----- add helpers per section -----

    const addHeaderItem = () => {
        const items = getSection("header_items");
        const newItem: HeaderItem = {
            id: nextTempId(),
            sort_order: items.length,
            type: "link",
            label_en: "",
            label_ru: "",
            icon: "",
            url: "",
            is_visible: 1,
        };
        updateSection("header_items", [...items, newItem]);
    };

    const addTitleVariant = () => {
        const items = getSection("title_variants");
        const newItem: TitleVariant = {
            id: nextTempId(),
            sort_order: items.length,
            text_en: "",
            text_ru: "",
        };
        updateSection("title_variants", [...items, newItem]);
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
        updateSection("buttons", [...items, newItem]);
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
        updateSection("info_blocks", [...items, newItem]);
    };

    const addFooterItem = () => {
        const items = getSection("footer");
        const newItem: FooterItem = {
            id: nextTempId(),
            content_en: "",
            content_ru: "",
        };
        updateSection("footer", [...items, newItem]);
    };

    // ----- save handler -----

    const activeSection = SECTION_TABS[tab].key;

    const handleSave = async () => {
        const items = getSection(activeSection) as unknown as Array<Record<string, unknown> & { id: number | string }>;
        // Recalculate sort_order based on current position
        const ordered = items.map((item, i) => ({ ...item, sort_order: i }));
        await save({ section: activeSection, data: ordered });
    };

    // ----- render -----

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <AdminSection
            title="Landing"
            icon={<HomeIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />}
            saving={saving}
            error={error}
            success={success}
            onSave={handleSave}
        >
            <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 3, borderBottom: `1px solid ${theme.palette.divider}` }}
            >
                {SECTION_TABS.map((s) => (
                    <Tab key={s.key} label={s.label} />
                ))}
            </Tabs>

            {/* ===== Header Items ===== */}
            {tab === 0 && (
                <SortableList
                    items={getSection("header_items")}
                    onReorder={(items) => updateSection("header_items", items)}
                    onDelete={(id) => removeItem("header_items", id)}
                    onAdd={addHeaderItem}
                    addLabel="Add Header Item"
                    renderItem={(item) => (
                        <Box>
                            <FieldRow>
                                <TextField
                                    label="Label (EN)"
                                    size="small"
                                    value={item.label_en}
                                    onChange={(e) => updateItem("header_items", item.id, "label_en", e.target.value)}
                                    sx={{ flex: 1, minWidth: 140 }}
                                />
                                <TextField
                                    label="Label (RU)"
                                    size="small"
                                    value={item.label_ru}
                                    onChange={(e) => updateItem("header_items", item.id, "label_ru", e.target.value)}
                                    sx={{ flex: 1, minWidth: 140 }}
                                />
                            </FieldRow>
                            <FieldRow>
                                <TextField
                                    label="URL"
                                    size="small"
                                    value={item.url}
                                    onChange={(e) => updateItem("header_items", item.id, "url", e.target.value)}
                                    sx={{ flex: 2, minWidth: 200 }}
                                />
                                <TextField
                                    label="Icon"
                                    size="small"
                                    value={item.icon}
                                    onChange={(e) => updateItem("header_items", item.id, "icon", e.target.value)}
                                    sx={{ flex: 1, minWidth: 100 }}
                                />
                                <TextField
                                    label="Type"
                                    size="small"
                                    value={item.type}
                                    onChange={(e) => updateItem("header_items", item.id, "type", e.target.value)}
                                    sx={{ flex: 1, minWidth: 80 }}
                                />
                            </FieldRow>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={item.is_visible === 1}
                                        onChange={(e) =>
                                            updateItem("header_items", item.id, "is_visible", e.target.checked ? 1 : 0)
                                        }
                                        size="small"
                                    />
                                }
                                label={
                                    <Typography variant="body2" sx={{ color: menuText }}>
                                        Visible
                                    </Typography>
                                }
                            />
                        </Box>
                    )}
                />
            )}

            {/* ===== Title Variants ===== */}
            {tab === 1 && (
                <SortableList
                    items={getSection("title_variants")}
                    onReorder={(items) => updateSection("title_variants", items)}
                    onDelete={(id) => removeItem("title_variants", id)}
                    onAdd={addTitleVariant}
                    addLabel="Add Title Variant"
                    renderItem={(item) => (
                        <FieldRow>
                            <TextField
                                label="Text (EN)"
                                size="small"
                                value={item.text_en}
                                onChange={(e) => updateItem("title_variants", item.id, "text_en", e.target.value)}
                                sx={{ flex: 1, minWidth: 200 }}
                            />
                            <TextField
                                label="Text (RU)"
                                size="small"
                                value={item.text_ru}
                                onChange={(e) => updateItem("title_variants", item.id, "text_ru", e.target.value)}
                                sx={{ flex: 1, minWidth: 200 }}
                            />
                        </FieldRow>
                    )}
                />
            )}

            {/* ===== Buttons ===== */}
            {tab === 2 && (
                <SortableList
                    items={getSection("buttons")}
                    onReorder={(items) => updateSection("buttons", items)}
                    onDelete={(id) => removeItem("buttons", id)}
                    onAdd={addButton}
                    addLabel="Add Button"
                    renderItem={(item) => (
                        <Box>
                            <FieldRow>
                                <TextField
                                    label="Label (EN)"
                                    size="small"
                                    value={item.label_en}
                                    onChange={(e) => updateItem("buttons", item.id, "label_en", e.target.value)}
                                    sx={{ flex: 1, minWidth: 140 }}
                                />
                                <TextField
                                    label="Label (RU)"
                                    size="small"
                                    value={item.label_ru}
                                    onChange={(e) => updateItem("buttons", item.id, "label_ru", e.target.value)}
                                    sx={{ flex: 1, minWidth: 140 }}
                                />
                            </FieldRow>
                            <FieldRow>
                                <TextField
                                    label="URL"
                                    size="small"
                                    value={item.url}
                                    onChange={(e) => updateItem("buttons", item.id, "url", e.target.value)}
                                    sx={{ flex: 2, minWidth: 200 }}
                                />
                                <TextField
                                    label="Icon"
                                    size="small"
                                    value={item.icon}
                                    onChange={(e) => updateItem("buttons", item.id, "icon", e.target.value)}
                                    sx={{ flex: 1, minWidth: 100 }}
                                />
                            </FieldRow>
                        </Box>
                    )}
                />
            )}

            {/* ===== Info Blocks ===== */}
            {tab === 3 && (
                <SortableList
                    items={getSection("info_blocks")}
                    onReorder={(items) => updateSection("info_blocks", items)}
                    onDelete={(id) => removeItem("info_blocks", id)}
                    onAdd={addInfoBlock}
                    addLabel="Add Info Block"
                    renderItem={(item) => (
                        <Box>
                            <FieldRow>
                                <TextField
                                    label="Slug"
                                    size="small"
                                    value={item.slug}
                                    onChange={(e) => updateItem("info_blocks", item.id, "slug", e.target.value)}
                                    sx={{ flex: 1, minWidth: 140 }}
                                />
                                <TextField
                                    label="Illustration"
                                    size="small"
                                    value={item.illustration}
                                    onChange={(e) => updateItem("info_blocks", item.id, "illustration", e.target.value)}
                                    sx={{ flex: 1, minWidth: 140 }}
                                />
                                <TextField
                                    label="Image URL"
                                    size="small"
                                    value={item.image_url}
                                    onChange={(e) => updateItem("info_blocks", item.id, "image_url", e.target.value)}
                                    sx={{ flex: 1, minWidth: 140 }}
                                />
                            </FieldRow>
                            <FieldRow>
                                <TextField
                                    label="Title (EN)"
                                    size="small"
                                    value={item.title_en}
                                    onChange={(e) => updateItem("info_blocks", item.id, "title_en", e.target.value)}
                                    sx={{ flex: 1, minWidth: 200 }}
                                />
                                <TextField
                                    label="Title (RU)"
                                    size="small"
                                    value={item.title_ru}
                                    onChange={(e) => updateItem("info_blocks", item.id, "title_ru", e.target.value)}
                                    sx={{ flex: 1, minWidth: 200 }}
                                />
                            </FieldRow>
                            <FieldRow>
                                <TextField
                                    label="Content (EN)"
                                    size="small"
                                    multiline
                                    minRows={3}
                                    value={item.content_en}
                                    onChange={(e) => updateItem("info_blocks", item.id, "content_en", e.target.value)}
                                    sx={{ flex: 1, minWidth: 200 }}
                                />
                                <TextField
                                    label="Content (RU)"
                                    size="small"
                                    multiline
                                    minRows={3}
                                    value={item.content_ru}
                                    onChange={(e) => updateItem("info_blocks", item.id, "content_ru", e.target.value)}
                                    sx={{ flex: 1, minWidth: 200 }}
                                />
                            </FieldRow>
                            <FieldRow>
                                <TextField
                                    label="Additional Content Type"
                                    size="small"
                                    value={item.additional_content_type}
                                    onChange={(e) =>
                                        updateItem("info_blocks", item.id, "additional_content_type", e.target.value)
                                    }
                                    sx={{ flex: 1, minWidth: 160 }}
                                />
                                <TextField
                                    label="Additional Content Data"
                                    size="small"
                                    multiline
                                    minRows={2}
                                    value={item.additional_content_data}
                                    onChange={(e) =>
                                        updateItem("info_blocks", item.id, "additional_content_data", e.target.value)
                                    }
                                    sx={{ flex: 2, minWidth: 200 }}
                                />
                            </FieldRow>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={item.is_visible === 1}
                                        onChange={(e) =>
                                            updateItem("info_blocks", item.id, "is_visible", e.target.checked ? 1 : 0)
                                        }
                                        size="small"
                                    />
                                }
                                label={
                                    <Typography variant="body2" sx={{ color: menuText }}>
                                        Visible
                                    </Typography>
                                }
                            />
                        </Box>
                    )}
                />
            )}

            {/* ===== Footer ===== */}
            {tab === 4 && (
                <SortableList
                    items={getSection("footer")}
                    onReorder={(items) => updateSection("footer", items)}
                    onDelete={(id) => removeItem("footer", id)}
                    onAdd={addFooterItem}
                    addLabel="Add Footer Item"
                    renderItem={(item) => (
                        <FieldRow>
                            <TextField
                                label="Content (EN)"
                                size="small"
                                multiline
                                minRows={2}
                                value={item.content_en}
                                onChange={(e) => updateItem("footer", item.id, "content_en", e.target.value)}
                                sx={{ flex: 1, minWidth: 200 }}
                            />
                            <TextField
                                label="Content (RU)"
                                size="small"
                                multiline
                                minRows={2}
                                value={item.content_ru}
                                onChange={(e) => updateItem("footer", item.id, "content_ru", e.target.value)}
                                sx={{ flex: 1, minWidth: 200 }}
                            />
                        </FieldRow>
                    )}
                />
            )}
        </AdminSection>
    );
}
