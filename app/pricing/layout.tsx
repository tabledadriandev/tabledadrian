import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    "Clear prices for Table d'Adrian private chef dinners, weekly meal preparation and events in London and Europe.",
  alternates: { canonical: '/pricing' },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
