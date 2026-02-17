import { getDb } from "@/db";

export interface TechnologyCategoryData {
    id: number;
    slug: string;
    sort_order: number;
    label_en: string;
    label_ru: string;
    technologies: Array<{
        id: number;
        category_id: number;
        name: string;
        docs_link: string;
        icon: string;
        skill_level: number;
        experience_years: number;
        projects_count: number;
        color: string;
        sort_order: number;
    }>;
}

export function getTechnologies(): TechnologyCategoryData[] {
    const db = getDb();

    const categories = db
        .prepare("SELECT * FROM technology_categories ORDER BY sort_order")
        .all() as Array<Record<string, unknown>>;

    const technologies = db
        .prepare("SELECT * FROM technologies ORDER BY sort_order")
        .all() as Array<Record<string, unknown>>;

    const techByCategory = new Map<number, Array<Record<string, unknown>>>();
    for (const tech of technologies) {
        const catId = tech.category_id as number;
        if (!techByCategory.has(catId)) techByCategory.set(catId, []);
        techByCategory.get(catId)!.push(tech);
    }

    return categories.map((cat) => ({
        ...(cat as unknown as Omit<TechnologyCategoryData, "technologies">),
        technologies: (techByCategory.get(cat.id as number) || []) as TechnologyCategoryData["technologies"],
    }));
}
