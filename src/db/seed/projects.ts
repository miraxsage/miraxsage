import type Database from "better-sqlite3";

interface ProjectData {
  slug: string;
  name_en: string;
  name_ru: string;
  short_name_en: string;
  short_name_ru: string;
  description_en: string;
  description_ru: string;
  domain: string;
  rating: number;
  year: number;
  status: "developing" | "completed";
  participating: "team" | "selfown";
  dev_time_months: number;
  github_link: string | null;
  images_count: number;
  cover_brightness: "light" | "dark" | null;
  technologies: string[];
}

const projects: ProjectData[] = [
  // ── Web projects ───────────────────────────────────────────────
  {
    slug: "kvll",
    name_en: "Krasnodar construction real estate portal",
    name_ru: "Портал строительной недвижимости Краснодара",
    short_name_en: "Real estate portal",
    short_name_ru: "Портал недвижимости",
    description_en:
      "A large project based on the Yii2 framework, developed by a team of three people. The main direction of the portal is posting real estate advertisements. It has rich functionality of the user's personal account, admin panel, payment system, ad personalization and much more.",
    description_ru:
      "Большой проект на базе фреймворка Yii2, разработанный командой из трех человек. Основное направление портала - размещение объявлений о недвижимости. Имеет богатый функционал личного кабинета пользователя, админ-панели, системы оплаты, персонализации объявлений и многое другое",
    domain: "Real estate",
    rating: 4.6,
    year: 2019,
    status: "completed",
    participating: "team",
    dev_time_months: 14,
    github_link: null,
    images_count: 18,
    cover_brightness: null,
    technologies: ["HTML", "CSS", "JS", "jQuery", "PHP", "Yii2", "MySQL"],
  },
  {
    slug: "webarch-theme",
    name_en: "WebArchitect WordPress Theme",
    name_ru: "Тема WordPress WebArchitect",
    short_name_en: "WebArchitect WP Theme",
    short_name_ru: "Тема WP WebArchitect",
    description_en:
      "The WebArch Theme is a theme designed for the CMS WordPress, offering its own approach to customizing and organizing page content. It introduces a basic universal set of blocks and widgets for individual customization.",
    description_ru:
      "WebArch Theme - тема для CMS WordPress, предлагающая собственный подход к индивидуальной настройке и организации содержимого страницы, вводя базовый универсальный набор блоков и виджетов",
    domain: "Wordpress",
    rating: 4.2,
    year: 2024,
    status: "completed",
    participating: "selfown",
    dev_time_months: 7,
    github_link: "https://github.com/miraxsage/wa-theme",
    images_count: 8,
    cover_brightness: null,
    technologies: ["HTML", "CSS", "JS", "React", "PHP", "Wordpress", "MySQL"],
  },
  {
    slug: "auto-stock",
    name_en: "Website for keeping track of auto parts warehouse balances",
    name_ru: "Сайт учета остатков склада автозапчастей",
    short_name_en: "Auto parts warehouse",
    short_name_ru: "Склад автозапчастей",
    description_en:
      "The parts inventory management system is a specialized solution that offers a web interface for integrating accounting software (1C: Accounting) with warehouse and repair workshop staff.",
    description_ru:
      "Склад учета запчастей – специализированное решение, предлагающий веб-интерфейс интеграции между бухгалтерией (учетной программной 1С:Бухгалтерия) и сотрудниками склада и ремонтно-механического участка.",
    domain: "Retail services",
    rating: 3.9,
    year: 2022,
    status: "completed",
    participating: "selfown",
    dev_time_months: 2,
    github_link: null,
    images_count: 6,
    cover_brightness: null,
    technologies: ["HTML", "CSS", "JS", "Bootstrap", "jQuery", "PHP", "Wordpress", "MySQL", "1C"],
  },
  {
    slug: "thuricum",
    name_en: "Thuricum - insurance company",
    name_ru: "Турикум - страховая компания",
    short_name_en: "Insurance company",
    short_name_ru: "Страховая компания",
    description_en:
      "Thuricum is an insurance company website based in Moscow, offering its visitors a modern, pleasant, responsive, and user-friendly design, as well as a range of online insurance services.",
    description_ru:
      "Турикум – сайт страховой компании в городе Москве, предлагающий своим посетителям современный, приятный, адаптивный и доступный дизайн, а также ряд страховых онлайн сервисов.",
    domain: "Finance",
    rating: 4.4,
    year: 2021,
    status: "completed",
    participating: "team",
    dev_time_months: 4,
    github_link: null,
    images_count: 9,
    cover_brightness: null,
    technologies: ["HTML", "CSS", "JS", "jQuery", "PHP", "Wordpress"],
  },
  {
    slug: "formula",
    name_en: "Health Formula - clinic website",
    name_ru: "Формула здоровья — сайт клиники",
    short_name_en: "Clinic website",
    short_name_ru: "Сайт клиники",
    description_en:
      "Health Formula is a specialized website of a multi-profile clinic in a regional center, offering a unique design, unconventional solutions, conducting regular feedback monitoring, observing in the sphere of pricing, constant updating of data, and informational content.",
    description_ru:
      "Формула здоровья – специализированный сайт многопрофильной клиники регионального центра, предлагающий особенный дизайн, нетривиальные решения, осуществляющей регулярный мониторинг обратной связи, наблюдение в сфере ценообразования, постоянное обновление данных и информационного наполнение.",
    domain: "Healthcare",
    rating: 4.1,
    year: 2021,
    status: "completed",
    participating: "team",
    dev_time_months: 3,
    github_link: null,
    images_count: 11,
    cover_brightness: null,
    technologies: ["HTML", "CSS", "JS", "jQuery", "PHP", "Wordpress", "MySQL"],
  },
  {
    slug: "hs-portal",
    name_en: "HS-PORTAL \u2014 \u0441onstruction company",
    name_ru: "HS-PORTAL \u2014 строительная компания",
    short_name_en: "Construction company",
    short_name_ru: "Строительная компания",
    description_en:
      "HS-Portal is an international premium-class construction organization with branches in Germany and Russia. It specializes in manufacturing sliding patio doors, glazed verandas, and wooden windows.",
    description_ru:
      "HS-Portal \u2013 международная строительная организация премиального класса, имеющая филиалы в Германии и России. Занимается производством раздвижных террасных дверей, остеклённых веранд и деревянных окон.",
    domain: "\u0421onstruction",
    rating: 3.9,
    year: 2020,
    status: "completed",
    participating: "team",
    dev_time_months: 4,
    github_link: null,
    images_count: 7,
    cover_brightness: null,
    technologies: ["HTML", "CSS", "JS", "jQuery", "PHP", "Wordpress", "MySQL"],
  },
  {
    slug: "numerology",
    name_en: "2matrix \u2014 numerology",
    name_ru: "2matrix \u2014 нумерология",
    short_name_en: "Numerology",
    short_name_ru: "Нумерология",
    description_en:
      'The solution based on the Yii2 framework is an online service for providing paid services for individual numerological calculations, compatibility and profession calculations, and \u00ABfate and will\u00BB graphics.',
    description_ru:
      "Решение на базе фреймворка Yii2 представляет собой онлайн сервис оказания платных услуг по индивидуальному нумерологическому расчету, расчету совместимости и профессии, графика \u00ABсудьбы и воли\u00BB.",
    domain: "Retail services",
    rating: 4.3,
    year: 2020,
    status: "completed",
    participating: "team",
    dev_time_months: 3,
    github_link: null,
    images_count: 4,
    cover_brightness: "dark",
    technologies: ["HTML", "CSS", "JS", "jQuery", "PHP", "Yii2", "MySQL"],
  },
  {
    slug: "krocus",
    name_en: "Gas station network Crocus",
    name_ru: "Сеть АЗС Крокус",
    short_name_en: "GSN Crocus",
    short_name_ru: "АЗС Крокус",
    description_en:
      'The website for the \u00ABKrokus\u00BB network of gas stations features integration with a fuel card system, enabling the import of information about cardholders, fuel consumption, and other characteristics from the accounting software 1C. This integration allows customers to access this information through their personal accounts.',
    description_ru:
      "Сайт сети автозаправочных станций \u00ABКрокус\u00BB с интеграцией системы топливных карт, позволяющей импортировать информацию о составе, владельцах топливных карт, расходу топлива и прочих характеристиках из учетной программы 1С, предоставляя клиентам доступ к данной информации посредством личного кабинета. ",
    domain: "Retail services",
    rating: 3.8,
    year: 2019,
    status: "completed",
    participating: "team",
    dev_time_months: 2,
    github_link: null,
    images_count: 4,
    cover_brightness: null,
    technologies: ["HTML", "CSS", "JS", "jQuery", "PHP", "Wordpress"],
  },
  {
    slug: "wordsense",
    name_en: "WordSense - interactive English textbook",
    name_ru: "WordSense - интерактивный учебник английского языка",
    short_name_en: "English textbook",
    short_name_ru: "Учебник английского",
    description_en:
      "A personal pet project aimed at implementing a special service for learning a foreign language using a modern tech stack and unique ideas",
    description_ru:
      "Личный пет-проект, ориентированный на реализацию специального сервиса для изучения иностранного языка с использованием современного стека и собственных уникальных идей",
    domain: "Education",
    rating: 4.2,
    year: 2024,
    status: "developing",
    participating: "selfown",
    dev_time_months: 12,
    github_link: "https://github.com/miraxsage/wordsense",
    images_count: 6,
    cover_brightness: null,
    technologies: [
      "HTML",
      "CSS",
      "JS",
      "Typescript",
      "React",
      "Redux",
      "MUI",
      "FramerMotion",
      "PHP",
      "Laravel",
      "Inertia",
    ],
  },
  {
    slug: "miraxsage",
    name_en: "Miraxsage - Portfolio website",
    name_ru: "Miraxsage - Сайт портфолио",
    short_name_en: "Portfolio website",
    short_name_ru: "Сайт портфолио",
    description_en:
      "A portfolio website built on a modern frontend stack, showcasing a developer's resume, popular projects, skills, and experience.",
    description_ru:
      "Сайт портфолио на современном frontend-стеке, демонстрирующий резюме разработчика, популярные проекты, навыки и опыт",
    domain: "Application solutions",
    rating: 4.7,
    year: 2024,
    status: "completed",
    participating: "selfown",
    dev_time_months: 3,
    github_link: "https://github.com/miraxsage/miraxsage",
    images_count: 6,
    cover_brightness: "dark",
    technologies: ["HTML", "CSS", "JS", "React", "ReactRouter", "Redux", "FramerMotion", "MUI"],
  },

  // ── Desktop projects ───────────────────────────────────────────
  {
    slug: "my-squirrel",
    name_en: "MySquirrel - Personal database management system",
    name_ru: "MySquirrel - Система управления персональными базами данных",
    short_name_en: "PDBMS MySquirrel",
    short_name_ru: "СУПБД MySquirrel",
    description_en:
      "MySquirrel is primarily aimed at consolidating various user data, which often needs to be remembered, stored, and processed, allowing access to the unified node of personal information formed in this way.",
    description_ru:
      "MySquirrel в первую очередь направлена на объединение всевозможных данных пользователей, которые часто приходится запоминать и хранить, обрабатывать, позволяя получать доступ к формируемому подобным образом единому узлу персональной информации",
    domain: "Application solutions",
    rating: 4.4,
    year: 2015,
    status: "completed",
    participating: "selfown",
    dev_time_months: 4,
    github_link: null,
    images_count: 6,
    cover_brightness: null,
    technologies: [".NET Framework", "Visual C#", "WPF", "SQLite"],
  },
  {
    slug: "syntax-resolver",
    name_en: "SyntaxResolver - syntax translator",
    name_ru: "SyntaxResolver - синтаксический транслятор",
    short_name_en: "Syntax translator",
    short_name_ru: "Синтаксический транслятор",
    description_en:
      "A lexical, syntactic analysis, and translation program from the high-level Visual C# language to low-level assembly language",
    description_ru:
      "Программа лексического, синтаксического анализа и трансляции с языка высокого уровня Visual С Sharp на низкоуровневый язык ассемблера",
    domain: "Research",
    rating: 4.1,
    year: 2015,
    status: "completed",
    participating: "selfown",
    dev_time_months: 2,
    github_link: null,
    images_count: 5,
    cover_brightness: null,
    technologies: [".NET Framework", "Visual C#", "WPF"],
  },
  {
    slug: "dep-workflow",
    name_en: "DepWorkflow - department document management program",
    name_ru: "DepWorkflow - программа управления документооборотом отдела",
    short_name_en: "Document management",
    short_name_ru: "Управление документооборотом",
    description_en:
      "The departmental document management program enables storage, tracking, and access control for various departmental documents, with departments including but not limited to departments such as academic departments, human resources, libraries, offices, etc.",
    description_ru:
      "Программа управления документооборотом отдела позволяет хранить, вести учет и разграничивать доступ для различных сотрудников к документам отдела, в качестве которого может выступать кафедра, отдел кадров, библиотека, офис и т. д.",
    domain: "Application solutions",
    rating: 3.9,
    year: 2014,
    status: "completed",
    participating: "selfown",
    dev_time_months: 2,
    github_link: null,
    images_count: 9,
    cover_brightness: null,
    technologies: [".NET Framework", "Visual C#", "WPF", "MS SQL Server"],
  },
  {
    slug: "multi-cropper",
    name_en: "ImageMultiCropper - batch processor for cropping scanned images",
    name_ru: "ImageMultiCropper - пакетный обработчик обрезки сканированных изображений",
    short_name_en: "ImageMultiCropper",
    short_name_ru: "ImageMultiCropper",
    description_en:
      "The application solution involves manual automation of the process of extracting a set of scanned images from a tablet scanner",
    description_ru:
      "Прикладное решение ручной автоматизации процесса извлечения набора сканированных на планшетном сканере изображений",
    domain: "Application solutions",
    rating: 3.9,
    year: 2016,
    status: "completed",
    participating: "selfown",
    dev_time_months: 2,
    github_link: null,
    images_count: 2,
    cover_brightness: "dark",
    technologies: [".NET Framework", "Visual C#", "WPF"],
  },
  {
    slug: "mutual-imaging",
    name_en: "MutualImaging - batch image processing program",
    name_ru: "MutualImaging - программа для пакетной обработки изображений",
    short_name_en: "MutialImaging",
    short_name_ru: "MutialImaging",
    description_en:
      "MutualImaging is conceived as a multitasking batch processor with a wide range of settings, a modern interface, and a convenient configuration approach.",
    description_ru:
      "MutualImaging задумана как многозадачный пакетный обработчик, с большим спектром настроек, современным интерфейсом и удобным подходом конфигурирования",
    domain: "Application solutions",
    rating: 4.1,
    year: 2018,
    status: "completed",
    participating: "selfown",
    dev_time_months: 3,
    github_link: null,
    images_count: 4,
    cover_brightness: "dark",
    technologies: [".NET Framework", "Visual C#", "WPF", "SQLite"],
  },
  {
    slug: "key-macros",
    name_en: "KeyMacros - keystroke emulation macro",
    name_ru: "KeyMacros - макрос эмуляции нажатии клавиш",
    short_name_en: "KeyMacros",
    short_name_ru: "KeyMacros",
    description_en:
      "A utility tool for emulating configured keyboard key presses based on specified keyboard shortcuts.",
    description_ru:
      "Вспомогательная утилита для эмуляции сконфигурированных нажатий клавиш клавиатуры по заданным сокращенным клавиатурным комбинациям",
    domain: "Application solutions",
    rating: 3.9,
    year: 2015,
    status: "completed",
    participating: "selfown",
    dev_time_months: 1,
    github_link: null,
    images_count: 3,
    cover_brightness: "dark",
    technologies: [".NET Framework", "Visual C#", "WPF", "SQLite"],
  },
  {
    slug: "extemal-optimization",
    name_en: "Extreme optimization - multidimensional optimization problems",
    name_ru: "Экстремальная оптимизация - задачи многомерной оптимизации",
    short_name_en: "Extreme optimization",
    short_name_ru: "Экстремальная оптимизация",
    description_en:
      "Automation software for conditional and unconditional optimization tasks in two-, three-, and multi-dimensional domains.",
    description_ru:
      "Программа автоматизации условных и безусловных задач двух-, трех- и многомерной оптимизации",
    domain: "Research",
    rating: 3.5,
    year: 2014,
    status: "completed",
    participating: "selfown",
    dev_time_months: 2,
    github_link: null,
    images_count: 5,
    cover_brightness: null,
    technologies: [".NET Framework", "Visual C#", "WPF"],
  },
  {
    slug: "water-marker",
    name_en: "WaterMarker - Batch processor for images and PDF documents",
    name_ru: "WaterMarker - Пакетный обработчик изображений и PDF-документов",
    short_name_en: "WaterMarker",
    short_name_ru: "WaterMarker",
    description_en:
      "A batch image and PDF document processor primarily enabling compression and conversion to and from PDF, as well as overlaying watermarks",
    description_ru:
      "Пакетный обработчик изображений и PDF-документов, преимущественно позволяющий осуществлять сжатие и конвертацию в и из PDF, а также накладывать водяной знак",
    domain: "Application solutions",
    rating: 3.9,
    year: 2017,
    status: "completed",
    participating: "selfown",
    dev_time_months: 2,
    github_link: null,
    images_count: 1,
    cover_brightness: null,
    technologies: [".NET Framework", "Visual C#", "WPF"],
  },
  {
    slug: "gal-extender",
    name_en: 'GalExtender - Bot for sending information and advertising messages',
    name_ru: "GalExtender - Бот рассылки информационных и рекламных сообщений",
    short_name_en: "GalExtender",
    short_name_ru: "GalExtender",
    description_en:
      'The bot \u00ABGalExtender\u00BB is a software solution (based on .NET Framework and WPF) that automates the distribution of advertising and informational messages on the popular mobile social network / chat \u00ABGalaxy\u00BB',
    description_ru:
      "Бот \u00ABGalExtender\u00BB представляет собой программное решение (на базе .NET Framework и WPF) позволяющее автоматизировать рассылку рекламных и информационных сообщений в популярной мобильной социальной сети / чате \u00ABGalaxy\u00BB (\u00ABГалактика знакомств\u00BB)",
    domain: "Advertising",
    rating: 4.0,
    year: 2018,
    status: "completed",
    participating: "selfown",
    dev_time_months: 3,
    github_link: null,
    images_count: 3,
    cover_brightness: "dark",
    technologies: [".NET Framework", "Visual C#", "WPF", "SQLite"],
  },
  {
    slug: "mtool",
    name_en: "MTool - Interactive teacher journal",
    name_ru: "MTool - Интерактивный журнал преподавателя",
    short_name_en: "Teacher journal",
    short_name_ru: "Журнал преподавателя",
    description_en:
      "MTool is an educational project of a teacher's electronic journal with a colorful, distinctive visual user interface.",
    description_ru:
      "MTool представляет собой учебный проект электронного журнала преподавателя с красочным, особенным визуальным интерфейсом пользователя",
    domain: "Education",
    rating: 3.3,
    year: 2013,
    status: "completed",
    participating: "selfown",
    dev_time_months: 2,
    github_link: null,
    images_count: 4,
    cover_brightness: null,
    technologies: [".NET Framework", "Visual C#", "WPF"],
  },
  {
    slug: "pmk-complectation",
    name_en:
      "PMK Complectation - a software and methodological complex for documenting inventory",
    name_ru: "ПМК Комплектация - программно-методический комплекс учета документации",
    short_name_en: "PMK Complectation",
    short_name_ru: "ПМК Комплектация",
    description_en:
      "PMK Complectation is an application essential for managing document workflow within a department. It enables the tracking of specialties, disciplines, and instructors, as well as the overall documentation.",
    description_ru:
      "ПМК Комплектация \u2013 приложение необходимое для учета документооборота на кафедре. Оно позволяет вести учет специальностей, дисциплин и преподавателей, а также совокупной документации ",
    domain: "Education",
    rating: 3.3,
    year: 2014,
    status: "completed",
    participating: "selfown",
    dev_time_months: 2,
    github_link: null,
    images_count: 6,
    cover_brightness: null,
    technologies: [".NET Framework", "Visual C#", "WPF", "MS SQL Server"],
  },
  {
    slug: "suzrp",
    name_en: "SUZRP - piecework salary accounting for cable production",
    name_ru: "СУЗРП - сдельный учет зарплаты кабельного производства",
    short_name_en: "SUZRP 1C",
    short_name_ru: "СУЗРП 1С",
    description_en:
      "SUZRP (or \u0421\u0423\u0417\u0420\u041F) refers to a specialized configuration developed from scratch on the technological platform 1C:Enterprise 7.7. It addresses the narrow task of operational piecework accounting for completed tasks according to the specific characteristics of cable production",
    description_ru:
      "\u0421\u0423\u0417\u0420\u041F \u2013 специализированная конфигурация, разработанная с нуля на технологической платформе 1С:Предприятие 7.7, реализует узкоспециальную задачу пооперационного сдельного учета выполненных работ согласно специфических особенностей кабельного производства",
    domain: "Finance",
    rating: 4.6,
    year: 2020,
    status: "completed",
    participating: "selfown",
    dev_time_months: 9,
    github_link: null,
    images_count: 5,
    cover_brightness: null,
    technologies: ["1C"],
  },
  {
    slug: "cook-book",
    name_en: "CookBook - Auto-calculation table for product consumption",
    name_ru: "CookBook - Таблица авто-расчета расхода продуктов",
    short_name_en: "CookBook",
    short_name_ru: "CookBook",
    description_en:
      "CookBook is an application implemented as an Excel add-in using VBScript, allowing for the automation of cafeteria food consumption tracking and document formatting procedures.",
    description_ru:
      "CookBook представляет собой прикладное решение, реализованное в виде надстройки для Excel на языке VBScript, позволяющее автоматизировать учет расхода продуктов столовой и процедуру оформления документов",
    domain: "Cooking",
    rating: 3.5,
    year: 2019,
    status: "completed",
    participating: "selfown",
    dev_time_months: 1,
    github_link: null,
    images_count: 3,
    cover_brightness: null,
    technologies: ["Visual C#"],
  },
];

export default function seedProjects(db: Database.Database) {
  const existingCount = db.prepare("SELECT COUNT(*) as count FROM projects").get() as {
    count: number;
  };

  if (existingCount.count > 0) {
    console.log(`Projects table already has ${existingCount.count} rows, skipping seed.`);
    return;
  }

  const insertProject = db.prepare(`
    INSERT INTO projects (
      slug, name_en, name_ru, short_name_en, short_name_ru,
      description_en, description_ru, domain, rating, year,
      status, participating, dev_time_months, github_link,
      images_count, cover_brightness, sort_order
    ) VALUES (
      @slug, @name_en, @name_ru, @short_name_en, @short_name_ru,
      @description_en, @description_ru, @domain, @rating, @year,
      @status, @participating, @dev_time_months, @github_link,
      @images_count, @cover_brightness, @sort_order
    )
  `);

  const insertProjectTechnology = db.prepare(`
    INSERT INTO project_technologies (project_id, technology_id)
    VALUES (@project_id, @technology_id)
  `);

  const findTechnology = db.prepare(`
    SELECT id FROM technologies WHERE name = ?
  `);

  const transaction = db.transaction(() => {
    for (let i = 0; i < projects.length; i++) {
      const p = projects[i];

      const result = insertProject.run({
        slug: p.slug,
        name_en: p.name_en,
        name_ru: p.name_ru,
        short_name_en: p.short_name_en,
        short_name_ru: p.short_name_ru,
        description_en: p.description_en,
        description_ru: p.description_ru,
        domain: p.domain,
        rating: p.rating,
        year: p.year,
        status: p.status,
        participating: p.participating,
        dev_time_months: p.dev_time_months,
        github_link: p.github_link,
        images_count: p.images_count,
        cover_brightness: p.cover_brightness,
        sort_order: i,
      });

      const projectId = result.lastInsertRowid;

      for (const techName of p.technologies) {
        const tech = findTechnology.get(techName) as { id: number } | undefined;
        if (tech) {
          insertProjectTechnology.run({
            project_id: projectId,
            technology_id: tech.id,
          });
        } else {
          console.warn(`  Warning: technology "${techName}" not found for project "${p.slug}"`);
        }
      }
    }
  });

  transaction();
  console.log(`Seeded ${projects.length} projects with technology relationships.`);
}
