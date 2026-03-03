"use client";

import { useState, Fragment } from "react";
import {
    Box,
    Tabs,
    Tab,
    TextField,
    Switch,
    FormControlLabel,
    Typography,
    CircularProgress,
    Chip,
    useTheme,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { SortableList, AdminSection, useAdminData, useLocalizedField } from "@/features/admin-editor";
import type { ContactItem } from "@/widgets/landing/MainSlide";
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
    { key: "contacts" as const, label: "Contacts" },
    { key: "general_labels" as const, label: "General Labels" },
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

    const { data: labelsRaw, setData: setLabelsRaw, loading: labelsLoading, save: labelsSave } = useAdminData<UiLabelItem[]>({
        url: "/api/ui-labels",
    });

    const { data: contactsData, setData: setContactsData, loading: contactsLoading, saving: contactsSaving, error: contactsError, success: contactsSuccess, save: contactsSave } = useAdminData<{ contact_info: ContactItem[] }>({
        url: "/api/contacts",
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

    if (loading || labelsLoading || contactsLoading) {
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
            saving={tab === 1 ? contactsSaving : saving}
            error={tab === 1 ? contactsError : error}
            success={tab === 1 ? contactsSuccess : success}
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
                                    label="URL"
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
                            </FieldRow>
                        </Box>
                    )}
                />
            )}

            {/* ===== Contacts ===== */}
            {tab === 1 && (
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
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={contact.is_visible === 1}
                                        onChange={(e) =>
                                            updateContactAndSave(contact.id, "is_visible", e.target.checked ? 1 : 0)
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
                                <TextField
                                    label={__("Icon", lang)}
                                    size="small"
                                    value={contact.icon}
                                    onChange={(e) => updateContact(contact.id, "icon", e.target.value)}
                                    onBlur={() => saveContacts()}
                                    sx={{ flex: 1, minWidth: 100 }}
                                />
                            </FieldRow>
                        </Box>
                    )}
                />
            )}

            {/* ===== General Labels ===== */}
            {tab === 2 && (
                <Box sx={{ display: "grid", gridTemplateColumns: "max-content 1fr", gap: 1.5, alignItems: "center" }}>
                    {labelsItems.filter((it) => it.category === "details_ui").map((item) => (
                        <Fragment key={item.id}>
                            <Chip label={item.key} size="small" variant="outlined" sx={{ justifyContent: "flex-start", fontFamily: "monospace", fontSize: "0.8rem", color: "#E4E4E5", "& .MuiChip-label": { padding: "6px 12px" } }} />
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
                            <Chip label={item.key} size="small" variant="outlined" sx={{ justifyContent: "flex-start", fontFamily: "monospace", fontSize: "0.8rem", color: "#E4E4E5", "& .MuiChip-label": { padding: "6px 12px" } }} />
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
        </AdminSection>
    );
}
