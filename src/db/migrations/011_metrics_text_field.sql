-- Add text field to resume_metrics, replacing chart-specific fields
ALTER TABLE resume_metrics ADD COLUMN text TEXT NOT NULL DEFAULT '';

-- Seed initial placeholder text
UPDATE resume_metrics SET text = 'Раздел метрик в разработке.' WHERE id = 1;
