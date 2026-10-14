/**
 * Monetisation.
 * Gift cards use live Stripe Payment Links.
 * Recipe books and menu plans store a price and a Payment Link, but stay
 * off sale while PRODUCTS_LIVE is false (the PDFs are not ready).
 * Affiliate hrefs stay null until Adrian adds programme IDs.
 */

/** Flip to true when the recipe-book and plan PDFs exist. Buy buttons stay "Coming soon" until then. */
export const PRODUCTS_LIVE = false

export const GIFT_CARDS = [
  { id: '150', eur: 150, labelEn: '€150', labelFr: '150 €', stripe: 'https://buy.stripe.com/eVq8wP1p9bnkavWchRbV609' },
  { id: '300', eur: 300, labelEn: '€300', labelFr: '300 €', stripe: 'https://buy.stripe.com/9B6cN50l5gHEdI8a9JbV60a' },
  { id: '500', eur: 500, labelEn: '€500', labelFr: '500 €', stripe: 'https://buy.stripe.com/aFaaEX4Bl630fQg81BbV60b' },
] as const

export type AffiliatePiece = {
  id: string
  name: string
  nameFr: string
  note: string
  noteFr: string
  /** Full programme URL, including Adrian's affiliate ID. Null until that ID exists. */
  href: string | null
}

export const KITCHEN_LINKS: AffiliatePiece[] = [
  {
    id: 'chefs-knife',
    name: "Chef's knife",
    nameFr: 'Couteau de chef',
    note: 'A 20 cm knife that takes an edge and stays comfortable through a service.',
    noteFr: 'Un couteau de 20 cm qui prend le fil et reste en main pendant un service.',
    href: null,
  },
  {
    id: 'paring-knife',
    name: 'Paring knife',
    nameFr: 'Couteau d’office',
    note: 'A short knife for fruit, shallots, and the last trim on the board.',
    noteFr: 'Un couteau court pour le fruit, l’échalote, et la dernière coupe sur la planche.',
    href: null,
  },
  {
    id: 'frying-pan',
    name: 'Carbon-steel pan',
    nameFr: 'Poêle en acier',
    note: 'A frying pan that can leave the flame and go straight to the table.',
    noteFr: 'Une poêle qui quitte le feu et passe à table.',
    href: null,
  },
  {
    id: 'saucepan',
    name: 'Heavy saucepan',
    nameFr: 'Casserole lourde',
    note: 'A thick base for a reduction, a custard, or a small pot of rice.',
    noteFr: 'Un fond épais pour une réduction, une crème, ou un petit riz.',
    href: null,
  },
  {
    id: 'sheet-pan',
    name: 'Sheet pan',
    nameFr: 'Plaque de four',
    note: 'A rimmed tray for roasting, and for catching a glaze.',
    noteFr: 'Une plaque à rebord pour rôtir, et pour retenir un glaçage.',
    href: null,
  },
  {
    id: 'olive-oil',
    name: 'Finishing olive oil',
    nameFr: 'Huile d’olive de finition',
    note: 'An oil bought for flavour, poured at the table.',
    noteFr: 'Une huile choisie pour le goût, versée à table.',
    href: null,
  },
  {
    id: 'salt',
    name: 'Flaky salt',
    nameFr: 'Sel en flocons',
    note: 'Salt for the plate, kept apart from the salt in the stock.',
    noteFr: 'Le sel de l’assiette, à part du sel du fond.',
    href: null,
  },
  {
    id: 'pepper',
    name: 'Whole pepper',
    nameFr: 'Poivre en grains',
    note: 'Peppercorns, ground when the dish asks for them.',
    noteFr: 'Des grains, moulus quand le plat le demande.',
    href: null,
  },
  {
    id: 'vinegar',
    name: 'Wine vinegar',
    nameFr: 'Vinaigre de vin',
    note: 'A sharp vinegar for a dressing, nothing sweeter.',
    noteFr: 'Un vinaigre net pour une vinaigrette, sans sucre ajouté.',
    href: null,
  },
]

export function offerNavLabel(href: string, fallback: string, locale: 'en' | 'fr') {
  if (locale !== 'fr') return fallback
  if (href === '/gift') return 'Cadeau'
  if (href === '/masterclass') return 'Cours'
  if (href === '/chefs-kitchen') return 'Cuisine'
  if (href === '/shop/recipe-books') return 'Livres'
  if (href === '/plans') return 'Programmes'
  if (href === '/partners') return 'Partenaires'
  return fallback
}

export const GIFT_META = {
  en: {
    title: "Gift a private dinner, Côte d'Azur | Table d'Adrian",
    description:
      "Give a private dinner on the Côte d'Azur or in Monaco. Gift cards are €150, €300, or €500. The menu is agreed after the gift.",
  },
  fr: {
    title: "Offrir un dîner privé, Côte d'Azur | Table d'Adrian",
    description:
      'Offrez un dîner privé sur la Côte d’Azur ou à Monaco. Le menu se décide après le cadeau. Bons cadeaux à 150 €, 300 € ou 500 €. Le menu se décide ensuite.',
  },
} as const

export const MASTERCLASS_META = {
  en: {
    title: "Cooking class and chef's table, Azur | Table d'Adrian",
    description:
      "An at-home cooking class or a small-group tasting evening on the Côte d'Azur and in Monaco. Enquire for a date. Fees are quoted on request, in €.",
  },
  fr: {
    title: "Cours à domicile et table du chef | Table d'Adrian",
    description:
      'Un cours de cuisine à domicile ou une dégustation en petit groupe, sur la Côte d’Azur et à Monaco. Demandez une date. Honoraires sur devis, en €.',
  },
} as const

export const KITCHEN_META = {
  en: {
    title: "Knives, pans and the pantry, Riviera | Table d'Adrian",
    description:
      'Knives, pans and pantry pieces Adrian reaches for. Affiliate links are placeholders and are not live. No prices and no reviews on this page.',
  },
  fr: {
    title: "Couteaux et poêles du chef, Riviera | Table d'Adrian",
    description:
      'Couteaux, poêles et garde-manger qu’Adrian utilise. Les liens affiliés sont des placeholders, pas encore actifs. Aucun prix, aucun avis.',
  },
} as const

/** Display price plus the stored Stripe Payment Link. The link is used only when PRODUCTS_LIVE is true. */
export type PriceSlot = {
  priceEn: string
  priceFr: string
  stripe: string
}

export const BOOK_PRICE = { en: '€14.90', fr: '€14,90' } as const
export const PLAN_PRICE = { en: '€29.90', fr: '€29,90' } as const

/** Digital recipe books. €14.90. Buy stays Coming soon until PRODUCTS_LIVE. */
export const RECIPE_BOOK_SLOTS: Record<string, PriceSlot> = {
  'riviera-summer': { priceEn: BOOK_PRICE.en, priceFr: BOOK_PRICE.fr, stripe: 'https://buy.stripe.com/6oU5kD9VF8b847yepZbV600' },
  'christmas-dinner': { priceEn: BOOK_PRICE.en, priceFr: BOOK_PRICE.fr, stripe: 'https://buy.stripe.com/9B6fZh2tdcrobA095FbV601' },
  'market-week': { priceEn: BOOK_PRICE.en, priceFr: BOOK_PRICE.fr, stripe: 'https://buy.stripe.com/eVq9ATd7RcroavWepZbV602' },
  'dinner-party-playbook': { priceEn: BOOK_PRICE.en, priceFr: BOOK_PRICE.fr, stripe: 'https://buy.stripe.com/14A28r8RB3US33udlVbV603' },
}

/** Menu plans. €29.90. Buy stays Coming soon until PRODUCTS_LIVE. */
export const PLAN_SLOTS: Record<string, PriceSlot> = {
  'blood-sugar': { priceEn: PLAN_PRICE.en, priceFr: PLAN_PRICE.fr, stripe: 'https://buy.stripe.com/fZu00jebVcroavW81BbV604' },
  hormones: { priceEn: PLAN_PRICE.en, priceFr: PLAN_PRICE.fr, stripe: 'https://buy.stripe.com/3cIeVd4BlfDAdI82HhbV605' },
  heart: { priceEn: PLAN_PRICE.en, priceFr: PLAN_PRICE.fr, stripe: 'https://buy.stripe.com/28E7sLebVdvsgUk3LlbV606' },
  gut: { priceEn: PLAN_PRICE.en, priceFr: PLAN_PRICE.fr, stripe: 'https://buy.stripe.com/9B67sLebVajg8nO4PpbV607' },
  training: { priceEn: PLAN_PRICE.en, priceFr: PLAN_PRICE.fr, stripe: 'https://buy.stripe.com/9B64gzd7R1MKeMc5TtbV608' },
}

/**
 * Audience figures for the media kit.
 * Leave this empty. The partners page hides the block when there is no value.
 * Do not invent followers, reach, or rates.
 */
export const PARTNER_STATS: { id: string; label: string; labelFr: string; value: string }[] = []
