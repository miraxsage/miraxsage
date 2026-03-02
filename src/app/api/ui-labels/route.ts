import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { jsonResponse, errorResponse, successResponse } from "@/shared/api/response";

export async function GET() {
    try {
        const db = getDb();
        const labels = db.prepare("SELECT * FROM ui_labels ORDER BY category, id").all();
        return jsonResponse(labels);
    } catch (error) {
        console.error("UI Labels GET error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function PUT(request: NextRequest) {
    try {
        await requireAuth(request);

        const { category, data } = await request.json();

        if (!category || !data) {
            return errorResponse("Category and data are required");
        }

        const db = getDb();
        const items = Array.isArray(data) ? data : [data];

        const transaction = db.transaction(() => {
            db.prepare("DELETE FROM ui_labels WHERE category = ?").run(category);

            if (items.length === 0) return;

            const stmt = db.prepare(
                "INSERT INTO ui_labels (key, value_en, value_ru, category) VALUES (?, ?, ?, ?)",
            );

            for (const item of items) {
                stmt.run(item.key, item.value_en, item.value_ru, category);
            }
        });

        transaction();

        revalidatePath("/");
        revalidatePath("/about");
        revalidatePath("/projects");
        revalidatePath("/interact");

        return successResponse(`UI labels for category "${category}" updated successfully`);
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("UI Labels PUT error:", error);
        return errorResponse("Internal server error", 500);
    }
}
