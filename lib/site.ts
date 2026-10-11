export const SITE_URL = 'https://www.tabledadrian.com'
export const SITE_NAME = "Table d'Adrian"
export const SITE_DESCRIPTION =
  "Private chef and longevity cuisine on the Côte d'Azur and in Monaco. Table d'Adrian brings Michelin-trained cooking and a Nutrition certificate, Stanford, to your table."

export const THEME_COLOR = '#2F3529'

export const OG_IMAGE_EN = {
  url: '/og_tabledadrian_en.jpg',
  width: 1200,
  height: 630,
  alt: "Table d'Adrian lemon logo. Private chef, Côte d'Azur & Monaco.",
}

export const OG_IMAGE_FR = {
  url: '/og_tabledadrian_fr.jpg',
  width: 1200,
  height: 630,
  alt: "Logo citron de Table d'Adrian. Chef privé, Côte d'Azur & Monaco.",
}

/** Default share card (English). */
export const OG_IMAGE = OG_IMAGE_EN

export const OG_EN = {
  title: "Table d'Adrian · Private chef, Côte d'Azur & Monaco",
  description:
    'Longevity cuisine, cooked with fine-dining precision. At your villa, on your yacht, for your private events.',
  locale: 'en_GB' as const,
}

export const OG_FR = {
  title: "Table d'Adrian · Chef privé, Côte d'Azur & Monaco",
  description:
    'La cuisine de longévité, avec la précision de la haute gastronomie. Dans votre villa, à bord de votre yacht, pour vos événements privés.',
  locale: 'fr_FR' as const,
}

export function ogImageForLocale(locale: 'en' | 'fr') {
  return locale === 'fr' ? OG_IMAGE_FR : OG_IMAGE_EN
}
