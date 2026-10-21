import { Button } from '@/components/ui/Button'

const COPY = {
  en: {
    title: 'Corporate and event packages',
    lede: 'Quoted for the date and the guest list. No fee is published on this page.',
    cta: 'Enquire about an event',
    href: '/contact?intent=corporate',
    items: [
      {
        title: 'Wedding weekend',
        text: 'A menu for the weekend, cooked in the house kitchen. Florals and photography stay with your own suppliers.',
      },
      {
        title: 'Celebration dinner',
        text: 'A birthday or a longer table. The menu is agreed in writing before the date is held.',
      },
      {
        title: 'Corporate dinner',
        text: 'A board dinner or a client table. The kitchen covers the food.',
      },
      {
        title: 'Guest-list lunch',
        text: 'A daytime table, when the evening is not the point.',
      },
    ],
  },
  fr: {
    title: 'Formules entreprise et événement',
    lede: 'Un devis selon la date et la liste des convives. Aucun tarif n’est publié sur cette page.',
    cta: 'Demander un événement',
    href: '/fr/contact?intent=corporate',
    items: [
      {
        title: 'Week-end de mariage',
        text: 'Un menu pour le week-end, cuisiné dans la cuisine de la maison. Fleurs et photographie restent avec vos prestataires.',
      },
      {
        title: 'Dîner de célébration',
        text: 'Un anniversaire ou une table plus longue. Le menu est accordé par écrit avant que la date ne soit retenue.',
      },
      {
        title: 'Dîner d’entreprise',
        text: 'Un dîner de conseil ou une table de clients. La cuisine couvre les plats.',
      },
      {
        title: 'Déjeuner de convives',
        text: 'Une table de jour, quand la soirée n’est pas le sujet.',
      },
    ],
  },
} as const

export function EventPackages({ locale }: { locale: 'en' | 'fr' }) {
  const t = COPY[locale]
  return (
    <section className="mt-20 border-t border-border pt-12 sm:mt-24" aria-labelledby="event-packages" id="packages">
      <h2 id="event-packages" className="display text-3xl sm:text-4xl">
        {t.title}
      </h2>
      <p className="mt-4 max-w-[62ch] text-foreground-muted">{t.lede}</p>
      <ul className="mt-8 grid gap-8 sm:grid-cols-2">
        {t.items.map((item) => (
          <li key={item.title} className="border-t border-border pt-4">
            <h3 className="font-display text-2xl tracking-tight">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{item.text}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button href={t.href} variant="ink">
          {t.cta}
        </Button>
      </div>
    </section>
  )
}
