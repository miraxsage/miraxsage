import AccentedTreeView from "@/components/AccentedTreeView";
import DescriptionTable, { DescriptionTableRowOptions } from "@/components/DescriptionTable";
import { useLanguage } from "@/store/appearanceSlice";
import __ from "@/utilities/transtation";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MemoryIcon from "@mui/icons-material/Memory";
import { useMediaQuery, useTheme } from "@mui/material";

type Data = [string, string | { ru: string; en: string }, DescriptionTableRowOptions?][];
const webarchitectData: Data = [
    ["[Full name|1]", "Webarchitect.ru", { fullLine: true }],
    ["[Region]", "[Krasnodar region]"],
    ["[City]", "[Forbidden 7]"],
    [
        "[Responsibilities]",
        {
            ru: "Занимался ключевыми задачами проектирования архитектуры и командной реализацией больших проектов, разработкой backend-частей на PHP, Yii2, Laravel, MySQL, CMS Wordpress, реализацией сложной динамической frontend логики на React и Redux.",
            en: "Handled key tasks in architecture design and team implementation of large projects, developed backend components using PHP, Yii2, Laravel, MySQL, CMS WordPress, and implemented complex dynamic frontend logic with React and Redux.",
        },
        { fullLine: true, showLastInCompactMode: true },
    ],
    [
        "[Achievements]",
        {
            ru: "За длительный срок работы в команде с моим ведущим участием было разработано множество проектов. Одними из самых больших и интересных остаются краевой портал недвижимости Краснодара, ряд специализированных сервисов цифровых услуг, по настоящий день активно привлекающих пользователей и находящихся на поддержке.",
            en: "Over a long period of working with the team, with my leading involvement, many projects have been developed. Among the largest and most interesting are the Krasnodar regional real estate portal, a number of specialized digital service platforms, which continue to actively attract users and are still maintained.",
        },
        { fullLine: true, showLastInCompactMode: true },
    ],
    ["[Position]", "[Fullstack developer]"],
    ["[Years of experience]", "2 [years|2]"],
];
const kubanskieProduktyData: Data = [
    [
        "[Full name|1]",
        {
            en: "OOO Kuban products (Limited Liability Company)",
            ru: "Общество с ограниченной ответственностью «Кубанские продукты»",
        },
        { fullLine: true },
    ],
    ["[Region]", "[Krasnodar region]"],
    ["[City]", "[Forbidden 7]"],
    [
        "[Responsibilities]",
        {
            ru: "Кроме прочих обязанностей поддержки информационной инфраструктуры предприятия занимался разработкой отдельных программных модулей системы бухгалтерского учета, сайта, выполнял их интеграцию.",
            en: "In addition to supporting the company's information infrastructure, I developed individual software modules for the accounting system and the website, and performed their integration.",
        },
        { fullLine: true, showLastInCompactMode: true },
    ],
    [
        "[Achievements]",
        {
            ru: "Самостоятельно разработал сайт учета остатков автомобильных деталей на базе CMS Wordpress, React, Bootstrap, позволяющий интегрировать работу транспортного участка и бухгалтерии, синхронизируя данные на сайте, формируемые через мобильную версию сайта, с конфигурацией 1С Бухгалтерия, что существенно сократило объем двойной ручной работы, автоматизировало процесс документооборота и позволило существенно разгрузить штатную занятость.",
            en: "I independently developed a website for tracking automotive parts inventory using CMS WordPress, React, and Bootstrap. This website integrates the operations of the transportation department and the accounting department by synchronizing data generated through the mobile version of the website with the 1C Accounting configuration. This significantly reduced the amount of duplicate manual work, automated the document workflow process, and substantially relieved staff workload.",
        },
        { fullLine: true, showLastInCompactMode: true },
    ],
    ["[Position]", "[Software engineer]"],
    ["[Years of experience]", "2 [years|2]"],
];
const kubankabelData: Data = [
    [
        "[Full name|1]",
        {
            en: "ZAO Kuban cable factory (Сlosed Joint-Stock Company)",
            ru: "Закрытое акционерное общество «Кабельный завод «Кубанькабель»",
        },
        { fullLine: true },
    ],
    ["[Region]", "[Krasnodar region]"],
    ["[City]", "[Forbidden 7]"],
    [
        "[Responsibilities]",
        {
            ru: "Кроме прочих обязанностей поддержки информационной инфраструктуры предприятия занимался доработкой, редизайном и сопровождением официального сайта. Разработал ряд специализированных программ для автоматизированного учета производства, бухгалтерского учета, учета и оформления данных приборов промышленного электрооборудования и пр.",
            en: "In addition to supporting the company's information infrastructure, I handled the improvement, redesign, and maintenance of the official website. I developed several specialized programs for automated production accounting, financial accounting, and the recording and management of data from industrial electrical equipment, among other tasks.",
        },
        { fullLine: true, showLastInCompactMode: true },
    ],
    [
        "[Achievements]",
        {
            ru: "Внес весомый вклад в повышение производительности бухгалтерских и инженерно-технических расчетов благодаря разработке комплекса вспомогательных приложений и интеграционных программ с использованием технологий 1С:Предприятие, .NET Framework (C#), WEB, Excel VBA, за что неоднократно получал высокие оценки руководства. С нуля была разработана собственная конфигурация на платформе 1С:Предприятие для сдельного учета заработной платы работников кабельного производства с учетом индивидуальной специфики и особенностей предприятия, которая по настоящий момент является основным инструментом планово-экономического отдела.",
            en: "I made a significant contribution to improving the efficiency of accounting and engineering calculations by developing a suite of auxiliary applications and integration programs using 1C, .NET Framework (C#), WEB, and Excel VBA technologies. For this work, I repeatedly received high praise from management. From scratch, I developed a custom configuration on the 1C platform for piece-rate payroll accounting for cable production workers, considering the unique specifics and features of the company. This configuration remains the primary tool for the planning and economic department to this day.",
        },
        { fullLine: true, showLastInCompactMode: true },
    ],
    ["[Position]", "[Software engineer]"],
    ["[Type of employment]", "[Full]"],
    ["[Years of experience]", "5 [years]"],
];
const administationData: Data = [
    ["[Full name|1]", "[Municipal administration] г. [Forbidden 7]", { fullLine: true }],
    ["[Region]", "[Krasnodar region]"],
    ["[City]", "[Forbidden 7]"],
    [
        "[Responsibilities]",
        {
            ru: "Сопровождение официального информационного сайта администрации.",
            en: "Maintenance of the official informational website of the administration.",
        },
        { fullLine: true, showLastInCompactMode: true },
    ],
    [
        "[Achievements]",
        {
            ru: "Совместными усилиями разработал и внедрил собственную тему на Wordpress, реализующую специализированные инструменты администрирования и автоматизации, связанные с оформлением и публикацией материалов делопроизводства, новостных сводок и пр.",
            en: "Collaboratively developed and implemented a custom WordPress theme that provides specialized tools for administration and automation related to the formatting and publication of documentation, news bulletins, and more.",
        },
        { fullLine: true, showLastInCompactMode: true },
    ],
    ["[Position]", "[Information technology sector specialist]"],
    ["[Type of employment]", "[Full]"],
    ["[Years of experience]", "1 [year]"],
];
const bedrosovaData: Data = [
    ["[Full name|1]", "[Individual entrepreneur] [Bedrosova Y. V.]", { fullLine: true }],
    ["[Region]", "[Krasnodar region]"],
    ["[City]", "[Forbidden 7]"],
    [
        "[Responsibilities]",
        {
            ru: "Разработка интерактивного сайта по направлению учебной подготовки «Информатика и вычислительная техника».",
            en: "Development of an interactive website for the educational program «Computer Science and Engineering».",
        },
        { fullLine: true, showLastInCompactMode: true },
    ],
    [
        "[Achievements]",
        { ru: "Приобретен опыт работы в команде.", en: "Gained experience working in a team." },
        { fullLine: true, showLastInCompactMode: true },
    ],
    ["[Position]", "[Trainee]"],
    ["[Type of employment]", "[Internship]"],
];

function DataTable({ data, withoutBottomBorder = false }: { data: Data; withoutBottomBorder?: boolean }) {
    return <DescriptionTable withoutBottomBorder={withoutBottomBorder}>{data}</DescriptionTable>;
}

export default function AboutBioLaborBlock() {
    const theme = useTheme();
    const lang = useLanguage();
    const lessSm = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <>
            <AccentedTreeView
                intend={lessSm ? "small" : "regular"}
                initiallyExpandedNodes={["it", "itWebarchitect"]}
                selectionMode="disable"
            >
                {[
                    {
                        id: "it",
                        title: __("Information technology"),
                        icon: <MemoryIcon />,
                        children: [
                            {
                                id: "itWebarchitect",
                                title: `Webarchitect.ru (2015 - ${__("present time")})`,
                                icon: <ApartmentIcon />,
                                children: [
                                    {
                                        id: "itWebarchitect-datails",
                                        content: <DataTable data={webarchitectData} />,
                                    },
                                ],
                            },
                            {
                                id: "itKubanskieProdukty",
                                title: `${
                                    lang.en ? "OOO Kuban products (LLC)" : "ООО «Кубанские продукты»"
                                } (09.2022 - ${__("present time")})`,
                                icon: <ApartmentIcon />,
                                children: [
                                    {
                                        id: "itKubanskieProdukty-datails",
                                        content: <DataTable data={kubanskieProduktyData} />,
                                    },
                                ],
                            },
                            {
                                id: "itKubankabel",
                                title: `${
                                    lang.en ? "ZAO Kuban cable (CJSC)" : "ЗАО «Кубанькабель»"
                                } (04.2017 - 09.2022)`,
                                icon: <ApartmentIcon />,
                                children: [
                                    {
                                        id: "itKubanskieProdukty-datails",
                                        content: <DataTable data={kubankabelData} />,
                                    },
                                ],
                            },
                            {
                                id: "itAdministration",
                                title: `${__("Municipal administration")} (06.2015 - 04.2017)`,
                                icon: <ApartmentIcon />,
                                children: [
                                    {
                                        id: "itAdministration-datails",
                                        content: <DataTable data={administationData} />,
                                    },
                                ],
                            },
                            {
                                id: "itBedrosova",
                                title: __(["IE", " ", "Bedrosova Y. V.", " (06.2014 - 08.2014)"]),
                                icon: <ApartmentIcon />,
                                children: [
                                    {
                                        id: "itBedrosova-datails",
                                        content: <DataTable withoutBottomBorder={true} data={bedrosovaData} />,
                                    },
                                ],
                            },
                        ],
                    },
                ]}
            </AccentedTreeView>
        </>
    );
}
