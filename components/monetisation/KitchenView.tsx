import { EdFigure, EdHero, EdPage } from '@/components/editorial/Page'
import { KITCHEN_LINKS } from '@/lib/monetisation'

const COPY = {
  en: {
    eyebrow: "The chef's kitchen",
    h1: 'Knives, pans,',
    italic: 'and the pantry',
    lede: 'The pieces Adrian reaches for. No prices, and no reviews.',
    disclosure:
      'Affiliate disclosure. Each link below is a placeholder with rel="sponsored nofollow". The links are not live. If Adrian connects an affiliate programme later, Table d’Adrian may earn a commission. This page is not a review, and it does not name a price.',
    link: 'Affiliate link placeholder',
    mark: 'Placeholder · not connected · add Adrian’s affiliate ID',
  },
  fr: {
    eyebrow: 'La cuisine du chef',
    h1: 'Couteaux, poêles,',
    italic: 'et le garde-manger',
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
    <EdPage>
      <EdHero kicker={t.eyebrow} title={t.h1} italic={t.italic} lede={t.lede} />
      <section className="ed-page-section">
        <EdFigure id="kitchen-hero" label={t.eyebrow} src="/editorial/chef-mise-en-place.webp" />
        <p className="ed-note">{t.disclosure}</p>
        <ul className="ed-index">
          {KITCHEN_LINKS.map((item, index) => {
            const name = locale === 'fr' ? item.nameFr : item.name
            const note = locale === 'fr' ? item.noteFr : item.note
            const href = item.href ?? `#affiliate-${item.id}`
            return (
              <li key={item.id} id={`affiliate-${item.id}`}>
                <a href={href} rel="sponsored nofollow">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{name}</strong>
                  <em>{note}</em>
                  <span className="ed-arrow" aria-hidden="true">→</span>
                </a>
                {item.href ? null : <p className="ed-note">{t.mark}</p>}
              </li>
            )
          })}
        </ul>
      </section>
    </EdPage>
  )
}
