import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { jsonResponse, errorResponse, successResponse } from "@/shared/api/response";

export async function GET() {
    try {
        const db = getDb();
        const domains = db.prepare("SELECT * FROM project_domains ORDER BY sort_order").all();
        return jsonResponse(domains);
    } catch (error) {
        console.error("Project domains GET error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function POST(request: NextRequest) {
    try {
        await requireAuth(request);
        const body = await request.json();
        const db = getDb();

        const info = db.prepare(
            "INSERT INTO project_domains (name_en, name_ru, icon, sort_order) VALUES (?, ?, ?, ?)"
        ).run(body.name_en ?? "", body.name_ru ?? "", body.icon ?? null, body.sort_order ?? 0);

        const domain = db.prepare("SELECT * FROM project_domains WHERE id = ?").get(info.lastInsertRowid);

        revalidatePath("/projects", "layout");
        return jsonResponse(domain, 201);
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Project domains POST error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function PUT(request: NextRequest) {
    try {
        await requireAuth(request);
        const body = await request.json();
        const { id, ...fields } = body;

        if (!id) return errorResponse("id is required");
        if (Object.keys(fields).length === 0) return errorResponse("No fields to update");

        const db = getDb();
        const existing = db.prepare("SELECT id FROM project_domains WHERE id = ?").get(id);
        if (!existing) return errorResponse("Domain not found", 404);

        const setClauses = Object.keys(fields).map((col) => `${col} = ?`).join(", ");
        const values = Object.keys(fields).map((col) => fields[col] ?? null);

        db.prepare(`UPDATE project_domains SET ${setClauses} WHERE id = ?`).run(...values, id);

        const updated = db.prepare("SELECT * FROM project_domains WHERE id = ?").get(id);

        revalidatePath("/projects", "layout");
        return jsonResponse(updated);
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Project domains PUT error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await requireAuth(request);
        const { id } = await request.json();

        if (!id) return errorResponse("id is required");

        const db = getDb();
        const existing = db.prepare("SELECT id, name_en FROM project_domains WHERE id = ?").get(id) as { id: number; name_en: string } | undefined;
        if (!existing) return errorResponse("Domain not found", 404);

        db.prepare("UPDATE projects SET domain = '' WHERE domain = ?").run(existing.name_en);
        db.prepare("DELETE FROM project_domains WHERE id = ?").run(id);

        revalidatePath("/projects", "layout");
        return successResponse("Domain deleted successfully");
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Project domains DELETE error:", error);
        return errorResponse("Internal server error", 500);
    }
}
