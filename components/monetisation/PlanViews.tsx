import Link from 'next/link'
import type { OfferPlan } from '@/lib/offer-copy'
import { EdFigure, EdHero, EdPage } from '@/components/editorial/Page'
import { DISCLAIMER, PLAN_CREDENTIAL, PLANS_COPY, planDetail, planList, plansPath } from '@/lib/view-copy'
import { Buy } from './Buy'

export function PlansIndex({ locale }: { locale: 'en' | 'fr' }) {
  const c = PLANS_COPY[locale]
  return (
    <EdPage>
      <EdHero
        kicker={c.kicker}
        title={locale === 'fr' ? 'Programmes' : 'Menu'}
        italic={locale === 'fr' ? 'd’assiette' : 'plans'}
        lede={c.lede}
        figure={{ id: 'plans-index', label: c.h1 }}
      />
      <section className="ed-page-section">
        <div className="ed-cards">
          {planList(locale).map((plan, index) => (
            <article key={plan.id}>
              <Link href={plan.href}>
                <EdFigure id={`plan/${plan.id}`} label={plan.title} />
                <p className="ed-kicker">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </p>
                <h2>
                  <span>{plan.title}</span>
                </h2>
                <p>{plan.lede}</p>
              </Link>
            </article>
          ))}
        </div>
        <div className="ed-note" role="note">
          <p>{DISCLAIMER[locale]}</p>
          <p>{PLAN_CREDENTIAL}</p>
        </div>
      </section>
    </EdPage>
  )
}

export function PlanArticle({ plan, locale }: { plan: OfferPlan; locale: 'en' | 'fr' }) {
  const d = planDetail(plan, locale)
  const lists: [string, string, string[]][] = [
    ['eat-more', d.labels.more, d.more],
    ['eat-less', d.labels.limit, d.limit],
    ['habits', d.labels.habits, d.habits],
  ]
  return (
    <EdPage>
      <header className="ed-page-hero">
        <div className="ed-page-head">
          <div>
            <Link className="ed-caps" href={plansPath(locale)}>{d.labels.back}</Link>
            <h1>
              <span>{d.title}</span>
            </h1>
            <p>{d.lede}</p>
            <p>{d.labels.solaNote}</p>
          </div>
          <aside id="buy-plan">
            {d.price ? <p className="ed-kicker"><span className="ed-kicker-name">{d.price}</span></p> : null}
            <h2 id="sample-day">
              <span>{d.labels.day}</span>
            </h2>
            <ul className="ed-links">
              {d.meals.map((meal) => (
                <li key={meal.key}>
                  <Link className="ed-caps" href={meal.href}>{meal.slot} · {meal.name}</Link>
                </li>
              ))}
            </ul>
            <div className="ed-page-intro" style={{ marginTop: 20 }}>
              <Buy href={d.stripe} label={d.labels.buy} locale={locale} className="ed-pill ed-pill-filled" />
              <Link className="ed-pill ed-pill-outline" href="/sola">
                <span>{d.labels.sola}</span>
                <span className="ed-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        </div>
        <p className="ed-facts">
          <span>{PLAN_CREDENTIAL}</span>
          {d.note ? <span>{d.note}</span> : null}
        </p>
        <EdFigure id={`plan/${plan.id}`} label={d.title} />
      </header>
      <section className="ed-page-section">
        <div className="ed-cards">
          {lists.map(([id, title, items]) => (
            <section key={id} aria-labelledby={id}>
              <h2 id={id}>
                <span>{title}</span>
              </h2>
              <ul className="ed-nearby">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="ed-note" role="note">
          <p>{DISCLAIMER[locale]}</p>
        </div>
      </section>
    </EdPage>
  )
}
