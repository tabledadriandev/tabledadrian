'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Shield, Lock, Calendar, Heart } from 'lucide-react'
import * as Accordion from '@radix-ui/react-accordion'
import { pricingTiers, subscriptionPlans, guarantees, pricingFAQ, urgencyElements } from '@/data/pricing'
import { cn } from '@/lib/utils'
import { DustField } from '@/components/motion/DustField'
import { ON_REQUEST, copy } from '@/lib/copy'
import { useLocale } from '@/lib/i18n'

const iconMap: Record<string, typeof Shield> = {
  Shield,
  Lock,
  Calendar,
  Heart,
}

export function PricingCards() {
  const locale = useLocale()
  const t = copy[locale]
  const [isMonthly, setIsMonthly] = useState(false)

  return (
    <div>
      <p className="text-sm text-foreground-muted">{t.quoteNote}</p>

      <div className="mt-12 flex gap-8 border-b border-border" role="tablist" aria-label="Pricing view">
        <button
          type="button"
          role="tab"
          aria-selected={!isMonthly}
          onClick={() => setIsMonthly(false)}
          className={cn(
            'pb-3 font-display text-3xl tracking-tight',
            !isMonthly ? 'border-b border-gold text-foreground' : 'text-foreground-muted'
          )}
        >
          {t.perEvent}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={isMonthly}
          onClick={() => setIsMonthly(true)}
          className={cn(
            'pb-3 font-display text-3xl tracking-tight',
            isMonthly ? 'border-b border-gold text-foreground' : 'text-foreground-muted'
          )}
        >
          {t.monthly}
        </button>
      </div>

      {!isMonthly ? (
        <motion.div
          key="event"
          className="mt-4"
          role="tabpanel"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {pricingTiers.map((tier) => (
            <article key={tier.id} className="relative grid gap-6 py-10 lg:grid-cols-12 lg:gap-10" data-rise="36">
              <span className="absolute inset-x-0 bottom-0 h-px bg-border" data-rule aria-hidden="true" />
              <div className="lg:col-span-4">
                {tier.badge && (
                  <p className="text-[11px] uppercase tracking-caps text-gold">{tier.badge}</p>
                )}
                <h3 className="lh-display mt-2 font-display text-4xl tracking-tight">{tier.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{tier.tagline}</p>
                <p className="lh-display mt-6 font-display text-5xl tracking-tight">
                  {ON_REQUEST[locale]}
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-caps text-foreground-subtle">{tier.guests}</p>
                {tier.savings && <p className="mt-3 text-sm text-foreground">{tier.savings}</p>}
                {tier.extras && <p className="mt-2 text-sm text-foreground-muted">{tier.extras}</p>}
                {tier.urgency && <p className="mt-3 text-sm text-foreground">{tier.urgency}</p>}
                <Link href={locale === 'fr' ? '/fr/contact' : '/contact'} className="maison-link mt-6">
                  {tier.cta}
                </Link>
              </div>
              <ul className="lg:col-span-8 lg:columns-2 lg:gap-x-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="mb-2 flex items-start gap-2 text-sm leading-relaxed text-foreground">
                    <Check size={14} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
                {tier.notIncluded && tier.notIncluded.length > 0 && (
                  <li className="mb-2 mt-4 text-[11px] uppercase tracking-caps text-foreground-subtle">Not included:</li>
                )}
                {tier.notIncluded?.map((item) => (
                  <li key={item} className="mb-2 text-sm text-foreground-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="monthly"
          className="mt-4"
          role="tabpanel"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {subscriptionPlans.map((plan) => (
            <article key={plan.id} className="relative grid gap-6 border-b border-border py-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                {plan.popular && <p className="text-[11px] uppercase tracking-caps text-gold">MOST POPULAR</p>}
                <h3 className="lh-display mt-2 font-display text-4xl tracking-tight">{plan.name}</h3>
                <p className="lh-display mt-6 font-display text-5xl tracking-tight">
                  {ON_REQUEST[locale]}
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-caps text-foreground-subtle">{plan.commitment}</p>
                <p className="mt-3 text-sm text-foreground-muted">{plan.ideal}</p>
                <Link href={locale === 'fr' ? '/fr/contact' : '/contact'} className="maison-link mt-6">
                  {t.bookCta}
                </Link>
              </div>
              <ul className="lg:col-span-8">
                {plan.includes.map((item) => (
                  <li key={item} className="mb-2 flex items-start gap-2 text-sm leading-relaxed text-foreground">
                    <Check size={14} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </motion.div>
      )}

      <div className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-2">
        {guarantees.map((guarantee) => {
          const Icon = iconMap[guarantee.icon] || Shield
          return (
            <div key={guarantee.title}>
              <h3 className="flex items-center gap-2 font-display text-2xl">
                <Icon size={16} className="text-gold" aria-hidden="true" />
                {guarantee.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground-muted">{guarantee.description}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-16 border-t border-border pt-10">
        <h3 className="font-display text-4xl tracking-tight">Frequently Asked Questions</h3>
        <Accordion.Root type="single" collapsible className="mt-6">
          {pricingFAQ.map((faq, index) => (
            <Accordion.Item key={faq.question} value={`item-${index}`} className="border-b border-border">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-5 text-left font-display text-xl tracking-tight">
                  <span>{faq.question}</span>
                  <span className="text-gold transition-transform duration-300 group-data-[state=open]:rotate-45" aria-hidden="true">+</span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="max-w-3xl pb-5 text-sm leading-relaxed text-foreground-muted">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>

      <div className="relative mt-16 overflow-hidden bg-ink px-6 py-12 text-ink-foreground sm:px-10" data-reveal="iris">
        <DustField density={36} />
        <h3 className="relative font-display text-4xl tracking-tight sm:text-5xl">Limited Availability</h3>
        <p className="relative mt-4 max-w-xl text-base leading-relaxed text-ink-foreground/80">
          {urgencyElements.consultationSlots}. Book your consultation to secure your preferred date.
        </p>
        <Link href={locale === 'fr' ? '/fr/contact' : '/contact'} className="maison-link relative mt-6 text-ink-foreground">
          Book Consultation Now
        </Link>
      </div>
    </div>
  )
}
