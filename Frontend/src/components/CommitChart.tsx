import { motion } from "framer-motion";
import { weeklyChartData, monthlyChartData } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area } from "recharts";
import { useState } from "react";

export function CommitChart() {
  const [view, setView] = useState<"week" | "month">("week");
  const data = view === "week" ? weeklyChartData : monthlyChartData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="rounded-lg bg-card border border-border p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Commit History</h3>
        <div className="flex gap-1 bg-secondary rounded-md p-0.5">
          <button
            onClick={() => setView("week")}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              view === "week"
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            7D
          </button>
          <button
            onClick={() => setView("month")}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              view === "month"
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            30D
          </button>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          {view === "week" ? (
            <BarChart data={data} barSize={24}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(215 12% 48%)", fontFamily: "JetBrains Mono" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(215 12% 48%)", fontFamily: "JetBrains Mono" }}
                width={24}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220 14% 7%)",
                  border: "1px solid hsl(220 12% 14%)",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontFamily: "JetBrains Mono",
                  color: "hsl(210 20% 92%)",
                }}
              />
              <Bar dataKey="commits" fill="hsl(152 60% 52%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(152 60% 52%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(152 60% 52%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "hsl(215 12% 48%)", fontFamily: "JetBrains Mono" }}
                interval={6}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(215 12% 48%)", fontFamily: "JetBrains Mono" }}
                width={24}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220 14% 7%)",
                  border: "1px solid hsl(220 12% 14%)",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontFamily: "JetBrains Mono",
                  color: "hsl(210 20% 92%)",
                }}
              />
              <Area
                type="monotone"
                dataKey="commits"
                stroke="hsl(152 60% 52%)"
                strokeWidth={2}
                fill="url(#commitGradient)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
