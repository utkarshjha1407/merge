import { motion } from "framer-motion";
import { useFeed } from "@/lib/hooks/useFeed";
import { Loader2 } from "lucide-react";

export function SocialFeed() {
  const { data: feedItems, isLoading } = useFeed(5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="rounded-lg bg-card border border-border"
    >
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground">Feed</h3>
      </div>
      {isLoading ? (
        <div className="p-8 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="divide-y divide-border">
          {feedItems?.map((item) => (
            <div key={item.id} className="px-4 py-3 flex items-center gap-3">
              <img
                src={item.user.avatarUrl}
                alt={item.user.username}
                className="w-7 h-7 rounded-full"
              />
              <div className="flex-1 text-sm">
                <span className="font-medium text-foreground">{item.user.username}</span>{" "}
                <span className="text-muted-foreground">
                  {item.type === 'commit' ? 'pushed commits to' : 
                   item.type === 'streak' ? 'achieved a streak!' : 
                   'started following'}
                </span>{" "}
                {item.activity && (
                  <span className="font-mono text-primary text-xs">{item.activity.repoName}</span>
                )}
              </div>
              <span className="text-[11px] text-muted-foreground font-mono">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
