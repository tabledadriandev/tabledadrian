import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    "Clear prices for Table d'Adrian private chef dinners, weekly meal preparation and events on the Côte d'Azur and in Monaco.",
  alternates: { canonical: '/pricing' },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
