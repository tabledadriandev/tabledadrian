'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const details = [
  { icon: Phone, label: 'Phone', href: `tel:${CONTACT_INFO.phone}`, value: CONTACT_INFO.phone },
  { icon: Mail, label: 'Email', href: `mailto:${CONTACT_INFO.email}`, value: CONTACT_INFO.email },
  { icon: MapPin, label: 'Service areas', value: 'London & Europe' },
  { icon: Clock, label: 'Response', value: CONTACT_INFO.responseTime },
]

export function ContactInfo() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={fadeInUp} className="surface p-6 sm:p-8">
        <h2 className="font-display text-2xl">Reach Adrian</h2>
        <ul className="mt-6 space-y-5">
          {details.map((item) => (
            <li key={item.label} className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <item.icon size={18} />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-caps text-foreground-subtle">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="mt-1 block text-foreground hover:text-primary">
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 text-foreground-muted">{item.value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={fadeInUp} className="surface p-6 sm:p-8">
        <h3 className="font-display text-2xl">How a booking unfolds</h3>
        <ol className="mt-6 space-y-4">
          {['Conversation about the table', 'Menu written and confirmed', 'Cook, serve, leave the kitchen as we found it', 'A note afterwards, if you wish'].map(
            (step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="font-display text-xl text-primary/70">{String(index + 1).padStart(2, '0')}</span>
                <p className="pt-1 text-sm text-foreground-muted">{step}</p>
              </li>
            )
          )}
        </ol>
      </motion.div>
    </motion.div>
  )
}
