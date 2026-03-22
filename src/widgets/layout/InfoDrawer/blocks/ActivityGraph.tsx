"use client";

import { useMemo } from "react";
import { Box, alpha, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { getThemeColor } from "@/shared/lib/theme";
import __ from "@/shared/lib/i18n/translation";

interface ContributionCalendar {
    totalContributions: number;
    weeks: {
        firstDay: string;
        contributionDays: {
            date: string;
            contributionCount: number;
            contributionLevel: string;
            weekday: number;
        }[];
    }[];
}

interface ActivityGraphProps {
    calendar: ContributionCalendar;
}

export default function ActivityGraph({ calendar }: ActivityGraphProps) {
    const theme = useTheme();
    const labelColor = getThemeColor("regularText", theme);

    const { weekDates, weekSums } = useMemo(() => {
        const dates: Date[] = [];
        const sums: number[] = [];

        for (const week of calendar.weeks) {
            const weekTotal = week.contributionDays.reduce(
                (sum, day) => sum + day.contributionCount,
                0,
            );
            dates.push(new Date(week.firstDay));
            sums.push(weekTotal);
        }

        return { weekDates: dates, weekSums: sums };
    }, [calendar]);

    const months = [
        __("Jan"), __("Feb"), __("Mar"), __("Apr"), __("May"), __("Jun"),
        __("Jul"), __("Aug"), __("Sep"), __("Oct"), __("Nov"), __("Dec"),
    ];

    return (
        <Box sx={{ fontFamily: "Cascadia" }}>
            <LineChart
                xAxis={[
                    {
                        data: weekDates,
                        scaleType: "time",
                        tickLabelStyle: {
                            fontSize: 10,
                            fontFamily: "Cascadia",
                            fill: labelColor,
                        },
                        valueFormatter: (date: Date) => months[date.getMonth()],
                    },
                ]}
                yAxis={[
                    {
                        tickLabelStyle: {
                            fontSize: 10,
                            fontFamily: "Cascadia",
                            fill: labelColor,
                        },
                    },
                ]}
                series={[
                    {
                        data: weekSums,
                        color: theme.palette.primary.main,
                        area: true,
                        showMark: false,
                    },
                ]}
                height={180}
                grid={{ horizontal: true }}
                sx={{
                    "& .MuiChartsGrid-line": {
                        stroke: theme.palette.divider,
                    },
                    "& .MuiAreaElement-root": {
                        fill: alpha(theme.palette.primary.main, 0.15),
                    },
                }}
                slotProps={{ legend: { hidden: true } }}
                margin={{ top: 10, right: 10, bottom: 24, left: 36 }}
            />
        </Box>
    );
}
