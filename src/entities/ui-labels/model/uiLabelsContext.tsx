"use client";
import { createContext, useContext } from "react";
import { useAppearance } from "@/shared/lib/store/appearanceSlice";
import __ from "@/shared/lib/i18n/translation";

export interface UiLabelEntry {
    value_en: string;
    value_ru: string;
}

export type UiLabelsMap = Record<string, UiLabelEntry>;

export const UiLabelsContext = createContext<UiLabelsMap>({});

export function useUiLabel(key: string): string {
    const labels = useContext(UiLabelsContext);
    const lang = useAppearance().language;
    const entry = labels[key];
    if (!entry) return __(key);
    return lang === "en" ? entry.value_en : entry.value_ru;
}

export function useUiLabels(): (key: string) => string {
    const labels = useContext(UiLabelsContext);
    const lang = useAppearance().language;
    return (key: string) => {
        const entry = labels[key];
        if (!entry) return __(key);
        return lang === "en" ? entry.value_en : entry.value_ru;
    };
}
