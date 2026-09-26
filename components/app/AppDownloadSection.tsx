'use client'

import { motion } from 'framer-motion'
import { Camera, Sparkles, HeartPulse, ChefHat, Flame } from 'lucide-react'
import { AppBadges } from './AppBadges'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const features = [
  {
    icon: Camera,
    title: 'Log a meal in seconds',
    description: 'Photo, barcode or search - the app does the counting.',
  },
  {
    icon: Sparkles,
    title: 'Your longevity score',
    description: 'Inflammation, glycemic load and micronutrients, explained plainly.',
  },
  {
    icon: ChefHat,
    title: "Chef Adrian's recipes",
    description: 'Dishes matched to your goals, allergies and what you already love.',
  },
  {
    icon: HeartPulse,
    title: 'Built around conditions',
    description: 'Diabetes, hypertension, IBS and more, handled with care.',
  },
]

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      {/* glow */}
      <div className="absolute -inset-10 rounded-full bg-primary/20 blur-3xl" aria-hidden />
      <div className="relative aspect-[9/19.5] rounded-[2.6rem] border border-white/15 bg-ink-soft p-2.5 shadow-lift">
        <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-background text-foreground">
          {/* notch */}
          <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" />

          <div className="flex h-full flex-col px-5 pb-5 pt-12">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-caps text-foreground-subtle">Good morning</p>
                <p className="font-display text-xl">Longevity Coach</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-1 text-[10px] font-medium text-primary">
                <Flame size={10} /> 12 days
              </span>
            </div>

            {/* score ring */}
            <div className="mt-5 flex items-center gap-4 rounded-2xl bg-card p-4 shadow-soft">
              <div className="relative h-16 w-16 shrink-0">
                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="97.4"
                    strokeDashoffset="18"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-display text-lg">82</span>
              </div>
              <div>
                <p className="text-xs font-medium">Longevity score</p>
                <p className="mt-0.5 text-[11px] leading-snug text-foreground-muted">
                  Excellent omega balance. Add leafy greens at dinner.
                </p>
              </div>
            </div>

            {/* macros */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { label: 'Protein', v: '96g', pct: 78, c: 'bg-primary' },
                { label: 'Carbs', v: '142g', pct: 56, c: 'bg-gold' },
                { label: 'Fat', v: '58g', pct: 64, c: 'bg-ink' },
              ].map((m) => (
                <div key={m.label} className="rounded-xl bg-card p-2.5 shadow-soft">
                  <p className="text-[10px] text-foreground-subtle">{m.label}</p>
                  <p className="text-sm font-medium">{m.v}</p>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-border">
                    <div className={`h-full ${m.c}`} style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* meals */}
            <div className="mt-3 space-y-2">
              {[
                { t: 'Breakfast', n: 'Longevity smoothie bowl', k: 420 },
                { t: 'Lunch', n: 'Mediterranean sea bass', k: 560 },
              ].map((meal) => (
                <div key={meal.t} className="flex items-center justify-between rounded-xl bg-card px-3 py-2.5 shadow-soft">
                  <div>
                    <p className="text-[10px] uppercase tracking-caps text-foreground-subtle">{meal.t}</p>
                    <p className="text-xs font-medium">{meal.n}</p>
                  </div>
                  <span className="text-xs text-foreground-muted">{meal.k} kcal</span>
                </div>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-soft">
                <Camera size={12} /> Log a meal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AppDownloadSection() {
  return (
    <section id="app" className="relative overflow-hidden bg-ink py-20 text-ink-foreground sm:py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(60% 50% at 80% 20%, hsl(var(--primary) / 0.25), transparent 70%), radial-gradient(40% 40% at 10% 90%, hsl(var(--gold) / 0.18), transparent 70%)',
        }}
        aria-hidden
      />
      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="on-ink order-2 lg:order-1"
          >
            <motion.span variants={fadeInUp} className="eyebrow mb-5">
              The Table d&apos;Adrian app
            </motion.span>
            <motion.h2 variants={fadeInUp} className="display text-4xl sm:text-5xl md:text-6xl">
              A private chef&apos;s eye on <em className="italic text-gold">every</em> meal.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/70 sm:text-lg">
              The Longevity Coach and BMI tools on this site are a preview. The app brings the full
              experience: meal logging, a personal longevity score, and recipes from Adrian&apos;s kitchen
              tuned to your body and your goals.
            </motion.p>

            <motion.ul variants={fadeInUp} className="mt-10 grid gap-5 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gold">
                    <f.icon size={18} />
                  </span>
                  <div>
                    <p className="font-medium">{f.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-foreground/60">{f.description}</p>
                  </div>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeInUp} className="mt-10">
              <AppBadges tone="light" />
              <p className="mt-3 text-xs text-ink-foreground/50">Launching soon on iOS and Android.</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
