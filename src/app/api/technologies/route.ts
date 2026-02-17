import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { jsonResponse, errorResponse, successResponse } from "@/shared/api/response";

export async function GET() {
    try {
        const db = getDb();

        const categories = db
            .prepare("SELECT * FROM technology_categories ORDER BY sort_order")
            .all() as Array<Record<string, unknown>>;

        const technologies = db
            .prepare("SELECT * FROM technologies ORDER BY sort_order")
            .all() as Array<Record<string, unknown>>;

        const techByCategory = new Map<number, Array<Record<string, unknown>>>();
        for (const tech of technologies) {
            const categoryId = tech.category_id as number;
            if (!techByCategory.has(categoryId)) {
                techByCategory.set(categoryId, []);
            }
            techByCategory.get(categoryId)!.push(tech);
        }

        const result = categories.map((category) => ({
            ...category,
            technologies: techByCategory.get(category.id as number) || [],
        }));

        return jsonResponse(result);
    } catch (error) {
        console.error("Technologies GET error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function POST(request: NextRequest) {
    try {
        await requireAuth(request);

        const body = await request.json();

        if (!body.name || !body.category_id) {
            return errorResponse("name and category_id are required");
        }

        const db = getDb();

        const columns = Object.keys(body);
        const placeholders = columns.map(() => "?").join(", ");
        const values = columns.map((col) => body[col] ?? null);

        const info = db
            .prepare(
                `INSERT INTO technologies (${columns.join(", ")}) VALUES (${placeholders})`,
            )
            .run(...values);

        const technology = db
            .prepare("SELECT * FROM technologies WHERE id = ?")
            .get(info.lastInsertRowid);

        revalidatePath("/about", "layout");
        revalidatePath("/projects", "layout");

        return jsonResponse(technology, 201);
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Technologies POST error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function PUT(request: NextRequest) {
    try {
        await requireAuth(request);

        const body = await request.json();
        const { id, ...fields } = body;

        if (!id) {
            return errorResponse("id is required");
        }

        if (Object.keys(fields).length === 0) {
            return errorResponse("No fields to update");
        }

        const db = getDb();

        const existing = db
            .prepare("SELECT id FROM technologies WHERE id = ?")
            .get(id);

        if (!existing) {
            return errorResponse("Technology not found", 404);
        }

        const setClauses = Object.keys(fields)
            .map((col) => `${col} = ?`)
            .join(", ");
        const values = Object.keys(fields).map((col) => fields[col] ?? null);

        db.prepare(`UPDATE technologies SET ${setClauses} WHERE id = ?`).run(
            ...values,
            id,
        );

        const updated = db
            .prepare("SELECT * FROM technologies WHERE id = ?")
            .get(id);

        revalidatePath("/about", "layout");
        revalidatePath("/projects", "layout");

        return jsonResponse(updated);
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Technologies PUT error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await requireAuth(request);

        const { id } = await request.json();

        if (!id) {
            return errorResponse("id is required");
        }

        const db = getDb();

        const existing = db
            .prepare("SELECT id FROM technologies WHERE id = ?")
            .get(id);

        if (!existing) {
            return errorResponse("Technology not found", 404);
        }

        db.prepare("DELETE FROM technologies WHERE id = ?").run(id);

        revalidatePath("/about", "layout");
        revalidatePath("/projects", "layout");

        return successResponse("Technology deleted successfully");
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Technologies DELETE error:", error);
        return errorResponse("Internal server error", 500);
    }
}
