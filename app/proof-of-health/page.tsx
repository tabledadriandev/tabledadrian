'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Hash, TrendingUp, Clock } from 'lucide-react';
import PageTransition from '@/components/ui/PageTransition';
import AnimatedCard from '@/components/ui/AnimatedCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import MerkleProofCard from '@/components/proof-of-health/MerkleProofCard';
import ProofTimeline from '@/components/proof-of-health/ProofTimeline';
import { useAccount } from '@/hooks/useAccount';

export default function ProofOfHealthPage() {
  const account = useAccount();
  const userId = (account as any)?.userId || account?.address;
  const [proofs, setProofs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (userId) {
      loadProofs();
    }
  }, [userId]);

  const loadProofs = async () => {
    try {
      const response = await fetch('/api/proof-of-health/merkle/roots');
      const data = await response.json();
      if (data.success) {
        setProofs(data.data.roots || []);
      }
    } catch (error) {
      console.error('Load proofs error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateWeekly = async () => {
    if (!userId || generating) return;

    setGenerating(true);
    try {
      const response = await fetch('/api/proof-of-health/merkle/generate-weekly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      if (data.success) {
        await loadProofs();
      }
    } catch (error) {
      console.error('Generate error:', error);
    } finally {
      setGenerating(false);
    }
  };

  const stats = {
    totalProofs: proofs.length,
    onchainProofs: proofs.filter((p) => p.onchainTxHash).length,
    totalLogs: proofs.reduce((sum, p) => sum + (p.leafCount || 0), 0),
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-accent-primary" />
            <h1 className="text-3xl font-bold text-text-primary">Proof of Health</h1>
          </div>
          <p className="text-text-secondary">
            Cryptographic proofs of your biomarker data using Merkle trees. Your data stays
            private—only hashes are stored onchain.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <AnimatedCard className="p-6 bg-bg-surface/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <Hash className="w-5 h-5 text-accent-primary" />
              <h3 className="text-sm font-medium text-text-secondary">Total Proofs</h3>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stats.totalProofs}</p>
          </AnimatedCard>

          <AnimatedCard className="p-6 bg-bg-surface/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h3 className="text-sm font-medium text-text-secondary">Onchain</h3>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stats.onchainProofs}</p>
          </AnimatedCard>

          <AnimatedCard className="p-6 bg-bg-surface/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <h3 className="text-sm font-medium text-text-secondary">Total Logs</h3>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stats.totalLogs}</p>
          </AnimatedCard>
        </div>

        {/* Actions */}
        <div className="mb-8">
          <AnimatedButton
            onClick={handleGenerateWeekly}
            disabled={generating || !userId}
            className="px-6 py-3 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 transition-colors disabled:opacity-50"
          >
            {generating ? 'Generating...' : 'Generate Weekly Merkle Root'}
          </AnimatedButton>
        </div>

        {/* Proofs Grid */}
        {loading ? (
          <div className="text-center py-12 text-text-tertiary">Loading proofs...</div>
        ) : proofs.length === 0 ? (
          <AnimatedCard className="p-12 text-center bg-bg-surface/50 backdrop-blur-sm">
            <Hash className="w-16 h-16 mx-auto mb-4 text-text-tertiary opacity-50" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              No proofs generated yet
            </h3>
            <p className="text-text-secondary mb-4">
              Generate your first weekly Merkle root from your biomarker logs
            </p>
            <AnimatedButton
              onClick={handleGenerateWeekly}
              disabled={generating || !userId}
              className="px-6 py-3 bg-accent-primary text-white rounded-lg"
            >
              Generate Proof
            </AnimatedButton>
          </AnimatedCard>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {proofs.map((proof) => (
              <MerkleProofCard
                key={proof.id}
                proof={proof}
                onSubmit={loadProofs}
              />
            ))}
          </div>
        )}

        {/* Timeline View */}
        {proofs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-6">Timeline</h2>
            <AnimatedCard className="p-8 bg-bg-surface/50 backdrop-blur-sm">
              <ProofTimeline proofs={proofs} />
            </AnimatedCard>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}







