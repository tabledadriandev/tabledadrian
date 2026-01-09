'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Phone, ArrowRight } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 subtle-gradient opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 text-foreground"
          >
            Ready to Elevate Your Dining Experience?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-foreground-muted mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Let's create something extraordinary together. Contact Chef Adrian to begin planning your bespoke culinary experience.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center space-x-2 sm:space-x-3 text-foreground hover:text-primary transition-colors text-sm sm:text-base px-4 py-2 rounded-lg hover:bg-foreground/5"
            >
              <Phone size={18} className="sm:w-5 sm:h-5" />
              <span>{CONTACT_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center space-x-2 sm:space-x-3 text-foreground hover:text-primary transition-colors text-sm sm:text-base px-4 py-2 rounded-lg hover:bg-foreground/5"
            >
              <Mail size={18} className="sm:w-5 sm:h-5" />
              <span>{CONTACT_INFO.email}</span>
            </a>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Link
              href="/contact"
              className="group inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-xl font-medium text-base sm:text-lg hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span>Book Your Experience</span>
              <ArrowRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-6 sm:mt-8 text-xs sm:text-sm text-foreground-subtle"
          >
            {CONTACT_INFO.responseTime}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
