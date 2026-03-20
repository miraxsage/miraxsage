import { getDb } from "@/db";
import { existsSync } from "fs";
import path from "path";
import type { SiteSettings } from "./siteSettings";

export function getSiteSettings(): SiteSettings {
    const db = getDb();
    const rows = db.prepare("SELECT key, value FROM site_settings").all() as { key: string; value: string }[];
    const settings: SiteSettings = { avatar_dark: null, avatar_light: null };
    for (const row of rows) {
        if (row.key in settings) {
            if (row.key.startsWith("avatar_")) {
                (settings as unknown as Record<string, string | null>)[row.key] = existsSync(path.resolve(process.cwd(), "public", row.value.replace(/^\//, ""))) ? row.value : null;
            } else {
                (settings as unknown as Record<string, string | null>)[row.key] = row.value;
            }
        }
    }
    return settings;
}
