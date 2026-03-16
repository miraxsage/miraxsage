/**
 * Seed script: migrate hardcoded code snippets to the database.
 * Run with: npx tsx src/db/seed-snippets.ts
 *
 * Maps hardcoded snippet keys to technologies by their icon name,
 * then inserts into code_snippets table.
 */
import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "data", "miraxsage.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Mapping: snippet export key → { technology icon name, codemirror language }
const SNIPPET_MAPPING: Record<string, { icon: string; language: string }> = {
    js:    { icon: "JS",        language: "jsx" },
    ts:    { icon: "TS",        language: "tsx" },
    react: { icon: "React",     language: "tsx" },
    php:   { icon: "PHP",       language: "php" },
    wp:    { icon: "Wordpress", language: "php" },
    mysql: { icon: "MySql",     language: "sql" },
    cs:    { icon: "CSharp",    language: "cs" },
    wpf:   { icon: "Windows",   language: "cs" },
    onec:  { icon: "OneC",      language: "c" },
};

// Dynamic import of the hardcoded snippets
async function loadSnippets(): Promise<Record<string, string>> {
    // The codeSnippets file uses "use client" directive but exports plain strings
    // We read it as a module
    const mod = await import("../entities/resume/ui/blocks/snippets/codeSnippets");
    const result: Record<string, string> = {};
    for (const key of Object.keys(SNIPPET_MAPPING)) {
        if (key in mod) {
            result[key] = (mod as Record<string, string>)[key];
        }
    }
    return result;
}

async function main() {
    const snippets = await loadSnippets();

    // Look up technologies by icon name
    const technologies = db.prepare("SELECT id, icon, category_id FROM technologies").all() as Array<{
        id: number;
        icon: string;
        category_id: number;
    }>;

    const techByIcon = new Map<string, number>();
    for (const t of technologies) {
        techByIcon.set(t.icon, t.id);
    }

    // Group by category for sort_order
    const categoryOrder = new Map<number, number>();

    const insert = db.prepare(
        "INSERT OR REPLACE INTO code_snippets (technology_id, language, sort_order, code) VALUES (?, ?, ?, ?)"
    );

    const transaction = db.transaction(() => {
        for (const [key, mapping] of Object.entries(SNIPPET_MAPPING)) {
            const techId = techByIcon.get(mapping.icon);
            if (!techId) {
                console.warn(`Technology with icon "${mapping.icon}" not found, skipping snippet "${key}"`);
                continue;
            }
            const code = snippets[key];
            if (!code) {
                console.warn(`No code found for snippet "${key}", skipping`);
                continue;
            }
            const tech = technologies.find((t) => t.id === techId)!;
            const catOrder = categoryOrder.get(tech.category_id) ?? 0;
            categoryOrder.set(tech.category_id, catOrder + 1);

            insert.run(techId, mapping.language, catOrder + 1, code);
            console.log(`Inserted snippet: ${key} → tech_id=${techId}, language=${mapping.language}`);
        }
    });

    transaction();

    const count = (db.prepare("SELECT COUNT(*) as c FROM code_snippets").get() as { c: number }).c;
    console.log(`Done. ${count} snippets in database.`);
    db.close();
}

main().catch((err) => {
    console.error("Seed error:", err);
    db.close();
    process.exit(1);
});
