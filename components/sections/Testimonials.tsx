'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Private dinner, London',
    content:
      'Chef Adrian transformed our anniversary dinner into an unforgettable evening. Every course felt personal, and guests are still talking about it.',
  },
  {
    name: 'James Thompson',
    role: 'Corporate host',
    content:
      'The catering for our board dinner exceeded every expectation. Professional, elegant, and the kind of food people remember.',
  },
  {
    name: 'Emma Wilson',
    role: 'Weekly meal preparation',
    content:
      'Having Adrian prepare our weekly meals has been quietly life-changing. Restaurant quality, every day, without leaving home.',
  },
  {
    name: 'Michael Chen',
    role: 'Wedding celebration',
    content:
      'Our wedding table was elevated beyond anything we imagined. Months later, guests still mention the food first.',
  },
]

export function Testimonials() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const quotes = gsap.utils.toArray<HTMLElement>('[data-quote]')
        const bar = root.current?.querySelector<HTMLElement>('.quote-bar i')
        let current = 0
        gsap.set(quotes, { autoAlpha: 0 })
        gsap.set(quotes[0], { autoAlpha: 1 })
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top top',
          end: '+=2200',
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(quotes.length - 1, Math.floor(self.progress * quotes.length))
            if (index !== current) {
              current = index
              quotes.forEach((quote, i) => {
                gsap.to(quote, {
                  autoAlpha: i === index ? 1 : 0,
                  duration: 0.45,
                  overwrite: 'auto',
                  ease: 'power2.out',
                })
              })
            }
            if (bar) bar.style.transform = `scaleX(${Math.max(0.06, self.progress)})`
          },
        })
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section id="testimonials" ref={root} className="quotes-pin">
      <div className="container flex min-h-[100svh] flex-col justify-center py-28 lg:min-h-[100svh]">
        <h2 className="display text-4xl sm:text-6xl">Tables we have cooked for.</h2>
        <div className="quote-stack">
          {testimonials.map((quote) => (
            <blockquote key={quote.name} data-quote>
              <p>&ldquo;{quote.content}&rdquo;</p>
              <footer>
                <cite>{quote.name}</cite>
                <span>{quote.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="quote-bar" aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  )
}
