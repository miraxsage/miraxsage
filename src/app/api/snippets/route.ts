import { getDb } from "@/db";
import { jsonResponse, errorResponse } from "@/shared/api/response";

interface SnippetRow {
    id: number;
    technology_id: number;
    language: string;
    sort_order: number;
    code: string;
    tech_name_en: string;
    tech_name_ru: string;
    tech_icon: string;
    category_id: number;
    category_slug: string;
    category_icon: string;
    category_label_en: string;
    category_label_ru: string;
    category_sort_order: number;
}

export async function GET() {
    try {
        const db = getDb();

        const rows = db.prepare(`
            SELECT
                cs.id,
                cs.technology_id,
                cs.language,
                cs.sort_order,
                cs.code,
                t.name_en AS tech_name_en,
                t.name_ru AS tech_name_ru,
                t.icon AS tech_icon,
                tc.id AS category_id,
                tc.slug AS category_slug,
                tc.icon AS category_icon,
                tc.label_en AS category_label_en,
                tc.label_ru AS category_label_ru,
                tc.sort_order AS category_sort_order
            FROM code_snippets cs
            JOIN technologies t ON t.id = cs.technology_id
            JOIN technology_categories tc ON tc.id = t.category_id
            ORDER BY tc.sort_order, cs.sort_order
        `).all() as SnippetRow[];

        const categoryMap = new Map<number, {
            id: number;
            slug: string;
            icon: string;
            label_en: string;
            label_ru: string;
            sort_order: number;
            snippets: Array<{
                id: number;
                technology_id: number;
                tech_name_en: string;
                tech_name_ru: string;
                tech_icon: string;
                language: string;
                sort_order: number;
                code: string;
            }>;
        }>();

        for (const row of rows) {
            if (!categoryMap.has(row.category_id)) {
                categoryMap.set(row.category_id, {
                    id: row.category_id,
                    slug: row.category_slug,
                    icon: row.category_icon,
                    label_en: row.category_label_en,
                    label_ru: row.category_label_ru,
                    sort_order: row.category_sort_order,
                    snippets: [],
                });
            }
            categoryMap.get(row.category_id)!.snippets.push({
                id: row.id,
                technology_id: row.technology_id,
                tech_name_en: row.tech_name_en,
                tech_name_ru: row.tech_name_ru,
                tech_icon: row.tech_icon,
                language: row.language,
                sort_order: row.sort_order,
                code: row.code,
            });
        }

        const categories = [...categoryMap.values()].sort((a, b) => a.sort_order - b.sort_order);

        return jsonResponse(categories);
    } catch (error) {
        console.error("Snippets GET error:", error);
        return errorResponse("Internal server error", 500);
    }
}
