-- Replace old 4 blocks with new 8 React-based blocks
DELETE FROM info_drawer_blocks;

INSERT INTO info_drawer_blocks (id, sort_order, is_visible, col_span, variant) VALUES ('profile', 0, 1, 2, 0);
INSERT INTO info_drawer_blocks (id, sort_order, is_visible, col_span, variant) VALUES ('calendar', 1, 1, 2, 0);
INSERT INTO info_drawer_blocks (id, sort_order, is_visible, col_span, variant) VALUES ('stats', 2, 1, 1, 0);
INSERT INTO info_drawer_blocks (id, sort_order, is_visible, col_span, variant) VALUES ('streak', 3, 1, 1, 0);
INSERT INTO info_drawer_blocks (id, sort_order, is_visible, col_span, variant) VALUES ('languages_repo', 4, 1, 1, 0);
INSERT INTO info_drawer_blocks (id, sort_order, is_visible, col_span, variant) VALUES ('languages_commits', 5, 1, 1, 0);
INSERT INTO info_drawer_blocks (id, sort_order, is_visible, col_span, variant) VALUES ('commits_hour', 6, 1, 1, 0);
INSERT INTO info_drawer_blocks (id, sort_order, is_visible, col_span, variant) VALUES ('activity', 7, 1, 2, 0);
