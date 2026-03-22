"use client";

import { useState, Fragment } from "react";
import {
    Box,
    Tabs,
    Tab,
    TextField,
    Switch,
    Typography,
    CircularProgress,
    useTheme,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { SortableList, AdminSection, useAdminData, useLocalizedField, AdminKeyChip, IconPickerButton, RichTextEditor } from "@/features/admin-editor";
import type { ContactItem } from "@/widgets/landing/MainSlide";
import type { UiLabelItem } from "@/features/admin-editor/UiLabelsEditor";
import { __ } from "@/shared/lib/i18n";
import { getThemeColor } from "@/shared/lib/theme";

interface InfoDrawerAdminData {
    [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Label display names (localized chip labels for admin UI)
// ---------------------------------------------------------------------------

const KEY_LABELS: Record<string, { en: string; ru: string }> = {
    // details_ui
    "Dark mode": { en: "Dark mode", ru: "Тёмный режим" },
    "Light mode": { en: "Light mode", ru: "Светлый режим" },
    "English": { en: "English language", ru: "Английский язык" },
    "Русский язык": { en: "Russian language", ru: "Русский язык" },
    "Full screen": { en: "Fullscreen mode", ru: "Полный экран" },
    "In window": { en: "Window mode", ru: "Оконный режим" },
    "Console": { en: "Console", ru: "Консоль" },
    "User interface": { en: "User interface", ru: "Интерфейс" },
    "Footer": { en: "Footer", ru: "Футер" },
    // details_navigation
    "Home": { en: "Home", ru: "Главная" },
    "Resume": { en: "Resume", ru: "Резюме" },
    "Portfolio": { en: "Portfolio", ru: "Портфолио" },
    "Interact": { en: "Interact", ru: "Контакты" },
"Download PDF": { en: "Download PDF", ru: "Скачать PDF" },
    "Write": { en: "Write", ru: "Написать" },
    "Resume filename": { en: "Resume filename", ru: "Имя файла резюме" },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let tempIdCounter = -1;
function nextTempId() {
    return tempIdCounter--;
}


const TAB_KEYS = [
    { key: "contacts" as const, label: "Contacts" },
    { key: "general_labels" as const, label: "General Labels" },
    { key: "info" as const, label: "Info" },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AdminDetailsPage() {
    const theme = useTheme();
    const menuText = getThemeColor("menuText", theme);
    const { lang, lk, lv } = useLocalizedField();

    const [tab, setTab] = useState(0);

    const { data: labelsRaw, setData: setLabelsRaw, loading: labelsLoading, saving: labelsSaving, error: labelsError, success: labelsSuccess, save: labelsSave } = useAdminData<UiLabelItem[]>({
        url: "/api/ui-labels",
    });

    const { data: contactsData, setData: setContactsData, loading: contactsLoading, saving: contactsSaving, error: contactsError, success: contactsSuccess, save: contactsSave } = useAdminData<{ contact_info: ContactItem[] }>({
        url: "/api/contacts",
    });

    const { data: infoData, setData: setInfoData, loading: infoLoading, saving: infoSaving, error: infoError, success: infoSuccess, save: infoSave } = useAdminData<InfoDrawerAdminData>({
        url: "/api/info-drawer",
    });

    const contacts = contactsData?.contact_info ?? [];

    const updateContacts = (newContacts: ContactItem[]) => {
        if (!contactsData) return;
        setContactsData({ ...contactsData, contact_info: newContacts });
    };

    const updateContact = (id: number | string, field: string, value: unknown) => {
        updateContacts(contacts.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
    };

    const saveContacts = (list?: ContactItem[]) => {
        const ordered = (list ?? contacts).map((c, i) => ({ ...c, sort_order: i }));
        contactsSave({ section: "contact_info", data: ordered });
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

    const labelsItems = labelsRaw ?? [];

    const updateLabel = (id: number | string, field: string, value: string) => {
        setLabelsRaw((prev) => {
            if (!prev) return prev;
            return prev.map((item) => (item.id === id ? { ...item, [field]: value } : item));
        });
    };

    const saveLabels = (category: string) => (items: UiLabelItem[]) => {
        const categoryItems = items.filter((it) => it.category === category);
        labelsSave({ category, data: categoryItems });
    };

    const infoFields = infoData ?? {} as InfoDrawerAdminData;

    const updateInfoField = (key: string, value: string) => {
        setInfoData((prev) => (prev ? { ...prev, [key]: value } : prev));
    };

    const updateInfoFieldAndSave = (key: string, value: string) => {
        const updated = { ...infoFields, [key]: value };
        setInfoData(updated);
        // Save only key-value fields, not blocks
        const { blocks: _b, ...kvFields } = updated;
        infoSave(kvFields);
    };

    const saveInfo = () => {
        const { blocks: _b, ...kvFields } = infoFields;
        infoSave(kvFields);
    };

    const chipLabel = (key: string) => KEY_LABELS[key]?.[lang] ?? key;

    if (labelsLoading || contactsLoading || infoLoading) {
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
            saving={tab === 0 ? contactsSaving : tab === 1 ? labelsSaving : infoSaving}
            error={tab === 0 ? contactsError : tab === 1 ? labelsError : infoError}
            success={tab === 0 ? contactsSuccess : tab === 1 ? labelsSuccess : infoSuccess}
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

            {/* ===== Contacts ===== */}
            {tab === 0 && (
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
            )}

            {/* ===== General Labels ===== */}
            {tab === 1 && (
                <Box sx={{ display: "grid", gridTemplateColumns: "max-content 1fr", gap: 1.5, alignItems: "center" }}>
                    {labelsItems.filter((it) => it.category === "details_ui").map((item) => (
                        <Fragment key={item.id}>
                            <AdminKeyChip label={chipLabel(item.key)} />
                            <TextField
                                label={__("Value", lang)}
                                size="small"
                                value={item[lk("value") as keyof UiLabelItem] ?? ""}
                                onChange={(e) => updateLabel(item.id, lk("value"), e.target.value)}
                                onBlur={() => saveLabels("details_ui")(labelsItems)}
                            />
                        </Fragment>
                    ))}

                    {/* Divider with Navigation Labels heading */}
                    <Box sx={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 2, my: 0.5 }}>
                        <Box sx={{ flex: 1, height: "1px", background: theme.palette.divider }} />
                        <Typography variant="subtitle2" sx={{ color: menuText, whiteSpace: "nowrap" }}>
                            {__("Navigation Labels", lang)}
                        </Typography>
                        <Box sx={{ flex: 1, height: "1px", background: theme.palette.divider }} />
                    </Box>

                    {labelsItems.filter((it) => it.category === "details_navigation").map((item) => (
                        <Fragment key={item.id}>
                            <AdminKeyChip label={chipLabel(item.key)} />
                            <TextField
                                label={__("Value", lang)}
                                size="small"
                                value={item[lk("value") as keyof UiLabelItem] ?? ""}
                                onChange={(e) => updateLabel(item.id, lk("value"), e.target.value)}
                                onBlur={() => saveLabels("details_navigation")(labelsItems)}
                            />
                        </Fragment>
                    ))}
                </Box>
            )}

            {/* ===== Info Drawer ===== */}
            {tab === 2 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {/* Status & Location */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box sx={{ flex: 1, height: "1px", background: theme.palette.divider }} />
                        <Typography variant="subtitle2" sx={{ color: menuText, whiteSpace: "nowrap" }}>
                            {__("Status & Location", lang)}
                        </Typography>
                        <Box sx={{ flex: 1, height: "1px", background: theme.palette.divider }} />
                    </Box>

                    {/* Status */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconPickerButton
                            value={String(infoFields.status_icon ?? "WorkOutline")}
                            onChange={(v) => updateInfoFieldAndSave("status_icon", v)}
                        />
                        <TextField
                            label={__("Status", lang)}
                            size="small"
                            value={String(infoFields[lk("status_text")] ?? "")}
                            onChange={(e) => updateInfoField(lk("status_text"), e.target.value)}
                            onBlur={() => saveInfo()}
                            sx={{ flex: 1 }}
                        />
                    </Box>

                    {/* Timezone */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconPickerButton
                            value={String(infoFields.timezone_icon ?? "Schedule")}
                            onChange={(v) => updateInfoFieldAndSave("timezone_icon", v)}
                        />
                        <TextField
                            label={__("Timezone", lang)}
                            size="small"
                            value={String(infoFields.timezone ?? "")}
                            onChange={(e) => updateInfoField("timezone", e.target.value)}
                            onBlur={() => saveInfo()}
                            sx={{ flex: 1 }}
                        />
                    </Box>

                    {/* Location */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconPickerButton
                            value={String(infoFields.location_icon ?? "LocationOn")}
                            onChange={(v) => updateInfoFieldAndSave("location_icon", v)}
                        />
                        <TextField
                            label={__("Location", lang)}
                            size="small"
                            value={String(infoFields[lk("location")] ?? "")}
                            onChange={(e) => updateInfoField(lk("location"), e.target.value)}
                            onBlur={() => saveInfo()}
                            sx={{ flex: 1 }}
                        />
                    </Box>

                    {/* Copyright / Cookie Rich Text */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: -1 }}>
                        <Box sx={{ flex: 1, height: "1px", background: theme.palette.divider }} />
                        <Typography variant="subtitle2" sx={{ color: menuText, whiteSpace: "nowrap" }}>
                            {__("Copyright & Cookies", lang)}
                        </Typography>
                        <Box sx={{ flex: 1, height: "1px", background: theme.palette.divider }} />
                    </Box>
                    <Box>
                        <RichTextEditor
                            key={`copyright_${lang}`}
                            value={String(infoFields[lk("copyright")] ?? "")}
                            onChange={(html) => updateInfoField(lk("copyright"), html)}
                            onBlur={() => saveInfo()}
                            minHeight={0}
                            maxHeight="50vh"
                        />
                    </Box>

                </Box>
            )}
        </AdminSection>
    );
}
