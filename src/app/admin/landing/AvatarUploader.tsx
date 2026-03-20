"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getThemeColor } from "@/shared/lib/theme";
import { __ } from "@/shared/lib/i18n";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";

interface AvatarState {
    dark: string | null;
    light: string | null;
}

function AvatarSlot({
    label,
    src,
    onUpload,
    onDelete,
}: {
    label: string;
    src: string | null;
    onUpload: (file: File) => void;
    onDelete: () => void;
}) {
    const theme = useTheme();
    const inputRef = useRef<HTMLInputElement>(null);
    const { lang } = useLanguage();

    return (
        <Box
            sx={{
                flex: 1,
                minWidth: 200,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "6px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
            }}
        >
            <Typography variant="subtitle2" sx={{ color: getThemeColor("menuText", theme) }}>
                {label}
            </Typography>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 250,
                    aspectRatio: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px dashed ${theme.palette.divider}`,
                    borderRadius: "4px",
                    overflow: "hidden",
                    backgroundColor: theme.palette.action.hover,
                }}
            >
                {src ? (
                    <Box
                        component="img"
                        src={src}
                        alt={label}
                        sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    />
                ) : (
                    <Typography variant="body2" sx={{ color: theme.palette.text.disabled }}>
                        {__("No image", lang)}
                    </Typography>
                )}
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onUpload(file);
                        e.target.value = "";
                    }}
                />
                <Button
                    variant="outlined"
                    color="regular"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => inputRef.current?.click()}
                >
                    {__("Upload", lang)}
                </Button>
                {src && (
                    <IconButton
                        size="small"
                        onClick={onDelete}
                        sx={{ color: getThemeColor("tabIcon", theme), "&:hover": { color: theme.palette.error.main } }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
}

export default function AvatarUploader() {
    const { lang } = useLanguage();
    const [avatars, setAvatars] = useState<AvatarState>({ dark: null, light: null });

    useEffect(() => {
        fetch("/api/avatar")
            .then((r) => r.json())
            .then((data) => setAvatars(data))
            .catch(() => {});
    }, []);

    const upload = (theme: "dark" | "light") => async (file: File) => {
        const form = new FormData();
        form.append("file", file);
        form.append("theme", theme);
        const res = await fetch("/api/avatar", { method: "POST", body: form });
        if (res.ok) {
            const { url } = await res.json();
            setAvatars((prev) => ({ ...prev, [theme]: url + "?t=" + Date.now() }));
        }
    };

    const remove = (theme: "dark" | "light") => async () => {
        const res = await fetch("/api/avatar", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ theme }),
        });
        if (res.ok) setAvatars((prev) => ({ ...prev, [theme]: null }));
    };

    return (
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            <AvatarSlot
                label={__("Dark theme", lang)}
                src={avatars.dark}
                onUpload={upload("dark")}
                onDelete={remove("dark")}
            />
            <AvatarSlot
                label={__("Light theme", lang)}
                src={avatars.light}
                onUpload={upload("light")}
                onDelete={remove("light")}
            />
        </Box>
    );
}
