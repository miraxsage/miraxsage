import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import seedTranslations from "./translations";
import seedLanding from "./landing";
import seedResume from "./resume";
import seedTechnologies from "./technologies";
import seedProjects from "./projects";
import seedContacts from "./contacts";
import seedUiLabels from "./ui-labels";

const dbDir = path.resolve(process.cwd(), "data");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.resolve(dbDir, "miraxsage.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

console.log("Seeding database...");

// Seed default admin user
const existingAdmin = db
  .prepare("SELECT id FROM admin_users WHERE username = ?")
  .get("admin") as { id: number } | undefined;

if (!existingAdmin) {
  const passwordHash = bcrypt.hashSync("admin", 10);
  db.prepare("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)").run(
    "admin",
    passwordHash
  );
  console.log("Created default admin user (admin/admin)");
} else {
  console.log("Admin user already exists, skipping");
}

// Seed content data (order matters: technologies before projects)
seedTranslations(db);
seedLanding(db);
seedResume(db);
seedTechnologies(db);
seedProjects(db);
seedContacts(db);
seedUiLabels(db);

// Summary
const tables = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
  .all() as { name: string }[];

console.log(`Database has ${tables.length} tables:`, tables.map((t) => t.name).join(", "));
console.log("Seeding complete.");

db.close();
