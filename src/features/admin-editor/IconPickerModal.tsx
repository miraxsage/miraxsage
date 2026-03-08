"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Box,
    Typography,
    Divider,
    IconButton,
    InputAdornment,
    CircularProgress,
    Tooltip,
    Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { getThemeColor } from "@/shared/lib/theme";
import { useTheme } from "@mui/material";
import { __ } from "@/shared/lib/i18n";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import iconMap from "@/shared/lib/iconMap";
import { ICON_MAP } from "@/entities/resume/model/iconMap";
import muiIconNames from "@/shared/lib/muiIconNames";
import { preloadMuiIcons, getMuiIcon, getMuiModule, addMuiListener, removeMuiListener, useMuiIconsModule } from "@/shared/lib/muiIconsLoader";

export { preloadMuiIcons, getMuiIcon, getMuiModule, addMuiListener, removeMuiListener, useMuiIconsModule };

const CUSTOM_ICONS: Record<string, React.FC> = { ...iconMap, ...ICON_MAP };
const CUSTOM_NAMES = Object.keys(CUSTOM_ICONS);

const COLUMN_COUNT = 9;
const CELL_SIZE = 80;
const CELL_HEIGHT = 76;
const LABEL_HEIGHT = 28;
const DIVIDER_HEIGHT = 17;
// DialogContent has px:2 (16px each side) = 32px total horizontal padding
const DIALOG_WIDTH = COLUMN_COUNT * CELL_SIZE + 32;

type MuiModule = Record<string, React.ComponentType<{ fontSize?: string }>>;

type UserIconEntry = { name: string; svg: string };

type VRow =
    | { type: "label"; text: string }
    | { type: "icons"; icons: string[]; isCustom: boolean }
    | { type: "user-icons"; items: UserIconEntry[] }
    | { type: "divider" }
    | { type: "loading" }
    | { type: "empty"; search: string };

interface RowData {
    rows: VRow[];
    muiModule: MuiModule | null;
    onSelect: (name: string) => void;
    selectedIcon: string;
    onDeleteUserIcon: (name: string) => void;
}

function rowHeight(row: VRow): number {
    if (row.type === "label") return LABEL_HEIGHT;
    if (row.type === "divider") return DIVIDER_HEIGHT;
    if (row.type === "loading" || row.type === "empty") return 60;
    return CELL_HEIGHT;
}

function IconCellItem({
    name,
    isCustom,
    muiModule,
    onSelect,
    isSelected,
}: {
    name: string;
    isCustom: boolean;
    muiModule: MuiModule | null;
    onSelect: (name: string) => void;
    isSelected: boolean;
}) {
    const Icon = isCustom
        ? (CUSTOM_ICONS[name] as React.ComponentType<{ fontSize?: string }> | undefined)
        : (muiModule?.[name] as React.ComponentType<{ fontSize?: string }> | undefined);

    return (
        <Tooltip title={name} placement="top">
            <Box
                onClick={() => Icon && onSelect(name)}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    width: CELL_SIZE,
                    height: CELL_HEIGHT,
                    flexShrink: 0,
                    cursor: Icon ? "pointer" : "default",
                    borderRadius: "6px",
                    border: (theme) =>
                        isSelected ? `2px solid ${theme.palette.primary.main}` : "2px solid transparent",
                    background: (theme) =>
                        isSelected ? `${theme.palette.primary.main}20` : "transparent",
                    "&:hover": Icon ? { background: (theme) => theme.palette.action.hover } : {},
                    padding: "4px",
                    boxSizing: "border-box",
                    opacity: Icon ? 1 : 0.2,
                }}
            >
                {Icon ? (
                    <Icon fontSize="small" />
                ) : (
                    <Box sx={{ width: 20, height: 20, borderRadius: "3px", background: "currentColor" }} />
                )}
                <Typography
                    variant="caption"
                    sx={{
                        fontSize: "9px",
                        lineHeight: 1.1,
                        textAlign: "center",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100%",
                        px: "2px",
                    }}
                >
                    {name}
                </Typography>
            </Box>
        </Tooltip>
    );
}

function UserIconCellItem({
    entry,
    onSelect,
    onDelete,
    isSelected,
}: {
    entry: UserIconEntry;
    onSelect: (name: string) => void;
    onDelete: (name: string) => void;
    isSelected: boolean;
}) {
    const [hovered, setHovered] = useState(false);
    return (
        <Tooltip title={entry.name} placement="top">
            <Box
                onClick={() => onSelect(entry.name)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    width: CELL_SIZE,
                    height: CELL_HEIGHT,
                    flexShrink: 0,
                    cursor: "pointer",
                    borderRadius: "6px",
                    border: (theme) =>
                        isSelected ? `2px solid ${theme.palette.primary.main}` : "2px solid transparent",
                    background: (theme) =>
                        isSelected ? `${theme.palette.primary.main}20` : "transparent",
                    "&:hover": { background: (theme) => theme.palette.action.hover },
                    padding: "4px",
                    boxSizing: "border-box",
                }}
            >
                <Box
                    sx={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}
                    dangerouslySetInnerHTML={{ __html: entry.svg }}
                />
                <Typography
                    variant="caption"
                    sx={{
                        fontSize: "9px",
                        lineHeight: 1.1,
                        textAlign: "center",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100%",
                        px: "2px",
                    }}
                >
                    {entry.name}
                </Typography>
                {hovered && (
                    <IconButton
                        size="small"
                        onClick={(e) => { e.stopPropagation(); onDelete(entry.name); }}
                        sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: 16,
                            height: 16,
                            padding: 0,
                            background: (theme) => theme.palette.error.main,
                            color: "#fff",
                            borderRadius: "0 6px 0 4px",
                            "&:hover": { background: (theme) => theme.palette.error.dark },
                        }}
                    >
                        <CloseIcon sx={{ fontSize: "10px" }} />
                    </IconButton>
                )}
            </Box>
        </Tooltip>
    );
}

function VirtualRow({ index, style, data }: ListChildComponentProps<RowData>) {
    const { rows, muiModule, onSelect, selectedIcon, onDeleteUserIcon } = data;
    const row = rows[index];

    return (
        <div style={style}>
            {row.type === "label" && (
                <Typography variant="caption" color="text.secondary" sx={{ px: 1, display: "block", lineHeight: `${LABEL_HEIGHT}px` }}>
                    {row.text}
                </Typography>
            )}
            {row.type === "divider" && (
                <Divider sx={{ my: "8px" }} />
            )}
            {row.type === "loading" && (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", gap: 2 }}>
                    <CircularProgress size={20} />
                    <Typography variant="body2" color="text.secondary">Loading MUI icons...</Typography>
                </Box>
            )}
            {row.type === "empty" && (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <Typography color="text.secondary">
                        {__("No icons found for", "ru")} &quot;{row.search}&quot;
                    </Typography>
                </Box>
            )}
            {row.type === "icons" && (
                <Box sx={{ display: "flex" }}>
                    {row.icons.map((name) => (
                        <IconCellItem
                            key={name}
                            name={name}
                            isCustom={row.isCustom}
                            muiModule={muiModule}
                            onSelect={onSelect}
                            isSelected={selectedIcon === name}
                        />
                    ))}
                </Box>
            )}
            {row.type === "user-icons" && (
                <Box sx={{ display: "flex" }}>
                    {row.items.map((item) => (
                        <UserIconCellItem
                            key={item.name}
                            entry={item}
                            onSelect={onSelect}
                            onDelete={onDeleteUserIcon}
                            isSelected={selectedIcon === item.name}
                        />
                    ))}
                </Box>
            )}
        </div>
    );
}

interface IconPickerModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (iconName: string) => void;
    currentIcon?: string;
}

export default function IconPickerModal({ open, onClose, onSelect, currentIcon = "" }: IconPickerModalProps) {
    const theme = useTheme();
    const { lang } = useLanguage();
    const [search, setSearch] = useState("");
    const muiModule = useMuiIconsModule();
    const dialogContentRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<VariableSizeList>(null);
    const [listHeight, setListHeight] = useState(400);

    const [userIcons, setUserIcons] = useState<UserIconEntry[]>([]);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [initScrollbars] = useOverlayScrollbars({ options: { scrollbars: { autoHide: "move" } } });
    const initScrollbarsRef = useRef(initScrollbars);
    useEffect(() => { initScrollbarsRef.current = initScrollbars; }, [initScrollbars]);
    const outerRefCallback = useCallback((el: HTMLDivElement | null) => {
        if (el) initScrollbarsRef.current({ target: el, elements: { viewport: el } });
    }, []);

    const loadUserIcons = useCallback(async () => {
        try {
            const res = await fetch("/api/user-icons");
            if (res.ok) setUserIcons(await res.json());
        } catch { /* ignore */ }
    }, []);

    useEffect(() => {
        if (open) {
            setSearch("");
            setUploadError(null);
            preloadMuiIcons();
            loadUserIcons();
        }
    }, [open, loadUserIcons]);

    useEffect(() => {
        if (!open) return;
        let ro: ResizeObserver | null = null;
        const rafId = requestAnimationFrame(() => {
            const el = dialogContentRef.current;
            if (!el) return;
            ro = new ResizeObserver((entries) => {
                setListHeight(entries[0].contentRect.height);
            });
            ro.observe(el);
        });
        return () => {
            cancelAnimationFrame(rafId);
            ro?.disconnect();
        };
    }, [open]);

    const filteredCustom = useMemo(() => {
        if (!search) return CUSTOM_NAMES;
        const q = search.toLowerCase();
        return CUSTOM_NAMES.filter((n) => n.toLowerCase().includes(q));
    }, [search]);

    const filteredMui = useMemo(() => {
        if (!search) return muiIconNames;
        const q = search.toLowerCase();
        return muiIconNames.filter((n) => n.toLowerCase().includes(q));
    }, [search]);

    const filteredUserIcons = useMemo(() => {
        if (!search) return userIcons;
        const q = search.toLowerCase();
        return userIcons.filter((i) => i.name.toLowerCase().includes(q));
    }, [search, userIcons]);

    const handleSelect = useCallback(
        (name: string) => {
            onSelect(name);
            onClose();
        },
        [onSelect, onClose]
    );

    const handleUpload = useCallback(
        async (file: File) => {
            setUploadError(null);
            try {
                const rawSvg = await file.text();
                const baseName = search.trim() || file.name.replace(/\.svg$/i, "").replace(/[^a-zA-Z0-9_-]/g, "_");
                const res = await fetch("/api/user-icons", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: baseName, svg: rawSvg }),
                });
                if (res.ok) {
                    await loadUserIcons();
                } else {
                    const body = await res.json().catch(() => ({}));
                    setUploadError(body.error ?? "Upload failed");
                }
            } catch {
                setUploadError("Upload failed");
            }
        },
        [search, loadUserIcons]
    );

    const handleDeleteUserIcon = useCallback(
        async (name: string) => {
            const res = await fetch(`/api/user-icons/${encodeURIComponent(name)}`, { method: "DELETE" });
            if (res.ok) setUserIcons((prev) => prev.filter((i) => i.name !== name));
        },
        []
    );

    const rows = useMemo<VRow[]>(() => {
        const result: VRow[] = [];
        const hasCustom = filteredCustom.length > 0;
        const hasMui = filteredMui.length > 0;
        const hasUser = filteredUserIcons.length > 0;

        if (hasUser) {
            result.push({ type: "label", text: `${__("My icons", lang)} (${filteredUserIcons.length})` });
            for (let i = 0; i < filteredUserIcons.length; i += COLUMN_COUNT)
                result.push({ type: "user-icons", items: filteredUserIcons.slice(i, i + COLUMN_COUNT) });
            if (hasCustom || !muiModule || hasMui)
                result.push({ type: "divider" });
        }

        if (hasCustom) {
            result.push({ type: "label", text: `${__("Custom icons", lang)} (${filteredCustom.length})` });
            for (let i = 0; i < filteredCustom.length; i += COLUMN_COUNT)
                result.push({ type: "icons", icons: filteredCustom.slice(i, i + COLUMN_COUNT), isCustom: true });
        }

        if (hasCustom && (hasMui || !muiModule))
            result.push({ type: "divider" });

        if (!muiModule) {
            result.push({ type: "loading" });
        } else if (hasMui) {
            result.push({ type: "label", text: `${__("MUI icons", lang)} (${filteredMui.length})` });
            for (let i = 0; i < filteredMui.length; i += COLUMN_COUNT)
                result.push({ type: "icons", icons: filteredMui.slice(i, i + COLUMN_COUNT), isCustom: false });
        } else if (!hasCustom && !hasUser) {
            result.push({ type: "empty", search });
        }

        return result;
    }, [filteredCustom, filteredMui, filteredUserIcons, muiModule, search, lang]);

    // Reset list cache when rows change (variable sizes)
    useEffect(() => {
        listRef.current?.resetAfterIndex(0);
    }, [rows]);

    const rowData: RowData = useMemo(
        () => ({ rows, muiModule, onSelect: handleSelect, selectedIcon: currentIcon, onDeleteUserIcon: handleDeleteUserIcon }),
        [rows, muiModule, handleSelect, currentIcon, handleDeleteUserIcon]
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: DIALOG_WIDTH,
                    maxWidth: "none",
                    height: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    background: getThemeColor("layoutBackground", theme),
                    "& .os-scrollbar": {
                        "--os-handle-bg": getThemeColor("scrollbarHandle", theme),
                        "--os-handle-bg-hover": getThemeColor("scrollbarHoverHandle", theme),
                        "--os-handle-bg-active": getThemeColor("scrollbarHoverHandle", theme),
                        "--os-size": "6.5px",
                        "--os-padding-perpendicular": "2px",
                    },
                    "& .os-scrollbar.os-scrollbar-vertical, & .os-scrollbar.os-scrollbar-vertical.os-scrollbar-cornerless": {
                        top: "4px",
                        right: "4px",
                        bottom: "4px",
                    },
                    "& .os-scrollbar-vertical .os-scrollbar-handle:before": {
                        left: "-2px",
                        right: "-3px",
                    },
                },
            }}
        >
            <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, pb: 1 }}>
                <Typography variant="h6" sx={{ flex: 1 }}>
                    {__("Select icon", lang)}
                </Typography>
                <IconButton size="small" onClick={onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <Box sx={{ px: 3, pb: 1, display: "flex", gap: 1, alignItems: "center" }}>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".svg"
                    style={{ display: "none" }}
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = ""; }}
                />
                <TextField
                    fullWidth
                    size="small"
                    placeholder={__("Search icons...", lang)}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                        endAdornment: search ? (
                            <InputAdornment position="end">
                                <IconButton size="small" onClick={() => setSearch("")}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ) : undefined,
                    }}
                    autoFocus
                />
                <Tooltip title={__("Upload SVG icon", lang)}>
                    <IconButton size="small" onClick={() => fileInputRef.current?.click()}>
                        <FileUploadIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>

            {uploadError && (
                <Alert severity="error" onClose={() => setUploadError(null)} sx={{ mx: 3, mb: 1 }}>
                    {uploadError}
                </Alert>
            )}

            <DialogContent
                ref={dialogContentRef}
                sx={{
                    flex: 1,
                    overflow: "hidden",
                    px: 2,
                    pt: 0,
                    pb: 2,
                }}
            >
                <VariableSizeList
                        ref={listRef}
                        outerRef={outerRefCallback}
                        height={listHeight}
                        width={COLUMN_COUNT * CELL_SIZE}
                        itemCount={rows.length}
                        itemSize={(i) => rowHeight(rows[i])}
                        itemData={rowData}
                        overscanCount={5}
                        style={{ overflowX: "hidden" }}
                    >
                        {VirtualRow}
                    </VariableSizeList>
            </DialogContent>
        </Dialog>
    );
}
