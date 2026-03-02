import type Database from "better-sqlite3";

const headerItems = [
    { sort_order: 1, type: "link", label_en: "About", label_ru: "Резюме", icon: "AssignmentIndIcon", url: "/about", is_visible: 1 },
    { sort_order: 2, type: "link", label_en: "Projects", label_ru: "Проекты", icon: "RocketLaunchIcon", url: "/projects", is_visible: 1 },
    { sort_order: 3, type: "link", label_en: "Interact", label_ru: "Контакты", icon: "CallIcon", url: "/interact", is_visible: 1 },
];

const titleVariants = [
    { sort_order: 1, text_en: "Web", text_ru: "Веб" },
    { sort_order: 2, text_en: "Frontend", text_ru: "Фронтенд" },
    { sort_order: 3, text_en: "Fullstack", text_ru: "Фуллстек" },
];

const buttons = [
    { sort_order: 1, label_en: "About me", label_ru: "Обо мне", icon: "PersonIcon", url: "/about" },
    { sort_order: 2, label_en: "Projects", label_ru: "Проекты", icon: "RocketLaunchIcon", url: "/projects" },
];

const infoBlocks = [
    {
        slug: "hello",
        sort_order: 1,
        title_en: "Hello!",
        title_ru: "Привет!",
        content_en: "My name is Maxim, I'm a web developer. Welcome to my personal portfolio website!",
        content_ru: "Меня зовут Максим, я веб-разработчик. Добро пожаловать на мой персональный сайт-портфолио!",
        illustration: "HelloIllustration",
        image_url: "",
        additional_content_type: "",
        additional_content_data: "",
        is_visible: 1,
    },
    {
        slug: "about-me",
        sort_order: 2,
        title_en: "About me",
        title_ru: "Обо мне",
        content_en: "I'm a passionate fullstack web developer with over 8 years of experience. I specialize in React, TypeScript, and modern frontend technologies.",
        content_ru: "Я увлечённый фуллстек веб-разработчик с более чем 8-летним опытом. Специализируюсь на React, TypeScript и современных фронтенд-технологиях.",
        illustration: "AboutMeIllustration",
        image_url: "",
        additional_content_type: "",
        additional_content_data: "",
        is_visible: 1,
    },
    {
        slug: "skills",
        sort_order: 3,
        title_en: "Skills",
        title_ru: "Навыки",
        content_en: "Proficient in HTML, CSS, JavaScript, TypeScript, React, Redux, and many other modern web technologies. Experienced with both frontend and backend development.",
        content_ru: "Владею HTML, CSS, JavaScript, TypeScript, React, Redux и многими другими современными веб-технологиями. Опыт как во фронтенд, так и в бэкенд разработке.",
        illustration: "SkillsIllustration",
        image_url: "",
        additional_content_type: "",
        additional_content_data: "",
        is_visible: 1,
    },
    {
        slug: "experience",
        sort_order: 4,
        title_en: "Experience",
        title_ru: "Опыт",
        content_en: "Over 8 years of professional development experience across web, desktop, and enterprise applications.",
        content_ru: "Более 8 лет профессионального опыта разработки веб, десктопных и корпоративных приложений.",
        illustration: "ExperienceIllustration",
        image_url: "",
        additional_content_type: "",
        additional_content_data: "",
        is_visible: 1,
    },
    {
        slug: "achievements",
        sort_order: 5,
        title_en: "Achievements",
        title_ru: "Достижения",
        content_en: "Delivered 25+ successful projects, built complex enterprise systems, and developed innovative solutions across multiple domains.",
        content_ru: "Реализовал 25+ успешных проектов, создавал сложные корпоративные системы и разрабатывал инновационные решения в различных областях.",
        illustration: "AchievementsIllustration",
        image_url: "",
        additional_content_type: "",
        additional_content_data: "",
        is_visible: 1,
    },
    {
        slug: "team",
        sort_order: 6,
        title_en: "Teamwork",
        title_ru: "Команда",
        content_en: "Experienced in both solo and team development. Comfortable working in agile environments with cross-functional teams.",
        content_ru: "Опыт как самостоятельной, так и командной разработки. Умею работать в agile-среде с кросс-функциональными командами.",
        illustration: "TeamIllustration",
        image_url: "",
        additional_content_type: "",
        additional_content_data: "",
        is_visible: 1,
    },
];

const footer = [
    {
        content_en: "Manin Maxim © 2024. All rights reserved.",
        content_ru: "Манин Максим © 2024. Все права защищены.",
    },
];

export default function seedLanding(db: Database.Database) {
    const count = (db.prepare("SELECT COUNT(*) as cnt FROM landing_header_items").get() as { cnt: number }).cnt;
    if (count > 0) {
        console.log("Landing already seeded, skipping");
        return;
    }

    const transaction = db.transaction(() => {
        const insertHeader = db.prepare(
            "INSERT INTO landing_header_items (sort_order, type, label_en, label_ru, icon, url, is_visible) VALUES (?, ?, ?, ?, ?, ?, ?)",
        );
        for (const item of headerItems) {
            insertHeader.run(item.sort_order, item.type, item.label_en, item.label_ru, item.icon, item.url, item.is_visible);
        }

        const insertTitle = db.prepare(
            "INSERT INTO landing_title_variants (sort_order, text_en, text_ru) VALUES (?, ?, ?)",
        );
        for (const item of titleVariants) {
            insertTitle.run(item.sort_order, item.text_en, item.text_ru);
        }

        const insertButton = db.prepare(
            "INSERT INTO landing_buttons (sort_order, label_en, label_ru, icon, url) VALUES (?, ?, ?, ?, ?)",
        );
        for (const item of buttons) {
            insertButton.run(item.sort_order, item.label_en, item.label_ru, item.icon, item.url);
        }

        const insertBlock = db.prepare(
            "INSERT INTO landing_info_blocks (slug, sort_order, title_en, title_ru, content_en, content_ru, illustration, image_url, additional_content_type, additional_content_data, is_visible) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        );
        for (const block of infoBlocks) {
            insertBlock.run(
                block.slug, block.sort_order, block.title_en, block.title_ru,
                block.content_en, block.content_ru, block.illustration, block.image_url,
                block.additional_content_type, block.additional_content_data, block.is_visible,
            );
        }

        const insertFooter = db.prepare(
            "INSERT INTO landing_footer (content_en, content_ru) VALUES (?, ?)",
        );
        for (const item of footer) {
            insertFooter.run(item.content_en, item.content_ru);
        }
    });

    transaction();
    console.log(`Seeded landing: ${headerItems.length} header items, ${titleVariants.length} title variants, ${buttons.length} buttons, ${infoBlocks.length} info blocks, ${footer.length} footer items`);
}
