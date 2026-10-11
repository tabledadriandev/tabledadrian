'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    const label = labelRef.current
    if (!ring || !dot || !label) return

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    document.documentElement.classList.add('has-fine-cursor')
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' })
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' })

    const onMove = (event: PointerEvent) => {
      xRing(event.clientX)
      yRing(event.clientY)
      xDot(event.clientX)
      yDot(event.clientY)
    }

    const onOver = (event: Event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const hot = target.closest('a, button, [data-cursor], summary, label')
      const named = target.closest<HTMLElement>('[data-cursor]')?.dataset.cursor
      ring.classList.toggle('is-hot', Boolean(hot))
      ring.classList.toggle('has-label', Boolean(named))
      dot.classList.toggle('is-hidden', Boolean(named))
      if (named && label.textContent !== named) label.textContent = named
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    return () => {
      document.documentElement.classList.remove('has-fine-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
