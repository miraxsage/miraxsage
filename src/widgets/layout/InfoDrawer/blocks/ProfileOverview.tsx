"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import GitHub from "@mui/icons-material/GitHub";
import FolderOpen from "@mui/icons-material/FolderOpen";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { getThemeColor } from "@/shared/lib/theme";
import __ from "@/shared/lib/i18n/translation";

interface ProfileOverviewProps {
    profile: {
        name: string | null;
        login: string;
        avatarUrl: string;
        createdAt: string;
        bio: string | null;
        followers: number;
        following: number;
        publicRepos: number;
    };
    totalContributions: number;
}

export default function ProfileOverview({ profile, totalContributions }: ProfileOverviewProps) {
    const theme = useTheme();
    const nameColor = getThemeColor("menuText", theme);
    const labelColor = getThemeColor("regularText", theme);
    const accentColor = theme.palette.primary.main;

    const currentYear = new Date().getFullYear();
    const joinedYear = new Date(profile.createdAt).getFullYear();

    const statItems = [
        { icon: GitHub, text: `${totalContributions.toLocaleString()} ${__("contributions in")} ${currentYear}` },
        { icon: FolderOpen, text: `${profile.publicRepos} ${__("public repos")}` },
        { icon: CalendarMonth, text: `${__("Joined")} ${joinedYear}` },
    ];

    return (
        <Stack spacing={0.5} sx={{ fontFamily: "Cascadia" }}>
            <Typography
                sx={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: nameColor,
                    fontFamily: "Cascadia",
                    lineHeight: 1.3,
                }}
            >
                {profile.name ?? profile.login}
            </Typography>
            <Typography
                sx={{
                    fontSize: "0.82rem",
                    color: labelColor,
                    fontFamily: "Cascadia",
                    lineHeight: 1.2,
                }}
            >
                @{profile.login}
            </Typography>
            <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                {statItems.map(({ icon: Icon, text }, i) => (
                    <Box
                        key={i}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                        }}
                    >
                        <Icon sx={{ fontSize: 16, color: accentColor }} />
                        <Typography
                            sx={{
                                fontSize: "0.75rem",
                                color: labelColor,
                                fontFamily: "Cascadia",
                            }}
                        >
                            {text}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}
