'use client';

import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <div className="stat-card animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 w-24 bg-midnight-800 rounded"></div>
        <div className="h-6 w-6 bg-midnight-800 rounded"></div>
      </div>
      <div className="h-8 w-32 bg-midnight-800 rounded"></div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="stat-card animate-pulse">
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-midnight-800 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-5 w-48 bg-midnight-800 rounded"></div>
          <div className="h-4 w-32 bg-midnight-800 rounded"></div>
        </div>
        <div className="h-8 w-20 bg-midnight-800 rounded"></div>
      </div>
    </div>
  );
}

export function SkeletonFeed() {
  return (
    <div className="stat-card animate-pulse">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-midnight-800 rounded-full"></div>
          <div className="h-5 w-32 bg-midnight-800 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-midnight-800 rounded"></div>
          <div className="h-4 w-3/4 bg-midnight-800 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonHeatmap() {
  return (
    <div className="animate-pulse">
      <div className="flex gap-1">
        {Array.from({ length: 52 }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <div
                key={dayIndex}
                className="w-3 h-3 bg-midnight-800 rounded-sm"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

interface SkeletonListProps {
  count?: number;
  type?: 'card' | 'row' | 'feed';
}

export function SkeletonList({ count = 5, type = 'row' }: SkeletonListProps) {
  const Component = type === 'card' ? SkeletonCard : type === 'feed' ? SkeletonFeed : SkeletonRow;
  
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}
