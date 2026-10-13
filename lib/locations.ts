import type { Locale } from '@/lib/copy'
import type { FaqItem } from '@/lib/faq'
import { FAQ } from '@/lib/faq'
import { townFaq } from '@/lib/location-faq'

export type LocationId = 'hub' | 'monaco' | 'nice' | 'cannes' | 'antibes' | 'saint-tropez'

export type LocationRecord = {
  id: LocationId
  locale: Locale
  slug: string
  path: string
  pairPath: string
  name: string
  h1: string
  title: string
  description: string
  lede: string
  body: string[]
  nearbyTitle: string
  nearby: string[]
  nearbyNote: string
  imageSrc: string
  imageAlt: string
  showFaq: boolean
}

export const LOCATIONS: LocationRecord[] = [
  {
    id: "hub",
    locale: "en",
    slug: "cote-d-azur",
    path: "/private-chef-cote-d-azur",
    pairPath: "/fr/chef-prive-cote-d-azur",
    name: "C\u00f4te d'Azur & Monaco",
    h1: "Private chef C\u00f4te d'Azur and Monaco",
    title: "Private Chef C\u00f4te d'Azur & Monaco",
    description: "Private chef and longevity cuisine on the C\u00f4te d'Azur and in Monaco. French Riviera and south of France tables. Enquire via the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com.",
    lede: "A private chef for villas and private tables from Monaco to Saint-Tropez, with longevity cuisine and fine-dining precision.",
    body: [
      "Table d'Adrian is Adrian Stefan's private chef service on the C\u00f4te d'Azur and in Monaco. That is the French Riviera, the south of France coast that runs from the Italian border through Nice and Cannes to the Gulf of Saint-Tropez. He cooks in your kitchen, not in a restaurant dining room.",
      "The work is a private dinner, a week of meals in a villa, or a celebration. Each menu is written from scratch around the people at the table, the season's market, and any dietary notes you send. Longevity cuisine here is a style of cooking, Mediterranean and seasonal, held to fine-dining precision. It is not a health claim.",
      "Adrian is Swiss-trained (EHL), with 10+ years in demanding kitchens and a Nutrition certificate, Stanford. Fees are on request, quoted in \u20ac. Write through the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com.",
      "Dedicated pages cover Monaco, Nice, Cannes, Antibes and Saint-Tropez. Secondary places along the coast, from Saint-Jean-Cap-Ferrat and \u00c8ze to Ramatuelle and Menton, are listed on those town pages under where we cook.",
    ],
    nearbyTitle: "Where we cook",
    nearby: ["Monaco", "Nice", "Cannes", "Antibes", "Saint-Tropez", "Saint-Jean-Cap-Ferrat", "Cap d'Antibes", "Mougins", "\u00c8ze", "Villefranche-sur-Mer", "Beaulieu-sur-Mer", "Cap-d'Ail", "Menton", "Ramatuelle", "Roquebrune-Cap-Martin"],
    nearbyNote: "These are places on the C\u00f4te d'Azur and in Monaco where a private dinner or a villa week can be arranged. They are not a claim that the kitchen is based in each town.",
    imageSrc: "/gallery/langoustine.jpeg",
    imageAlt: "Seared langoustine with broad beans on a C\u00f4te d'Azur table, Table d'Adrian private chef.",
    showFaq: true,
  },
  {
    id: "hub",
    locale: "fr",
    slug: "cote-d-azur",
    path: "/fr/chef-prive-cote-d-azur",
    pairPath: "/private-chef-cote-d-azur",
    name: "C\u00f4te d'Azur et Monaco",
    h1: "Chef priv\u00e9 C\u00f4te d'Azur et Monaco",
    title: "Chef priv\u00e9 C\u00f4te d'Azur et Monaco",
    description: "Chef priv\u00e9 et chef \u00e0 domicile sur la C\u00f4te d'Azur et \u00e0 Monaco. French Riviera. Formulaire, DM Instagram @tabledadrian, ou adrian@tabledadrian.com.",
    lede: "Un chef priv\u00e9 et chef \u00e0 domicile pour les villas et les tables priv\u00e9es, de Monaco \u00e0 Saint-Tropez. Cuisine long\u00e9vit\u00e9 et pr\u00e9cision gastronomique.",
    body: [
      "Table d'Adrian est le service de chef priv\u00e9 d'Adrian Stefan sur la C\u00f4te d'Azur et \u00e0 Monaco. C'est la French Riviera, la c\u00f4te du sud de la France qui va de la fronti\u00e8re italienne \u00e0 Nice et Cannes jusqu'au golfe de Saint-Tropez. Il cuisine dans votre cuisine, pas en salle de restaurant.",
      "Le travail est un d\u00eener priv\u00e9, une semaine de repas en villa, ou une c\u00e9l\u00e9bration. Chaque menu s'\u00e9crit autour des convives, du march\u00e9 de saison et des notes di\u00e9t\u00e9tiques que vous envoyez. La cuisine long\u00e9vit\u00e9 est ici un style, m\u00e9diterran\u00e9enne et de saison, tenu \u00e0 la pr\u00e9cision d'un passage gastronomique. Ce n'est pas une promesse de sant\u00e9.",
      "Adrian est de formation suisse (EHL), avec 10+ ans dans des cuisines exigeantes et un Nutrition certificate, Stanford. Les honoraires sont sur demande, en \u20ac. \u00c9crivez via le formulaire, en DM Instagram @tabledadrian, ou \u00e0 adrian@tabledadrian.com.",
      "Des pages d\u00e9di\u00e9es couvrent Monaco, Nice, Cannes, Antibes et Saint-Tropez. Les lieux secondaires le long de la c\u00f4te, de Saint-Jean-Cap-Ferrat et \u00c8ze \u00e0 Ramatuelle et Menton, figurent sur ces pages, sous o\u00f9 nous cuisinons.",
    ],
    nearbyTitle: "O\u00f9 nous cuisinons",
    nearby: ["Monaco", "Nice", "Cannes", "Antibes", "Saint-Tropez", "Saint-Jean-Cap-Ferrat", "Cap d'Antibes", "Mougins", "\u00c8ze", "Villefranche-sur-Mer", "Beaulieu-sur-Mer", "Cap-d'Ail", "Menton", "Ramatuelle", "Roquebrune-Cap-Martin"],
    nearbyNote: "Ce sont des lieux sur la C\u00f4te d'Azur et \u00e0 Monaco o\u00f9 un d\u00eener priv\u00e9 ou une semaine en villa peut s'organiser. Ce n'est pas une affirmation que la cuisine est install\u00e9e dans chaque ville.",
    imageSrc: "/gallery/langoustine.jpeg",
    imageAlt: "Langoustine po\u00eal\u00e9e et f\u00e8ves sur une table de la C\u00f4te d'Azur, chef priv\u00e9 Table d'Adrian.",
    showFaq: true,
  },
  {
    id: "monaco",
    locale: "en",
    slug: "monaco",
    path: "/private-chef-monaco",
    pairPath: "/fr/chef-prive-monaco",
    name: "Monaco",
    h1: "Private chef Monaco",
    title: "Private Chef Monaco",
    description: "Private chef in Monaco and Monte-Carlo. Compact kitchens, apartment dinners and Grand Prix dates on request. Enquire via the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com.",
    lede: "A private chef in Monaco for apartments and townhouses in Monte-Carlo, Larvotto and the Rock, where the kitchen is often small and the table is the whole evening.",
    body: [
      "Hiring a private chef in Monaco is usually a matter of a compact kitchen and a precise guest list. Monte-Carlo apartments, houses on the Rock and flats above Larvotto rarely have a restaurant pass. The work is to cook in the space you have, plate at the table, and leave the rooms as they were found.",
      "Grand Prix week, the boat-show calendar and New Year fill the principality. Those dates are taken on request; write early if the table is tied to a race or a gala. A chef a domicile in Monaco can also cover a quiet Tuesday for two, with a menu written that morning from what the market holds.",
      "Adrian is Swiss-trained (EHL), with 10+ years and a Nutrition certificate, Stanford. Longevity cuisine, here, means Mediterranean cooking with fine-dining precision, not a medical promise. Fees are on request, quoted in \u20ac.",
      "The principality sits against Cap-d'Ail and Roquebrune-Cap-Martin. A Monaco booking can extend to those communes, or to a dinner that starts in Monte-Carlo and finishes looking at \u00c8ze. Write through the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com.",
    ],
    nearbyTitle: "Where we cook near Monaco",
    nearby: ["Monaco", "Monte-Carlo", "Cap-d'Ail", "Roquebrune-Cap-Martin", "Beaulieu-sur-Mer", "\u00c8ze", "Villefranche-sur-Mer"],
    nearbyNote: "Monaco is the booking. The neighbouring communes are listed because the coast is short and the same kitchen can travel.",
    imageSrc: "/gallery/lobster-claw.jpeg",
    imageAlt: "Lobster claw with pickled onion on a Monaco table, Table d'Adrian private chef.",
    showFaq: true,
  },
  {
    id: "monaco",
    locale: "fr",
    slug: "monaco",
    path: "/fr/chef-prive-monaco",
    pairPath: "/private-chef-monaco",
    name: "Monaco",
    h1: "Chef priv\u00e9 Monaco",
    title: "Chef priv\u00e9 Monaco",
    description: "Chef priv\u00e9 et chef \u00e0 domicile \u00e0 Monaco et Monte-Carlo. Cuisines compactes, d\u00eeners en appartement. Formulaire, DM Instagram @tabledadrian, ou adrian@tabledadrian.com.",
    lede: "Un chef priv\u00e9 et chef \u00e0 domicile \u00e0 Monaco pour les appartements et les maisons de Monte-Carlo, du Larvotto et du Rocher, l\u00e0 o\u00f9 la cuisine est souvent petite et la table est toute la soir\u00e9e.",
    body: [
      "Engager un chef priv\u00e9 \u00e0 Monaco, c'est souvent une cuisine compacte et une liste de convives pr\u00e9cise. Les appartements de Monte-Carlo, les maisons du Rocher et les flats au-dessus du Larvotto n'ont pas un passage de restaurant. Le travail est de cuisiner dans l'espace dont vous disposez, de dresser \u00e0 table, et de laisser les pi\u00e8ces comme on les a trouv\u00e9es.",
      "La semaine du Grand Prix, le calendrier du yacht show et le Nouvel An remplissent la principaut\u00e9. Ces dates se prennent sur demande ; \u00e9crivez t\u00f4t si la table est li\u00e9e \u00e0 une course ou \u00e0 un gala. Un chef \u00e0 domicile \u00e0 Monaco peut aussi couvrir un mardi calme pour deux, avec un menu \u00e9crit le matin d'apr\u00e8s le march\u00e9.",
      "Adrian est de formation suisse (EHL), avec 10+ ans et un Nutrition certificate, Stanford. La cuisine long\u00e9vit\u00e9, ici, d\u00e9signe une cuisine m\u00e9diterran\u00e9enne tenue \u00e0 la pr\u00e9cision gastronomique, pas une promesse m\u00e9dicale. Les honoraires sont sur demande, en \u20ac.",
      "La principaut\u00e9 s'adosse \u00e0 Cap-d'Ail et Roquebrune-Cap-Martin. Une r\u00e9servation \u00e0 Monaco peut s'\u00e9tendre \u00e0 ces communes, ou \u00e0 un d\u00eener qui commence \u00e0 Monte-Carlo et finit face \u00e0 \u00c8ze. \u00c9crivez via le formulaire, en DM Instagram @tabledadrian, ou \u00e0 adrian@tabledadrian.com.",
    ],
    nearbyTitle: "O\u00f9 nous cuisinons pr\u00e8s de Monaco",
    nearby: ["Monaco", "Monte-Carlo", "Cap-d'Ail", "Roquebrune-Cap-Martin", "Beaulieu-sur-Mer", "\u00c8ze", "Villefranche-sur-Mer"],
    nearbyNote: "Monaco est la r\u00e9servation. Les communes voisines figurent parce que la c\u00f4te est courte et que la m\u00eame cuisine peut s'y d\u00e9placer.",
    imageSrc: "/gallery/lobster-claw.jpeg",
    imageAlt: "Pince de homard et oignon marin\u00e9 sur une table \u00e0 Monaco, chef priv\u00e9 Table d'Adrian.",
    showFaq: true,
  },
  {
    id: "nice",
    locale: "en",
    slug: "nice",
    path: "/private-chef-nice",
    pairPath: "/fr/chef-prive-nice",
    name: "Nice",
    h1: "Private chef Nice",
    title: "Private Chef Nice (France)",
    description: "Private chef in Nice, France. Market-led menus, weekday villa residencies and dinners above the Baie des Anges. Enquire via the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com.",
    lede: "A private chef in Nice, France, for weekday residencies and dinners that start at the market and end on a terrace above the Baie des Anges.",
    body: [
      "Nice is the working city of the C\u00f4te d'Azur. A private chef here is less about a single Saturday and more about a rhythm: Cours Saleya in the morning, a kitchen in Cimiez, the Port or up toward Fabron in the afternoon, and a table that can run for a week of quiet dinners rather than one event.",
      "Menus follow what the market actually holds, not a printed book. That is the difference from a Monaco apartment dinner or a Cannes festival weekend: Nice can support a residency. Dietary notes are taken when you write; the cooking stays a matter of taste and preference.",
      "Adrian is Swiss-trained (EHL), with 10+ years and a Nutrition certificate, Stanford. Longevity cuisine on a Ni\u00e7ois table means seasonal Mediterranean cooking with fine-dining precision. Fees are on request, quoted in \u20ac.",
      "From Nice the coast is close: Villefranche-sur-Mer, Saint-Jean-Cap-Ferrat, \u00c8ze and Beaulieu-sur-Mer sit a short drive east. A Nice booking can cover those communes when the week is based in the city. Write through the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com.",
    ],
    nearbyTitle: "Where we cook near Nice",
    nearby: ["Nice", "Villefranche-sur-Mer", "Saint-Jean-Cap-Ferrat", "\u00c8ze", "Beaulieu-sur-Mer", "Cimiez", "Menton"],
    nearbyNote: "Nice is the booking. The eastern communes are listed because a week based in the city often includes a dinner along that stretch.",
    imageSrc: "/gallery/zucchini-carpaccio.jpeg",
    imageAlt: "Courgette carpaccio with sage and lemon on a Nice table, Table d'Adrian private chef.",
    showFaq: true,
  },
  {
    id: "nice",
    locale: "fr",
    slug: "nice",
    path: "/fr/chef-prive-nice",
    pairPath: "/private-chef-nice",
    name: "Nice",
    h1: "Chef priv\u00e9 Nice",
    title: "Chef priv\u00e9 Nice",
    description: "Chef priv\u00e9 et chef \u00e0 domicile \u00e0 Nice. Menus de march\u00e9, semaines en villa, d\u00eeners au-dessus de la Baie des Anges. Formulaire, DM Instagram @tabledadrian, ou adrian@tabledadrian.com.",
    lede: "Un chef priv\u00e9 et chef \u00e0 domicile \u00e0 Nice pour les semaines en villa et les d\u00eeners qui commencent au march\u00e9 et finissent sur une terrasse au-dessus de la Baie des Anges.",
    body: [
      "Nice est la ville qui travaille sur la C\u00f4te d'Azur. Un chef priv\u00e9 y est moins une affaire de samedi unique qu'un rythme : Cours Saleya le matin, une cuisine \u00e0 Cimiez, au Port ou vers Fabron l'apr\u00e8s-midi, et une table qui peut tenir une semaine de d\u00eeners calmes plut\u00f4t qu'un seul ev\u00e9nement.",
      "Les menus suivent ce que le march\u00e9 donne, pas un livre imprim\u00e9. C'est la diff\u00e9rence avec un d\u00eener en appartement \u00e0 Monaco ou un week-end de festival \u00e0 Cannes : Nice peut porter une r\u00e9sidence. Les notes di\u00e9t\u00e9tiques se prennent lorsque vous \u00e9crivez ; la cuisine reste une affaire de go\u00f9t et de pr\u00e9f\u00e9rence.",
      "Adrian est de formation suisse (EHL), avec 10+ ans et un Nutrition certificate, Stanford. La cuisine long\u00e9vit\u00e9 sur une table ni\u00e7oise d\u00e9signe une cuisine m\u00e9diterran\u00e9enne de saison, tenue \u00e0 la pr\u00e9cision gastronomique. Les honoraires sont sur demande, en \u20ac.",
      "Depuis Nice, la c\u00f4te est proche : Villefranche-sur-Mer, Saint-Jean-Cap-Ferrat, \u00c8ze et Beaulieu-sur-Mer sont \u00e0 quelques minutes vers l'est. Une r\u00e9servation \u00e0 Nice peut couvrir ces communes lorsque la semaine est bas\u00e9e en ville. \u00c9crivez via le formulaire, en DM Instagram @tabledadrian, ou \u00e0 adrian@tabledadrian.com.",
    ],
    nearbyTitle: "O\u00f9 nous cuisinons pr\u00e8s de Nice",
    nearby: ["Nice", "Villefranche-sur-Mer", "Saint-Jean-Cap-Ferrat", "\u00c8ze", "Beaulieu-sur-Mer", "Cimiez", "Menton"],
    nearbyNote: "Nice est la r\u00e9servation. Les communes de l'est figurent parce qu'une semaine en ville inclut souvent un d\u00eener sur ce trait de c\u00f4te.",
    imageSrc: "/gallery/zucchini-carpaccio.jpeg",
    imageAlt: "Carpaccio de courgette, sauge et citron sur une table \u00e0 Nice, chef priv\u00e9 Table d'Adrian.",
    showFaq: true,
  },
  {
    id: "cannes",
    locale: "en",
    slug: "cannes",
    path: "/private-chef-cannes",
    pairPath: "/fr/chef-prive-cannes",
    name: "Cannes",
    h1: "Private chef Cannes",
    title: "Private Chef Cannes",
    description: "Private chef in Cannes for weekend stays, private dinners and Festival-season tables. Enquire via the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com.",
    lede: "A private chef in Cannes for a weekend stay, a dinner above the Croisette, or a Festival-season table that needs to be booked as a date, not a walk-in.",
    body: [
      "Cannes turns on weekends and on a handful of calendar weeks. A private chef here is often a Friday-to-Sunday villa, a dinner in a Californie or Super-Cannes house, or a table during the Festival when the town is full and the kitchen still has to work.",
      "Festival dates, and the weeks around them, are taken on request. Write early. The rest of the year Cannes is a quieter private-dinner town: a chef a domicile for a week-end, shopping in the morning, service at eight, the rooms reset before midnight.",
      "Adrian is Swiss-trained (EHL), with 10+ years and a Nutrition certificate, Stanford. Menus are written for the guests in the room. Longevity cuisine is the style, not a medical claim. Fees are on request, quoted in \u20ac.",
      "Mougins sits in the hills behind the bay; Antibes is the next town east. A Cannes booking can include a dinner in Mougins when the stay is based on the coast. Write through the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com.",
    ],
    nearbyTitle: "Where we cook near Cannes",
    nearby: ["Cannes", "Mougins", "Antibes", "Cap d'Antibes", "La Californie", "Super-Cannes"],
    nearbyNote: "Cannes is the booking. Mougins and the hills are listed because a weekend on the bay often includes a dinner above it.",
    imageSrc: "/gallery/rose-tartlets.jpeg",
    imageAlt: "Berry rose tartlets with whipped cream on a Cannes table, Table d'Adrian private chef.",
    showFaq: true,
  },
  {
    id: "cannes",
    locale: "fr",
    slug: "cannes",
    path: "/fr/chef-prive-cannes",
    pairPath: "/private-chef-cannes",
    name: "Cannes",
    h1: "Chef priv\u00e9 Cannes",
    title: "Chef priv\u00e9 Cannes",
    description: "Chef priv\u00e9 et chef \u00e0 domicile \u00e0 Cannes pour un week-end, un d\u00eener priv\u00e9 ou une table pendant le Festival. Formulaire, DM Instagram @tabledadrian, ou adrian@tabledadrian.com.",
    lede: "Un chef priv\u00e9 et chef \u00e0 domicile \u00e0 Cannes pour un week-end, un d\u00eener au-dessus de la Croisette, ou une table de Festival qui se r\u00e9serve comme une date, pas comme un passage.",
    body: [
      "Cannes vit au week-end et sur quelques semaines du calendrier. Un chef priv\u00e9 y est souvent une villa du vendredi au dimanche, un d\u00eener dans une maison de la Californie ou de Super-Cannes, ou une table pendant le Festival, quand la ville est pleine et que la cuisine doit quand m\u00eame tenir.",
      "Les dates du Festival, et les semaines autour, se prennent sur demande. \u00c9crivez t\u00f4t. Le reste de l'ann\u00e9e, Cannes est une ville de d\u00eener priv\u00e9 plus calme : un chef \u00e0 domicile pour un week-end, les courses le matin, le service \u00e0 vingt heures, les pi\u00e8ces remises en ordre avant minuit.",
      "Adrian est de formation suisse (EHL), avec 10+ ans et un Nutrition certificate, Stanford. Les menus s'\u00e9crivent pour les convives. La cuisine long\u00e9vit\u00e9 est le style, pas une promesse m\u00e9dicale. Les honoraires sont sur demande, en \u20ac.",
      "Mougins est dans les collines derri\u00e8re la baie ; Antibes est la ville suivante vers l'est. Une r\u00e9servation \u00e0 Cannes peut inclure un d\u00eener \u00e0 Mougins lorsque le s\u00e9jour est sur la c\u00f4te. \u00c9crivez via le formulaire, en DM Instagram @tabledadrian, ou \u00e0 adrian@tabledadrian.com.",
    ],
    nearbyTitle: "O\u00f9 nous cuisinons pr\u00e8s de Cannes",
    nearby: ["Cannes", "Mougins", "Antibes", "Cap d'Antibes", "La Californie", "Super-Cannes"],
    nearbyNote: "Cannes est la r\u00e9servation. Mougins et les collines figurent parce qu'un week-end sur la baie inclut souvent un d\u00eener au-dessus.",
    imageSrc: "/gallery/rose-tartlets.jpeg",
    imageAlt: "Tartelettes rose aux fruits rouges sur une table \u00e0 Cannes, chef priv\u00e9 Table d'Adrian.",
    showFaq: true,
  },
  {
    id: "antibes",
    locale: "en",
    slug: "antibes",
    path: "/private-chef-antibes",
    pairPath: "/fr/chef-prive-antibes",
    name: "Antibes",
    h1: "Private chef Antibes",
    title: "Private Chef Antibes",
    description: "Private chef in Antibes, on Cap d'Antibes and in Juan-les-Pins. Villa dinners between Nice and Cannes. Enquire via the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com.",
    lede: "A private chef in Antibes for houses on Cap d'Antibes and evenings in Juan-les-Pins, on the stretch of coast that sits between the noise of Cannes and the working city of Nice.",
    body: [
      "Antibes is a peninsula town, not a festival stage. The bookings that fit are villas on Cap d'Antibes, a garden table behind the old ramparts, or a night in Juan-les-Pins when the pines are still and the kitchen can work without a hotel pass.",
      "This page does not claim that Table d'Adrian is based in Antibes. It is a place we cook: a private chef for Antibes, France, travelling the same coast as the Nice and Cannes pages. Port Vauban and the cap are geography, not a client list.",
      "Adrian is Swiss-trained (EHL), with 10+ years and a Nutrition certificate, Stanford. Menus are Mediterranean and seasonal, written for the table. Fees are on request, quoted in \u20ac.",
      "From Antibes, Cannes is the next bay west and Nice is a short run east. A week on the cap can include a dinner in either town. Write through the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com.",
    ],
    nearbyTitle: "Where we cook near Antibes",
    nearby: ["Antibes", "Cap d'Antibes", "Juan-les-Pins", "Cannes", "Nice", "Mougins"],
    nearbyNote: "Antibes is the booking. Cap d'Antibes and Juan-les-Pins are the same commune's two faces; Cannes and Nice are the neighbouring towns.",
    imageSrc: "/gallery/duck-breast.jpeg",
    imageAlt: "Duck breast with shimeji on an Antibes table, Table d'Adrian private chef.",
    showFaq: true,
  },
  {
    id: "antibes",
    locale: "fr",
    slug: "antibes",
    path: "/fr/chef-prive-antibes",
    pairPath: "/private-chef-antibes",
    name: "Antibes",
    h1: "Chef priv\u00e9 Antibes",
    title: "Chef priv\u00e9 Antibes",
    description: "Chef priv\u00e9 et chef \u00e0 domicile \u00e0 Antibes, au Cap d'Antibes et \u00e0 Juan-les-Pins. d\u00eeners en villa entre Nice et Cannes. Formulaire, DM Instagram @tabledadrian, ou adrian@tabledadrian.com.",
    lede: "Un chef priv\u00e9 et chef \u00e0 domicile \u00e0 Antibes pour les maisons du Cap d'Antibes et les soir\u00e9es \u00e0 Juan-les-Pins, sur le trait de c\u00f4te qui s\u00e9pare le bruit de Cannes et la ville qui travaille, Nice.",
    body: [
      "Antibes est une ville-presqu'\u00eele, pas une sc\u00e8ne de festival. Les r\u00e9servations qui conviennent sont les villas du Cap d'Antibes, une table de jardin derri\u00e8re les remparts, ou une soir\u00e9e \u00e0 Juan-les-Pins quand les pins sont calmes et que la cuisine peut travailler sans un passage d'h\u00f4tel.",
      "Cette page n'affirme pas que Table d'Adrian est install\u00e9e \u00e0 Antibes. C'est un lieu o\u00f9 nous cuisinons : un chef priv\u00e9 pour Antibes, sur la m\u00eame c\u00f4te que les pages Nice et Cannes. Le port Vauban et le cap sont de la g\u00e9ographie, pas une liste de clients.",
      "Adrian est de formation suisse (EHL), avec 10+ ans et un Nutrition certificate, Stanford. Les menus sont m\u00e9diterran\u00e9ennes et de saison, \u00e9crits pour la table. Les honoraires sont sur demande, en \u20ac.",
      "Depuis Antibes, Cannes est la baie suivante vers l'ouest et Nice est \u00e0 quelques minutes vers l'est. Une semaine sur le cap peut inclure un d\u00eener dans l'une ou l'autre ville. \u00c9crivez via le formulaire, en DM Instagram @tabledadrian, ou \u00e0 adrian@tabledadrian.com.",
    ],
    nearbyTitle: "O\u00f9 nous cuisinons pr\u00e8s d'Antibes",
    nearby: ["Antibes", "Cap d'Antibes", "Juan-les-Pins", "Cannes", "Nice", "Mougins"],
    nearbyNote: "Antibes est la r\u00e9servation. Le Cap d'Antibes et Juan-les-Pins sont les deux visages de la m\u00eame commune ; Cannes et Nice sont les villes voisines.",
    imageSrc: "/gallery/duck-breast.jpeg",
    imageAlt: "Magret de canard et shimeji sur une table \u00e0 Antibes, chef priv\u00e9 Table d'Adrian.",
    showFaq: true,
  },
  {
    id: "saint-tropez",
    locale: "en",
    slug: "saint-tropez",
    path: "/private-chef-saint-tropez",
    pairPath: "/fr/chef-prive-saint-tropez",
    name: "Saint-Tropez",
    h1: "Private chef Saint-Tropez",
    title: "Private Chef Saint-Tropez",
    description: "Private chef in Saint-Tropez and St Tropez, including Ramatuelle. Summer villa weeks on the peninsula. Enquire via the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com.",
    lede: "A private chef in Saint-Tropez, also searched as St Tropez, for summer villa weeks on the peninsula and dinners in Ramatuelle when the village itself is too tight for a kitchen.",
    body: [
      "Saint-Tropez is a peninsula, not a day trip from Nice. A private chef for St Tropez is usually a villa week: Pampelonne behind the pines, a house above the port, or a quieter table in Ramatuelle, which people search on its own as chef a domicile Ramatuelle.",
      "Summer fills the gulf. Those weeks are taken on request; write early. Out of season the same kitchens still work, with a shorter guest list and a market that is local rather than performed. The drive from the eastern C\u00f4te d'Azur is part of the booking, not an afterthought.",
      "Adrian is Swiss-trained (EHL), with 10+ years and a Nutrition certificate, Stanford. Longevity cuisine on this coast still means seasonal Mediterranean cooking with fine-dining precision. Fees are on request, quoted in \u20ac.",
      "The gulf faces the Maures, not Monaco. Nearby names that belong on this page are Ramatuelle and the peninsula villages, not \u00c8ze or Saint-Jean-Cap-Ferrat. Write through the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com.",
    ],
    nearbyTitle: "Where we cook near Saint-Tropez",
    nearby: ["Saint-Tropez", "St Tropez", "Ramatuelle", "Pampelonne", "Gassin", "Ramatuelle countryside"],
    nearbyNote: "Saint-Tropez and St Tropez are the same town. Ramatuelle is the neighbouring commune people search when the villa sits outside the village.",
    imageSrc: "/gallery/honeycomb-dessert.jpeg",
    imageAlt: "Honeycomb dessert over cream on a Saint-Tropez table, Table d'Adrian private chef.",
    showFaq: true,
  },
  {
    id: "saint-tropez",
    locale: "fr",
    slug: "saint-tropez",
    path: "/fr/chef-prive-saint-tropez",
    pairPath: "/private-chef-saint-tropez",
    name: "Saint-Tropez",
    h1: "Chef priv\u00e9 Saint-Tropez",
    title: "Chef priv\u00e9 Saint-Tropez",
    description: "Chef priv\u00e9 et chef \u00e0 domicile \u00e0 Saint-Tropez et St Tropez, y compris Ramatuelle. Semaines en villa sur la presqu'\u00eele. Formulaire, DM Instagram @tabledadrian, ou adrian@tabledadrian.com.",
    lede: "Un chef priv\u00e9 et chef \u00e0 domicile \u00e0 Saint-Tropez, aussi cherch\u00e9 comme St Tropez, pour les semaines d'\u00e9t\u00e9 en villa sur la presqu'\u00eele et les d\u00eeners \u00e0 Ramatuelle lorsque le village est trop \u00e9troit pour une cuisine.",
    body: [
      "Saint-Tropez est une presqu'\u00eele, pas une excursion depuis Nice. Un chef priv\u00e9 pour St Tropez est le plus souvent une semaine en villa : Pampelonne derri\u00e8re les pins, une maison au-dessus du port, ou une table plus calme \u00e0 Ramatuelle, que l'on cherche aussi comme chef \u00e0 domicile Ramatuelle.",
      "L'\u00e9t\u00e9 remplit le golfe. Ces semaines se prennent sur demande ; \u00e9crivez t\u00f4t. Hors saison, les m\u00eames cuisines tiennent, avec une liste plus courte et un march\u00e9 local plut\u00f4t que mis en sc\u00e8ne. La route depuis l'est de la C\u00f4te d'Azur fait partie de la r\u00e9servation, ce n'est pas un d\u00e9tail.",
      "Adrian est de formation suisse (EHL), avec 10+ ans et un Nutrition certificate, Stanford. La cuisine long\u00e9vit\u00e9 sur cette c\u00f4te d\u00e9signe encore une cuisine m\u00e9diterran\u00e9enne de saison, tenue \u00e0 la pr\u00e9cision gastronomique. Les honoraires sont sur demande, en \u20ac.",
      "Le golfe fait face aux Maures, pas \u00e0 Monaco. Les noms qui appartiennent \u00e0 cette page sont Ramatuelle et les villages de la presqu'\u00eele, pas \u00c8ze ni Saint-Jean-Cap-Ferrat. \u00c9crivez via le formulaire, en DM Instagram @tabledadrian, ou \u00e0 adrian@tabledadrian.com.",
    ],
    nearbyTitle: "O\u00f9 nous cuisinons pr\u00e8s de Saint-Tropez",
    nearby: ["Saint-Tropez", "St Tropez", "Ramatuelle", "Pampelonne", "Gassin", "Campagne de Ramatuelle"],
    nearbyNote: "Saint-Tropez et St Tropez sont la m\u00eame ville. Ramatuelle est la commune voisine que l'on cherche lorsque la villa est hors du village.",
    imageSrc: "/gallery/honeycomb-dessert.jpeg",
    imageAlt: "Dessert alv\u00e9ol\u00e9 sur cr\u00e8me, table \u00e0 Saint-Tropez, chef priv\u00e9 Table d'Adrian.",
    showFaq: true,
  },
]

export const EN_PLACE_SLUGS = ['cote-d-azur', 'monaco', 'nice', 'cannes', 'antibes', 'saint-tropez'] as const
export const FR_PLACE_SLUGS = EN_PLACE_SLUGS

const SLUG_TO_ID: Record<string, LocationId> = {
  'cote-d-azur': 'hub',
  monaco: 'monaco',
  nice: 'nice',
  cannes: 'cannes',
  antibes: 'antibes',
  'saint-tropez': 'saint-tropez',
}

export function locationIdFromSlug(slug: string): LocationId | undefined {
  return SLUG_TO_ID[slug]
}

export function getLocation(id: LocationId, locale: Locale): LocationRecord {
  const found = LOCATIONS.find((item) => item.id === id && item.locale === locale)
  if (!found) throw new Error(`Missing location ${id}/${locale}`)
  return found
}

export function locationNav(locale: Locale) {
  return LOCATIONS.filter((item) => item.locale === locale).map((item) => ({
    id: item.id,
    name: item.name,
    path: item.path,
  }))
}

export function siblingLocations(id: LocationId, locale: Locale) {
  return locationNav(locale).filter((item) => item.id !== id)
}

export function locationFaq(record: LocationRecord): FaqItem[] {
  if (!record.showFaq) return []
  if (record.id === 'hub') return FAQ[record.locale]
  return townFaq(record.id, record.locale)
}
