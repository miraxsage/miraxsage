import { TechnologiesList } from "../About/Blocks/specs/Technologies";

export type ProjectInterface = {
    slug: string;
    name: { ru: string; en: string };
    shortName: { ru: string; en: string };
    description: { ru: string; en: string };
    domain: string;
    rating: number;
    year: number;
    status: "developing" | "completed";
    participating: "team" | "selfown";
    devTimeMonths: number;
    gitHubLink?: string;
    technologies: TechnologiesList[];
    images: number;
    coverBrightmess?: "ligth" | "dark";
};

export type ProjectsType = typeof projects;

export type ProjectsList = ProjectsType[number & keyof ProjectsType]["slug"];

export function isProjectSlug(slug: string): slug is ProjectsList {
    return projects.some((p) => p.slug == slug);
}

export const projects = [
    //web
    {
        slug: "kvll",
        name: { en: "Krasnodar construction real estate portal", ru: "Портал строительной недвижимости Краснодара" },
        shortName: { en: "Real estate portal", ru: "Портал недвижимости" },
        description: {
            en: "A large project based on the Yii2 framework, developed by a team of three people. The main direction of the portal is posting real estate advertisements. It has rich functionality of the user’s personal account, admin panel, payment system, ad personalization and much more.",
            ru: "Большой проект на базе фреймворка Yii2, разработанный командой из трех человек. Основное направление портала - размещение объявлений о недвижимости. Имеет богатый функционал личного кабинета пользователя, админ-панели, системы оплаты, персонализации объявлений и многое другое",
        },
        domain: "Real estate",
        rating: 4.6,
        year: 2019,
        status: "completed",
        participating: "team",
        devTimeMonths: 14,
        technologies: ["HTML", "CSS", "JS", "JQuery", "PHP", "Yii2", "MySQL"],
        images: 18,
    },
    {
        slug: "webarch-theme",
        name: { en: "WebArchitect WordPress Theme", ru: "Тема WordPress WebArchitect" },
        shortName: { en: "WebArchitect WP Theme", ru: "Тема WP WebArchitect" },
        description: {
            en: "The WebArch Theme is a theme designed for the CMS WordPress, offering its own approach to customizing and organizing page content. It introduces a basic universal set of blocks and widgets for individual customization.",
            ru: "WebArch Theme - тема для CMS WordPress, предлагающая собственный подход к индивидуальной настройке и организации содержимого страницы, вводя базовый универсальный набор блоков и виджетов",
        },
        domain: "Wordpress",
        rating: 4.2,
        year: 2024,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 7,
        gitHubLink: "https://github.com/miraxsage/wa-theme",
        technologies: ["HTML", "CSS", "JS", "React", "PHP", "Wordpress", "MySQL"],
        images: 8,
    },
    {
        slug: "auto-stock",
        name: {
            en: "Website for keeping track of auto parts warehouse balances",
            ru: "Сайт учета остатков склада автозапчастей",
        },
        shortName: { en: "Auto parts warehouse", ru: "Склад автозапчастей" },
        description: {
            en: "The parts inventory management system is a specialized solution that offers a web interface for integrating accounting software (1C: Accounting) with warehouse and repair workshop staff.",
            ru: "Склад учета запчастей – специализированное решение, предлагающий веб-интерфейс интеграции между бухгалтерией (учетной программной 1С:Бухгалтерия) и сотрудниками склада и ремонтно-механического участка.",
        },
        domain: "Retail services",
        rating: 3.9,
        year: 2022,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 2,
        technologies: ["HTML", "CSS", "JS", "Bootstrap", "JQuery", "PHP", "Wordpress", "MySQL", "1C"],
        images: 6,
    },
    {
        slug: "thuricum",
        name: { en: "Thuricum - insurance company", ru: "Турикум - страховая компания" },
        shortName: { en: "Insurance company", ru: "Страховая компания" },
        description: {
            en: "Thuricum is an insurance company website based in Moscow, offering its visitors a modern, pleasant, responsive, and user-friendly design, as well as a range of online insurance services.",
            ru: "Турикум – сайт страховой компании в городе Москве, предлагающий своим посетителям современный, приятный, адаптивный и доступный дизайн, а также ряд страховых онлайн сервисов.",
        },
        domain: "Finance",
        rating: 4.4,
        year: 2021,
        status: "completed",
        participating: "team",
        devTimeMonths: 4,
        technologies: ["HTML", "CSS", "JS", "JQuery", "PHP", "Wordpress"],
        images: 9,
    },
    {
        slug: "formula",
        name: { en: "Health Formula - clinic website", ru: "Формула здоровья — сайт клиники" },
        shortName: { en: "Clinic website", ru: "Сайт клиники" },
        description: {
            en: "Health Formula is a specialized website of a multi-profile clinic in a regional center, offering a unique design, unconventional solutions, conducting regular feedback monitoring, observing in the sphere of pricing, constant updating of data, and informational content.",
            ru: "Формула здоровья – специализированный сайт многопрофильной клиники регионального центра, предлагающий особенный дизайн, нетривиальные решения, осуществляющей регулярный мониторинг обратной связи, наблюдение в сфере ценообразования, постоянное обновление данных и информационного наполнение.",
        },
        domain: "Healthcare",
        rating: 4.1,
        year: 2021,
        status: "completed",
        participating: "team",
        devTimeMonths: 3,
        technologies: ["HTML", "CSS", "JS", "JQuery", "PHP", "Wordpress", "MySQL"],
        images: 11,
    },
    {
        slug: "hs-portal",
        name: { en: "HS-PORTAL — сonstruction company", ru: "HS-PORTAL — строительная компания" },
        shortName: { en: "Construction company", ru: "Строительная компания" },
        description: {
            en: "HS-Portal is an international premium-class construction organization with branches in Germany and Russia. It specializes in manufacturing sliding patio doors, glazed verandas, and wooden windows.",
            ru: "HS-Portal – международная строительная организация премиального класса, имеющая филиалы в Германии и России. Занимается производством раздвижных террасных дверей, остеклённых веранд и деревянных окон.",
        },
        domain: "Сonstruction",
        rating: 3.9,
        year: 2020,
        status: "completed",
        participating: "team",
        devTimeMonths: 4,
        technologies: ["HTML", "CSS", "JS", "JQuery", "PHP", "Wordpress", "MySQL"],
        images: 7,
    },
    {
        slug: "numerology",
        name: { en: "2matrix — numerology", ru: "2matrix — нумерология" },
        shortName: { en: "Numerology", ru: "Нумерология" },
        description: {
            en: "The solution based on the Yii2 framework is an online service for providing paid services for individual numerological calculations, compatibility and profession calculations, and «fate and will» graphics.",
            ru: "Решение на базе фреймворка Yii2 представляет собой онлайн сервис оказания платных услуг по индивидуальному нумерологическому расчету, расчету совместимости и профессии, графика «судьбы и воли».",
        },
        domain: "Retail services",
        rating: 4.3,
        year: 2020,
        status: "completed",
        participating: "team",
        devTimeMonths: 3,
        technologies: ["HTML", "CSS", "JS", "JQuery", "PHP", "Yii2", "MySQL"],
        images: 4,
        coverBrightmess: "dark",
    },
    {
        slug: "krocus",
        name: { en: "Gas station network Crocus", ru: "Сеть АЗС Крокус" },
        shortName: { en: "GSN Crocus", ru: "АЗС Крокус" },
        description: {
            en: "The website for the «Krokus» network of gas stations features integration with a fuel card system, enabling the import of information about cardholders, fuel consumption, and other characteristics from the accounting software 1C. This integration allows customers to access this information through their personal accounts.",
            ru: "Сайт сети автозаправочных станций «Крокус» с интеграцией системы топливных карт, позволяющей импортировать информацию о составе, владельцах топливных карт, расходу топлива и прочих характеристиках из учетной программы 1С, предоставляя клиентам доступ к данной информации посредством личного кабинета. ",
        },
        domain: "Retail services",
        rating: 3.8,
        year: 2019,
        status: "completed",
        participating: "team",
        devTimeMonths: 2,
        technologies: ["HTML", "CSS", "JS", "JQuery", "PHP", "Wordpress"],
        images: 4,
    },
    {
        slug: "wordsense",
        name: {
            en: "WordSense - interactive English textbook",
            ru: "WordSense - интерактивный учебник английского языка",
        },
        shortName: { en: "English textbook", ru: "Учебник английского" },
        description: {
            en: "A personal pet project aimed at implementing a special service for learning a foreign language using a modern tech stack and unique ideas",
            ru: "Личный пет-проект, ориентированный на реализацию специального сервиса для изучения иностранного языка с использованием современного стека и собственных уникальных идей",
        },
        domain: "Education",
        rating: 4.2,
        year: 2024,
        status: "developing",
        participating: "selfown",
        devTimeMonths: 12,
        gitHubLink: "https://github.com/miraxsage/wordsense",
        technologies: ["HTML", "CSS", "JS", "React", "Redux", "MUI", "FramerMotion", "PHP", "Laravel", "Inertia"],
        images: 6,
    },
    {
        slug: "miraxsage",
        name: { en: "Miraxsage - Portfolio website", ru: "Miraxsage - Сайт портфолио" },
        shortName: { en: "Portfolio website", ru: "Сайт портфолио" },
        description: {
            en: "A portfolio website built on a modern frontend stack, showcasing a developer's resume, popular projects, skills, and experience.",
            ru: "Сайт портфолио на современном frontend-стеке, демонстрирующий резюме разработчика, популярные проекты, навыки и опыт",
        },
        domain: "Application solutions",
        rating: 4.7,
        year: 2024,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 3,
        technologies: ["HTML", "CSS", "JS", "React", "ReactRouter", "Redux", "FramerMotion", "MUI"],
        gitHubLink: "https://github.com/miraxsage/miraxsage",
        images: 6,
        coverBrightmess: "dark",
    },

    //desktop
    {
        slug: "my-squirrel",
        name: {
            en: "MySquirrel - Personal database management system",
            ru: "MySquirrel - Система управления персональными базами данных",
        },
        shortName: { en: "PDBMS MySquirrel", ru: "СУПБД MySquirrel" },
        description: {
            en: "MySquirrel is primarily aimed at consolidating various user data, which often needs to be remembered, stored, and processed, allowing access to the unified node of personal information formed in this way.",
            ru: "MySquirrel в первую очередь направлена на объединение всевозможных данных пользователей, которые часто приходится запоминать и хранить, обрабатывать, позволяя получать доступ к формируемому подобным образом единому узлу персональной информации",
        },
        domain: "Application solutions",
        rating: 4.4,
        year: 2015,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 4,
        technologies: [".NET Framework", "Visual C#", "WPF", "SQLite"],
        images: 6,
    },
    {
        slug: "syntax-resolver",
        name: { en: "SyntaxResolver - syntax translator", ru: "SyntaxResolver - синтаксический транслятор" },
        shortName: { en: "Syntax translator", ru: "Синтаксический транслятор" },
        description: {
            en: "A lexical, syntactic analysis, and translation program from the high-level Visual C# language to low-level assembly language",
            ru: "Программа лексического, синтаксического анализа и трансляции с языка высокого уровня Visual С Sharp на низкоуровневый язык ассемблера",
        },
        domain: "Research",
        rating: 4.1,
        year: 2015,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 2,
        technologies: [".NET Framework", "Visual C#", "WPF"],
        images: 5,
    },
    {
        slug: "dep-workflow",
        name: {
            en: "DepWorkflow - department document management program",
            ru: "DepWorkflow - программа управления документооборотом отдела",
        },
        shortName: { en: "Document management", ru: "Управление документооборотом" },
        description: {
            en: "The departmental document management program enables storage, tracking, and access control for various departmental documents, with departments including but not limited to departments such as academic departments, human resources, libraries, offices, etc.",
            ru: "Программа управления документооборотом отдела позволяет хранить, вести учет и разграничивать доступ для различных сотрудников к документам отдела, в качестве которого может выступать кафедра, отдел кадров, библиотека, офис и т. д.",
        },
        domain: "Application solutions",
        rating: 3.9,
        year: 2014,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 2,
        technologies: [".NET Framework", "Visual C#", "WPF", "MS SQL Server"],
        images: 9,
    },
    {
        slug: "multi-cropper",
        name: {
            en: "ImageMultiCropper - batch processor for cropping scanned images",
            ru: "ImageMultiCropper - пакетный обработчик обрезки сканированных изображений",
        },
        shortName: { en: "ImageMultiCropper", ru: "ImageMultiCropper" },
        description: {
            en: "The application solution involves manual automation of the process of extracting a set of scanned images from a tablet scanner",
            ru: "Прикладное решение ручной автоматизации процесса извлечения набора сканированных на планшетном сканере изображений",
        },
        domain: "Application solutions",
        rating: 3.9,
        year: 2016,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 2,
        technologies: [".NET Framework", "Visual C#", "WPF"],
        images: 2,
        coverBrightmess: "dark",
    },
    {
        slug: "mutual-imaging",
        name: {
            en: "MutualImaging - batch image processing program",
            ru: "MutualImaging - программа для пакетной обработки изображений",
        },
        shortName: { en: "MutialImaging", ru: "MutialImaging" },
        description: {
            en: "MutualImaging is conceived as a multitasking batch processor with a wide range of settings, a modern interface, and a convenient configuration approach.",
            ru: "MutualImaging задумана как многозадачный пакетный обработчик, с большим спектром настроек, современным интерфейсом и удобным подходом конфигурирования",
        },
        domain: "Application solutions",
        rating: 4.1,
        year: 2018,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 3,
        technologies: [".NET Framework", "Visual C#", "WPF", "SQLite"],
        images: 4,
        coverBrightmess: "dark",
    },
    {
        slug: "key-macros",
        name: { en: "KeyMacros - keystroke emulation macro", ru: "KeyMacros - макрос эмуляции нажатии клавиш" },
        shortName: { en: "KeyMacros", ru: "KeyMacros" },
        description: {
            en: "A utility tool for emulating configured keyboard key presses based on specified keyboard shortcuts.",
            ru: "Вспомогательная утилита для эмуляции сконфигурированных нажатий клавиш клавиатуры по заданным сокращенным клавиатурным комбинациям",
        },
        domain: "Application solutions",
        rating: 3.9,
        year: 2015,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 1,
        technologies: [".NET Framework", "Visual C#", "WPF", "SQLite"],
        images: 3,
        coverBrightmess: "dark",
    },
    {
        slug: "extemal-optimization",
        name: {
            en: "Extreme optimization - multidimensional optimization problems",
            ru: "Экстремальная оптимизация - задачи многомерной оптимизации",
        },
        shortName: { en: "Extreme optimization", ru: "Экстремальная оптимизация" },
        description: {
            en: "Automation software for conditional and unconditional optimization tasks in two-, three-, and multi-dimensional domains.",
            ru: "Программа автоматизации условных и безусловных задач двух-, трех- и многомерной оптимизации",
        },
        domain: "Research",
        rating: 3.5,
        year: 2014,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 2,
        technologies: [".NET Framework", "Visual C#", "WPF"],
        images: 5,
    },
    {
        slug: "water-marker",
        name: {
            en: "WaterMarker - Batch processor for images and PDF documents",
            ru: "WaterMarker - Пакетный обработчик изображений и PDF-документов",
        },
        shortName: { en: "WaterMarker", ru: "WaterMarker" },
        description: {
            en: "A batch image and PDF document processor primarily enabling compression and conversion to and from PDF, as well as overlaying watermarks",
            ru: "Пакетный обработчик изображений и PDF-документов, преимущественно позволяющий осуществлять сжатие и конвертацию в и из PDF, а также накладывать водяной знак",
        },
        domain: "Application solutions",
        rating: 3.9,
        year: 2017,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 2,
        technologies: [".NET Framework", "Visual C#", "WPF"],
        images: 1,
    },
    {
        slug: "gal-extender",
        name: {
            en: "GalExtender - Bot for sending information and advertising messages",
            ru: "GalExtender - Бот рассылки информационных и рекламных сообщений",
        },
        shortName: { en: "GalExtender", ru: "GalExtender" },
        description: {
            en: "The bot «GalExtender» is a software solution (based on .NET Framework and WPF) that automates the distribution of advertising and informational messages on the popular mobile social network / chat «Galaxy»",
            ru: "Бот «GalExtender» представляет собой программное решение (на базе .NET Framework и WPF) позволяющее автоматизировать рассылку рекламных и информационных сообщений в популярной мобильной социальной сети / чате «Galaxy» («Галактика знакомств»)",
        },
        domain: "Advertising",
        rating: 4.0,
        year: 2018,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 3,
        technologies: [".NET Framework", "Visual C#", "WPF", "SQLite"],
        images: 3,
        coverBrightmess: "dark",
    },
    {
        slug: "mtool",
        name: { en: "MTool - Interactive teacher journal", ru: "MTool - Интерактивный журнал преподавателя" },
        shortName: { en: "Teacher journal", ru: "Журнал преподавателя" },
        description: {
            en: "MTool is an educational project of a teacher's electronic journal with a colorful, distinctive visual user interface.",
            ru: "MTool представляет собой учебный проект электронного журнала преподавателя с красочным, особенным визуальным интерфейсом пользователя",
        },
        domain: "Education",
        rating: 3.3,
        year: 2013,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 2,
        technologies: [".NET Framework", "Visual C#", "WPF"],
        images: 4,
    },
    {
        slug: "pmk-complectation",
        name: {
            en: "PMK Complectation - a software and methodological complex for documenting inventory",
            ru: "ПМК Комплектация - программно-методический комплекс учета документации",
        },
        shortName: { en: "PMK Complectation", ru: "ПМК Комплектация" },
        description: {
            en: "PMK Complectation is an application essential for managing document workflow within a department. It enables the tracking of specialties, disciplines, and instructors, as well as the overall documentation.",
            ru: "ПМК Комплектация – приложение необходимое для учета документооборота на кафедре. Оно позволяет вести учет специальностей, дисциплин и преподавателей, а также совокупной документации ",
        },
        domain: "Education",
        rating: 3.3,
        year: 2014,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 2,
        technologies: [".NET Framework", "Visual C#", "WPF", "MS SQL Server"],
        images: 6,
    },
    {
        slug: "suzrp",
        name: {
            en: "SUZRP - piecework salary accounting for cable production",
            ru: "СУЗРП - сдельный учет зарплаты кабельного производства",
        },
        shortName: { en: "SUZRP 1C", ru: "СУЗРП 1С" },
        description: {
            en: "SUZRP (or СУЗРП) refers to a specialized configuration developed from scratch on the technological platform 1C:Enterprise 7.7. It addresses the narrow task of operational piecework accounting for completed tasks according to the specific characteristics of cable production",
            ru: "СУЗРП – специализированная конфигурация, разработанная с нуля на технологической платформе 1С:Предприятие 7.7, реализует узкоспециальную задачу пооперационного сдельного учета выполненных работ согласно специфических особенностей кабельного производства",
        },
        domain: "Finance",
        rating: 4.6,
        year: 2020,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 9,
        technologies: ["1C"],
        images: 5,
    },
    {
        slug: "cook-book",
        name: {
            en: "CookBook - Auto-calculation table for product consumption",
            ru: "CookBook - Таблица авто-расчета расхода продуктов",
        },
        shortName: { en: "CookBook", ru: "CookBook" },
        description: {
            en: "CookBook is an application implemented as an Excel add-in using VBScript, allowing for the automation of cafeteria food consumption tracking and document formatting procedures.",
            ru: "CookBook представляет собой прикладное решение, реализованное в виде надстройки для Excel на языке VBScript, позволяющее автоматизировать учет расхода продуктов столовой и процедуру оформления документов",
        },
        domain: "Cooking",
        rating: 3.5,
        year: 2019,
        status: "completed",
        participating: "selfown",
        devTimeMonths: 1,
        technologies: ["Visual C#"],
        images: 3,
    },
] as const satisfies ProjectInterface[];
