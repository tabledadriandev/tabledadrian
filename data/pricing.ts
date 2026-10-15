export interface PricingTier {
  id: string
  name: string
  tagline: string
  guests: string
  basePrice: number | null
  pricePerGuest: number | null
  priceDisplay?: string
  popular: boolean
  badge?: string
  features: string[]
  notIncluded?: string[]
  cta: string
  urgency?: string | null
  savings?: string
  extras?: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  period: string
  commitment: string
  includes: string[]
  ideal: string
  popular?: boolean
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'intimate',
    name: 'Intimate Gathering',
    tagline: 'Perfect for couples & small celebrations',
    guests: '2-6 guests',
    basePrice: 350,
    pricePerGuest: 45,
    popular: false,
    features: [
      'A seasonal menu written for the guests',
      'Shopping from the morning market',
      'The table set before service',
      'The kitchen left as it was found',
      'Dietary preferences and allergies on request',
    ],
    notIncluded: [],
    cta: 'Enquire',
    urgency: null,
  },
  {
    id: 'signature',
    name: 'Signature Experience',
    tagline: 'Our most popular choice',
    guests: '7-12 guests',
    basePrice: 750,
    pricePerGuest: 55,
    popular: false,
    features: [
      'A longer menu if the evening calls for it',
      'Shopping from the morning market',
      'The table set before service',
      'The kitchen left as it was found',
      'Dietary preferences and allergies on request',
    ],
    notIncluded: [],
    cta: 'Enquire',
    urgency: null,
  },
  {
    id: 'luxe',
    name: 'Luxe Affair',
    tagline: 'Unparalleled culinary excellence',
    guests: '13-25 guests',
    basePrice: 1500,
    pricePerGuest: 75,
    popular: false,
    features: [
      'A celebration menu agreed in writing',
      'Shopping for the guest list you send',
      'The table set before service',
      'The kitchen left as it was found',
      'Dietary preferences and allergies on request',
    ],
    notIncluded: [],
    cta: 'Enquire',
    urgency: null,
  },
  {
    id: 'bespoke',
    name: 'Bespoke Events',
    tagline: 'Corporate & large celebrations',
    guests: '25+ guests',
    basePrice: null,
    pricePerGuest: null,
    priceDisplay: 'Custom Quote',
    popular: false,
    features: [
      'A menu written once the numbers are known',
      'Cooking in the house kitchen',
      'Dietary preferences and allergies on request',
      'A quote in € before the date is held',
    ],
    notIncluded: [],
    cta: 'Enquire for a tailored quote',
    urgency: null,
  },
]

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'essential',
    name: 'Essential',
    price: 1200,
    period: 'month',
    commitment: '3-month minimum',
    includes: [
      '2 private dinners/month',
      'Up to 4 guests each',
      'Seasonal menu rotation',
      'Priority scheduling',
      'Preferential rates for further events',
    ],
    ideal: 'Busy professionals & couples',
  },
  {
    id: 'elevated',
    name: 'Elevated',
    price: 2800,
    period: 'month',
    commitment: '6-month minimum',
    popular: false,
    includes: [
      '4 private dinners/month',
      'Up to 8 guests each',
      'Custom menu input',
      'Dedicated chef relationship',
      'Meal prep add-on available',
      'Preferential rates for further events',
      'Guest chef experiences quarterly',
    ],
    ideal: 'Families & entertainers',
  },
  {
    id: 'premier',
    name: 'Premier',
    price: 5500,
    period: 'month',
    commitment: 'Annual',
    includes: [
      'Dinners agreed for the season',
      'Guest numbers confirmed with each menu',
      'Shopping and cooking in the house kitchen',
      'Dietary preferences and allergies on request',
      'A quote in € before dates are held',
    ],
    ideal: 'High-net-worth households',
  },
]

export const urgencyElements = {
  limitedDates: false,
  bookingWindow: 'Enquire with the date',
  peakSeasonNotice: 'Summer and December are often busier. Enquire for a tailored quote.',
  consultationSlots: 'Enquire for a tailored quote',
}

export const guarantees = [
  {
    icon: 'Shield',
    title: 'A written quote',
    description: 'Fees are on request, quoted in €, once the date, the place and the guest list are known.',
  },
  {
    icon: 'Lock',
    title: 'The date',
    description: 'A deposit may hold a date. The terms are the ones written on the quote.',
  },
  {
    icon: 'Calendar',
    title: 'Changes',
    description: 'If a date has to move, the notice and any costs are stated on the quote.',
  },
  {
    icon: 'Heart',
    title: 'The table',
    description: 'Dietary preferences and allergies are accommodated on request.',
  },
]

export const pricingFAQ = [
  {
    question: 'Why is a private chef experience worth the investment?',
    answer: "Unlike restaurants, you receive undivided attention, customized menus tailored to your preferences, zero travel stress, and the intimacy of dining in your own space. When you factor in premium restaurant costs, tips, transportation, and the priceless value of personalized service - the experience often costs less while delivering infinitely more.",
  },
  {
    question: 'What if a guest has allergies?',
    answer: 'Dietary preferences and allergies are accommodated on request. Send them in writing before the shopping is done.',
  },
  {
    question: 'How do cancellations work?',
    answer: 'The quote states the notice. Produce already bought and time set aside may be kept from a deposit. There is no standing promise of a full refund.',
  },
  {
    question: 'Do you travel to different locations?',
    answer: 'I cook on the Côte d\'Azur and in Monaco.',
  },
  {
    question: 'What about kitchen requirements?',
    answer: 'A standard home kitchen is all I need. I bring specialized equipment, premium cookware, and all ingredients. I\'ll even leave your kitchen cleaner than I found it.',
  },
  {
    question: 'Can I customize the menu?',
    answer: 'Every menu is a collaboration. Signature and above tiers include full customization - your favorite cuisines, seasonal preferences, or recreating a memorable dish from your travels. I\'ll make it happen.',
  },
  {
    question: 'How far in advance should I book?',
    answer: '2-4 weeks minimum for standard dates. Holidays and summer weekends often book 2-3 months ahead. For large events, 6-8 weeks is recommended.',
  },
]
