import { CONTACT_INFO } from '@/lib/constants'
import { PARTNER_STATS } from '@/lib/monetisation'

import { PARTNERS_COPY as COPY } from '@/lib/view-copy'

export function PartnersView({ locale }: { locale: 'en' | 'fr' }) {
  const t = COPY[locale]
  const stats = PARTNER_STATS.filter((item) => item.value.trim())
  return (
    <article className="bg-background pb-20 pt-28 text-foreground sm:pt-32">
      <div className="container max-w-3xl">
        <p className="text-[11px] uppercase tracking-caps text-foreground-subtle">{t.kicker}</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">{t.h1}</h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground-muted">{t.lede}</p>
        <p className="mt-6 text-sm">{t.who}</p>
        <section className="mt-10" aria-labelledby="audience">
          <h2 id="audience" className="font-display text-3xl tracking-tight">{t.audienceTitle}</h2>
          <p className="mt-3 text-foreground-muted">{t.audience}</p>
          {stats.length > 0 ? (
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <li key={item.id} className="border-t border-border pt-3">
                  <p className="font-display text-3xl">{item.value}</p>
                  <p className="mt-1 text-sm text-foreground-muted">{locale === 'fr' ? item.labelFr : item.label}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
        <section className="mt-12" aria-labelledby="options">
          <h2 id="options" className="font-display text-3xl tracking-tight">{t.optionsTitle}</h2>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {t.options.map((item) => (
              <li key={item.title} className="py-5">
                <h3 className="font-display text-2xl tracking-tight">{item.title}</h3>
                <p className="mt-2 text-foreground-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
        <p className="mt-10 text-sm">
          {t.contact}{' '}
          <a href={`mailto:${CONTACT_INFO.email}`} className="underline underline-offset-4">
            {CONTACT_INFO.email}
          </a>
        </p>
      </div>
    </article>
  )
}
