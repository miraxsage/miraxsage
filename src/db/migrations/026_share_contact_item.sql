-- Add a "share" contact item to contact_info so it appears in the contacts list
-- Admin can reorder, hide, change icon/title like any other contact
INSERT INTO contact_info (sort_order, type, title, title_en, title_ru, icon, url, is_visible)
VALUES (
  (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM contact_info),
  'share',
  'Share',
  'Share',
  'Поделиться',
  'Share',
  '',
  1
);
