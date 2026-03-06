import type Database from "better-sqlite3";

const labels = [
    // ── details_navigation ──────────────────────────────────────────────
    { key: "Home", value_en: "Home", value_ru: "Главная", category: "details_navigation" },
    { key: "Resume", value_en: "Resume", value_ru: "Резюме", category: "details_navigation" },
    { key: "Portfolio", value_en: "Portfolio", value_ru: "Портфолио", category: "details_navigation" },
    { key: "Interact", value_en: "Interact", value_ru: "Контакты", category: "details_navigation" },
    { key: "Download PDF", value_en: "Download PDF", value_ru: "Скачать PDF", category: "details_navigation" },
    { key: "Write", value_en: "Write", value_ru: "Написать", category: "details_navigation" },
    { key: "Resume filename", value_en: "Resume (Miraxsage)", value_ru: "Резюме (Miraxsage)", category: "details_navigation" },

    // ── details_ui ──────────────────────────────────────────────────────
    { key: "Dark mode", value_en: "Dark mode", value_ru: "Темная тема", category: "details_ui" },
    { key: "Light mode", value_en: "Light mode", value_ru: "Светлая тема", category: "details_ui" },
    { key: "English", value_en: "English", value_ru: "Английский", category: "details_ui" },
    { key: "Русский язык", value_en: "Русский язык", value_ru: "Русский язык", category: "details_ui" },
    { key: "Full screen", value_en: "Full screen", value_ru: "Во весь экран", category: "details_ui" },
    { key: "In window", value_en: "In window", value_ru: "В окне", category: "details_ui" },
    { key: "Console", value_en: "Console", value_ru: "Консоль", category: "details_ui" },
    { key: "User interface", value_en: "User interface", value_ru: "Интерфейс", category: "details_ui" },

    // ── landing ─────────────────────────────────────────────────────────
    { key: "developer", value_en: "developer", value_ru: "разработчик", category: "landing" },
    { key: "resume", value_en: "resume", value_ru: "резюме", category: "landing" },
    { key: "portfolio", value_en: "portfolio", value_ru: "портфолио", category: "landing" },
    { key: "message", value_en: "message", value_ru: "сообщение", category: "landing" },

    // ── resume_general ──────────────────────────────────────────────────
    { key: "present time", value_en: "present time", value_ru: "настоящее время", category: "resume_general" },
    { key: "Level", value_en: "Level", value_ru: "Уровень", category: "resume_general" },
    { key: "Experience", value_en: "Experience", value_ru: "Опыт", category: "resume_general" },
    { key: "Technology", value_en: "Technology", value_ru: "Технология", category: "resume_general" },
    { key: "Proficiency level", value_en: "Proficiency level", value_ru: "Уровень владения", category: "resume_general" },
    { key: "Visualization", value_en: "Visualization", value_ru: "Визуализация", category: "resume_general" },
    { key: "Spread", value_en: "Spread", value_ru: "Распределение", category: "resume_general" },
    { key: "Statistic", value_en: "Statistic", value_ru: "Статистика", category: "resume_general" },
    { key: "Projects_tab", value_en: "Projects", value_ru: "Проектов", category: "resume_general" },
    { key: "Projects_tab_alt", value_en: "Projects", value_ru: "Портфолио", category: "resume_general" },
    { key: "Skills_tab", value_en: "Skills", value_ru: "Навыки", category: "resume_general" },

    // ── projects_general ────────────────────────────────────────────────
    { key: "Full name", value_en: "Full name", value_ru: "Полное наименование", category: "projects_general" },
    { key: "Description", value_en: "Description", value_ru: "Описание", category: "projects_general" },
    { key: "Technologies", value_en: "Technologies", value_ru: "Технологии", category: "projects_general" },
    { key: "Domain area", value_en: "Domain area", value_ru: "Доменная область", category: "projects_general" },
    { key: "Rating", value_en: "Rating", value_ru: "Рейтинг", category: "projects_general" },
    { key: "Year", value_en: "Year", value_ru: "Год", category: "projects_general" },
    { key: "Status", value_en: "Status", value_ru: "Статус", category: "projects_general" },
    { key: "Participating", value_en: "Participating", value_ru: "Участие в разработке", category: "projects_general" },
    { key: "Development period", value_en: "Development period", value_ru: "Период разрабоки", category: "projects_general" },
    { key: "Github link", value_en: "Github link", value_ru: "Ссылка на Github", category: "projects_general" },
    { key: "mon.", value_en: "mon.", value_ru: "мес.", category: "projects_general" },
    { key: "Previous", value_en: "Previous", value_ru: "Предыдущий", category: "projects_general" },
    { key: "Previous_alt", value_en: "Previous", value_ru: "Предыдущее", category: "projects_general" },
    { key: "Next", value_en: "Next", value_ru: "Следующий", category: "projects_general" },
    { key: "Next_alt", value_en: "Next", value_ru: "Следующее", category: "projects_general" },
    { key: "All projects", value_en: "All projects", value_ru: "Все проекты", category: "projects_general" },
    { key: "All chosen projects", value_en: "All chosen projects", value_ru: "Все выбранные проекты", category: "projects_general" },
    { key: "Zoom_in", value_en: "Zoom in", value_ru: "Крупнее", category: "projects_general" },
    { key: "Zoom_out", value_en: "Zoom out", value_ru: "Мельче", category: "projects_general" },
    { key: "Back", value_en: "Back", value_ru: "Назад", category: "projects_general" },
    { key: "To description", value_en: "To description", value_ru: "К описанию", category: "projects_general" },

    // ── contacts_general ────────────────────────────────────────────────
    { key: "Social networks", value_en: "Social networks", value_ru: "Социальные сети", category: "contacts_general" },
    { key: "Feedback", value_en: "Feedback", value_ru: "Обратная связь", category: "contacts_general" },
    { key: "Your name", value_en: "Your name", value_ru: "Ваше имя", category: "contacts_general" },
    { key: "Email address", value_en: "Email address", value_ru: "Адрес электронной почты", category: "contacts_general" },
    { key: "Appeal's subject", value_en: "Appeal's subject", value_ru: "Тема обращения", category: "contacts_general" },
    { key: "Message", value_en: "Message", value_ru: "Сообщение", category: "contacts_general" },
    { key: "Partnership proposition", value_en: "Partnership proposition", value_ru: "Предложение о сотрудничестве", category: "contacts_general" },
    { key: "Job offer", value_en: "Job offer", value_ru: "Приглашение на работу", category: "contacts_general" },
    { key: "Thanks letter", value_en: "Thanks letter", value_ru: "Благодарственное письмо", category: "contacts_general" },
    { key: "Resume / portfolio question", value_en: "Resume / portfolio question", value_ru: "Вопрос о резюме / портфолио", category: "contacts_general" },
    { key: "Other", value_en: "Other", value_ru: "Другое", category: "contacts_general" },
    { key: "Submit", value_en: "Submit", value_ru: "Отправить", category: "contacts_general" },
];

export default function seedUiLabels(db: Database.Database) {
    const count = (db.prepare("SELECT COUNT(*) as cnt FROM ui_labels").get() as { cnt: number }).cnt;
    if (count > 0) {
        console.log("UI labels already seeded, skipping");
        return;
    }

    const transaction = db.transaction(() => {
        const insert = db.prepare(
            "INSERT INTO ui_labels (key, value_en, value_ru, category) VALUES (?, ?, ?, ?)",
        );
        for (const label of labels) {
            insert.run(label.key, label.value_en, label.value_ru, label.category);
        }
    });

    transaction();
    console.log(`Seeded ${labels.length} UI labels`);
}
