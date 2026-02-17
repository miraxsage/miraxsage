import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";

export const AUTH_COOKIE_NAME = "auth-token";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "miraxsage-dev-secret",
);

export async function signJwt(payload: { sub: string; username: string }) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(JWT_SECRET);
}

export async function verifyJwt(token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as { sub: string; username: string };
    } catch {
        return null;
    }
}

export async function getSession(request: Request) {
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) return null;

    const match = cookieHeader
        .split(";")
        .map((c) => c.trim())
        .find((c) => c.startsWith(`${AUTH_COOKIE_NAME}=`));

    if (!match) return null;

    const token = match.split("=").slice(1).join("=");
    const payload = await verifyJwt(token);
    if (!payload) return null;

    return { id: payload.sub, username: payload.username };
}

export async function requireAuth(request: Request) {
    const session = await getSession(request);

    if (!session) {
        throw NextResponse.json(
            { error: "Authentication required" },
            { status: 401 },
        );
    }

    return session;
}
