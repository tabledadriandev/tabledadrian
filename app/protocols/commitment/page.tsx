'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Calendar } from 'lucide-react';
import PageTransition from '@/components/ui/PageTransition';
import CommitmentTracker from '@/components/proof-of-health/CommitmentTracker';
import StreakDisplay from '@/components/proof-of-health/StreakDisplay';
import { useAccount } from '@/hooks/useAccount';

export default function ProtocolCommitmentPage() {
  const account = useAccount();
  const userId = (account as any)?.userId || account?.address;
  const [protocolId, setProtocolId] = useState('default');
  const [streak, setStreak] = useState(0);
  const [missedReveals, setMissedReveals] = useState(0);
  const [shouldSlash, setShouldSlash] = useState(false);

  useEffect(() => {
    if (userId && protocolId) {
      loadStreak();
    }
  }, [userId, protocolId]);

  const loadStreak = async () => {
    try {
      const response = await fetch(
        `/api/proof-of-health/commitment/streak?protocolId=${protocolId}`
      );
      const data = await response.json();
      if (data.success) {
        setStreak(data.data.streak);
        setMissedReveals(data.data.missedReveals);
        setShouldSlash(data.data.shouldSlash);
      }
    } catch (error) {
      console.error('Load streak error:', error);
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-8 h-8 text-accent-primary" />
            <h1 className="text-3xl font-bold text-text-primary">
              Protocol Commitment
            </h1>
          </div>
          <p className="text-text-secondary">
            Commit to your daily protocol actions using time-locked commitments.
            Reveal within 24 hours to maintain your streak.
          </p>
        </motion.div>

        {/* Streak Display */}
        <div className="mb-6">
          <StreakDisplay
            streak={streak}
            missedReveals={missedReveals}
            shouldSlash={shouldSlash}
          />
        </div>

        {/* Commitment Tracker */}
        <CommitmentTracker
          protocolId={protocolId}
          onCommit={loadStreak}
          onReveal={loadStreak}
        />
      </div>
    </PageTransition>
  );
}







