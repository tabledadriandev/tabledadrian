'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, Lock } from 'lucide-react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import AnimatedButton from '@/components/ui/AnimatedButton';

interface CommitmentTrackerProps {
  protocolId: string;
  onCommit?: () => void;
  onReveal?: () => void;
}

export default function CommitmentTracker({
  protocolId,
  onCommit,
  onReveal,
}: CommitmentTrackerProps) {
  const [committing, setCommitting] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [intendedActions, setIntendedActions] = useState<string[]>([]);

  const handleCommit = async () => {
    if (committing || intendedActions.length === 0) return;

    setCommitting(true);
    try {
      const today = Math.floor(Date.now() / (1000 * 60 * 60 * 24));

      const response = await fetch('/api/proof-of-health/commitment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          protocolId,
          day: today,
          intendedActions,
        }),
      });

      const data = await response.json();
      if (data.success && onCommit) {
        onCommit();
      }
    } catch (error) {
      console.error('Commit error:', error);
    } finally {
      setCommitting(false);
    }
  };

  return (
    <AnimatedCard className="p-6 bg-bg-surface/50 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <Lock className="w-5 h-5 text-accent-primary" />
        <h3 className="text-lg font-semibold text-text-primary">
          Daily Commitment
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-text-secondary mb-2 block">
            Intended Actions Today
          </label>
          <textarea
            value={intendedActions.join(', ')}
            onChange={(e) =>
              setIntendedActions(
                e.target.value.split(',').map((a) => a.trim()).filter(Boolean)
              )
            }
            placeholder="e.g., meditation, cold plunge, fasting"
            className="w-full px-4 py-2 bg-bg-elevated border border-border-light rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary"
            rows={3}
          />
        </div>

        <AnimatedButton
          onClick={handleCommit}
          disabled={committing || intendedActions.length === 0}
          className="w-full px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 disabled:opacity-50"
        >
          {committing ? 'Committing...' : 'Commit to Protocol'}
        </AnimatedButton>

        <p className="text-xs text-text-tertiary">
          You must reveal this commitment within 24 hours to maintain your
          streak.
        </p>
      </div>
    </AnimatedCard>
  );
}













