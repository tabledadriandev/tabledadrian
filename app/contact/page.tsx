'use client'

import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Garnish, type GarnishItem } from '@/components/motion/Garnish'

const garnish: GarnishItem[] = [
  { kind: 'basil', x: '8%', y: '5rem', size: 96, depth: 0.85, rotate: 30, lite: true },
  { kind: 'line-sprig', x: '86%', y: '3rem', size: 90, depth: 0.3, rotate: 16 },
  { kind: 'petal-c', x: '90%', y: '14rem', size: 42, depth: 0.75, rotate: -20 },
  { kind: 'flake', x: '16%', y: '16rem', size: 22, depth: 0.55, rotate: 12 },
]

export default function ContactPage() {
  return (
    <div className="relative bg-background pb-20 pt-28 sm:pt-32">
      <Garnish items={garnish} className="page-garnish" />
      <div className="container relative">
        <SectionHeading
          split="chars"
          as="h1"
          eyebrow="Enquire"
          title="Tell us about the table"
          description="Occasion, guests, dietary notes, a date if you have one. Adrian typically replies within a day."
          animate={false}
        />
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2" data-rise="40">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  )
}
