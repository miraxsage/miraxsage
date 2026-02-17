import type Database from "better-sqlite3";

interface TechSeed {
    name: string;
    docs_link: string;
    icon: string;
    skill_level: number;
    experience_years: number;
    projects_count: number;
    color: string;
    sort_order: number;
}

interface CategorySeed {
    slug: string;
    label_en: string;
    label_ru: string;
    sort_order: number;
    technologies: TechSeed[];
}

const categories: CategorySeed[] = [
    {
        slug: "frontend",
        label_en: "Frontend",
        label_ru: "Фронтенд",
        sort_order: 1,
        technologies: [
            { name: "HTML", docs_link: "https://html.spec.whatwg.org/", icon: "HTMLIcon", skill_level: 72, experience_years: 11, projects_count: 25, color: "#fc4f13", sort_order: 1 },
            { name: "CSS", docs_link: "https://www.w3.org/TR/?tags%5B0%5D=css", icon: "CSSIcon", skill_level: 78, experience_years: 11, projects_count: 25, color: "#264de4", sort_order: 2 },
            { name: "JS", docs_link: "https://tc39.es/ecma262/", icon: "JSIcon", skill_level: 87, experience_years: 11, projects_count: 25, color: "#e4b900", sort_order: 3 },
            { name: "Typescript", docs_link: "https://www.typescriptlang.org/", icon: "TSIcon", skill_level: 71, experience_years: 3.5, projects_count: 6, color: "#3179c6", sort_order: 4 },
            { name: "jQuery", docs_link: "https://jquery.com/", icon: "JQueryIcon", skill_level: 91, experience_years: 8, projects_count: 23, color: "#0773b4", sort_order: 5 },
            { name: "React", docs_link: "https://react.dev/", icon: "ReactIcon", skill_level: 74, experience_years: 3.5, projects_count: 8, color: "#00baed", sort_order: 6 },
            { name: "Redux", docs_link: "https://redux.js.org/", icon: "ReduxIcon", skill_level: 68, experience_years: 2.5, projects_count: 7, color: "#764abc", sort_order: 7 },
            { name: "ReactRouter", docs_link: "https://reactrouter.com/en/main", icon: "ReactRouterIcon", skill_level: 65, experience_years: 2.5, projects_count: 6, color: "#d0021b", sort_order: 8 },
            { name: "FramerMotion", docs_link: "https://www.framer.com/motion/", icon: "FramerMotionIcon", skill_level: 65, experience_years: 2, projects_count: 5, color: "#eb00c3", sort_order: 9 },
            { name: "Bootstrap", docs_link: "https://getbootstrap.com/", icon: "BootstrapIcon", skill_level: 76, experience_years: 4, projects_count: 8, color: "#6b10f4", sort_order: 10 },
            { name: "MUI", docs_link: "https://mui.com/material-ui/", icon: "MUIIcon", skill_level: 68, experience_years: 2, projects_count: 5, color: "#0080ff", sort_order: 11 },
        ],
    },
    {
        slug: "backend",
        label_en: "Backend",
        label_ru: "Бэкенд",
        sort_order: 2,
        technologies: [
            { name: "PHP", docs_link: "https://www.php.net/", icon: "PHPIcon", skill_level: 71, experience_years: 8, projects_count: 15, color: "", sort_order: 1 },
            { name: "MySQL", docs_link: "https://dev.mysql.com/doc/", icon: "MySqlIcon", skill_level: 67, experience_years: 8, projects_count: 13, color: "", sort_order: 2 },
            { name: "Wordpress", docs_link: "https://wordpress.org/documentation/", icon: "WordpressIcon", skill_level: 78, experience_years: 7, projects_count: 12, color: "", sort_order: 3 },
            { name: "Laravel", docs_link: "https://laravel.com/docs/", icon: "LaravelIcon", skill_level: 63, experience_years: 3, projects_count: 4, color: "", sort_order: 4 },
            { name: "Inertia", docs_link: "https://inertiajs.com/", icon: "InertiaIcon", skill_level: 72, experience_years: 1.5, projects_count: 3, color: "", sort_order: 5 },
            { name: "Yii2", docs_link: "https://www.yiiframework.com/doc/guide/2.0/ru", icon: "YiiIcon", skill_level: 56, experience_years: 2, projects_count: 2, color: "", sort_order: 6 },
        ],
    },
    {
        slug: "desktop",
        label_en: "Desktop",
        label_ru: "Десктоп",
        sort_order: 3,
        technologies: [
            { name: ".NET Framework", docs_link: "https://learn.microsoft.com/en-us/dotnet/framework/", icon: "DotNetFrameworkIcon", skill_level: 74, experience_years: 11, projects_count: 31, color: "", sort_order: 1 },
            { name: "SQLite", docs_link: "https://www.sqlite.org/", icon: "SQLiteIcon", skill_level: 65, experience_years: 7, projects_count: 8, color: "", sort_order: 2 },
            { name: "MS SQL Server", docs_link: "https://learn.microsoft.com/en-us/sql/sql-server", icon: "MSSQLServerIcon", skill_level: 56, experience_years: 5, projects_count: 16, color: "", sort_order: 3 },
            { name: "Visual C#", docs_link: "https://learn.microsoft.com/en-us/dotnet/csharp/", icon: "CSharpIcon", skill_level: 75, experience_years: 11, projects_count: 31, color: "", sort_order: 4 },
            { name: "WPF", docs_link: "https://learn.microsoft.com/en-us/dotnet/desktop/wpf", icon: "WindowsIcon", skill_level: 70, experience_years: 8, projects_count: 26, color: "", sort_order: 5 },
            { name: "1C", docs_link: "https://its.1c.ru/db/v838doc", icon: "OneCIcon", skill_level: 73, experience_years: 6, projects_count: 22, color: "", sort_order: 6 },
        ],
    },
];

export default function seedTechnologies(db: Database.Database) {
    const count = (db.prepare("SELECT COUNT(*) as cnt FROM technology_categories").get() as { cnt: number }).cnt;
    if (count > 0) {
        console.log("Technologies already seeded, skipping");
        return;
    }

    const insertCategory = db.prepare(
        "INSERT INTO technology_categories (slug, sort_order, label_en, label_ru) VALUES (?, ?, ?, ?)",
    );
    const insertTech = db.prepare(
        "INSERT INTO technologies (category_id, name, docs_link, icon, skill_level, experience_years, projects_count, color, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    );

    const transaction = db.transaction(() => {
        for (const cat of categories) {
            const info = insertCategory.run(cat.slug, cat.sort_order, cat.label_en, cat.label_ru);
            const categoryId = info.lastInsertRowid;

            for (const tech of cat.technologies) {
                insertTech.run(
                    categoryId,
                    tech.name,
                    tech.docs_link,
                    tech.icon,
                    tech.skill_level,
                    tech.experience_years,
                    tech.projects_count,
                    tech.color,
                    tech.sort_order,
                );
            }
        }
    });

    transaction();
    const totalTechs = categories.reduce((sum, c) => sum + c.technologies.length, 0);
    console.log(`Seeded ${categories.length} technology categories with ${totalTechs} technologies`);
}
