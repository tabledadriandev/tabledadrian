'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/i18n'
import { useConsent } from './ConsentProvider'

export function CookieBanner() {
  const { consent, ready, accept, essential } = useConsent()
  const locale = useLocale()
  const french = locale === 'fr'

  if (!ready || consent !== 'unknown') return null

  return (
    <div
      role="dialog"
      aria-label={french ? 'Choix des cookies' : 'Cookie consent'}
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-border bg-card/95 px-4 py-3 shadow-lift backdrop-blur-md sm:p-5"
    >
      <div className="container flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="max-w-xl text-sm leading-relaxed text-foreground-muted">
          {french
            ? 'Des cookies essentiels font tourner le site. Google Analytics se charge avec chaque page. Le reste de la mesure d’audience ne se charge que si vous acceptez.'
            : 'We use essential cookies to run the site. Google Analytics loads with each page. Further analytics load only if you accept.'}{' '}
          <Link href={french ? '/fr/confidentialite' : '/privacy'} className="text-foreground underline underline-offset-4">
            {french ? 'Politique de confidentialité' : 'Privacy policy'}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={essential}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-border-strong px-4 text-sm font-medium text-foreground sm:flex-none sm:px-5"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={accept}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-ink px-4 text-sm font-medium text-ink-foreground sm:flex-none sm:px-5"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  )
}
