import { useMemo } from "react";
import { motion } from "framer-motion";
import type { DailyStat } from "@/lib/types";

function getHeatmapLevel(count: number): string {
  if (count === 0) return "bg-heatmap-0";
  if (count <= 3) return "bg-heatmap-1";
  if (count <= 6) return "bg-heatmap-2";
  if (count <= 10) return "bg-heatmap-3";
  return "bg-heatmap-4";
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

interface ActivityHeatmapProps {
  data: DailyStat[];
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  const heatmapData = useMemo(() => {
    return data.map(stat => ({
      date: stat.date,
      count: stat.commitCount
    }));
  }, [data]);

  const totalCommits = heatmapData.reduce((sum, d) => sum + d.count, 0);

  // Group by weeks (columns)
  const weeks: { date: string; count: number }[][] = [];
  let currentWeek: { date: string; count: number }[] = [];

  // Pad the first week
  const firstDay = new Date(heatmapData[0]?.date || new Date()).getDay();
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push({ date: "", count: -1 });
  }

  heatmapData.forEach((d) => {
    currentWeek.push(d);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Calculate month labels
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIdx) => {
    const validDay = week.find((d) => d.date !== "");
    if (validDay) {
      const month = new Date(validDay.date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTHS[month], col: weekIdx });
        lastMonth = month;
      }
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-lg bg-card border border-border p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">
          {totalCommits.toLocaleString()} contributions in the last year
        </h3>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-0.5 min-w-max">
          {/* Month labels */}
          <div className="flex ml-8 mb-1">
            {monthLabels.map((m, i) => (
              <span
                key={i}
                className="text-[10px] text-muted-foreground font-mono"
                style={{
                  position: "relative",
                  left: `${m.col * 13}px`,
                  marginRight: i < monthLabels.length - 1
                    ? `${(monthLabels[i + 1].col - m.col) * 13 - 28}px`
                    : 0,
                }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-0">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] mr-2 mt-0">
              {DAYS.map((d, i) => (
                <span key={i} className="text-[10px] text-muted-foreground font-mono h-[11px] leading-[11px]">
                  {d}
                </span>
              ))}
            </div>

            {/* Weeks */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className={`w-[11px] h-[11px] rounded-sm ${
                        day.count === -1 ? "bg-transparent" : getHeatmapLevel(day.count)
                      }`}
                      title={day.date ? `${day.date}: ${day.count} commits` : ""}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1.5 mt-3 ml-8">
            <span className="text-[10px] text-muted-foreground font-mono">Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-[11px] h-[11px] rounded-sm bg-heatmap-${level}`}
              />
            ))}
            <span className="text-[10px] text-muted-foreground font-mono">More</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
