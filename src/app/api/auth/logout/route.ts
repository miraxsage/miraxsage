import { AUTH_COOKIE_NAME } from "@/shared/api/auth";
import { jsonResponse } from "@/shared/api/response";

export async function POST() {
    const response = jsonResponse({ success: true });

    response.cookies.set(AUTH_COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });

    return response;
}
