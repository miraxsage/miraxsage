import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { jsonResponse, errorResponse, successResponse } from "@/shared/api/response";
import { invalidateIconCache } from "@/shared/lib/resolveIconSvg";

const SECTION_TABLES: Record<string, string> = {
    categories: "resume_categories",
    general_data: "resume_general_data",
    education_items: "resume_education_items",
    education_data: "resume_education_data",
    labor_items: "resume_labor_items",
    labor_data: "resume_labor_data",
    questionnaire_items: "resume_questionnaire_items",
    achievements: "resume_achievements",
    soft_skills: "resume_soft_skills",
    metrics: "resume_metrics",
    experience_projects: "resume_experience_projects",
    technology_categories: "technology_categories",
    technologies: "technologies",
    code_snippets: "code_snippets",
};

export async function GET() {
    try {
        const db = getDb();

        const categories = db
            .prepare("SELECT * FROM resume_categories ORDER BY sort_order")
            .all();
        const general_data = db
            .prepare("SELECT * FROM resume_general_data ORDER BY sort_order")
            .all();
        const education_items = db
            .prepare("SELECT * FROM resume_education_items ORDER BY sort_order")
            .all();
        const education_data = db
            .prepare("SELECT * FROM resume_education_data ORDER BY sort_order")
            .all();
        const labor_items = db
            .prepare("SELECT * FROM resume_labor_items ORDER BY sort_order")
            .all();
        const labor_data = db
            .prepare("SELECT * FROM resume_labor_data ORDER BY sort_order")
            .all();
        const questionnaire_items = db
            .prepare("SELECT * FROM resume_questionnaire_items ORDER BY sort_order")
            .all();
        const achievements = db
            .prepare("SELECT * FROM resume_achievements ORDER BY sort_order")
            .all();
        const soft_skills = db.prepare("SELECT * FROM resume_soft_skills ORDER BY sort_order").all();
        const metrics = db.prepare("SELECT * FROM resume_metrics").all();
        const experience_projects = db.prepare("SELECT * FROM resume_experience_projects LIMIT 1").all();
        const technology_categories = db.prepare("SELECT * FROM technology_categories ORDER BY sort_order").all();
        const technologies = db.prepare("SELECT * FROM technologies ORDER BY sort_order").all();
        const code_snippets = db.prepare("SELECT * FROM code_snippets ORDER BY sort_order").all();

        return jsonResponse({
            categories,
            general_data,
            education_items,
            education_data,
            labor_items,
            labor_data,
            questionnaire_items,
            achievements,
            soft_skills,
            metrics,
            experience_projects,
            technology_categories,
            technologies,
            code_snippets,
        });
    } catch (error) {
        console.error("Resume GET error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function PUT(request: NextRequest) {
    try {
        await requireAuth(request);

        const { section, data } = await request.json();

        if (!section || !data) {
            return errorResponse("Section and data are required");
        }

        const tableName = SECTION_TABLES[section];
        if (!tableName) {
            return errorResponse(
                `Invalid section. Valid sections: ${Object.keys(SECTION_TABLES).join(", ")}`,
            );
        }

        const db = getDb();
        const items = Array.isArray(data) ? data : [data];

        // Sections that are FK parents: use UPSERT to avoid cascading child deletions
        const FK_PARENT_SECTIONS = new Set(["categories", "technology_categories", "education_items", "labor_items"]);

        const transaction = db.transaction(() => {
            if (FK_PARENT_SECTIONS.has(section)) {
                // UPSERT: update existing rows, insert new ones, delete removed ones
                const existingIds = new Set(
                    (db.prepare(`SELECT id FROM ${tableName}`).all() as { id: number }[]).map((r) => r.id)
                );
                const incomingIds = new Set(items.map((i) => Number(i.id)).filter(Boolean));

                // Delete rows no longer in the list
                for (const id of existingIds) {
                    if (!incomingIds.has(id)) db.prepare(`DELETE FROM ${tableName} WHERE id = ?`).run(id);
                }

                if (items.length === 0) return;
                const columns = Object.keys(items[0]);
                const nonIdCols = columns.filter((c) => c !== "id");

                for (const item of items) {
                    if (existingIds.has(Number(item.id))) {
                        const setClauses = nonIdCols.map((c) => `${c} = ?`).join(", ");
                        db.prepare(`UPDATE ${tableName} SET ${setClauses} WHERE id = ?`).run(
                            ...nonIdCols.map((col) => item[col] ?? null),
                            item.id
                        );
                    } else {
                        const placeholders = columns.map(() => "?").join(", ");
                        db.prepare(`INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${placeholders})`).run(
                            ...columns.map((col) => item[col] ?? null)
                        );
                    }
                }
            } else {
                // Standard DELETE+INSERT for sections without FK-dependent children
                db.prepare(`DELETE FROM ${tableName}`).run();

                if (items.length === 0) return;

                const columns = Object.keys(items[0]);
                const placeholders = columns.map(() => "?").join(", ");
                const stmt = db.prepare(
                    `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${placeholders})`,
                );
                for (const item of items) {
                    stmt.run(...columns.map((col) => item[col] ?? null));
                }
            }
        });

        transaction();

        // Invalidate icon cache for any sections that have icons
        const ICON_SECTIONS = ["categories", "education_items", "labor_items", "questionnaire_items", "technology_categories", "technologies"];
        if (ICON_SECTIONS.includes(section)) {
            for (const item of items) {
                if (item.icon) invalidateIconCache(item.icon);
            }
        }

        revalidatePath("/", "layout");

        return successResponse(`Section "${section}" updated successfully`);
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Resume PUT error:", error);
        return errorResponse("Internal server error", 500);
    }
}
