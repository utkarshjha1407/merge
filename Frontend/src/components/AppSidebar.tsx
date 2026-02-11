import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  Trophy,
  Users,
  User,
  Github,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/activity", icon: Activity, label: "Activity" },
  { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { to: "/feed", icon: Users, label: "Feed" },
  { to: "/profile", icon: User, label: "Profile" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-16 hover:w-48 transition-all duration-200 bg-sidebar border-r border-sidebar-border flex flex-col items-center group min-h-screen shrink-0">
      {/* Logo */}
      <div className="h-14 flex items-center justify-center w-full border-b border-sidebar-border">
        <Github className="h-6 w-6 text-primary shrink-0" />
        <span className="ml-2 font-mono text-sm font-bold text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">
          CodeStrava
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 mt-4 w-full px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
