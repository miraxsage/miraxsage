-- Restructure code_snippets: link each snippet to a technology
DROP TABLE IF EXISTS code_snippets;

CREATE TABLE IF NOT EXISTS code_snippets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  technology_id INTEGER NOT NULL UNIQUE REFERENCES technologies(id) ON DELETE CASCADE,
  language TEXT NOT NULL DEFAULT 'javascript',
  sort_order INTEGER NOT NULL DEFAULT 0,
  code TEXT NOT NULL DEFAULT ''
);
