'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { localeFromPath } from '@/lib/i18n'

const COPY = {
  en: {
    text: "Sola is the Table d'Adrian app.",
    cta: 'Download Sola',
    dismiss: 'Dismiss',
  },
  fr: {
    text: "Sola, l'application Table d'Adrian.",
    cta: 'Télécharger Sola',
    dismiss: 'Fermer',
  },
} as const

export function SolaBanner() {
  const pathname = usePathname()
  const locale = localeFromPath(pathname)
  const copy = COPY[locale]
  if (pathname === '/sola' || pathname.startsWith('/sola/') || pathname === '/fr/sola' || pathname.startsWith('/fr/sola/')) {
    return null
  }

  function dismiss() {
    window.localStorage.setItem('tda-sola-banner', 'dismissed')
    document.documentElement.dataset.solaBanner = '0'
  }

  return (
    <div className="sola-banner" role="region" aria-label="Sola">
      <p>
        <span>{copy.text}</span>{' '}
        <Link href={locale === 'fr' ? '/fr/sola' : '/sola'}>{copy.cta}</Link>
      </p>
      <button type="button" onClick={dismiss} aria-label={copy.dismiss}>
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
    </div>
  )
}
