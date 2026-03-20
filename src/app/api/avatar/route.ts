import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { jsonResponse, errorResponse, successResponse } from "@/shared/api/response";
import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const AVATAR_DIR = path.resolve(process.cwd(), "public", "img", "avatar");
const VALID_THEMES = ["dark", "light"] as const;

function getAvatarUrls(): { dark: string | null; light: string | null } {
    const db = getDb();
    const rows = db.prepare("SELECT key, value FROM site_settings WHERE key IN ('avatar_dark', 'avatar_light')").all() as { key: string; value: string }[];
    const result: { dark: string | null; light: string | null } = { dark: null, light: null };
    for (const row of rows) {
        const theme = row.key.replace("avatar_", "") as "dark" | "light";
        if (existsSync(path.resolve(process.cwd(), "public", row.value.replace(/^\//, "")))) {
            result[theme] = row.value;
        }
    }
    return result;
}

export async function GET() {
    try {
        return jsonResponse(getAvatarUrls());
    } catch (error) {
        console.error("Avatar GET error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function POST(request: NextRequest) {
    try {
        await requireAuth(request);
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const theme = formData.get("theme") as string | null;

        if (!file) return errorResponse("No file provided");
        if (!theme || !VALID_THEMES.includes(theme as typeof VALID_THEMES[number])) {
            return errorResponse("Invalid theme, must be 'dark' or 'light'");
        }

        const ext = path.extname(file.name).toLowerCase() || ".png";
        const buffer = Buffer.from(await file.arrayBuffer());

        await mkdir(AVATAR_DIR, { recursive: true });

        // Remove old avatar file if exists
        const db = getDb();
        const existing = db.prepare("SELECT value FROM site_settings WHERE key = ?").get(`avatar_${theme}`) as { value: string } | undefined;
        if (existing) {
            const oldPath = path.resolve(process.cwd(), "public", existing.value.replace(/^\//, ""));
            if (existsSync(oldPath)) await unlink(oldPath);
        }

        const filename = `${theme}${ext}`;
        const filePath = path.join(AVATAR_DIR, filename);
        await writeFile(filePath, buffer);

        const url = `/img/avatar/${filename}`;
        db.prepare("INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)").run(`avatar_${theme}`, url);

        revalidatePath("/", "layout");
        return jsonResponse({ url }, 201);
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Avatar POST error:", error);
        return errorResponse("Internal server error", 500);
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await requireAuth(request);
        const { theme } = await request.json();

        if (!theme || !VALID_THEMES.includes(theme)) {
            return errorResponse("Invalid theme, must be 'dark' or 'light'");
        }

        const db = getDb();
        const existing = db.prepare("SELECT value FROM site_settings WHERE key = ?").get(`avatar_${theme}`) as { value: string } | undefined;
        if (existing) {
            const filePath = path.resolve(process.cwd(), "public", existing.value.replace(/^\//, ""));
            if (existsSync(filePath)) await unlink(filePath);
            db.prepare("DELETE FROM site_settings WHERE key = ?").run(`avatar_${theme}`);
        }

        revalidatePath("/", "layout");
        return successResponse();
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Avatar DELETE error:", error);
        return errorResponse("Internal server error", 500);
    }
}
