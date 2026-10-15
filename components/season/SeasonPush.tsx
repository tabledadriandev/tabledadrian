import Link from 'next/link'
import type { Locale } from '@/lib/copy'
import { toLocalePath } from '@/lib/routes'
import { Arrow } from '@/components/b2/ui'

const COPY = {
  en: {
    giftTitle: 'Christmas gift cards',
    giftText: '€150, €300 or €500. Pay online.',
    books: 'Recipe e-books — from €14.90',
  },
  fr: {
    giftTitle: 'Bons cadeaux de Noël',
    giftText: '150 €, 300 € ou 500 €. Paiement en ligne.',
    books: 'Livres de recettes — dès 14,90 €',
  },
} as const

function Sprig() {
  return (
    <svg className="sprig" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 27V8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 22c-3.2-.6-6.2-2.6-7.4-6.2 3.4.2 6 1.8 7.4 4.6 1.4-2.8 4-4.4 7.4-4.6-1.2 3.6-4.2 5.6-7.4 6.2z" fill="currentColor" />
      <path d="M16 15.5c-2.4-.4-4.8-1.8-5.8-4.6 2.6.2 4.6 1.4 5.8 3.4 1.2-2 3.2-3.2 5.8-3.4-1 2.8-3.4 4.2-5.8 4.6z" fill="currentColor" />
    </svg>
  )
}

/** Seasonal gift strip plus a small recipe-book card. Type stays at body size. */
export function SeasonPush({ locale, place = 'home' }: { locale: Locale; place?: 'home' | 'page' }) {
  const t = COPY[locale]
  return (
    <div className={`season-slot${place === 'page' ? ' is-page' : ''}`}>
      <div className="season">
        <Link className="xmas" href={toLocalePath('/gift', locale)}>
          <Sprig />
          <span className="xmas-copy">
            <strong>{t.giftTitle}</strong>
            <span>{t.giftText}</span>
          </span>
          <span className="go"><Arrow /></span>
        </Link>
        <Link className="ebook-card" href={toLocalePath('/shop/recipe-books', locale)}>
          <span>{t.books}</span>
          <span className="go"><Arrow /></span>
        </Link>
      </div>
    </div>
  )
}
