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

export type MetricRow = {
    id: number;
    text: string;
};

export type ExperienceProjectRow = {
    id: number;
    text_en: string;
    text_ru: string;
};

export type AchievementRow = {
    id: number;
    sort_order: number;
    content_en: string;
    content_ru: string;
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

export type TechnologyCategory = {
    id: number;
    slug: string;
    sort_order: number;
    icon: string | null;
    icon_svg?: string;
    label_en: string;
    label_ru: string;
    description_en: string;
    description_ru: string;
};

export type TechnologyRow = {
    id: number;
    category_id: number;
    sort_order: number;
    name_en: string;
    name_ru: string;
    docs_link: string | null;
    icon: string | null;
    icon_svg?: string;
    skill_level: number;
    experience_years: number;
    projects_count: number;
};

export type ResumeData = {
    generalData: GeneralDataRow[];
    educationItems: EducationItem[];
    educationData: EducationDataRow[];
    laborItems: LaborItem[];
    laborData: LaborDataRow[];
    softSkills: SoftSkillRow[];
    questionnaireItems: QuestionnaireItem[];
    achievements: AchievementRow[];
    metrics: MetricRow[];
    experienceProjects: ExperienceProjectRow[];
    technologyCategories: TechnologyCategory[];
    technologies: TechnologyRow[];
};

export const ResumeDataContext = createContext<ResumeData>({
    generalData: [],
    educationItems: [],
    educationData: [],
    laborItems: [],
    laborData: [],
    softSkills: [],
    questionnaireItems: [],
    achievements: [],
    metrics: [],
    experienceProjects: [],
    technologyCategories: [],
    technologies: [],
});

export function useResumeData(): ResumeData {
    return useContext(ResumeDataContext);
}
