'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { ScrollTrigger } from '@/lib/gsap'
import { getMotionCaps } from '@/lib/motion-caps'
import { cn } from '@/lib/utils'
import type { ClocheSignal } from './ClocheScene'

const ClocheScene = dynamic(() => import('./ClocheScene'), { ssr: false })

function ClocheLines() {
  return (
    <svg viewBox="0 0 240 180" className="cloche-lines" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" vectorEffect="non-scaling-stroke">
        <path pathLength={1} d="M34 128 C34 70 74 34 120 34 C166 34 206 70 206 128" />
        <path pathLength={1} d="M24 130 L216 130" />
        <path pathLength={1} d="M10 142 C40 152 200 152 230 142" />
        <path pathLength={1} d="M54 112 C62 82 84 60 112 52" opacity="0.55" />
        <circle pathLength={1} cx="120" cy="26" r="7" />
        <path pathLength={1} d="M114 33 L126 33" />
      </g>
    </svg>
  )
}

/** A slow-floating gold cloche. WebGL on capable desktops, a fine line drawing everywhere else. */
export function FloatingCloche({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const signal = useRef<ClocheSignal>({ lift: 0, pointerX: 0, pointerY: 0 })
  const [mode, setMode] = useState<'lines' | 'webgl'>('lines')
  const [near, setNear] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const caps = getMotionCaps()
    if (caps.tier === 'full' && caps.webgl) setMode('webgl')

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true)
        setActive(entry.isIntersecting)
      },
      { rootMargin: '300px' }
    )
    io.observe(el)

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      end: 'center 35%',
      scrub: true,
      refreshPriority: -1,
      onUpdate: (self) => {
        signal.current.lift = self.progress
        el.style.setProperty('--lift', String(self.progress))
      },
    })
    const onMove = (event: PointerEvent) => {
      signal.current.pointerX = event.clientX / window.innerWidth - 0.5
      signal.current.pointerY = event.clientY / window.innerHeight - 0.5
    }
    if (caps.fine && !caps.reduce) window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      io.disconnect()
      st.kill()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div ref={root} className={cn('cloche', className)} data-mode={mode} aria-hidden="true">
      {mode === 'webgl' && near ? <ClocheScene signal={signal} active={active} /> : <ClocheLines />}
    </div>
  )
}
