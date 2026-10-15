import type { Metadata } from 'next'
import { KitchenView } from '@/components/monetisation/KitchenView'
import { KITCHEN_META } from '@/lib/monetisation'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: KITCHEN_META.fr.title },
  description: KITCHEN_META.fr.description,
  alternates: localeAlternates('/fr/cuisine-du-chef', '/chefs-kitchen', '/fr/cuisine-du-chef'),
}

export default function FrenchKitchenPage() {
  return <KitchenView locale="fr" />
}
