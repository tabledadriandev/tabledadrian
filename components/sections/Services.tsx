'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function Services() {
  return (
    <section id="services" className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          >
            <motion.span variants={fadeInUp} className="eyebrow mb-5">
              Services
            </motion.span>
            <motion.h2 variants={fadeInUp} className="display text-4xl sm:text-5xl">
              Culinary experiences, written for the occasion.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-6 text-base leading-relaxed text-foreground-muted">
              From an intimate dinner to a week of quiet meals at home, every menu is composed
              around your guests, your kitchen and the season.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8">
              <Button href="/pricing" variant="outline">
                See pricing
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>

          <ol className="lg:col-span-8 divide-y divide-border border-y border-border">
            {SERVICES.map((service, index) => (
              <motion.li
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.55 }}
                className="group grid gap-4 py-8 sm:grid-cols-12 sm:items-start sm:gap-6"
              >
                <span className="font-display text-3xl text-primary/70 sm:col-span-2">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="sm:col-span-10">
                  <h3 className="font-display text-2xl sm:text-3xl">{service.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground-muted sm:text-base">
                    {service.description}
                  </p>
                  <a
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                  >
                    Enquire
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
