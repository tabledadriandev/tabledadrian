'use client'

import { Mail, Phone, MapPin, Clock, Instagram } from 'lucide-react'
import { CONTACT_INFO, INSTAGRAM_URL } from '@/lib/constants'
import { copy, MARKET } from '@/lib/copy'
import { useLocale } from '@/lib/i18n'

export function ContactInfo() {
  const locale = useLocale()
  const t = copy[locale]
  const details = [
    { icon: Mail, label: 'Email', href: `mailto:${CONTACT_INFO.email}`, value: CONTACT_INFO.email },
    { icon: Instagram, label: t.instagramLabel, href: INSTAGRAM_URL, value: t.instagramHandle },
    { icon: Phone, label: 'Phone', href: `tel:${CONTACT_INFO.phone}`, value: CONTACT_INFO.phone },
    { icon: MapPin, label: locale === 'fr' ? 'Zones' : 'Service areas', value: MARKET[locale] },
    { icon: Clock, label: locale === 'fr' ? 'Réponse' : 'Response', value: CONTACT_INFO.responseTime },
  ]
  return (
    <div className="space-y-6">
      <div className="surface p-6 sm:p-8">
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
                  <a
                    href={item.href}
                    className="mt-1 block text-foreground hover:text-primary"
                    {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 text-foreground-muted">{item.value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="surface p-6 sm:p-8">
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
      </div>
    </div>
  )
}
