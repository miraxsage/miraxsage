import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { jsonResponse, errorResponse, successResponse } from "@/shared/api/response";

const SECTION_TABLES: Record<string, string> = {
    header_items: "landing_header_items",
    title_variants: "landing_title_variants",
    buttons: "landing_buttons",
    info_blocks: "landing_info_blocks",
    footer: "landing_footer",
};

export async function GET() {
    try {
        const db = getDb();

        const header_items = db
            .prepare("SELECT * FROM landing_header_items ORDER BY sort_order")
            .all();
        const title_variants = db
            .prepare("SELECT * FROM landing_title_variants ORDER BY sort_order")
            .all();
        const buttons = db
            .prepare("SELECT * FROM landing_buttons ORDER BY sort_order")
            .all();
        const info_blocks = db
            .prepare("SELECT * FROM landing_info_blocks ORDER BY sort_order")
            .all();
        const footer = db.prepare("SELECT * FROM landing_footer").all();

        return jsonResponse({
            header_items,
            title_variants,
            buttons,
            info_blocks,
            footer,
        });
    } catch (error) {
        console.error("Landing GET error:", error);
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

        const transaction = db.transaction(() => {
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
        });

        transaction();

        revalidatePath("/");

        return successResponse(`Section "${section}" updated successfully`);
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Landing PUT error:", error);
        return errorResponse("Internal server error", 500);
    }
}
