import type { Locale } from '@/lib/copy'

export type FaqItem = {
  q: string
  a: string
}

export const FAQ: Record<Locale, FaqItem[]> = {
  en: [
    { q: "How much does a chef \u00e0 domicile cost?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. Fees are on request, quoted in \u20ac." },
    { q: "How much does a private chef cost?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. Fees for a private chef are on request, quoted in \u20ac." },
    { q: "Chef \u00e0 domicile: what is the rate per person?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. There is no published per-person tariff. Fees are on request, quoted in \u20ac." },
    { q: "How to find a chef \u00e0 domicile?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. Write through the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com." },
    { q: "Can the chef cook on a yacht?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. Cooking on board a yacht is on request." },
    { q: "Which towns on the C\u00f4te d'Azur does the chef travel to?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. He cooks in Monaco, Nice, Cannes, Antibes and Saint-Tropez, and along the coast between them." },
    { q: "How far in advance should I book a private chef in summer, during the Festival de Cannes or the Grand Prix?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. Lead time is on request. Write early for summer, the Festival de Cannes and the Grand Prix." },
    { q: "Does the chef handle the shopping, the service and the cleaning?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. He cooks in your kitchen. Shopping, service and clearing are arranged on request with the booking." },
    { q: "How much does a private chef cost on the French Riviera?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. Fees on the French Riviera are on request, quoted in \u20ac." },
    { q: "How much is a private chef in Monaco?", a: "Table d'Adrian is a private chef serving Monaco and the C\u00f4te d'Azur. Fees for a private chef in Monaco are on request, quoted in \u20ac." },
    { q: "Do you tip a private chef in France?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. There is no published tipping rule. Service terms are on request with the booking." },
    { q: "What does a private chef do? / Does a private chef do the dishes?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. A private chef cooks in your kitchen. Other tasks, including the dishes, are on request." },
    { q: "Is a private chef worth it?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. He cooks in your kitchen for a private dinner, a week of meals or a celebration, with a menu written for the people at the table. Whether that fits is a matter of the occasion." },
    { q: "Personal chef vs private chef: what's the difference?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. On this site a private chef cooks for a household or a private event, not in a restaurant dining room. The two phrases name the same service here." },
    { q: "How to hire a private chef for a night?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. Write through the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com. Occasion, guests, dietary notes, a date if you have one." },
    { q: "Does a private chef live with you?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. Weekly villa stays are part of the service. Living in is on request." },
    { q: "Can a private chef cook on a yacht or for a villa stay?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. Villa stays are part of the service. Cooking on board a yacht is on request." },
    { q: "Can the menu be built around dietary needs?", a: "Table d'Adrian is a private chef serving the C\u00f4te d'Azur and Monaco. Dietary needs and preferences are handled on request when you write. Menus follow taste and preference, not medical advice." },
  ],
  fr: [
    { q: "Combien co\u00fbte un chef \u00e0 domicile ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. Les honoraires sont sur demande, en \u20ac." },
    { q: "Combien co\u00fbte un chef priv\u00e9 ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. Les honoraires d'un chef priv\u00e9 sont sur demande, en \u20ac." },
    { q: "Chef \u00e0 domicile : quel tarif / quel prix par personne ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. Il n'y a pas de tarif publi\u00e9 par personne. Les honoraires sont sur demande, en \u20ac." },
    { q: "Comment trouver un chef \u00e0 domicile ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. \u00c9crivez via le formulaire, en DM Instagram @tabledadrian, ou \u00e0 adrian@tabledadrian.com." },
    { q: "Le chef peut-il cuisiner sur un yacht ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. La cuisine \u00e0 bord d'un yacht se discute sur demande." },
    { q: "Dans quelles villes de la C\u00f4te d'Azur le chef se d\u00e9place-t-il ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. Il se d\u00e9place \u00e0 Monaco, Nice, Cannes, Antibes et Saint-Tropez, et le long de la c\u00f4te entre ces villes." },
    { q: "Combien de temps \u00e0 l'avance r\u00e9server un chef priv\u00e9 en \u00e9t\u00e9 / pendant le Festival de Cannes ou le Grand Prix ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. Le d\u00e9lai de r\u00e9servation est sur demande. \u00c9crivez t\u00f4t pour l'\u00e9t\u00e9, le Festival de Cannes et le Grand Prix." },
    { q: "Le chef s'occupe-t-il des courses, du service et du nettoyage ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. Il cuisine dans votre cuisine. Courses, service et remise en ordre se discutent sur demande avec la r\u00e9servation." },
    { q: "Combien co\u00fbte un chef priv\u00e9 sur la French Riviera ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. Les honoraires sont sur demande, en \u20ac." },
    { q: "Combien co\u00fbte un chef priv\u00e9 \u00e0 Monaco ?", a: "Table d'Adrian est un chef priv\u00e9 \u00e0 Monaco et sur la C\u00f4te d'Azur. Les honoraires \u00e0 Monaco sont sur demande, en \u20ac." },
    { q: "Laisse-t-on un pourboire \u00e0 un chef priv\u00e9 en France ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. Il n'y a pas de r\u00e8gle de pourboire publi\u00e9e. Les modalit\u00e9s de service sont sur demande avec la r\u00e9servation." },
    { q: "Que fait un chef priv\u00e9 ? Fait-il la vaisselle ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. Le chef cuisine dans votre cuisine. Les autres t\u00e2ches, y compris la vaisselle, sont sur demande." },
    { q: "Un chef priv\u00e9 en vaut-il la peine ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. Il cuisine chez vous pour un d\u00eener priv\u00e9, une semaine de repas ou une c\u00e9l\u00e9bration, avec un menu \u00e9crit pour les convives. Que cela convienne d\u00e9pend de l'occasion." },
    { q: "Personal chef ou chef priv\u00e9 : quelle diff\u00e9rence ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. Ici, un chef priv\u00e9 cuisine pour un foyer ou un ev\u00e9nement priv\u00e9, pas en salle de restaurant. Les deux expressions d\u00e9signent le m\u00eame service sur ce site." },
    { q: "Comment engager un chef priv\u00e9 pour une soir\u00e9e ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. \u00c9crivez via le formulaire, en DM Instagram @tabledadrian, ou \u00e0 adrian@tabledadrian.com. Occasion, convives, notes di\u00e9t\u00e9tiques, une date si vous en avez une." },
    { q: "Un chef priv\u00e9 vit-il chez vous ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. Les semaines en villa font partie du service. Vivre sur place se discute sur demande." },
    { q: "Un chef priv\u00e9 peut-il cuisiner sur un yacht ou pour un s\u00e9jour en villa ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. Les s\u00e9jours en villa font partie du service. La cuisine \u00e0 bord d'un yacht se discute sur demande." },
    { q: "Le menu peut-il tenir compte de besoins alimentaires ?", a: "Table d'Adrian est un chef priv\u00e9 sur la C\u00f4te d'Azur et \u00e0 Monaco. Les besoins et pr\u00e9f\u00e9rences alimentaires se r\u00e8glent sur demande lorsque vous \u00e9crivez. Les menus suivent le go\u00f9t et la pr\u00e9f\u00e9rence, pas un conseil m\u00e9dical." },
  ],
}

export function faqFor(locale: Locale): FaqItem[] {
  return FAQ[locale]
}
