import type { Metadata } from 'next'
import { RecipeBooksView } from '@/components/monetisation/RecipeBooksView'
import { BOOK_META } from '@/lib/offer-copy'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: BOOK_META.fr.title },
  description: BOOK_META.fr.description,
  alternates: localeAlternates('/fr/livres-de-recettes', '/shop/recipe-books', '/fr/livres-de-recettes'),
}

export default function FrenchRecipeBooksPage() {
  return <RecipeBooksView locale="fr" />
}
