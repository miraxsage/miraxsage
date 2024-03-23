import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { capitalize } from "@/utilities/string";
import { Box } from "@mui/material";
import HTMLIcon from "@/components/icons/HTMLIcon";
import CSSIcon from "@/components/icons/CSSIcon";
import JSIcon from "@/components/icons/JSIcon";
import TSIcon from "@/components/icons/TSIcon";
import JQueryIcon from "@/components/icons/JQueryIcon";
import ReactIcon from "@/components/icons/ReactIcon";
import ReduxIcon from "@/components/icons/ReduxIcon";
import ReactRouterIcon from "@/components/icons/ReactRouterIcon";
import FramerMotionIcon from "@/components/icons/FramerMotionIcon";
import MUIIcon from "@/components/icons/MUIIcon";
import PHPIcon from "@/components/icons/PHPIcon";
import MySqlIcon from "@/components/icons/MySqlIcon";
import WordpressIcon from "@/components/icons/WordpressIcon";
import LaravelIcon from "@/components/icons/LaravelIcon";
import InertiaIcon from "@/components/icons/InertiaIcon";
import DotNetFrameworkIcon from "@/components/icons/DotNetFrameworkIcon";
import CSharpIcon from "@/components/icons/CSharpIcon";
import WindowsIcon from "@/components/icons/WindowsIcon";
import OneCIcon from "@/components/icons/OneCIcon";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MusclesIcon from "@/components/icons/MusclesIcon";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useThemeColor } from "@/components/contexts/Theme";
import DescriptionPanel from "@/components/DescriptionPanel";

const data: { [k: string]: { description: string; techs: [string, string, React.FC?][] } } = {
    Frontend: {
        description: `С особенной любовью к пользовательскому интерфейсу сначала писал активно на Jquery. 
        В настоящее время активно осваиваю современный стек, на котором имею представленные проекты в т.ч. текущий
        `,
        techs: [
            ["HTML", "https://html.spec.whatwg.org/", HTMLIcon],
            ["CSS", "https://www.w3.org/TR/?tags%5B0%5D=css", CSSIcon],
            ["JS", "https://tc39.es/ecma262/", JSIcon],
            ["Typescript", "https://www.typescriptlang.org/", TSIcon],
            ["JQuery", "https://jquery.com/", JQueryIcon],
            ["React", "https://react.dev/", ReactIcon],
            ["Redux", "https://redux.js.org/", ReduxIcon],
            ["ReactRouter", "https://reactrouter.com/en/main", ReactRouterIcon],
            ["FramerMotion", "https://www.framer.com/motion/", FramerMotionIcon],
            ["MUI", "https://mui.com/material-ui/", MUIIcon],
        ],
    },
    Backend: {
        description: `Во времена подработок и проф деят разрабатывал бэкенд, в т.ч. коммерческие проекты на базе CMS и PHP-фреймворков, писал плагины и темы WP`,
        techs: [
            ["PHP", "https://www.php.net/", PHPIcon],
            ["MySQL", "https://dev.mysql.com/doc/", MySqlIcon],
            ["Wordpress", "https://wordpress.org/documentation/", WordpressIcon],
            ["Laravel", "https://laravel.com/docs/", LaravelIcon],
            ["Inertia", "https://inertiajs.com/", InertiaIcon],
        ],
    },
    Desktop: {
        description: `Во временя учебы в университете, профессиональной деятельности написал большое количество программ различного уровня от простых вспомогательных утилит и учебных демонстрационных проектов до серьезных приложений.
        Активно занимался самостоятельным изучением. Высоко оценивая для себя важность удобства и привлекательности пользовательского интерфейса с большим интересом освоил Windows Presentation Foundation, систему для построения пользовательского интерфейса (UI) с визуально привлекательными возможностями (графическая подсистема в составе .NET Framework, использующая язык XAML), активно использовал и интегрировал внешние библиотеки UI-кастомизации.
        Одними из самых интересных были дипломная работа по разработке собственной системы управления персональными данными пользователей.
        `,
        techs: [
            [".NET Framework", "https://learn.microsoft.com/en-us/dotnet/framework/", DotNetFrameworkIcon],
            ["Visual C#", "https://learn.microsoft.com/en-us/dotnet/csharp/", CSharpIcon],
            ["WPF", "https://learn.microsoft.com/en-us/dotnet/desktop/wpf", WindowsIcon],
            ["1C", "https://its.1c.ru/db/v838doc", OneCIcon],
        ],
    },
};

type TechnologiesDescriptionBlock = {
    category: "frontend" | "backend" | "desktop";
    withoutBottomBorder?: boolean;
};

function Separator() {
    return <Box sx={{ color: useThemeColor("regularText"), opacity: 0.5 }}>+</Box>;
}

export default function TechDescriptionBlock({ category, withoutBottomBorder }: TechnologiesDescriptionBlock) {
    return (
        <DescriptionPanel withoutBottomBorder={withoutBottomBorder}>
            {{
                elements: [
                    <CustomBreadcrumbs
                        sx={{
                            marginBottom: "4px",
                            padding: "3px 12px",
                            "& .MuiBreadcrumbs-ol": {
                                lineHeight: "32px",
                            },
                        }}
                        maxItems={20}
                        separator={<Separator />}
                        withoutExpandIcon={true}
                    >
                        {data[capitalize(category)].techs.map(([tech, datalink, Icon]) => ({
                            label: tech,
                            icon: Icon && <Icon />,
                            subitems: [
                                {
                                    label: tech + "-проекты",
                                    icon: <RocketLaunchIcon />,
                                    link: "/projects?cats=" + tech.toLowerCase(),
                                },
                                {
                                    label: tech + "-навыки",
                                    icon: <MusclesIcon />,
                                    link: "/about/skills/hard",
                                },
                                {
                                    label: "Документация",
                                    icon: <MenuBookIcon />,
                                    link: datalink,
                                },
                            ],
                        }))}
                    </CustomBreadcrumbs>,
                    data[capitalize(category)].description,
                ],
                buttons: [
                    {
                        label: "Проекты",
                        icon: <RocketLaunchIcon sx={{ fontSize: "20px", marginRight: "8px" }} />,
                        link: `/projects?cats=${category}`,
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
