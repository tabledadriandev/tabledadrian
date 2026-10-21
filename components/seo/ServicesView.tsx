import { SeasonPush } from '@/components/season/SeasonPush'
import { EdHero, EdList, EdPage } from '@/components/editorial/Page'
import type { Locale } from '@/lib/copy'

const COPY = {
  en: {
    h1: 'Private chef',
    italic: 'services',
    lede: 'Private dinners, a week in a villa, a yacht galley, and celebrations. Cooked in your kitchen on the Côte d’Azur and in Monaco.',
    items: [
      { href: '/private-chef-cote-d-azur', title: 'Private dinners', text: 'A table written for the people eating it, from Monaco to Saint-Tropez.' },
      { href: '/yacht-chef', title: 'Yacht chef', text: 'Galley cooking for the people on board, alongside or underway.' },
      { href: '/villa-chef', title: 'Villa chef', text: 'Breakfast, lunch and dinner for a week, shopped that morning.' },
      { href: '/events-and-weddings', title: 'Events and weddings', text: 'A wedding weekend or a longer guest list. Enquire for a tailored quote.' },
      { href: '/gift', title: 'Gift a dinner', text: 'Choose a €150, €300 or €500 card and pay online.' },
      { href: '/masterclass', title: 'Cooking class', text: 'An at-home class or a small-group tasting evening.' },
      { href: '/chefs-kitchen', title: "Chef's kitchen", text: 'Knives, pans and pantry pieces. Affiliate links are not live.' },
      { href: '/private-chef-nice', title: 'Nice', text: 'Market mornings and dinners above the Baie des Anges.' },
      { href: '/private-chef-cannes', title: 'Cannes', text: 'Weekend stays and Festival-season tables.' },
      { href: '/private-chef-antibes', title: 'Antibes', text: 'Cap d’Antibes and the port, cooked in the house kitchen.' },
      { href: '/private-chef-monaco', title: 'Monaco', text: 'Compact apartment kitchens in Monte-Carlo.' },
      { href: '/private-chef-saint-tropez', title: 'Saint-Tropez', text: 'Villa weeks on the peninsula and in Ramatuelle.' },
      { href: '/private-chef-saint-jean-cap-ferrat', title: 'Saint-Jean-Cap-Ferrat', text: 'Villa kitchens on the peninsula between Nice and Monaco.' },
    ],
  },
  fr: {
    h1: 'Services de',
    italic: 'chef privé',
    lede: 'Dîners privés, une semaine en villa, l’office d’un yacht, et les célébrations. Cuisinés dans votre cuisine, sur la Côte d’Azur et à Monaco.',
    items: [
      { href: '/fr/chef-prive-cote-d-azur', title: 'Dîners privés', text: 'Une table écrite pour ceux qui mangent, de Monaco à Saint-Tropez.' },
      { href: '/fr/chef-de-yacht', title: 'Chef de yacht', text: 'La cuisine de l’office, à quai ou en navigation.' },
      { href: '/fr/chef-en-villa', title: 'Chef en villa', text: 'Petit déjeuner, déjeuner et dîner pour une semaine, courses du matin.' },
      { href: '/fr/evenements-et-mariages', title: 'Événements et mariages', text: 'Un week-end de mariage ou une liste plus longue. Devis sur mesure.' },
      { href: '/fr/cadeau', title: 'Offrir un dîner', text: 'Choisissez un bon de 150 €, 300 € ou 500 € et payez en ligne.' },
      { href: '/fr/cours-de-cuisine', title: 'Cours de cuisine', text: 'Un cours à domicile ou une dégustation en petit groupe.' },
      { href: '/fr/cuisine-du-chef', title: 'Cuisine du chef', text: 'Couteaux, poêles et garde-manger. Les liens affiliés ne sont pas actifs.' },
      { href: '/fr/chef-prive-nice', title: 'Nice', text: 'Matins au marché et dîners au-dessus de la Baie des Anges.' },
      { href: '/fr/chef-prive-cannes', title: 'Cannes', text: 'Week-ends et tables de la saison du Festival.' },
      { href: '/fr/chef-prive-antibes', title: 'Antibes', text: 'Le Cap d’Antibes et le port, dans la cuisine de la maison.' },
      { href: '/fr/chef-prive-monaco', title: 'Monaco', text: 'Cuisines d’appartement à Monte-Carlo.' },
      { href: '/fr/chef-prive-saint-tropez', title: 'Saint-Tropez', text: 'Semaines en villa sur la presqu’île et à Ramatuelle.' },
      { href: '/fr/chef-prive-saint-jean-cap-ferrat', title: 'Saint-Jean-Cap-Ferrat', text: 'Cuisines de villa sur la presqu’île entre Nice et Monaco.' },
    ],
  },
} as const

export function ServicesView({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  return (
    <EdPage>
      <EdHero
        kicker={locale === 'fr' ? 'Expériences' : 'Experiences'}
        title={copy.h1}
        italic={copy.italic}
        lede={copy.lede}
        action={{ href: locale === 'fr' ? '/fr/contact' : '/contact', label: locale === 'fr' ? 'Demander' : 'Enquire' }}
        figure={{ id: 'services-hero', label: locale === 'fr' ? 'Services' : 'Services' }}
      />
      <section className="ed-page-section">
        <SeasonPush locale={locale} place="page" />
        <EdList items={copy.items.map((item) => ({ ...item }))} />
      </section>
    </EdPage>
  )
}
