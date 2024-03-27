export const js = `function carry(func){
    return function exec(...args1){
        if(args1.length >= func.length)
            return func(args1);
        return (...args2) => exec(...args1, ...args2);
    }
}
console.log('hello world!');`;

export const ts = `
import AccentedTreeView from "@/components/AccentedTreeView";
import MarkupIcon from "@/components/icons/MarkupIcon";
import TerminalIcon from "@/components/icons/TerminalIcon";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import TechnologiesTable, { TechnologiesTableProps } from "./TechnologiesTable";
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

const frontendData: TechnologiesTableProps["data"] = [
    ["HTML", "https://html.spec.whatwg.org/", HTMLIcon, 72, 11, 25],
    ["CSS", "https://www.w3.org/TR/?tags%5B0%5D=css", CSSIcon, 78, 11, 25],
    ["JS", "https://tc39.es/ecma262/", JSIcon, 87, 11, 25],
    ["Typescript", "https://www.typescriptlang.org/", TSIcon, 71, 3.5, 6],
    ["JQuery", "https://jquery.com/", JQueryIcon, 91, 8, 23],
    ["React", "https://react.dev/", ReactIcon, 74, 3.5, 8],
    ["Redux", "https://redux.js.org/", ReduxIcon, 68, 2.5, 7],
    ["ReactRouter", "https://reactrouter.com/en/main", ReactRouterIcon, 65, 2.5, 6],
    ["FramerMotion", "https://www.framer.com/motion/", FramerMotionIcon, 65, 2, 5],
    ["MUI", "https://mui.com/material-ui/", MUIIcon, 68, 2, 5],
];

const backendData: TechnologiesTableProps["data"] = [
    ["PHP", "https://www.php.net/", PHPIcon, 71, 8, 15],
    ["MySQL", "https://dev.mysql.com/doc/", MySqlIcon, 67, 8, 13],
    ["Wordpress", "https://wordpress.org/documentation/", WordpressIcon, 78, 7, 12],
    ["Laravel", "https://laravel.com/docs/", LaravelIcon, 63, 3, 4],
    ["Inertia", "https://inertiajs.com/", InertiaIcon, 72, 1.5, 3],
];

const desktopData: TechnologiesTableProps["data"] = [
    [".NET Framework", "https://learn.microsoft.com/en-us/dotnet/framework/", DotNetFrameworkIcon, 74, 11, 31],
    ["Visual C#", "https://learn.microsoft.com/en-us/dotnet/csharp/", CSharpIcon, 75, 11, 31],
    ["WPF", "https://learn.microsoft.com/en-us/dotnet/desktop/wpf", WindowsIcon, 70, 8, 26],
    ["1C", "https://its.1c.ru/db/v838doc", OneCIcon, 73, 6, 22],
];

export default function AboutSpecsHardSkillsBlock() {
    return (
        <>
            <AccentedTreeView expandedNodes={["frontend"]} disableSelection={true}>
                {[
                    {
                        id: "frontend",
                        title: "Frontend",
                        icon: <MarkupIcon />,
                        children: [
                            {
                                id: "frontend-table-details",
                                content: <TechnologiesTable data={frontendData} />,
                            },
                        ],
                    },
                    {
                        id: "backend",
                        title: "Backend",
                        icon: <TerminalIcon />,
                        children: [
                            {
                                id: "backend-datails",
                                content: <TechnologiesTable data={backendData} />,
                            },
                        ],
                    },
                    {
                        id: "desktop",
                        title: "Desktop",
                        icon: <PersonalVideoIcon />,
                        children: [
                            {
                                id: "desktop-datails",
                                content: <TechnologiesTable data={desktopData} />,
                            },
                        ],
                    },
                ]}

                
            </AccentedTreeView>
        </>
    );
}
`;

export const react = "React code";
export const php = "PHP code";
export const wp = "Wordpress code";
export const mysql = "MySql code";
export const cs = "C# code";
export const wpf = "wpf code";
export const onec = "1c code";
