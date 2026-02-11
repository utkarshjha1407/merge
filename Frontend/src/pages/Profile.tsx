import { motion } from "framer-motion";
import { 
  GitCommit, Flame, Users, UserPlus, Calendar, MapPin, Link as LinkIcon, 
  TrendingUp, Plus, Minus, Settings 
} from "lucide-react";
import { currentUser, weeklyStats, repositoryStats } from "@/lib/mock-data";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";

const Profile = () => {
  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-card border border-border p-6"
        >
          <div className="flex items-start gap-6">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.username}
              className="w-24 h-24 rounded-full ring-4 ring-primary/20"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{currentUser.username}</h1>
                  <p className="text-sm text-muted-foreground mt-0.5 font-mono">
                    Full-stack developer · Open source contributor
                  </p>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-border rounded-lg hover:border-primary/30 hover:text-primary transition-colors">
                  <Settings className="h-4 w-4" />
                  Edit Profile
                </button>
              </div>
              
              <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <LinkIcon className="h-4 w-4" />
                  <span className="text-primary">github.com/{currentUser.username}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Joined Jan 2023
                </div>
              </div>

              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-sm font-medium text-foreground">{currentUser.followers}</span>
                  <span className="text-sm text-muted-foreground">followers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-sm font-medium text-foreground">{currentUser.following}</span>
                  <span className="text-sm text-muted-foreground">following</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-3"
        >
          <div className="rounded-lg bg-card border border-border p-4 glow-primary">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-4 w-4 text-streak" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Current Streak
              </span>
            </div>
            <span className="font-mono text-2xl font-bold text-streak">{currentUser.currentStreak}</span>
            <span className="text-xs text-muted-foreground ml-1">days</span>
          </div>
          
          <div className="rounded-lg bg-card border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Longest Streak
              </span>
            </div>
            <span className="font-mono text-2xl font-bold text-foreground">{currentUser.longestStreak}</span>
            <span className="text-xs text-muted-foreground ml-1">days</span>
          </div>
          
          <div className="rounded-lg bg-card border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <GitCommit className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Total Commits
              </span>
            </div>
            <span className="font-mono text-2xl font-bold text-foreground">{currentUser.totalCommits.toLocaleString()}</span>
          </div>
          
          <div className="rounded-lg bg-card border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Plus className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                This Week
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-lg font-bold text-primary">+{weeklyStats.totalAdditions}</span>
              <span className="font-mono text-lg font-bold text-destructive">-{weeklyStats.totalDeletions}</span>
            </div>
          </div>
        </motion.div>

        {/* Heatmap */}
        <ActivityHeatmap />

        {/* Top Repositories */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-lg bg-card border border-border"
        >
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-medium text-foreground">Top Repositories</h3>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border">
            {repositoryStats.map((repo, i) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="bg-card p-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-primary font-medium">{repo.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                    {repo.language}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <GitCommit className="h-3 w-3" />
                  {repo.commits} commits
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
