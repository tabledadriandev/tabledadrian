import { KITCHEN_LINKS } from '@/lib/monetisation'

const COPY = {
  en: {
    eyebrow: "The chef's kitchen",
    h1: 'Knives, pans, and the pantry',
    lede: 'The pieces Adrian reaches for. No prices, and no reviews.',
    disclosure:
      'Affiliate disclosure. Each link below is a placeholder with rel="sponsored nofollow". The links are not live. If Adrian connects an affiliate programme later, Table d’Adrian may earn a commission. This page is not a review, and it does not name a price.',
    link: 'Affiliate link placeholder',
    mark: 'Placeholder · not connected · add Adrian’s affiliate ID',
  },
  fr: {
    eyebrow: 'La cuisine du chef',
    h1: 'Couteaux, poêles, et le garde-manger',
    lede: 'Les pièces qu’Adrian prend en main. Aucun prix, aucun avis.',
    disclosure:
      'Mention d’affiliation. Chaque lien ci-dessous est un placeholder avec rel="sponsored nofollow". Les liens ne sont pas actifs. Si Adrian connecte un programme plus tard, Table d’Adrian peut toucher une commission. Cette page n’est pas un avis, et elle n’indique aucun prix.',
    link: 'Lien affilié, placeholder',
    mark: 'Placeholder · non connecté · ajouter l’identifiant affilié d’Adrian',
  },
} as const

export function KitchenView({ locale }: { locale: 'en' | 'fr' }) {
  const t = COPY[locale]
  return (
    <article className="bg-background pb-20 pt-28 text-foreground sm:pt-32">
      <div className="container max-w-3xl">
        <p className="text-[11px] uppercase tracking-caps text-foreground-subtle">{t.eyebrow}</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">{t.h1}</h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground-muted">{t.lede}</p>
        <p className="mt-8 border border-dashed border-border-strong p-5 text-sm leading-relaxed text-foreground-muted">{t.disclosure}</p>
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {KITCHEN_LINKS.map((item) => {
            const name = locale === 'fr' ? item.nameFr : item.name
            const note = locale === 'fr' ? item.noteFr : item.note
            const href = item.href ?? `#affiliate-${item.id}`
            return (
              <li key={item.id} className="py-6" id={`affiliate-${item.id}`}>
                <h2 className="font-display text-3xl tracking-tight">{name}</h2>
                <p className="mt-2 text-foreground-muted">{note}</p>
                <a href={href} rel="sponsored nofollow" className="mt-3 inline-block text-sm underline underline-offset-4">
                  {t.link}
                </a>
                {item.href ? null : <p className="mt-2 text-[11px] uppercase tracking-caps text-foreground-subtle">{t.mark}</p>}
              </li>
            )
          })}
        </ul>
      </div>
    </article>
  )
}
