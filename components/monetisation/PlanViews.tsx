import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { DISCLAIMER, OFFER_PLANS, PLAN_CREDENTIAL, planPath, plansPath, type OfferPlan } from '@/lib/offer-copy'
import { PLAN_SLOTS, PRODUCTS_LIVE } from '@/lib/monetisation'
import { libraryRecipePath, libraryRecipes } from '@/lib/library'

function BuyPlan({ locale, stripe }: { locale: 'en' | 'fr'; stripe: string | null }) {
  const label = locale === 'fr' ? 'Acheter le programme' : 'Buy the plan'
  const soon = locale === 'fr' ? 'Bientôt' : 'Coming soon'
  if (PRODUCTS_LIVE && stripe) {
    return (
      <a href={stripe} className="paywall-cta" rel="nofollow noopener noreferrer" target="_blank">
        {label}
      </a>
    )
  }
  return (
    <span className="paywall-cta" aria-disabled="true">
      {soon}
    </span>
  )
}

function PlanActions({ locale, plan, anchor = false }: { locale: 'en' | 'fr'; plan: OfferPlan; anchor?: boolean }) {
  const slot = PLAN_SLOTS[plan.id]
  const stripe = slot?.stripe ?? null
  const price = slot ? (locale === 'fr' ? slot.priceFr : slot.priceEn) : null
  const sola = locale === 'fr' ? 'Utiliser Sola' : 'Use Sola'
  const solaNote =
    locale === 'fr'
      ? 'Sola est l’application bien-être de Table d’Adrian. Elle compose un programme personnel dans le même esprit que ce guide.'
      : 'Sola is the Table d’Adrian wellness app. It builds a personal plan in the same spirit as this guide.'
  return (
    <div id={anchor ? 'buy-plan' : undefined} className="mt-8 border border-dashed border-border-strong p-5">
      <div className="flex flex-wrap items-center gap-4">
        <BuyPlan locale={locale} stripe={stripe} />
        <Button href="/sola" variant="outline">
          {sola}
        </Button>
      </div>
      {price ? <p className="mt-4 font-display text-3xl tracking-tight">{price}</p> : null}
      <p className="mt-3 max-w-prose text-sm text-foreground-muted">{solaNote}</p>
    </div>
  )
}

export function PlansIndex({ locale }: { locale: 'en' | 'fr' }) {
  const h1 = locale === 'fr' ? 'Programmes d’assiette' : 'Menu plans'
  const lede =
    locale === 'fr'
      ? 'Des guides d’assiette et de mode de vie. Menu Énergie Stable, Cuisine Attentive aux Hormones, Table Riviera Cœur Léger, intestin et jours d’entraînement.'
      : 'Eating and lifestyle guides. Steady Energy Menu, Hormone-Aware Kitchen, Heart-Smart Riviera Table, the gut, and training days. These pages are not prescriptions.'
  return (
    <article className="bg-background pb-20 pt-28 text-foreground sm:pt-32">
      <div className="container max-w-3xl">
        <p className="text-[11px] uppercase tracking-caps text-foreground-subtle">{locale === 'fr' ? 'Programmes' : 'Plans'}</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">{h1}</h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground-muted">{lede}</p>
        <p className="mt-6 border border-border-strong bg-background-elevated p-5 text-sm leading-relaxed" role="note">
          {DISCLAIMER[locale]}
        </p>
        <p className="mt-4 text-sm text-foreground-muted">{PLAN_CREDENTIAL}</p>
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {OFFER_PLANS.map((plan) => (
            <li key={plan.id}>
              <Link href={planPath(plan, locale)} className="block py-6">
                <h2 className="font-display text-3xl tracking-tight">{locale === 'fr' ? plan.titleFr : plan.title}</h2>
                <p className="mt-2 text-foreground-muted">{locale === 'fr' ? plan.ledeFr : plan.lede}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function PlanArticle({ plan, locale }: { plan: OfferPlan; locale: 'en' | 'fr' }) {
  const title = locale === 'fr' ? plan.titleFr : plan.title
  const lede = locale === 'fr' ? plan.ledeFr : plan.lede
  const more = locale === 'fr' ? plan.moreFr : plan.more
  const limit = locale === 'fr' ? plan.limitFr : plan.limit
  const habits = locale === 'fr' ? plan.habitsFr : plan.habits
  const note = locale === 'fr' ? plan.noteFr : plan.note
  const moreLabel = locale === 'fr' ? 'À manger plus souvent' : 'What to eat more of'
  const limitLabel = locale === 'fr' ? 'À limiter' : 'What to limit'
  const dayLabel = locale === 'fr' ? 'Une journée de repas' : 'A sample day'
  const habitLabel = locale === 'fr' ? 'Entraînement et journée' : 'Training and lifestyle'
  const back = locale === 'fr' ? 'Tous les programmes' : 'All plans'
  return (
    <article className="bg-background pb-20 pt-28 text-foreground sm:pt-32">
      <div className="container max-w-3xl">
        <p className="text-[11px] uppercase tracking-caps text-foreground-subtle">
          <Link href={plansPath(locale)} className="underline-offset-4 hover:underline">
            {back}
          </Link>
        </p>
        <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground-muted">{lede}</p>
        <p className="mt-6 border border-border-strong bg-background-elevated p-5 text-sm leading-relaxed" role="note">
          {DISCLAIMER[locale]}
        </p>
        <p className="mt-4 text-sm">{PLAN_CREDENTIAL}</p>
        {note ? <p className="mt-4 text-sm text-foreground-muted">{note}</p> : null}
        <PlanActions locale={locale} plan={plan} anchor />
        <section className="mt-12" aria-labelledby="eat-more">
          <h2 id="eat-more" className="font-display text-3xl tracking-tight">{moreLabel}</h2>
          <ul className="mt-4 space-y-3 text-foreground-muted">
            {more.map((item) => (
              <li key={item} className="border-b border-border pb-3">{item}</li>
            ))}
          </ul>
        </section>
        <section className="mt-10" aria-labelledby="eat-less">
          <h2 id="eat-less" className="font-display text-3xl tracking-tight">{limitLabel}</h2>
          <ul className="mt-4 space-y-3 text-foreground-muted">
            {limit.map((item) => (
              <li key={item} className="border-b border-border pb-3">{item}</li>
            ))}
          </ul>
        </section>
        <section className="mt-10" aria-labelledby="sample-day">
          <h2 id="sample-day" className="font-display text-3xl tracking-tight">{dayLabel}</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {plan.meals.map((meal) => {
              const recipe = libraryRecipes.find((item) => item.slug === meal.slug)
              if (!recipe) return null
              const name = locale === 'fr' ? recipe.titleFr : recipe.title
              return (
                <li key={meal.slug + meal.slot} className="flex flex-wrap items-baseline justify-between gap-3 py-4">
                  <span className="text-[11px] uppercase tracking-caps text-foreground-subtle">
                    {locale === 'fr' ? meal.slotFr : meal.slot}
                  </span>
                  <Link href={libraryRecipePath(recipe, locale)} className="underline-offset-4 hover:underline">
                    {name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
        <section className="mt-10" aria-labelledby="habits">
          <h2 id="habits" className="font-display text-3xl tracking-tight">{habitLabel}</h2>
          <ul className="mt-4 space-y-3 text-foreground-muted">
            {habits.map((item) => (
              <li key={item} className="border-b border-border pb-3">{item}</li>
            ))}
          </ul>
        </section>
        <PlanActions locale={locale} plan={plan} />
      </div>
    </article>
  )
}
