'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { fadeInUp, slideInLeft, staggerContainer } from '@/lib/animations'

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 lg:py-32 relative bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Image */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/5] bg-foreground/5 rounded-xl overflow-hidden shadow-lg relative">
              {/* Placeholder for chef image - using Unsplash */}
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                alt="Chef Adrian"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4 sm:space-y-6 order-1 lg:order-2"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground"
            >
              About Chef Adrian
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-foreground-muted leading-relaxed"
            >
              Chef Adrian brings 15+ years of culinary mastery to your table. Trained at the prestigious EHL Swiss Hotel Management School and certified in health and nutrition from Stanford, Chef Adrian combines Michelin-star techniques with personalized wellness.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-foreground-muted leading-relaxed"
            >
              From intimate dinner parties to grand celebrations, every dish is crafted with precision, passion, and an unwavering commitment to excellence. Experience the art of fine dining reimagined for your home.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex items-center space-x-2 text-primary group cursor-pointer pt-2"
            >
              <Link href="/about" className="font-medium flex items-center space-x-2 group-hover:space-x-3 transition-all text-sm sm:text-base">
                <span>Learn More</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
