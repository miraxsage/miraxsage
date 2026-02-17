import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dbDir = path.resolve(process.cwd(), "data");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.resolve(dbDir, "miraxsage.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Create migrations tracking table
db.exec(`
  CREATE TABLE IF NOT EXISTS _migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Read and apply schema
const schemaPath = path.resolve(__dirname, "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf-8");

const applied = db
  .prepare("SELECT name FROM _migrations")
  .all() as { name: string }[];
const appliedNames = new Set(applied.map((m) => m.name));

const migrationName = "001_initial_schema";
if (!appliedNames.has(migrationName)) {
  const transaction = db.transaction(() => {
    db.exec(schema);
    db.prepare("INSERT INTO _migrations (name) VALUES (?)").run(migrationName);
  });
  transaction();
  console.log(`Applied migration: ${migrationName}`);
} else {
  console.log(`Migration already applied: ${migrationName}`);
}

// Apply additional migrations from migrations/ directory
const migrationsDir = path.resolve(__dirname, "migrations");
if (fs.existsSync(migrationsDir)) {
  const migrationFiles = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of migrationFiles) {
    const name = path.basename(file, ".sql");
    if (!appliedNames.has(name)) {
      const sql = fs.readFileSync(path.resolve(migrationsDir, file), "utf-8");
      const transaction = db.transaction(() => {
        db.exec(sql);
        db.prepare("INSERT INTO _migrations (name) VALUES (?)").run(name);
      });
      transaction();
      console.log(`Applied migration: ${name}`);
    }
  }
}

console.log("All migrations applied successfully.");
db.close();
