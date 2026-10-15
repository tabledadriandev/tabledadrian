'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { localeFromPath } from '@/lib/i18n'

const COPY = {
  en: {
    text: 'Sola is the Table d’Adrian app.',
    cta: 'Download Sola',
    dismiss: 'Dismiss',
  },
  fr: {
    text: 'Sola, l’application Table d’Adrian.',
    cta: 'Télécharger Sola',
    dismiss: 'Fermer',
  },
} as const

export function SolaBanner() {
  const pathname = usePathname()
  const locale = localeFromPath(pathname)
  const copy = COPY[locale]

  function dismiss() {
    window.localStorage.setItem('tda-sola-banner', 'dismissed')
    document.documentElement.dataset.solaBanner = '0'
  }

  return (
    <div className="sola-banner" role="region" aria-label="Sola">
      <p>
        <span>{copy.text}</span>{' '}
        <Link href="/sola">{copy.cta}</Link>
      </p>
      <button type="button" onClick={dismiss}>
        {copy.dismiss}
      </button>
    </div>
  )
}
