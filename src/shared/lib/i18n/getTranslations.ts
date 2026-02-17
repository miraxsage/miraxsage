import { getDb } from "@/db";

export type TranslationsMap = Record<string, string | string[]>;

export function getTranslations(): TranslationsMap {
    const db = getDb();
    const rows = db
        .prepare("SELECT key, value_ru FROM translations ORDER BY key")
        .all() as Array<{ key: string; value_ru: string }>;

    const map: TranslationsMap = {};
    for (const row of rows) {
        try {
            const parsed = JSON.parse(row.value_ru);
            map[row.key] = parsed;
        } catch {
            map[row.key] = row.value_ru;
        }
    }
    return map;
}
