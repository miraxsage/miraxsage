import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { capitalize } from "@/utilities/string";
import { Box, SxProps, styled, useTheme } from "@mui/material";
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
import { getThemeColor, useThemeColor } from "@/components/contexts/Theme";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

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

const DescriptionElement = styled(Box)(({ theme }) => ({
    padding: "6px 14px",
    borderStyle: "solid",
    borderTopWidth: "1px",
    borderColor: theme.palette.divider,
}));

function DescriptionButton({ link, children, sx }: { link?: string; children?: ReactNode; sx?: SxProps }) {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Box
            component="a"
            sx={{
                display: "block",
                padding: "8px 18px",
                borderStyle: "solid",
                borderWidth: "1px 1px 0px 0px",
                borderColor: theme.palette.divider,
                color: getThemeColor("regularText", theme),
                cursor: !link ? "auto" : "pointer",
                "&:last-child": { borderRightWidth: 0 },
                "&:hover": !link
                    ? {}
                    : {
                          textDecoration: "underline",
                          textUnderlineOffset: "4px",
                          transition: "background 0.25s",
                          background: getThemeColor("titleBg", theme),
                      },
                "& .MuiSvgIcon-root": {
                    color: getThemeColor("regularIcon", theme),
                },
                ...sx,
            }}
            onClick={
                link
                    ? (e) => {
                          e.preventDefault();
                          navigate(link);
                      }
                    : undefined
            }
        >
            {children}
        </Box>
    );
}

const DescriptionButtonsContainer = styled(Box)(() => ({
    display: "flex",
}));

export default function TechDescriptionBlock({ category, withoutBottomBorder }: TechnologiesDescriptionBlock) {
    const theme = useTheme();
    return (
        <Box
            tabIndex={-1}
            sx={{
                userSelect: "text",
                cursor: "auto",
                borderStyle: "solid",
                borderColor: theme.palette.divider,
                borderWidth: withoutBottomBorder ? "1px 0px 0px 1px" : "1px 0px 1px 1px",
            }}
        >
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
            </CustomBreadcrumbs>
            <DescriptionElement>{data[capitalize(category)].description}</DescriptionElement>
            <DescriptionButtonsContainer>
                <DescriptionButton link={`/projects?cats=${category}`}>
                    <RocketLaunchIcon sx={{ fontSize: "20px", marginRight: "8px" }} />
                    Проекты
                </DescriptionButton>
                <DescriptionButton link="/about/skills/hard">
                    <Box component="span" sx={{ "& .MuiSvgIcon-root": { fontSize: "20px" }, marginRight: "8px" }}>
                        <MusclesIcon />
                    </Box>
                    Навыки
                </DescriptionButton>
                <DescriptionButton sx={{ flexGrow: 1 }} />
            </DescriptionButtonsContainer>
        </Box>
    );
}
