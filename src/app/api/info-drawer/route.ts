import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { jsonResponse, errorResponse, successResponse } from "@/shared/api/response";

export async function GET() {
    try {
        const db = getDb();
        const rows = db.prepare("SELECT key, value FROM info_drawer").all() as { key: string; value: string }[];
        const result: Record<string, string> = {};
        for (const row of rows) {
            result[row.key] = row.value;
        }
        return jsonResponse(result);
    } catch (error) {
        console.error("InfoDrawer GET error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function PUT(request: NextRequest) {
    try {
        await requireAuth(request);

        const data = await request.json() as Record<string, string>;

        if (!data || typeof data !== "object") {
            return errorResponse("Data object is required");
        }

        const db = getDb();
        const upsert = db.prepare(
            "INSERT INTO info_drawer (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
        );

        const transaction = db.transaction(() => {
            for (const [key, value] of Object.entries(data)) {
                upsert.run(key, value ?? "");
            }
        });

        transaction();

        revalidatePath("/", "layout");

        return successResponse("Info drawer updated successfully");
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("InfoDrawer PUT error:", error);
        return errorResponse("Internal server error", 500);
    }
}
