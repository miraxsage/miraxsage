ALTER TABLE contact_info ADD COLUMN title_en TEXT NOT NULL DEFAULT '';
ALTER TABLE contact_info ADD COLUMN title_ru TEXT NOT NULL DEFAULT '';
UPDATE contact_info SET title_en = title, title_ru = title;
