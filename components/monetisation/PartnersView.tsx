import { CONTACT_INFO } from '@/lib/constants'
import { PARTNER_STATS } from '@/lib/monetisation'

const COPY = {
  en: {
    kicker: 'Partners',
    h1: 'A media kit',
    lede: 'Table d’Adrian cooks in private kitchens on the Côte d’Azur and in Monaco, and publishes the journal and the recipe library.',
    who: 'Adrian Stefan. Swiss-trained (EHL). 10+ years. Nutrition certificate, Stanford.',
    audienceTitle: 'Audience',
    audience:
      'People who read the journal and the recipes, and hosts who book a private chef between Monaco and Saint-Tropez. Figures are not published here.',
    optionsTitle: 'Ways to work together',
    options: [
      { title: 'Affiliate', text: 'A tracked link on a relevant page, once Adrian’s affiliate ID exists. The kitchen page already marks those slots.' },
      { title: 'Sponsored recipe', text: 'A recipe in the library or the journal, credited, with the product in the method only if it belongs there.' },
      { title: 'Product at the table', text: 'A bottle, a tool, or a pantry item featured at a private dinner, agreed in the quote.' },
      { title: 'Event sponsorship', text: 'A name beside a wedding weekend or a corporate dinner. The menu stays Adrian’s.' },
    ],
    contact: 'Write to the kitchen',
  },
  fr: {
    kicker: 'Partenaires',
    h1: 'Dossier presse',
    lede: 'Table d’Adrian cuisine dans des cuisines privées sur la Côte d’Azur et à Monaco, et publie le journal et la bibliothèque de recettes.',
    who: 'Adrian Stefan. Formation suisse (EHL). 10+ ans. Nutrition certificate, Stanford.',
    audienceTitle: 'Public',
    audience:
      'Les lecteurs du journal et des recettes, et les hôtes qui réservent un chef privé entre Monaco et Saint-Tropez. Les chiffres ne sont pas publiés ici.',
    optionsTitle: 'Façons de travailler ensemble',
    options: [
      { title: 'Affiliation', text: 'Un lien suivi sur une page pertinente, une fois l’identifiant affilié d’Adrian en place. La page cuisine marque déjà ces emplacements.' },
      { title: 'Recette sponsorisée', text: 'Une recette dans la bibliothèque ou le journal, créditée, avec le produit dans la méthode seulement s’il y a sa place.' },
      { title: 'Produit à table', text: 'Une bouteille, un outil, ou un produit du garde-manger à un dîner privé, accordé dans le devis.' },
      { title: 'Parrainage d’événement', text: 'Un nom à côté d’un week-end de mariage ou d’un dîner d’entreprise. Le menu reste celui d’Adrian.' },
    ],
    contact: 'Écrire à la cuisine',
  },
} as const

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
