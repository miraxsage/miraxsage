"use client";

import { Box, alpha, useTheme } from "@mui/material";
import { GitHubCalendar } from "react-github-calendar";
import __ from "@/shared/lib/i18n/translation";

interface ContributionCalendarProps {
    username: string;
}

export default function ContributionCalendar({ username }: ContributionCalendarProps) {
    const theme = useTheme();

    const calendarTheme = {
        dark: [
            "transparent",
            alpha(theme.palette.primary.main, 0.15),
            alpha(theme.palette.primary.main, 0.35),
            alpha(theme.palette.primary.main, 0.6),
            theme.palette.primary.main,
        ] as [string, string, string, string, string],
        light: [
            "#ebedf0",
            alpha(theme.palette.primary.main, 0.2),
            alpha(theme.palette.primary.main, 0.4),
            alpha(theme.palette.primary.main, 0.65),
            theme.palette.primary.main,
        ] as [string, string, string, string, string],
    };

    const labels = {
        months: [__("Jan"), __("Feb"), __("Mar"), __("Apr"), __("May"), __("Jun"), __("Jul"), __("Aug"), __("Sep"), __("Oct"), __("Nov"), __("Dec")],
        totalCount: `{{count}} ${__("activities in the last year")}`,
        legend: {
            less: __("Less"),
            more: __("More"),
        },
    };

    return (
        <Box
            sx={{
                fontFamily: "Cascadia",
                "& .react-activity-calendar__scroll-container": {
                    "&::-webkit-scrollbar": { height: "2px !important", background: "transparent !important" },
                    "&::-webkit-scrollbar-thumb": { background: "transparent !important", borderRadius: "2px !important" },
                },
                "&:hover .react-activity-calendar__scroll-container::-webkit-scrollbar-thumb": {
                    background: `${theme.palette.divider} !important`,
                },
            }}
        >
            <GitHubCalendar
                username={username}
                theme={calendarTheme}
                colorScheme={theme.palette.mode}
                fontSize={12}
                blockSize={11}
                blockMargin={3}
                labels={labels}
            />
        </Box>
    );
}
