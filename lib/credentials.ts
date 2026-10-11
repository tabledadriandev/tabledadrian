/** Confirmed credential wording. Do not paraphrase the Stanford line. */
export const STANFORD_CREDENTIAL = 'Nutrition certificate, Stanford'

export const credentials = {
  en: {
    years: '10+ years in fine kitchens',
    yearsShort: '10+',
    yearsLabel: 'Years',
    ehl: 'EHL Swiss hospitality diploma',
    ehlShort: 'EHL',
    ehlLabel: 'Swiss-trained',
    stanford: STANFORD_CREDENTIAL,
    about:
      'Adrian trained at EHL, the Swiss hospitality school, and spent 10+ years in demanding kitchens before adding a Nutrition certificate, Stanford. That pairing is the whole idea: food with the precision of a fine-dining pass and the intent of a nutritionist.',
  },
  fr: {
    years: '10+ années en cuisine',
    yearsShort: '10+',
    yearsLabel: 'Années',
    ehl: "Diplôme d'hôtellerie EHL, Suisse",
    ehlShort: 'EHL',
    ehlLabel: 'Formation suisse',
    stanford: STANFORD_CREDENTIAL,
    about:
      "Adrian s'est formé à l'EHL, l'école suisse d'hôtellerie, et a passé 10+ ans dans des cuisines exigeantes avant d'ajouter un Nutrition certificate, Stanford. C'est tout le propos : la précision d'un passage en gastronomie, l'intention d'un nutritionniste.",
  },
} as const
