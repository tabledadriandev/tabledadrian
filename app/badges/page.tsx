'use client';

import { motion } from 'framer-motion';
import { Award, Shield } from 'lucide-react';
import PageTransition from '@/components/ui/PageTransition';
import BadgeGallery from '@/components/proof-of-health/BadgeGallery';

export default function BadgesPage() {
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
            <Award className="w-8 h-8 text-accent-primary" />
            <h1 className="text-3xl font-bold text-text-primary">Health Badges</h1>
          </div>
          <p className="text-text-secondary">
            Your collection of verified health achievements. Badges are Soulbound Tokens (SBTs)
            that cannot be transferred—they represent your unique health journey.
          </p>
        </motion.div>

        {/* Badge Gallery */}
        <BadgeGallery />
      </div>
    </PageTransition>
  );
}













