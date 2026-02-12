import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

const Profile = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-card border border-border p-12 text-center"
        >
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Profile Coming Soon</h2>
          <p className="text-muted-foreground">
            {isAuthenticated 
              ? "We're working on bringing you detailed profile features."
              : "Sign in to access your profile."}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
