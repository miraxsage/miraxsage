"use client";

import { Box, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { getThemeColor } from "@/shared/lib/theme";

interface CommitsByHourProps {
    hours: number[];
}

export default function CommitsByHour({ hours }: CommitsByHourProps) {
    const theme = useTheme();
    const labelColor = getThemeColor("regularText", theme);

    const xLabels = Array.from({ length: 24 }, (_, i) => i);

    return (
        <Box sx={{ fontFamily: "Cascadia" }}>
            <BarChart
                xAxis={[
                    {
                        data: xLabels,
                        scaleType: "band",
                        tickLabelStyle: {
                            fontSize: 10,
                            fontFamily: "Cascadia",
                            fill: labelColor,
                        },
                        valueFormatter: (v: number) => {
                            if ([0, 6, 12, 18, 23].includes(v)) return `${v}`;
                            return "";
                        },
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
                        data: hours,
                        color: theme.palette.primary.main,
                    },
                ]}
                height={180}
                grid={{ horizontal: true }}
                sx={{
                    "& .MuiChartsGrid-line": {
                        stroke: theme.palette.divider,
                    },
                }}
                slotProps={{ legend: { hidden: true } }}
                margin={{ top: 10, right: 10, bottom: 24, left: 36 }}
            />
        </Box>
    );
}
