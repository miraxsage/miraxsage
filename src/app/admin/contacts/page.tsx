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
    Alert,
    CircularProgress,
    useTheme,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import LinkIcon from "@mui/icons-material/Link";
import ArticleIcon from "@mui/icons-material/Article";
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
    error,
    success,
}: {
    items: ContactInfo[];
    setItems: (items: ContactInfo[]) => void;
    saving: boolean;
    onSave: () => void;
    error: string;
    success: string;
}) {
    const theme = useTheme();

    const handleReorder = (reordered: ContactInfo[]) => {
        setItems(reordered.map((item, i) => ({ ...item, sort_order: i + 1 })));
    };

    const handleDelete = (id: number | string) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const handleAdd = () => {
        setItems([...items, blankContactInfo(items.length + 1)]);
    };

    const updateItem = (id: number, field: keyof ContactInfo, value: unknown) => {
        setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
    };

    return (
        <AdminSection
            title="Contact Links"
            icon={<LinkIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />}
            saving={saving}
            error={error}
            success={success}
            onSave={onSave}
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
                            placeholder="email, phone, telegram..."
                        />
                        <TextField
                            label="Title"
                            size="small"
                            fullWidth
                            value={item.title}
                            onChange={(e) => updateItem(item.id, "title", e.target.value)}
                        />
                        <TextField
                            label="Icon"
                            size="small"
                            fullWidth
                            value={item.icon}
                            onChange={(e) => updateItem(item.id, "icon", e.target.value)}
                            placeholder="MUI icon name or emoji"
                        />
                        <TextField
                            label="URL"
                            size="small"
                            fullWidth
                            value={item.url}
                            onChange={(e) => updateItem(item.id, "url", e.target.value)}
                            placeholder="https://..."
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={item.is_visible === 1}
                                    onChange={(e) =>
                                        updateItem(item.id, "is_visible", e.target.checked ? 1 : 0)
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
    error,
    success,
}: {
    items: ContactPageContent[];
    setItems: (items: ContactPageContent[]) => void;
    saving: boolean;
    onSave: () => void;
    error: string;
    success: string;
}) {
    const theme = useTheme();
    const barBg = getThemeColor("barBackground", theme);

    const updateItem = (id: number, field: keyof ContactPageContent, value: string) => {
        setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
    };

    const handleAdd = () => {
        setItems([...items, blankPageContent()]);
    };

    const handleDelete = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <AdminSection
            title="Page Content"
            icon={<ArticleIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />}
            saving={saving}
            error={error}
            success={success}
            onSave={onSave}
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
                        />
                        <TextField
                            label="Content (RU)"
                            size="small"
                            fullWidth
                            multiline
                            minRows={3}
                            value={item.content_ru}
                            onChange={(e) => updateItem(item.id, "content_ru", e.target.value)}
                        />
                    </Box>
                </Box>
            ))}

            <Button
                variant="outlined"
                startIcon={<ArticleIcon />}
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

    const { data, setData, loading, saving, error, success, save, clearMessages } =
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

    const handleSaveLinks = async () => {
        clearMessages();
        await save(
            { section: "contact_info", data: contactLinks },
            { method: "PUT", successMessage: "Contact links saved" },
        );
    };

    const handleSaveContent = async () => {
        clearMessages();
        await save(
            { section: "contact_page_content", data: pageContent },
            { method: "PUT", successMessage: "Page content saved" },
        );
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
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
                    onSave={handleSaveLinks}
                    error={error}
                    success={success}
                />
            )}

            {tab === 1 && (
                <PageContentTab
                    items={pageContent}
                    setItems={setPageContent}
                    saving={saving}
                    onSave={handleSaveContent}
                    error={error}
                    success={success}
                />
            )}
        </Box>
    );
}
