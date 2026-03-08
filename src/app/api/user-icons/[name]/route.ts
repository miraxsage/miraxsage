import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { errorResponse, successResponse } from "@/shared/api/response";
import { invalidateIconCache } from "@/shared/lib/resolveIconSvg";

type RouteContext = { params: Promise<{ name: string }> };

export async function DELETE(request: NextRequest, context: RouteContext) {
    try {
        await requireAuth(request);
        const { name } = await context.params;
        const db = getDb();
        const result = db.prepare("DELETE FROM user_icons WHERE name = ?").run(name);
        if (result.changes === 0) return errorResponse("Icon not found", 404);
        invalidateIconCache(name);
        revalidatePath("/", "layout");
        return successResponse("Icon deleted");
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("DELETE /api/user-icons/[name] error:", error);
        return errorResponse("Internal server error", 500);
    }
}
