import { NextRequest } from "next/server";
import { getSession } from "@/shared/api/auth";
import { jsonResponse } from "@/shared/api/response";

export async function GET(request: NextRequest) {
    const session = await getSession(request);

    if (session) {
        return jsonResponse({
            authenticated: true,
            user: { id: session.id, username: session.username },
        });
    }

    return jsonResponse({ authenticated: false });
}
