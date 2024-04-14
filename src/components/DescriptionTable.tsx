import { Box, useMediaQuery, useTheme } from "@mui/material";
import { getThemeColor, useThemeColor } from "./contexts/Theme";
import React, { ReactNode } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { mix } from "@/utilities/colors";
import LanguageIcon from "@/components/icons/LanguageIcon";
import __ from "@/utilities/transtation";
import { capitalize } from "@/utilities/string";
import classes from "classnames";

export type DescriptionTableRowOptions = {
    fullLine?: boolean;
    showLastInCompactMode?: boolean;
};

export type DescriptionTableData = [string, string | ReactNode, DescriptionTableRowOptions?][];

export type DescriptionTableProps = {
    children: DescriptionTableData;
    maxWidth?: "2 cols" | "1 col";
    withoutTopBorder?: boolean;
    withoutBottomBorder?: boolean;
};

const languageLevels = { a0: 0, a1: 1, a2: 2, b1: 3, b2: 4, c1: 5, c2: 6 };
export function LanguageModifier({
    language,
    level,
    parenthesis = false,
    onlyIcon = false,
}: {
    language: "ru" | "en";
    level?: keyof typeof languageLevels;
    parenthesis?: boolean;
    onlyIcon?: boolean;
}) {
    return (
        <Box component="span">
            <LanguageIcon language={language} className="mt-[-2px]" />
            {!onlyIcon && " " + __("English")}
            {level && (
                <>
                    <ScoreModifier
                        value={languageLevels[level]}
                        total={6}
                        text={level.toUpperCase()}
                        parenthesis={parenthesis}
                    />
                </>
            )}
        </Box>
    );
}

export function ScoreModifier({
    value,
    total,
    text,
    parenthesis,
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
        (Math.min(value, total) * 100) / total
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

export function PriorityModifier({ kind }: { kind: "Connection" }) {
    const theme = useTheme();
    return kind == "Connection" && <CheckIcon sx={{ margin: "0px 5px", color: theme.palette.success.main }} />;
}

export function TagModifier({ text }: { text: string }) {
    return (
        <Box
            component="span"
            sx={{
                color: useThemeColor("secondaryHoverText"),
                padding: "2px 8px 3px",
                borderRadius: "15px",
                background: useThemeColor("secondaryHoverBg"),
            }}
        >
            {text}
        </Box>
    );
}

export function ForbiddenModifier({ length }: { length: number }) {
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

export function DescriptionTableValue({ name, value }: { name?: string; value: string }) {
    const result = [];
    let index = 0;
    const matches = value.matchAll(/\[[^\]]+?\]/g);
    let elementNum = 0;
    for (const match of matches) {
        if (match.index == undefined) continue;
        if (match.index > index) result.push(value.slice(index, match.index));
        const elKey = name ? `${name}_element${elementNum++}` : `title_${elementNum++}`;
        // eslint-disable-next-line prefer-const
        let [kind, ...props] = match[0].slice(1, -1).split(" ");
        kind = kind.toLowerCase();
        if (kind == "forbidden") result.push(<ForbiddenModifier key={elKey} length={Number(props[0])} />);
        else if (kind == "tag") result.push(<TagModifier key={elKey} text={props.join("\u00A0")} />);
        else if (kind == "priority")
            result.push(
                <PriorityModifier
                    key={elKey}
                    kind={capitalize(props[0]) as Parameters<typeof PriorityModifier>[0]["kind"]}
                />
            );
        else if (kind == "score") {
            const parenthesis = props[0].match(/^\((.+)\)$/);
            const prop = parenthesis ? parenthesis[1] : props[0];
            result.push(
                <ScoreModifier
                    key={elKey}
                    parenthesis={!!parenthesis}
                    value={Number(prop.split("/")[0])}
                    total={Number(prop.split("/")[1])}
                />
            );
        } else if (kind == "language") {
            const parenthesis = props[1].match(/^\((.+)\)$/);
            const level = parenthesis ? parenthesis[1] : props[1];
            result.push(
                <LanguageModifier
                    key={elKey}
                    language={props[0].toLowerCase() as Parameters<typeof LanguageModifier>[0]["language"]}
                    level={
                        (level != "-" && level != undefined ? level.toLowerCase() : undefined) as Parameters<
                            typeof LanguageModifier
                        >[0]["level"]
                    }
                    onlyIcon={props[2] == "onlyIcon"}
                    parenthesis={!!parenthesis}
                />
            );
        } else if (kind == "br") result.push(<br key={elKey} />);
        else if (kind == "nbsp") result.push("\u00A0");
        else result.push(__(match[0].slice(1, -1)));
        index = match.index + match[0].length;
    }
    if (index < value.length) result.push(value.slice(index));
    return result;
}

function DescriptionTableRow({
    index,
    name,
    value,
    opts,
}: {
    index: number;
    name: string;
    value: string | ReactNode;
    opts?: DescriptionTableRowOptions;
}) {
    return (
        <React.Fragment key={`${name}_line`}>
            <Box
                className="grid-title grid-first-title"
                sx={{
                    borderWidth: "0px 0px 1px 1px",
                }}
            >
                {index + 1}
            </Box>
            <Box
                className={classes("grid-title", {
                    "grid-full-title": opts?.fullLine,
                })}
                sx={{
                    borderWidth: "0px 0px 1px 1px",
                }}
            >
                <DescriptionTableValue value={name} />
            </Box>
            <Box
                className={classes("grid-value", { "full-line": opts?.fullLine })}
                sx={{
                    borderWidth: "0px 0px 1px 1px",
                }}
            >
                <div>{typeof value == "string" ? <DescriptionTableValue name={name} value={value} /> : value}</div>
            </Box>
        </React.Fragment>
    );
}

export default function DescriptionTable({
    children,
    withoutTopBorder,
    withoutBottomBorder,
    maxWidth = "2 cols",
}: DescriptionTableProps) {
    const theme = useTheme();
    const isDoubleColMode = useMediaQuery(theme.breakpoints.up("2xl")) && maxWidth == "2 cols";
    return (
        <Box
            sx={{
                borderColor: theme.palette.divider,
                borderStyle: "solid",
                borderBottomWidth: withoutBottomBorder ? "0px" : "1px",
                overflow: "hidden",
            }}
        >
            <Box
                tabIndex={-1}
                className="w-full"
                sx={{
                    userSelect: "text",
                    cursor: "auto",
                    display: "grid",
                    marginBottom: "-1px",
                    borderColor: theme.palette.divider,
                    borderStyle: "solid",
                    borderTopWidth: withoutTopBorder ? "0px" : "1px",
                    [theme.breakpoints.up("2xl")]: {
                        gridTemplateColumns:
                            maxWidth == "1 col" ? "auto minmax(auto, 1fr) 1fr" : "auto auto 1fr auto auto 1fr",
                        "& .grid-full-title": {
                            gridColumn: maxWidth == "1 col" ? "span 2" : "span 1",
                        },
                        "& .full-line": {
                            gridColumn: maxWidth == "1 col" ? "span 3" : "span 4",
                        },
                    },
                    [theme.breakpoints.between("lg", "2xl")]: {
                        gridTemplateColumns: "auto auto 1fr",
                        "& .grid-full-title": {
                            gridColumn: "span 2",
                        },
                        "& .full-line": {
                            gridColumn: "span 3",
                        },
                    },
                    [theme.breakpoints.down("lg")]: {
                        gridTemplateColumns: "auto 1fr",
                        "& .grid-value": {
                            gridColumn: "span 2",
                        },
                    },
                    "& > div:not(.avatar)": {
                        padding: "6px 14px",
                        borderColor: theme.palette.divider,
                        borderStyle: "solid",
                        display: "flex",
                        alignItems: "center",
                        "&.grid-first-title": {
                            padding: "6px 16px",
                        },
                    },
                    "& > .grid-title": {
                        background: getThemeColor("titleBg", theme),
                    },
                    "& > .grid-first-title": {
                        justifyContent: "center",
                    },
                }}
            >
                {(() => {
                    let leftIndex = 0;
                    const fullLineItemsCount = children.reduce(
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        (cnt, [_k, _v, opts]) => (opts?.fullLine ? cnt + 1 : cnt),
                        0
                    );
                    const rightIndexInitial =
                        fullLineItemsCount + Math.ceil((children.length - fullLineItemsCount) / 2);
                    let rightIndex = rightIndexInitial;
                    let index;
                    let leftItem = true;
                    const delayed: DescriptionTableData = [];
                    const res: ReactNode[] = [];
                    while (
                        !isDoubleColMode
                            ? leftIndex < children.length
                            : leftItem
                            ? leftIndex < rightIndexInitial
                            : rightIndex < children.length
                    ) {
                        index = !isDoubleColMode || leftItem ? leftIndex : rightIndex;
                        const [name, val, opts] = children[index];
                        if (!isDoubleColMode && opts?.fullLine && opts?.showLastInCompactMode) {
                            delayed.push(children[index]);
                            leftIndex++;
                            continue;
                        }
                        if (!isDoubleColMode || leftItem) {
                            leftIndex++;
                            if (!opts?.fullLine) leftItem = false;
                        } else {
                            rightIndex++;
                            leftItem = true;
                        }
                        res.push(
                            <DescriptionTableRow
                                key={`${name}_row`}
                                index={index}
                                name={name}
                                value={val}
                                opts={opts}
                            />
                        );
                    }
                    for (const [name, val, opts] of delayed) {
                        index = index ?? 0;
                        res.push(
                            <DescriptionTableRow
                                key={`${name}_row`}
                                index={++index}
                                name={name}
                                value={val}
                                opts={opts}
                            />
                        );
                    }
                    return res;
                })()}
            </Box>
        </Box>
    );
}
