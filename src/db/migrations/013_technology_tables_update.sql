-- Add icon column to technology_categories
ALTER TABLE technology_categories ADD COLUMN icon TEXT;

-- Rename name to name_en in technologies
ALTER TABLE technologies RENAME COLUMN name TO name_en;

-- Add name_ru column
ALTER TABLE technologies ADD COLUMN name_ru TEXT NOT NULL DEFAULT '';

-- Backfill name_ru with name_en (technology names are universal)
UPDATE technologies SET name_ru = name_en WHERE name_ru = '';

-- Strip "Icon" suffix from technology icons (resolveIconSvg adds it automatically)
UPDATE technologies SET icon = REPLACE(icon, 'Icon', '') WHERE icon LIKE '%Icon';

-- Set category icons for existing categories
UPDATE technology_categories SET icon = 'Markup' WHERE slug = 'frontend' AND icon IS NULL;
UPDATE technology_categories SET icon = 'Terminal' WHERE slug = 'backend' AND icon IS NULL;
UPDATE technology_categories SET icon = 'PersonalVideo' WHERE slug = 'desktop' AND icon IS NULL;
