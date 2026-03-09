ALTER TABLE resume_education_data ADD COLUMN is_full_line INTEGER NOT NULL DEFAULT 0;
ALTER TABLE resume_labor_data ADD COLUMN is_full_line INTEGER NOT NULL DEFAULT 0;

UPDATE resume_education_data SET is_full_line = 1
WHERE field_key IN ('full_name', 'graduate_work', 'certificates', 'field_of_study');

UPDATE resume_labor_data SET is_full_line = 1
WHERE field_key IN ('full_name', 'responsibilities', 'achievements');
