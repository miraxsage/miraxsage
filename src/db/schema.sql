-- Miraxsage Database Schema

-- Migration tracking
CREATE TABLE IF NOT EXISTS _migrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  applied_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Translations
CREATE TABLE IF NOT EXISTS translations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL UNIQUE,
  value_ru TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Landing: header items
CREATE TABLE IF NOT EXISTS landing_header_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL DEFAULT 'link',
  label_en TEXT NOT NULL,
  label_ru TEXT NOT NULL,
  icon TEXT,
  url TEXT,
  is_visible INTEGER NOT NULL DEFAULT 1
);

-- Landing: title variants (typing animation)
CREATE TABLE IF NOT EXISTS landing_title_variants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  text_en TEXT NOT NULL,
  text_ru TEXT NOT NULL
);

-- Landing: CTA buttons
CREATE TABLE IF NOT EXISTS landing_buttons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  label_en TEXT NOT NULL,
  label_ru TEXT NOT NULL,
  icon TEXT,
  url TEXT NOT NULL
);

-- Landing: info blocks (about slide)
CREATE TABLE IF NOT EXISTS landing_info_blocks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  title_en TEXT NOT NULL,
  title_ru TEXT NOT NULL,
  content_en TEXT NOT NULL DEFAULT '',
  content_ru TEXT NOT NULL DEFAULT '',
  illustration TEXT,
  is_visible INTEGER NOT NULL DEFAULT 1
);

-- Landing: get closer slide
CREATE TABLE IF NOT EXISTS landing_get_closer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  title_en TEXT NOT NULL,
  title_ru TEXT NOT NULL,
  content_en TEXT NOT NULL DEFAULT '',
  content_ru TEXT NOT NULL DEFAULT ''
);

-- Landing: footer
CREATE TABLE IF NOT EXISTS landing_footer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  content_en TEXT NOT NULL DEFAULT '',
  content_ru TEXT NOT NULL DEFAULT ''
);

-- Resume: categories
CREATE TABLE IF NOT EXISTS resume_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  icon TEXT,
  label_en TEXT NOT NULL,
  label_ru TEXT NOT NULL,
  parent_id INTEGER REFERENCES resume_categories(id) ON DELETE SET NULL
);

-- Resume: general data (biography key-value pairs)
CREATE TABLE IF NOT EXISTS resume_general_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  field_key TEXT NOT NULL UNIQUE,
  label_en TEXT NOT NULL,
  label_ru TEXT NOT NULL,
  value_en TEXT NOT NULL,
  value_ru TEXT NOT NULL,
  value_format TEXT
);

-- Resume: education items (tree structure)
CREATE TABLE IF NOT EXISTS resume_education_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  label_en TEXT NOT NULL,
  label_ru TEXT NOT NULL,
  icon TEXT,
  parent_id INTEGER REFERENCES resume_education_items(id) ON DELETE CASCADE
);

-- Resume: education data (key-value per education item)
CREATE TABLE IF NOT EXISTS resume_education_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  education_item_id INTEGER NOT NULL REFERENCES resume_education_items(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  field_key TEXT NOT NULL,
  label_en TEXT NOT NULL,
  label_ru TEXT NOT NULL,
  value_en TEXT NOT NULL,
  value_ru TEXT NOT NULL
);

-- Resume: labor items (tree structure)
CREATE TABLE IF NOT EXISTS resume_labor_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  label_en TEXT NOT NULL,
  label_ru TEXT NOT NULL,
  icon TEXT,
  parent_id INTEGER REFERENCES resume_labor_items(id) ON DELETE CASCADE
);

-- Resume: labor data (key-value per labor item)
CREATE TABLE IF NOT EXISTS resume_labor_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  labor_item_id INTEGER NOT NULL REFERENCES resume_labor_items(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  field_key TEXT NOT NULL,
  label_en TEXT NOT NULL,
  label_ru TEXT NOT NULL,
  value_en TEXT NOT NULL,
  value_ru TEXT NOT NULL
);

-- Resume: questionnaire items (Q&A tree with rich text)
CREATE TABLE IF NOT EXISTS resume_questionnaire_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  question_en TEXT NOT NULL,
  question_ru TEXT NOT NULL,
  answer_en TEXT NOT NULL DEFAULT '',
  answer_ru TEXT NOT NULL DEFAULT '',
  icon TEXT,
  parent_id INTEGER REFERENCES resume_questionnaire_items(id) ON DELETE CASCADE
);

-- Resume: achievements
CREATE TABLE IF NOT EXISTS resume_achievements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  content_en TEXT NOT NULL,
  content_ru TEXT NOT NULL
);

-- Resume: experience projects text
CREATE TABLE IF NOT EXISTS resume_experience_projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text_en TEXT NOT NULL DEFAULT '',
  text_ru TEXT NOT NULL DEFAULT ''
);

-- Resume: soft skills
CREATE TABLE IF NOT EXISTS resume_soft_skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  slug TEXT NOT NULL UNIQUE,
  label_en TEXT NOT NULL,
  label_ru TEXT NOT NULL,
  description_en TEXT NOT NULL DEFAULT '',
  description_ru TEXT NOT NULL DEFAULT '',
  icon TEXT,
  level_values TEXT NOT NULL DEFAULT '[]'
);

-- Resume: metrics
CREATE TABLE IF NOT EXISTS resume_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  label_en TEXT NOT NULL,
  label_ru TEXT NOT NULL,
  chart_type TEXT NOT NULL DEFAULT 'bar',
  chart_data TEXT NOT NULL DEFAULT '{}'
);

-- Technology categories
CREATE TABLE IF NOT EXISTS technology_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  icon TEXT,
  label_en TEXT NOT NULL,
  label_ru TEXT NOT NULL,
  description_en TEXT NOT NULL DEFAULT '',
  description_ru TEXT NOT NULL DEFAULT ''
);

-- Technologies
CREATE TABLE IF NOT EXISTS technologies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL REFERENCES technology_categories(id) ON DELETE CASCADE,
  name_en TEXT NOT NULL,
  name_ru TEXT NOT NULL DEFAULT '',
  docs_link TEXT,
  icon TEXT,
  skill_level INTEGER NOT NULL DEFAULT 0,
  experience_years REAL NOT NULL DEFAULT 0,
  projects_count INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  short_name_en TEXT,
  short_name_ru TEXT,
  description_en TEXT NOT NULL DEFAULT '',
  description_ru TEXT NOT NULL DEFAULT '',
  domain TEXT,
  rating REAL NOT NULL DEFAULT 0,
  year INTEGER,
  status TEXT NOT NULL DEFAULT 'completed',
  participating TEXT NOT NULL DEFAULT 'selfown',
  dev_time_months REAL,
  github_link TEXT,
  site_link TEXT NOT NULL DEFAULT '',
  media_id TEXT UNIQUE,
  content_en TEXT NOT NULL DEFAULT '',
  content_ru TEXT NOT NULL DEFAULT '',
  images_count INTEGER NOT NULL DEFAULT 0,
  cover_brightness TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Project-technology many-to-many
CREATE TABLE IF NOT EXISTS project_technologies (
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  technology_id INTEGER NOT NULL REFERENCES technologies(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, technology_id)
);

-- Project images
CREATE TABLE IF NOT EXISTS project_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  original_ext TEXT NOT NULL,
  title_en TEXT NOT NULL DEFAULT '',
  title_ru TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  description_ru TEXT NOT NULL DEFAULT '',
  is_cover INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(project_id, slug)
);

-- Project content (rich text per locale)
CREATE TABLE IF NOT EXISTS project_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  locale TEXT NOT NULL DEFAULT 'en',
  content TEXT NOT NULL DEFAULT '',
  UNIQUE(project_id, locale)
);

-- Contact info
CREATE TABLE IF NOT EXISTS contact_info (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL DEFAULT 'link',
  title_en TEXT NOT NULL DEFAULT '',
  title_ru TEXT NOT NULL DEFAULT '',
  icon TEXT,
  url TEXT,
  is_visible INTEGER NOT NULL DEFAULT 1
);

-- Contact page content sections
CREATE TABLE IF NOT EXISTS contact_page_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section TEXT NOT NULL UNIQUE,
  content_en TEXT NOT NULL DEFAULT '',
  content_ru TEXT NOT NULL DEFAULT ''
);

-- UI labels (admin-editable UI text)
CREATE TABLE IF NOT EXISTS ui_labels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL UNIQUE,
  value_en TEXT NOT NULL,
  value_ru TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general'
);

-- Code snippets (one per technology)
CREATE TABLE IF NOT EXISTS code_snippets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  technology_id INTEGER NOT NULL UNIQUE REFERENCES technologies(id) ON DELETE CASCADE,
  language TEXT NOT NULL DEFAULT 'js',
  sort_order INTEGER NOT NULL DEFAULT 0,
  code TEXT NOT NULL DEFAULT ''
);
