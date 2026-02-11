import { motion } from "framer-motion";
import { GitCommit, Plus, Minus, Filter } from "lucide-react";
import { recentActivities, repositoryStats } from "@/lib/mock-data";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";

const Activity = () => {
  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground">Activity</h1>
          <p className="text-sm text-muted-foreground mt-0.5 font-mono">
            Your coding history and contributions
          </p>
        </motion.div>

        <ActivityHeatmap />

        {/* Repository Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-lg bg-card border border-border"
        >
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">Top Repositories</h3>
          </div>
          <div className="divide-y divide-border">
            {repositoryStats.map((repo, i) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="px-4 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded bg-secondary">
                    <GitCommit className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <span className="font-mono text-sm text-foreground">{repo.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{repo.language}</span>
                  </div>
                </div>
                <span className="font-mono text-sm text-muted-foreground">{repo.commits} commits</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Activity */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-lg bg-card border border-border"
        >
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">All Activity</h3>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </button>
          </div>
          <div className="divide-y divide-border">
            {[...recentActivities, ...recentActivities].map((activity, i) => (
              <motion.div
                key={`${activity.id}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.03 }}
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
                  <p className="text-sm text-foreground truncate">{activity.message}</p>
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
      </div>
    </div>
  );
};

export default Activity;
