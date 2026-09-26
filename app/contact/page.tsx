'use client'

import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function ContactPage() {
  return (
    <div className="bg-background pb-20 pt-28 sm:pt-32">
      <div className="container">
        <SectionHeading
          as="h1"
          eyebrow="Enquire"
          title="Tell us about the table"
          description="Occasion, guests, dietary notes, a date if you have one. Adrian typically replies within a day."
          animate={false}
        />
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  )
}
