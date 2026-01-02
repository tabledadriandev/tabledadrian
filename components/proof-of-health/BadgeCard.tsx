'use client';

import { motion } from 'framer-motion';
import { Award, CheckCircle, ExternalLink, Clock } from 'lucide-react';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface BadgeCardProps {
  badge: {
    id: string;
    badgeType: string;
    tokenId?: string | null;
    mintTxHash?: string | null;
    metadata: any;
    issuedAt: string;
    expiresAt?: string | null;
  };
}

const BADGE_INFO: Record<string, { name: string; color: string; icon: any }> = {
  '30_day_adherence': {
    name: '30-Day Protocol Adherence',
    color: 'text-blue-500',
    icon: Award,
  },
  clinician_attested: {
    name: 'Clinician-Attested Plan',
    color: 'text-green-500',
    icon: CheckCircle,
  },
  sleep_improvement: {
    name: 'Sleep Improvement (90-Day)',
    color: 'text-purple-500',
    icon: Award,
  },
  metabolic_signature: {
    name: 'Metabolic Signature',
    color: 'text-orange-500',
    icon: Award,
  },
  protocol_warrior: {
    name: 'Protocol Warrior',
    color: 'text-red-500',
    icon: Award,
  },
};

export default function BadgeCard({ badge }: BadgeCardProps) {
  const info = BADGE_INFO[badge.badgeType] || {
    name: badge.badgeType,
    color: 'text-gray-500',
    icon: Award,
  };
  const Icon = info.icon;
  const isOnchain = !!badge.mintTxHash;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <AnimatedCard className="p-6 bg-bg-surface/50 backdrop-blur-sm border border-border-light hover:border-accent-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 ${info.color} bg-${info.color.split('-')[1]}-500/10 rounded-lg`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{info.name}</h3>
            <p className="text-xs text-text-tertiary">
              Issued {formatDate(badge.issuedAt)}
            </p>
          </div>
        </div>
        {isOnchain ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <Clock className="w-5 h-5 text-yellow-500" />
        )}
      </div>

      {badge.metadata && (
        <div className="space-y-2 mb-4 text-sm text-text-secondary">
          {badge.metadata.streakLength && (
            <p>Streak: {badge.metadata.streakLength} days</p>
          )}
          {badge.metadata.protocolID && (
            <p>Protocol: {badge.metadata.protocolID}</p>
          )}
          {badge.metadata.testType && (
            <p>Test: {badge.metadata.testType}</p>
          )}
        </div>
      )}

      {badge.mintTxHash && (
        <a
          href={`https://basescan.org/tx/${badge.mintTxHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-accent-primary hover:underline flex items-center gap-1"
        >
          View on BaseScan
          <ExternalLink className="w-3 h-3" />
        </a>
      )}

      {badge.expiresAt && (
        <p className="text-xs text-text-tertiary mt-2">
          Expires: {formatDate(badge.expiresAt)}
        </p>
      )}
    </AnimatedCard>
  );
}













