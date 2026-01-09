'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Utensils, Calendar, Briefcase, Sparkles, ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'

const iconMap: Record<string, typeof Utensils> = {
  Utensils,
  Calendar,
  Briefcase,
  Sparkles,
}

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16 md:mb-20 max-w-3xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 text-foreground"
          >
            Our Services
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-foreground-muted leading-relaxed"
          >
            Tailored culinary experiences designed to elevate every occasion
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon] || Utensils
            return (
              <motion.div
                key={service.title}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative bg-white border border-foreground/10 rounded-xl p-6 sm:p-8 hover:border-foreground/20 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-start space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Icon size={20} className="sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-semibold flex-1 text-foreground">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-foreground-muted mb-6 sm:mb-8 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center space-x-2 text-primary font-medium group-hover:space-x-3 transition-all text-sm sm:text-base"
                >
                  <span>Learn More</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
