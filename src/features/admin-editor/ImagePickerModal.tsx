"use client";

import {
    Dialog,
    DialogContent,
    Box,
    IconButton,
    Typography,
    useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getThemeColor } from "@/shared/lib/theme";
import { __ } from "@/shared/lib/i18n";
import useLocalizedField from "./useLocalizedField";

interface ImagePickerModalProps {
    open: boolean;
    onClose: () => void;
    images: Array<{ id: number; slug: string; original_ext: string; sort_order: number }>;
    mediaId: string;
    onSelect: (slug: string) => void;
}

export default function ImagePickerModal({
    open,
    onClose,
    images,
    mediaId,
    onSelect,
}: ImagePickerModalProps) {
    const theme = useTheme();
    const { lang } = useLocalizedField();
    const layoutBg = getThemeColor("layoutBackground", theme);
    const titleBg = getThemeColor("titleBg", theme);
    const barBackground = getThemeColor("barBackground", theme);
    const regularIcon = getThemeColor("regularIcon", theme);

    const handleClick = (slug: string) => {
        onSelect(slug);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: layoutBg,
                    backgroundImage: "none",
                    overflow: "hidden",
                    maxWidth: "min(calc(100vw - 64px), calc((100vh - 64px) * 16 / 9))",
                    height: "calc(100vh - 64px)",
                    maxHeight: "calc(100vh - 64px)",
                },
            }}
        >
            {/* Header bar */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                    py: 1,
                    bgcolor: titleBg,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: getThemeColor("menuText", theme) }}>
                    {__("Select image", lang)}
                </Typography>
                <IconButton size="small" onClick={onClose} sx={{ color: regularIcon }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        bgcolor: barBackground,
                        overflow: "auto",
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(6, 1fr)",
                            gap: 1,
                            p: 2,
                        }}
                    >
                        {images.map((img) => (
                            <Box
                                key={img.id}
                                component="img"
                                src={`/img/projects/${mediaId}/${img.slug}-tiny.webp`}
                                alt={img.slug}
                                onClick={() => handleClick(img.slug)}
                                sx={{
                                    aspectRatio: "1",
                                    objectFit: "cover",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    width: "100%",
                                    display: "block",
                                    border: "2px solid transparent",
                                    "&:hover": { borderColor: "primary.main" },
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
