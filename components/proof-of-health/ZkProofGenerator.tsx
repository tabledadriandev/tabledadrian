'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Sparkles } from 'lucide-react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function ZkProofGenerator() {
  const [generating, setGenerating] = useState(false);
  const [hba1c, setHba1c] = useState('');
  const [vo2max, setVo2max] = useState('');
  const [proof, setProof] = useState<any>(null);

  const handleGenerate = async () => {
    if (generating) return;

    const biomarker = hba1c ? { hba1c: parseFloat(hba1c) } : { vo2max: parseFloat(vo2max) };

    if (!hba1c && !vo2max) {
      alert('Please provide either HbA1c or VO2max value');
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch('/api/proof-of-health/zk/generate-proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(biomarker),
      });

      const data = await response.json();
      if (data.success) {
        setProof(data.data);
      }
    } catch (error) {
      console.error('Generate proof error:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <AnimatedCard className="p-6 bg-bg-surface/50 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-5 h-5 text-accent-primary" />
        <h3 className="text-lg font-semibold text-text-primary">
          Generate Metabolic Signature Proof
        </h3>
      </div>

      <p className="text-sm text-text-secondary mb-4">
        Prove your biomarker is in a healthy range without revealing the exact value.
        Uses zero-knowledge proofs for privacy.
      </p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-text-secondary mb-2 block">
            HbA1c (prove &lt; 5.7%)
          </label>
          <input
            type="number"
            step="0.1"
            value={hba1c}
            onChange={(e) => {
              setHba1c(e.target.value);
              setVo2max('');
            }}
            placeholder="e.g., 5.2"
            className="w-full px-4 py-2 bg-bg-elevated border border-border-light rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary"
          />
        </div>

        <div className="text-center text-text-tertiary text-sm">OR</div>

        <div>
          <label className="text-sm font-medium text-text-secondary mb-2 block">
            VO2max (prove &gt; 35)
          </label>
          <input
            type="number"
            step="0.1"
            value={vo2max}
            onChange={(e) => {
              setVo2max(e.target.value);
              setHba1c('');
            }}
            placeholder="e.g., 42"
            className="w-full px-4 py-2 bg-bg-elevated border border-border-light rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary"
          />
        </div>

        <AnimatedButton
          onClick={handleGenerate}
          disabled={generating || (!hba1c && !vo2max)}
          className="w-full px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 disabled:opacity-50"
        >
          {generating ? (
            <>
              <Sparkles className="w-4 h-4 inline mr-2 animate-spin" />
              Generating Proof...
            </>
          ) : (
            'Generate zk-Proof'
          )}
        </AnimatedButton>

        {proof && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
          >
            <p className="text-sm font-medium text-green-500 mb-2">
              Proof Generated Successfully
            </p>
            <p className="text-xs text-text-secondary mb-2">
              {proof.biomarker}: {proof.range}
            </p>
            <p className="text-xs text-text-tertiary">
              Proof hash: {proof.proofHash.slice(0, 16)}...
            </p>
          </motion.div>
        )}
      </div>
    </AnimatedCard>
  );
}













