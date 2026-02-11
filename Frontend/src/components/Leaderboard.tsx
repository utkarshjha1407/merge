import { motion } from "framer-motion";
import { useLeaderboard } from "@/lib/hooks/useLeaderboard";
import { Trophy, Flame, GitCommit, Loader2 } from "lucide-react";

export function Leaderboard() {
  const { data: leaderboard, isLoading } = useLeaderboard(5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-lg bg-card border border-border"
    >
      <div className="p-4 border-b border-border flex items-center gap-2">
        <Trophy className="h-4 w-4 text-streak" />
        <h3 className="text-sm font-medium text-foreground">Leaderboard</h3>
      </div>
      {isLoading ? (
        <div className="p-8 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="divide-y divide-border">
          {leaderboard?.map((entry) => (
            <div key={entry.rank} className="px-4 py-3 flex items-center gap-3">
              <span className="font-mono text-xs text-muted-foreground w-5">
                #{entry.rank}
              </span>
              <img
                src={entry.user.avatarUrl}
                alt={entry.user.username}
                className="w-7 h-7 rounded-full"
              />
              <span className="flex-1 text-sm font-medium text-foreground">
                {entry.user.username}
              </span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-xs font-mono text-streak">
                  <Flame className="h-3 w-3" />
                  {entry.currentStreak}
                </span>
                <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                  <GitCommit className="h-3 w-3" />
                  {entry.totalCommits.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
