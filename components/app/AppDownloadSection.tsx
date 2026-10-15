'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Camera, Sparkles, HeartPulse, ChefHat, Flame } from 'lucide-react'
import { AppBadges } from './AppBadges'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { gsap, useGSAP } from '@/lib/gsap'
import { getMotionCaps } from '@/lib/motion-caps'
import { DustField } from '@/components/motion/DustField'

const features = [
  {
    icon: Camera,
    title: 'Log a meal in seconds',
    description: 'Photo, barcode or search - the app does the counting.',
  },
  {
    icon: Sparkles,
    title: 'A note on the meal',
    description: 'A plain record of what was cooked and served.',
  },
  {
    icon: ChefHat,
    title: "Chef Adrian's recipes",
    description: 'Dishes from the Table d’Adrian kitchen. Dietary preferences and allergies are accommodated on request.',
  },
  {
    icon: HeartPulse,
    title: 'Screened before you cook',
    description: 'Dietary preferences and allergies are accommodated on request. This is not medical advice.',
  },
]

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      {/* glow */}
      <div className="absolute -inset-10 rounded-full bg-primary/20 blur-3xl" aria-hidden />
      <div className="relative aspect-[9/19.5] rounded-[2.4rem] border border-gold/50 bg-ink-soft p-2.5 shadow-lift">
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
                    className="phone-ring"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-display text-lg">
                  <span data-count>82</span>
                </span>
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
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const caps = getMotionCaps()
      if (caps.reduce) return
      const phone = root.current?.querySelector<HTMLElement>('.phone-float')
      const tilt = root.current?.querySelector<HTMLElement>('.phone-tilt')
      gsap.from('.phone-ring', {
        attr: { 'stroke-dashoffset': 97.4 },
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.phone-ring', start: 'top 90%', once: true },
      })
      if (phone) {
        gsap.to(phone, {
          y: -14,
          rotation: 1.2,
          duration: 3.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          scrollTrigger: { trigger: phone, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' },
        })
      }
      if (!tilt || caps.tier !== 'full') return
      const rx = gsap.quickTo(tilt, 'rotationX', { duration: 1, ease: 'power3.out' })
      const ry = gsap.quickTo(tilt, 'rotationY', { duration: 1, ease: 'power3.out' })
      const onMove = (event: PointerEvent) => {
        ry((event.clientX / window.innerWidth - 0.5) * 16)
        rx((event.clientY / window.innerHeight - 0.5) * -12)
      }
      const section = root.current
      section?.addEventListener('pointermove', onMove)
      return () => section?.removeEventListener('pointermove', onMove)
    },
    { scope: root }
  )

  return (
    <section id="app" ref={root} className="relative overflow-hidden bg-ink py-20 text-ink-foreground sm:py-24 lg:py-32">
      <DustField density={56} />
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
            <h2 className="display text-4xl sm:text-5xl md:text-6xl" data-split="chars">
              A private chef&apos;s eye on <em className="italic text-gold">every</em> meal.
            </h2>
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
              <p className="mt-3 text-xs text-ink-foreground/50">For iPhone, iPad and Mac.</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <div data-speed="0.25">
              <div className="phone-float">
                <div className="phone-tilt">
                  <PhoneMockup />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
