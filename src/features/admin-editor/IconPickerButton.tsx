"use client";
import { useEffect, useState } from "react";
import { IconButton, Tooltip, Box } from "@mui/material";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import iconMap from "@/shared/lib/iconMap";
import { ICON_MAP } from "@/entities/resume/model/iconMap";
import { preloadMuiIcons, getMuiIcon, getMuiModule, addMuiListener, removeMuiListener } from "./IconPickerModal";
import IconPickerModal from "./IconPickerModal";

const ALL_CUSTOM_ICONS: Record<string, React.FC> = { ...iconMap, ...ICON_MAP };

// Module-level cache shared across all IconPickerButton instances
let userIconsMap: Record<string, string> = {};
let userIconsLoaded = false;
const userIconsSubscribers = new Set<() => void>();

function fetchUserIcons() {
    userIconsLoaded = false;
    fetch("/api/user-icons")
        .then((r) => (r.ok ? r.json() : []))
        .then((icons: { name: string; svg: string }[]) => {
            userIconsMap = Object.fromEntries(icons.map((i) => [i.name, i.svg]));
            userIconsLoaded = true;
            userIconsSubscribers.forEach((cb) => cb());
        })
        .catch(() => {
            userIconsLoaded = true;
        });
}

// Kick off initial load at module load time
fetchUserIcons();

interface IconPickerButtonProps {
    value: string;
    onChange: (iconName: string) => void;
    sx?: object;
}

export default function IconPickerButton({ value, onChange, sx }: IconPickerButtonProps) {
    const [open, setOpen] = useState(false);
    const [muiModuleReady, setMuiModuleReady] = useState(() => getMuiModule() !== null);
    // Tick increments whenever userIconsMap is refreshed, causing re-render
    const [userIconsTick, setUserIconsTick] = useState(0);

    useEffect(() => {
        if (getMuiModule()) { setMuiModuleReady(true); return; }
        const cb = () => setMuiModuleReady(true);
        addMuiListener(cb);
        preloadMuiIcons();
        if (getMuiModule()) { removeMuiListener(cb); setMuiModuleReady(true); }
        return () => removeMuiListener(cb);
    }, []);

    useEffect(() => {
        const cb = () => setUserIconsTick((n) => n + 1);
        userIconsSubscribers.add(cb);
        return () => { userIconsSubscribers.delete(cb); };
    }, []);

    const handleModalClose = () => {
        setOpen(false);
        // Refresh user icons in case something was uploaded
        fetchUserIcons();
    };

    const CustomIcon = value
        ? (ALL_CUSTOM_ICONS[value] as React.ComponentType<{ fontSize?: string }> | undefined)
        : undefined;
    const MuiIcon = !CustomIcon && value && muiModuleReady ? getMuiIcon(value) : null;
    const PreviewIcon = CustomIcon ?? MuiIcon ?? null;
    const userIconSvg = !PreviewIcon && value && userIconsLoaded ? (userIconsMap[value] ?? null) : null;
    // suppress tick warning — used only to trigger re-render
    void userIconsTick;

    return (
        <>
            <Tooltip title={value || "icon"} placement="top">
                <IconButton
                    onClick={() => setOpen(true)}
                    size="small"
                    sx={{ flexShrink: 0, alignSelf: "center", width: 34, height: 34, ...sx }}
                >
                    {PreviewIcon ? (
                        <PreviewIcon fontSize="small" />
                    ) : userIconSvg ? (
                        <Box
                            sx={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}
                            dangerouslySetInnerHTML={{ __html: userIconSvg }}
                        />
                    ) : (
                        <ImageSearchIcon fontSize="small" />
                    )}
                </IconButton>
            </Tooltip>

            <IconPickerModal
                open={open}
                onClose={handleModalClose}
                onSelect={onChange}
                currentIcon={value}
            />
        </>
    );
}
