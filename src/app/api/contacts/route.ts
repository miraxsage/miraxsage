import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { jsonResponse, errorResponse, successResponse } from "@/shared/api/response";

export async function GET() {
    try {
        const db = getDb();

        const contact_info = db
            .prepare("SELECT * FROM contact_info ORDER BY sort_order")
            .all();
        const contact_page_content = db
            .prepare("SELECT * FROM contact_page_content")
            .all();

        return jsonResponse({ contact_info, contact_page_content });
    } catch (error) {
        console.error("Contacts GET error:", error);
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

        const validSections = ["contact_info", "contact_page_content"];
        if (!validSections.includes(section)) {
            return errorResponse(
                `Invalid section. Valid sections: ${validSections.join(", ")}`,
            );
        }

        const db = getDb();
        const items = Array.isArray(data) ? data : [data];

        const transaction = db.transaction(() => {
            db.prepare(`DELETE FROM ${section}`).run();

            if (items.length === 0) return;

            const columns = Object.keys(items[0]);
            const placeholders = columns.map(() => "?").join(", ");
            const stmt = db.prepare(
                `INSERT INTO ${section} (${columns.join(", ")}) VALUES (${placeholders})`,
            );

            for (const item of items) {
                stmt.run(...columns.map((col) => item[col] ?? null));
            }
        });

        transaction();

        revalidatePath("/interact");
        revalidatePath("/");

        return successResponse(`Section "${section}" updated successfully`);
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Contacts PUT error:", error);
        return errorResponse("Internal server error", 500);
    }
}
