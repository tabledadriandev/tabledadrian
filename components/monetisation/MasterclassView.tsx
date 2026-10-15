import { Button } from '@/components/ui/Button'

const COPY = {
  en: {
    eyebrow: 'The kitchen',
    h1: 'A class at the table',
    lede: 'An at-home cooking class, or a small-group tasting evening. Cooked with you, on the Côte d’Azur and in Monaco.',
    note: 'Write with a preferred date. The evening is confirmed once the quote is accepted. Fees are on request, quoted in €.',
    cta: 'Enquire about a class',
    href: '/contact?intent=masterclass',
    items: [
      {
        title: 'At-home cooking class',
        text: 'Adrian cooks with you in your kitchen. One dish, the method, and the shopping for it. The household is the class.',
      },
      {
        title: "Chef's table",
        text: 'A small-group tasting evening. A short menu, served where you are gathered. The number of guests is agreed when you enquire.',
      },
    ],
  },
  fr: {
    eyebrow: 'La cuisine',
    h1: 'Un cours à la table',
    lede: 'Un cours de cuisine à domicile, ou une dégustation en petit groupe. Avec vous, sur la Côte d’Azur et à Monaco.',
    note: 'Écrivez avec une date souhaitée. La soirée est confirmée une fois le devis accepté. Honoraires sur demande, en €.',
    cta: 'Demander un cours',
    href: '/fr/contact?intent=masterclass',
    items: [
      {
        title: 'Cours de cuisine à domicile',
        text: 'Adrian cuisine avec vous, dans votre cuisine. Un plat, la méthode, et les courses. La maison est le cours.',
      },
      {
        title: 'Table du chef',
        text: 'Une dégustation en petit groupe. Un menu court, servi là où vous êtes réunis. Le nombre de convives se décide à la demande.',
      },
    ],
  },
} as const

export function MasterclassView({ locale }: { locale: 'en' | 'fr' }) {
  const t = COPY[locale]
  return (
    <article className="bg-background pb-20 pt-28 text-foreground sm:pt-32">
      <div className="container max-w-5xl">
        <p className="text-[11px] uppercase tracking-caps text-foreground-subtle">{t.eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight sm:text-6xl">{t.h1}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">{t.lede}</p>
        <ul className="mt-12 grid gap-10 sm:grid-cols-2">
          {t.items.map((item) => (
            <li key={item.title} className="border-t border-border pt-6">
              <h2 className="font-display text-3xl tracking-tight">{item.title}</h2>
              <p className="mt-3 text-foreground-muted">{item.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-foreground-muted">{t.note}</p>
        <div className="mt-8">
          <Button href={t.href} variant="ink">
            {t.cta}
          </Button>
        </div>
      </div>
    </article>
  )
}
