import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { errorResponse, successResponse } from "@/shared/api/response";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, context: RouteContext) {
    try {
        await requireAuth(request);
        const { id } = await context.params;
        const { order } = await request.json();
        if (!Array.isArray(order)) return errorResponse("order array is required");

        const db = getDb();
        const project = db.prepare("SELECT id FROM projects WHERE id = ?").get(id);
        if (!project) return errorResponse("Project not found", 404);

        const update = db.prepare("UPDATE project_images SET sort_order = ? WHERE id = ? AND project_id = ?");
        db.transaction(() => {
            for (const item of order) {
                update.run(item.sort_order, item.id, id);
            }
        })();

        revalidatePath("/projects", "layout");
        return successResponse("Images reordered");
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Images reorder error:", error);
        return errorResponse("Internal server error", 500);
    }
}
