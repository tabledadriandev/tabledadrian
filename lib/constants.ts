export const CONTACT_INFO = {
  phone: "+33 6 15 96 30 46",
  email: "adrian@tabledadrian.com",
  responseTime: "Reply within 24 hours",
}

/** Adrian's official WhatsApp link for +33 6 15 96 30 46. */
export const WHATSAPP_URL = "https://w.app/tabledadrian"

export const INSTAGRAM_URL = 'https://www.instagram.com/tabledadrian/'

/** Google review form. Opens in a new tab. No rating or review count is shown on the site. */
export const GOOGLE_REVIEW_URL = 'https://g.page/r/CcRE_phuKoMYEBM/review'

export const SOCIAL_LINKS = {
  instagram: INSTAGRAM_URL,
}

export interface NavItem {
  name: string
  href: string
  badge?: string
  description?: string
}

export interface NavGroup {
  name: string
  href?: string
  items?: NavItem[]
}

export const NAVIGATION: NavGroup[] = [
  { name: "About", href: "/#about" },
  { name: "Services", href: "/services" },
  { name: "Menus", href: "/menus" },
  { name: "Gallery", href: "/gallery" },
  { name: "Recipes", href: "/recipes" },
  { name: "Journal", href: "/articles" },
  {
    name: "Wellness",
    items: [
      {
        name: "Longevity Coach",
        href: "/nutrition",
        badge: "Demo",
        description: "Preview the nutrition dashboard from our app",
      },
      {
        name: "BMI Calculator",
        href: "/bmi",
        badge: "Demo",
        description: "A quick health snapshot with chef's guidance",
      },
    ],
  },
  { name: "Enquire", href: "/pricing" },
]

/** Flat list of primary links, used by the footer and mobile menu. */
export const FOOTER_LINKS: NavItem[] = [
  { name: "About", href: "/#about" },
  { name: "Services", href: "/services" },
  { name: "Menus", href: "/menus" },
  { name: "Gallery", href: "/gallery" },
  { name: "Recipes", href: "/recipes" },
  { name: "Journal", href: "/articles" },
  { name: "Gift", href: "/gift" },
  { name: "Classes", href: "/masterclass" },
  { name: "Kitchen", href: "/chefs-kitchen" },
  { name: "Books", href: "/shop/recipe-books" },
  { name: "Plans", href: "/plans" },
  { name: "Partners", href: "/partners" },
  { name: "Enquire", href: "/pricing" },
]

export const WELLNESS_LINKS: NavItem[] = NAVIGATION.find((g) => g.name === "Wellness")?.items ?? []

/**
 * Sola store link. The app is Apple-only (iPhone, iPad and Mac) and is not
 * live yet. Leave `appStore` null to keep the waitlist. When the app ships,
 * set `appStore` to the App Store URL and the waitlist swaps for the badge.
 */
export const APP_LINKS = {
  name: "Table d'Adrian",
  appStore: null as string | null,
  waitlist: "mailto:adrian@tabledadrian.com?subject=Sola%20waitlist",
}

export const SERVICES = [
  {
    title: "Private Dinner Parties",
    description: "Custom multi-course experiences tailored to your preferences",
    icon: "Utensils",
  },
  {
    title: "Weekly Meal Preparation",
    description: "Restaurant-quality daily dining delivered to your home",
    icon: "Calendar",
  },
  {
    title: "Corporate Events",
    description: "Executive catering excellence for business occasions",
    icon: "Briefcase",
  },
  {
    title: "Special Occasions",
    description: "Celebrations & milestones with bespoke culinary experiences",
    icon: "Sparkles",
  },
]
