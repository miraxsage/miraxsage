import type Database from "better-sqlite3";

export default function seedResume(db: Database.Database) {
  const existing = db
    .prepare("SELECT COUNT(*) as cnt FROM resume_categories")
    .get() as { cnt: number };

  if (existing.cnt > 0) {
    console.log("Resume data already seeded, skipping");
    return;
  }

  const transaction = db.transaction(() => {
    // ─── Resume Categories ────────────────────────────────────────────
    const insertCategory = db.prepare(
      `INSERT INTO resume_categories (slug, sort_order, icon, label_en, label_ru, parent_id)
       VALUES (?, ?, ?, ?, ?, ?)`
    );

    // Top-level categories
    const biographyId = Number(
      insertCategory.run("biography", 1, "Person", "Biography", "Биография", null).lastInsertRowid
    );
    const experienceId = Number(
      insertCategory.run("experience", 2, "Muscles", "Experience", "Опыт", null).lastInsertRowid
    );
    const specificationsId = Number(
      insertCategory.run("specifications", 3, "Assessment", "Specifications", "Характиристики", null).lastInsertRowid
    );
    insertCategory.run("snippets", 4, "DataObject", "Snippets", "Сниппеты", null);

    // Biography sub-categories
    insertCategory.run("general", 1, "Badge", "General", "Общее", biographyId);
    insertCategory.run("education", 2, "School", "Education", "Образование", biographyId);
    insertCategory.run("labor", 3, "BusinessCenter", "Labor", "Работа", biographyId);
    insertCategory.run("questionaire", 4, "ReceiptLong", "Questionaire", "Анкета", biographyId);

    // Experience sub-categories
    insertCategory.run("technologies", 1, "Webhook", "Technologies", "Технологии", experienceId);
    insertCategory.run("achievements", 2, "EmojiEvents", "Achievements", "Достижения", experienceId);
    insertCategory.run("projects", 3, "RocketLaunch", "Projects", "Проекты", experienceId);

    // Specifications sub-categories
    insertCategory.run("soft-skills", 1, "PsychologyAlt", "Soft-skills", "Гибкие навыки", specificationsId);
    insertCategory.run("hard-skills", 2, "Psychology", "Hard-skills", "Технические", specificationsId);
    insertCategory.run("metrics", 3, "Leaderboard", "Metrics", "Метрики", specificationsId);

    // ─── Resume General Data ──────────────────────────────────────────
    const insertGeneral = db.prepare(
      `INSERT INTO resume_general_data (sort_order, field_key, label_en, label_ru, value_en, value_ru, value_format)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    );

    insertGeneral.run(1, "full_name", "Full name", "Полное имя", "[Manin Maxim] [Forbidden 8]", "[Manin Maxim] [Forbidden 8]", "rich");
    insertGeneral.run(2, "date_of_birth", "Date of birth", "Дата рождения", "[Forbidden 2].[Forbidden 2].199[Forbidden 1]", "[Forbidden 2].[Forbidden 2].199[Forbidden 1]", "rich");
    insertGeneral.run(3, "specialization", "Specialization", "Специализация", "Web-developer [Tag full stack]", "Веб-разработчик [Tag full stack]", "rich");
    insertGeneral.run(4, "core_technologies", "Core technologies", "Основные технологии", "HTML, CSS, JavaScript, TypeScript, React, Redux, ReactRouter, MUI", "HTML, CSS, JavaScript, TypeScript, React, Redux, ReactRouter, MUI", null);
    insertGeneral.run(5, "telegram", "Telegram", "Telegram", "[Link https://t.me/miraxsage] [Priority Connection]", "[Link https://t.me/miraxsage] [Priority Connection]", "rich");
    insertGeneral.run(6, "email", "Email", "Электронная почта", "[Link mailto:manin.maxim@mail.ru manin.maxim@mail.ru]", "[Link mailto:manin.maxim@mail.ru manin.maxim@mail.ru]", "rich");
    insertGeneral.run(7, "education", "Education", "Образование", "General secondary [Score (4.3/5)] Higher[Nbsp]specialized [Score (5.0/5)]", "Общее среднее [Score (4.3/5)] Высшее[Nbsp]профильное [Score (5.0/5)]", "rich");
    insertGeneral.run(8, "foreign_languages", "Foreign languages", "Иностранные языки", "[Language EN (~B2)]", "[Language EN (~B2)]", "rich");
    insertGeneral.run(9, "citizenship", "Citizenship", "Гражданство", "[Language RU - onlyIcon] Russian Federation", "[Language RU - onlyIcon] Российская Федерация", "rich");
    insertGeneral.run(10, "region", "Region", "Регион", "Krasnodar region", "Краснодарский край", null);
    insertGeneral.run(11, "city", "City", "Город", "[Forbidden 7]", "[Forbidden 7]", "rich");
    insertGeneral.run(12, "years_of_experience", "Years of experience", "Стаж", "8 years", "8 лет", null);
    insertGeneral.run(13, "type_of_employment", "Type of employment", "Вид занятости", "Full", "Полная", null);
    insertGeneral.run(14, "employment_mode", "Employment mode", "Режим занятости", "Full day, distant work", "Полный день, удаленная работа", null);
    insertGeneral.run(15, "relocation", "Relocation", "Переезд", "Under review", "Рассматривается", null);

    // ─── Resume Education Items (tree) ────────────────────────────────
    const insertEducationItem = db.prepare(
      `INSERT INTO resume_education_items (sort_order, label_en, label_ru, icon, parent_id)
       VALUES (?, ?, ?, ?, ?)`
    );
    const insertEducationData = db.prepare(
      `INSERT INTO resume_education_data (education_item_id, sort_order, field_key, label_en, label_ru, value_en, value_ru)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    );

    // General education branch
    const eduGeneralId = Number(
      insertEducationItem.run(1, "General", "Общее", "BaseEducation", null).lastInsertRowid
    );
    const eduSchoolId = Number(
      insertEducationItem.run(1, "MBEI SGES №14 (2000 - 2010)", "МБОУ СОШ №14 (2000 - 2010)", "School", eduGeneralId).lastInsertRowid
    );

    // School data
    insertEducationData.run(eduSchoolId, 1, "full_name", "Full name", "Полное наименование",
      "Municipal budget educational institution Secondary general education school №14",
      "Муниципальное бюджетное общеобразовательное учреждение средняя общеобразовательная школа №14");
    insertEducationData.run(eduSchoolId, 2, "region", "Region", "Регион", "Krasnodar region", "Краснодарский край");
    insertEducationData.run(eduSchoolId, 3, "city", "City", "Город", "[Forbidden 7]", "[Forbidden 7]");
    insertEducationData.run(eduSchoolId, 4, "form_of_study", "Form of study", "Форма обучения", "Intramural", "Очная");
    insertEducationData.run(eduSchoolId, 5, "average_score", "Average score", "Средний балл", "[Score 4.3/5]", "[Score 4.3/5]");
    insertEducationData.run(eduSchoolId, 6, "senior_year", "Senior year", "Год выпуска", "2010", "2010");
    insertEducationData.run(eduSchoolId, 7, "classes", "Classes", "Классов", "11", "11");

    // Higher education branch
    const eduHigherId = Number(
      insertEducationItem.run(2, "Higher", "Высшее", "HighEducation", null).lastInsertRowid
    );
    const eduTechnicalId = Number(
      insertEducationItem.run(1, "Technical", "Техническое", "MiscellaneousServices", eduHigherId).lastInsertRowid
    );
    const eduKubSTUId = Number(
      insertEducationItem.run(1, "FSBEI HE KubSTU (2011 - 2015)", "ФБОУ ВО КубГТУ (2011 - 2015)", "University", eduTechnicalId).lastInsertRowid
    );

    // KubSTU data
    insertEducationData.run(eduKubSTUId, 1, "full_name", "Full name", "Полное наименование",
      "Federal state budgetary educational institution of higher education «Kuban state technological university»",
      "Федеральное государственное бюджетное образовательное учреждение высшего образования «Кубанский государственный технологический университет»");
    insertEducationData.run(eduKubSTUId, 2, "region", "Region", "Регион", "Krasnodar region", "Краснодарский край");
    insertEducationData.run(eduKubSTUId, 3, "city", "City", "Город", "Krasnodar", "Краснодар");
    insertEducationData.run(eduKubSTUId, 4, "field_of_study", "Field of study specialty", "Направление подготовки",
      "09.03.01 Informatics and computer science", "09.03.01 Информатика и вычислительная техника");
    insertEducationData.run(eduKubSTUId, 5, "average_score", "Average score", "Средний балл", "[Score 5/5]", "[Score 5/5]");
    insertEducationData.run(eduKubSTUId, 6, "graduate_work", "Graduate work", "Дипломная работа",
      "Development of a software package for distributed management of personal databases",
      "Разработка программного комплекса распределенного управления персональными базами данных");
    insertEducationData.run(eduKubSTUId, 7, "certificates", "Certificates", "Сертификаты", "", "");
    insertEducationData.run(eduKubSTUId, 8, "academic_degree", "Academic degree", "Академическая степень", "Bachelor's degree", "Бакалавриат");
    insertEducationData.run(eduKubSTUId, 9, "form_of_study", "Form of study", "Форма обучения", "Intramural", "Очная");
    insertEducationData.run(eduKubSTUId, 10, "senior_year", "Senior year", "Год выпуска", "2015", "2015");
    insertEducationData.run(eduKubSTUId, 11, "diploma_with_honors", "Diploma with honors", "Диплом с отличием", "[Priority Connection]", "[Priority Connection]");

    // Additional education branch
    const eduAdditionalId = Number(
      insertEducationItem.run(3, "Additional", "Дополнительное", "AdditionalEducation", null).lastInsertRowid
    );
    const eduAdditionalKubSTUId = Number(
      insertEducationItem.run(1, "FSBEI HE KubSTU (2010)", "ФБОУ ВО КубГТУ (2010)", "Verified", eduAdditionalId).lastInsertRowid
    );

    // Additional KubSTU data
    insertEducationData.run(eduAdditionalKubSTUId, 1, "full_name", "Full name", "Полное наименование",
      "Federal state budgetary educational institution of higher education «Kuban state technological university»",
      "Федеральное государственное бюджетное образовательное учреждение высшего образования «Кубанский государственный технологический университет»");
    insertEducationData.run(eduAdditionalKubSTUId, 2, "region", "Region", "Регион", "Krasnodar region", "Краснодарский край");
    insertEducationData.run(eduAdditionalKubSTUId, 3, "city", "City", "Город", "[Forbidden 7]", "[Forbidden 7]");
    insertEducationData.run(eduAdditionalKubSTUId, 4, "field_of_study", "Field of study specialty", "Направление подготовки",
      "Training in the pre-university education system in a technical field",
      "Подготовка в системе довузовского образования по техническому направлению");
    insertEducationData.run(eduAdditionalKubSTUId, 5, "form_of_study", "Form of study", "Форма обучения", "Intramural", "Очная");
    insertEducationData.run(eduAdditionalKubSTUId, 6, "senior_year", "Senior year", "Год выпуска", "2010", "2010");

    // ─── Resume Labor Items (tree) ────────────────────────────────────
    const insertLaborItem = db.prepare(
      `INSERT INTO resume_labor_items (sort_order, label_en, label_ru, icon, parent_id)
       VALUES (?, ?, ?, ?, ?)`
    );
    const insertLaborData = db.prepare(
      `INSERT INTO resume_labor_data (labor_item_id, sort_order, field_key, label_en, label_ru, value_en, value_ru)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    );

    // IT branch (root)
    const laborITId = Number(
      insertLaborItem.run(1, "Information technology", "Информационные технологии", "Memory", null).lastInsertRowid
    );

    // --- Webarchitect ---
    const laborWebarchitectId = Number(
      insertLaborItem.run(1, "Webarchitect.ru (2015 - present time)", "Webarchitect.ru (2015 - настоящее время)", "Apartment", laborITId).lastInsertRowid
    );
    insertLaborData.run(laborWebarchitectId, 1, "full_name", "Full name", "Полное наименование", "Webarchitect.ru", "Webarchitect.ru");
    insertLaborData.run(laborWebarchitectId, 2, "region", "Region", "Регион", "Krasnodar region", "Краснодарский край");
    insertLaborData.run(laborWebarchitectId, 3, "city", "City", "Город", "[Forbidden 7]", "[Forbidden 7]");
    insertLaborData.run(laborWebarchitectId, 4, "responsibilities", "Responsibilities", "Обязанности",
      "Handled key tasks in architecture design and team implementation of large projects, developed backend components using PHP, Yii2, Laravel, MySQL, CMS WordPress, and implemented complex dynamic frontend logic with React and Redux.",
      "Занимался ключевыми задачами проектирования архитектуры и командной реализацией больших проектов, разработкой backend-частей на PHP, Yii2, Laravel, MySQL, CMS Wordpress, реализацией сложной динамической frontend логики на React и Redux.");
    insertLaborData.run(laborWebarchitectId, 5, "achievements", "Achievements", "Достижения",
      "Over a long period of working with the team, with my leading involvement, many projects have been developed. Among the largest and most interesting are the Krasnodar regional real estate portal, a number of specialized digital service platforms, which continue to actively attract users and are still maintained.",
      "За длительный срок работы в команде с моим ведущим участием было разработано множество проектов. Одними из самых больших и интересных остаются краевой портал недвижимости Краснодара, ряд специализированных сервисов цифровых услуг, по настоящий день активно привлекающих пользователей и находящихся на поддержке.");
    insertLaborData.run(laborWebarchitectId, 6, "position", "Position", "Должность", "Fullstack developer", "Fullstack-разработчик");
    insertLaborData.run(laborWebarchitectId, 7, "years_of_experience", "Years of experience", "Стаж", "2 years", "2 года");

    // --- Kubanskie Produkty ---
    const laborKubanskieId = Number(
      insertLaborItem.run(2, "OOO Kuban products (LLC) (09.2022 - present time)", "ООО «Кубанские продукты» (09.2022 - настоящее время)", "Apartment", laborITId).lastInsertRowid
    );
    insertLaborData.run(laborKubanskieId, 1, "full_name", "Full name", "Полное наименование",
      "OOO Kuban products (Limited Liability Company)",
      "Общество с ограниченной ответственностью «Кубанские продукты»");
    insertLaborData.run(laborKubanskieId, 2, "region", "Region", "Регион", "Krasnodar region", "Краснодарский край");
    insertLaborData.run(laborKubanskieId, 3, "city", "City", "Город", "[Forbidden 7]", "[Forbidden 7]");
    insertLaborData.run(laborKubanskieId, 4, "responsibilities", "Responsibilities", "Обязанности",
      "In addition to supporting the company's information infrastructure, I developed individual software modules for the accounting system and the website, and performed their integration.",
      "Кроме прочих обязанностей поддержки информационной инфраструктуры предприятия занимался разработкой отдельных программных модулей системы бухгалтерского учета, сайта, выполнял их интеграцию.");
    insertLaborData.run(laborKubanskieId, 5, "achievements", "Achievements", "Достижения",
      "I independently developed a website for tracking automotive parts inventory using CMS WordPress, React, and Bootstrap. This website integrates the operations of the transportation department and the accounting department by synchronizing data generated through the mobile version of the website with the 1C Accounting configuration. This significantly reduced the amount of duplicate manual work, automated the document workflow process, and substantially relieved staff workload.",
      "Самостоятельно разработал сайт учета остатков автомобильных деталей на базе CMS Wordpress, React, Bootstrap, позволяющий интегрировать работу транспортного участка и бухгалтерии, синхронизируя данные на сайте, формируемые через мобильную версию сайта, с конфигурацией 1С Бухгалтерия, что существенно сократило объем двойной ручной работы, автоматизировало процесс документооборота и позволило существенно разгрузить штатную занятость.");
    insertLaborData.run(laborKubanskieId, 6, "position", "Position", "Должность", "Software engineer", "Инженер-программист");
    insertLaborData.run(laborKubanskieId, 7, "years_of_experience", "Years of experience", "Стаж", "2 years", "2 года");

    // --- Kubankabel ---
    const laborKubankabelId = Number(
      insertLaborItem.run(3, "ZAO Kuban cable (CJSC) (04.2017 - 09.2022)", "ЗАО «Кубанькабель» (04.2017 - 09.2022)", "Apartment", laborITId).lastInsertRowid
    );
    insertLaborData.run(laborKubankabelId, 1, "full_name", "Full name", "Полное наименование",
      "ZAO Kuban cable factory (Closed Joint-Stock Company)",
      "Закрытое акционерное общество «Кабельный завод «Кубанькабель»");
    insertLaborData.run(laborKubankabelId, 2, "region", "Region", "Регион", "Krasnodar region", "Краснодарский край");
    insertLaborData.run(laborKubankabelId, 3, "city", "City", "Город", "[Forbidden 7]", "[Forbidden 7]");
    insertLaborData.run(laborKubankabelId, 4, "responsibilities", "Responsibilities", "Обязанности",
      "In addition to supporting the company's information infrastructure, I handled the improvement, redesign, and maintenance of the official website. I developed several specialized programs for automated production accounting, financial accounting, and the recording and management of data from industrial electrical equipment, among other tasks.",
      "Кроме прочих обязанностей поддержки информационной инфраструктуры предприятия занимался доработкой, редизайном и сопровождением официального сайта. Разработал ряд специализированных программ для автоматизированного учета производства, бухгалтерского учета, учета и оформления данных приборов промышленного электрооборудования и пр.");
    insertLaborData.run(laborKubankabelId, 5, "achievements", "Achievements", "Достижения",
      "I made a significant contribution to improving the efficiency of accounting and engineering calculations by developing a suite of auxiliary applications and integration programs using 1C, .NET Framework (C#), WEB, and Excel VBA technologies. For this work, I repeatedly received high praise from management. From scratch, I developed a custom configuration on the 1C platform for piece-rate payroll accounting for cable production workers, considering the unique specifics and features of the company. This configuration remains the primary tool for the planning and economic department to this day.",
      "Внес весомый вклад в повышение производительности бухгалтерских и инженерно-технических расчетов благодаря разработке комплекса вспомогательных приложений и интеграционных программ с использованием технологий 1С:Предприятие, .NET Framework (C#), WEB, Excel VBA, за что неоднократно получал высокие оценки руководства. С нуля была разработана собственная конфигурация на платформе 1С:Предприятие для сдельного учета заработной платы работников кабельного производства с учетом индивидуальной специфики и особенностей предприятия, которая по настоящий момент является основным инструментом планово-экономического отдела.");
    insertLaborData.run(laborKubankabelId, 6, "position", "Position", "Должность", "Software engineer", "Инженер-программист");
    insertLaborData.run(laborKubankabelId, 7, "type_of_employment", "Type of employment", "Вид занятости", "Full", "Полная");
    insertLaborData.run(laborKubankabelId, 8, "years_of_experience", "Years of experience", "Стаж", "5 years", "5 лет");

    // --- Municipal Administration ---
    const laborAdminId = Number(
      insertLaborItem.run(4, "Municipal administration (06.2015 - 04.2017)", "Администрация муниципального образования (06.2015 - 04.2017)", "Apartment", laborITId).lastInsertRowid
    );
    insertLaborData.run(laborAdminId, 1, "full_name", "Full name", "Полное наименование",
      "Municipal administration [Forbidden 7]",
      "Администрация муниципального образования г. [Forbidden 7]");
    insertLaborData.run(laborAdminId, 2, "region", "Region", "Регион", "Krasnodar region", "Краснодарский край");
    insertLaborData.run(laborAdminId, 3, "city", "City", "Город", "[Forbidden 7]", "[Forbidden 7]");
    insertLaborData.run(laborAdminId, 4, "responsibilities", "Responsibilities", "Обязанности",
      "Maintenance of the official informational website of the administration.",
      "Сопровождение официального информационного сайта администрации.");
    insertLaborData.run(laborAdminId, 5, "achievements", "Achievements", "Достижения",
      "Collaboratively developed and implemented a custom WordPress theme that provides specialized tools for administration and automation related to the formatting and publication of documentation, news bulletins, and more.",
      "Совместными усилиями разработал и внедрил собственную тему на Wordpress, реализующую специализированные инструменты администрирования и автоматизации, связанные с оформлением и публикацией материалов делопроизводства, новостных сводок и пр.");
    insertLaborData.run(laborAdminId, 6, "position", "Position", "Должность", "Information technology sector specialist", "Специалист сектора информационных технологий");
    insertLaborData.run(laborAdminId, 7, "type_of_employment", "Type of employment", "Вид занятости", "Full", "Полная");
    insertLaborData.run(laborAdminId, 8, "years_of_experience", "Years of experience", "Стаж", "1 year", "1 год");

    // --- IE Bedrosova ---
    const laborBedrosovaId = Number(
      insertLaborItem.run(5, "IE Bedrosova Y. V. (06.2014 - 08.2014)", "ИП Бедросова Ю. В. (06.2014 - 08.2014)", "Apartment", laborITId).lastInsertRowid
    );
    insertLaborData.run(laborBedrosovaId, 1, "full_name", "Full name", "Полное наименование",
      "Individual entrepreneur Bedrosova Y. V.",
      "Индивидуальный предприниматель Бедросова Ю. В.");
    insertLaborData.run(laborBedrosovaId, 2, "region", "Region", "Регион", "Krasnodar region", "Краснодарский край");
    insertLaborData.run(laborBedrosovaId, 3, "city", "City", "Город", "[Forbidden 7]", "[Forbidden 7]");
    insertLaborData.run(laborBedrosovaId, 4, "responsibilities", "Responsibilities", "Обязанности",
      "Development of an interactive website for the educational program «Computer Science and Engineering».",
      "Разработка интерактивного сайта по направлению учебной подготовки «Информатика и вычислительная техника».");
    insertLaborData.run(laborBedrosovaId, 5, "achievements", "Achievements", "Достижения",
      "Gained experience working in a team.",
      "Приобретен опыт работы в команде.");
    insertLaborData.run(laborBedrosovaId, 6, "position", "Position", "Должность", "Trainee", "Стажер");
    insertLaborData.run(laborBedrosovaId, 7, "type_of_employment", "Type of employment", "Вид занятости", "Internship", "Производственная практика");

    // ─── Resume Questionnaire Items ───────────────────────────────────
    const insertQuestionnaire = db.prepare(
      `INSERT INTO resume_questionnaire_items (sort_order, question_en, question_ru, answer_en, answer_ru, icon, parent_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    );

    insertQuestionnaire.run(
      1,
      "Tell about yourself",
      "Расскажите о себе",
      "From a very young age, I was an especially curious child. I actively participated in creative circles and sports sections. Besides exploration, my favorite activities have always been creating my own works. I was passionate about drawing, carpentry, composing electronic music, and soldering electronic devices based on Arduino. In 9th grade, I was introduced to programming, where I found endless possibilities to realize my creative potential. As a result, I decided to pursue a career in this field and enrolled in the Kuban State Technological University in the field of 'Computer Science and Engineering,' graduating with honors. Currently, I am actively engaged in applied and web development both professionally and in my personal interests.",
      "С самого детства рос особенно любопытным ребенком, активно посещал творческие кружки и спортивные секции, самым любимым занятиям кроме исследований для меня всегда было создание собственных произведений. Увлекался рисованием, плотницким делом, сочинял электронную музыку, паял электронные устройства на базе Arduino, в 9 классе познакомился с программированием, где нашел для себя безграничную возможность реализации собственного творческого потенциала, в связи с чем решил связать с данным направлением свою будущую сферу деятельности, поступив в Кубанский государственный технологический университет по направлению «Информатика и вычислительная техника», окончив его впоследствии с отличием. В настоящее время активно занимаюсь прикладной и веб-разработкой в профессиональной сфере и личных интересах.",
      "Person",
      null
    );

    insertQuestionnaire.run(
      2,
      "What are your strengths",
      "Назовите ваши сильные стороны",
      "Among my positive personal qualities, I consider responsibility, conscientiousness, and patience to be primary. While these traits can sometimes lead to delays in work, it is important for me to verify solutions multiple times to ensure the accuracy of the results. I strive for continuous improvement in the quality of my work to an ideal level, which can be seen as a form of perfectionism. Although some might view this as a negative trait, I consider it a key factor in competitiveness, provided there are sufficient resources and justification. A significant motivator for me is the visibility of practical results and working on real projects that many people will use.",
      "Из положительных личных качеств основными считаю ответственность, добросовестность и терпение, что иногда может служить фактором некоторых задержек в работе, однако для меня важно проверить решение не один раз, чтобы быть уверенным в результате. Стремление к постоянному увеличению качества работы до идеального, что можно считать в некоторой степени перфекционизмом, который некоторые считают отрицательным, для меня же при наличии ресурсов и обоснования — это ключевой фактор конкурентоспособности. Особенным мотиватором для меня является видимость практического результата и работа над реальными проектами, которыми будут пользоваться многие люди.",
      "ThumbUpAlt",
      null
    );

    insertQuestionnaire.run(
      3,
      "What are your weaknesses",
      "Назовите ваши слабые стороны",
      "Among the qualities I continue to work on, I acknowledge a tendency toward excessive self-criticism and occasional lack of confidence. However, I often overcome these challenges by seeing results and receiving feedback. I frequently need to double-check myself and think through solutions more carefully due to occasional inattention and difficulty in considering multiple factors. Nevertheless, I am able to address these issues through personal persistence and determination.",
      "Среди недостающих качеств, над которыми я продолжаю работать, признаюсь в некоторой, возможно, излишней самокритичности и неуверенности до конца, что тем не менее чаще удается преодолеть, видя результат и получая обратную связь. Часто приходится себя проверять и тщательнее продумывать решения из-за порой некоторой невнимательности, сложности учесть больше условий, с чем, могу сказать, всегда удается справиться личным упорством и настойчивостью.",
      "ThumbDownAlt",
      null
    );

    insertQuestionnaire.run(
      4,
      "Why have you chosen this speciality",
      "Почему выбрали эту специальность",
      "For me, programming and development are among the most creative and versatile fields. Since childhood, I have always been interested in creating my own works: music, drawings, woodworking, electronics. Since being introduced to the basics of web programming in the 9th grade, I have maintained a strong interest in learning, developing, and creating numerous solutions in this field. Despite my extensive experience, I believe it is especially important for my professional growth to be in the company of professionals, which I strive for.",
      "Программирование и разработка для меня видятся как одно из самых творческих и универсальных направлений. С детства у меня всегда были интересы в создании собственных произведений: музыки, рисунков, столярных изделий, электроники. С момента знакомства с основами веб-программирования в 9 классе я сохраняю большой интерес к обучению, развитию и созданию множества собственных решений в данной области. Не смотря на продолжительный опыт для личного профессионального роста считаю особенно важным находиться в обществе профессионалов, к чему и стремлюсь.",
      "Badge",
      null
    );

    insertQuestionnaire.run(
      5,
      "Achievements at Previous Workplaces",
      "Достижения на предыдущих местах работы",
      "I independently developed a website for tracking automotive parts inventory using CMS WordPress, React, and Bootstrap. This website enables the integration of the transportation department and accounting, synchronizing data generated through the mobile version of the site with the 1C Accounting configuration. This significantly reduced the volume of duplicate manual work, automated the document workflow process, and considerably alleviated the workload of staff.\n\nI developed a range of specialized programs for automated production accounting, financial accounting, and the recording and documentation of industrial electrical equipment data, among others. I made a significant contribution to improving the productivity of accounting and engineering calculations by developing a suite of auxiliary applications and integration programs based on 1C, .NET Framework (C#), WEB, and Excel VBA, for which I repeatedly received high praise from management.\n\nTogether with my team, I developed and implemented a custom WordPress theme that incorporates specialized administration and automation tools related to the preparation and publication of office materials, news bulletins, and more.",
      "Самостоятельно разработал сайт учета остатков автомобильных деталей на базе CMS Wordpress, React, Bootstrap, позволяющий интегрировать работу транспортного участка и бухгалтерии, синхронизируя данные на сайте, формируемые через мобильную версию сайта, с конфигурацией 1С Бухгалтерия, что существенно сократило объем двойной ручной работы, автоматизировало процесс документооборота и позволило существенно разгрузить штатную занятость.\n\nРазработал ряд специализированных программ для автоматизированного учета производства, бухгалтерского учета, учета и оформления данных приборов промышленного электрооборудования и пр. Внес весомый вклад в повышение производительности бухгалтерских и инженерно-технических расчетов благодаря разработке комплекса вспомогательных приложений и интеграционных программ на базе 1С:Предприятие, .NET Framework (C#), WEB, Excel VBA, за что неоднократно получал высокие оценки руководства.\n\nСовместными усилиями разработал и внедрил собственную тему на Wordpress, реализующую специализированные инструменты администрирования и автоматизации, связанные с оформлением и публикацией материалов делопроизводства, новостных сводок и пр.",
      "EmojiEvents",
      null
    );

    insertQuestionnaire.run(
      6,
      "Hobbies and Interests",
      "Хобби и увлечения",
      "In addition to my professional interests, I am also passionate about cycling, studying English, and traveling. I would love to visit many cities and famous world landmarks.",
      "Кроме профессиональных интересов также увлекаюсь вело спортом, изучаю английский, люблю путешествовать и очень хотел бы посетить много городов и известных мировых достопримечательностей.",
      "Sailing",
      null
    );

    // ─── Resume Achievements ──────────────────────────────────────────
    const insertAchievement = db.prepare(
      `INSERT INTO resume_achievements (sort_order, content_en, content_ru) VALUES (?, ?, ?)`
    );

    insertAchievement.run(1,
      "First and foremost, I would like to emphasize in my personal professional achievements the fact of my predominant individual involvement in the development of most projects. In the early stages of development, in the absence of large development teams with divided responsibilities, I often performed the entire work cycle myself\u2014from design, architectural planning, and interface development to programming logic and testing. This underscores my strong interest in every stage of application creation, from conceptual research and architectural design to actual development, testing, and implementation.",
      "В первую очередь хотел бы подчеркнуть в личных профессиональных достижениях факт подавляющего единоличного участия в разработке большинства проектов, на начальных этапах развития в условиях отсутствия больших команд разработки с разделением обязанностей весь цикл работ от дизайна, архитектурного проектирования, разработки интерфейсов до программирования логики и тестирования я часто выполнял самостоятельно, в чем подтверждаю собственный большой интерес на каждом этапе создания приложения от концептуальных исследований, проектирования архитектуры и дизайна до непосредственно разработки, тестирования и внедрения."
    );

    insertAchievement.run(2,
      "While working at one of the leading cable manufacturing companies in the region, I made a significant contribution to improving the efficiency of accounting and engineering-technical calculations, for which I received high praise from management multiple times. From scratch, I developed a custom configuration on the 1C platform for piece-rate payroll accounting for cable production workers, considering the unique specifics and features of the company. This configuration remains the primary tool for the planning and economic department to this day.",
      "В период работы на одном из ведущих кабельных производств края удалось внести весомый вклад в повышение производительности бухгалтерских и инженерно-технических расчетов, за что неоднократно получал высокие оценки руководства. С нуля была разработана собственная конфигурация на платформе 1С:Предприятие для сдельного учета заработной платы работников кабельного производства с учетом индивидуальной специфики и особенностей предприятия, которая по настоящий момент является основным инструментом планово-экономического отдела."
    );

    insertAchievement.run(3,
      "While working at the wholesale trading enterprise, I independently developed a website for tracking automotive parts inventory. This website allows for the integration of the transportation department and the accounting department by synchronizing data generated through the mobile version of the website with the 1C Accounting configuration. This significantly reduced the amount of duplicate manual work, automated the document workflow process, and substantially relieved staff workload.",
      "В период работы на предприятии оптовой торговли самостоятельно разработал сайт учета остатков автомобильных деталей, позволяющий интегрировать работу транспортного участка и бухгалтерии, синхронизируя данные на сайте, формируемые через мобильную версию сайта, с конфигурацией 1С Бухгалтерия, что существенно сократило объем двойной ручной работы, автоматизировало процесс документооборота и позволило существенно разгрузить штатную занятость."
    );

    insertAchievement.run(4,
      "One of the earliest major projects in the commercial sector was the collaborative development of a real estate classifieds portal covering the region. I was responsible for the entire business logic of the project, programming both the backend and frontend components, as well as designing and optimizing the database. The portal continues to operate and attract visitors to this day.",
      "Одним из самых первых крупных проектов в коммерческой сфере совместными усилиями разработал портал объявлений о недвижимости в масштабах края, целиком занимался бизнес-логикой проекта, программированием backend и frontend частей, проектированием и оптимизацией базой данных, в настоящее время портал продолжает работу и привлечение посетителей."
    );

    insertAchievement.run(5,
      "While working at the municipal administration, I collaborated on the development and implementation of a custom WordPress theme that incorporates specialized administration and automation tools related to the formatting and publication of documentation, news summaries, etc.",
      "В период работы в администрации муниципалитета совместными усилиями разработал и внедрил собственную тему на Wordpress, реализующую специализированные инструменты администрирования и автоматизации, связанные с оформлением и публикацией материалов делопроизводства, новостных сводок и пр."
    );

    // ─── Resume Soft Skills ───────────────────────────────────────────
    const insertSoftSkill = db.prepare(
      `INSERT INTO resume_soft_skills (slug, label_en, label_ru, description_en, description_ru, icon, level_values)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    );

    insertSoftSkill.run("responsibility",
      "Responsibility", "Ответственность",
      "I independently developed a series of large projects that are currently used in real production.",
      "Самостоятельно разработал серию больших проектов, по настоящий момент используемых в реальном производстве.",
      "ResponsibilityStroke",
      JSON.stringify([115, 123, 107])
    );

    insertSoftSkill.run("educability",
      "Educability", "Обучаемость",
      "I constantly improve my personal knowledge and skills, stay updated with new technologies, and strive to implement them in my own projects.",
      "Постоянно совершенствую личные знания и навыки, интересуюсь новыми технологиями и стараюсь их внедрять в собственные проекты.",
      "EducabilityStroke",
      JSON.stringify([95, 103, 87])
    );

    insertSoftSkill.run("creative_mind",
      "Creative mind", "Творческое мышление",
      "I enjoy seeking optimal and elegant solutions to challenging tasks, as well as creating complex interfaces and system architectures.",
      "Люблю искать оптимальные и красивые решения тяжелых задач, создавать сложные интерфейсы и системные архитектуры.",
      "CreativeMindStroke",
      JSON.stringify([93, 97, 79])
    );

    insertSoftSkill.run("openability",
      "Openability", "Открытость",
      "I strive to find common ground and interests, aiming to participate in team collaboration to create large projects.",
      "Стараюсь находить общие взгляды и интересы, стремлюсь участвовать в командной работе создания больших проектов.",
      "OpenabilityStroke",
      JSON.stringify([95, 135, 112])
    );

    insertSoftSkill.run("integrity",
      "Integrity", "Добросовестность",
      "Throughout my extensive practice, I have received only positive feedback regarding the quality of my work and personal approach.",
      "За продолжительное время практики имею только положительные отзывы касательно качества выполняемой работы и личного отношения.",
      "IntegrityStroke",
      JSON.stringify([81, 89, 65])
    );

    insertSoftSkill.run("passion",
      "Passion", "Увлеченность",
      "I don't notice how quickly time flies when working on an interesting project.",
      "Не замечаю, как быстро проходит время при работе над интересным проектом.",
      "PassionStroke",
      JSON.stringify([110, 115, 99])
    );

    insertSoftSkill.run("issue_solving",
      "Issue solving", "Решение проблем",
      "It's difficult to recall development issues from personal experience that ultimately remained unresolved. Directly or indirectly, methods were always found to navigate through various situations.",
      "Сложно вспомнить проблемы в разработке из личного опыта, которые в итоге остались без решения, прямым или косвенными методами всегда удавалось находить выход из той или иной ситуациию.",
      "IssueSolvingStroke",
      JSON.stringify([125, 156, 129])
    );

    insertSoftSkill.run("persistence",
      "Persistence", "Упорство",
      "Quality is when, in the presence of an unresolved issue, it's difficult to stop searching for its solution, even at the expense of overwork.",
      "Качество, когда при наличии нерешенной проблемы сложно остановиться в поиске ее решения, даже в ущерб переработкам.",
      "PersistenceStroke",
      JSON.stringify([141, 147, 131])
    );

    // ─── Resume Metrics ───────────────────────────────────────────────
    const insertMetric = db.prepare(
      `INSERT INTO resume_metrics (slug, label_en, label_ru, chart_type, chart_data)
       VALUES (?, ?, ?, ?, ?)`
    );

    insertMetric.run("placeholder",
      "Performance metrics",
      "Метрики производительности",
      "placeholder",
      JSON.stringify({
        message_en: "The performance metrics are currently undergoing preliminary updating.",
        message_ru: "Метрики производительности временно в состоянии предварительной актуализации.",
      })
    );

    // ─── Technology Categories & Technologies ───────────────────────────
    const insertTechCat = db.prepare(
      `INSERT INTO technology_categories (slug, sort_order, icon, label_en, label_ru, description_en, description_ru)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    );
    const insertTech = db.prepare(
      `INSERT INTO technologies (category_id, sort_order, name_en, name_ru, docs_link, icon, skill_level, experience_years, projects_count)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    const frontendId = Number(insertTechCat.run(
      "frontend", 1, "Markup", "Frontend", "Frontend",
      "With a special passion, I approach the development of user interfaces, graphic and software design, as well as frontend development, viewing them as a fusion of various technologies hidden from the user, yet ultimately giving rise to a creative and unique product before their eyes. I've been familiar with frontend development since 2011 when I wrote my first plugin for Opera using jQuery. Currently, I actively engage in the development and am intrigued by complex projects using modern technology stacks.",
      "С особенной любовью отношусь к разработке пользовательских интерфейсов, графическому, программному дизайну и фронтенду как объединению множества технологий, скрытых от пользователя, но в итоге рождающих перед его глазами конечный творческий и уникальный продукт. С фронтенд разработкой я дружу еще с 2011 года, когда написал свой первый плагин для Opera на jQuery. Сейчас участвую в разработке и интересуюсь сложными проектами на современном стеке технологий."
    ).lastInsertRowid);
    const backendId = Number(insertTechCat.run(
      "backend", 2, "Terminal", "Backend", "Backend",
      "Taking into account my personal interest and the influence of historical circumstances, I have been actively involved in and continue to engage in independent development of full-fledged web solutions, including the backend part. Currently, my most common basic stack includes PHP, MySQL, CMS WordPress, and the Laravel Framework. I am currently exploring Node.js and related technologies for backend development in JavaScript.",
      "С учетом личного интереса и силы исторических обстоятельств я активно занимался и занимаюсь самостоятельной разработкой полноценных веб решений в том числе и backend-части. Сегодня мой самый распространенный базовый стек здесь это PHP, MySQL, CMS Wordpress, Laravel Framework. В настоящее время интересуюсь Node.JS и связанными технологиями относительно backend-разработки на JavaScript."
    ).lastInsertRowid);
    const desktopId = Number(insertTechCat.run(
      "desktop", 3, "PersonalVideo", "Desktop", "Desktop",
      "During my university studies and professional career, I have written a large number of programs of varying complexity, ranging from simple utility tools and educational demonstration projects to serious applications. I have been actively engaged in self-learning, recognizing the importance of user interface convenience and attractiveness. With great interest, I mastered Windows Presentation Foundation (WPF), a system for building user interfaces with visually appealing capabilities (a graphical subsystem within the .NET Framework that utilizes the XAML language). I actively used and integrated external UI customization libraries.",
      "Во время учебы в университете и профессиональной деятельности написал большое количество программ различного уровня от простых вспомогательных утилит и учебных демонстрационных проектов до серьезных приложений. Активно занимался самостоятельным изучением. Высоко оценивая важность удобства и привлекательности пользовательского интерфейса, с большим интересом освоил Windows Presentation Foundation — систему для построения пользовательского интерфейса (UI) с визуально привлекательными возможностями (графическая подсистема в составе .NET Framework, использующая язык XAML), активно использовал и интегрировал внешние библиотеки UI-кастомизации."
    ).lastInsertRowid);

    // Frontend technologies
    insertTech.run(frontendId, 1, "HTML", "HTML", "https://html.spec.whatwg.org/", "HTML", 72, 11, 25);
    insertTech.run(frontendId, 2, "CSS", "CSS", "https://www.w3.org/TR/?tags%5B0%5D=css", "CSS", 78, 11, 25);
    insertTech.run(frontendId, 3, "JS", "JS", "https://tc39.es/ecma262/", "JS", 87, 11, 25);
    insertTech.run(frontendId, 4, "Typescript", "Typescript", "https://www.typescriptlang.org/", "TS", 71, 3.5, 6);
    insertTech.run(frontendId, 5, "jQuery", "jQuery", "https://jquery.com/", "JQuery", 91, 8, 23);
    insertTech.run(frontendId, 6, "React", "React", "https://react.dev/", "React", 74, 3.5, 8);
    insertTech.run(frontendId, 7, "Redux", "Redux", "https://redux.js.org/", "Redux", 68, 2.5, 7);
    insertTech.run(frontendId, 8, "ReactRouter", "ReactRouter", "https://reactrouter.com/en/main", "ReactRouter", 65, 2.5, 6);
    insertTech.run(frontendId, 9, "FramerMotion", "FramerMotion", "https://www.framer.com/motion/", "FramerMotion", 65, 2, 5);
    insertTech.run(frontendId, 10, "Bootstrap", "Bootstrap", "https://getbootstrap.com/", "Bootstrap", 76, 4, 8);
    insertTech.run(frontendId, 11, "MUI", "MUI", "https://mui.com/material-ui/", "MUI", 68, 2, 5);

    // Backend technologies
    insertTech.run(backendId, 1, "PHP", "PHP", "https://www.php.net/", "PHP", 71, 8, 15);
    insertTech.run(backendId, 2, "MySQL", "MySQL", "https://dev.mysql.com/doc/", "MySql", 67, 8, 13);
    insertTech.run(backendId, 3, "Wordpress", "Wordpress", "https://wordpress.org/documentation/", "Wordpress", 78, 7, 12);
    insertTech.run(backendId, 4, "Laravel", "Laravel", "https://laravel.com/docs/", "Laravel", 63, 3, 4);
    insertTech.run(backendId, 5, "Inertia", "Inertia", "https://inertiajs.com/", "Inertia", 72, 1.5, 3);
    insertTech.run(backendId, 6, "Yii2", "Yii2", "https://www.yiiframework.com/doc/guide/2.0/ru", "Yii", 56, 2, 2);

    // Desktop technologies
    insertTech.run(desktopId, 1, ".NET Framework", ".NET Framework", "https://learn.microsoft.com/en-us/dotnet/framework/", "DotNetFramework", 74, 11, 31);
    insertTech.run(desktopId, 2, "SQLite", "SQLite", "https://www.sqlite.org/", "SQLite", 65, 7, 8);
    insertTech.run(desktopId, 3, "MS SQL Server", "MS SQL Server", "https://learn.microsoft.com/en-us/sql/sql-server", "MSSQLServer", 56, 5, 16);
    insertTech.run(desktopId, 4, "Visual C#", "Visual C#", "https://learn.microsoft.com/en-us/dotnet/csharp/", "CSharp", 75, 11, 31);
    insertTech.run(desktopId, 5, "WPF", "WPF", "https://learn.microsoft.com/en-us/dotnet/desktop/wpf", "Windows", 70, 8, 26);
    insertTech.run(desktopId, 6, "1C", "1C", "https://its.1c.ru/db/v838doc", "OneC", 73, 6, 22);

    // ─── Experience Projects ─────────────────────────────────────────────
    db.prepare(`INSERT INTO resume_experience_projects (text_en, text_ru) VALUES (?, ?)`).run(
      "During my professional career spanning over 10 years in software development, I have independently completed over 50 projects using various technologies. These range from application configurations on the 1C platform and .NET Framework to commercial web projects on PHP and JS utilizing CMS, libraries, and frameworks such as WordPress, Laravel, jQuery, React, and others. Additionally, I actively strive to learn new development and administration technologies such as Node.js, Docker, and Linux.",
      "За время профессиональной деятельности на протяжении уже более 10 лет в области разработки программного обеспечения самостоятельно реализовано более 50 проектов с использованием различных технологий от прикладных конфигураций на платформе 1C, .NET Framework, Excel VBA до коммерческих веб-проектов на PHP и JS с использованием CMS, библиотек и фреймворков Wordpress, Laravel, jQuery, React и пр. Также стараюсь активно заниматься изучением новых технологий разработки и администрирования, Node.JS, Docker, Linux."
    );
  });

  transaction();
  console.log("Resume data seeded successfully");
}
