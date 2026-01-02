'use client';

import { motion } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';

interface ProofTimelineProps {
  proofs: Array<{
    id: string;
    weekStart: string;
    onchainTxHash?: string | null;
    leafCount: number;
  }>;
}

export default function ProofTimeline({ proofs }: ProofTimelineProps) {
  const formatWeek = (dateString: string) => {
    const date = new Date(dateString);
    const weekEnd = new Date(date);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    return {
      start: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      end: weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  };

  if (proofs.length === 0) {
    return (
      <div className="text-center py-12 text-text-tertiary">
        <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No proofs generated yet</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border-light" />

      <div className="space-y-6">
        {proofs.map((proof, index) => {
          const week = formatWeek(proof.weekStart);
          const isOnchain = !!proof.onchainTxHash;

          return (
            <motion.div
              key={proof.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-4"
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-bg-surface border-2 border-border-light">
                {isOnchain ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-text-primary">
                    {week.start} - {week.end}
                  </h4>
                  <span className="text-xs text-text-tertiary">
                    {proof.leafCount} logs
                  </span>
                </div>
                <p className="text-sm text-text-secondary">
                  {isOnchain ? 'Submitted to blockchain' : 'Pending submission'}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}













