import type { Locale } from '@/lib/copy'

export const DISCLAIMER = {
  en: 'Not medical advice. Talk to your doctor before changing your diet or training, especially if you have a medical condition or take medication.',
  fr: 'Ceci n’est pas un avis médical. Parlez à votre médecin avant de changer votre alimentation ou votre entraînement, surtout si vous avez une condition médicale ou si vous prenez un médicament.',
} as const

export const PLAN_CREDENTIAL = 'Nutrition certificate, Stanford'

export const BOOK_CREDIT = {
  en: "Recipes by Adrian Stefan, Table d'Adrian",
  fr: "Recettes d'Adrian Stefan, Table d'Adrian",
} as const

export const BOOK_META = {
  en: {
    title: "Recipe books from the Riviera kitchen | Table d'Adrian",
    description:
      "Digital books from Adrian's recipe library: a Riviera summer, Christmas dinner, a market week, and a dinner party. The price is not set.",
  },
  fr: {
    title: "Livres de recettes numériques, Azur | Table d'Adrian",
    description:
      "Livres numériques tirés de la bibliothèque d'Adrian : été en Riviera, Noël, semaine de marché, dîner d'amis. Le prix n'est pas fixé.",
  },
} as const

export const PLANS_META = {
  en: {
    title: "Menu plans and eating guides, Riviera | Table d'Adrian",
    description:
      'Eating guides: Steady Energy Menu, Hormone-Aware Kitchen, Heart-Smart Riviera Table, the gut, and training days. Not medical advice.',
  },
  fr: {
    title: "Programmes et guides d'assiette, Azur | Table d'Adrian",
    description:
      "Guides d'assiette : Menu Énergie Stable, Cuisine Attentive aux Hormones, Table Riviera Cœur Léger, intestin et entraînement. Pas un avis médical.",
  },
} as const

export const PARTNER_META = {
  en: {
    title: "Partnerships, Table d'Adrian media kit | Table d'Adrian",
    description:
      "A media kit for Table d'Adrian. Swiss-trained (EHL), 10+ years, Nutrition certificate, Stanford. Partnerships by email to the kitchen.",
  },
  fr: {
    title: "Partenariats, dossier Table d'Adrian | Table d'Adrian",
    description:
      "Dossier pour Table d'Adrian. Formation suisse (EHL), 10+ ans, Nutrition certificate, Stanford. Partenariats par email à la cuisine.",
  },
} as const

export type OfferBook = {
  id: string
  title: string
  titleFr: string
  lede: string
  ledeFr: string
  recipes: string[]
}

export const OFFER_BOOKS: OfferBook[] = [
  {
    id: 'riviera-summer',
    title: 'Riviera Summer',
    titleFr: 'Été en Riviera',
    lede: 'Tomatoes, fish, and a cold soup. A summer written from the market.',
    ledeFr: 'Tomates, poisson, et une soupe froide. Un été écrit depuis le marché.',
    recipes: ['gazpacho', 'salade-nicoise', 'soupe-au-pistou', 'loup-de-mer', 'ratatouille', 'tomates-farcies', 'peach-melba'],
  },
  {
    id: 'christmas-dinner',
    title: 'Christmas Dinner',
    titleFr: 'Dîner de Noël',
    lede: 'A long table in winter. Onion soup, a roast, and a last sweet course.',
    ledeFr: 'Une longue table en hiver. Soupe à l’oignon, un rôti, et un dernier sucré.',
    recipes: ['french-onion-soup', 'roast-chicken', 'tarte-tatin', 'chocolate-mousse'],
  },
  {
    id: 'market-week',
    title: 'Market Week',
    titleFr: 'Semaine de marché',
    lede: 'Seven sorts of cooking from what the stall had that morning.',
    ledeFr: 'Sept façons de cuisiner avec ce que l’étal avait le matin.',
    recipes: ['fish-soup', 'brandade', 'tian-provencal', 'artichauts-barigoule', 'vichyssoise', 'petit-sale-aux-lentilles'],
  },
  {
    id: 'dinner-party-playbook',
    title: 'Dinner Party Playbook',
    titleFr: 'Dîner d’amis',
    lede: 'A first bite, a fish, a braise, and a custard. Written for guests.',
    ledeFr: 'Une bouchée, un poisson, une braise, et une crème. Écrit pour des invités.',
    recipes: ['gougeres', 'coquilles-saint-jacques', 'sole-meuniere', 'coq-au-vin', 'creme-brulee'],
  },
]

export type PlanMeal = { slot: string; slotFr: string; slug: string }

export type OfferPlan = {
  id: string
  slug: string
  slugFr: string
  title: string
  titleFr: string
  lede: string
  ledeFr: string
  metaTitle: string
  metaTitleFr: string
  metaDescription: string
  metaDescriptionFr: string
  more: string[]
  moreFr: string[]
  limit: string[]
  limitFr: string[]
  meals: PlanMeal[]
  habits: string[]
  habitsFr: string[]
  note?: string
  noteFr?: string
}

export const OFFER_PLANS: OfferPlan[] = [
  {
    id: 'blood-sugar',
    slug: 'steady-energy-menu',
    slugFr: 'menu-energie-stable',
    title: 'Steady Energy Menu',
    titleFr: 'Menu Énergie Stable',
    lede: 'An eating and lifestyle guide for people who watch blood sugar, including people who live with diabetes. It is a way of putting a plate together.',
    ledeFr: 'Un guide d’assiette et de mode de vie pour les personnes qui surveillent leur glycémie, y compris celles qui vivent avec un diabète. C’est une façon de composer l’assiette.',
    metaTitle: "Steady Energy Menu, an eating guide | Table d'Adrian",
    metaTitleFr: "Menu Énergie Stable, guide d'assiette | Table d'Adrian",
    metaDescription:
      'Steady Energy Menu: a day of eating for people who watch blood sugar, including life with diabetes. Sample meals from the library. Ask your doctor first.',
    metaDescriptionFr:
      "Menu Énergie Stable : une journée d'assiette pour qui surveille sa glycémie, y compris avec un diabète. Recettes de la bibliothèque. Demandez au médecin.",
    more: [
      'Vegetables as the centre of the plate: a tian, a ratatouille, a pistou soup.',
      'Fish, eggs, and lentils beside the vegetables.',
      'Olive oil for the pan and for the table.',
      'Meals you sit down for, rather than a sweet drink in place of lunch.',
    ],
    moreFr: [
      'Des légumes au centre de l’assiette : un tian, une ratatouille, une soupe au pistou.',
      'Du poisson, des œufs, et des lentilles à côté des légumes.',
      'De l’huile d’olive pour la poêle et pour la table.',
      'Des repas pris assis, plutôt qu’une boisson sucrée à la place du déjeuner.',
    ],
    limit: [
      'A large glass of juice, or a soft drink, standing in for the meal.',
      'A plate that is only white bread, only potatoes, or only a sweet course.',
      'Dessert as the main event of the day.',
    ],
    limitFr: [
      'Un grand verre de jus, ou une boisson sucrée, à la place du repas.',
      'Une assiette qui n’est que du pain blanc, que des pommes de terre, ou qu’un dessert.',
      'Le dessert comme plat principal de la journée.',
    ],
    meals: [
      { slot: 'Breakfast', slotFr: 'Petit déjeuner', slug: 'french-omelette' },
      { slot: 'Lunch', slotFr: 'Déjeuner', slug: 'salade-nicoise' },
      { slot: 'Dinner', slotFr: 'Dîner', slug: 'loup-de-mer' },
      { slot: 'Another plate', slotFr: 'Une autre assiette', slug: 'soupe-au-pistou' },
    ],
    habits: [
      'A walk after you eat, when the day allows it.',
      'Sleep at a regular hour.',
      'Keep the training you already do, with a meal on either side of the session.',
      'A meter, a medication, or a target number stays with your doctor.',
    ],
    habitsFr: [
      'Une marche après le repas, quand la journée le permet.',
      'Dormir à heure régulière.',
      'Garder l’entraînement que vous avez déjà, avec un repas de chaque côté de la séance.',
      'Un lecteur, un médicament, ou un chiffre cible reste avec votre médecin.',
    ],
  },
  {
    id: 'hormones',
    slug: 'hormone-aware-kitchen',
    slugFr: 'cuisine-attentive-aux-hormones',
    title: 'Hormone-Aware Kitchen',
    titleFr: 'Cuisine Attentive aux Hormones',
    lede: 'An eating and lifestyle guide for people whose doctor has already raised hormones, including DHEA. The page is about cooking. DHEA itself stays in that medical conversation.',
    ledeFr: 'Un guide d’assiette et de mode de vie pour les personnes dont le médecin a déjà parlé d’hormones, y compris la DHEA. La page parle de cuisine. La DHEA reste dans cette conversation médicale.',
    metaTitle: "Hormone-Aware Kitchen, an eating guide | Table d'Adrian",
    metaTitleFr: "Cuisine Attentive aux Hormones, Azur | Table d'Adrian",
    metaDescription:
      'Hormone-Aware Kitchen: an eating guide when your doctor has raised hormones, including DHEA. No dose and no supplement on this page. Ask your doctor first.',
    metaDescriptionFr:
      "Cuisine Attentive aux Hormones : guide d'assiette si le médecin a parlé d'hormones, y compris la DHEA. Aucune dose. Parlez-en au médecin.",
    more: [
      'Eggs, fish, olive oil, and vegetables through the day.',
      'Lentils or another pulse at one meal.',
      'Regular meals, so the afternoon is not a long gap with nothing on the plate.',
    ],
    moreFr: [
      'Des œufs, du poisson, de l’huile d’olive, et des légumes dans la journée.',
      'Des lentilles, ou une autre légumineuse, à un repas.',
      'Des repas réguliers, pour que l’après-midi ne soit pas un long trou sans assiette.',
    ],
    limit: [
      'A day with no meal before a long afternoon, if that leaves you shaky.',
      'An evening that is only wine and a sweet course.',
      'A very strict pattern you have not agreed with your doctor.',
    ],
    limitFr: [
      'Une journée sans repas avant un long après-midi, si cela vous laisse faible.',
      'Une soirée qui n’est que du vin et un dessert.',
      'Un schéma très strict que vous n’avez pas accordé avec votre médecin.',
    ],
    meals: [
      { slot: 'Breakfast', slotFr: 'Petit déjeuner', slug: 'shakshuka' },
      { slot: 'Lunch', slotFr: 'Déjeuner', slug: 'trout-amandine' },
      { slot: 'Dinner', slotFr: 'Dîner', slug: 'petit-sale-aux-lentilles' },
      { slot: 'Another plate', slotFr: 'Une autre assiette', slug: 'salade-nicoise' },
    ],
    habits: [
      'Sleep, and morning daylight when you can get it.',
      'The training you already keep, not a new programme invented on this page.',
      'Any question about DHEA, a supplement, or a blood test belongs with your doctor. This kitchen sets no dose.',
    ],
    habitsFr: [
      'Le sommeil, et la lumière du matin quand vous pouvez la prendre.',
      'L’entraînement que vous gardez déjà, pas un nouveau programme inventé sur cette page.',
      'Toute question sur la DHEA, un complément, ou une prise de sang appartient à votre médecin. Cette cuisine ne fixe aucune dose.',
    ],
    note: 'DHEA is a hormone. This guide does not sell it, dose it, or read a lab result.',
    noteFr: 'La DHEA est une hormone. Ce guide ne la vend pas, n’en fixe pas la dose, et ne lit pas un résultat de laboratoire.',
  },
  {
    id: 'heart',
    slug: 'heart-smart-riviera-table',
    slugFr: 'table-riviera-coeur-leger',
    title: 'Heart-Smart Riviera Table',
    titleFr: 'Table Riviera Cœur Léger',
    lede: 'An eating and lifestyle guide for people who keep the heart in mind when they cook. Fish, vegetables, olive oil, and the shape of the day.',
    ledeFr: 'Un guide d’assiette et de mode de vie pour les personnes qui pensent au cœur en cuisinant. Poisson, légumes, huile d’olive, et la forme de la journée.',
    metaTitle: "Heart-Smart Riviera Table, a guide | Table d'Adrian",
    metaTitleFr: "Table Riviera Cœur Léger, un guide | Table d'Adrian",
    metaDescription:
      'Heart-Smart Riviera Table: fish, vegetables, olive oil, and a sample day of recipes. An eating guide for the table. Ask your doctor before a change.',
    metaDescriptionFr:
      "Table Riviera Cœur Léger : poisson, légumes, huile d'olive, et une journée de recettes. Un guide d'assiette. Demandez à votre médecin avant un changement.",
    more: [
      'Fish more often than a fry-up.',
      'Vegetables and olive oil at the same meal.',
      'Pulses and fruit at the table, not only as an idea.',
    ],
    moreFr: [
      'Du poisson plus souvent qu’une friture.',
      'Des légumes et de l’huile d’olive dans le même repas.',
      'Des légumes secs et des fruits à table, pas seulement en idée.',
    ],
    limit: [
      'Deep-fried plates as the habit of the week.',
      'Very salty cured meat as the whole meal.',
      'A cream sauce as the centre of every dinner.',
    ],
    limitFr: [
      'Les fritures comme habitude de la semaine.',
      'Une charcuterie très salée comme repas entier.',
      'Une sauce à la crème au centre de chaque dîner.',
    ],
    meals: [
      { slot: 'Breakfast', slotFr: 'Petit déjeuner', slug: 'french-omelette' },
      { slot: 'Lunch', slotFr: 'Déjeuner', slug: 'gazpacho' },
      { slot: 'Dinner', slotFr: 'Dîner', slug: 'trout-amandine' },
      { slot: 'Another plate', slotFr: 'Une autre assiette', slug: 'ratatouille' },
    ],
    habits: [
      'A walk on most days.',
      'Sleep at a regular hour.',
      'Any number from a clinic stays with your doctor.',
    ],
    habitsFr: [
      'Une marche la plupart des jours.',
      'Dormir à heure régulière.',
      'Tout chiffre venu d’une clinique reste avec votre médecin.',
    ],
  },
  {
    id: 'gut',
    slug: 'gut',
    slugFr: 'intestin',
    title: 'The gut, a day of eating',
    titleFr: 'L’intestin, une journée d’assiette',
    lede: 'An eating and lifestyle guide for people who pay attention to how a meal sits. Cooked vegetables, pulses, and ferments you already tolerate.',
    ledeFr: 'Un guide d’assiette et de mode de vie pour les personnes attentives à la façon dont un repas se passe. Légumes cuits, légumes secs, et ferments que vous tolérez déjà.',
    metaTitle: "The gut, an eating guide, Riviera | Table d'Adrian",
    metaTitleFr: "L'intestin, guide d'assiette, Riviera | Table d'Adrian",
    metaDescription:
      'An eating guide for people who pay attention to how a meal sits. Cooked vegetables, pulses, and a sample day from the library. Ask your doctor first.',
    metaDescriptionFr:
      "Un guide d'assiette pour qui fait attention à la façon dont un repas se passe. Légumes cuits, légumes secs, journée de recettes. Parlez-en au médecin.",
    more: [
      'Cooked vegetables: pistou, a tian, ratatouille.',
      'Pulses, as in a plate of lentils or a spoon of hummus.',
      'A ferment you already eat, such as kimchi, if it suits you.',
    ],
    moreFr: [
      'Des légumes cuits : pistou, un tian, ratatouille.',
      'Des légumes secs, comme une assiette de lentilles ou une cuillère de houmous.',
      'Un ferment que vous mangez déjà, comme le kimchi, s’il vous convient.',
    ],
    limit: [
      'A run of meals that are only fried.',
      'A very large raw salad, if that does not suit you.',
      'A new restrictive list you have not talked through with your doctor.',
    ],
    limitFr: [
      'Une suite de repas qui ne sont que frits.',
      'Une très grande salade crue, si elle ne vous convient pas.',
      'Une nouvelle liste restrictive dont vous n’avez pas parlé avec votre médecin.',
    ],
    meals: [
      { slot: 'Breakfast', slotFr: 'Petit déjeuner', slug: 'shakshuka' },
      { slot: 'Lunch', slotFr: 'Déjeuner', slug: 'hummus' },
      { slot: 'Dinner', slotFr: 'Dîner', slug: 'soupe-au-pistou' },
      { slot: 'Another plate', slotFr: 'Une autre assiette', slug: 'tian-provencal' },
    ],
    habits: [
      'Meals at roughly the same hours.',
      'A walk, and a regular night of sleep.',
      'Pain, blood, or a diagnosis stays with your doctor.',
    ],
    habitsFr: [
      'Des repas à peu près aux mêmes heures.',
      'Une marche, et une nuit de sommeil régulière.',
      'Une douleur, du sang, ou un diagnostic reste avec votre médecin.',
    ],
  },
  {
    id: 'training',
    slug: 'training',
    slugFr: 'entrainement',
    title: 'Training days',
    titleFr: 'Jours d’entraînement',
    lede: 'An eating and lifestyle guide for days when you train. A meal before the session, a meal after, and the sleep around it.',
    ledeFr: 'Un guide d’assiette et de mode de vie pour les jours où vous vous entraînez. Un repas avant la séance, un repas après, et le sommeil autour.',
    metaTitle: "Training days, an eating guide, Azur | Table d'Adrian",
    metaTitleFr: "Entraînement, guide d'assiette, Azur | Table d'Adrian",
    metaDescription:
      'An eating guide for training days: a meal before, a meal after, and recipes from the library. Sleep and the session you already keep. Ask your doctor.',
    metaDescriptionFr:
      "Un guide d'assiette pour les jours d'entraînement : un repas avant, un repas après, recettes de la bibliothèque. Sommeil et séance. Parlez-en au médecin.",
    more: [
      'A meal before you train, and a meal after.',
      'Eggs, fish, or chicken, with vegetables.',
      'Bread or potatoes on the training day, beside the rest of the plate.',
    ],
    moreFr: [
      'Un repas avant l’entraînement, et un repas après.',
      'Des œufs, du poisson, ou du poulet, avec des légumes.',
      'Du pain ou des pommes de terre le jour d’entraînement, à côté du reste de l’assiette.',
    ],
    limit: [
      'A hard session with no meal around it, if that is not your habit.',
      'Alcohol the same night as the hard session.',
      'A plan that replaces advice you already have from a doctor or a coach.',
    ],
    limitFr: [
      'Une séance dure sans repas autour, si ce n’est pas votre habitude.',
      'De l’alcool le soir même de la séance dure.',
      'Un plan qui remplace un avis que vous avez déjà d’un médecin ou d’un entraîneur.',
    ],
    meals: [
      { slot: 'Breakfast', slotFr: 'Petit déjeuner', slug: 'shakshuka' },
      { slot: 'Before or after', slotFr: 'Avant ou après', slug: 'roast-chicken' },
      { slot: 'Dinner', slotFr: 'Dîner', slug: 'salade-nicoise' },
      { slot: 'Another plate', slotFr: 'Une autre assiette', slug: 'french-omelette' },
    ],
    habits: [
      'The session you already keep.',
      'Sleep, and a walk on the easier day.',
      'Pain, a medication, or a medical limit on training stays with your doctor.',
    ],
    habitsFr: [
      'La séance que vous gardez déjà.',
      'Le sommeil, et une marche le jour plus léger.',
      'Une douleur, un médicament, ou une limite médicale à l’entraînement reste avec votre médecin.',
    ],
  },
]

export function bookPath(locale: Locale) {
  return locale === 'fr' ? '/fr/livres-de-recettes' : '/shop/recipe-books'
}

export function plansPath(locale: Locale) {
  return locale === 'fr' ? '/fr/programmes' : '/plans'
}

export function planPath(plan: OfferPlan, locale: Locale) {
  return locale === 'fr' ? `/fr/programmes/${plan.slugFr}` : `/plans/${plan.slug}`
}

export function partnersPath(locale: Locale) {
  return locale === 'fr' ? '/fr/partenaires' : '/partners'
}

export function planBySlug(slug: string, locale: Locale) {
  return OFFER_PLANS.find((plan) => (locale === 'fr' ? plan.slugFr === slug : plan.slug === slug))
}

export const COMING_SOON = { en: 'Coming soon', fr: 'Bientôt' } as const
