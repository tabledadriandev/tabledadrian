'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Calculator, Smartphone } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const tools = [
  {
    href: '/nutrition',
    icon: Leaf,
    badge: 'Demo',
    title: 'Longevity Coach',
    description: 'A preview of daily tracking, macros and chef-led recommendations.',
  },
  {
    href: '/bmi',
    icon: Calculator,
    badge: 'Demo',
    title: 'BMI Calculator',
    description: 'A quick health snapshot, with guidance from Adrian\'s kitchen.',
  },
  {
    href: '/#app',
    icon: Smartphone,
    badge: 'Coming soon',
    title: 'The full app',
    description: 'Meal logging, a longevity score and recipes matched to you.',
  },
]

export function Wellness() {
  return (
    <section id="wellness" className="bg-background-secondary py-20 sm:py-24 lg:py-32">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl"
        >
          <motion.span variants={fadeInUp} className="eyebrow mb-5">
            Wellness
          </motion.span>
          <motion.h2 variants={fadeInUp} className="display text-4xl sm:text-5xl md:text-6xl">
            Try a taste of the <em className="italic text-primary">app</em>.
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-6 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
            The Longevity Coach and BMI tools on this site are demos. Download the Table d&apos;Adrian
            app when it launches for the complete experience.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <Link
                href={tool.href}
                className="group surface flex h-full flex-col p-6 transition-shadow hover:shadow-lift sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <tool.icon size={20} />
                  </span>
                  <span className="rounded-full bg-gold-soft px-2.5 py-1 text-[10px] font-medium uppercase tracking-caps text-ink">
                    {tool.badge}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl">{tool.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
                  {tool.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Open
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
