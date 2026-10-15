import type { Metadata } from 'next'
import { JournalIndex } from '@/components/journal/JournalIndex'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: "Journal, private dining notes | Table d'Adrian" },
  description:
    "Notes on private dinners, the Côte d'Azur season, and cooking technique, written by Adrian Stefan between services.",
  alternates: localeAlternates('/articles', '/articles', '/fr/articles'),
}

export default function ArticlesPage() {
  return <JournalIndex locale="en" />
}
