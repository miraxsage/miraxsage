CREATE TABLE IF NOT EXISTS info_drawer_blocks (
  id TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_visible INTEGER NOT NULL DEFAULT 1,
  col_span INTEGER NOT NULL DEFAULT 1 CHECK(col_span IN (1, 2)),
  variant INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO info_drawer_blocks (id, sort_order, is_visible, col_span, variant) VALUES ('stats', 0, 1, 1, 0);
INSERT OR IGNORE INTO info_drawer_blocks (id, sort_order, is_visible, col_span, variant) VALUES ('languages', 1, 1, 1, 0);
INSERT OR IGNORE INTO info_drawer_blocks (id, sort_order, is_visible, col_span, variant) VALUES ('streak', 2, 1, 1, 0);
INSERT OR IGNORE INTO info_drawer_blocks (id, sort_order, is_visible, col_span, variant) VALUES ('activity', 3, 1, 2, 0);
