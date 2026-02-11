// Mock data for the Strava for Coders frontend

export const currentUser = {
  id: "1",
  username: "alexdev",
  avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=AD&backgroundColor=22c55e&textColor=0a0a0a",
  currentStreak: 23,
  longestStreak: 47,
  totalCommits: 2847,
  followers: 142,
  following: 89,
};

export const weeklyStats = {
  totalCommits: 47,
  totalAdditions: 1283,
  totalDeletions: 456,
  activeRepos: 4,
  avgPerDay: 6.7,
};

// Generate heatmap data for the last 365 days
export function generateHeatmapData(): { date: string; count: number }[] {
  const data: { date: string; count: number }[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();
    
    // More activity on weekdays
    const isWeekday = dayOfWeek > 0 && dayOfWeek < 6;
    const baseChance = isWeekday ? 0.75 : 0.4;
    const hasActivity = Math.random() < baseChance;
    
    const count = hasActivity
      ? Math.floor(Math.random() * (isWeekday ? 15 : 8)) + 1
      : 0;

    data.push({
      date: date.toISOString().split("T")[0],
      count,
    });
  }
  return data;
}

export const recentActivities = [
  {
    id: "1",
    repoName: "strava-for-coders",
    commitCount: 5,
    additions: 234,
    deletions: 56,
    activityDate: "2026-02-08",
    message: "feat: add activity heatmap component",
  },
  {
    id: "2",
    repoName: "react-dashboard",
    commitCount: 3,
    additions: 89,
    deletions: 12,
    activityDate: "2026-02-08",
    message: "fix: resolve chart rendering issue",
  },
  {
    id: "3",
    repoName: "api-gateway",
    commitCount: 8,
    additions: 456,
    deletions: 123,
    activityDate: "2026-02-07",
    message: "refactor: improve error handling",
  },
  {
    id: "4",
    repoName: "strava-for-coders",
    commitCount: 2,
    additions: 45,
    deletions: 8,
    activityDate: "2026-02-07",
    message: "docs: update API documentation",
  },
  {
    id: "5",
    repoName: "ml-pipeline",
    commitCount: 6,
    additions: 312,
    deletions: 89,
    activityDate: "2026-02-06",
    message: "feat: add data preprocessing step",
  },
];

export const repositoryStats = [
  { name: "strava-for-coders", commits: 156, language: "TypeScript" },
  { name: "api-gateway", commits: 89, language: "Go" },
  { name: "react-dashboard", commits: 67, language: "TypeScript" },
  { name: "ml-pipeline", commits: 43, language: "Python" },
  { name: "dotfiles", commits: 21, language: "Shell" },
];

export const weeklyChartData = [
  { day: "Mon", commits: 8 },
  { day: "Tue", commits: 12 },
  { day: "Wed", commits: 5 },
  { day: "Thu", commits: 15 },
  { day: "Fri", commits: 9 },
  { day: "Sat", commits: 3 },
  { day: "Sun", commits: 2 },
];

export const monthlyChartData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    commits: Math.floor(Math.random() * 18) + 1,
  };
});

export const leaderboard = [
  { rank: 1, username: "sarahcodes", avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=SC&backgroundColor=3b82f6&textColor=ffffff", streak: 67, totalCommits: 4521 },
  { rank: 2, username: "devmike", avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=DM&backgroundColor=8b5cf6&textColor=ffffff", streak: 52, totalCommits: 3890 },
  { rank: 3, username: "alexdev", avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=AD&backgroundColor=22c55e&textColor=0a0a0a", streak: 23, totalCommits: 2847 },
  { rank: 4, username: "janetech", avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=JT&backgroundColor=f59e0b&textColor=0a0a0a", streak: 19, totalCommits: 2134 },
  { rank: 5, username: "codecraft", avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=CC&backgroundColor=ef4444&textColor=ffffff", streak: 14, totalCommits: 1876 },
];

export const feedItems = [
  { id: "1", user: "sarahcodes", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=SC&backgroundColor=3b82f6&textColor=ffffff", action: "pushed 12 commits to", target: "neural-net-lib", time: "2h ago" },
  { id: "2", user: "devmike", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=DM&backgroundColor=8b5cf6&textColor=ffffff", action: "hit a 52-day streak!", target: "", time: "3h ago" },
  { id: "3", user: "janetech", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=JT&backgroundColor=f59e0b&textColor=0a0a0a", action: "pushed 5 commits to", target: "react-components", time: "5h ago" },
  { id: "4", user: "codecraft", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=CC&backgroundColor=ef4444&textColor=ffffff", action: "started following", target: "alexdev", time: "6h ago" },
];
