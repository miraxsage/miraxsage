"use client";

import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Switch,
    CircularProgress,
    useTheme,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import { AdminSection, AdminTabs, SortableList, useAdminData, useLocalizedField, IconPickerButton } from "@/features/admin-editor";
import type { ContactItem } from "@/widgets/landing/MainSlide";
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

interface SharingItem {
    id: number;
    sort_order: number;
    type: string;
    title_en: string;
    title_ru: string;
    icon: string;
    is_visible: number;
}

interface ContactsData {
    contact_page_content: ContactPageContent[];
    contact_info: ContactItem[];
    sharing_links: SharingItem[];
}


// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let tempIdCounter = -1;
function nextTempId() {
    return tempIdCounter--;
}

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

    // ---- Contact list (moved from Details) ----
    const contacts = data?.contact_info ?? [];

    const updateContacts = (newContacts: ContactItem[]) => {
        if (!data) return;
        setData({ ...data, contact_info: newContacts });
    };

    const updateContact = (id: number | string, field: string, value: unknown) => {
        updateContacts(contacts.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
    };

    const saveContacts = (list?: ContactItem[]) => {
        const ordered = (list ?? contacts).map((c, i) => ({ ...c, sort_order: i }));
        save({ section: "contact_info", data: ordered });
    };

    const updateContactAndSave = (id: number | string, field: string, value: unknown) => {
        const newContacts = contacts.map((c) => (c.id === id ? { ...c, [field]: value } : c));
        updateContacts(newContacts);
        saveContacts(newContacts);
    };

    const addContact = () => {
        const newContact: ContactItem = {
            id: nextTempId(),
            sort_order: contacts.length,
            type: "",
            title_en: "",
            title_ru: "",
            icon: "",
            url: "",
            is_visible: 1,
        };
        const newContacts = [...contacts, newContact];
        updateContacts(newContacts);
        saveContacts(newContacts);
    };

    // ---- Page content ----
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

    // ---- Sharing links ----
    const sharingLinks = data?.sharing_links ?? [];

    const updateSharingLinks = (newLinks: SharingItem[]) => {
        if (!data) return;
        setData({ ...data, sharing_links: newLinks });
    };

    const updateSharingLink = (id: number | string, field: string, value: unknown) => {
        updateSharingLinks(sharingLinks.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
    };

    const saveSharingLinks = (list?: SharingItem[]) => {
        const ordered = (list ?? sharingLinks).map((s, i) => ({ ...s, sort_order: i }));
        save({ section: "sharing_links", data: ordered });
    };

    const updateSharingLinkAndSave = (id: number | string, field: string, value: unknown) => {
        const newLinks = sharingLinks.map((s) => (s.id === id ? { ...s, [field]: value } : s));
        updateSharingLinks(newLinks);
        saveSharingLinks(newLinks);
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

            <AdminTabs
                value={tab}
                onChange={setTab}
                labels={["List", "Share", "Page content", "General labels"]}
                lang={lang}
            />

            {tab === 0 && (
                <AdminSection
                    saving={saving}
                    error={error}
                    success={success}
                >
                    <SortableList
                        items={contacts}
                        onReorder={(reordered) => {
                            updateContacts(reordered);
                            saveContacts(reordered);
                        }}
                        onDelete={(id) => {
                            const newContacts = contacts.filter((c) => c.id !== id);
                            updateContacts(newContacts);
                            saveContacts(newContacts);
                        }}
                        onAdd={addContact}
                        addLabel={__("Add Contact", lang)}
                        renderItem={(contact) => (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Switch
                                    checked={contact.is_visible === 1}
                                    onChange={(e) =>
                                        updateContactAndSave(contact.id, "is_visible", e.target.checked ? 1 : 0)
                                    }
                                    size="small"
                                    sx={{ flexShrink: 0 }}
                                />
                                <IconPickerButton
                                    value={contact.icon}
                                    onChange={(v) => updateContactAndSave(contact.id, "icon", v)}
                                />
                                <TextField
                                    label={__("Title", lang)}
                                    size="small"
                                    value={lv(contact, "title")}
                                    onChange={(e) => updateContact(contact.id, lk("title"), e.target.value)}
                                    onBlur={() => saveContacts()}
                                    sx={{ flex: 1, minWidth: 120 }}
                                />
                                <TextField
                                    label="URL"
                                    size="small"
                                    value={contact.url}
                                    onChange={(e) => updateContact(contact.id, "url", e.target.value)}
                                    onBlur={() => saveContacts()}
                                    sx={{ flex: 2, minWidth: 200 }}
                                />
                            </Box>
                        )}
                    />
                </AdminSection>
            )}

            {tab === 1 && (
                <AdminSection
                    saving={saving}
                    error={error}
                    success={success}
                >
                    <SortableList
                        items={sharingLinks}
                        onReorder={(reordered) => {
                            updateSharingLinks(reordered);
                            saveSharingLinks(reordered);
                        }}
                        renderItem={(link) => (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Switch
                                    checked={link.is_visible === 1}
                                    onChange={(e) =>
                                        updateSharingLinkAndSave(link.id, "is_visible", e.target.checked ? 1 : 0)
                                    }
                                    size="small"
                                    sx={{ flexShrink: 0 }}
                                />
                                <IconPickerButton
                                    value={link.icon}
                                    onChange={(v) => updateSharingLinkAndSave(link.id, "icon", v)}
                                />
                                <TextField
                                    label={__("Title", lang)}
                                    size="small"
                                    value={lv(link, "title")}
                                    onChange={(e) => updateSharingLink(link.id, lk("title"), e.target.value)}
                                    onBlur={() => saveSharingLinks()}
                                    sx={{ flex: 1, minWidth: 120 }}
                                />
                            </Box>
                        )}
                    />
                </AdminSection>
            )}

            {tab === 2 && (
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

            {tab === 3 && (
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
