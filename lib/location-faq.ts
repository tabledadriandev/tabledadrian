import type { Locale } from '@/lib/copy'
import type { FaqItem } from '@/lib/faq'

export type TownId = 'monaco' | 'nice' | 'cannes' | 'antibes' | 'saint-tropez'

const TOWN_FAQ: Record<TownId, Record<Locale, FaqItem[]>> = {
  monaco: {
    en: [
      {
        q: 'How much is a private chef in Monaco?',
        a: "Table d'Adrian is a private chef serving Monaco and the Côte d'Azur. Fees for a private chef in Monaco are on request, quoted in €.",
      },
      {
        q: 'Is there a rate per person for a chef à domicile in Monaco?',
        a: "Table d'Adrian is a private chef serving Monaco and the Côte d'Azur. There is no published per-person tariff. Fees are on request, quoted in €.",
      },
      {
        q: 'How do I hire a private chef in Monaco?',
        a: "Table d'Adrian is a private chef serving Monaco and the Côte d'Azur. Write through the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com. Occasion, guests, dietary notes, a date if you have one.",
      },
      {
        q: 'What does a private chef do in a Monaco apartment?',
        a: "Table d'Adrian is a private chef serving Monaco and the Côte d'Azur. Monte-Carlo apartments, houses on the Rock and flats above Larvotto rarely have a restaurant pass. He cooks in the space you have, plates at the table, and leaves the rooms as they were found. Shopping, service and the dishes are on request.",
      },
      {
        q: 'How far in advance should I book a private chef for the Grand Prix?',
        a: "Table d'Adrian is a private chef serving Monaco and the Côte d'Azur. Grand Prix week, the boat-show calendar and New Year are taken on request. Write early if the table is tied to a race or a gala. Lead time is on request.",
      },
      {
        q: "Can a Monaco booking cover Cap-d'Ail, Èze or Villefranche-sur-Mer?",
        a: "Table d'Adrian is a private chef serving Monaco and the Côte d'Azur. A Monaco booking can extend to Cap-d'Ail, Roquebrune-Cap-Martin, Beaulieu-sur-Mer, Èze and Villefranche-sur-Mer. That is travel along a short coast, not a claim that the kitchen is based in each town.",
      },
      {
        q: 'Can the chef cook on a yacht, or only for an apartment dinner in Monaco?',
        a: "Table d'Adrian is a private chef serving Monaco and the Côte d'Azur. A quiet dinner for two, with a menu written that morning from the market, is part of the work. Cooking on board a yacht is on request.",
      },
      {
        q: 'Can the menu be built around dietary needs in Monaco?',
        a: "Table d'Adrian is a private chef serving Monaco and the Côte d'Azur. Dietary needs and preferences are handled on request when you write. Longevity cuisine here means Mediterranean cooking with fine-dining precision, not a medical promise. Menus follow taste and preference, not medical advice.",
      },
    ],
    fr: [
      {
        q: 'Combien coûte un chef privé à Monaco ?',
        a: "Table d'Adrian est un chef privé à Monaco et sur la Côte d'Azur. Les honoraires à Monaco sont sur demande, en €.",
      },
      {
        q: 'Y a-t-il un tarif par personne pour un chef à domicile à Monaco ?',
        a: "Table d'Adrian est un chef privé à Monaco et sur la Côte d'Azur. Il n'y a pas de tarif publié par personne. Les honoraires sont sur demande, en €.",
      },
      {
        q: 'Comment engager un chef privé à Monaco ?',
        a: "Table d'Adrian est un chef privé à Monaco et sur la Côte d'Azur. Écrivez via le formulaire, en DM Instagram @tabledadrian, ou à adrian@tabledadrian.com. Occasion, convives, notes diététiques, une date si vous en avez une.",
      },
      {
        q: 'Que fait un chef privé dans un appartement à Monaco ?',
        a: "Table d'Adrian est un chef privé à Monaco et sur la Côte d'Azur. Les appartements de Monte-Carlo, les maisons du Rocher et les flats au-dessus du Larvotto n'ont pas un passage de restaurant. Il cuisine dans l'espace dont vous disposez, dresse à table, et laisse les pièces comme on les a trouvées. Courses, service et vaisselle sont sur demande.",
      },
      {
        q: "Combien de temps à l'avance réserver un chef privé pour le Grand Prix ?",
        a: "Table d'Adrian est un chef privé à Monaco et sur la Côte d'Azur. La semaine du Grand Prix, le calendrier du yacht show et le Nouvel An se prennent sur demande. Écrivez tôt si la table est liée à une course ou à un gala. Le délai est sur demande.",
      },
      {
        q: "Une réservation à Monaco peut-elle couvrir Cap-d'Ail, Èze ou Villefranche-sur-Mer ?",
        a: "Table d'Adrian est un chef privé à Monaco et sur la Côte d'Azur. Une réservation à Monaco peut s'étendre à Cap-d'Ail, Roquebrune-Cap-Martin, Beaulieu-sur-Mer, Èze et Villefranche-sur-Mer. C'est un déplacement sur une côte courte, pas une affirmation que la cuisine est installée dans chaque ville.",
      },
      {
        q: 'Le chef peut-il cuisiner sur un yacht, ou seulement pour un dîner en appartement à Monaco ?',
        a: "Table d'Adrian est un chef privé à Monaco et sur la Côte d'Azur. Un dîner calme pour deux, avec un menu écrit le matin d'après le marché, fait partie du travail. La cuisine à bord d'un yacht se discute sur demande.",
      },
      {
        q: 'Le menu peut-il tenir compte de besoins alimentaires à Monaco ?',
        a: "Table d'Adrian est un chef privé à Monaco et sur la Côte d'Azur. Les besoins et préférences alimentaires se règlent sur demande lorsque vous écrivez. La cuisine longévité désigne ici une cuisine méditerranéenne tenue à la précision gastronomique, pas une promesse médicale. Les menus suivent le goût et la préférence, pas un conseil médical.",
      },
    ],
  },
  nice: {
    en: [
      {
        q: 'How much does a private chef cost in Nice?',
        a: "Table d'Adrian is a private chef serving Nice and the Côte d'Azur. Fees are on request, quoted in €.",
      },
      {
        q: 'Is there a rate per person for a private chef in Nice?',
        a: "Table d'Adrian is a private chef serving Nice and the Côte d'Azur. There is no published per-person tariff. Fees are on request, quoted in €.",
      },
      {
        q: 'How do I hire a private chef in Nice?',
        a: "Table d'Adrian is a private chef serving Nice and the Côte d'Azur. Write through the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com. Occasion, guests, dietary notes, a date if you have one.",
      },
      {
        q: 'What does a private chef do in Nice?',
        a: "Table d'Adrian is a private chef serving Nice and the Côte d'Azur. Nice is a working city: Cours Saleya in the morning, a kitchen in Cimiez, the Port or toward Fabron, and a table that can run for a week of quiet dinners. Menus follow the market, not a printed book. Nice can support a residency, which is the difference from a Monaco apartment dinner or a Cannes festival weekend.",
      },
      {
        q: 'How far in advance should I book a private chef in Nice?',
        a: "Table d'Adrian is a private chef serving Nice and the Côte d'Azur. Lead time is on request. A Nice booking is often a weekday residency rather than a single Saturday. Write early for summer.",
      },
      {
        q: 'Can a Nice booking cover Villefranche, Cap-Ferrat or Èze?',
        a: "Table d'Adrian is a private chef serving Nice and the Côte d'Azur. Villefranche-sur-Mer, Saint-Jean-Cap-Ferrat, Èze, Beaulieu-sur-Mer and Menton sit a short drive east. A Nice booking can cover those communes when the week is based in the city.",
      },
      {
        q: 'Can the chef stay for a villa week in Nice, or cook on a yacht?',
        a: "Table d'Adrian is a private chef serving Nice and the Côte d'Azur. Weekday villa residencies are part of the service. Cooking on board a yacht is on request.",
      },
      {
        q: 'Can the menu be built around dietary needs in Nice?',
        a: "Table d'Adrian is a private chef serving Nice and the Côte d'Azur. Dietary notes are taken when you write. The cooking stays a matter of taste and preference, not medical advice. Longevity cuisine on a Niçois table means seasonal Mediterranean cooking with fine-dining precision.",
      },
    ],
    fr: [
      {
        q: 'Combien coûte un chef privé à Nice ?',
        a: "Table d'Adrian est un chef privé à Nice et sur la Côte d'Azur. Les honoraires sont sur demande, en €.",
      },
      {
        q: 'Y a-t-il un tarif par personne pour un chef privé à Nice ?',
        a: "Table d'Adrian est un chef privé à Nice et sur la Côte d'Azur. Il n'y a pas de tarif publié par personne. Les honoraires sont sur demande, en €.",
      },
      {
        q: 'Comment engager un chef privé à Nice ?',
        a: "Table d'Adrian est un chef privé à Nice et sur la Côte d'Azur. Écrivez via le formulaire, en DM Instagram @tabledadrian, ou à adrian@tabledadrian.com. Occasion, convives, notes diététiques, une date si vous en avez une.",
      },
      {
        q: 'Que fait un chef privé à Nice ?',
        a: "Table d'Adrian est un chef privé à Nice et sur la Côte d'Azur. Nice est la ville qui travaille : Cours Saleya le matin, une cuisine à Cimiez, au Port ou vers Fabron, et une table qui peut tenir une semaine de dîners calmes. Les menus suivent le marché, pas un livre imprimé. Nice peut porter une résidence, à la différence d'un dîner en appartement à Monaco ou d'un week-end de festival à Cannes.",
      },
      {
        q: "Combien de temps à l'avance réserver un chef privé à Nice ?",
        a: "Table d'Adrian est un chef privé à Nice et sur la Côte d'Azur. Le délai est sur demande. Une réservation à Nice est souvent une résidence en semaine plutôt qu'un seul samedi. Écrivez tôt pour l'été.",
      },
      {
        q: 'Une réservation à Nice peut-elle couvrir Villefranche, Cap-Ferrat ou Èze ?',
        a: "Table d'Adrian est un chef privé à Nice et sur la Côte d'Azur. Villefranche-sur-Mer, Saint-Jean-Cap-Ferrat, Èze, Beaulieu-sur-Mer et Menton sont à quelques minutes vers l'est. Une réservation à Nice peut couvrir ces communes lorsque la semaine est basée en ville.",
      },
      {
        q: 'Le chef peut-il rester une semaine en villa à Nice, ou cuisiner sur un yacht ?',
        a: "Table d'Adrian est un chef privé à Nice et sur la Côte d'Azur. Les résidences en villa en semaine font partie du service. La cuisine à bord d'un yacht se discute sur demande.",
      },
      {
        q: 'Le menu peut-il tenir compte de besoins alimentaires à Nice ?',
        a: "Table d'Adrian est un chef privé à Nice et sur la Côte d'Azur. Les notes diététiques se prennent lorsque vous écrivez. La cuisine reste une affaire de goût et de préférence, pas un conseil médical. La cuisine longévité sur une table niçoise désigne une cuisine méditerranéenne de saison, tenue à la précision gastronomique.",
      },
    ],
  },
  cannes: {
    en: [
      {
        q: 'How much does a private chef cost in Cannes?',
        a: "Table d'Adrian is a private chef serving Cannes and the Côte d'Azur. Fees are on request, quoted in €.",
      },
      {
        q: 'Is there a rate per person during the Festival de Cannes?',
        a: "Table d'Adrian is a private chef serving Cannes and the Côte d'Azur. There is no published per-person tariff, including for Festival dates. Fees are on request, quoted in €.",
      },
      {
        q: 'How do I hire a private chef in Cannes?',
        a: "Table d'Adrian is a private chef serving Cannes and the Côte d'Azur. Write through the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com. Occasion, guests, dietary notes, a date if you have one. Festival dates are a booking, not a walk-in.",
      },
      {
        q: 'What does a private chef do in Cannes?',
        a: "Table d'Adrian is a private chef serving Cannes and the Côte d'Azur. The booking is often a Friday-to-Sunday villa, a dinner in a Californie or Super-Cannes house, or a table during the Festival. The rest of the year it is a quieter weekend: shopping in the morning, service at eight, the rooms reset before midnight.",
      },
      {
        q: 'How far in advance should I book a private chef for the Festival de Cannes?',
        a: "Table d'Adrian is a private chef serving Cannes and the Côte d'Azur. Festival dates, and the weeks around them, are taken on request. Write early. Lead time is on request.",
      },
      {
        q: 'Can a Cannes booking include Mougins or Antibes?',
        a: "Table d'Adrian is a private chef serving Cannes and the Côte d'Azur. Mougins sits in the hills behind the bay and Antibes is the next town east. A Cannes booking can include a dinner in Mougins when the stay is based on the coast.",
      },
      {
        q: 'Can the chef cook for a villa weekend in Cannes, or on a yacht?',
        a: "Table d'Adrian is a private chef serving Cannes and the Côte d'Azur. A weekend villa stay is part of the service. Cooking on board a yacht is on request.",
      },
      {
        q: 'Can the menu be built around dietary needs in Cannes?',
        a: "Table d'Adrian is a private chef serving Cannes and the Côte d'Azur. Menus are written for the guests in the room. Dietary needs and preferences are handled on request when you write. Longevity cuisine is the style, not a medical claim. Menus follow taste and preference, not medical advice.",
      },
    ],
    fr: [
      {
        q: 'Combien coûte un chef privé à Cannes ?',
        a: "Table d'Adrian est un chef privé à Cannes et sur la Côte d'Azur. Les honoraires sont sur demande, en €.",
      },
      {
        q: 'Y a-t-il un tarif par personne pendant le Festival de Cannes ?',
        a: "Table d'Adrian est un chef privé à Cannes et sur la Côte d'Azur. Il n'y a pas de tarif publié par personne, y compris pour les dates du Festival. Les honoraires sont sur demande, en €.",
      },
      {
        q: 'Comment engager un chef privé à Cannes ?',
        a: "Table d'Adrian est un chef privé à Cannes et sur la Côte d'Azur. Écrivez via le formulaire, en DM Instagram @tabledadrian, ou à adrian@tabledadrian.com. Occasion, convives, notes diététiques, une date si vous en avez une. Les dates du Festival se réservent, elles ne se prennent pas au passage.",
      },
      {
        q: 'Que fait un chef privé à Cannes ?',
        a: "Table d'Adrian est un chef privé à Cannes et sur la Côte d'Azur. La réservation est souvent une villa du vendredi au dimanche, un dîner dans une maison de la Californie ou de Super-Cannes, ou une table pendant le Festival. Le reste de l'année, c'est un week-end plus calme : les courses le matin, le service à vingt heures, les pièces remises en ordre avant minuit.",
      },
      {
        q: "Combien de temps à l'avance réserver un chef privé pour le Festival de Cannes ?",
        a: "Table d'Adrian est un chef privé à Cannes et sur la Côte d'Azur. Les dates du Festival, et les semaines autour, se prennent sur demande. Écrivez tôt. Le délai est sur demande.",
      },
      {
        q: 'Une réservation à Cannes peut-elle inclure Mougins ou Antibes ?',
        a: "Table d'Adrian est un chef privé à Cannes et sur la Côte d'Azur. Mougins est dans les collines derrière la baie et Antibes est la ville suivante vers l'est. Une réservation à Cannes peut inclure un dîner à Mougins lorsque le séjour est sur la côte.",
      },
      {
        q: 'Le chef peut-il cuisiner pour un week-end en villa à Cannes, ou sur un yacht ?',
        a: "Table d'Adrian est un chef privé à Cannes et sur la Côte d'Azur. Un séjour en villa le week-end fait partie du service. La cuisine à bord d'un yacht se discute sur demande.",
      },
      {
        q: 'Le menu peut-il tenir compte de besoins alimentaires à Cannes ?',
        a: "Table d'Adrian est un chef privé à Cannes et sur la Côte d'Azur. Les menus s'écrivent pour les convives. Les besoins et préférences alimentaires se règlent sur demande lorsque vous écrivez. La cuisine longévité est le style, pas une promesse médicale. Les menus suivent le goût et la préférence, pas un conseil médical.",
      },
    ],
  },
  antibes: {
    en: [
      {
        q: 'How much does a private chef cost in Antibes?',
        a: "Table d'Adrian is a private chef serving Antibes and the Côte d'Azur. Fees are on request, quoted in €.",
      },
      {
        q: 'Is there a rate per person for a private chef in Antibes?',
        a: "Table d'Adrian is a private chef serving Antibes and the Côte d'Azur. There is no published per-person tariff. Fees are on request, quoted in €.",
      },
      {
        q: 'How do I hire a private chef in Antibes?',
        a: "Table d'Adrian is a private chef serving Antibes and the Côte d'Azur. Write through the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com. Occasion, guests, dietary notes, a date if you have one.",
      },
      {
        q: 'What does a private chef do in Antibes?',
        a: "Table d'Adrian is a private chef serving Antibes and the Côte d'Azur. Antibes is a peninsula town, not a festival stage. The bookings that fit are villas on Cap d'Antibes, a garden table behind the old ramparts, or a night in Juan-les-Pins. He cooks in your kitchen.",
      },
      {
        q: 'How far in advance should I book a private chef in Antibes?',
        a: "Table d'Adrian is a private chef serving Antibes and the Côte d'Azur. Lead time is on request. Antibes is not a festival stage; write early for summer, when the same coast is busy.",
      },
      {
        q: "Can a week on Cap d'Antibes include Cannes or Nice?",
        a: "Table d'Adrian is a private chef serving Antibes and the Côte d'Azur. From Antibes, Cannes is the next bay west and Nice is a short run east. A week on the cap can include a dinner in either town, and Mougins is on the same list.",
      },
      {
        q: 'Can the chef cook for a villa stay in Antibes, or on a yacht?',
        a: "Table d'Adrian is a private chef serving Antibes and the Côte d'Azur. Villa dinners on Cap d'Antibes and evenings in Juan-les-Pins are the bookings that fit. Cooking on board a yacht is on request.",
      },
      {
        q: 'Can the menu be built around dietary needs in Antibes?',
        a: "Table d'Adrian is a private chef serving Antibes and the Côte d'Azur. Dietary needs and preferences are handled on request when you write. Menus are Mediterranean and seasonal, written for the table. They follow taste and preference, not medical advice.",
      },
    ],
    fr: [
      {
        q: 'Combien coûte un chef privé à Antibes ?',
        a: "Table d'Adrian est un chef privé à Antibes et sur la Côte d'Azur. Les honoraires sont sur demande, en €.",
      },
      {
        q: 'Y a-t-il un tarif par personne pour un chef privé à Antibes ?',
        a: "Table d'Adrian est un chef privé à Antibes et sur la Côte d'Azur. Il n'y a pas de tarif publié par personne. Les honoraires sont sur demande, en €.",
      },
      {
        q: 'Comment engager un chef privé à Antibes ?',
        a: "Table d'Adrian est un chef privé à Antibes et sur la Côte d'Azur. Écrivez via le formulaire, en DM Instagram @tabledadrian, ou à adrian@tabledadrian.com. Occasion, convives, notes diététiques, une date si vous en avez une.",
      },
      {
        q: 'Que fait un chef privé à Antibes ?',
        a: "Table d'Adrian est un chef privé à Antibes et sur la Côte d'Azur. Antibes est une ville-presqu'île, pas une scène de festival. Les réservations qui conviennent sont les villas du Cap d'Antibes, une table de jardin derrière les remparts, ou une soirée à Juan-les-Pins. Il cuisine dans votre cuisine.",
      },
      {
        q: "Combien de temps à l'avance réserver un chef privé à Antibes ?",
        a: "Table d'Adrian est un chef privé à Antibes et sur la Côte d'Azur. Le délai est sur demande. Antibes n'est pas une scène de festival ; écrivez tôt pour l'été, quand la même côte est prise.",
      },
      {
        q: "Une semaine au Cap d'Antibes peut-elle inclure Cannes ou Nice ?",
        a: "Table d'Adrian est un chef privé à Antibes et sur la Côte d'Azur. Depuis Antibes, Cannes est la baie suivante vers l'ouest et Nice est à quelques minutes vers l'est. Une semaine sur le cap peut inclure un dîner dans l'une ou l'autre ville, et Mougins figure sur la même liste.",
      },
      {
        q: 'Le chef peut-il cuisiner pour un séjour en villa à Antibes, ou sur un yacht ?',
        a: "Table d'Adrian est un chef privé à Antibes et sur la Côte d'Azur. Les dîners en villa au Cap d'Antibes et les soirées à Juan-les-Pins sont les réservations qui conviennent. La cuisine à bord d'un yacht se discute sur demande.",
      },
      {
        q: 'Le menu peut-il tenir compte de besoins alimentaires à Antibes ?',
        a: "Table d'Adrian est un chef privé à Antibes et sur la Côte d'Azur. Les besoins et préférences alimentaires se règlent sur demande lorsque vous écrivez. Les menus sont méditerranéens et de saison, écrits pour la table. Ils suivent le goût et la préférence, pas un conseil médical.",
      },
    ],
  },
  'saint-tropez': {
    en: [
      {
        q: 'How much does a private chef cost in Saint-Tropez?',
        a: "Table d'Adrian is a private chef serving Saint-Tropez and the Côte d'Azur. Fees are on request, quoted in €. Saint-Tropez and St Tropez are the same town.",
      },
      {
        q: 'Is there a rate per person for a private chef in Saint-Tropez?',
        a: "Table d'Adrian is a private chef serving Saint-Tropez and the Côte d'Azur. There is no published per-person tariff. Fees are on request, quoted in €.",
      },
      {
        q: 'How do I hire a private chef in Saint-Tropez or Ramatuelle?',
        a: "Table d'Adrian is a private chef serving Saint-Tropez and the Côte d'Azur. Write through the form, Instagram DM @tabledadrian, or adrian@tabledadrian.com. Occasion, guests, dietary notes, a date if you have one. Ramatuelle is the neighbouring commune when the villa sits outside the village.",
      },
      {
        q: 'What does a private chef do in Saint-Tropez?',
        a: "Table d'Adrian is a private chef serving Saint-Tropez and the Côte d'Azur. Saint-Tropez is a peninsula, not a day trip from Nice. The booking is usually a villa week: Pampelonne behind the pines, a house above the port, or a quieter table in Ramatuelle.",
      },
      {
        q: 'How far in advance should I book a private chef in Saint-Tropez in summer?',
        a: "Table d'Adrian is a private chef serving Saint-Tropez and the Côte d'Azur. Summer fills the gulf. Those weeks are taken on request; write early. Out of season the same kitchens still work. Lead time is on request.",
      },
      {
        q: 'Does a Saint-Tropez booking cover Ramatuelle, or the eastern coast?',
        a: "Table d'Adrian is a private chef serving Saint-Tropez and the Côte d'Azur. Ramatuelle, Pampelonne and Gassin belong with this page. Èze and Saint-Jean-Cap-Ferrat do not. The drive from the eastern Côte d'Azur is part of the booking.",
      },
      {
        q: 'Can the chef stay for a villa week in Saint-Tropez, or cook on a yacht?',
        a: "Table d'Adrian is a private chef serving Saint-Tropez and the Côte d'Azur. A villa week on the peninsula is the usual booking. Cooking on board a yacht is on request.",
      },
      {
        q: 'Can the menu be built around dietary needs in Saint-Tropez?',
        a: "Table d'Adrian is a private chef serving Saint-Tropez and the Côte d'Azur. Dietary needs and preferences are handled on request when you write. Longevity cuisine on this coast means seasonal Mediterranean cooking with fine-dining precision. Menus follow taste and preference, not medical advice.",
      },
    ],
    fr: [
      {
        q: 'Combien coûte un chef privé à Saint-Tropez ?',
        a: "Table d'Adrian est un chef privé à Saint-Tropez et sur la Côte d'Azur. Les honoraires sont sur demande, en €. Saint-Tropez et St Tropez sont la même ville.",
      },
      {
        q: 'Y a-t-il un tarif par personne pour un chef privé à Saint-Tropez ?',
        a: "Table d'Adrian est un chef privé à Saint-Tropez et sur la Côte d'Azur. Il n'y a pas de tarif publié par personne. Les honoraires sont sur demande, en €.",
      },
      {
        q: 'Comment engager un chef privé à Saint-Tropez ou à Ramatuelle ?',
        a: "Table d'Adrian est un chef privé à Saint-Tropez et sur la Côte d'Azur. Écrivez via le formulaire, en DM Instagram @tabledadrian, ou à adrian@tabledadrian.com. Occasion, convives, notes diététiques, une date si vous en avez une. Ramatuelle est la commune voisine lorsque la villa est hors du village.",
      },
      {
        q: 'Que fait un chef privé à Saint-Tropez ?',
        a: "Table d'Adrian est un chef privé à Saint-Tropez et sur la Côte d'Azur. Saint-Tropez est une presqu'île, pas une excursion depuis Nice. La réservation est le plus souvent une semaine en villa : Pampelonne derrière les pins, une maison au-dessus du port, ou une table plus calme à Ramatuelle.",
      },
      {
        q: "Combien de temps à l'avance réserver un chef privé à Saint-Tropez en été ?",
        a: "Table d'Adrian est un chef privé à Saint-Tropez et sur la Côte d'Azur. L'été remplit le golfe. Ces semaines se prennent sur demande ; écrivez tôt. Hors saison, les mêmes cuisines tiennent. Le délai est sur demande.",
      },
      {
        q: 'Une réservation à Saint-Tropez couvre-t-elle Ramatuelle, ou la côte est ?',
        a: "Table d'Adrian est un chef privé à Saint-Tropez et sur la Côte d'Azur. Ramatuelle, Pampelonne et Gassin appartiennent à cette page. Èze et Saint-Jean-Cap-Ferrat n'y figurent pas. La route depuis l'est de la Côte d'Azur fait partie de la réservation.",
      },
      {
        q: 'Le chef peut-il rester une semaine en villa à Saint-Tropez, ou cuisiner sur un yacht ?',
        a: "Table d'Adrian est un chef privé à Saint-Tropez et sur la Côte d'Azur. Une semaine en villa sur la presqu'île est la réservation habituelle. La cuisine à bord d'un yacht se discute sur demande.",
      },
      {
        q: 'Le menu peut-il tenir compte de besoins alimentaires à Saint-Tropez ?',
        a: "Table d'Adrian est un chef privé à Saint-Tropez et sur la Côte d'Azur. Les besoins et préférences alimentaires se règlent sur demande lorsque vous écrivez. La cuisine longévité sur cette côte désigne une cuisine méditerranéenne de saison, tenue à la précision gastronomique. Les menus suivent le goût et la préférence, pas un conseil médical.",
      },
    ],
  },
}

export function townFaq(id: TownId, locale: Locale): FaqItem[] {
  return TOWN_FAQ[id][locale]
}
