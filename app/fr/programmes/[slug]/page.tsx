import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PlanArticle } from '@/components/monetisation/PlanViews'
import { OFFER_PLANS, planBySlug } from '@/lib/offer-copy'
import { localeAlternates } from '@/lib/routes'

export function generateStaticParams() {
  return OFFER_PLANS.map((plan) => ({ slug: plan.slugFr }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const plan = planBySlug(params.slug, 'fr')
  if (!plan) return { title: 'Programmes' }
  const en = `/plans/${plan.slug}`
  const fr = `/fr/programmes/${plan.slugFr}`
  return {
    title: { absolute: plan.metaTitleFr },
    description: plan.metaDescriptionFr,
    alternates: localeAlternates(fr, en, fr),
  }
}

export default function FrenchPlanPage({ params }: { params: { slug: string } }) {
  const plan = planBySlug(params.slug, 'fr')
  if (!plan) notFound()
  return <PlanArticle plan={plan} locale="fr" />
}
