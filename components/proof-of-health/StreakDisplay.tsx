'use client';

import { motion } from 'framer-motion';
import { Flame, TrendingUp } from 'lucide-react';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface StreakDisplayProps {
  streak: number;
  missedReveals: number;
  shouldSlash: boolean;
}

export default function StreakDisplay({
  streak,
  missedReveals,
  shouldSlash,
}: StreakDisplayProps) {
  const getStreakColor = () => {
    if (streak >= 90) return 'text-purple-500';
    if (streak >= 60) return 'text-blue-500';
    if (streak >= 30) return 'text-green-500';
    return 'text-yellow-500';
  };

  const getNextMilestone = () => {
    if (streak < 30) return { days: 30 - streak, badge: '30-Day Badge' };
    if (streak < 60) return { days: 60 - streak, badge: '60-Day Badge' };
    if (streak < 90) return { days: 90 - streak, badge: '90-Day Badge' };
    return null;
  };

  const nextMilestone = getNextMilestone();

  return (
    <AnimatedCard className="p-6 bg-bg-surface/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Flame className={`w-6 h-6 ${getStreakColor()}`} />
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Current Streak
            </h3>
            <p className="text-sm text-text-tertiary">Consecutive days</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-3xl font-bold ${getStreakColor()}`}>{streak}</p>
          <p className="text-xs text-text-tertiary">days</p>
        </div>
      </div>

      {nextMilestone && (
        <div className="mb-4 p-3 bg-accent-primary/10 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-accent-primary" />
            <p className="text-sm font-medium text-text-primary">
              {nextMilestone.days} days until {nextMilestone.badge}
            </p>
          </div>
        </div>
      )}

      {missedReveals > 0 && (
        <div
          className={`p-3 rounded-lg ${
            shouldSlash
              ? 'bg-red-500/10 border border-red-500/20'
              : 'bg-yellow-500/10 border border-yellow-500/20'
          }`}
        >
          <p className="text-sm font-medium text-text-primary mb-1">
            Missed Reveals: {missedReveals}
          </p>
          {shouldSlash && (
            <p className="text-xs text-red-500">
              Warning: 3+ missed reveals may result in stake slashing
            </p>
          )}
        </div>
      )}
    </AnimatedCard>
  );
}













