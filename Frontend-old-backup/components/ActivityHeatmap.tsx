'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface HeatmapProps {
  data: Array<{ date: string; count: number }>;
}

export default function ActivityHeatmap({ data }: HeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  // Generate 365 days grid
  const generateGrid = () => {
    const grid: Array<{ date: string; count: number }> = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayData = data.find(d => d.date === dateStr);
      grid.push({
        date: dateStr,
        count: dayData?.count || 0,
      });
    }
    
    return grid;
  };

  const getIntensity = (count: number) => {
    if (count === 0) return 'bg-midnight-900';
    if (count <= 2) return 'bg-neon-green/20';
    if (count <= 5) return 'bg-neon-green/40';
    if (count <= 10) return 'bg-neon-green/60';
    return 'bg-neon-green/80';
  };

  const grid = generateGrid();
  const weeks = Math.ceil(grid.length / 7);

  return (
    <div className="relative">
      <div className="flex gap-1 overflow-x-auto pb-4">
        {Array.from({ length: weeks }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, dayIndex) => {
              const index = weekIndex * 7 + dayIndex;
              if (index >= grid.length) return null;
              
              const day = grid[index];
              
              return (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.001 }}
                  whileHover={{ scale: 1.2 }}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`
                    w-3 h-3 rounded-sm cursor-pointer transition-all
                    ${getIntensity(day.count)}
                    hover:ring-2 hover:ring-neon-green/50
                  `}
                  title={`${day.date}: ${day.count} commits`}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-midnight-900 border border-midnight-800 rounded-lg text-sm whitespace-nowrap"
        >
          <div className="font-medium">{hoveredDay.count} commits</div>
          <div className="text-gray-500 text-xs">{hoveredDay.date}</div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-midnight-900" />
          <div className="w-3 h-3 rounded-sm bg-neon-green/20" />
          <div className="w-3 h-3 rounded-sm bg-neon-green/40" />
          <div className="w-3 h-3 rounded-sm bg-neon-green/60" />
          <div className="w-3 h-3 rounded-sm bg-neon-green/80" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
