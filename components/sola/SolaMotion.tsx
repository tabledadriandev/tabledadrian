'use client'

import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap'

export function SolaMotion() {
  useGSAP((_, contextSafe) => {
    const root = document.getElementById('sola-root')
    const heading = root?.querySelector('h1')
    if (!root || !heading) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const blocks = Array.from(
      root.querySelectorAll<HTMLElement>('h1 + p, .label-line, article > p, article > h2, article > div')
    )

    if (reduce) {
      ScrollTrigger.batch(blocks, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => gsap.from(batch, { autoAlpha: 0, duration: 0.6, stagger: 0.05 }),
      })
      return
    }

    let split: SplitText | null = null
    let cancelled = false
    const run = contextSafe!(() => {
      if (cancelled) return
      split = SplitText.create(heading, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.05,
        stagger: 0.07,
        ease: 'power4.out',
        delay: 0.15,
      })
      gsap.set(blocks, { autoAlpha: 0, y: 14 })
      ScrollTrigger.batch(blocks, {
        start: 'top 94%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.07,
            ease: 'power2.out',
            delay: batch.some((el) => el.getBoundingClientRect().top < window.innerHeight * 0.6) ? 0.35 : 0,
          }),
      })
    })
    document.fonts?.ready.then(run)
    return () => {
      cancelled = true
      split?.revert()
    }
  }, [])

  return null
}
