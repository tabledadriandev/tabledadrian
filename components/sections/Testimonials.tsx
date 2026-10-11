'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { DustField } from '@/components/motion/DustField'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Private dinner',
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

const FAN = [
  { y: 0, scale: 1, rotate: 0 },
  { y: -26, scale: 0.95, rotate: -3.2 },
  { y: -50, scale: 0.9, rotate: 2.6 },
  { y: -72, scale: 0.85, rotate: -1.6 },
]

export function Testimonials() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.quote-card')
        const bar = root.current?.querySelector<HTMLElement>('.quote-bar i')
        const place = (slot: number) => {
          const fan = FAN[Math.min(slot, FAN.length - 1)]
          return { y: fan.y, scale: fan.scale, rotation: fan.rotate, opacity: slot > 3 ? 0 : 1 - slot * 0.14 }
        }
        cards.forEach((card, i) => gsap.set(card, { ...place(i), zIndex: cards.length - i }))

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=2400',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (bar) bar.style.transform = `scaleX(${Math.max(0.06, self.progress)})`
            },
          },
        })
        cards.slice(0, -1).forEach((card, step) => {
          const at = step * 1.25 + 0.35
          tl.to(card, { yPercent: -135, xPercent: -18, rotation: -11, opacity: 0, duration: 1 }, at)
          cards.slice(step + 1).forEach((next, j) => {
            tl.to(next, { ...place(j), duration: 1 }, at + 0.08)
          })
        })
        tl.to({}, { duration: 0.35 })
      })
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.quote-card')
        cards.slice(0, -1).forEach((card, i) => {
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.45,
            ease: 'none',
            scrollTrigger: { trigger: cards[i + 1], start: 'top 85%', end: 'top 20%', scrub: true },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section id="testimonials" ref={root} className="quotes-pin relative overflow-hidden">
      <DustField density={80} />
      <div className="quotes-layout container relative">
        <div className="quotes-intro">
          <h2 className="display text-4xl sm:text-6xl" data-split="chars">
            Tables we have cooked for.
          </h2>
          <div className="quote-bar" aria-hidden="true">
            <i />
          </div>
        </div>
        <div className="quote-deck">
          {testimonials.map((quote, index) => (
            <blockquote key={quote.name} className="quote-card" style={{ '--i': index } as React.CSSProperties}>
              <p>&ldquo;{quote.content}&rdquo;</p>
              <footer>
                <cite>{quote.name}</cite>
                <span>{quote.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
