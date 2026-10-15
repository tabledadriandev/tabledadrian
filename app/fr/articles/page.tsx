import type { Metadata } from 'next'
import { JournalIndex } from '@/components/journal/JournalIndex'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: "Journal, notes de table privée | Table d'Adrian" },
  description:
    "Notes sur les dîners privés, la saison sur la Côte d'Azur et la technique, écrites par Adrian Stefan entre les services.",
  alternates: localeAlternates('/fr/articles', '/articles', '/fr/articles'),
}

export default function FrenchArticlesPage() {
  return <JournalIndex locale="fr" />
}
