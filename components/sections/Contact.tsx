'use client'

import { ArrowRight } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/motion/Magnetic'

export function Contact() {
  return (
    <section id="contact" className="bg-ink text-ink-foreground">
      <div className="container flex min-h-[80svh] flex-col justify-end py-20 sm:py-28">
        <h2 className="display max-w-5xl text-5xl sm:text-7xl lg:text-[6.5rem]">
          Shall we cook for your table?
        </h2>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-foreground/80 sm:text-lg">
          Tell Adrian about the occasion, the guests and any dietary notes. A reply typically
          arrives within a day.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Magnetic>
            <Button href="/contact" variant="light" size="lg">
              Book your experience
              <ArrowRight size={18} />
            </Button>
          </Magnetic>
          <a className="maison-link" href={`mailto:${CONTACT_INFO.email}`}>
            {CONTACT_INFO.email}
          </a>
          <a className="maison-link is-quiet" href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>
            {CONTACT_INFO.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
