'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ExternalLink, Hash } from 'lucide-react';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface MerkleProofCardProps {
  proof: {
    id: string;
    merkleRoot: string;
    weekStart: string;
    onchainTxHash?: string | null;
    leafCount: number;
    createdAt: string;
  };
  onGenerate?: () => void;
  onSubmit?: () => void;
}

export default function MerkleProofCard({ proof, onGenerate, onSubmit }: MerkleProofCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!proof.merkleRoot || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/proof-of-health/merkle/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proofId: proof.id,
          merkleRoot: proof.merkleRoot,
          weekStart: proof.weekStart,
        }),
      });

      const data = await response.json();
      if (data.success && onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const truncateHash = (hash: string) => {
    if (!hash) return 'N/A';
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  return (
    <AnimatedCard className="p-6 bg-bg-surface/50 backdrop-blur-sm border border-border-light">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent-primary/10 rounded-lg">
            <Hash className="w-5 h-5 text-accent-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Week of {formatDate(proof.weekStart)}
            </h3>
            <p className="text-sm text-text-tertiary">
              {proof.leafCount} biomarker logs
            </p>
          </div>
        </div>
        {proof.onchainTxHash ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <Clock className="w-5 h-5 text-yellow-500" />
        )}
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <p className="text-xs text-text-tertiary mb-1">Merkle Root</p>
          <code className="text-xs bg-bg-elevated px-2 py-1 rounded text-text-secondary font-mono break-all">
            {truncateHash(proof.merkleRoot)}
          </code>
        </div>

        {proof.onchainTxHash && (
          <div>
            <p className="text-xs text-text-tertiary mb-1">Transaction</p>
            <a
              href={`https://basescan.org/tx/${proof.onchainTxHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent-primary hover:underline flex items-center gap-1"
            >
              {truncateHash(proof.onchainTxHash)}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

      {!proof.onchainTxHash && (
        <motion.button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit to Blockchain'}
        </motion.button>
      )}
    </AnimatedCard>
  );
}













