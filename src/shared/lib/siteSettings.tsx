"use client";

import { createContext, useContext } from "react";

export interface SiteSettings {
    avatar_dark: string | null;
    avatar_light: string | null;
}

export const defaultSiteSettings: SiteSettings = {
    avatar_dark: null,
    avatar_light: null,
};

export const SiteSettingsContext = createContext<SiteSettings>(defaultSiteSettings);

export function useSiteSettings() {
    return useContext(SiteSettingsContext);
}
