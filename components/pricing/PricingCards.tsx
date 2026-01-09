'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, Shield, Lock, Calendar, Heart, Star } from 'lucide-react'
import { pricingTiers, subscriptionPlans, socialProof, guarantees, pricingFAQ, urgencyElements } from '@/data/pricing'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'
import { formatCurrency } from '@/lib/utils'
import * as Accordion from '@radix-ui/react-accordion'

const iconMap: Record<string, typeof Shield> = {
  Shield,
  Lock,
  Calendar,
  Heart,
}

export function PricingCards() {
  const [isMonthly, setIsMonthly] = useState(false)
  const [showFAQ, setShowFAQ] = useState(false)

  return (
    <div className="space-y-16">
      {/* Social Proof Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-foreground/10 rounded-xl p-6 shadow-sm"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-display font-bold text-primary mb-1">{socialProof.clientsServed}</div>
            <div className="text-sm text-foreground-muted">Clients Served</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-primary mb-1">{socialProof.satisfactionRate}</div>
            <div className="text-sm text-foreground-muted">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-primary mb-1">{socialProof.averageRating}</div>
            <div className="text-sm text-foreground-muted flex items-center justify-center gap-1">
              <Star size={16} className="fill-primary text-primary" />
              <span>({socialProof.reviewCount} reviews)</span>
            </div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-primary mb-1">{socialProof.repeatClientRate}</div>
            <div className="text-sm text-foreground-muted">Repeat Clients</div>
          </div>
        </div>
      </motion.div>

      {/* Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center space-x-4"
      >
        <span className={`text-sm font-medium ${!isMonthly ? 'text-foreground' : 'text-foreground-muted'}`}>
          Per Event
        </span>
        <button
          onClick={() => setIsMonthly(!isMonthly)}
          className="relative w-16 h-8 bg-white border border-foreground/10 rounded-full p-1 transition-colors hover:border-primary"
        >
          <motion.div
            className="w-6 h-6 bg-primary rounded-full"
            animate={{ x: isMonthly ? 32 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
        <span className={`text-sm font-medium ${isMonthly ? 'text-foreground' : 'text-foreground-muted'}`}>
          Monthly Subscription
        </span>
      </motion.div>

      {/* Pricing Tiers */}
      {!isMonthly ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pricingTiers.map((tier, index) => {
            const Icon = tier.popular ? Sparkles : undefined
            return (
              <motion.div
                key={tier.id}
                variants={scaleIn}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative bg-white border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow ${
                  tier.popular
                    ? 'border-primary shadow-md shadow-primary/10 lg:scale-105'
                    : 'border-foreground/10'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center space-x-1.5 shadow-sm whitespace-nowrap">
                      {Icon && <Icon size={12} className="flex-shrink-0" />}
                      <span className="whitespace-nowrap">{tier.badge}</span>
                    </div>
                  </div>
                )}

                {tier.savings && (
                  <div className="absolute top-2 right-2 bg-green-500/20 text-green-400 text-xs font-medium px-2 py-1 rounded-lg z-20">
                    {tier.savings}
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display font-bold mb-2">{tier.name}</h3>
                  <p className="text-foreground-muted text-sm mb-4">{tier.tagline}</p>
                  <div className="mb-2">
                    {tier.basePrice ? (
                      <div className="flex items-baseline justify-center space-x-2">
                        <span className="text-4xl font-display font-bold">
                          {formatCurrency(tier.basePrice)}
                        </span>
                        {tier.pricePerGuest && (
                          <span className="text-foreground-muted text-sm">
                            + {formatCurrency(tier.pricePerGuest)}/guest
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="text-3xl font-display font-bold">{tier.priceDisplay}</div>
                    )}
                  </div>
                  <p className="text-xs text-foreground-subtle">{tier.guests}</p>
                  {tier.urgency && (
                    <p className="text-xs text-primary mt-2 font-medium">{tier.urgency}</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 min-h-[300px]">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground-muted text-sm">{feature}</span>
                    </li>
                  ))}
                  {tier.notIncluded && tier.notIncluded.length > 0 && (
                    <>
                      <li className="text-xs text-foreground-subtle mt-4 pt-4 border-t border-border">
                        Not included:
                      </li>
                      {tier.notIncluded.map((item, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <span className="text-foreground-subtle text-sm">• {item}</span>
                        </li>
                      ))}
                    </>
                  )}
                </ul>

                {tier.extras && (
                  <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded text-sm text-primary text-center">
                    {tier.extras}
                  </div>
                )}

                <button
                  className={`w-full py-3 rounded-xl font-medium transition-all ${
                    tier.popular
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md'
                      : 'bg-white border border-foreground/10 text-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  {tier.cta}
                </button>
              </motion.div>
            )
          })}
        </motion.div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={scaleIn}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative bg-white border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow ${
                plan.popular
                  ? 'border-primary shadow-md shadow-primary/10'
                  : 'border-foreground/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-white px-4 py-1 rounded-lg text-sm font-medium shadow-sm">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-display font-bold">{formatCurrency(plan.price)}</span>
                  <span className="text-foreground-muted">/{plan.period}</span>
                </div>
                <p className="text-xs text-foreground-subtle mb-4">{plan.commitment}</p>
                <p className="text-sm text-foreground-muted">{plan.ideal}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.includes.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <Check size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground-muted text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md'
                    : 'bg-white border border-foreground/10 text-foreground hover:border-primary'
                }`}
              >
                Start Subscription
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Guarantees */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {guarantees.map((guarantee, index) => {
          const Icon = iconMap[guarantee.icon] || Shield
          return (
            <motion.div
              key={index}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-foreground/10 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon size={24} className="text-primary" />
              </div>
              <h4 className="font-display font-semibold mb-2">{guarantee.title}</h4>
              <p className="text-sm text-foreground-muted">{guarantee.description}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white border border-foreground/10 rounded-xl p-8 shadow-sm"
      >
        <h3 className="text-3xl font-display font-bold mb-6 text-center">Frequently Asked Questions</h3>
        <Accordion.Root type="single" collapsible className="space-y-4">
          {pricingFAQ.map((faq, index) => (
            <Accordion.Item key={index} value={`item-${index}`} className="border-b border-border">
              <Accordion.Header>
                <Accordion.Trigger className="w-full text-left py-4 flex items-center justify-between group">
                  <span className="font-medium group-hover:text-primary transition-colors">{faq.question}</span>
                  <span className="text-primary group-hover:rotate-180 transition-transform">+</span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="text-foreground-muted pb-4">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </motion.div>

      {/* Urgency Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-primary/10 border border-primary/20 rounded-xl p-6 text-center"
      >
        <h3 className="text-xl font-display font-bold mb-2">Limited Availability</h3>
        <p className="text-foreground-muted mb-4">
          {urgencyElements.consultationSlots}. Book your consultation to secure your preferred date.
        </p>
        <button className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all shadow-sm hover:shadow-md">
          Book Consultation Now
        </button>
      </motion.div>
    </div>
  )
}
