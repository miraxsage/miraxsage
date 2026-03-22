import { NextRequest } from "next/server";
import { jsonResponse, errorResponse } from "@/shared/api/response";
import {
    GITHUB_STATS_QUERY,
    buildGitHubStatsVariables,
    calcTotalStars,
    calcLanguagesByRepo,
    calcLanguagesByCommits,
    calcStreakStats,
    type GitHubStatsResponse,
} from "@/shared/api/githubStatsQuery";

// Cache for 24 hours
let cachedData: ProcessedGitHubStats | null = null;
let cachedAt = 0;
const CACHE_TTL = 24 * 60 * 60 * 1000;

export interface ProcessedGitHubStats {
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
    stats: {
        totalStars: number;
        totalCommits: number;
        totalPRs: number;
        totalIssues: number;
        contributedTo: number;
    };
    languagesByRepo: { name: string; color: string | null; bytes: number }[];
    languagesByCommits: { name: string; color: string | null; commits: number }[];
    streak: {
        currentStreak: number;
        longestStreak: number;
        totalContributions: number;
    };
    contributionCalendar: {
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
    };
    commitsByHour: number[];
}

async function fetchGitHubGraphQL(query: string, variables: Record<string, unknown>) {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error("GITHUB_TOKEN not configured");

    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`GitHub API error ${res.status}: ${text}`);
    }

    const json = await res.json();
    if (json.errors) {
        throw new Error(`GitHub GraphQL errors: ${JSON.stringify(json.errors)}`);
    }

    return json.data as GitHubStatsResponse;
}

async function fetchPunchCard(username: string, repos: string[]): Promise<number[]> {
    const token = process.env.GITHUB_TOKEN;
    const hours = new Array(24).fill(0);

    // Fetch punch card for top repos (limit to 10 to avoid rate limits)
    const topRepos = repos.slice(0, 10);
    const results = await Promise.allSettled(
        topRepos.map(async (repo) => {
            const res = await fetch(
                `https://api.github.com/repos/${username}/${repo}/stats/punch_card`,
                {
                    headers: token
                        ? { Authorization: `bearer ${token}` }
                        : {},
                }
            );
            if (!res.ok) return [];
            return (await res.json()) as [number, number, number][];
        })
    );

    for (const result of results) {
        if (result.status === "fulfilled" && Array.isArray(result.value)) {
            for (const [, hour, commits] of result.value) {
                hours[hour] += commits;
            }
        }
    }

    return hours;
}

async function fetchAndProcess(username: string): Promise<ProcessedGitHubStats> {
    const variables = buildGitHubStatsVariables(username);
    const data = await fetchGitHubGraphQL(GITHUB_STATS_QUERY, variables);
    const user = data.user;

    const repos = user.repositories.nodes;
    const cc = user.contributionsCollection;

    // Punch card for commits by hour
    const repoNames = repos.map((r) => r.name);
    const commitsByHour = await fetchPunchCard(username, repoNames);

    return {
        profile: {
            name: user.name,
            login: user.login,
            avatarUrl: user.avatarUrl,
            createdAt: user.createdAt,
            bio: user.bio,
            followers: user.followers.totalCount,
            following: user.following.totalCount,
            publicRepos: user.repositories.totalCount,
        },
        stats: {
            totalStars: calcTotalStars(repos),
            totalCommits: cc.totalCommitContributions,
            totalPRs: user.pullRequests.totalCount,
            totalIssues: user.issues.totalCount,
            contributedTo: user.repositoriesContributedTo.totalCount,
        },
        languagesByRepo: calcLanguagesByRepo(repos).slice(0, 8),
        languagesByCommits: calcLanguagesByCommits(cc.commitContributionsByRepository).slice(0, 8),
        streak: calcStreakStats(cc.contributionCalendar.weeks),
        contributionCalendar: cc.contributionCalendar,
        commitsByHour,
    };
}

export async function GET(request: NextRequest) {
    try {
        const username = request.nextUrl.searchParams.get("username") ?? "miraxsage";

        // Check cache
        if (cachedData && Date.now() - cachedAt < CACHE_TTL) {
            return jsonResponse(cachedData);
        }

        const stats = await fetchAndProcess(username);

        cachedData = stats;
        cachedAt = Date.now();

        return jsonResponse(stats);
    } catch (error) {
        console.error("GitHub Stats API error:", error);
        return errorResponse(
            error instanceof Error ? error.message : "Failed to fetch GitHub stats",
            500
        );
    }
}
