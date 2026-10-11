'use client'

import { PricingCards } from '@/components/pricing/PricingCards'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Garnish, type GarnishItem } from '@/components/motion/Garnish'

const garnish: GarnishItem[] = [
  { kind: 'line-citrus', x: '78%', y: '3rem', size: 130, depth: 0.3, rotate: -10, lite: true },
  { kind: 'petal-b', x: '90%', y: '12rem', size: 64, depth: 0.85, rotate: 24 },
  { kind: 'salt', x: '70%', y: '14rem', size: 26, depth: 0.6, rotate: 10 },
  { kind: 'flake', x: '62%', y: '6rem', size: 22, depth: 0.75, rotate: -26 },
]

export default function PricingPage() {
  return (
    <div className="relative bg-background pb-20 pt-28 sm:pt-32">
      <Garnish items={garnish} className="page-garnish" />
      <div className="container relative">
        <SectionHeading
          split="chars"
          as="h1"
          align="left"
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
