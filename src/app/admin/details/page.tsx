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
import TuneIcon from "@mui/icons-material/Tune";
import { SortableList, AdminSection, useAdminData, useLocalizedField } from "@/features/admin-editor";
import UiLabelsEditor from "@/features/admin-editor/UiLabelsEditor";
import type { UiLabelItem } from "@/features/admin-editor/UiLabelsEditor";
import { __ } from "@/shared/lib/i18n";
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

interface DetailsData {
    header_items: HeaderItem[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let tempIdCounter = -1;
function nextTempId() {
    return tempIdCounter--;
}

function FieldRow({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 1 }}>
            {children}
        </Box>
    );
}

const TAB_KEYS = [
    { key: "header_items" as const, label: "Header Items" },
    { key: "details_navigation" as const, label: "Navigation Labels" },
    { key: "details_ui" as const, label: "UI Labels" },
    { key: "landing" as const, label: "Landing Labels" },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AdminDetailsPage() {
    const theme = useTheme();
    const menuText = getThemeColor("menuText", theme);
    const { lang, lk, lv } = useLocalizedField();

    const [tab, setTab] = useState(0);

    const { data, setData, loading, saving, error, success, save } = useAdminData<DetailsData>({
        url: "/api/landing",
    });

    const { data: labelsRaw, setData: setLabelsRaw, loading: labelsLoading, saving: labelsSaving, error: labelsError, success: labelsSuccess, save: labelsSave } = useAdminData<UiLabelItem[]>({
        url: "/api/ui-labels",
    });

    const labelsItems = labelsRaw ?? [];

    const updateLabel = (id: number | string, field: string, value: string) => {
        setLabelsRaw((prev) => {
            if (!prev) return prev;
            return prev.map((item) => (item.id === id ? { ...item, [field]: value } : item));
        });
    };

    const saveLabels = (items: UiLabelItem[]) => {
        const currentTab = TAB_KEYS[tab];
        if (!currentTab) return;
        const category = currentTab.key;
        const categoryItems = items.filter((it) => it.category === category);
        labelsSave({ category, data: categoryItems });
    };

    const items = data?.header_items ?? [];

    const updateItems = (newItems: HeaderItem[]) => {
        if (!data) return;
        setData({ ...data, header_items: newItems });
    };

    const updateItem = (id: number | string, field: string, value: unknown) => {
        updateItems(
            items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
        );
    };

    const saveItems = (list?: HeaderItem[]) => {
        const ordered = (list ?? items).map((it, i) => ({ ...it, sort_order: i }));
        save({ section: "header_items", data: ordered });
    };

    const updateItemAndSave = (id: number | string, field: string, value: unknown) => {
        const newItems = items.map((item) => (item.id === id ? { ...item, [field]: value } : item));
        updateItems(newItems);
        saveItems(newItems);
    };

    const addHeaderItem = () => {
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
        const newItems = [...items, newItem];
        updateItems(newItems);
        saveItems(newItems);
    };

    if (loading || labelsLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 48px)" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <AdminSection
            title={__("Details", lang)}
            icon={<TuneIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />}
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
                {TAB_KEYS.map((s) => (
                    <Tab key={s.key} label={__(s.label, lang)} />
                ))}
            </Tabs>

            {/* ===== Header Items ===== */}
            {tab === 0 && (
                <SortableList
                    items={items}
                    onReorder={(reordered) => {
                        updateItems(reordered);
                        saveItems(reordered);
                    }}
                    onDelete={(id) => {
                        const newItems = items.filter((it) => it.id !== id);
                        updateItems(newItems);
                        saveItems(newItems);
                    }}
                    onAdd={addHeaderItem}
                    addLabel={__("Add Header Item", lang)}
                    renderItem={(item) => (
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={item.is_visible === 1}
                                        onChange={(e) =>
                                            updateItemAndSave(item.id, "is_visible", e.target.checked ? 1 : 0)
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
                                    label={__("Label", lang)}
                                    size="small"
                                    value={lv(item, "label")}
                                    onChange={(e) => updateItem(item.id, lk("label"), e.target.value)}
                                    onBlur={() => saveItems()}
                                    sx={{ flex: 1, minWidth: 140 }}
                                />
                                <TextField
                                    label={__("URL", lang)}
                                    size="small"
                                    value={item.url}
                                    onChange={(e) => updateItem(item.id, "url", e.target.value)}
                                    onBlur={() => saveItems()}
                                    sx={{ flex: 2, minWidth: 200 }}
                                />
                                <TextField
                                    label={__("Icon", lang)}
                                    size="small"
                                    value={item.icon}
                                    onChange={(e) => updateItem(item.id, "icon", e.target.value)}
                                    onBlur={() => saveItems()}
                                    sx={{ flex: 1, minWidth: 100 }}
                                />
                                <TextField
                                    label={__("Type", lang)}
                                    size="small"
                                    value={item.type}
                                    onChange={(e) => updateItem(item.id, "type", e.target.value)}
                                    onBlur={() => saveItems()}
                                    sx={{ flex: 1, minWidth: 80 }}
                                />
                            </FieldRow>
                        </Box>
                    )}
                />
            )}

            {/* ===== Navigation / UI / Landing Labels ===== */}
            {tab >= 1 && tab <= 3 && (
                <UiLabelsEditor
                    category={TAB_KEYS[tab].key}
                    items={labelsItems}
                    onUpdate={updateLabel}
                    onSave={saveLabels}
                />
            )}
        </AdminSection>
    );
}
