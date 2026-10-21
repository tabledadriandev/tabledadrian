'use client'

import { WHATSAPP_URL } from '@/lib/constants'
import { useLocale } from '@/lib/i18n'

export function WhatsAppFloat() {
  const locale = useLocale()
  const label = locale === 'fr' ? 'Écrire sur WhatsApp' : 'Message on WhatsApp'
  return (
    <a
      href={WHATSAPP_URL}
      className="ed-wa-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  )
}

export function WhatsAppEnquiry({ className = '' }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_URL}
      className={`inline-flex h-12 w-full items-center justify-center rounded-full border border-border-strong text-sm font-medium text-foreground transition-colors hover:bg-background-secondary ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      WhatsApp
    </a>
  )
}
