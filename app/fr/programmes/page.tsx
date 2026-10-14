import type { Metadata } from 'next'
import { PlansIndex } from '@/components/monetisation/PlanViews'
import { PLANS_META } from '@/lib/offer-copy'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: PLANS_META.fr.title },
  description: PLANS_META.fr.description,
  alternates: localeAlternates('/fr/programmes', '/plans', '/fr/programmes'),
}

export default function FrenchPlansPage() {
  return <PlansIndex locale="fr" />
}
