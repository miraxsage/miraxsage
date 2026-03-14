import { getDb } from "@/db";

export function generateMediaId(): string {
    const db = getDb();
    for (let i = 0; i < 10; i++) {
        const timestamp = Date.now().toString(16).slice(-6);
        const random = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
        const mediaId = timestamp + random;
        const exists = db.prepare("SELECT 1 FROM projects WHERE media_id = ?").get(mediaId);
        if (!exists) return mediaId;
    }
    throw new Error("Failed to generate unique media_id after 10 attempts");
}
