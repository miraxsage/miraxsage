"use client";
import { createContext, useContext } from "react";

export type EducationItem = {
    id: number;
    sort_order: number;
    label_en: string;
    label_ru: string;
    icon: string | null;
    icon_svg?: string;
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
    is_full_line: number;
};

export type LaborItem = {
    id: number;
    sort_order: number;
    label_en: string;
    label_ru: string;
    icon: string | null;
    icon_svg?: string;
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
    is_full_line: number;
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

export type QuestionnaireItem = {
    id: number;
    sort_order: number;
    question_en: string;
    question_ru: string;
    answer_en: string;
    answer_ru: string;
    icon: string | null;
    icon_svg?: string;
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
    questionnaireItems: QuestionnaireItem[];
};

export const ResumeDataContext = createContext<ResumeData>({
    generalData: [],
    educationItems: [],
    educationData: [],
    laborItems: [],
    laborData: [],
    softSkills: [],
    questionnaireItems: [],
});

export function useResumeData(): ResumeData {
    return useContext(ResumeDataContext);
}
