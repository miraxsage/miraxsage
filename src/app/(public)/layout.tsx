export const dynamic = "force-dynamic";

import { getDb } from "@/db";
import MainLayout from "@/widgets/layout/MainLayout";
import type { HeaderItem } from "@/widgets/layout/TopMenu";
import type { CategoryLabelEntry } from "@/entities/resume/model/categoryLabels";
import type { UiLabelsMap } from "@/entities/ui-labels/model/uiLabelsContext";
import type { ResumeData } from "@/entities/resume/model/resumeDataContext";
import type { ContactItem } from "@/widgets/landing/MainSlide";
import { resolveIconSvg } from "@/shared/lib/resolveIconSvg";

function getHeaderItems(): HeaderItem[] {
    const db = getDb();
    const rows = db.prepare("SELECT * FROM landing_header_items WHERE is_visible = 1 ORDER BY sort_order").all() as HeaderItem[];
    return rows.map((item) => ({ ...item, icon_svg: resolveIconSvg(item.icon) }));
}

function getCategoryLabels(): Record<string, CategoryLabelEntry> {
    const db = getDb();
    const rows = db.prepare("SELECT slug, label_en, label_ru, sort_order, icon FROM resume_categories WHERE is_visible = 1").all() as Array<{
        slug: string;
        label_en: string;
        label_ru: string;
        sort_order: number;
        icon: string | null;
    }>;
    const map: Record<string, CategoryLabelEntry> = {};
    for (const row of rows) {
        const icon = row.icon ?? undefined;
        map[row.slug] = { label_en: row.label_en, label_ru: row.label_ru, sort_order: row.sort_order, icon, icon_svg: resolveIconSvg(icon) };
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
    const generalData = db.prepare("SELECT * FROM resume_general_data ORDER BY sort_order").all() as ResumeData["generalData"];
    const educationItems = (db.prepare("SELECT * FROM resume_education_items ORDER BY sort_order").all() as ResumeData["educationItems"])
        .map((item) => ({ ...item, icon_svg: resolveIconSvg(item.icon) }));
    const educationData = db.prepare("SELECT * FROM resume_education_data ORDER BY sort_order").all() as ResumeData["educationData"];
    const laborItems = (db.prepare("SELECT * FROM resume_labor_items ORDER BY sort_order").all() as ResumeData["laborItems"])
        .map((item) => ({ ...item, icon_svg: resolveIconSvg(item.icon) }));
    const laborData = db.prepare("SELECT * FROM resume_labor_data ORDER BY sort_order").all() as ResumeData["laborData"];
    const softSkills = db.prepare("SELECT * FROM resume_soft_skills").all() as ResumeData["softSkills"];
    const questionnaireItems = (db.prepare("SELECT * FROM resume_questionnaire_items ORDER BY sort_order").all() as ResumeData["questionnaireItems"])
        .map((item) => ({ ...item, icon_svg: resolveIconSvg(item.icon) }));
    const achievements = db.prepare("SELECT * FROM resume_achievements ORDER BY sort_order").all() as ResumeData["achievements"];
    const metrics = db.prepare("SELECT id, text FROM resume_metrics LIMIT 1").all() as ResumeData["metrics"];
    return { generalData, educationItems, educationData, laborItems, laborData, softSkills, questionnaireItems, achievements, metrics };
}

function getContacts(): ContactItem[] {
    const db = getDb();
    const rows = db.prepare("SELECT * FROM contact_info WHERE is_visible = 1 ORDER BY sort_order").all() as ContactItem[];
    return rows.map((c) => ({ ...c, icon_svg: resolveIconSvg(c.icon) }));
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const headerItems = getHeaderItems();
    const categoryLabels = getCategoryLabels();
    const uiLabels = getUiLabels();
    const resumeData = getResumeData();
    const contacts = getContacts();
    return <MainLayout headerItems={headerItems} categoryLabels={categoryLabels} uiLabels={uiLabels} resumeData={resumeData} contacts={contacts}>{children}</MainLayout>;
}
