import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PlanArticle } from '@/components/monetisation/PlanViews'
import { OFFER_PLANS, planBySlug } from '@/lib/offer-copy'
import { localeAlternates } from '@/lib/routes'

export function generateStaticParams() {
  return OFFER_PLANS.map((plan) => ({ slug: plan.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const plan = planBySlug(params.slug, 'en')
  if (!plan) return { title: 'Plans' }
  const en = `/plans/${plan.slug}`
  const fr = `/fr/programmes/${plan.slugFr}`
  return {
    title: { absolute: plan.metaTitle },
    description: plan.metaDescription,
    alternates: localeAlternates(en, en, fr),
  }
}

export default function PlanPage({ params }: { params: { slug: string } }) {
  const plan = planBySlug(params.slug, 'en')
  if (!plan) notFound()
  return <PlanArticle plan={plan} locale="en" />
}
