import { Flame, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakDisplay({ currentStreak, longestStreak }: StreakDisplayProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-lg bg-card border border-border p-5 glow-primary"
      >
        <div className="flex items-center gap-2 mb-3">
          <Flame className="h-4 w-4 text-streak" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Current Streak
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="stat-value text-streak">{currentStreak}</span>
          <span className="text-sm text-muted-foreground font-mono">days</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-lg bg-card border border-border p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Longest Streak
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="stat-value text-foreground">{longestStreak}</span>
          <span className="text-sm text-muted-foreground font-mono">days</span>
        </div>
      </motion.div>
    </div>
  );
}
