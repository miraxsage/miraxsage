"use client";
import { useState, useEffect } from "react";

type MuiModule = Record<string, React.ComponentType<{ fontSize?: string }>>;
let _muiModule: MuiModule | null = null;
let _muiPromise: Promise<MuiModule> | null = null;
const _muiListeners: Array<() => void> = [];

export function preloadMuiIcons() {
    if (_muiModule || _muiPromise) return;
    _muiPromise = import("@mui/icons-material").then((mod) => {
        _muiModule = mod as unknown as MuiModule;
        _muiListeners.forEach((cb) => cb());
        _muiListeners.length = 0;
        return _muiModule;
    });
}

export function getMuiIcon(name: string): React.ComponentType<{ fontSize?: string }> | null {
    return _muiModule?.[name] ?? null;
}

export function getMuiModule(): MuiModule | null {
    return _muiModule;
}

export function addMuiListener(cb: () => void) {
    _muiListeners.push(cb);
}

export function removeMuiListener(cb: () => void) {
    const idx = _muiListeners.indexOf(cb);
    if (idx !== -1) _muiListeners.splice(idx, 1);
}

export function useMuiIconsModule(): MuiModule | null {
    const [module, setModule] = useState<MuiModule | null>(() => _muiModule);
    useEffect(() => {
        if (_muiModule) {
            setModule(_muiModule);
            return;
        }
        const cb = () => setModule(_muiModule);
        _muiListeners.push(cb);
        preloadMuiIcons();
        return () => {
            const idx = _muiListeners.indexOf(cb);
            if (idx !== -1) _muiListeners.splice(idx, 1);
        };
    }, []);
    return module;
}
