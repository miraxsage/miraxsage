ALTER TABLE resume_soft_skills ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 0;

-- backfill sort_order based on current rowid order
UPDATE resume_soft_skills SET sort_order = (
  SELECT COUNT(*) FROM resume_soft_skills AS s2 WHERE s2.rowid <= resume_soft_skills.rowid
);
