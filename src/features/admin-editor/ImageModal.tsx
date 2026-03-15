"use client";

import { useState, useRef, useEffect, useCallback, DragEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    CircularProgress,
    Box,
    Typography,
    IconButton,
    useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import DeleteIcon from "@mui/icons-material/Delete";
import { __ } from "@/shared/lib/i18n";
import { getThemeColor } from "@/shared/lib/theme";
import CustomScrollbar from "@/shared/ui/Scrollbar";
import useLocalizedField from "./useLocalizedField";
import type { ProjectImage } from "@/entities/project/model/projectImage";

type Lang = "en" | "ru";
type Mode = "create" | "view";

function sanitizeSlug(filename: string): string {
    return filename
        .toLowerCase()
        .replace(/\.[^.]+$/, "")
        .replace(/[\s.]+/g, "-")
        .replace(/[^a-z0-9_-]/g, "")
        .slice(0, 80)
        .replace(/^-+|-+$/g, "");
}

interface FileInfo {
    file: File;
    previewUrl: string;
    width: number;
    height: number;
}

interface ImageModalProps {
    open: boolean;
    onClose: () => void;
    projectId: number;
    mediaId: string;
    images: ProjectImage[];
    initialIndex?: number;
    mode?: Mode;
    onImagesChange: (images: ProjectImage[]) => void;
}

const ZOOM_STEP = 0.2;

export default function ImageModal({
    open,
    onClose,
    projectId,
    mediaId,
    images,
    initialIndex = 0,
    mode: initialMode = "view",
    onImagesChange,
}: ImageModalProps) {
    const theme = useTheme();
    const { lang: globalLang } = useLocalizedField();
    const layoutBg = getThemeColor("layoutBackground", theme);
    const titleBg = getThemeColor("titleBg", theme);
    const barBackground = getThemeColor("barBackground", theme);
    const regularIcon = getThemeColor("regularIcon", theme);

    const [mode, setMode] = useState<Mode>(initialMode);
    const [index, setIndex] = useState(initialIndex);
    const [toggleLang, setToggleLang] = useState<Lang>(globalLang);

    // Create mode state
    const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form state
    const [slug, setSlug] = useState("");
    const [titleEn, setTitleEn] = useState("");
    const [titleRu, setTitleRu] = useState("");
    const [descEn, setDescEn] = useState("");
    const [descRu, setDescRu] = useState("");
    const [isCover, setIsCover] = useState(false);

    const [saving, setSaving] = useState(false);
    const [slugError, setSlugError] = useState("");
    const [uploadError, setUploadError] = useState("");

    // Dirty tracking for view mode saves
    const formSnapshotRef = useRef("");
    const currentFormKey = () => `${slug}|${titleEn}|${titleRu}|${descEn}|${descRu}|${isCover}`;

    // Zoom state
    const [zoomLevel, setZoomLevel] = useState(0); // 0 = fit, 1 = fill
    const [imgNaturalSize, setImgNaturalSize] = useState({ w: 0, h: 0 });
    const [viewerSize, setViewerSize] = useState({ w: 0, h: 0 });
    const [displayedSrc, setDisplayedSrc] = useState<string | null>(null);
    const viewerRef = useRef<HTMLDivElement>(null);

    const count = images.length;
    const current = mode === "view" && count > 0 ? images[index] ?? images[0] : null;

    // Reset when modal opens
    useEffect(() => {
        if (!open) return;
        setMode(initialMode);
        setIndex(initialMode === "view" ? initialIndex : 0);
        setToggleLang(globalLang);
        setFileInfo(null);
        setDragOver(false);
        setSaving(false);
        setSlugError("");
        setUploadError("");
    }, [open, initialMode, initialIndex, globalLang]);

    // Track viewer size — use rAF to ensure Dialog portal has mounted
    useEffect(() => {
        if (!open) return;
        let ro: ResizeObserver | null = null;
        const frame = requestAnimationFrame(() => {
            const el = viewerRef.current;
            if (!el) return;
            ro = new ResizeObserver(([entry]) => {
                setViewerSize({ w: entry.contentRect.width, h: entry.contentRect.height });
            });
            ro.observe(el);
        });
        return () => {
            cancelAnimationFrame(frame);
            ro?.disconnect();
        };
    }, [open]);

    // Preload new image, compute zoom, then swap displayed src (old image stays visible until ready)
    const imageSrcRaw = current ? `/img/projects/${mediaId}/${current.slug}${current.original_ext}` : null;
    useEffect(() => {
        if (!imageSrcRaw || mode !== "view") return;
        const preload = new Image();
        preload.onload = () => {
            const natW = preload.naturalWidth;
            const natH = preload.naturalHeight;

            // Measure viewer
            const el = viewerRef.current;
            let vw = viewerSize.w;
            let vh = viewerSize.h;
            if (el && (vw === 0 || vh === 0)) {
                const rect = el.getBoundingClientRect();
                if (rect.width > 0) { vw = rect.width; vh = rect.height; }
            }

            // Compute initial zoom so image occupies at least 50% of viewer width
            let initialZoom = 0;
            if (vw > 0 && vh > 0) {
                const fit = Math.min(vw / natW, vh / natH);
                const fill = Math.max(vw / natW, vh / natH);
                const minScale = (vw * 0.5) / natW;
                if (fit < minScale && fill > fit) {
                    initialZoom = Math.min(1, (minScale - fit) / (fill - fit));
                }
            }

            // Batch all updates — React 18 batches these, so the render shows new image with correct zoom
            setImgNaturalSize({ w: natW, h: natH });
            if (vw > 0 && vh > 0) setViewerSize({ w: vw, h: vh });
            setZoomLevel(initialZoom);
            setDisplayedSrc(imageSrcRaw);
        };
        preload.src = imageSrcRaw;
        return () => { preload.onload = null; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageSrcRaw, mode]);

    // Computed zoom scales
    const hasSize = imgNaturalSize.w > 0 && imgNaturalSize.h > 0 && viewerSize.w > 0 && viewerSize.h > 0;
    const fitScale = hasSize ? Math.min(viewerSize.w / imgNaturalSize.w, viewerSize.h / imgNaturalSize.h) : 1;
    const fillScale = hasSize ? Math.max(viewerSize.w / imgNaturalSize.w, viewerSize.h / imgNaturalSize.h) : 1;
    const currentScale = fitScale + zoomLevel * (fillScale - fitScale);
    const imgDisplayW = hasSize ? Math.round(imgNaturalSize.w * currentScale) : undefined;
    const imgDisplayH = hasSize ? Math.round(imgNaturalSize.h * currentScale) : undefined;

    // Determine scroll axis: horizontal if image is wider relative to viewport, vertical otherwise
    const isHorizontalScroll = hasSize && imgNaturalSize.w / imgNaturalSize.h > viewerSize.w / viewerSize.h;

    // Zoom handlers
    const handleZoomIn = () => setZoomLevel((z) => Math.min(1, +(z + ZOOM_STEP).toFixed(2)));
    const handleZoomOut = () => setZoomLevel((z) => Math.max(0, +(z - ZOOM_STEP).toFixed(2)));
    const handleZoomToggle = () => setZoomLevel((z) => (z < 0.5 ? 1 : 0));

    // Delete current image
    const handleDeleteImage = useCallback(async () => {
        if (!current) return;
        try {
            const res = await fetch(`/api/projects/${projectId}/images`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image_id: current.id }),
            });
            if (res.ok) {
                // Refetch to reflect server-side cover reassignment
                const listRes = await fetch(`/api/projects/${projectId}/images`);
                const data = await listRes.json();
                const freshImages: ProjectImage[] = Array.isArray(data) ? data : data.data ?? [];
                onImagesChange(freshImages);
                if (freshImages.length === 0) {
                    onClose();
                } else {
                    setIndex((i) => Math.min(i, freshImages.length - 1));
                }
            }
        } catch {
            // silent
        }
    }, [current, projectId, images, onImagesChange, onClose]);

    // Populate form from current image in view mode
    useEffect(() => {
        if (!open || mode !== "view" || !current) return;
        setSlug(current.slug);
        setTitleEn(current.title_en ?? "");
        setTitleRu(current.title_ru ?? "");
        setDescEn(current.description_en ?? "");
        setDescRu(current.description_ru ?? "");
        setIsCover(current.is_cover === 1);
        setSlugError("");
        setUploadError("");
        // Snapshot from source data (not state, which updates async)
        formSnapshotRef.current = `${current.slug}|${current.title_en ?? ""}|${current.title_ru ?? ""}|${current.description_en ?? ""}|${current.description_ru ?? ""}|${current.is_cover === 1}`;
    }, [open, mode, current]);

    // Reset form for create mode
    useEffect(() => {
        if (!open || mode !== "create") return;
        setSlug("");
        setTitleEn("");
        setTitleRu("");
        setDescEn("");
        setDescRu("");
        setIsCover(false);
        formSnapshotRef.current = "";
    }, [open, mode]);

    // Save current image
    const saveCurrentImage = useCallback(async () => {
        if (mode !== "view" || !current) return;
        if (currentFormKey() === formSnapshotRef.current) return;

        setSaving(true);
        setSlugError("");
        try {
            const res = await fetch(`/api/projects/${projectId}/images`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    image_id: current.id,
                    slug,
                    title_en: titleEn,
                    title_ru: titleRu,
                    description_en: descEn,
                    description_ru: descRu,
                    is_cover: isCover ? 1 : 0,
                }),
            });
            if (res.ok) {
                // Refetch all images to reflect server-side cover reassignment
                const listRes = await fetch(`/api/projects/${projectId}/images`);
                const data = await listRes.json();
                const freshImages: ProjectImage[] = Array.isArray(data) ? data : data.data ?? [];
                onImagesChange(freshImages);
                formSnapshotRef.current = currentFormKey();
            } else {
                const body = await res.json().catch(() => ({}));
                if ((body.error ?? "").toLowerCase().includes("slug")) {
                    setSlugError(__("Slug already exists for this project", globalLang));
                }
            }
        } catch {
            // silent
        }
        setSaving(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, current, slug, titleEn, titleRu, descEn, descRu, isCover, projectId, images, onImagesChange]);

    const revertForm = useCallback(() => {
        if (!current) return;
        setSlug(current.slug);
        setTitleEn(current.title_en ?? "");
        setTitleRu(current.title_ru ?? "");
        setDescEn(current.description_en ?? "");
        setDescRu(current.description_ru ?? "");
        setIsCover(current.is_cover === 1);
        setSlugError("");
        setUploadError("");
    }, [current]);

    const isDirty = mode === "view" && current ? currentFormKey() !== formSnapshotRef.current : false;

    const navigate = useCallback(
        async (dir: -1 | 1) => {
            setIndex((i) => {
                if (dir === -1) return i > 0 ? i - 1 : count - 1;
                return i < count - 1 ? i + 1 : 0;
            });
        },
        [count],
    );

    // Keyboard nav
    useEffect(() => {
        if (!open || mode !== "view") return;
        const handleKey = (e: KeyboardEvent) => {
            if ((e.target as HTMLElement)?.tagName === "INPUT" || (e.target as HTMLElement)?.tagName === "TEXTAREA") return;
            if (e.key === "ArrowLeft") navigate(-1);
            else if (e.key === "ArrowRight") navigate(1);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open, mode, navigate]);

    // File processing for create mode
    const processFile = useCallback((file: File) => {
        setSlugError("");
        setUploadError("");
        const previewUrl = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            setFileInfo({ file, previewUrl, width: img.naturalWidth, height: img.naturalHeight });
            setSlug(sanitizeSlug(file.name));
        };
        img.onerror = () => {
            URL.revokeObjectURL(previewUrl);
            setUploadError("Failed to load image");
        };
        img.src = previewUrl;
    }, []);

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) processFile(file);
            e.target.value = "";
        },
        [processFile],
    );

    const handleDragOver = useCallback((e: DragEvent) => { e.preventDefault(); setDragOver(true); }, []);
    const handleDragLeave = useCallback((e: DragEvent) => { e.preventDefault(); setDragOver(false); }, []);
    const handleDrop = useCallback(
        (e: DragEvent) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files?.[0];
            if (file && file.type.startsWith("image/")) processFile(file);
        },
        [processFile],
    );

    const handleUpload = useCallback(async () => {
        if (!fileInfo) return;
        if (!slug.trim()) { setSlugError("Slug is required"); return; }

        setSaving(true);
        setSlugError("");
        setUploadError("");

        try {
            const fd = new FormData();
            fd.append("file", fileInfo.file);
            fd.append("slug", slug.trim());
            fd.append("title_en", titleEn);
            fd.append("title_ru", titleRu);
            fd.append("description_en", descEn);
            fd.append("description_ru", descRu);
            fd.append("is_cover", isCover ? "1" : "0");

            const res = await fetch(`/api/projects/${projectId}/images`, { method: "POST", body: fd });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                const errMsg = body.error || "Upload failed";
                if (errMsg.toLowerCase().includes("slug")) setSlugError(errMsg);
                else setUploadError(errMsg);
                setSaving(false);
                return;
            }

            // Refresh images list and switch to viewing the new image
            const listRes = await fetch(`/api/projects/${projectId}/images`);
            const data = await listRes.json();
            const newImages: ProjectImage[] = Array.isArray(data) ? data : data.data ?? [];
            onImagesChange(newImages);

            // Switch to view mode showing the new image
            const newIdx = newImages.findIndex((img) => img.slug === slug.trim());
            setIndex(newIdx >= 0 ? newIdx : newImages.length - 1);
            setMode("view");
            setFileInfo(null);
        } catch {
            setUploadError("Upload failed");
        }
        setSaving(false);
    }, [fileInfo, slug, titleEn, titleRu, descEn, descRu, isCover, projectId, onImagesChange]);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const title = toggleLang === "en" ? titleEn : titleRu;
    const setTitle = toggleLang === "en" ? setTitleEn : setTitleRu;
    const desc = toggleLang === "en" ? descEn : descRu;
    const setDesc = toggleLang === "en" ? setDescEn : setDescRu;

    const imageSrc = displayedSrc;

    const navBtnSx = {
        color: regularIcon,
        bgcolor: titleBg,
        "&:hover": { bgcolor: getThemeColor("regularHoverBg", theme) },
        width: 36,
        height: 36,
    };

    const zoomBtnSx = {
        color: regularIcon,
        width: 28,
        height: 28,
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: getThemeColor("menuText", theme), mr: 0.5 }}>
                        {mode === "create" ? "Новое изображение" : `${index + 1} / ${count}`}
                    </Typography>
                    {mode === "view" && (
                        <>
                            <IconButton size="small" onClick={handleZoomOut} disabled={zoomLevel <= 0} sx={zoomBtnSx}>
                                <ZoomOutIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={handleZoomIn} disabled={zoomLevel >= 1} sx={zoomBtnSx}>
                                <ZoomInIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={handleZoomToggle} sx={zoomBtnSx}>
                                {zoomLevel < 0.5 ? <ZoomOutMapIcon fontSize="small" /> : <ZoomInMapIcon fontSize="small" />}
                            </IconButton>
                            <IconButton size="small" onClick={handleDeleteImage} sx={{ ...zoomBtnSx, "&:hover": { color: "error.main" } }}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </>
                    )}
                </Box>
                <IconButton size="small" onClick={handleClose} sx={{ color: regularIcon }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {/* Viewer / Drop zone area */}
                <Box
                    ref={viewerRef}
                    sx={{
                        position: "relative",
                        flex: 1,
                        minHeight: 0,
                        bgcolor: barBackground,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        "& .os-scrollbar": {
                            "--os-handle-bg": getThemeColor("scrollbarHandle", theme),
                            "--os-handle-bg-hover": getThemeColor("scrollbarHoverHandle", theme),
                            "--os-handle-bg-active": getThemeColor("scrollbarHoverHandle", theme),
                            "--os-size": "6.5px",
                            "--os-padding-perpendicular": "2px",
                        },
                        "& .os-scrollbar-vertical .os-scrollbar-handle:before": {
                            left: "-2px",
                            right: "-3px",
                        },
                    }}
                >
                    {mode === "view" && imageSrc ? (
                        <>
                            {count > 1 && (
                                <IconButton
                                    onClick={() => navigate(-1)}
                                    sx={{ ...navBtnSx, position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", zIndex: 1 }}
                                >
                                    <ChevronLeftIcon />
                                </IconButton>
                            )}
                            <CustomScrollbar
                                options={{
                                    overflow: {
                                        x: isHorizontalScroll ? "scroll" : "hidden",
                                        y: isHorizontalScroll ? "hidden" : "scroll",
                                    },
                                    scrollbars: { autoHide: "move" },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        minHeight: "100%",
                                        minWidth: "100%",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={imageSrc}
                                        alt={current?.slug}
                                        sx={{
                                            display: "block",
                                            ...(hasSize
                                                ? { width: imgDisplayW, height: imgDisplayH }
                                                : { maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }),
                                        }}
                                    />
                                </Box>
                            </CustomScrollbar>
                            {count > 1 && (
                                <IconButton
                                    onClick={() => navigate(1)}
                                    sx={{ ...navBtnSx, position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", zIndex: 1 }}
                                >
                                    <ChevronRightIcon />
                                </IconButton>
                            )}
                        </>
                    ) : mode === "create" && fileInfo ? (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                cursor: "pointer",
                            }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Box
                                component="img"
                                src={fileInfo.previewUrl}
                                alt="preview"
                                sx={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                    display: "block",
                                    p: 1,
                                }}
                            />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                p: 2,
                            }}
                        >
                            <Box
                                onClick={() => fileInputRef.current?.click()}
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
                                    height: "100%",
                                    cursor: "pointer",
                                    border: "2px dashed",
                                    borderColor: dragOver ? "primary.main" : "divider",
                                    borderRadius: 1,
                                    transition: "border-color 0.2s",
                                    "&:hover": { borderColor: "primary.main" },
                                }}
                            >
                                <CloudUploadIcon sx={{ fontSize: 40, color: regularIcon }} />
                                <Typography color="text.secondary" variant="body2">
                                    Перетащите или нажмите для выбора
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </Box>

                {/* Form */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, p: 2, flexShrink: 0 }}>
                    {uploadError && (
                        <Typography color="error" variant="body2">{uploadError}</Typography>
                    )}

                    <TextField
                        label={__("Slug", globalLang)}
                        size="small"
                        fullWidth
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        error={!!slugError}
                        helperText={slugError || undefined}
                    />

                    <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                        <TextField
                            label={__("Title", toggleLang)}
                            size="small"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <IconButton
                            size="small"
                            onClick={() => setToggleLang((l) => (l === "en" ? "ru" : "en"))}
                            sx={{ mt: "4px", flexShrink: 0 }}
                        >
                            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: 13, lineHeight: 1 }}>
                                {toggleLang === "en" ? "EN" : "RU"}
                            </Typography>
                        </IconButton>
                    </Box>

                    <TextField
                        label={__("Description", toggleLang)}
                        size="small"
                        fullWidth
                        multiline
                        rows={2}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isCover}
                                onChange={(e) => setIsCover(e.target.checked)}
                                size="small"
                            />
                        }
                        label={
                            <Typography variant="body2">Использовать как обложку</Typography>
                        }
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 2, py: 2, borderTop: `1px solid ${theme.palette.divider}`, justifyContent: "flex-end" }}>
                <Button
                    variant="outlined"
                    color="regular"
                    onClick={() => { revertForm(); onClose(); }}
                >
                    Отмена
                </Button>
                <Button
                    variant="outlined"
                    color="regular"
                    onClick={mode === "create" ? handleUpload : saveCurrentImage}
                    disabled={mode === "create" ? !fileInfo || saving : !isDirty || saving}
                >
                    <Box sx={{ display: "grid", placeItems: "center", "& > *": { gridArea: "1 / 1" } }}>
                        <Box sx={{ visibility: saving ? "hidden" : "visible" }}>{__("Save", globalLang)}</Box>
                        {saving && <CircularProgress size={18} sx={{ color: "regular.main" }} />}
                    </Box>
                </Button>
            </DialogActions>
        </Dialog>
    );
}
