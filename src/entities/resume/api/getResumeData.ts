import { getDb } from "@/db";

export interface ResumeData {
    categories: Array<Record<string, unknown>>;
    general_data: Array<Record<string, unknown>>;
    education_items: Array<Record<string, unknown>>;
    education_data: Array<Record<string, unknown>>;
    labor_items: Array<Record<string, unknown>>;
    labor_data: Array<Record<string, unknown>>;
    questionnaire_items: Array<Record<string, unknown>>;
    achievements: Array<Record<string, unknown>>;
    soft_skills: Array<Record<string, unknown>>;
    metrics: Array<Record<string, unknown>>;
}

export function getResumeData(): ResumeData {
    const db = getDb();
    return {
        categories: db.prepare("SELECT * FROM resume_categories ORDER BY sort_order").all() as Array<Record<string, unknown>>,
        general_data: db.prepare("SELECT * FROM resume_general_data ORDER BY sort_order").all() as Array<Record<string, unknown>>,
        education_items: db.prepare("SELECT * FROM resume_education_items ORDER BY sort_order").all() as Array<Record<string, unknown>>,
        education_data: db.prepare("SELECT * FROM resume_education_data ORDER BY sort_order").all() as Array<Record<string, unknown>>,
        labor_items: db.prepare("SELECT * FROM resume_labor_items ORDER BY sort_order").all() as Array<Record<string, unknown>>,
        labor_data: db.prepare("SELECT * FROM resume_labor_data ORDER BY sort_order").all() as Array<Record<string, unknown>>,
        questionnaire_items: db.prepare("SELECT * FROM resume_questionnaire_items ORDER BY sort_order").all() as Array<Record<string, unknown>>,
        achievements: db.prepare("SELECT * FROM resume_achievements ORDER BY sort_order").all() as Array<Record<string, unknown>>,
        soft_skills: db.prepare("SELECT * FROM resume_soft_skills").all() as Array<Record<string, unknown>>,
        metrics: db.prepare("SELECT * FROM resume_metrics").all() as Array<Record<string, unknown>>,
    };
}
