import { getDb } from "@/db";
import MainLayout from "@/widgets/layout/MainLayout";
import type { HeaderItem } from "@/widgets/layout/TopMenu";
import type { CategoryLabelEntry } from "@/entities/resume/model/categoryLabels";
import type { UiLabelsMap } from "@/entities/ui-labels/model/uiLabelsContext";
import type { ResumeData } from "@/entities/resume/model/resumeDataContext";

function getHeaderItems(): HeaderItem[] {
    const db = getDb();
    return db.prepare("SELECT * FROM landing_header_items WHERE is_visible = 1 ORDER BY sort_order").all() as HeaderItem[];
}

function getCategoryLabels(): Record<string, CategoryLabelEntry> {
    const db = getDb();
    const rows = db.prepare("SELECT slug, label_en, label_ru FROM resume_categories").all() as Array<{
        slug: string;
        label_en: string;
        label_ru: string;
    }>;
    const map: Record<string, CategoryLabelEntry> = {};
    for (const row of rows) {
        map[row.slug] = { label_en: row.label_en, label_ru: row.label_ru };
    }
    return map;
}

function getUiLabels(): UiLabelsMap {
    const db = getDb();
    const rows = db.prepare("SELECT key, value_en, value_ru FROM ui_labels").all() as Array<{
        key: string;
        value_en: string;
        value_ru: string;
    }>;
    const map: UiLabelsMap = {};
    for (const row of rows) {
        map[row.key] = { value_en: row.value_en, value_ru: row.value_ru };
    }
    return map;
}

function getResumeData(): ResumeData {
    const db = getDb();
    const educationItems = db.prepare("SELECT * FROM resume_education_items ORDER BY sort_order").all() as ResumeData["educationItems"];
    const educationData = db.prepare("SELECT * FROM resume_education_data ORDER BY sort_order").all() as ResumeData["educationData"];
    const laborItems = db.prepare("SELECT * FROM resume_labor_items ORDER BY sort_order").all() as ResumeData["laborItems"];
    const laborData = db.prepare("SELECT * FROM resume_labor_data ORDER BY sort_order").all() as ResumeData["laborData"];
    const softSkills = db.prepare("SELECT * FROM resume_soft_skills").all() as ResumeData["softSkills"];
    return { educationItems, educationData, laborItems, laborData, softSkills };
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const headerItems = getHeaderItems();
    const categoryLabels = getCategoryLabels();
    const uiLabels = getUiLabels();
    const resumeData = getResumeData();
    return <MainLayout headerItems={headerItems} categoryLabels={categoryLabels} uiLabels={uiLabels} resumeData={resumeData}>{children}</MainLayout>;
}
