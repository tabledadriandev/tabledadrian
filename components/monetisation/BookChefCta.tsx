import { Button } from '@/components/ui/Button'

const COPY = {
  en: {
    eyebrow: "Côte d'Azur · Monaco",
    title: 'Book a private chef',
    body: 'Have this cooked in your kitchen. A private dinner, a villa week, or a yacht galley. Fees are on request, quoted in €.',
    cta: 'Book a private chef',
    href: '/contact?intent=dinner',
  },
  fr: {
    eyebrow: "Côte d'Azur · Monaco",
    title: 'Réserver un chef privé',
    body: 'Faites cuisiner ce plat dans votre cuisine. Un dîner privé, une semaine en villa, ou l’office d’un yacht. Honoraires sur demande, en €.',
    cta: 'Réserver un chef privé',
    href: '/fr/contact?intent=dinner',
  },
} as const

export function BookChefCta({ locale }: { locale: 'en' | 'fr' }) {
  const t = COPY[locale]
  return (
    <aside className="mt-12 border border-border-strong bg-background-elevated px-6 py-8 sm:px-8" aria-labelledby="book-chef-heading">
      <p className="text-[11px] uppercase tracking-caps text-foreground-subtle">{t.eyebrow}</p>
      <h2 id="book-chef-heading" className="mt-2 font-display text-4xl tracking-tight">
        {t.title}
      </h2>
      <p className="mt-3 max-w-prose text-foreground-muted">{t.body}</p>
      <div className="mt-6">
        <Button href={t.href} variant="ink">
          {t.cta}
        </Button>
      </div>
    </aside>
  )
}
