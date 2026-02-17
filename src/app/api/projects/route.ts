import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { jsonResponse, errorResponse } from "@/shared/api/response";

export async function GET() {
    try {
        const db = getDb();

        const projects = db
            .prepare("SELECT * FROM projects ORDER BY sort_order")
            .all() as Array<Record<string, unknown>>;

        const projectTechnologies = db
            .prepare(
                `SELECT pt.project_id, t.*
                 FROM project_technologies pt
                 JOIN technologies t ON t.id = pt.technology_id`,
            )
            .all() as Array<Record<string, unknown>>;

        const techByProject = new Map<number, Array<Record<string, unknown>>>();
        for (const row of projectTechnologies) {
            const projectId = row.project_id as number;
            if (!techByProject.has(projectId)) {
                techByProject.set(projectId, []);
            }
            const { project_id: _, ...tech } = row;
            techByProject.get(projectId)!.push(tech);
        }

        const result = projects.map((project) => ({
            ...project,
            technologies: techByProject.get(project.id as number) || [],
        }));

        return jsonResponse(result);
    } catch (error) {
        console.error("Projects GET error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function POST(request: NextRequest) {
    try {
        await requireAuth(request);

        const body = await request.json();
        const { technology_ids, ...projectFields } = body;

        if (!projectFields.slug || !projectFields.name_en || !projectFields.name_ru) {
            return errorResponse("slug, name_en, and name_ru are required");
        }

        const db = getDb();

        const columns = Object.keys(projectFields);
        const placeholders = columns.map(() => "?").join(", ");
        const values = columns.map((col) => projectFields[col] ?? null);

        const result = db.transaction(() => {
            const info = db
                .prepare(
                    `INSERT INTO projects (${columns.join(", ")}) VALUES (${placeholders})`,
                )
                .run(...values);

            const projectId = info.lastInsertRowid;

            if (Array.isArray(technology_ids) && technology_ids.length > 0) {
                const insertTech = db.prepare(
                    "INSERT INTO project_technologies (project_id, technology_id) VALUES (?, ?)",
                );
                for (const techId of technology_ids) {
                    insertTech.run(projectId, techId);
                }
            }

            return projectId;
        })();

        const project = db
            .prepare("SELECT * FROM projects WHERE id = ?")
            .get(result);

        revalidatePath("/projects", "layout");

        return jsonResponse(project, 201);
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Projects POST error:", error);
        return errorResponse("Internal server error", 500);
    }
}
