import { useState } from "react";
import { motion } from "framer-motion";
import { User, Loader2, CheckCircle } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

const CompleteProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState(user?.username || "");

  const updateProfileMutation = useMutation({
    mutationFn: async (data: { username: string }) => {
      const response = await api.put('/api/user/profile', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Profile completed successfully!");
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      navigate('/');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || 'Failed to update profile';
      toast.error(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast.error("Username is required");
      return;
    }

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      toast.error("Username can only contain letters, numbers, hyphens, and underscores");
      return;
    }

    updateProfileMutation.mutate({ username });
  };

  const handleSkip = () => {
    // Mark as completed with current username
    updateProfileMutation.mutate({ username: user?.username || "user" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-lg bg-card border border-border p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">GitHub Synced!</h1>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Your GitHub data has been synced. Now let's set up your profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                Choose Your Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={updateProfileMutation.isPending}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Letters, numbers, hyphens, and underscores only (min 3 characters)
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSkip}
                disabled={updateProfileMutation.isPending}
                className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Skip for Now
              </button>
              <button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {updateProfileMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Complete Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CompleteProfile;
