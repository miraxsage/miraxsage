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
import { SortableList, AdminSection, useAdminData } from "@/features/admin-editor";
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
            title="Contact Links"
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
                addLabel="Add Contact Link"
                renderItem={(item) => (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr auto" },
                            gap: 1.5,
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <TextField
                            label="Type"
                            size="small"
                            fullWidth
                            value={item.type}
                            onChange={(e) => updateItem(item.id, "type", e.target.value)}
                            onBlur={() => onSave(items)}
                            placeholder="email, phone, telegram..."
                        />
                        <TextField
                            label="Title"
                            size="small"
                            fullWidth
                            value={item.title}
                            onChange={(e) => updateItem(item.id, "title", e.target.value)}
                            onBlur={() => onSave(items)}
                        />
                        <TextField
                            label="Icon"
                            size="small"
                            fullWidth
                            value={item.icon}
                            onChange={(e) => updateItem(item.id, "icon", e.target.value)}
                            onBlur={() => onSave(items)}
                            placeholder="MUI icon name or emoji"
                        />
                        <TextField
                            label="URL"
                            size="small"
                            fullWidth
                            value={item.url}
                            onChange={(e) => updateItem(item.id, "url", e.target.value)}
                            onBlur={() => onSave(items)}
                            placeholder="https://..."
                        />
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
                            label="Visible"
                            sx={{
                                "& .MuiTypography-root": { fontSize: "0.8rem" },
                                whiteSpace: "nowrap",
                            }}
                        />
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

    const updateItem = (id: number, field: keyof ContactPageContent, value: string) => {
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
            title="Page Content"
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
                            label="Section Name"
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
                            Remove
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Content (EN)"
                            size="small"
                            fullWidth
                            multiline
                            minRows={3}
                            value={item.content_en}
                            onChange={(e) => updateItem(item.id, "content_en", e.target.value)}
                            onBlur={() => onSave(items)}
                        />
                        <TextField
                            label="Content (RU)"
                            size="small"
                            fullWidth
                            multiline
                            minRows={3}
                            value={item.content_ru}
                            onChange={(e) => updateItem(item.id, "content_ru", e.target.value)}
                            onBlur={() => onSave(items)}
                        />
                    </Box>
                </Box>
            ))}

            <Button
                variant="outlined"
                color="regular"
                startIcon={<AddIcon />}
                onClick={handleAdd}
                sx={{ mt: 1 }}
            >
                Add Content Section
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
    const [tab, setTab] = useState(0);

    const { data, setData, loading, saving, error, success, save } =
        useAdminData<ContactsData>({
            url: "/api/contacts",
        });

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

    if (loading) {
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
                    Contacts
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
                <Tab label="Contact Links" icon={<LinkIcon />} iconPosition="start" />
                <Tab label="Page Content" icon={<ArticleIcon />} iconPosition="start" />
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
        </Box>
    );
}
