import Link from 'next/link'
import type { OfferPlan } from '@/lib/offer-copy'
import { BrandCover } from '@/components/brand/BrandCover'
import { splitCover } from '@/lib/cover'
import { coverPhoto } from '@/lib/cover-photos'
import { DISCLAIMER, PLAN_CREDENTIAL, PLANS_COPY, planDetail, planList, plansPath } from '@/lib/view-copy'
import { Arrow } from '@/components/b2/ui'
import { Band, Opt } from '@/components/b2/Tiles'
import { Buy } from './Buy'

/* Plans: band, then the mockup's three-up experience cards (gold · card · olive), repeating. */
export function PlansIndex({ locale }: { locale: 'en' | 'fr' }) {
  const c = PLANS_COPY[locale]
  return (
    <div className="wrap b2-page">
      <Band kicker={c.kicker} title={c.h1} text={c.lede} />
      <section className="sec row3 b2-plans">
        {planList(locale).map((p, i) => {
          const cover = splitCover(p.title)
          return (
            <Link key={p.id} href={p.href} className={`xc plan-tile ${['e', '', 'o'][i % 3]}`}>
              <BrandCover
                word={cover.word}
                italic={cover.italic}
                meta={locale === 'fr' ? 'PROGRAMME' : 'MENU PLAN'}
                cover={coverPhoto(`plan-${p.id}`)}
                sizes="(max-width: 600px) 100vw, 400px"
                className="plan-tile-cover"
              />
              <div className="n"><span>{String(i + 1).padStart(2, '0')}</span><span className="c"><Arrow /></span></div>
              <div><h2 className="sr-only">{p.title}</h2><p>{p.lede}</p></div>
            </Link>
          )
        })}
      </section>
      <div className="b2-note" role="note"><p>{DISCLAIMER[locale]}</p><p className="m">{PLAN_CREDENTIAL}</p></div>
    </div>
  )
}

/* Plan: hero split — copy card left, gold buy card with sample-day options right; then four list cards. */
export function PlanArticle({ plan, locale }: { plan: OfferPlan; locale: 'en' | 'fr' }) {
  const d = planDetail(plan, locale)
  const lists: [string, string, string[]][] = [
    ['eat-more', d.labels.more, d.more],
    ['eat-less', d.labels.limit, d.limit],
    ['habits', d.labels.habits, d.habits],
  ]
  return (
    <article className="wrap b2-page">
      <BrandCover
        {...splitCover(d.title)}
        meta={locale === 'fr' ? 'PROGRAMME' : 'MENU PLAN'}
        cover={coverPhoto(`plan-${plan.id}`)}
        seed={plan.id}
        entrance
        priority
        sizes="(max-width: 600px) 100vw, 1200px"
        className="plan-hero-cover"
      />
      <section className="hero b2-split">
        <div className="hl">
          <div>
            <Link href={plansPath(locale)} className="tagr">← {d.labels.back}</Link>
            <h1 className="disp">{d.title}</h1>
            <p>{d.lede}</p>
            <p className="b2-sola">{d.labels.solaNote}</p>
            <div className="cta">
              <Buy href={d.stripe} label={d.labels.buy} locale={locale} className="btn ink" />
              <Link href="/sola" className="btn ghost">{d.labels.sola}</Link>
            </div>
          </div>
          <div className="credrow"><span>{PLAN_CREDENTIAL}</span>{d.note ? <span>{d.note}</span> : null}</div>
        </div>
        <aside id="buy-plan" className="enq b2-buy">
          <div>
            {d.price ? <span className="tagr ink">{d.price}</span> : null}
            <h2 className="disp" id="sample-day">{d.labels.day}</h2>
          </div>
          <div className="opts">{d.meals.map((m) => <Opt key={m.key} href={m.href} title={m.name} sub={m.slot} />)}</div>
        </aside>
      </section>
      <section className="sec row3 b2-lists">
        {lists.map(([id, title, items], i) => (
          <section key={id} className={`xc list ${['', 'o', ''][i]}`} aria-labelledby={id}>
            <h2 id={id} className="disp h3">{title}</h2>
            <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>
          </section>
        ))}
      </section>
      <div className="b2-note" role="note"><p>{DISCLAIMER[locale]}</p></div>
    </article>
  )
}
