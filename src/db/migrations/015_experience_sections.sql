-- Add experience description fields to technology_categories
ALTER TABLE technology_categories ADD COLUMN description_en TEXT NOT NULL DEFAULT '';
ALTER TABLE technology_categories ADD COLUMN description_ru TEXT NOT NULL DEFAULT '';

-- Backfill existing categories with content from the former hardcoded TechDescriptionBlock
UPDATE technology_categories SET
  description_en = 'With a special passion, I approach the development of user interfaces, graphic and software design, as well as frontend development, viewing them as a fusion of various technologies hidden from the user, yet ultimately giving rise to a creative and unique product before their eyes. I''ve been familiar with frontend development since 2011 when I wrote my first plugin for Opera using jQuery. Currently, I actively engage in the development and am intrigued by complex projects using modern technology stacks.',
  description_ru = 'С особенной любовью отношусь к разработке пользовательских интерфейсов, графическому, программному дизайну и фронтенду как объединению множества технологий, скрытых от пользователя, но в итоге рождающих перед его глазами конечный творческий и уникальный продукт. С фронтенд разработкой я дружу еще с 2011 года, когда написал свой первый плагин для Opera на jQuery. Сейчас участвую в разработке и интересуюсь сложными проектами на современном стеке технологий.'
WHERE slug = 'frontend';

UPDATE technology_categories SET
  description_en = 'Taking into account my personal interest and the influence of historical circumstances, I have been actively involved in and continue to engage in independent development of full-fledged web solutions, including the backend part. Currently, my most common basic stack includes PHP, MySQL, CMS WordPress, and the Laravel Framework. I am currently exploring Node.js and related technologies for backend development in JavaScript.',
  description_ru = 'С учетом личного интереса и силы исторических обстоятельств я активно занимался и занимаюсь самостоятельной разработкой полноценных веб решений в том числе и backend-части. Сегодня мой самый распространенный базовый стек здесь это PHP, MySQL, CMS Wordpress, Laravel Framework. В настоящее время интересуюсь Node.JS и связанными технологиями относительно backend-разработки на JavaScript.'
WHERE slug = 'backend';

UPDATE technology_categories SET
  description_en = 'During my university studies and professional career, I have written a large number of programs of varying complexity, ranging from simple utility tools and educational demonstration projects to serious applications. I have been actively engaged in self-learning, recognizing the importance of user interface convenience and attractiveness. With great interest, I mastered Windows Presentation Foundation (WPF), a system for building user interfaces with visually appealing capabilities (a graphical subsystem within the .NET Framework that utilizes the XAML language). I actively used and integrated external UI customization libraries.',
  description_ru = 'Во время учебы в университете и профессиональной деятельности написал большое количество программ различного уровня от простых вспомогательных утилит и учебных демонстрационных проектов до серьезных приложений. Активно занимался самостоятельным изучением. Высоко оценивая важность удобства и привлекательности пользовательского интерфейса, с большим интересом освоил Windows Presentation Foundation — систему для построения пользовательского интерфейса (UI) с визуально привлекательными возможностями (графическая подсистема в составе .NET Framework, использующая язык XAML), активно использовал и интегрировал внешние библиотеки UI-кастомизации.'
WHERE slug = 'desktop';

-- New table for the Experience > Projects section text
CREATE TABLE IF NOT EXISTS resume_experience_projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text_en TEXT NOT NULL DEFAULT '',
  text_ru TEXT NOT NULL DEFAULT ''
);

-- Seed with existing hardcoded content
INSERT INTO resume_experience_projects (text_en, text_ru) VALUES (
  'During my professional career spanning over 10 years in software development, I have independently completed over 50 projects using various technologies. These range from application configurations on the 1C platform and .NET Framework to commercial web projects on PHP and JS utilizing CMS, libraries, and frameworks such as WordPress, Laravel, jQuery, React, and others. Additionally, I actively strive to learn new development and administration technologies such as Node.js, Docker, and Linux.',
  'За время профессиональной деятельности на протяжении уже более 10 лет в области разработки программного обеспечения самостоятельно реализовано более 50 проектов с использованием различных технологий от прикладных конфигураций на платформе 1C, .NET Framework, Excel VBA до коммерческих веб-проектов на PHP и JS с использованием CMS, библиотек и фреймворков Wordpress, Laravel, jQuery, React и пр. Также стараюсь активно заниматься изучением новых технологий разработки и администрирования, Node.JS, Docker, Linux.'
);
