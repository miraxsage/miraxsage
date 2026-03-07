"use client";
import { createContext, useContext } from "react";
import { useAppearance } from "@/shared/lib/store/appearanceSlice";
import { capitalize } from "@/shared/lib/string";
import categories, { type AboutCategoriesInterface } from "./categories";

export interface CategoryLabelEntry {
    label_en: string;
    label_ru: string;
    sort_order: number;
    icon?: string;
    icon_svg?: string;
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

function filterCategoriesByVisibility(cats: AboutCategoriesInterface, visibleSlugs: Set<string>, labels: CategoryLabelsMap): AboutCategoriesInterface {
    const result: AboutCategoriesInterface = {};
    const sorted = Object.entries(cats).sort(([a], [b]) => {
        const orderA = labels[a]?.sort_order ?? Infinity;
        const orderB = labels[b]?.sort_order ?? Infinity;
        return orderA - orderB;
    });
    for (const [slug, cat] of sorted) {
        if (!visibleSlugs.has(slug)) continue;
        result[slug] = cat.items
            ? { ...cat, items: filterCategoriesByVisibility(cat.items, visibleSlugs, labels) }
            : cat;
    }
    return result;
}

export function useVisibleCategories(): AboutCategoriesInterface {
    const labels = useContext(CategoryLabelsContext);
    const visibleSlugs = new Set(Object.keys(labels));
    return filterCategoriesByVisibility(categories, visibleSlugs, labels);
}
