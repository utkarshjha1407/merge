import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { Navigate } from "react-router-dom";

const Activity = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-5xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <Construction className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Activity Page</h1>
          <p className="text-muted-foreground">
            Coming soon - detailed activity history and repository stats
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Activity;
