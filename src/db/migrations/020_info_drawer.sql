CREATE TABLE IF NOT EXISTS info_drawer (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);

INSERT OR IGNORE INTO info_drawer (key, value) VALUES ('copyright_en', '');
INSERT OR IGNORE INTO info_drawer (key, value) VALUES ('copyright_ru', '');
INSERT OR IGNORE INTO info_drawer (key, value) VALUES ('status_icon', 'WorkOutline');
INSERT OR IGNORE INTO info_drawer (key, value) VALUES ('status_text_en', '');
INSERT OR IGNORE INTO info_drawer (key, value) VALUES ('status_text_ru', '');
INSERT OR IGNORE INTO info_drawer (key, value) VALUES ('timezone_icon', 'Schedule');
INSERT OR IGNORE INTO info_drawer (key, value) VALUES ('timezone', '');
INSERT OR IGNORE INTO info_drawer (key, value) VALUES ('location_icon', 'LocationOn');
INSERT OR IGNORE INTO info_drawer (key, value) VALUES ('location_en', '');
INSERT OR IGNORE INTO info_drawer (key, value) VALUES ('location_ru', '');
