import { STANFORD_CREDENTIAL, credentials } from '@/lib/credentials'

export type Locale = 'en' | 'fr'

export const ON_REQUEST = {
  en: 'On request',
  fr: 'Sur demande',
} as const

export const MARKET = {
  en: "Côte d'Azur & Monaco",
  fr: "Côte d'Azur et Monaco",
} as const

export const copy = {
  en: {
    heroLede:
      "Private chef and longevity cuisine on the Côte d'Azur and in Monaco. Swiss-trained technique and nutrition science, brought into your home. From an intimate dinner for two to a table of twenty-five, every menu is written for the people eating it.",
    aboutTitleBefore: 'Two disciplines, ',
    aboutTitleEm: 'one',
    aboutTitleAfter: ' table.',
    aboutSecond:
      'Whether it is a celebration for twenty or a week of quiet dinners for two, each menu is written from scratch around your preferences, allergies and the season’s market.',
    marquee: [
      'Swiss-trained technique',
      credentials.en.ehl,
      credentials.en.stanford,
      credentials.en.years,
      MARKET.en,
      'Tables of two to twenty-five',
    ],
    pricingTitle: 'Menus on request',
    pricingDescription:
      "Private chef dinners, weekly meals and celebrations on the Côte d'Azur and in Monaco. Fees are on request, quoted in €.",
    pricingMeta:
      "Private chef menus on the Côte d'Azur and in Monaco. Fees on request, quoted in €.",
    navPricing: 'Enquire',
    contactEyebrow: 'Enquire',
    contactTitle: 'Tell us about the table',
    contactDescription:
      'Write through the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com. Occasion, guests, dietary notes, a date if you have one.',
    contactMeta:
      'Enquire for a private dinner, weekly meals or a celebration on the Côte d’Azur and in Monaco. Form, Instagram DM @tabledadrian, or adrian@tabledadrian.com.',
    bookCta: 'Book your experience',
    quoteNote: 'Fees are on request, quoted in €.',
    instagramLabel: 'Instagram DM',
    instagramHandle: '@tabledadrian',
    footerBlurb: `Swiss-trained (EHL) private chef, ${STANFORD_CREDENTIAL}. Private dinners, weekly meal preparation and longevity menus on the Côte d'Azur and in Monaco.`,
    bookingIntro: 'Book by enquiry form, Instagram DM or email.',
    perEvent: 'Per event',
    monthly: 'Monthly',
  },
  fr: {
    heroLede:
      "Chef privé et cuisine longévité sur la Côte d'Azur et à Monaco. Une technique de haute gastronomie et la science de la nutrition, à domicile. D'un dîner à deux à une table de vingt-cinq, chaque menu s'écrit pour ceux qui le goûtent.",
    aboutTitleBefore: 'Deux disciplines, ',
    aboutTitleEm: 'une',
    aboutTitleAfter: ' table.',
    aboutSecond:
      "Qu'il s'agisse d'une fête pour vingt ou d'une semaine de dîners à deux, chaque menu s'écrit autour de vos goûts, allergies et du marché de la saison.",
    marquee: [
      'Technique de haute gastronomie',
      credentials.fr.ehl,
      credentials.fr.stanford,
      credentials.fr.years,
      MARKET.fr,
      'Tables de deux à vingt-cinq',
    ],
    pricingTitle: 'Menus sur demande',
    pricingDescription:
      "Dîners privés, semaines en cuisine et célébrations sur la Côte d'Azur et à Monaco. Les honoraires sont sur demande, en €.",
    pricingMeta:
      "Menus de chef privé sur la Côte d'Azur et à Monaco. Honoraires sur demande, en €.",
    navPricing: 'Tarifs sur demande',
    contactEyebrow: 'Demande',
    contactTitle: 'Parlez-nous de la table',
    contactDescription:
      "Écrivez via le formulaire, en DM Instagram @tabledadrian, ou à adrian@tabledadrian.com. Occasion, convives, notes diététiques, une date si vous en avez une.",
    contactMeta:
      "Demande pour un dîner privé, une semaine en cuisine ou une célébration sur la Côte d'Azur et à Monaco. Formulaire, DM Instagram @tabledadrian, ou adrian@tabledadrian.com.",
    bookCta: 'Réserver',
    quoteNote: 'Les honoraires sont sur demande, en €.',
    instagramLabel: 'DM Instagram',
    instagramHandle: '@tabledadrian',
    footerBlurb: `Chef privé de haute gastronomie, formation suisse (EHL), ${STANFORD_CREDENTIAL}. Dîners privés, semaine en cuisine et menus longévité sur la Côte d'Azur et à Monaco.`,
    bookingIntro: 'Réservation par formulaire, DM Instagram ou e-mail.',
    perEvent: 'Par événement',
    monthly: 'Mensuel',
  },
} as const
