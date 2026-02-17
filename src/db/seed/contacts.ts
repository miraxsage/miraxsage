import type Database from "better-sqlite3";

const contactLinks = [
    { sort_order: 1, type: "telegram", title: "Telegram", icon: "TelegramIcon", url: "https://t.me/miraxsage", is_visible: 1 },
    { sort_order: 2, type: "email", title: "Email", icon: "EmailIcon", url: "mailto:manin.maxim@mail.ru", is_visible: 1 },
    { sort_order: 3, type: "linkedin", title: "LinkedIn", icon: "LinkedInIcon", url: "https://www.linkedin.com/in/miraxsage", is_visible: 1 },
    { sort_order: 4, type: "github", title: "GitHub", icon: "GitHubIcon", url: "https://github.com/miraxsage/", is_visible: 1 },
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
        "INSERT INTO contact_info (sort_order, type, title, icon, url, is_visible) VALUES (?, ?, ?, ?, ?, ?)",
    );
    const insertContent = db.prepare(
        "INSERT INTO contact_page_content (section, content_en, content_ru) VALUES (?, ?, ?)",
    );

    const transaction = db.transaction(() => {
        for (const link of contactLinks) {
            insertLink.run(link.sort_order, link.type, link.title, link.icon, link.url, link.is_visible);
        }
        for (const content of pageContent) {
            insertContent.run(content.section, content.content_en, content.content_ru);
        }
    });

    transaction();
    console.log(`Seeded ${contactLinks.length} contact links and ${pageContent.length} page content sections`);
}
