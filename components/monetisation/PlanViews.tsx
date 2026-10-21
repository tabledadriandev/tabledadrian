import Image from 'next/image'
import Link from 'next/link'
import { CapsLink, EmLast, LemonSymbol } from '@/components/editorial/ui'
import type { OfferPlan } from '@/lib/offer-copy'
import { DISCLAIMER, PLAN_CREDENTIAL, PLANS_COPY, planDetail, planList, plansPath } from '@/lib/view-copy'

const ROMAN = ['I', 'II', 'III', 'IV', 'V']

export function PlansIndex({ locale }: { locale: 'en' | 'fr' }) {
  const c = PLANS_COPY[locale]
  const plans = planList(locale)
  return (
    <article className="ed-plans">
      <header>
        <LemonSymbol />
        <p>{c.kicker}</p>
        <h1>
          <EmLast text={c.h1} />
        </h1>
        <p>{c.lede}</p>
      </header>
      <figure className="ed-photo">
        <Image
          src="/editorial/plans-terrace.webp"
          alt="Mediterranean lunch of grilled fish, vegetables and olive oil on a shaded terrace"
          fill
          priority
          sizes="(max-width: 1100px) 100vw, 1312px"
        />
        <figcaption>
          <span>{locale === 'fr' ? 'Poisson, légumes, huile d’olive, et la forme de la journée' : 'Fish, vegetables, olive oil, and the shape of the day'}</span>
          <span>{PLAN_CREDENTIAL}</span>
        </figcaption>
      </figure>
      <section className="ed-menu-card">
        <div>
          <p>{locale === 'fr' ? 'Cinq guides' : 'Five guides'}</p>
          <h2>
            {locale === 'fr' ? 'Guides d’assiette et de' : 'Eating and'} <em>{locale === 'fr' ? 'mode de vie' : 'lifestyle guides'}</em>
          </h2>
        </div>
        <ol>
          {plans.map((item, index) => {
            const detail = planDetail(item.plan, locale)
            return (
              <li key={item.id}>
                <Link href={item.href}>
                  <span>{ROMAN[index]}</span>
                  <strong>{item.title}</strong>
                  <i aria-hidden="true" />
                  <em>{detail.price}</em>
                </Link>
                <p>{item.lede}</p>
              </li>
            )
          })}
        </ol>
        <div>
          <p>{PLAN_CREDENTIAL}</p>
          <CapsLink href={plans[0]?.href || plansPath(locale)}>{locale === 'fr' ? 'Lire un programme' : 'Read a plan'} →</CapsLink>
        </div>
      </section>
      <p className="ed-disclaimer">
        <strong>{locale === 'fr' ? 'Pas un avis médical.' : 'Not medical advice.'}</strong>
        <span>{DISCLAIMER[locale]}</span>
      </p>
    </article>
  )
}

export function PlanArticle({ plan, locale }: { plan: OfferPlan; locale: 'en' | 'fr' }) {
  const d = planDetail(plan, locale)
  const plans = planList(locale)
  const index = plans.findIndex((item) => item.id === plan.id)
  const lists = [
    { numeral: 'I.', title: d.labels.more, items: d.more },
    { numeral: 'II.', title: d.labels.limit, items: d.limit },
    { numeral: 'III.', title: d.labels.habits, items: d.habits },
  ]
  return (
    <article className="ed-plan">
      <header>
        <div>
          <CapsLink href={plansPath(locale)}>{d.labels.back}</CapsLink>
          <p>
            <span>{locale === 'fr' ? 'Programme' : 'Menu plan'}</span>
            <i aria-hidden="true" />
            <span>
              {ROMAN[index] || 'I'} {locale === 'fr' ? 'sur' : 'of'} V
            </span>
          </p>
          <h1>
            <EmLast text={d.title} />
          </h1>
          <p>{d.lede}</p>
          <div className="ed-plan-buy">
            <p>
              <span>{d.title}</span>
              <i aria-hidden="true" />
              <strong>{d.price}</strong>
            </p>
            <div>
              {d.stripe ? (
                <a className="ed-pill ed-pill-filled" href={d.stripe} target="_blank" rel="nofollow noopener noreferrer">
                  <span>{d.labels.buy}</span>
                  <span className="ed-arrow" aria-hidden="true">→</span>
                </a>
              ) : (
                <span className="ed-pill ed-pill-outline">{d.labels.soon}</span>
              )}
              <span>{PLAN_CREDENTIAL}</span>
            </div>
          </div>
        </div>
        <div className="ed-photo">
          <Image
            src="/editorial/plans-tian.webp"
            alt="Vegetable tian of courgette and tomato in a terracotta dish"
            fill
            priority
            sizes="(max-width: 1100px) 100vw, 640px"
          />
        </div>
      </header>
      <section className="ed-plan-day">
        <div className="ed-photo">
          <Image src="/editorial/plans-pistou.webp" alt="Bowl of soupe au pistou with basil on a stone table" fill sizes="(max-width: 1100px) 100vw, 496px" />
        </div>
        <div>
          <p className="ed-band-kicker">{d.labels.day}</p>
          <h2>
            {locale === 'fr' ? 'Une' : 'A'} <em>{locale === 'fr' ? 'journée' : 'sample day'}</em>
          </h2>
          <ol>
            {d.meals.map((meal) => (
              <li key={meal.key}>
                <span>{meal.slot}</span>
                <strong>{meal.name}</strong>
                <i aria-hidden="true" />
                <Link href={meal.href}>{locale === 'fr' ? 'Recette' : 'Recipe'} →</Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="ed-plan-lists">
        <p className="ed-band-kicker">02 — {locale === 'fr' ? 'L’assiette' : 'The plate'}</p>
        <div>
          {lists.map((list) => (
            <div key={list.numeral}>
              <p>{list.numeral}</p>
              <h3>
                <EmLast text={list.title} />
              </h3>
              <ul>
                {list.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <footer>
        <p>
          <strong>{locale === 'fr' ? 'Pas un avis médical.' : 'Not medical advice.'}</strong>
          <span>{DISCLAIMER[locale]}</span>
        </p>
        <div>
          <CapsLink href={plansPath(locale)}>{d.labels.back}</CapsLink>
          {d.stripe ? (
            <a className="ed-pill ed-pill-filled" href={d.stripe} target="_blank" rel="nofollow noopener noreferrer">
              <span>
                {d.labels.buy}
                {d.price ? ` · ${d.price}` : ''}
              </span>
              <span className="ed-arrow" aria-hidden="true">→</span>
            </a>
          ) : (
            <CapsLink href={plansPath(locale)}>{d.labels.back}</CapsLink>
          )}
        </div>
      </footer>
    </article>
  )
}
