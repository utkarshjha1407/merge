import { motion } from "framer-motion";
import { Trophy, Flame, GitCommit, Medal, TrendingUp } from "lucide-react";
import { leaderboard } from "@/lib/mock-data";

// Extended leaderboard for this page
const extendedLeaderboard = [
  ...leaderboard,
  { rank: 6, username: "bytewiz", avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=BW&backgroundColor=06b6d4&textColor=ffffff", streak: 12, totalCommits: 1654 },
  { rank: 7, username: "rustacean", avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=RS&backgroundColor=f97316&textColor=ffffff", streak: 9, totalCommits: 1432 },
  { rank: 8, username: "goopher", avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=GO&backgroundColor=14b8a6&textColor=ffffff", streak: 7, totalCommits: 1298 },
  { rank: 9, username: "pythonista", avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=PY&backgroundColor=eab308&textColor=0a0a0a", streak: 5, totalCommits: 1156 },
  { rank: 10, username: "webdev99", avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=WD&backgroundColor=ec4899&textColor=ffffff", streak: 3, totalCommits: 987 },
];

const LeaderboardPage = () => {
  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5 font-mono">
            Top coders ranked by streaks and commits
          </p>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 py-4"
        >
          {/* 2nd place */}
          <div className="flex flex-col items-center justify-end">
            <img
              src={extendedLeaderboard[1].avatarUrl}
              alt={extendedLeaderboard[1].username}
              className="w-14 h-14 rounded-full mb-2"
            />
            <span className="text-sm font-medium text-foreground">{extendedLeaderboard[1].username}</span>
            <div className="mt-3 w-full h-24 bg-secondary rounded-t-lg flex flex-col items-center justify-center">
              <Medal className="h-5 w-5 text-muted-foreground" />
              <span className="font-mono text-lg font-bold text-foreground">#2</span>
            </div>
          </div>
          
          {/* 1st place */}
          <div className="flex flex-col items-center justify-end">
            <img
              src={extendedLeaderboard[0].avatarUrl}
              alt={extendedLeaderboard[0].username}
              className="w-16 h-16 rounded-full mb-2 ring-2 ring-streak"
            />
            <span className="text-sm font-medium text-foreground">{extendedLeaderboard[0].username}</span>
            <div className="mt-3 w-full h-32 bg-gradient-to-t from-primary/20 to-primary/5 border border-primary/30 rounded-t-lg flex flex-col items-center justify-center">
              <Trophy className="h-6 w-6 text-streak" />
              <span className="font-mono text-xl font-bold text-foreground">#1</span>
            </div>
          </div>
          
          {/* 3rd place */}
          <div className="flex flex-col items-center justify-end">
            <img
              src={extendedLeaderboard[2].avatarUrl}
              alt={extendedLeaderboard[2].username}
              className="w-14 h-14 rounded-full mb-2"
            />
            <span className="text-sm font-medium text-foreground">{extendedLeaderboard[2].username}</span>
            <div className="mt-3 w-full h-20 bg-secondary rounded-t-lg flex flex-col items-center justify-center">
              <Medal className="h-5 w-5 text-warning" />
              <span className="font-mono text-lg font-bold text-foreground">#3</span>
            </div>
          </div>
        </motion.div>

        {/* Full Rankings */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-lg bg-card border border-border"
        >
          <div className="p-4 border-b border-border flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium text-foreground">Full Rankings</h3>
          </div>
          <div className="divide-y divide-border">
            {extendedLeaderboard.map((user, i) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.04 }}
                className={`px-4 py-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors ${
                  user.rank <= 3 ? "bg-primary/5" : ""
                }`}
              >
                <span className={`font-mono text-sm w-8 ${
                  user.rank === 1 ? "text-streak font-bold" : 
                  user.rank === 2 ? "text-muted-foreground font-bold" :
                  user.rank === 3 ? "text-warning font-bold" : "text-muted-foreground"
                }`}>
                  #{user.rank}
                </span>
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-foreground">{user.username}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-streak">
                      <Flame className="h-4 w-4" />
                      <span className="font-mono text-sm font-medium">{user.streak}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase">streak</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-foreground">
                      <GitCommit className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-sm font-medium">{user.totalCommits.toLocaleString()}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase">commits</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
