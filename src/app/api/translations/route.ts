import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { jsonResponse, errorResponse, successResponse } from "@/shared/api/response";

export async function GET() {
    try {
        const db = getDb();

        const rows = db.prepare("SELECT key, value_ru FROM translations").all() as Array<{
            key: string;
            value_ru: string;
        }>;

        const translations: Record<string, string> = {};
        for (const row of rows) {
            translations[row.key] = row.value_ru;
        }

        return jsonResponse(translations);
    } catch (error) {
        console.error("Translations GET error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function PUT(request: NextRequest) {
    try {
        await requireAuth(request);

        const { translations } = await request.json();

        if (!translations || typeof translations !== "object") {
            return errorResponse("translations object is required");
        }

        const db = getDb();
        const entries = Object.entries(translations) as Array<[string, string]>;

        const transaction = db.transaction(() => {
            const upsert = db.prepare(
                `INSERT INTO translations (key, value_ru)
                 VALUES (?, ?)
                 ON CONFLICT(key) DO UPDATE SET value_ru = excluded.value_ru`,
            );

            for (const [key, value_ru] of entries) {
                upsert.run(key, value_ru);
            }
        });

        transaction();

        revalidatePath("/", "layout");

        return successResponse(
            `${entries.length} translation(s) updated successfully`,
        );
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Translations PUT error:", error);
        return errorResponse("Internal server error", 500);
    }
}
