"use client";

import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Tabs,
    Tab,
    CircularProgress,
    useTheme,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import ArticleIcon from "@mui/icons-material/Article";
import { AdminSection, useAdminData, useLocalizedField } from "@/features/admin-editor";
import UiLabelsEditor from "@/features/admin-editor/UiLabelsEditor";
import type { UiLabelItem } from "@/features/admin-editor/UiLabelsEditor";
import { __ } from "@/shared/lib/i18n";
import { getThemeColor } from "@/shared/lib/theme";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContactPageContent {
    id: number;
    section: string;
    content_en: string;
    content_ru: string;
}

interface ContactsData {
    contact_page_content: ContactPageContent[];
}


// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function AdminContactsPage() {
    const theme = useTheme();
    const menuText = getThemeColor("menuText", theme);
    const { lang, lk, lv } = useLocalizedField();
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

    const pageContent = data?.contact_page_content ?? [];

    const setPageContent = (items: ContactPageContent[]) => {
        setData((prev) => (prev ? { ...prev, contact_page_content: items } : prev));
    };

    const saveContent = (items: ContactPageContent[]) => {
        save({ section: "contact_page_content", data: items }, { successMessage: "Saved" });
    };

    const updateItem = (id: number, field: keyof ContactPageContent | string, value: string) => {
        setPageContent(pageContent.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
    };

    const getContent = (section: string) => {
        const item = pageContent.find((c) => c.section === section);
        return item ? lv(item, "content") : "";
    };

    const updateContent = (section: string, value: string) => {
        const item = pageContent.find((c) => c.section === section);
        if (item) updateItem(item.id, lk("content"), value);
    };

    // Local state prevents cursor jumping on every keystroke
    const [introText, setIntroText] = useState<string | null>(null);

    // Sync from DB when data loads or language switches
    useEffect(() => { setIntroText(null); }, [data, lang]);

    const introCombined = [getContent("intro_p1"), getContent("intro_p2")].filter(Boolean).join("\n\n");

    const handleIntroBlur = () => {
        const text = introText ?? introCombined;
        const idx = text.indexOf("\n\n");
        const p1 = idx === -1 ? text : text.slice(0, idx);
        const p2 = idx === -1 ? "" : text.slice(idx + 2);
        const newContent = pageContent.map((item) => {
            if (item.section === "intro_p1") return { ...item, [lk("content")]: p1 };
            if (item.section === "intro_p2") return { ...item, [lk("content")]: p2 };
            return item;
        });
        setPageContent(newContent);
        saveContent(newContent);
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
                <Tab label={__("Page Content", lang)} icon={<ArticleIcon />} iconPosition="start" />
                <Tab label={__("General Labels", lang)} />
            </Tabs>

            {tab === 0 && (
                <AdminSection
                    saving={saving}
                    error={error}
                    success={success}
                >
                    <TextField
                        label={__("Contacts Headline (main)", lang)}
                        size="small"
                        fullWidth
                        value={getContent("headline_main")}
                        onChange={(e) => { updateContent("headline_main", e.target.value); }}
                        onBlur={() => saveContent(pageContent)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label={__("Contacts Headline (sub)", lang)}
                        size="small"
                        fullWidth
                        value={getContent("headline_sub")}
                        onChange={(e) => { updateContent("headline_sub", e.target.value); }}
                        onBlur={() => saveContent(pageContent)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label={__("Contacts Intro", lang)}
                        size="small"
                        fullWidth
                        multiline
                        minRows={5}
                        value={introText ?? introCombined}
                        onChange={(e) => setIntroText(e.target.value)}
                        onBlur={handleIntroBlur}
                        sx={{ mb: 2 }}
                    />
                </AdminSection>
            )}

            {tab === 1 && (
                <AdminSection
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
