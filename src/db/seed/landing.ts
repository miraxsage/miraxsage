import type Database from "better-sqlite3";

const headerItems = [
    { sort_order: 1, type: "link", label_en: "Resume", label_ru: "Резюме", icon: "AssignmentIndIcon", url: "/about", is_visible: 1 },
    { sort_order: 2, type: "link", label_en: "Portfolio", label_ru: "Портфолио", icon: "RocketLaunchIcon", url: "/projects", is_visible: 1 },
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
        title_en: "Hello [everyone] 👋",
        title_ru: "Всем [привет] 👋",
        content_en: "My name is Maxim and I am a _workaholic_ web-developer 🙂‍.\nLet's get acquainted just a bit. On this page I will tell you a little about myself, my skills and experience.\n\nYou can always view my detailed [resume](/about) 📜 and [portfolio](/projects) 💼 by clicking on the appropriate links in each of the blocks or at the beginning of the page.",
        content_ru: "Меня зовут Максим и я _трудоголик_ веб-разработчик 🙂‍.\nДавайте немного познакомимся. На этой страничке я расскажу чуть чуть о себе, о своих навыках и опыте.\n\nВы всегда можете изучить мое подробное [резюме](/about) 📜 и [портфолио](/projects) 💼, перейдя по соответствующим ссылкам в каждом из блоков или начале страницы.",
        illustration: "DeveloperIllustration",

        is_visible: 1,
    },
    {
        slug: "about-me",
        sort_order: 2,
        title_en: "About [me] 👨‍💻",
        title_ru: "Обо [мне] 👨‍💻",
        content_en: "I became passionate about programming 📟 and web development back in 2010 when I was in the 11th grade 🌱. Even then, I enjoyed creating complex, beautiful, and functional interfaces. 📱\n\nIn 2015, I graduated with honors 📕 from [university](/about/biography/education) 🏦 with a degree in Information Technology.\n\nFrom then on and to this day, I have never lost my creative interest and inspiration for programming. I love designing, sometimes spending hours fixing a single bug 🐞, but always finding a solution in the end. ⛅️",
        content_ru: "Программированием 📟 и веб-разработкой я увлекся еще в 11 классе 🌱, далеком 2010-м.\n\nЕще тогда мне нравилось собирать сложные, красивые и функциональные интерфейсы. 📱\n\nВ 2015 с красным дипломом 📕 окончил [университет](/about/biography/education) 🏦 по профильному направлению информационных технологий.\n\nПрежде и до сих пор не теряю творческого интереса и вдохновения программировать, проектировать, порой часами исправлять единственный баг 🐞, но в итоге все равно всегда находить творческое решение. ⛅️",
        illustration: "WebDeveloperIllustration",

        is_visible: 1,
    },
    {
        slug: "skills",
        sort_order: 3,
        title_en: "About [skills] 💪",
        title_ru: "Про [навыки] 💪",
        content_en: "For over 10 years, I have had the opportunity to work with a wide range of languages, platforms, and tools, from .NET Framework 3.0-4.5 in C# and Android in Java to 1C:Enterprise.\n\nDespite this, my particular passion ✨ lies in web and frontend development, I never stop improving my [skills](/about/specifications/soft-skills) 🤸‍♀️ and exploring new [technologies](/about/specifications/hard-skills) 🏋️‍♀️. Here are some of the technologies I frequently work with nowadays:",
        content_ru: "За более чем 10 лет удалось попробовать не малое количество языков, платформ и инструментов от .NET Framework 3.0-4.5 на С#, Android на Java до 1С:Предприятие.\n\nХотя я не скрываю свою особенную любовь ✨ к веб и фронтенд-разработке, я не останавливаюсь в совершенствовании своих [навыков](/about/specifications/soft-skills) 🤸‍♀️ и изучении новых [технологий](/about/specifications/hard-skills) 🏋️‍♀️. Те из них, с которыми я работаю в последнее время особенно часто:",
        illustration: "SkillsIllustration",

        is_visible: 1,
    },
    {
        slug: "experience",
        sort_order: 4,
        title_en: "About [experience] 💎",
        title_ru: "Про [опыт] 💎",
        content_en: "Based on my profile, I have developed professional desktop [applications](/projects?techs=desktop) for industrial enterprises 🏭 and wholesale companies 🏨. Working with an independent team of developers, I have also created commercial [websites](/projects?techs=frontend%2Cbackend) for various purposes, ranging from general to specialized fields such as real estate portals 📦. Additionally, I have been actively involved in backend development, primarily using [PHP and MySQL](/projects?techs=php%2Cmysql).\n\nWithin the team framework, I have been engaged in both the development of new projects and the support of existing ones 🧑‍🔧. I have interacted with clients, identifying their needs and proposing effective solutions 🔑.",
        content_ru: "По своему профилю я разрабатывал 📟 профессиональные прикладные [решения](/projects?techs=desktop) для десктопа на промышленных предприятиях 🏭 и в компаниях оптовых продаж. 🏨\nС независимой командой разработчиков писал коммерческие [сайты](/projects?techs=frontend%2Cbackend) общей и специализированной направленности в различных областях от визиток и до порталов недвижимости. 📦\n\nНе меньше участвовал в разработке backend-части, в основном на [PHP и MySQL](/projects?techs=php%2Cmysql). В рамках командной работы занимался как разработкой новых проектов, так и поддержкой уже существующих 🧑‍🔧, общался с заказчиками, выявляя потребности и предлагая эффективные решения. 🔑",
        illustration: "ExperienceIllustration",

        is_visible: 1,
    },
    {
        slug: "achievements",
        sort_order: 5,
        title_en: "About [achievements] 🏆",
        title_ru: "Про [достижения] 🏆",
        content_en: "More than personal achievements, publications, certificates, and awards 🤵, I would like to highlight some professional [results](/about/experience/achievements):\n\n• Independently developed a [website](/projects/auto-stock) for tracking auto parts inventory 🚗, its integration with 1C, significantly reducing manual work by approximately 60 man-hours per month.\n• From scratch, created a custom [1C configuration](/projects/suzrp) for specialized payroll accounting 🪙 for a cable manufacturing company, which has been actively used for over 4 years.\n• As the lead programmer, developed a regional real estate classifieds [portal](/projects/kvll) 📰, fully handling the business logic of the project, as well as programming the backend and frontend parts.",
        content_ru: "Больше, чем о личных достижениях, публикациях, грамотах и наградах 🤵 хотел бы отметить некоторые профессиональные [результаты](/about/experience/achievements):\n\n• Самостоятельно разработал [сайт](/projects/auto-stock) учета остатков авто деталей 🚗, интеграцию с 1С, что существенно сократило объем ручной работы на ~60 чел.ч в месяц.\n• С нуля создал собственную [конфигурацию 1С](/projects/suzrp) для специального учета заработной платы 🪙 кабельного производства, активно используемую на сегодняшний день более 4 лет.\n• В роли ведущего программиста написал действующий краевой [портал](/projects/kvll) объявлений о недвижимости 📰, целиком занимался бизнес-логикой проекта, программированием backend и frontend частей.",
        illustration: "AchievementsIllustration",

        is_visible: 1,
    },
    {
        slug: "team",
        sort_order: 6,
        title_en: "About [objectives] 🎯",
        title_ru: "Про [цели] 🎯",
        content_en: "Despite the [experience](/about/experience) listed above, I believe there are many things and technologies I should learn and try out. 🕵️‍♂️\n\nI am always eager to join a friendly, active, and progressive team 🎢 of developers, where I can learn something new 🧑‍🎓 and tackle challenging tasks.\n\nIf you feel like reaching out to me, asking a question, or making a suggestion - I always look forward to your [feedback](/interact). 🧙",
        content_ru: "Не смотря на перечисленный выше [опыт](/about/experience), считаю что существует много вещей и технологий, которые я еще должен узнать и попробовать. 🕵️‍♂️\n\nЯ всегда рад присоединиться к дружной, активной и прогрессивной команде 🎢 разработчиков, где можно учиться 🧑‍🎓 чему то новому и решать сложные задачи.\n\nЕсли у Вас появилось желание написать мне, задать вопрос или сделать преложение - я всегда жду Вашу [обратную связь](/interact) 🧙",
        illustration: "TeamIllustration",

        is_visible: 1,
    },
];

const getCloser = {
    title_en: "Let's get [closer]? 🫱🫲",
    title_ru: "Познакомимся [ближе]? 🫱🫲",
    content_en: "📜 You can review my detailed [resume](/about)\n💼 Check out the [portfolio](/projects) with my most interesting works\n🤝 Connect with me on social media or leave a [message](/interact)",
    content_ru: "📜 Вы можете ознакомиться с моим подробным [резюме](/about)\n💼 Посмотреть [портфолио](/projects) с самыми интересными работами\n🤝 Связаться со мной в соцсетях или оставить [сообщение](/interact)",
};

const footer = [
    {
        sort_order: 0,
        content_en: "© 2024 Miraxsage. All rights reserved.\nAll materials on the website (trademarks, logos, and images excluding certain\nillustrations sourced from public domain) are the property of the owner (Manin\nMaxim) and may only be used with personal permission.",
        content_ru: "© 2024 Miraxsage. Все права защищены.\nВсе материалы на сайте (товарные знаки, логотипы и изображения за исключением ряда\nиллюстраций, заимствованных в свободном доступе) являются собственностью владельца\n(Манина Максима Павловича) и могут быть использованы только с личного разрешения.",
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
            "INSERT INTO landing_info_blocks (slug, sort_order, title_en, title_ru, content_en, content_ru, illustration, is_visible) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        );
        for (const block of infoBlocks) {
            insertBlock.run(
                block.slug, block.sort_order, block.title_en, block.title_ru,
                block.content_en, block.content_ru, block.illustration,
                block.is_visible,
            );
        }

        db.prepare(
            "INSERT INTO landing_get_closer (title_en, title_ru, content_en, content_ru) VALUES (?, ?, ?, ?)",
        ).run(getCloser.title_en, getCloser.title_ru, getCloser.content_en, getCloser.content_ru);

        const insertFooter = db.prepare(
            "INSERT INTO landing_footer (sort_order, content_en, content_ru) VALUES (?, ?, ?)",
        );
        for (const item of footer) {
            insertFooter.run(item.sort_order, item.content_en, item.content_ru);
        }
    });

    transaction();
    console.log(`Seeded landing: ${headerItems.length} header items, ${titleVariants.length} title variants, ${buttons.length} buttons, ${infoBlocks.length} info blocks, ${footer.length} footer items`);
}
