'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GALLERY } from '@/data/gallery'
import { gsap, useGSAP } from '@/lib/gsap'
import { getMotionCaps } from '@/lib/motion-caps'
import { onScrollVelocity } from '@/lib/scroll-velocity'
import { DustField } from '@/components/motion/DustField'

export function Gallery() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const row = track.current
        const pin = root.current
        if (!row || !pin) return
        const tween = gsap.to(row, {
          x: () => -(row.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${row.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        const plates = gsap.utils.toArray<HTMLElement>('.plate')
        plates.forEach((plate) => {
          const image = plate.querySelector('img')
          const caption = plate.querySelector('figcaption')
          if (caption) {
            gsap.from(caption.children, {
              yPercent: 60,
              autoAlpha: 0,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: plate,
                containerAnimation: tween,
                start: 'left 85%',
                end: 'left 45%',
                scrub: true,
              },
            })
          }
          if (!image) return
          gsap.fromTo(
            image,
            { scale: 1.16 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: plate,
                containerAnimation: tween,
                start: 'left right',
                end: 'center center',
                scrub: true,
              },
            }
          )
        })
        if (getMotionCaps().tier !== 'full') return
        const tilts = plates.map((plate) => ({
          skew: gsap.quickTo(plate, 'skewX', { duration: 0.7, ease: 'power3.out' }),
          turn: gsap.quickTo(plate, 'rotationY', { duration: 0.9, ease: 'power3.out' }),
        }))
        const stop = onScrollVelocity((v) => {
          const k = gsap.utils.clamp(-1, 1, v / 2400)
          tilts.forEach((t) => {
            t.skew(k * -7)
            t.turn(k * 10)
          })
        })
        return () => stop()
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section id="gallery" ref={root} className="gallery-pin relative bg-ink text-ink-foreground">
      <DustField density={60} />
      <div className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-24">
        <div className="container mb-8 flex flex-col items-start justify-between gap-6 md:mb-10 md:flex-row md:items-end">
          <h2 className="display max-w-xl text-4xl sm:text-6xl" data-split="chars">
            Plates from Adrian&apos;s table.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/gallery" className="maison-link">
              Full gallery <ArrowRight size={14} />
            </Link>
            <Link href="/menus" className="maison-link is-quiet">
              The menus
            </Link>
          </div>
        </div>
        <div ref={track} className="plate-track">
          {GALLERY.map((image) => (
            <Link key={image.id} href="/gallery" tabIndex={-1} className="plate" data-cursor="View">
              <figure className="plate-frame" data-distort>
                <Image
                  src={image.src}
                  alt={image.caption}
                  fill
                  sizes="(max-width: 768px) 82vw, 42vw"
                  className="object-cover"
                />
                <figcaption>
                  <span>{image.title}</span>
                  <small>{image.caption}</small>
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
