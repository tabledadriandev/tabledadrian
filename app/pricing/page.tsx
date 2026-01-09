'use client'

import { PricingCards } from '@/components/pricing/PricingCards'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
          >
            Investment in Excellence
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            Transparent pricing, exceptional value. Luxury dining experiences tailored to your needs.
          </motion.p>
        </motion.div>

        <PricingCards />
      </div>
    </div>
  )
}
