import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { jsonResponse, errorResponse, successResponse } from "@/shared/api/response";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;
        const db = getDb();

        const project = db
            .prepare("SELECT * FROM projects WHERE id = ?")
            .get(id) as Record<string, unknown> | undefined;

        if (!project) {
            return errorResponse("Project not found", 404);
        }

        const technologies = db
            .prepare(
                `SELECT t.*
                 FROM project_technologies pt
                 JOIN technologies t ON t.id = pt.technology_id
                 WHERE pt.project_id = ?`,
            )
            .all(id);

        const images = db
            .prepare("SELECT * FROM project_images WHERE project_id = ? ORDER BY sort_order")
            .all(id);

        return jsonResponse({
            ...project,
            technologies,
            images,
        });
    } catch (error) {
        console.error("Project GET error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function PUT(request: NextRequest, context: RouteContext) {
    try {
        await requireAuth(request);

        const { id } = await context.params;
        const body = await request.json();
        const { technology_ids, ...projectFields } = body;

        const db = getDb();

        const existing = db
            .prepare("SELECT id FROM projects WHERE id = ?")
            .get(id);

        if (!existing) {
            return errorResponse("Project not found", 404);
        }

        db.transaction(() => {
            if (Object.keys(projectFields).length > 0) {
                const setClauses = Object.keys(projectFields)
                    .map((col) => `${col} = ?`)
                    .join(", ");
                const values = Object.keys(projectFields).map(
                    (col) => projectFields[col] ?? null,
                );

                db.prepare(`UPDATE projects SET ${setClauses} WHERE id = ?`).run(
                    ...values,
                    id,
                );
            }

            if (Array.isArray(technology_ids)) {
                db.prepare(
                    "DELETE FROM project_technologies WHERE project_id = ?",
                ).run(id);

                const insertTech = db.prepare(
                    "INSERT INTO project_technologies (project_id, technology_id) VALUES (?, ?)",
                );
                for (const techId of technology_ids) {
                    insertTech.run(id, techId);
                }
            }
        })();

        const updated = db
            .prepare("SELECT * FROM projects WHERE id = ?")
            .get(id);

        revalidatePath("/projects", "layout");

        return jsonResponse(updated);
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Project PUT error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
    try {
        await requireAuth(request);

        const { id } = await context.params;
        const db = getDb();

        const existing = db
            .prepare("SELECT id FROM projects WHERE id = ?")
            .get(id);

        if (!existing) {
            return errorResponse("Project not found", 404);
        }

        db.prepare("DELETE FROM projects WHERE id = ?").run(id);

        revalidatePath("/projects", "layout");

        return successResponse("Project deleted successfully");
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Project DELETE error:", error);
        return errorResponse("Internal server error", 500);
    }
}
