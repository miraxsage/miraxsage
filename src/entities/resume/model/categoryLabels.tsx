"use client";
import { createContext, useContext } from "react";
import { useAppearance } from "@/shared/lib/store/appearanceSlice";
import { capitalize } from "@/shared/lib/string";

export interface CategoryLabelEntry {
    label_en: string;
    label_ru: string;
}

export type CategoryLabelsMap = Record<string, CategoryLabelEntry>;

export const CategoryLabelsContext = createContext<CategoryLabelsMap>({});

export function useCatLabel(slug: string): string {
    const labels = useContext(CategoryLabelsContext);
    const lang = useAppearance().language;
    const entry = labels[slug];
    if (!entry) return capitalize(slug);
    return lang === "en" ? entry.label_en : entry.label_ru;
}
