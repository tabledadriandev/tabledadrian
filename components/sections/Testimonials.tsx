'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Private dinner, London',
    content:
      'Chef Adrian transformed our anniversary dinner into an unforgettable evening. Every course felt personal, and guests are still talking about it.',
  },
  {
    name: 'James Thompson',
    role: 'Corporate host',
    content:
      'The catering for our board dinner exceeded every expectation. Professional, elegant, and the kind of food people remember.',
  },
  {
    name: 'Emma Wilson',
    role: 'Weekly meal preparation',
    content:
      'Having Adrian prepare our weekly meals has been quietly life-changing. Restaurant quality, every day, without leaving home.',
  },
  {
    name: 'Michael Chen',
    role: 'Wedding celebration',
    content:
      'Our wedding table was elevated beyond anything we imagined. Months later, guests still mention the food first.',
  },
]

export function Testimonials() {
  return (
    <section className="bg-ink py-20 text-ink-foreground sm:py-24 lg:py-32">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="on-ink max-w-3xl"
        >
          <motion.span variants={fadeInUp} className="eyebrow mb-5">
            Kind words
          </motion.span>
          <motion.h2 variants={fadeInUp} className="display text-4xl sm:text-5xl md:text-6xl">
            Tables we have cooked for.
          </motion.h2>
        </motion.div>

        <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="bg-ink p-8 sm:p-10"
            >
              <p className="font-display text-2xl italic leading-snug text-ink-foreground sm:text-[1.7rem]">
                &ldquo;{t.content}&rdquo;
              </p>
              <footer className="mt-8">
                <cite className="not-italic">
                  <span className="block text-sm font-medium">{t.name}</span>
                  <span className="mt-1 block text-[11px] uppercase tracking-caps text-ink-foreground/45">
                    {t.role}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
