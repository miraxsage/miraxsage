import AccentedTreeView from "@/components/AccentedTreeView";
import DescriptionTable, { DescriptionTableRowOptions } from "@/components/DescriptionTable";
import __ from "@/utilities/transtation";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MemoryIcon from "@mui/icons-material/Memory";

type Data = [string, string, DescriptionTableRowOptions?][];

const kubanskieProduktyData: Data = [
    ["[Full name|1]", "[Limited liability company] «[Kubanskie produkty]»", { fullLine: true }],
    ["[Region]", "[Krasnodar region]"],
    ["[City]", "[Forbidden 7]"],
    [
        "[Responsibilities]",
        "Кроме прочих обязанностей поддержки информационной инфрастуктуры предприятия занимался разработкой отдельных программных модулей системы бухгалтерского учета, сайта, выполнял их интеграцию",
        { fullLine: true, showLastInCompactMode: true },
    ],
    [
        "[Achievements]",
        "самостоятельно разработал сайт учета остатков автомобильных деталей на базе CMS Wordpress, React, Bootstrap, позволяющий интегрировать работу транспортного участка и бухгалтерии, синхронизируя данные на сайте, формируемые через мобильную версию сайта, с конфигурацией 1С Бухгалтерия, что существенно сократило объем двойной ручной работы, автоматизировало процесс документооборота и позволило существенно разгрузить штатную занятость",
        { fullLine: true, showLastInCompactMode: true },
    ],
    ["[Position]", "[Software engineer]"],
    ["[Years of experience]", "2 [years|2]"],
];
const kubankabelData: Data = [
    ["[Full name|1]", "[Closed joint stock company] «[Kubankabel]»", { fullLine: true }],
    ["[Region]", "[Krasnodar region]"],
    ["[City]", "[Forbidden 7]"],
    [
        "[Responsibilities]",
        "Кроме прочих обязанностей поддержки информационной инфрастуктуры предприятия занимался доработкой, редизайном и сопровождением официального сайта. Разработал ряд специализированных программ для автоматизированного учета производства, бухгалтерского учета, учета и оформления данных приборов промышленного электрооборудования и пр.",
        { fullLine: true, showLastInCompactMode: true },
    ],
    [
        "[Achievements]",
        "Внес весомый вклад в повышение производительности бухгалтерских и инженерно-технических расчетов благодаря разработке комплекса вспомогательных приложений и интеграционных программ с использованием технологий с использованием технологий 1С:Предприятие, .NET Framework (C#), WEB, Excel VBA, за что неоднократно получал высокие оценки руководства. С нуля была разработана собственная конфигурация на платформе 1С:Предприятие для сдельного учета заработной платы работников кабельного производства с учетом индивидуальной специфики и особенностей предприятия, которая по настоящий момент является основным инструментом планово-экономического отдела",
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
        "Сопровождение официального информационного сайта администрации",
        { fullLine: true, showLastInCompactMode: true },
    ],
    [
        "[Achievements]",
        "Совместными усилиями разработал и внедрил собственную тему на Wordpress, реализующую специализированные инструменты администрирования и автоматизации, связанные с оформлением и публикацией материалов делопроизводства, новостных сводок и пр.",
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
        "Разработка интерактивного сайта по направлению учебной подготовки «Информатика и вычислительная техника»",
        { fullLine: true, showLastInCompactMode: true },
    ],
    ["[Achievements]", "Приобретен опыт работы в команде", { fullLine: true, showLastInCompactMode: true }],
    ["[Position]", "[Trainee]"],
    ["[Type of employment]", "[Internship]"],
];

function DataTable({ data, withoutBottomBorder = false }: { data: Data; withoutBottomBorder?: boolean }) {
    return <DescriptionTable withoutBottomBorder={withoutBottomBorder}>{data}</DescriptionTable>;
}

export default function AboutBioLaborBlock() {
    return (
        <>
            <AccentedTreeView expandedNodes={["it", "itKubanskieProdukty"]} selectionMode="disable">
                {[
                    {
                        id: "it",
                        title: __("Information technology"),
                        icon: <MemoryIcon />,
                        children: [
                            {
                                id: "itKubanskieProdukty",
                                title: `${__("LLC")} «${__("Kubanskie produkty")}» (09.2022 - ${__("present time")})`,
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
                                title: `${__("CJSC")} «${__("Kubankabel")}» (04.2017 - 09.2022)`,
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
