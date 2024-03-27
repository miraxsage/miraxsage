import AccentedTabs from "@/components/AccentedTabs";
import { DescriptionTableValue } from "@/components/DescriptionTable";
import { getThemeColor } from "@/components/contexts/Theme";
import { chartColors } from "@/utilities/colors";
import { capitalize } from "@/utilities/string";
import __ from "@/utilities/transtation";
import { Box, SxProps, alpha, useMediaQuery, useTheme } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type TechnologiesTableProps = {
    data: [
        string, // name
        string, // docslink
        icon: React.FC, // icon
        number, // level
        number, // experience
        number // projects
    ][];
};

type TechnologiesChartProps = {
    data: TechnologiesTableProps["data"];
    currentChart?: "spread" | "stat";
    onCurrentChartChange?: (chart: "spread" | "stat") => void;
    sx?: SxProps;
};

function levelKind(level: number) {
    if (level < 0) level = 0;
    if (level > 100) level = 100;
    if (level > 80) return "high";
    if (level > 60) return "above average";
    if (level > 40) return "average";
    if (level > 20) return "below average";
    return "low";
}

function TechnologiesChart({ data, currentChart, onCurrentChartChange, sx }: TechnologiesChartProps) {
    const theme = useTheme();
    const is3xl = useMediaQuery(theme.breakpoints.only("3xl"));
    const isxl = useMediaQuery(theme.breakpoints.only("xl"));
    const belowlg = useMediaQuery(theme.breakpoints.down("lg"));
    const colors = chartColors(data.length).map((c) => alpha(c, 0.7));
    const [currentTab, setCurrentTab] = useState("stat");
    const spreadChartData = data.map(([name, , , level], i) => ({
        id: i,
        value: level,
        label: name,
        color: colors[i],
    }));
    const statXAxises: string[] = [];
    const statChartData: { label: string; data: number[]; color: string }[] = [
        { label: __("Level"), color: colors[0], data: [] },
        { label: __("Experience"), color: colors[Math.floor(data.length / 4)], data: [] },
        { label: __("Projects|2"), color: colors[Math.floor(data.length / 2)], data: [] },
    ];
    data.forEach(([name, , , level, experience, projects]) => {
        statChartData[0].data.push(level / 10);
        statChartData[1].data.push(experience);
        statChartData[2].data.push(projects);
        statXAxises.push(
            name.replace("FramerMotion", "Framer").replace("ReactRouter", "Router").replace("Typescript", "TS")
        );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (currentChart && onCurrentChartChange && currentChart != currentTab) setCurrentTab(currentChart);
    });

    return (
        <Box sx={{ display: "flex", flexDirection: "column", ...sx }} style={{ padding: 0 }}>
            <AccentedTabs
                activeTab={currentTab}
                onTabSelect={({ id }) => {
                    if (!onCurrentChartChange) setCurrentTab(String(id));
                    else onCurrentChartChange(String(id) as "spread" | "stat");
                }}
                accentMode="primaryStrong"
                size="small"
                sx={{ width: "100%", "& .MuiTab-root": { paddingTop: "8px" } }}
            >
                {[
                    { id: "spread", title: __("Spread") },
                    { id: "stat", title: __("Statistic") },
                ]}
            </AccentedTabs>
            <Box
                sx={{ flexGrow: 1, alignItems: "center", padding: "10px 0px" }}
                style={{ display: currentTab == "spread" ? "flex" : "none" }}
            >
                <PieChart
                    sx={{
                        "& .MuiChartsLegend-series text": {
                            fill: getThemeColor("regularText", theme) + "!important",
                        },
                        "& .MuiChartsLegend-root": {
                            transform: belowlg ? "translateX(-25%) translateY(25%)" : "none",
                        },
                    }}
                    series={[
                        {
                            data: spreadChartData,
                            highlightScope: { faded: "global", highlighted: "item" },
                            faded: {
                                innerRadius: 30,
                                additionalRadius: -30,
                                color: theme.palette.divider,
                            },
                            innerRadius: 60,
                            paddingAngle: 0.5,
                            cornerRadius: 5,
                            cx: belowlg ? "65%" : 160,
                            cy: belowlg ? "25%" : "50%",
                        },
                    ]}
                    height={belowlg ? 610 : 310}
                    width={belowlg ? 380 : 550}
                />
            </Box>
            <Box
                sx={{ flexGrow: 1, alignItems: "center", padding: "10px 0px" }}
                style={{ display: currentTab == "stat" ? "flex" : "none" }}
            >
                <BarChart
                    grid={{ horizontal: true, vertical: true }}
                    xAxis={[{ scaleType: "band", data: statXAxises }]}
                    series={statChartData}
                    width={is3xl || isxl ? 750 : belowlg ? 400 : 550}
                    height={300}
                />
            </Box>
        </Box>
    );
}

export default function TechnologiesTable({ data }: TechnologiesTableProps) {
    const theme = useTheme();
    const abovexl = useMediaQuery(theme.breakpoints.up("2xl"));
    const belowlg = useMediaQuery(theme.breakpoints.down("lg"));
    const navigate = useNavigate();
    const [currentChart, setCurrentChart] = useState<"spread" | "stat">("stat");
    return (
        <>
            <Box
                tabIndex={-1}
                className="w-full"
                sx={{
                    display: "grid",
                    userSelect: "text",
                    borderColor: theme.palette.divider,
                    borderStyle: "solid",
                    borderWidth: "0px 0px 1px 0px",
                    [theme.breakpoints.up("2xl")]: {
                        gridTemplateColumns: "repeat(5, auto) 1fr",
                    },
                    [theme.breakpoints.between("lg", "2xl")]: {
                        gridTemplateColumns: "auto 1fr auto auto auto",
                    },
                    [theme.breakpoints.down("lg")]: {
                        gridTemplateColumns: "auto auto 1fr",
                    },
                    "& > div, & > a": {
                        padding: "6px 12px",
                        borderColor: theme.palette.divider,
                        borderStyle: "solid",
                        borderWidth: "1px 0px 0px 1px",
                        display: "flex",
                        alignItems: "center",
                    },
                    "& > .grid-title": {
                        background: getThemeColor("titleBg", theme),
                    },
                }}
            >
                <Box className="grid-title">№</Box>
                <Box className="grid-title" sx={{ gridColumn: "span " + (belowlg ? 2 : 1) }}>
                    {__("Technology")}
                </Box>
                {!belowlg && (
                    <>
                        <Box className="grid-title">{abovexl ? __("Proficiency level") : __("Level")}</Box>
                        <Box className="grid-title">{__("Experience")}</Box>
                        <Box className="grid-title">{__("Projects|2")}</Box>
                        {abovexl && <Box className="grid-title">{__("Visualtization")}</Box>}
                    </>
                )}
                {data.map(([name, docsLink, Icon, level, experience, projects], i) => {
                    const num = i + 1;
                    return (
                        <React.Fragment key={`${name}_line`}>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>{num}</Box>
                            <Box
                                component="a"
                                href={docsLink}
                                target="_blank"
                                sx={{
                                    gridColumn: "span " + (belowlg ? 2 : 1),
                                    cursor: "pointer",
                                    display: "block",
                                    "&:hover": {
                                        color: getThemeColor("regularHoverText", theme),
                                        background: getThemeColor("titleBg", theme),
                                        "& .MuiSvgIcon-root": {
                                            color: getThemeColor("regularHoverIcon", theme),
                                        },
                                    },
                                    "& .MuiSvgIcon-root": {
                                        fontSize: "20px",
                                        marginRight: "5px",
                                        color: getThemeColor("regularIcon", theme),
                                    },
                                }}
                            >
                                {<Icon />} {name}
                            </Box>
                            {belowlg && (
                                <>
                                    <Box></Box>
                                    <Box className="grid-title">{__("Level")}</Box>
                                </>
                            )}
                            <Box>
                                {__(capitalize(levelKind(level)))}{" "}
                                <DescriptionTableValue value={`[Score (${level}/100)]`} />
                            </Box>
                            {belowlg && (
                                <>
                                    <Box style={{ borderTopWidth: 0 }}></Box>
                                    <Box className="grid-title">{__("Experience")}</Box>
                                </>
                            )}
                            <Box>
                                <DescriptionTableValue value={`[Score ${experience}/5]`} />
                            </Box>
                            {belowlg && (
                                <>
                                    <Box style={{ borderTopWidth: 0 }}></Box>
                                    <Box className="grid-title">{__("Projects|3")}</Box>
                                </>
                            )}
                            <Box
                                onClick={(e: React.MouseEvent) => {
                                    e.preventDefault();
                                    navigate("/projects?cats=" + name.toLowerCase());
                                }}
                                component="a"
                                href={"/projects?cats=" + name.toLowerCase()}
                                sx={{
                                    display: "block",
                                    cursor: "pointer",
                                    "&:hover": {
                                        "& span": {
                                            color: getThemeColor("regularHoverText", theme),
                                        },
                                        background: getThemeColor("titleBg", theme),
                                    },
                                }}
                            >
                                <DescriptionTableValue value={`[Score ${projects}/10]`} />
                            </Box>
                            {i == 0 && abovexl ? (
                                <TechnologiesChart
                                    currentChart={currentChart}
                                    onCurrentChartChange={(chart) => setCurrentChart(chart)}
                                    data={data}
                                    sx={{ gridRow: "span " + Math.max(10, data.length) }}
                                />
                            ) : null}
                        </React.Fragment>
                    );
                })}
                {abovexl &&
                    data.length < 10 &&
                    Array.from({ length: 10 - data.length }).map((_val, i) => (
                        <Box
                            key={`empty_${i}`}
                            sx={{
                                gridColumn: "span 5",
                                ".MuiTreeItem-label div&": { borderTopWidth: i > 0 ? 0 : "1px" },
                            }}
                        >
                            &nbsp;
                        </Box>
                    ))}
                {!abovexl && (
                    <>
                        <Box className="grid-title" sx={{ gridColumn: "span " + (belowlg ? 3 : 5) }}>
                            {__("Visualization")}
                        </Box>
                        <TechnologiesChart
                            currentChart={currentChart}
                            onCurrentChartChange={(chart) => setCurrentChart(chart)}
                            data={data}
                            sx={{ gridColumn: "span " + (belowlg ? 3 : 5) }}
                        />
                    </>
                )}
            </Box>
        </>
    );
}
