import { NextRequest } from "next/server";
import { getDb } from "@/db";
import { signJwt, AUTH_COOKIE_NAME } from "@/shared/api/auth";
import { jsonResponse, errorResponse } from "@/shared/api/response";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return errorResponse("Username and password are required", 400);
        }

        const db = getDb();
        const user = db
            .prepare("SELECT id, username, password_hash FROM admin_users WHERE username = ?")
            .get(username) as { id: number; username: string; password_hash: string } | undefined;

        if (!user) {
            return errorResponse("Invalid username or password", 401);
        }

        const passwordValid = await bcrypt.compare(password, user.password_hash);

        if (!passwordValid) {
            return errorResponse("Invalid username or password", 401);
        }

        const token = await signJwt({ sub: String(user.id), username: user.username });

        const response = jsonResponse({
            success: true,
            user: { id: user.id, username: user.username },
        });

        response.cookies.set(AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return errorResponse("Internal server error", 500);
    }
}
