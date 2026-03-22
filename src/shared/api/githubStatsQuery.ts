/**
 * GitHub GraphQL query for fetching all data needed by the GitHub Stats blocks.
 *
 * ============================================================================
 * BLOCK COVERAGE
 * ============================================================================
 *
 * 1. Contribution Calendar     -- handled by react-github-calendar (NO API needed)
 *
 * 2. Stats Card                -- totalStars (summed from repos), totalCommits
 *                                 (contributionsCollection.totalCommitContributions),
 *                                 totalPRs, totalIssues, contributedTo
 *
 * 3. Languages by Repo         -- each repo's languages { edges { size, node { name, color } } }
 *                                 aggregated client-side into proportional breakdown
 *
 * 4. Languages by Commits      -- commitContributionsByRepository with each repo's
 *                                 primaryLanguage + commit count, aggregated client-side
 *
 * 5. Streak Stats              -- contributionCalendar.weeks[].contributionDays[]
 *                                 { date, contributionCount } -- streaks calculated client-side
 *
 * 6. Commits by Hour           -- CANNOT be obtained from GraphQL (see note below)
 *
 * 7. Activity Graph            -- contributionCalendar provides weekly/daily contribution
 *                                 counts for the past year
 *
 * 8. Profile Overview          -- name, avatarUrl, createdAt, repositories.totalCount,
 *                                 contributionCalendar.totalContributions, followers, etc.
 *
 * ============================================================================
 * WHAT CANNOT BE FETCHED VIA GRAPHQL
 * ============================================================================
 *
 * COMMITS BY HOUR (Block 6):
 *   The GitHub GraphQL API does not provide hour-of-day information for commits
 *   in any aggregated form. The `contributionCalendar` is day-level granularity
 *   only (`contributionCount` per date, no time-of-day). While individual commits
 *   do have `committedDate` (ISO 8601 DateTime), fetching them requires traversing
 *   each repository's `defaultBranchRef.target.history` -- this is extremely
 *   expensive (one paginated connection per repo) and would blow through rate limits.
 *
 *   Solutions for Commits by Hour:
 *     a) REST API: GET /repos/{owner}/{repo}/stats/punch_card
 *        Returns hourly commit distribution per day-of-week. One call per repo.
 *        Efficient for a small number of active repos.
 *     b) Client-side calculation from contribution calendar data (approximate:
 *        distribute evenly across hours, which defeats the purpose).
 *     c) Skip this block or use a separate dedicated fetch with caching.
 *
 *   Recommendation: Use REST punch_card endpoint for top N repos by commit count,
 *   then aggregate. Cache aggressively (this data changes slowly).
 *
 * ============================================================================
 * RATE LIMIT COST ESTIMATE
 * ============================================================================
 *
 * Cost formula: sum of (first/last args for each connection) / 100, minimum 1.
 *
 * This query requests:
 *   - repositories(first: 100)                    = 100 nodes
 *     - stargazers (totalCount only, no first)    = 0 extra
 *     - languages(first: 10) per repo             = 100 * 10 = 1,000 nodes
 *   - pullRequests(first: 1)                      = 1 node
 *   - issues(first: 1)                            = 1 node
 *   - repositoriesContributedTo(first: 1)         = 1 node
 *   - followers(first: 1)                         = 1 node
 *   - following(first: 1)                         = 1 node
 *   - commitContributionsByRepository(max: 100)   = ~100 nodes
 *     - contributions(first: 1) per repo          = 100 * 1 = 100 nodes
 *   - contributionCalendar (scalar, no pagination)= 0 extra
 *
 * Total nodes ~ 1,305. Cost ~ ceil(1305 / 100) = ~14 points.
 * Well within the 5,000 points/hour budget.
 *
 * For users with 100+ repos, a second paginated call for repositories is needed
 * (using the `after` cursor). Each additional page costs ~11 points.
 *
 * ============================================================================
 * QUERY
 * ============================================================================
 */

/** Main query -- fetches everything in a single round-trip. */
export const GITHUB_STATS_QUERY = `
query GitHubStats($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {

    # ── Profile Overview (Block 8) ──────────────────────────────────────
    name
    login
    avatarUrl
    createdAt
    bio
    location
    company
    websiteUrl

    followers(first: 1) { totalCount }
    following(first: 1) { totalCount }

    # ── Stats Card (Block 2) — PR & Issue counts ────────────────────────
    pullRequests(first: 1) { totalCount }
    issues(first: 1) { totalCount }
    repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST]) {
      totalCount
    }

    # ── Stars + Languages by Repo (Blocks 2 & 3) ───────────────────────
    # Fetches owned, non-fork repos with star counts and language breakdowns.
    # Sorted by stars descending so the most important repos come first.
    # For users with 100+ repos, use the pageInfo cursor in a follow-up query.
    repositories(
      first: 100
      ownerAffiliations: OWNER
      isFork: false
      orderBy: { field: STARGAZERS, direction: DESC }
    ) {
      totalCount
      nodes {
        name
        stargazerCount
        primaryLanguage {
          name
          color
        }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size       # bytes of this language in this repo
            node {
              name
              color
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }

    # ── Contributions Collection (Blocks 2, 4, 5, 7, 8) ────────────────
    # The 'from' and 'to' args scope the collection to a date range.
    # For current-year stats, pass Jan 1 of current year as 'from'
    # and now as 'to'. The calendar always covers the trailing 1 year.
    contributionsCollection(from: $from, to: $to) {

      # Stats Card (Block 2) — total commits this year
      totalCommitContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      totalIssueContributions
      totalRepositoryContributions
      restrictedContributionsCount

      # For knowing which years the user has been active
      contributionYears

      # Languages by Commits (Block 4) — commit count per repo + repo's
      # primary language allows building "language by commit" breakdown.
      # maxRepositories defaults to 25; set to 100 for broader coverage.
      commitContributionsByRepository(maxRepositories: 100) {
        contributions(first: 1) {
          totalCount       # total commits to this repo in the date range
        }
        repository {
          name
          primaryLanguage {
            name
            color
          }
        }
      }

      # Contribution Calendar (Blocks 5, 7, 8) — full year of daily data.
      # Used for: streak calculation, activity graph, total contributions.
      contributionCalendar {
        totalContributions
        weeks {
          firstDay
          contributionDays {
            date
            contributionCount
            contributionLevel    # NONE, FIRST_QUARTILE, SECOND_QUARTILE, etc.
            weekday
          }
        }
      }
    }
  }
}
`;

/**
 * Pagination query for users with 100+ repositories.
 * Re-fetches the next page of repos with star counts and languages.
 * Use the `endCursor` from the main query's `repositories.pageInfo`.
 */
export const GITHUB_REPOS_PAGE_QUERY = `
query GitHubReposPage($username: String!, $after: String!) {
  user(login: $username) {
    repositories(
      first: 100
      ownerAffiliations: OWNER
      isFork: false
      orderBy: { field: STARGAZERS, direction: DESC }
      after: $after
    ) {
      totalCount
      nodes {
        name
        stargazerCount
        primaryLanguage {
          name
          color
        }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node {
              name
              color
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`;

// ============================================================================
// VARIABLES HELPER
// ============================================================================

/**
 * Builds the variables object for the main query.
 * 'from' defaults to Jan 1 of the current year, 'to' defaults to now.
 */
export function buildGitHubStatsVariables(username: string, year?: number) {
    const y = year ?? new Date().getFullYear();
    return {
        username,
        from: new Date(`${y}-01-01T00:00:00Z`).toISOString(),
        to: new Date().toISOString(),
    };
}

// ============================================================================
// RESPONSE TYPES
// ============================================================================

export interface GitHubLanguageEdge {
    size: number;
    node: {
        name: string;
        color: string | null;
    };
}

export interface GitHubRepoNode {
    name: string;
    stargazerCount: number;
    primaryLanguage: { name: string; color: string | null } | null;
    languages: {
        edges: GitHubLanguageEdge[];
    };
}

export interface GitHubContributionDay {
    date: string;
    contributionCount: number;
    contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
    weekday: number;
}

export interface GitHubContributionWeek {
    firstDay: string;
    contributionDays: GitHubContributionDay[];
}

export interface GitHubCommitContributionByRepo {
    contributions: {
        totalCount: number;
    };
    repository: {
        name: string;
        primaryLanguage: { name: string; color: string | null } | null;
    };
}

export interface GitHubStatsResponse {
    user: {
        // Profile (Block 8)
        name: string | null;
        login: string;
        avatarUrl: string;
        createdAt: string;
        bio: string | null;
        location: string | null;
        company: string | null;
        websiteUrl: string | null;

        followers: { totalCount: number };
        following: { totalCount: number };

        // Stats (Block 2)
        pullRequests: { totalCount: number };
        issues: { totalCount: number };
        repositoriesContributedTo: { totalCount: number };

        // Repos + Languages (Blocks 2, 3)
        repositories: {
            totalCount: number;
            nodes: GitHubRepoNode[];
            pageInfo: {
                hasNextPage: boolean;
                endCursor: string | null;
            };
        };

        // Contributions (Blocks 2, 4, 5, 7, 8)
        contributionsCollection: {
            totalCommitContributions: number;
            totalPullRequestContributions: number;
            totalPullRequestReviewContributions: number;
            totalIssueContributions: number;
            totalRepositoryContributions: number;
            restrictedContributionsCount: number;
            contributionYears: number[];

            commitContributionsByRepository: GitHubCommitContributionByRepo[];

            contributionCalendar: {
                totalContributions: number;
                weeks: GitHubContributionWeek[];
            };
        };
    };
}

// ============================================================================
// CLIENT-SIDE CALCULATION HELPERS (pure functions, no API calls)
// ============================================================================

/**
 * Calculates total stars across all repositories.
 * Call this after aggregating all repo pages.
 */
export function calcTotalStars(repos: GitHubRepoNode[]): number {
    return repos.reduce((sum, r) => sum + r.stargazerCount, 0);
}

/**
 * Aggregates language bytes across all repos into a sorted breakdown.
 * Returns array sorted by total bytes descending.
 */
export function calcLanguagesByRepo(repos: GitHubRepoNode[]) {
    const map = new Map<string, { name: string; color: string | null; bytes: number }>();
    for (const repo of repos) {
        for (const edge of repo.languages.edges) {
            const key = edge.node.name;
            const existing = map.get(key);
            if (existing) {
                existing.bytes += edge.size;
            } else {
                map.set(key, { name: key, color: edge.node.color, bytes: edge.size });
            }
        }
    }
    return Array.from(map.values()).sort((a, b) => b.bytes - a.bytes);
}

/**
 * Aggregates languages by commit count (from commitContributionsByRepository).
 * Groups commit counts by each repo's primary language.
 */
export function calcLanguagesByCommits(
    commitsByRepo: GitHubCommitContributionByRepo[],
) {
    const map = new Map<string, { name: string; color: string | null; commits: number }>();
    for (const entry of commitsByRepo) {
        const lang = entry.repository.primaryLanguage;
        if (!lang) continue;
        const key = lang.name;
        const existing = map.get(key);
        if (existing) {
            existing.commits += entry.contributions.totalCount;
        } else {
            map.set(key, { name: key, color: lang.color, commits: entry.contributions.totalCount });
        }
    }
    return Array.from(map.values()).sort((a, b) => b.commits - a.commits);
}

/**
 * Calculates streak stats from the contribution calendar.
 * Returns current streak, longest streak, and total contributions.
 *
 * A "streak" is a consecutive run of days with contributionCount > 0.
 * Current streak: consecutive days with contributions ending today (or yesterday
 * if today has 0 contributions so far, since the day isn't over).
 */
export function calcStreakStats(weeks: GitHubContributionWeek[]) {
    // Flatten all days, sorted chronologically
    const days = weeks.flatMap((w) => w.contributionDays).sort(
        (a, b) => a.date.localeCompare(b.date),
    );

    let currentStreak = 0;
    let longestStreak = 0;
    let runningStreak = 0;
    let totalContributions = 0;

    const today = new Date().toISOString().slice(0, 10);

    for (const day of days) {
        totalContributions += day.contributionCount;
        if (day.contributionCount > 0) {
            runningStreak++;
            longestStreak = Math.max(longestStreak, runningStreak);
        } else {
            runningStreak = 0;
        }
    }

    // Current streak: walk backwards from today (or yesterday)
    currentStreak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
        const day = days[i];
        // Skip future dates if any
        if (day.date > today) continue;
        // Allow today to have 0 (day not over yet) -- check yesterday
        if (day.date === today && day.contributionCount === 0) continue;
        if (day.contributionCount > 0) {
            currentStreak++;
        } else {
            break;
        }
    }

    return { currentStreak, longestStreak, totalContributions };
}
