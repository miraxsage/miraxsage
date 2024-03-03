import { Box, useMediaQuery, useTheme } from "@mui/material";
import Avatar from "./Avatar";
import { getThemeColor } from "@/components/contexts/Theme";
import CheckIcon from "@mui/icons-material/Check";
import { mix } from "@/utilities/colors";
import LanguageIcon from "@/components/icons/LanguageIcon";
import { capitalize } from "@/utilities/string";
import __ from "@/utilities/transtation";
import React from "react";

const data = [
    ["ФИО", "Манин Максим [Forbidden 8]"],
    ["Дата рождения", "[Forbidden 2].[Forbidden 2].199[Forbidden 1]"],
    ["Специализация", "Web-разработчик [Tag various stack]"],
    ["Основные технологии", "JS, HTML, CSS, React, PHP, Laravel, Wordpress"],
    ["Контактный телефон", "8 (908) 681-40-71 [Priority Connection]"],
    ["Электронная почта", "manin.maxim@mail.ru"],
    [
        "Образование",
        "Общее среднее [Score 4.3/5] Высшее[Nbsp]профильное [Score 5.0/5]",
    ],
    ["Иностранные языки", "[Language EN B1]"],
    ["Гражданство", "[Language RU - onlyIcon] Российская Федерация"],
    ["Регион", "Краснодарский край"],
    ["Город", "г. [Forbidden 7]"],
    ["Стаж", "8 лет"],
    ["Занятость", "Полная"],
    ["График работы", "Полный день, удаленная работа"],
    ["Переезд", "Рассматривается"],
];

const languageLevels = { a0: 0, a1: 1, a2: 2, b1: 3, b2: 4, c1: 5, c2: 6 };
function Language({
    language,
    level,
    onlyIcon = false,
}: {
    language: "ru" | "en";
    level?: keyof typeof languageLevels;
    onlyIcon?: boolean;
}) {
    return (
        <Box component="span">
            <LanguageIcon language={language} className="mt-[-2px]" />
            {!onlyIcon && " " + __("English")}
            {level && (
                <>
                    <Score
                        value={languageLevels[level]}
                        total={6}
                        text={level.toUpperCase()}
                    />
                </>
            )}
        </Box>
    );
}

function Score({
    value,
    total,
    text,
    parenthesis = true,
}: {
    value: number;
    total: number;
    text?: string;
    parenthesis?: boolean;
}) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode == "dark";
    const color = mix(
        isDarkMode ? theme.palette.success.main : theme.palette.success.light,
        isDarkMode ? theme.palette.error.main : theme.palette.error.light,
        (value * 100) / total
    );
    return (
        <Box component="span" sx={{ margin: "0px 5px" }}>
            {parenthesis && "("}
            <Box component="span" sx={{ color }}>
                {text ?? value}
            </Box>
            {parenthesis && ")"}
        </Box>
    );
}

function Priority({ kind }: { kind: "Connection" }) {
    const theme = useTheme();
    return (
        kind == "Connection" && (
            <CheckIcon
                sx={{ margin: "0px 5px", color: theme.palette.success.main }}
            />
        )
    );
}

function Tag({ text }: { text: string }) {
    const theme = useTheme();
    return (
        <Box
            component="span"
            sx={{
                color: getThemeColor("secondaryHoverText", theme),
                padding: "3px 7px",
                borderRadius: "5px",
                background: getThemeColor("secondaryHoverBg", theme),
            }}
        >
            {text}
        </Box>
    );
}

function Forbidden({ length }: { length: number }) {
    const bg = useTheme().palette.divider;
    return (
        <Box
            component="span"
            sx={{
                color: "transparent",
                borderRadius: "5px",
                backgroundImage: `repeating-linear-gradient(
                    195deg,
                    transparent 0px,
                    transparent 3px,
                    ${bg} 3px,
                    ${bg} 4px
                  )`,
            }}
        >
            {"█".repeat(length)}
        </Box>
    );
}

function ConstructAboutValue({ name, value }: { name: string; value: string }) {
    const result = [];
    let index = 0;
    const matches = value.matchAll(/\[[^\]]+?\]/g);
    let elementNum = 0;

    for (const match of matches) {
        if (match.index == undefined) continue;
        if (match.index > index) result.push(value.slice(index, match.index));
        const elKey = `${name}_el${elementNum++}`;

        // eslint-disable-next-line prefer-const
        let [kind, ...props] = match[0].slice(1, -1).split(" ");
        kind = kind.toLowerCase();
        if (kind == "forbidden")
            result.push(<Forbidden key={elKey} length={Number(props[0])} />);
        if (kind == "tag")
            result.push(<Tag key={elKey} text={props.join("\u00A0")} />);
        if (kind == "priority")
            result.push(
                <Priority
                    key={elKey}
                    kind={
                        capitalize(props[0]) as Parameters<
                            typeof Priority
                        >[0]["kind"]
                    }
                />
            );
        if (kind == "score")
            result.push(
                <Score
                    key={elKey}
                    value={Number(props[0].split("/")[0])}
                    total={Number(props[0].split("/")[1])}
                />
            );
        if (kind == "language")
            result.push(
                <Language
                    key={elKey}
                    language={
                        props[0].toLowerCase() as Parameters<
                            typeof Language
                        >[0]["language"]
                    }
                    level={
                        (props[1] != "-" && props[1] != undefined
                            ? props[1].toLowerCase()
                            : undefined) as Parameters<
                            typeof Language
                        >[0]["level"]
                    }
                    onlyIcon={props[2] == "onlyIcon"}
                />
            );
        if (kind == "br") result.push(<br key={elKey} />);
        if (kind == "nbsp") result.push("\u00A0");
        index = match.index + match[0].length;
    }
    if (index < value.length) result.push(value.slice(index));
    return result;
}

export default function AboutGeneralBlock() {
    const theme = useTheme();
    const borderWidth = { borderWidth: "0px 0px 1px 1px" };
    const is3xl = useMediaQuery(theme.breakpoints.only("3xl"));
    let itemsDisplace = 0;
    return (
        <Box
            className="w-full"
            sx={{
                display: "grid",
                [theme.breakpoints.only("3xl")]: {
                    gridTemplateColumns: "auto auto auto 1fr auto auto 1fr",
                },
                [theme.breakpoints.between("xl", "3xl")]: {
                    gridTemplateColumns: "auto auto auto auto 1fr",
                },
                [theme.breakpoints.only("lg")]: {
                    gridTemplateColumns: "auto auto auto 1fr",
                },
                [theme.breakpoints.down("lg")]: {
                    gridTemplateColumns: "auto 1fr",
                },

                "& > div:not(.avatar)": {
                    padding: "6px 15px",
                    borderColor: theme.palette.divider,
                    borderStyle: "solid",
                    display: "flex",
                    alignItems: "center",
                },
                "& > .grid-title": {
                    background: getThemeColor("titleBg", theme),
                },
                "& > .grid-first-title": {
                    justifyContent: "center",
                },
                "& > div:nth-last-of-type(3), & > div:nth-last-of-type(2), & > div:nth-last-of-type(1)":
                    {
                        borderBottomWidth: "0px",
                    },
            }}
        >
            <Box
                className="avatar"
                gridRow={{
                    "3xl": "span 8",
                    "2xl": "span 7",
                    xl: "span 7",
                    lg: "span 8",
                }}
                sx={{
                    [theme.breakpoints.down("3xl")]: {
                        borderBottom: "1px solid " + theme.palette.divider,
                        gridColumn: "span 2",
                    },
                }}
            >
                <Avatar />
            </Box>
            {data.map(([name, val], i) => {
                let num = i + 1;
                if (is3xl) {
                    if (i % 2 == 1) {
                        num =
                            i + Math.floor(data.length / 2) + itemsDisplace + 1;
                        [name, val] = data[num - 1];
                        itemsDisplace -= 1;
                    } else {
                        [name, val] = data[i + itemsDisplace];
                        num = i + itemsDisplace + 1;
                    }
                }
                return (
                    <React.Fragment key={`${name}_line`}>
                        <Box
                            className="grid-title grid-first-title"
                            sx={{
                                ...borderWidth,
                                [theme.breakpoints.between("xl", "3xl")]: {
                                    borderWidth:
                                        i > 6
                                            ? "0px 0px 1px 0px"
                                            : "0px 0px 1px 1px",
                                },
                                [theme.breakpoints.only("lg")]: {
                                    borderWidth:
                                        i > 3
                                            ? "0px 0px 1px 0px"
                                            : "0px 0px 1px 1px",
                                },
                                [theme.breakpoints.down("lg")]: {
                                    borderWidth: "0px 0px 1px 0px",
                                },
                            }}
                        >
                            {num}
                        </Box>
                        <Box
                            className="grid-title"
                            sx={{
                                ...borderWidth,
                                [theme.breakpoints.between("xl", "3xl")]: {
                                    gridColumn: i > 6 ? "span 2" : "span 1",
                                },
                            }}
                        >
                            {name}
                        </Box>
                        <Box
                            sx={{
                                ...borderWidth,
                                [theme.breakpoints.between("xl", "3xl")]: {
                                    gridColumn: i > 6 ? "span 2" : "span 1",
                                },
                                [theme.breakpoints.down("xl")]: {
                                    gridColumn: "span 2",
                                },
                                [theme.breakpoints.down("lg")]: {
                                    borderWidth: "0px 0px 1px 0px",
                                },
                            }}
                        >
                            <div>
                                <ConstructAboutValue name={name} value={val} />
                            </div>
                        </Box>
                    </React.Fragment>
                );
            })}
        </Box>
    );
}
