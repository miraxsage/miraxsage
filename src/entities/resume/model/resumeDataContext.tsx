"use client";
import { createContext, useContext } from "react";

export type EducationItem = {
    id: number;
    sort_order: number;
    label_en: string;
    label_ru: string;
    icon: string | null;
    parent_id: number | null;
};

export type EducationDataRow = {
    id: number;
    education_item_id: number;
    sort_order: number;
    field_key: string;
    label_en: string;
    label_ru: string;
    value_en: string;
    value_ru: string;
};

export type LaborItem = {
    id: number;
    sort_order: number;
    label_en: string;
    label_ru: string;
    icon: string | null;
    parent_id: number | null;
};

export type LaborDataRow = {
    id: number;
    labor_item_id: number;
    sort_order: number;
    field_key: string;
    label_en: string;
    label_ru: string;
    value_en: string;
    value_ru: string;
};

export type GeneralDataRow = {
    id: number;
    sort_order: number;
    field_key: string;
    label_en: string;
    label_ru: string;
    value_en: string;
    value_ru: string;
    value_format: string | null;
};

export type SoftSkillRow = {
    id: number;
    slug: string;
    label_en: string;
    label_ru: string;
    description_en: string;
    description_ru: string;
    icon: string;
    level_values: string;
};

export type ResumeData = {
    generalData: GeneralDataRow[];
    educationItems: EducationItem[];
    educationData: EducationDataRow[];
    laborItems: LaborItem[];
    laborData: LaborDataRow[];
    softSkills: SoftSkillRow[];
};

export const ResumeDataContext = createContext<ResumeData>({
    generalData: [],
    educationItems: [],
    educationData: [],
    laborItems: [],
    laborData: [],
    softSkills: [],
});

export function useResumeData(): ResumeData {
    return useContext(ResumeDataContext);
}
