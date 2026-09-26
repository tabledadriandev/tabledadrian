export const CONTACT_INFO = {
  phone: "+33 6 15 96 30 46",
  email: "adrian@tabledadrian.com",
  responseTime: "Typically responds within 24 hours",
}

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/tabledadrian",
  linkedin: "https://linkedin.com/company/tabledadrian",
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
  { name: "Services", href: "/#services" },
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
  { name: "Pricing", href: "/pricing" },
]

/** Flat list of primary links, used by the footer and mobile menu. */
export const FOOTER_LINKS: NavItem[] = [
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Menus", href: "/menus" },
  { name: "Gallery", href: "/gallery" },
  { name: "Recipes", href: "/recipes" },
  { name: "Journal", href: "/articles" },
  { name: "Pricing", href: "/pricing" },
]

export const WELLNESS_LINKS: NavItem[] = NAVIGATION.find((g) => g.name === "Wellness")?.items ?? []

/**
 * Mobile app store links. Leave as `null` until the app is published.
 * The UI will render "Coming soon" badges instead of live store buttons.
 */
export const APP_LINKS = {
  name: "Table d'Adrian",
  appStore: null as string | null,
  playStore: null as string | null,
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
