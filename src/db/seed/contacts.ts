import type Database from "better-sqlite3";

const contactLinks = [
    { sort_order: 1, type: "telegram", title_en: "Telegram", title_ru: "Телеграм", icon: "TelegramIcon", url: "https://t.me/miraxsage", is_visible: 1 },
    { sort_order: 2, type: "email", title_en: "Email", title_ru: "Электронная почта", icon: "EmailIcon", url: "mailto:manin.maxim@mail.ru", is_visible: 1 },
    { sort_order: 3, type: "linkedin", title_en: "LinkedIn", title_ru: "LinkedIn", icon: "LinkedInIcon", url: "https://www.linkedin.com/in/miraxsage", is_visible: 1 },
    { sort_order: 4, type: "github", title_en: "GitHub", title_ru: "Гитхаб", icon: "GitHubIcon", url: "https://github.com/miraxsage/", is_visible: 1 },
];

const pageContent = [
    {
        section: "intro",
        content_en: "Feel free to reach out to me through any of the channels below. I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great.",
        content_ru: "Не стесняйтесь связаться со мной через любой из каналов ниже. Я всегда открыт для обсуждения новых проектов, креативных идей или возможностей стать частью чего-то великого.",
    },
];

export default function seedContacts(db: Database.Database) {
    const count = (db.prepare("SELECT COUNT(*) as cnt FROM contact_info").get() as { cnt: number }).cnt;
    if (count > 0) {
        console.log("Contacts already seeded, skipping");
        return;
    }

    const insertLink = db.prepare(
        "INSERT INTO contact_info (sort_order, type, title_en, title_ru, icon, url, is_visible) VALUES (?, ?, ?, ?, ?, ?, ?)",
    );
    const insertContent = db.prepare(
        "INSERT INTO contact_page_content (section, content_en, content_ru) VALUES (?, ?, ?)",
    );

    const transaction = db.transaction(() => {
        for (const link of contactLinks) {
            insertLink.run(link.sort_order, link.type, link.title_en, link.title_ru, link.icon, link.url, link.is_visible);
        }
        for (const content of pageContent) {
            insertContent.run(content.section, content.content_en, content.content_ru);
        }
    });

    transaction();
    console.log(`Seeded ${contactLinks.length} contact links and ${pageContent.length} page content sections`);
}
