'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { textReveal, fadeInUp } from '@/lib/animations'

const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export function Hero() {
  const titleWords = ["LUXURY", "PRIVATE", "CHEF", "SERVICES"]
  const subtitle = "Personalized Culinary Excellence"

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4" type="video/mp4" />
          {/* Fallback image */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-transparent" />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-24 md:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12">
          {/* Badge Chip */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="inline-block"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-foreground/5 text-foreground border border-foreground/10">
              Private Chef Services
            </span>
          </motion.div>

          {/* Main Title - Word by Word Animation */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-foreground leading-[1.1] tracking-tight"
            initial="hidden"
            animate="visible"
          >
            <span className="block sm:inline">
              <motion.span
                variants={wordAnimation}
                custom={0}
                className="inline-block mr-[0.25em]"
              >
                LUXURY
              </motion.span>
              <motion.span
                variants={wordAnimation}
                custom={1}
                className="inline-block"
              >
                PRIVATE
              </motion.span>
            </span>
            <br className="hidden sm:block" />
            <span className="block sm:inline">
              <motion.span
                variants={wordAnimation}
                custom={2}
                className="inline-block mr-[0.25em]"
              >
                CHEF
              </motion.span>
              <motion.span
                variants={wordAnimation}
                custom={3}
                className="inline-block"
              >
                SERVICES
              </motion.span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="space-y-4 md:space-y-6"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-accent text-foreground-muted font-normal">
              {subtitle}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed">
              Experience Michelin-worthy dining in the comfort of your home.
              From intimate dinners to grand celebrations.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4"
          >
            <Link
              href="/contact"
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-xl font-medium text-base sm:text-lg flex items-center justify-center space-x-2 hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto"
            >
              <span>Book Your Experience</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#services"
              className="px-6 sm:px-8 py-3 sm:py-4 border border-foreground/20 text-foreground rounded-xl font-medium text-base sm:text-lg hover:bg-foreground/5 transition-all duration-300 w-full sm:w-auto"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown size={20} className="sm:w-6 sm:h-6 text-foreground-muted" />
      </motion.div>
    </section>
  )
}
