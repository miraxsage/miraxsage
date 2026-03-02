"use client";

import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Tabs,
    Tab,
    Switch,
    FormControlLabel,
    CircularProgress,
    useTheme,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import LinkIcon from "@mui/icons-material/Link";
import ArticleIcon from "@mui/icons-material/Article";
import AddIcon from "@mui/icons-material/Add";
import { SortableList, AdminSection, useAdminData, useLocalizedField } from "@/features/admin-editor";
import UiLabelsEditor from "@/features/admin-editor/UiLabelsEditor";
import type { UiLabelItem } from "@/features/admin-editor/UiLabelsEditor";
import { __ } from "@/shared/lib/i18n";
import { getThemeColor } from "@/shared/lib/theme";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContactInfo {
    id: number;
    sort_order: number;
    type: string;
    title: string;
    icon: string;
    url: string;
    is_visible: number;
}

interface ContactPageContent {
    id: number;
    section: string;
    content_en: string;
    content_ru: string;
}

interface ContactsData {
    contact_info: ContactInfo[];
    contact_page_content: ContactPageContent[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let _nextTempId = -1;
function nextTempId() {
    return _nextTempId--;
}

function blankContactInfo(sortOrder: number): ContactInfo {
    return {
        id: nextTempId(),
        sort_order: sortOrder,
        type: "",
        title: "",
        icon: "",
        url: "",
        is_visible: 1,
    };
}

function blankPageContent(): ContactPageContent {
    return {
        id: nextTempId(),
        section: "",
        content_en: "",
        content_ru: "",
    };
}

// ---------------------------------------------------------------------------
// Contact Links Tab
// ---------------------------------------------------------------------------

function ContactLinksTab({
    items,
    setItems,
    saving,
    onSave,
    onSaveNow,
    error,
    success,
}: {
    items: ContactInfo[];
    setItems: (items: ContactInfo[]) => void;
    saving: boolean;
    onSave: (items: ContactInfo[]) => void;
    onSaveNow: (items: ContactInfo[]) => void;
    error: string;
    success: string;
}) {
    const theme = useTheme();
    const { lang } = useLocalizedField();

    const handleReorder = (reordered: ContactInfo[]) => {
        const newItems = reordered.map((item, i) => ({ ...item, sort_order: i + 1 }));
        setItems(newItems);
        onSaveNow(newItems);
    };

    const handleDelete = (id: number | string) => {
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
        onSaveNow(newItems);
    };

    const handleAdd = () => {
        const newItems = [...items, blankContactInfo(items.length + 1)];
        setItems(newItems);
        onSaveNow(newItems);
    };

    const updateItem = (id: number, field: keyof ContactInfo, value: unknown) => {
        setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
    };

    const updateItemAndSave = (id: number, field: keyof ContactInfo, value: unknown) => {
        const newItems = items.map((item) => (item.id === id ? { ...item, [field]: value } : item));
        setItems(newItems);
        onSaveNow(newItems);
    };

    return (
        <AdminSection
            title={__("Contact Links", lang)}
            icon={<LinkIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />}
            saving={saving}
            error={error}
            success={success}
        >
            <SortableList<ContactInfo>
                items={items}
                onReorder={handleReorder}
                onDelete={handleDelete}
                onAdd={handleAdd}
                addLabel={__("Add Contact Link", lang)}
                renderItem={(item) => (
                    <Box sx={{ width: "100%" }}>
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
                            label={__("Visible", lang)}
                            sx={{
                                gap: 0.5,
                                mb: "12px",
                                "& .MuiTypography-root": { fontSize: "0.8rem" },
                                whiteSpace: "nowrap",
                            }}
                        />
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
                                gap: 1.5,
                                alignItems: "center",
                            }}
                        >
                            <TextField
                                label={__("Type", lang)}
                                size="small"
                                fullWidth
                                value={item.type}
                                onChange={(e) => updateItem(item.id, "type", e.target.value)}
                                onBlur={() => onSave(items)}
                                placeholder={__("email, phone, telegram...", lang)}
                            />
                            <TextField
                                label={__("Title", lang)}
                                size="small"
                                fullWidth
                                value={item.title}
                                onChange={(e) => updateItem(item.id, "title", e.target.value)}
                                onBlur={() => onSave(items)}
                            />
                            <TextField
                                label={__("Icon", lang)}
                                size="small"
                                fullWidth
                                value={item.icon}
                                onChange={(e) => updateItem(item.id, "icon", e.target.value)}
                                onBlur={() => onSave(items)}
                                placeholder={__("MUI icon name or emoji", lang)}
                            />
                            <TextField
                                label={__("URL", lang)}
                                size="small"
                                fullWidth
                                value={item.url}
                                onChange={(e) => updateItem(item.id, "url", e.target.value)}
                                onBlur={() => onSave(items)}
                                placeholder="https://..."
                            />
                        </Box>
                    </Box>
                )}
            />
        </AdminSection>
    );
}

// ---------------------------------------------------------------------------
// Page Content Tab
// ---------------------------------------------------------------------------

function PageContentTab({
    items,
    setItems,
    saving,
    onSave,
    onSaveNow,
    error,
    success,
}: {
    items: ContactPageContent[];
    setItems: (items: ContactPageContent[]) => void;
    saving: boolean;
    onSave: (items: ContactPageContent[]) => void;
    onSaveNow: (items: ContactPageContent[]) => void;
    error: string;
    success: string;
}) {
    const theme = useTheme();
    const barBg = getThemeColor("barBackground", theme);
    const { lang, lk, lv } = useLocalizedField();

    const updateItem = (id: number, field: keyof ContactPageContent | string, value: string) => {
        setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
    };

    const handleAdd = () => {
        const newItems = [...items, blankPageContent()];
        setItems(newItems);
        onSaveNow(newItems);
    };

    const handleDelete = (id: number) => {
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
        onSaveNow(newItems);
    };

    return (
        <AdminSection
            title={__("Page Content", lang)}
            icon={<ArticleIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />}
            saving={saving}
            error={error}
            success={success}
        >
            {items.map((item) => (
                <Box
                    key={item.id}
                    sx={{
                        mb: 2,
                        p: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        background: barBg,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 1.5,
                        }}
                    >
                        <TextField
                            label={__("Section Name", lang)}
                            size="small"
                            value={item.section}
                            onChange={(e) => updateItem(item.id, "section", e.target.value)}
                            onBlur={() => onSave(items)}
                            sx={{ minWidth: 250 }}
                        />
                        <Button
                            size="small"
                            color="error"
                            onClick={() => handleDelete(item.id)}
                        >
                            {__("Remove", lang)}
                        </Button>
                    </Box>
                    <TextField
                        label={__("Content", lang)}
                        size="small"
                        fullWidth
                        multiline
                        minRows={3}
                        value={lv(item, "content")}
                        onChange={(e) => updateItem(item.id, lk("content"), e.target.value)}
                        onBlur={() => onSave(items)}
                    />
                </Box>
            ))}

            <Button
                variant="outlined"
                color="regular"
                startIcon={<AddIcon />}
                onClick={handleAdd}
                sx={{ mt: 1 }}
            >
                {__("Add Content Section", lang)}
            </Button>
        </AdminSection>
    );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function AdminContactsPage() {
    const theme = useTheme();
    const menuText = getThemeColor("menuText", theme);
    const { lang } = useLocalizedField();
    const [tab, setTab] = useState(0);

    const { data, setData, loading, saving, error, success, save } =
        useAdminData<ContactsData>({
            url: "/api/contacts",
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
        const categoryItems = items.filter((it) => it.category === "contacts_general");
        labelsSave({ category: "contacts_general", data: categoryItems });
    };

    const contactLinks = data?.contact_info ?? [];
    const pageContent = data?.contact_page_content ?? [];

    const setContactLinks = (items: ContactInfo[]) => {
        setData((prev) => (prev ? { ...prev, contact_info: items } : prev));
    };

    const setPageContent = (items: ContactPageContent[]) => {
        setData((prev) => (prev ? { ...prev, contact_page_content: items } : prev));
    };

    // Save with current items from state (safe to call on blur — state is current between events)
    const saveLinks = (items: ContactInfo[]) => {
        save({ section: "contact_info", data: items }, { successMessage: "Saved" });
    };

    const saveContent = (items: ContactPageContent[]) => {
        save({ section: "contact_page_content", data: items }, { successMessage: "Saved" });
    };

    if (loading || labelsLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 48px)" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <CallIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: menuText }}>
                    {__("Contacts", lang)}
                </Typography>
            </Box>

            <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                sx={{
                    mb: 3,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    "& .MuiTab-root": { textTransform: "none", fontWeight: 500 },
                }}
            >
                <Tab label={__("Contact Links", lang)} icon={<LinkIcon />} iconPosition="start" />
                <Tab label={__("Page Content", lang)} icon={<ArticleIcon />} iconPosition="start" />
                <Tab label={__("General Labels", lang)} />
            </Tabs>

            {tab === 0 && (
                <ContactLinksTab
                    items={contactLinks}
                    setItems={setContactLinks}
                    saving={saving}
                    onSave={saveLinks}
                    onSaveNow={saveLinks}
                    error={error}
                    success={success}
                />
            )}

            {tab === 1 && (
                <PageContentTab
                    items={pageContent}
                    setItems={setPageContent}
                    saving={saving}
                    onSave={saveContent}
                    onSaveNow={saveContent}
                    error={error}
                    success={success}
                />
            )}

            {tab === 2 && (
                <AdminSection
                    title={__("General Labels", lang)}
                    saving={labelsSaving}
                    error={labelsError}
                    success={labelsSuccess}
                >
                    <UiLabelsEditor
                        category="contacts_general"
                        items={labelsItems}
                        onUpdate={updateLabel}
                        onSave={saveLabels}
                    />
                </AdminSection>
            )}
        </Box>
    );
}
