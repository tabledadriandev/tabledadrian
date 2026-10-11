'use client'

import { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

/** A gold hairline that draws itself down the left margin as the page is read. */
export function ProgressThread() {
  const root = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const line = el.querySelector<HTMLElement>('.thread-line')
      const bead = el.querySelector<HTMLElement>('.thread-bead')
      if (!line || !bead) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.set(line, { scaleY: 0 })
      const st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        refreshPriority: -2,
        onUpdate: (self) => {
          const p = self.progress
          if (reduce) {
            gsap.set(line, { scaleY: p })
            gsap.set(bead, { y: p * window.innerHeight })
          } else {
            gsap.to(line, { scaleY: p, duration: 0.5, ease: 'power3.out', overwrite: true })
            gsap.to(bead, { y: p * window.innerHeight, duration: 0.5, ease: 'power3.out', overwrite: true })
          }
        },
      })
      return () => st.kill()
    },
    { scope: root, dependencies: [pathname], revertOnUpdate: true }
  )

  if (pathname.startsWith('/sola')) return null

  return (
    <div ref={root} className="progress-thread" aria-hidden="true">
      <span className="thread-track" />
      <span className="thread-line" />
      <span className="thread-bead" />
    </div>
  )
}
