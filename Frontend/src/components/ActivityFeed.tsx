import { motion } from "framer-motion";
import { GitCommit, Plus, Minus } from "lucide-react";
import type { Activity } from "@/lib/types";

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-lg bg-card border border-border"
    >
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground">Recent Activity</h3>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 + i * 0.05 }}
            className="px-4 py-3 flex items-start gap-3 hover:bg-secondary/30 transition-colors"
          >
            <div className="mt-0.5 p-1.5 rounded bg-secondary">
              <GitCommit className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-mono text-xs text-primary font-medium">
                  {activity.repoName}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {activity.activityDate}
                </span>
              </div>
              <p className="text-sm text-foreground truncate">{activity.message || 'No message'}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
                  <GitCommit className="h-3 w-3" />
                  {activity.commitCount}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-primary">
                  <Plus className="h-3 w-3" />
                  {activity.additions}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-destructive">
                  <Minus className="h-3 w-3" />
                  {activity.deletions}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
