DELETE FROM ui_labels WHERE key IN ('About', 'Projects') AND category = 'details_navigation';
UPDATE landing_header_items SET label_en = 'Resume', label_ru = 'Резюме' WHERE url = '/about';
UPDATE landing_header_items SET label_en = 'Portfolio', label_ru = 'Портфолио' WHERE url = '/projects';
