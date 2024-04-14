import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MusclesIcon from "@/components/icons/MusclesIcon";
import DescriptionPanel from "@/components/DescriptionPanel";
import TechnologiesCrumbs from "@/components/TechnologiesCrumbs";

const data: { [k: string]: { description: string } } = {
    frontend: {
        description: `С особенной любовью к пользовательскому интерфейсу сначала писал активно на Jquery. 
        В настоящее время активно осваиваю современный стек, на котором имею представленные проекты в т.ч. текущий
        `,
    },
    backend: {
        description: `Во времена подработок и проф деят разрабатывал бэкенд, в т.ч. коммерческие проекты на базе CMS и PHP-фреймворков, писал плагины и темы WP`,
    },
    desktop: {
        description: `Во временя учебы в университете, профессиональной деятельности написал большое количество программ различного уровня от простых вспомогательных утилит и учебных демонстрационных проектов до серьезных приложений.
        Активно занимался самостоятельным изучением. Высоко оценивая для себя важность удобства и привлекательности пользовательского интерфейса с большим интересом освоил Windows Presentation Foundation, систему для построения пользовательского интерфейса (UI) с визуально привлекательными возможностями (графическая подсистема в составе .NET Framework, использующая язык XAML), активно использовал и интегрировал внешние библиотеки UI-кастомизации.
        Одними из самых интересных были дипломная работа по разработке собственной системы управления персональными данными пользователей.
        `,
    },
};

type TechnologiesDescriptionBlock = {
    category: "frontend" | "backend" | "desktop";
    withoutBottomBorder?: boolean;
    withoutBorders?: boolean;
};

export default function TechDescriptionBlock({
    category,
    withoutBottomBorder,
    withoutBorders,
}: TechnologiesDescriptionBlock) {
    return (
        <DescriptionPanel withoutBottomBorder={withoutBottomBorder} withoutBorders={withoutBorders}>
            {{
                elements: [
                    <TechnologiesCrumbs techs={category} sx={{ padding: "3px 12px", marginBottom: "4px" }} />,
                    data[category].description,
                ],
                buttons: [
                    {
                        label: "Проекты",
                        icon: <RocketLaunchIcon sx={{ fontSize: "20px", marginRight: "8px" }} />,
                        link: `/projects?techs=${category}`,
                    },
                    {
                        label: "Навыки",
                        icon: <MusclesIcon />,
                        link: `/about/skills/hard`,
                    },
                ],
            }}
        </DescriptionPanel>
    );
}
