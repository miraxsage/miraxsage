import { NextRequest } from "next/server";
import { requireAuth } from "@/shared/api/auth";
import { jsonResponse, errorResponse } from "@/shared/api/response";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(request: NextRequest) {
    try {
        await requireAuth(request);

        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return errorResponse("No file provided");
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = path.extname(file.name) || "";
        const uniqueName = `${crypto.randomUUID()}${ext}`;

        const uploadDir = path.resolve(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });

        const filePath = path.join(uploadDir, uniqueName);
        await writeFile(filePath, buffer);

        return jsonResponse({ url: `/uploads/${uniqueName}` }, 201);
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Upload POST error:", error);
        return errorResponse("Internal server error", 500);
    }
}
