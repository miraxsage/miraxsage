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
        const blocks = db
            .prepare("SELECT id, sort_order, is_visible, col_span, variant FROM info_drawer_blocks ORDER BY sort_order")
            .all() as { id: string; sort_order: number; is_visible: number; col_span: number; variant: number }[];

        return jsonResponse({ ...result, blocks });
    } catch (error) {
        console.error("InfoDrawer GET error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function PUT(request: NextRequest) {
    try {
        await requireAuth(request);

        const data = await request.json();

        if (!data || typeof data !== "object") {
            return errorResponse("Data object is required");
        }

        const db = getDb();

        if ("blocks" in data && Array.isArray(data.blocks)) {
            const insert = db.prepare(
                "INSERT INTO info_drawer_blocks (id, sort_order, is_visible, col_span, variant) VALUES (?, ?, ?, ?, ?)"
            );

            const transaction = db.transaction(() => {
                db.prepare("DELETE FROM info_drawer_blocks").run();
                for (const block of data.blocks as { id: string; sort_order: number; is_visible: number; col_span: number; variant: number }[]) {
                    insert.run(block.id, block.sort_order, block.is_visible, block.col_span, block.variant);
                }
            });

            transaction();

            revalidatePath("/", "layout");

            return successResponse("Info drawer blocks updated successfully");
        }

        const upsert = db.prepare(
            "INSERT INTO info_drawer (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
        );

        const transaction = db.transaction(() => {
            for (const [key, value] of Object.entries(data as Record<string, string>)) {
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
