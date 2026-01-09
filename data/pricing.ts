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
      '4-course seasonal menu',
      'Market-fresh ingredients',
      'Table setting & ambiance',
      'Full kitchen cleanup',
      '2-hour dining experience',
      'Wine pairing recommendations',
    ],
    notIncluded: [
      'Sommelier service',
      'Custom menu design',
      'Post-event recipe cards',
    ],
    cta: 'Book Experience',
    urgency: null,
  },
  {
    id: 'signature',
    name: 'Signature Experience',
    tagline: 'Our most popular choice',
    guests: '7-12 guests',
    basePrice: 750,
    pricePerGuest: 55,
    popular: true,
    badge: 'MOST POPULAR',
    features: [
      '6-course tasting menu',
      'Premium organic ingredients',
      'Elegant table styling',
      'Full kitchen cleanup',
      '3-hour culinary journey',
      'Curated wine pairings included',
      'Amuse-bouche & palate cleansers',
      'Personalized menu cards',
      'Post-event digital recipe book',
    ],
    notIncluded: [
      'Live cooking demonstration',
    ],
    cta: 'Reserve Your Date',
    urgency: 'Only 3 dates available this month',
    savings: 'Best Value',
  },
  {
    id: 'luxe',
    name: 'Luxe Affair',
    tagline: 'Unparalleled culinary excellence',
    guests: '13-25 guests',
    basePrice: 1500,
    pricePerGuest: 75,
    popular: false,
    badge: 'PREMIUM',
    features: [
      '8-course grand tasting',
      'Rare & exotic ingredients',
      'Full event design & florals',
      'Complete kitchen restoration',
      '4+ hour immersive experience',
      'Premium wine & champagne service',
      'Dedicated sommelier',
      'Live cooking interaction',
      'Custom menu collaboration',
      'Luxury recipe book (physical)',
      'Priority rebooking privileges',
      'Complimentary follow-up consultation',
    ],
    notIncluded: [],
    cta: 'Request Consultation',
    urgency: 'Booking 6-8 weeks in advance',
    extras: 'White glove service',
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
    badge: 'ENTERPRISE',
    features: [
      'Unlimited course customization',
      'Full event production team',
      'Multi-chef coordination',
      'Brand integration available',
      'Dietary accommodation specialists',
      'Event photography coordination',
      'VIP concierge service',
      'Dedicated event manager',
      'Rehearsal dinner included',
      'Post-event analytics',
    ],
    notIncluded: [],
    cta: 'Get Custom Quote',
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
      '10% off additional events',
    ],
    ideal: 'Busy professionals & couples',
  },
  {
    id: 'elevated',
    name: 'Elevated',
    price: 2800,
    period: 'month',
    commitment: '6-month minimum',
    popular: true,
    includes: [
      '4 private dinners/month',
      'Up to 8 guests each',
      'Custom menu input',
      'Dedicated chef relationship',
      'Meal prep add-on available',
      '15% off additional events',
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
      'Unlimited dinners',
      'Unlimited guests',
      'Full culinary concierge',
      'Kitchen pantry stocking',
      'Holiday event priority',
      '25% off all additional services',
      'Annual culinary retreat invitation',
    ],
    ideal: 'High-net-worth households',
  },
]

export const socialProof = {
  clientsServed: '500+',
  eventsHosted: '2,000+',
  satisfactionRate: '99.7%',
  repeatClientRate: '85%',
  averageRating: 4.97,
  reviewCount: 347,
}

export const urgencyElements = {
  limitedDates: true,
  bookingWindow: '2-4 weeks',
  peakSeasonNotice: 'December & Summer dates filling fast',
  consultationSlots: 'Only 5 consultations available this week',
}

export const guarantees = [
  {
    icon: 'Shield',
    title: 'Satisfaction Promise',
    description: 'Love every bite or we make it right. Full refund if expectations aren\'t exceeded.',
  },
  {
    icon: 'Lock',
    title: 'Secure Booking',
    description: 'Only 25% deposit to reserve. Full payment 48 hours before your event.',
  },
  {
    icon: 'Calendar',
    title: 'Flexible Rescheduling',
    description: 'Life happens. Reschedule up to 7 days before at no charge.',
  },
  {
    icon: 'Heart',
    title: 'Dietary Confidence',
    description: 'Expert handling of all allergies, restrictions, and health requirements.',
  },
]

export const pricingFAQ = [
  {
    question: 'Why is a private chef experience worth the investment?',
    answer: "Unlike restaurants, you receive undivided attention, customized menus tailored to your preferences, zero travel stress, and the intimacy of dining in your own space. When you factor in premium restaurant costs, tips, transportation, and the priceless value of personalized service - the experience often costs less while delivering infinitely more.",
  },
  {
    question: 'What if someone has severe allergies?',
    answer: "I've worked with every dietary restriction imaginable - from celiac disease to complex multi-allergen situations. Every menu is crafted with complete awareness of your guests' needs, and I maintain strict cross-contamination protocols. Your safety is non-negotiable.",
  },
  {
    question: 'Is the deposit refundable?',
    answer: 'Absolutely. Cancel or reschedule up to 7 days before your event for a full refund. Within 7 days, your deposit converts to credit for a future booking - no money lost, just rescheduled joy.',
  },
  {
    question: 'Do you travel to different locations?',
    answer: 'I serve the greater London area within 30 miles. Beyond that, travel fees apply (typically £1-2 per additional mile). For destination events, custom packages are available.',
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
