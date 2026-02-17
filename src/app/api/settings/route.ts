import { NextRequest } from "next/server";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { jsonResponse, errorResponse, successResponse } from "@/shared/api/response";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest) {
    try {
        const session = await requireAuth(request);

        const db = getDb();
        const user = db
            .prepare(
                "SELECT id, username, created_at, updated_at FROM admin_users WHERE id = ?",
            )
            .get(session.id);

        if (!user) {
            return errorResponse("User not found", 404);
        }

        return jsonResponse(user);
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Settings GET error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function PUT(request: NextRequest) {
    try {
        const session = await requireAuth(request);

        const { currentPassword, newPassword } = await request.json();

        if (!currentPassword || !newPassword) {
            return errorResponse(
                "currentPassword and newPassword are required",
            );
        }

        if (newPassword.length < 6) {
            return errorResponse(
                "New password must be at least 6 characters long",
            );
        }

        const db = getDb();
        const user = db
            .prepare(
                "SELECT id, password_hash FROM admin_users WHERE id = ?",
            )
            .get(session.id) as
            | { id: number; password_hash: string }
            | undefined;

        if (!user) {
            return errorResponse("User not found", 404);
        }

        const passwordValid = await bcrypt.compare(
            currentPassword,
            user.password_hash,
        );

        if (!passwordValid) {
            return errorResponse("Current password is incorrect", 401);
        }

        const newHash = await bcrypt.hash(newPassword, 10);

        db.prepare(
            "UPDATE admin_users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?",
        ).run(newHash, session.id);

        return successResponse("Password updated successfully");
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Settings PUT error:", error);
        return errorResponse("Internal server error", 500);
    }
}
