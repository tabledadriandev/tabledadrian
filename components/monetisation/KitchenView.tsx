import Image from 'next/image'
import { SectionLabel } from '@/components/editorial/ui'
import { KITCHEN_LINKS } from '@/lib/monetisation'

const COPY = {
  en: {
    kicker: "The chef’s kitchen",
    a: 'Knives, pans,',
    b: 'and',
    c: 'the pantry',
    script: 'Kitchen',
    lede: 'The pieces Adrian reaches for. No prices, and no reviews.',
    count: 'Nine pieces',
    disclosureLabel: 'Affiliate disclosure',
    disclosure:
      'Each link below is a placeholder with rel="sponsored nofollow". The links are not live. If Adrian connects an affiliate programme later, Table d’Adrian may earn a commission. This page is not a review, and it does not name a price.',
    link: 'Affiliate link placeholder',
    off: 'Not connected',
    groups: [
      { index: '02', title: 'knives', name: 'The knives' },
      { index: '03', title: 'pans', name: 'The pans' },
      { index: '04', title: 'pantry', name: 'The pantry' },
    ],
  },
  fr: {
    kicker: 'La cuisine du chef',
    a: 'Couteaux, poêles,',
    b: 'et',
    c: 'le garde-manger',
    script: 'Cuisine',
    lede: 'Les pièces qu’Adrian prend en main. Aucun prix, aucun avis.',
    count: 'Neuf pièces',
    disclosureLabel: 'Mention d’affiliation',
    disclosure:
      'Chaque lien ci-dessous est un placeholder avec rel="sponsored nofollow". Les liens ne sont pas actifs. Si Adrian connecte un programme plus tard, Table d’Adrian peut toucher une commission. Cette page n’est pas un avis, et elle n’indique aucun prix.',
    link: 'Lien affilié, placeholder',
    off: 'Non connecté',
    groups: [
      { index: '02', title: 'couteaux', name: 'Les couteaux' },
      { index: '03', title: 'poêles', name: 'Les poêles' },
      { index: '04', title: 'garde-manger', name: 'Le garde-manger' },
    ],
  },
} as const

const PHOTOS = [
  null,
  { src: '/editorial/kitchen-pan.webp', alt: 'Seasoned carbon-steel frying pan resting on a stone hearth beside a heavy saucepan' },
  { src: '/editorial/kitchen-pantry.webp', alt: 'Unlabelled glass bottle of olive oil, flaky salt and whole peppercorns on linen' },
]

export function KitchenView({ locale }: { locale: 'en' | 'fr' }) {
  const t = COPY[locale]
  const groups = [KITCHEN_LINKS.slice(0, 2), KITCHEN_LINKS.slice(2, 5), KITCHEN_LINKS.slice(5)]
  return (
    <article className="ed-kitchen">
      <header className="ed-kitchen-hero">
        <div>
          <SectionLabel index="01">{t.kicker}</SectionLabel>
          <h1>
            {t.a}
            <br />
            {t.b} <em>{t.c}</em>
          </h1>
          <div>
            <p>{t.lede}</p>
            <p className="ed-caps-static">{t.count}</p>
          </div>
        </div>
        <div className="ed-photo">
          <Image src="/editorial/kitchen-knife.webp" alt="Carbon-steel chef’s knife on an olive-wood board in raking sun" fill priority sizes="(max-width: 1100px) 100vw, 720px" />
          <p>{t.script}</p>
        </div>
      </header>
      <p className="ed-disclosure">
        <strong>{t.disclosureLabel}</strong>
        <span>{t.disclosure}</span>
      </p>
      <div className="ed-kitchen-groups">
        {groups.map((items, index) => (
          <section key={t.groups[index].title}>
            <div>
              <SectionLabel index={t.groups[index].index}>{t.groups[index].title}</SectionLabel>
              <h2>
                {t.groups[index].name.replace(t.groups[index].title, '').trim()} <em>{t.groups[index].title}</em>
              </h2>
              {PHOTOS[index] ? (
                <div className="ed-photo">
                  <Image src={PHOTOS[index]!.src} alt={PHOTOS[index]!.alt} fill sizes="440px" />
                </div>
              ) : null}
            </div>
            <ol>
              {items.map((item, itemIndex) => {
                const number = String(index === 0 ? itemIndex + 1 : index === 1 ? itemIndex + 3 : itemIndex + 6).padStart(2, '0')
                const href = item.href ?? `#affiliate-${item.id}`
                return (
                  <li key={item.id} id={`affiliate-${item.id}`}>
                    <span>{number}</span>
                    <div>
                      <h3>{locale === 'fr' ? item.nameFr : item.name}</h3>
                      <p>{locale === 'fr' ? item.noteFr : item.note}</p>
                    </div>
                    <a href={href} rel="sponsored nofollow">
                      {t.link}
                      <small>{item.href ? '' : t.off}</small>
                    </a>
                  </li>
                )
              })}
            </ol>
          </section>
        ))}
      </div>
    </article>
  )
}
