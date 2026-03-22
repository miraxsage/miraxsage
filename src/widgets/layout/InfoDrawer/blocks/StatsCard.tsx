"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import StarOutline from "@mui/icons-material/StarOutline";
import CommitOutlined from "@mui/icons-material/CommitOutlined";
import MergeType from "@mui/icons-material/MergeType";
import BugReport from "@mui/icons-material/BugReport";
import Inventory2 from "@mui/icons-material/Inventory2";
import { getThemeColor } from "@/shared/lib/theme";
import __ from "@/shared/lib/i18n/translation";

interface StatsCardProps {
    stats: {
        totalStars: number;
        totalCommits: number;
        totalPRs: number;
        totalIssues: number;
        contributedTo: number;
    };
}

const rows = [
    { icon: StarOutline, label: "Total stars", key: "totalStars" as const },
    { icon: CommitOutlined, label: "Commits", key: "totalCommits" as const, yearPrefix: true },
    { icon: MergeType, label: "Total PRs", key: "totalPRs" as const },
    { icon: BugReport, label: "Total issues", key: "totalIssues" as const },
    { icon: Inventory2, label: "Contributed to", key: "contributedTo" as const },
];

export default function StatsCard({ stats }: StatsCardProps) {
    const theme = useTheme();
    const labelColor = getThemeColor("regularText", theme);
    const valueColor = getThemeColor("menuText", theme);

    return (
        <Stack spacing={0.75} sx={{ fontFamily: "Cascadia" }}>
            {rows.map(({ icon: Icon, label, key, yearPrefix }) => (
                <Box
                    key={key}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <Icon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                    <Typography
                        sx={{
                            fontSize: "0.95rem",
                            color: labelColor,
                            fontFamily: "Cascadia",
                            flex: 1,
                        }}
                    >
                        {yearPrefix ? `${new Date().getFullYear()} ` : ""}{__(label)}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: valueColor,
                            fontFamily: "Cascadia",
                        }}
                    >
                        {stats[key].toLocaleString()}
                    </Typography>
                </Box>
            ))}
        </Stack>
    );
}
