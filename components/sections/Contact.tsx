'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function Contact() {
  return (
    <section id="contact" className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="surface-ink relative overflow-hidden px-8 py-14 sm:px-12 sm:py-20 lg:px-16"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                'radial-gradient(50% 60% at 90% 10%, hsl(var(--primary) / 0.28), transparent 70%)',
            }}
            aria-hidden
          />
          <div className="on-ink relative max-w-2xl">
            <motion.span variants={fadeInUp} className="eyebrow mb-5">
              Enquire
            </motion.span>
            <motion.h2 variants={fadeInUp} className="display text-4xl sm:text-5xl md:text-6xl">
              Shall we cook for your table?
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-6 text-base leading-relaxed text-ink-foreground/70 sm:text-lg">
              Tell Adrian about the occasion, the guests and any dietary notes. A reply typically
              arrives within a day.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" variant="light" size="lg">
                Book your experience
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-sm text-ink-foreground/70 transition-colors hover:text-ink-foreground"
              >
                {CONTACT_INFO.email}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
