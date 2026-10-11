'use client'

import { gsap, SplitText, useGSAP } from '@/lib/gsap'

export function SolaMotion() {
  useGSAP(() => {
    const root = document.getElementById('sola-root')
    const heading = root?.querySelector('h1')
    if (!heading) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let split: SplitText | null = null
    let cancelled = false
    const run = () => {
      if (cancelled) return
      split = SplitText.create(heading, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.05,
        stagger: 0.07,
        ease: 'power4.out',
        delay: 0.15,
      })
      const lines = root?.querySelectorAll('article > p, article > h2, article > div')
      if (lines?.length) {
        gsap.from(lines, {
          y: 18,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.35,
        })
      }
    }
    document.fonts?.ready.then(run)
    return () => {
      cancelled = true
      split?.revert()
    }
  }, [])

  return null
}
