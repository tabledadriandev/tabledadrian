'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { HERO_IMAGE } from '@/data/gallery'

const ease = [0.22, 1, 0.36, 1] as const

const lineReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.25 + i * 0.12, duration: 0.9, ease },
  }),
}

const facts = [
  { value: '15+', label: 'Years in fine kitchens' },
  { value: 'EHL', label: 'Swiss hospitality diploma' },
  { value: 'Stanford', label: 'Nutrition certified' },
]

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-ink-foreground">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease }}
      >
        <Image
          src={HERO_IMAGE.src}
          alt="Burrata with sliced tomato and peach in a walnut bowl, plated by Table d'Adrian"
          fill
          priority
          sizes="100vw"
          className="photo object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/45 via-ink/15 to-transparent" />
      </motion.div>

      <div className="hero-cta-pad container relative z-10 pb-14 pt-40 sm:pb-20 lg:pb-24">
        <div className="max-w-4xl">
          <motion.div
            className="on-ink mb-7"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease }}
          >
            <span className="eyebrow">Private chef · London &amp; Europe</span>
          </motion.div>

          <h1 className="display text-[2.75rem] leading-[0.98] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <motion.span custom={0} variants={lineReveal} initial="hidden" animate="visible" className="block">
              Dinner, composed
            </motion.span>
            <motion.span custom={1} variants={lineReveal} initial="hidden" animate="visible" className="block">
              around <em className="italic text-gold">your</em> table.
            </motion.span>
          </h1>

          <motion.p
            custom={2}
            variants={lineReveal}
            initial="hidden"
            animate="visible"
            className="mt-7 max-w-xl text-base leading-relaxed text-ink-foreground/75 sm:text-lg"
          >
            Michelin-trained technique and nutrition science, brought into your home. From an
            intimate dinner for two to a table of twenty-five, every menu is written for the people
            eating it.
          </motion.p>

          <motion.div
            custom={3}
            variants={lineReveal}
            initial="hidden"
            animate="visible"
            className="mt-10"
          >
            <Button href="/contact" variant="light" size="lg">
              Book your experience
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        {/* Facts strip */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease }}
          className="mt-16 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/15 pt-6 sm:mt-20"
        >
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="font-display text-2xl text-ink-foreground sm:text-3xl">{f.value}</dt>
              <dd className="mt-1 text-[11px] uppercase tracking-caps text-ink-foreground/50 sm:text-xs">
                {f.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 right-6 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 text-ink-foreground/70 transition-colors hover:border-white/60 hover:text-ink-foreground sm:right-10 lg:flex"
      >
        <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ArrowDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  )
}
