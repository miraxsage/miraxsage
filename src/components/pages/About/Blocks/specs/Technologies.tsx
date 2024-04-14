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
import YiiIcon from "@/components/icons/YiiIcon";
import InertiaIcon from "@/components/icons/InertiaIcon";
import DotNetFrameworkIcon from "@/components/icons/DotNetFrameworkIcon";
import CSharpIcon from "@/components/icons/CSharpIcon";
import WindowsIcon from "@/components/icons/WindowsIcon";
import OneCIcon from "@/components/icons/OneCIcon";

export type TechnologyInterface = [
    string, // name
    string, // docslink
    icon: React.FC, // icon
    number, // level
    number, // experience
    number // projects
];

export type TechnologiesInterface = {
    [k: string]: TechnologyInterface[];
};

export type Technologies = typeof technologies;

export type TechnologiesList<
    Mode extends "All" | "Cats" | "Techs" = "Techs",
    T extends TechnologiesInterface = Technologies,
    K extends keyof T = keyof T
> = K extends string
    ? T[K] extends TechnologiesInterface
        ? Mode extends "Techs"
            ? TechnologiesList<Mode, T[K]>
            : Mode extends "All"
            ? K | TechnologiesList<Mode, T[K]>
            : K
        : T[K][keyof T[K] & number] extends TechnologyInterface
        ? Mode extends "Techs"
            ? T[K][keyof T[K] & number][0]
            : Mode extends "All"
            ? K | T[K][keyof T[K] & number][0]
            : K
        : never
    : never;

export function getTechnologyInfo(technology: TechnologiesList): TechnologyInterface | null {
    let result = null;
    eachTechnologyDo((tech, isCat, val) => {
        if (!isCat && tech == technology) result = val;
    });
    return result;
}

export function eachTechnologyDo(
    action: (tech: TechnologiesList<"All">, isCat: boolean, val: TechnologyInterface[] | TechnologyInterface) => void
) {
    Object.keys(technologies).forEach((key) => {
        action(key as TechnologiesList<"Cats">, true, technologies[key as TechnologiesList<"Cats">]);
        technologies[key as TechnologiesList<"Cats">].forEach((tech) => {
            action(tech[0], false, tech);
        });
    });
}

export function findTechnology(
    tech: string
):
    | { name: TechnologiesList<"Cats">; isCat: true; val: TechnologyInterface[] }
    | { name: TechnologiesList<"Techs">; isCat: false; val: TechnologyInterface }
    | null {
    tech = tech.trim().toLowerCase().replace(/\s+/, " ");
    let result = null;
    eachTechnologyDo((t, isCat, val) => {
        if (t.toLowerCase() == tech) result = { name: t, isCat, val };
    });
    return result;
}

export function isTechnology(tech: string): tech is TechnologiesList<"All"> {
    return Boolean(findTechnology(tech));
}

export function isCategoryTechnology(cat: TechnologiesList<"All">): cat is TechnologiesList<"Cats"> {
    return cat in technologies;
}

export function technologiesEqualsOrRelative(techA: TechnologiesList<"All">, techB: TechnologiesList<"All">) {
    if (techA == techB) return true;
    const techInfoA = findTechnology(techA);
    const techInfoB = findTechnology(techB);
    if (techInfoA?.isCat) {
        if (techInfoB?.isCat) return false;
        return techInfoA.val.some(([name]) => name == techInfoB?.name);
    } else {
        if (techInfoB?.isCat) techInfoB.val.some(([name]) => name == techInfoA?.name);
    }
    return false;
}

export const technologies = {
    frontend: [
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
    ],
    backend: [
        ["PHP", "https://www.php.net/", PHPIcon, 71, 8, 15],
        ["MySQL", "https://dev.mysql.com/doc/", MySqlIcon, 67, 8, 13],
        ["Wordpress", "https://wordpress.org/documentation/", WordpressIcon, 78, 7, 12],
        ["Laravel", "https://laravel.com/docs/", LaravelIcon, 63, 3, 4],
        ["Inertia", "https://inertiajs.com/", InertiaIcon, 72, 1.5, 3],
        ["Yii2", "https://www.yiiframework.com/doc/guide/2.0/ru", YiiIcon, 56, 2, 2],
    ],
    desktop: [
        [".NET Framework", "https://learn.microsoft.com/en-us/dotnet/framework/", DotNetFrameworkIcon, 74, 11, 31],
        ["Visual C#", "https://learn.microsoft.com/en-us/dotnet/csharp/", CSharpIcon, 75, 11, 31],
        ["WPF", "https://learn.microsoft.com/en-us/dotnet/desktop/wpf", WindowsIcon, 70, 8, 26],
        ["1C", "https://its.1c.ru/db/v838doc", OneCIcon, 73, 6, 22],
    ],
} as const satisfies TechnologiesInterface;