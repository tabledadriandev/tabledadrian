import type { Metadata } from 'next'
import { KitchenView } from '@/components/monetisation/KitchenView'
import { KITCHEN_META } from '@/lib/monetisation'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: KITCHEN_META.en.title },
  description: KITCHEN_META.en.description,
  alternates: localeAlternates('/chefs-kitchen', '/chefs-kitchen', '/fr/cuisine-du-chef'),
}

export default function KitchenPage() {
  return <KitchenView locale="en" />
}
