'use client'

import { PricingCards } from '@/components/pricing/PricingCards'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function PricingPage() {
  return (
    <div className="bg-background pb-20 pt-28 sm:pt-32">
      <div className="container">
        <SectionHeading
          as="h1"
          eyebrow="Investment"
          title="Clear numbers, no theatre"
          description="Menus are priced for the table, not by a hidden formula. Tell Adrian the occasion and we will write a precise quote."
          animate={false}
          className="mb-14"
        />
        <PricingCards />
      </div>
    </div>
  )
}
