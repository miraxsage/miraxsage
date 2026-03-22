"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { getThemeColor } from "@/shared/lib/theme";

interface LanguagesByRepoProps {
    languages: { name: string; color: string | null; bytes: number }[];
}

export default function LanguagesByRepo({ languages }: LanguagesByRepoProps) {
    const theme = useTheme();
    const labelColor = getThemeColor("regularText", theme);

    const top5 = languages.slice(0, 5);
    const total = top5.reduce((sum, l) => sum + l.bytes, 0);

    const data = top5.map((lang, i) => ({
        id: i,
        value: lang.bytes,
        label: lang.name,
        color: lang.color ?? theme.palette.divider,
    }));

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                fontFamily: "Cascadia",
                height: "100%",
            }}
        >
            <Stack spacing={0.5} sx={{ minWidth: 90 }}>
                {data.map((d) => (
                    <Box key={d.id} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                backgroundColor: d.color,
                                flexShrink: 0,
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: "0.95rem",
                                color: labelColor,
                                fontFamily: "Cascadia",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {d.label} {total > 0 ? `${((d.value / total) * 100).toFixed(1)}%` : ""}
                        </Typography>
                    </Box>
                ))}
            </Stack>
            <PieChart
                series={[
                    {
                        data,
                        innerRadius: 35,
                        outerRadius: 60,
                        paddingAngle: 2,
                        cornerRadius: 3,
                        cx: 65,
                        cy: 65,
                    },
                ]}
                width={130}
                height={130}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                slotProps={{ legend: { hidden: true } }}
            />
        </Box>
    );
}
