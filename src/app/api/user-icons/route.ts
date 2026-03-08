import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { jsonResponse, errorResponse } from "@/shared/api/response";
import { normalizeSvg } from "@/shared/lib/normalizeSvg";
import { invalidateIconCache } from "@/shared/lib/resolveIconSvg";

export async function GET() {
    try {
        const db = getDb();
        const icons = db.prepare("SELECT name, svg FROM user_icons ORDER BY rowid").all() as { name: string; svg: string }[];
        return jsonResponse(icons);
    } catch (error) {
        console.error("GET /api/user-icons error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function POST(request: NextRequest) {
    try {
        await requireAuth(request);
        const { name, svg } = await request.json() as { name?: string; svg?: string };

        if (!name || !svg) return errorResponse("name and svg are required");
        if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name)) return errorResponse("Invalid icon name");

        let normalizedSvg: string;
        try {
            normalizedSvg = normalizeSvg(svg);
        } catch (e) {
            return errorResponse(`SVG error: ${(e as Error).message}`);
        }

        const db = getDb();

        // Name deduplication
        let finalName = name;
        let counter = 2;
        while (db.prepare("SELECT 1 FROM user_icons WHERE name = ?").get(finalName)) {
            finalName = `${name}_${counter++}`;
        }

        db.prepare("INSERT INTO user_icons (name, svg) VALUES (?, ?)").run(finalName, normalizedSvg);
        invalidateIconCache(finalName);
        revalidatePath("/", "layout");

        return jsonResponse({ name: finalName, svg: normalizedSvg });
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("POST /api/user-icons error:", error);
        return errorResponse("Internal server error", 500);
    }
}
