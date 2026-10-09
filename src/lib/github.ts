const GITHUB_USERNAME = "coder-nik200";

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type GitHubContributions = {
  total: {
    lastYear: number;
  };
  contributions: ContributionDay[];
};

export async function getGitHubContributions(
  username: string = GITHUB_USERNAME,
): Promise<GitHubContributions | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      console.error(`Failed to fetch GitHub contributions: ${res.status}`);
      return null;
    }

    const data: GitHubContributions = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return null;
  }
}

export function groupContributionsByWeek(
  contributions: ContributionDay[],
): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  let week: ContributionDay[] = [];

  if (contributions.length === 0) {
    return weeks;
  }

  // Add empty days before the first contribution to align Sunday–Saturday.
  const firstDay = new Date(`${contributions[0].date}T00:00:00`).getDay();

  for (let i = 0; i < firstDay; i++) {
    week.push({
      date: "",
      count: 0,
      level: -1,
    });
  }

  for (const day of contributions) {
    week.push(day);

    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  // Keep the final, incomplete week aligned to seven days.
  if (week.length > 0) {
    while (week.length < 7) {
      week.push({
        date: "",
        count: 0,
        level: -1,
      });
    }

    weeks.push(week);
  }

  return weeks;
}