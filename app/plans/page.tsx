import type { Metadata } from 'next'
import { PlansIndex } from '@/components/monetisation/PlanViews'
import { PLANS_META } from '@/lib/offer-copy'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: PLANS_META.en.title },
  description: PLANS_META.en.description,
  alternates: localeAlternates('/plans', '/plans', '/fr/programmes'),
}

export default function PlansPage() {
  return <PlansIndex locale="en" />
}
