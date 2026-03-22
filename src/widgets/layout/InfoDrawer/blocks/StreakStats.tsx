"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import LocalFireDepartment from "@mui/icons-material/LocalFireDepartment";
import EmojiEvents from "@mui/icons-material/EmojiEvents";
import TrendingUp from "@mui/icons-material/TrendingUp";
import { getThemeColor } from "@/shared/lib/theme";
import __ from "@/shared/lib/i18n/translation";

interface StreakStatsProps {
    streak: {
        currentStreak: number;
        longestStreak: number;
        totalContributions: number;
    };
}

const columns = [
    { icon: LocalFireDepartment, label: "Current streak", key: "currentStreak" as const, suffix: "days" },
    { icon: EmojiEvents, label: "Longest streak", key: "longestStreak" as const, suffix: "days" },
    { icon: TrendingUp, label: "Total contributions", key: "totalContributions" as const, suffix: "" },
];

export default function StreakStats({ streak }: StreakStatsProps) {
    const theme = useTheme();
    const valueColor = getThemeColor("menuText", theme);
    const labelColor = getThemeColor("regularText", theme);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                textAlign: "center",
                fontFamily: "Cascadia",
                height: "100%",
            }}
        >
            {columns.map(({ icon: Icon, label, key, suffix }) => (
                <Stack key={key} alignItems="center" spacing={0.5}>
                    <Icon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                        <Typography
                            sx={{
                                fontSize: "1.6rem",
                                fontWeight: 700,
                                color: valueColor,
                                fontFamily: "Cascadia",
                                lineHeight: 1,
                            }}
                        >
                            {streak[key].toLocaleString()}
                        </Typography>
                        {suffix && (
                            <Typography
                                sx={{
                                    fontSize: "0.7rem",
                                    color: labelColor,
                                    fontFamily: "Cascadia",
                                }}
                            >
                                {__(suffix)}
                            </Typography>
                        )}
                    </Box>
                    <Typography
                        sx={{
                            fontSize: "0.72rem",
                            color: labelColor,
                            fontFamily: "Cascadia",
                            lineHeight: 1.2,
                        }}
                    >
                        {__(label)}
                    </Typography>
                </Stack>
            ))}
        </Box>
    );
}
