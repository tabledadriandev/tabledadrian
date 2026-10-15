import { Button } from '@/components/ui/Button'
import { GIFT_CARDS } from '@/lib/monetisation'

import { GIFT_COPY as COPY } from '@/lib/view-copy'

export function GiftView({ locale }: { locale: 'en' | 'fr' }) {
  const t = COPY[locale]
  const cardsTitle = locale === 'fr' ? 'Bons cadeaux' : 'Gift cards'
  const pay = locale === 'fr' ? 'Payer' : 'Pay'
  return (
    <article className="bg-background pb-20 pt-28 text-foreground sm:pt-32">
      <div className="container max-w-5xl">
        <p className="text-[11px] uppercase tracking-caps text-foreground-subtle">{t.eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight sm:text-6xl">{t.h1}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">{t.lede}</p>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <ul className="space-y-4 border-t border-border pt-6 text-foreground-muted">
              {t.points.map((point) => (
                <li key={point} className="border-b border-border pb-4">
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={t.enquireHref} variant="ink">
                {t.enquire}
              </Button>
            </div>
          </div>
          <aside className="border border-border-strong p-6 sm:p-8" aria-labelledby="gift-cards">
            <h2 id="gift-cards" className="font-display text-3xl tracking-tight">{cardsTitle}</h2>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {GIFT_CARDS.map((card) => {
                const label = locale === 'fr' ? card.labelFr : card.labelEn
                return (
                  <li key={card.id} className="flex items-center justify-between gap-4 py-4">
                    <span className="font-display text-3xl tracking-tight">{label}</span>
                    <a href={card.stripe} className="paywall-cta" rel="nofollow noopener noreferrer" target="_blank">
                      {pay} {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </aside>
        </div>
      </div>
    </article>
  )
}
