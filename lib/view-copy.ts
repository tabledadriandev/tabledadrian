// Shared copy and data accessors for the page views, so each design only changes markup.
import { articles } from '@/data/articles'
import { journal } from '@/data/library/journal'
import { libraryRecipePath, libraryRecipes } from '@/lib/library'
import { DISCLAIMER, OFFER_BOOKS, OFFER_PLANS, PLAN_CREDENTIAL, BOOK_CREDIT, COMING_SOON, planPath, plansPath, type OfferPlan } from '@/lib/offer-copy'
import { PLAN_SLOTS, PRODUCTS_LIVE, RECIPE_BOOK_SLOTS, GIFT_CARDS, PARTNER_STATS } from '@/lib/monetisation'

export type Locale = 'en' | 'fr'
export { DISCLAIMER, PLAN_CREDENTIAL, COMING_SOON, PRODUCTS_LIVE, GIFT_CARDS, PARTNER_STATS, plansPath }

export const GIFT_COPY = {
  en: {
    eyebrow: 'Gift',
    h1: 'A private dinner, given',
    lede: 'A voucher for a table cooked in someone’s kitchen on the Côte d’Azur or in Monaco. The date and the menu are agreed afterwards.',
    points: [
      'The gift is the dinner. The menu is written for the people who will sit down.',
      'Dietary preferences and allergies are accommodated on request.',
      'Three gift cards: €150, €300, and €500. The date and the menu are agreed afterwards.',
    ],
    enquire: 'Enquire about a gift',
    enquireHref: '/contact?intent=gift',
    stripeKicker: 'Placeholder · not connected',
    stripeTitle: 'Stripe Payment Link',
    stripeBody:
      'Adrian pastes the Payment Link from his Stripe account here. This control does not take a card, and no Stripe account is connected.',
    stripeLabel: 'Payment link placeholder',
    stripeHint: 'Replace this with the live Payment Link:',
  },
  fr: {
    eyebrow: 'Cadeau',
    h1: 'Un dîner privé, offert',
    lede: 'Un bon pour une table cuisinée dans une cuisine de la Côte d’Azur ou de Monaco. La date et le menu se décident ensuite.',
    points: [
      'Le cadeau est le dîner. Le menu s’écrit pour ceux qui s’assoient.',
      'Les préférences alimentaires et les allergies sont prises en compte sur demande.',
      'Trois bons : 150 €, 300 € et 500 €. La date et le menu se décident ensuite.',
    ],
    enquire: 'Demander un cadeau',
    enquireHref: '/fr/contact?intent=gift',
    stripeKicker: 'Placeholder · non connecté',
    stripeTitle: 'Lien de paiement Stripe',
    stripeBody:
      'Adrian colle ici le Payment Link de son compte Stripe. Ce bouton ne prend aucune carte, et aucun compte Stripe n’est connecté.',
    stripeLabel: 'Placeholder du lien de paiement',
    stripeHint: 'À remplacer par le lien actif :',
  },
} as const

export const PARTNERS_COPY = {
  en: {
    kicker: 'Partners',
    h1: 'A media kit',
    lede: 'Table d’Adrian cooks in private kitchens on the Côte d’Azur and in Monaco, and publishes the journal and the recipe library.',
    who: 'Adrian Stefan. Swiss-trained (EHL). 10+ years. Nutrition certificate, Stanford.',
    audienceTitle: 'Audience',
    audience:
      'People who read the journal and the recipes, and hosts who book a private chef between Monaco and Saint-Tropez. Figures are not published here.',
    optionsTitle: 'Ways to work together',
    options: [
      { title: 'Affiliate', text: 'A tracked link on a relevant page, once Adrian’s affiliate ID exists. The kitchen page already marks those slots.' },
      { title: 'Sponsored recipe', text: 'A recipe in the library or the journal, credited, with the product in the method only if it belongs there.' },
      { title: 'Product at the table', text: 'A bottle, a tool, or a pantry item featured at a private dinner, agreed in the quote.' },
      { title: 'Event sponsorship', text: 'A name beside a wedding weekend or a corporate dinner. The menu stays Adrian’s.' },
    ],
    contact: 'Write to the kitchen',
  },
  fr: {
    kicker: 'Partenaires',
    h1: 'Dossier presse',
    lede: 'Table d’Adrian cuisine dans des cuisines privées sur la Côte d’Azur et à Monaco, et publie le journal et la bibliothèque de recettes.',
    who: 'Adrian Stefan. Formation suisse (EHL). 10+ ans. Nutrition certificate, Stanford.',
    audienceTitle: 'Public',
    audience:
      'Les lecteurs du journal et des recettes, et les hôtes qui réservent un chef privé entre Monaco et Saint-Tropez. Les chiffres ne sont pas publiés ici.',
    optionsTitle: 'Façons de travailler ensemble',
    options: [
      { title: 'Affiliation', text: 'Un lien suivi sur une page pertinente, une fois l’identifiant affilié d’Adrian en place. La page cuisine marque déjà ces emplacements.' },
      { title: 'Recette sponsorisée', text: 'Une recette dans la bibliothèque ou le journal, créditée, avec le produit dans la méthode seulement s’il y a sa place.' },
      { title: 'Produit à table', text: 'Une bouteille, un outil, ou un produit du garde-manger à un dîner privé, accordé dans le devis.' },
      { title: 'Parrainage d’événement', text: 'Un nom à côté d’un week-end de mariage ou d’un dîner d’entreprise. Le menu reste celui d’Adrian.' },
    ],
    contact: 'Écrire à la cuisine',
  },
} as const

export function recipeItems(locale: Locale) {
  return libraryRecipes.map((r) => ({
    slug: r.slug,
    href: libraryRecipePath(r, locale),
    name: locale === 'fr' ? r.titleFr : r.title,
    alt: (locale === 'fr' ? r.image.altFr : r.image.alt) || (locale === 'fr' ? r.titleFr : r.title),
    src: r.image.src,
    cuisine: r.cuisine,
    full: r.free ? (locale === 'fr' ? 'Recette entière' : 'Full recipe') : null,
  }))
}

export const RECIPES_COPY = {
  en: { title: 'Recipes', lede: "Dishes by Adrian Stefan, Table d'Adrian. Five recipes are complete. The others keep the ingredients on the page; the method is in Sola." },
  fr: { title: 'Recettes', lede: "Les plats d'Adrian Stefan, Table d'Adrian. Cinq recettes sont entières. Les autres montrent les ingrédients ; la méthode est dans Sola." },
} as const

export const JOURNAL_COPY = {
  en: { title: 'Journal', lede: 'Notes on private dinners, the Côte d’Azur season, and how the cooking is done.' },
  fr: { title: 'Journal', lede: 'Notes sur les dîners privés, la saison sur la Côte d’Azur, et la façon de cuisiner.' },
} as const

export function journalItems(locale: Locale) {
  const posts = journal.map((p) => ({
    key: p.slug,
    href: locale === 'fr' ? `/fr/articles/${p.slugFr}` : `/articles/${p.slug}`,
    title: locale === 'fr' ? p.titleFr : p.title,
    excerpt: locale === 'fr' ? p.excerptFr : p.excerpt,
    image: p.image,
    alt: locale === 'fr' ? p.imageAltFr : p.imageAlt,
  }))
  const extra = locale === 'en'
    ? articles.map((a) => ({ key: a.slug, href: `/articles/${a.slug}`, title: a.title, excerpt: a.excerpt, image: a.image, alt: a.title }))
    : []
  return [...posts, ...extra]
}

export const PLANS_COPY = {
  en: { kicker: 'Plans', h1: 'Menu plans', lede: 'Eating and lifestyle guides. Steady Energy Menu, Hormone-Aware Kitchen, Heart-Smart Riviera Table, the gut, and training days. These pages are not prescriptions.' },
  fr: { kicker: 'Programmes', h1: 'Programmes d’assiette', lede: 'Des guides d’assiette et de mode de vie. Menu Énergie Stable, Cuisine Attentive aux Hormones, Table Riviera Cœur Léger, intestin et jours d’entraînement.' },
} as const

export function planList(locale: Locale) {
  return OFFER_PLANS.map((plan) => ({ plan, id: plan.id, href: planPath(plan, locale), title: locale === 'fr' ? plan.titleFr : plan.title, lede: locale === 'fr' ? plan.ledeFr : plan.lede }))
}

export function planDetail(plan: OfferPlan, locale: Locale) {
  const fr = locale === 'fr'
  const slot = PLAN_SLOTS[plan.id]
  return {
    title: fr ? plan.titleFr : plan.title,
    lede: fr ? plan.ledeFr : plan.lede,
    more: fr ? plan.moreFr : plan.more,
    limit: fr ? plan.limitFr : plan.limit,
    habits: fr ? plan.habitsFr : plan.habits,
    note: fr ? plan.noteFr : plan.note,
    meals: plan.meals
      .map((m) => {
        const r = libraryRecipes.find((x) => x.slug === m.slug)
        return r ? { key: m.slug + m.slot, slot: fr ? m.slotFr : m.slot, name: fr ? r.titleFr : r.title, href: libraryRecipePath(r, locale), src: r.image.src } : null
      })
      .filter((x): x is NonNullable<typeof x> => Boolean(x)),
    price: slot ? (fr ? slot.priceFr : slot.priceEn) : null,
    stripe: PRODUCTS_LIVE && slot?.stripe ? slot.stripe : null,
    labels: {
      more: fr ? 'À manger plus souvent' : 'What to eat more of',
      limit: fr ? 'À limiter' : 'What to limit',
      day: fr ? 'Une journée de repas' : 'A sample day',
      habits: fr ? 'Entraînement et journée' : 'Training and lifestyle',
      back: fr ? 'Tous les programmes' : 'All plans',
      buy: fr ? 'Acheter le programme' : 'Buy the plan',
      soon: fr ? 'Bientôt' : 'Coming soon',
      sola: fr ? 'Utiliser Sola' : 'Use Sola',
      solaNote: fr
        ? 'Sola est l’application bien-être de Table d’Adrian. Elle compose un programme personnel dans le même esprit que ce guide.'
        : 'Sola is the Table d’Adrian wellness app. It builds a personal plan in the same spirit as this guide.',
    },
  }
}

export const BOOKS_COPY = {
  en: { kicker: 'Books', h1: 'Recipe books', lede: 'Four digital books drawn from Adrian’s recipe library. Summer on the Riviera, Christmas, a market week, and a dinner for guests.', buy: 'Buy the book' },
  fr: { kicker: 'Livres', h1: 'Livres de recettes', lede: 'Quatre livres numériques tirés de la bibliothèque de recettes d’Adrian. Été, Noël, semaine de marché, et dîner d’amis.', buy: 'Acheter le livre' },
} as const

export function bookList(locale: Locale) {
  const fr = locale === 'fr'
  return OFFER_BOOKS.map((book) => {
    const slot = RECIPE_BOOK_SLOTS[book.id]
    const recipes = book.recipes
      .map((slug) => libraryRecipes.find((r) => r.slug === slug))
      .filter((r): r is NonNullable<typeof r> => Boolean(r))
      .map((r) => ({ slug: r.slug, name: fr ? r.titleFr : r.title, href: libraryRecipePath(r, locale), src: r.image.src }))
    return {
      id: book.id,
      title: fr ? book.titleFr : book.title,
      intro: fr ? book.ledeFr : book.lede,
      price: fr ? slot.priceFr : slot.priceEn,
      stripe: PRODUCTS_LIVE && slot.stripe ? slot.stripe : null,
      recipes,
    }
  })
}
export const bookCredit = (l: Locale) => BOOK_CREDIT[l]
