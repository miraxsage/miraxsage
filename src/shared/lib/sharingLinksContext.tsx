"use client";
import { createContext, useContext } from "react";

export interface SharingLink {
    id: number;
    sort_order: number;
    type: string;
    title_en: string;
    title_ru: string;
    icon: string;
    icon_svg?: string;
    is_visible: number;
}

export const SharingLinksContext = createContext<SharingLink[]>([]);
export const useSharingLinks = () => useContext(SharingLinksContext);
