import { motion } from "framer-motion";
import { GitCommit, Flame, UserPlus, Star, GitBranch } from "lucide-react";
import { feedItems } from "@/lib/mock-data";

// Extended feed for this page
const extendedFeed = [
  { id: "1", user: "sarahcodes", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=SC&backgroundColor=3b82f6&textColor=ffffff", action: "pushed 12 commits to", target: "neural-net-lib", time: "2h ago", type: "commit" },
  { id: "2", user: "devmike", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=DM&backgroundColor=8b5cf6&textColor=ffffff", action: "hit a 52-day streak!", target: "", time: "3h ago", type: "streak" },
  { id: "3", user: "janetech", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=JT&backgroundColor=f59e0b&textColor=0a0a0a", action: "pushed 5 commits to", target: "react-components", time: "5h ago", type: "commit" },
  { id: "4", user: "codecraft", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=CC&backgroundColor=ef4444&textColor=ffffff", action: "started following", target: "alexdev", time: "6h ago", type: "follow" },
  { id: "5", user: "bytewiz", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=BW&backgroundColor=06b6d4&textColor=ffffff", action: "starred", target: "strava-for-coders", time: "7h ago", type: "star" },
  { id: "6", user: "rustacean", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=RS&backgroundColor=f97316&textColor=ffffff", action: "pushed 8 commits to", target: "rust-cli-tools", time: "8h ago", type: "commit" },
  { id: "7", user: "goopher", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=GO&backgroundColor=14b8a6&textColor=ffffff", action: "hit a 7-day streak!", target: "", time: "9h ago", type: "streak" },
  { id: "8", user: "pythonista", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=PY&backgroundColor=eab308&textColor=0a0a0a", action: "forked", target: "ml-pipeline", time: "10h ago", type: "fork" },
  { id: "9", user: "webdev99", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=WD&backgroundColor=ec4899&textColor=ffffff", action: "pushed 3 commits to", target: "portfolio-site", time: "11h ago", type: "commit" },
  { id: "10", user: "sarahcodes", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=SC&backgroundColor=3b82f6&textColor=ffffff", action: "started following", target: "devmike", time: "12h ago", type: "follow" },
];

function getIcon(type: string) {
  switch (type) {
    case "commit": return GitCommit;
    case "streak": return Flame;
    case "follow": return UserPlus;
    case "star": return Star;
    case "fork": return GitBranch;
    default: return GitCommit;
  }
}

function getIconColor(type: string) {
  switch (type) {
    case "commit": return "text-primary";
    case "streak": return "text-streak";
    case "follow": return "text-blue-400";
    case "star": return "text-yellow-400";
    case "fork": return "text-purple-400";
    default: return "text-primary";
  }
}

const Feed = () => {
  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground">Feed</h1>
          <p className="text-sm text-muted-foreground mt-0.5 font-mono">
            See what the community is building
          </p>
        </motion.div>

        {/* Feed Items */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          {extendedFeed.map((item, i) => {
            const Icon = getIcon(item.type);
            const iconColor = getIconColor(item.type);
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="rounded-lg bg-card border border-border p-4 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={item.avatar}
                    alt={item.user}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-foreground">{item.user}</span>
                      <span className="text-muted-foreground text-sm">{item.action}</span>
                      {item.target && (
                        <span className="font-mono text-primary text-sm">{item.target}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className={`p-1 rounded bg-secondary ${iconColor}`}>
                        <Icon className="h-3 w-3" />
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">{item.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center pt-4"
        >
          <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:border-primary/30 transition-colors">
            Load more
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Feed;
