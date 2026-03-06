import type Database from "better-sqlite3";

const contactLinks = [
    { sort_order: 1, type: "telegram", title_en: "Telegram", title_ru: "Телеграм", icon: "TelegramIcon", url: "https://t.me/miraxsage", is_visible: 1 },
    { sort_order: 2, type: "email", title_en: "Email", title_ru: "Электронная почта", icon: "EmailIcon", url: "mailto:manin.maxim@mail.ru", is_visible: 1 },
    { sort_order: 3, type: "linkedin", title_en: "LinkedIn", title_ru: "LinkedIn", icon: "LinkedInIcon", url: "https://www.linkedin.com/in/miraxsage", is_visible: 1 },
    { sort_order: 4, type: "github", title_en: "GitHub", title_ru: "Гитхаб", icon: "GitHubIcon", url: "https://github.com/miraxsage/", is_visible: 1 },
];

const pageContent = [
    {
        section: "headline_main",
        content_en: "Thank you!",
        content_ru: "Большое спасибо!",
    },
    {
        section: "headline_sub",
        content_en: "for Your attention",
        content_ru: "за Ваше внимание",
    },
    {
        section: "intro_p1",
        content_en: "I sincerely thank you for visiting my humble website and I truly hope it has managed to evoke positive visual, aesthetic, and functional emotions in you. Perhaps you might even feel inclined to write to me, ask a question, or make a suggestion. Honestly, I would be very happy to receive your feedback.",
        content_ru: "Я Вас сердечно благодарю за посещение моего скромного сайта и очень надеюсь, что у него получилось вызвать у Вас положительные эмоции визуального, эстетического, функционального плана и, возможно, Вам захотелось написать мне, задать вопрос или сделать предложение. Честно говоря, я буду очень рад получить от Вас обратную связь.",
    },
    {
        section: "intro_p2",
        content_en: "You can send me a message via one of the listed social networks (I use Telegram more often), by email, or directly on this page using the feedback form below.",
        content_ru: "Вы можете отправить мне сообщение в одной из указанных соцсетей (я чаще использую Telegram), по электронной почте или написать его прямо на этой странице через форму обратной связи ниже.",
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
