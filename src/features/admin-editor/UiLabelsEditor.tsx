"use client";

import { Fragment } from "react";
import { Box, TextField, Typography, Chip } from "@mui/material";
import { useLocalizedField } from "@/features/admin-editor";
import { __ } from "@/shared/lib/i18n";

export interface UiLabelItem {
    id: number;
    key: string;
    value_en: string;
    value_ru: string;
    category: string;
}

interface UiLabelsEditorProps {
    category: string;
    items: UiLabelItem[];
    onUpdate: (id: number | string, field: string, value: string) => void;
    onSave: (items: UiLabelItem[]) => void;
}

export default function UiLabelsEditor({ category, items, onUpdate, onSave }: UiLabelsEditorProps) {
    const { lang } = useLocalizedField();
    const filteredItems = items.filter((item) => item.category === category);
    const lk = (base: string) => `${base}_${lang}`;

    return (
        <Box sx={{ display: "grid", gridTemplateColumns: "max-content 1fr", gap: 1.5, alignItems: "center" }}>
            {filteredItems.map((item) => (
                <Fragment key={item.id}>
                    <Chip
                        label={item.key}
                        size="small"
                        variant="outlined"
                        sx={{ justifyContent: "flex-start", fontFamily: "monospace", fontSize: "0.8rem", color: "#E4E4E5", "& .MuiChip-label": { padding: "6px 12px" } }}
                    />
                    <TextField
                        label={__("Value", lang)}
                        size="small"
                        value={item[lk("value") as keyof UiLabelItem] ?? ""}
                        onChange={(e) => onUpdate(item.id, lk("value"), e.target.value)}
                        onBlur={() => onSave(items)}
                    />
                </Fragment>
            ))}
            {filteredItems.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ gridColumn: "1 / -1" }}>
                    No labels found for category &quot;{category}&quot;.
                </Typography>
            )}
        </Box>
    );
}
