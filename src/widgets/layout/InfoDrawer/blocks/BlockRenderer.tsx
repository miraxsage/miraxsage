"use client";

import type { ProcessedGitHubStats } from "@/app/api/github-stats/route";
import {
    ContributionCalendar,
    StatsCard,
    LanguagesByRepo,
    LanguagesByCommits,
    StreakStats,
    CommitsByHour,
    ActivityGraph,
    ProfileOverview,
} from "./index";

export default function BlockRenderer({ blockId, data, username }: { blockId: string; data: ProcessedGitHubStats; username: string }) {
    switch (blockId) {
        case "calendar":
            return <ContributionCalendar username={username} />;
        case "stats":
            return <StatsCard stats={data.stats} />;
        case "languages_repo":
            return <LanguagesByRepo languages={data.languagesByRepo} />;
        case "languages_commits":
            return <LanguagesByCommits languages={data.languagesByCommits} />;
        case "streak":
            return <StreakStats streak={data.streak} />;
        case "commits_hour":
            return <CommitsByHour hours={data.commitsByHour} />;
        case "activity":
            return <ActivityGraph calendar={data.contributionCalendar} />;
        case "profile":
            return <ProfileOverview profile={data.profile} totalContributions={data.contributionCalendar.totalContributions} />;
        default:
            return null;
    }
}
