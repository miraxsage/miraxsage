"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, CircularProgress, MenuItem, TextField, Typography, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getThemeColor } from "@/shared/lib/theme";
import { __ } from "@/shared/lib/i18n";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";

interface AvatarState {
    dark: string | null;
    light: string | null;
}

export default function AvatarUploader() {
    const theme = useTheme();
    const { lang } = useLanguage();
    const inputRef = useRef<HTMLInputElement>(null);
    const [avatars, setAvatars] = useState<AvatarState>({ dark: null, light: null });
    const [selectedTheme, setSelectedTheme] = useState<"dark" | "light">("dark");
    const [dragOver, setDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);
    const regularIcon = getThemeColor("regularIcon", theme);

    useEffect(() => {
        fetch("/api/avatar")
            .then((r) => r.json())
            .then((data) => setAvatars(data))
            .catch(() => {});
    }, []);

    const src = avatars[selectedTheme];

    const upload = useCallback(async (file: File) => {
        setUploading(true);
        try {
            const form = new FormData();
            form.append("file", file);
            form.append("theme", selectedTheme);
            const res = await fetch("/api/avatar", { method: "POST", body: form });
            if (res.ok) {
                const { url } = await res.json();
                setAvatars((prev) => ({ ...prev, [selectedTheme]: url + "?t=" + Date.now() }));
            }
        } finally {
            setUploading(false);
        }
    }, [selectedTheme]);

    const remove = async () => {
        const res = await fetch("/api/avatar", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ theme: selectedTheme }),
        });
        if (res.ok) setAvatars((prev) => ({ ...prev, [selectedTheme]: null }));
    };

    const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setDragOver(true); }, []);
    const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setDragOver(false); }, []);
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file?.type.startsWith("image/")) upload(file);
    }, [upload]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <TextField
                select
                size="small"
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value as "dark" | "light")}
                label={__("Theme", lang)}
                sx={{ alignSelf: "flex-start", minWidth: 200 }}
            >
                <MenuItem value="dark">{__("Dark theme", lang)}</MenuItem>
                <MenuItem value="light">{__("Light theme", lang)}</MenuItem>
            </TextField>
            <Box
                onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    width: "100%",
                    height: 375,
                    cursor: "pointer",
                    border: "2px dashed",
                    borderColor: dragOver ? "primary.main" : "divider",
                    borderRadius: 1,
                    transition: "border-color 0.2s",
                    "&:hover": { borderColor: "primary.main" },
                }}
            >
                {uploading ? (
                    <CircularProgress size={40} />
                ) : src ? (
                    <Box
                        component="img"
                        src={src}
                        alt="Avatar"
                        sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", p: 1 }}
                    />
                ) : (
                    <>
                        <CloudUploadIcon sx={{ fontSize: 40, color: regularIcon }} />
                        <Typography color="text.secondary" variant="body2">
                            {__("Drag or click to select", lang)}
                        </Typography>
                    </>
                )}
            </Box>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) upload(file);
                    e.target.value = "";
                }}
            />
            {src && (
                <Button
                    variant="outlined"
                    color="regular"
                    startIcon={<DeleteIcon />}
                    onClick={remove}
                    sx={{ alignSelf: "flex-start" }}
                >
                    {__("Delete", lang)}
                </Button>
            )}
        </Box>
    );
}
