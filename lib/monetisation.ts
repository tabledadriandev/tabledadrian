/**
 * Monetisation placeholders.
 * Nothing here charges a card or joins an affiliate programme.
 * Adrian replaces the nulls when his own accounts exist.
 */

/** Stripe Payment Link for gift vouchers. Leave null until Adrian's Stripe account is connected. */
export const STRIPE_GIFT_PAYMENT_LINK: string | null = null

export const STRIPE_GIFT_PLACEHOLDER_URL = 'https://buy.stripe.com/REPLACE_WITH_ADRIAN_PAYMENT_LINK'

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
      "Give a private dinner on the Côte d'Azur or in Monaco. The menu is agreed after the gift. Enquire by form. The Stripe link is a placeholder.",
  },
  fr: {
    title: "Offrir un dîner privé, Côte d'Azur | Table d'Adrian",
    description:
      'Offrez un dîner privé sur la Côte d’Azur ou à Monaco. Le menu se décide après le cadeau. Demandez par le formulaire. Le lien Stripe est un placeholder.',
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

/** A price Adrian types himself, and his Stripe Payment Link. Both stay null until his accounts exist. */
export type PriceSlot = {
  price: string | null
  stripe: string | null
}

/** Digital recipe books. Leave price and stripe null to show Coming soon. Do not invent a number. */
export const RECIPE_BOOK_SLOTS: Record<string, PriceSlot> = {
  'riviera-summer': { price: null, stripe: null },
  'christmas-dinner': { price: null, stripe: null },
  'market-week': { price: null, stripe: null },
  'dinner-party-playbook': { price: null, stripe: null },
}

/** Menu plans. Leave price and stripe null. The Buy button stays a placeholder and shows no price. */
export const PLAN_SLOTS: Record<string, PriceSlot> = {
  'blood-sugar': { price: null, stripe: null },
  hormones: { price: null, stripe: null },
  heart: { price: null, stripe: null },
  gut: { price: null, stripe: null },
  training: { price: null, stripe: null },
}

/**
 * Audience figures for the media kit.
 * Leave this empty. The partners page hides the block when there is no value.
 * Do not invent followers, reach, or rates.
 */
export const PARTNER_STATS: { id: string; label: string; labelFr: string; value: string }[] = []
