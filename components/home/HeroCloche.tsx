'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import type { ClochePointer } from './HeroClocheScene'

const HeroClocheScene = dynamic(() => import('./HeroClocheScene'), { ssr: false })

function ClocheStill() {
  return (
    <svg className="cloche-still" viewBox="0 0 640 520" role="img" aria-label="Gold cloche on an ivory plate">
      <defs>
        <radialGradient id="clocheGlow" cx="50%" cy="42%" r="48%">
          <stop offset="0%" stopColor="#f0d7a2" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#c6a15e" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#c6a15e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="clocheGold" x1="18%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#f6e7c4" />
          <stop offset="38%" stopColor="#d4b06a" />
          <stop offset="100%" stopColor="#8d692f" />
        </linearGradient>
        <linearGradient id="plateIvory" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffaf3" />
          <stop offset="100%" stopColor="#e6d8c0" />
        </linearGradient>
      </defs>
      <ellipse cx="320" cy="250" rx="210" ry="150" fill="url(#clocheGlow)" />
      <ellipse cx="320" cy="392" rx="168" ry="28" fill="#1c140e" opacity="0.18" />
      <ellipse cx="320" cy="378" rx="214" ry="40" fill="#6b512a" />
      <ellipse cx="320" cy="370" rx="198" ry="32" fill="url(#plateIvory)" stroke="#3e2d1b" strokeWidth="3" />
      <path
        d="M132 360 C132 230 210 150 320 150 C430 150 508 230 508 360 Z"
        fill="url(#clocheGold)"
      />
      <ellipse cx="320" cy="360" rx="188" ry="18" fill="#a68445" opacity="0.45" />
      <circle cx="320" cy="142" r="16" fill="url(#clocheGold)" stroke="#8d692f" strokeWidth="2" />
      <rect x="308" y="154" width="24" height="16" rx="4" fill="#c6a15e" />
      <path d="M168 250 C210 210 250 188 300 176" fill="none" stroke="#fff6e4" strokeOpacity="0.55" strokeWidth="10" strokeLinecap="round" />
    </svg>
  )
}

function useResolvedTone() {
  const [tone, setTone] = useState<'light' | 'dark'>('light')
  useEffect(() => {
    const read = () => setTone(document.documentElement.dataset.resolved === 'dark' ? 'dark' : 'light')
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-resolved'] })
    return () => observer.disconnect()
  }, [])
  return tone
}

export function HeroCloche() {
  const stage = useRef<HTMLDivElement>(null)
  const pointer = useRef<ClochePointer>({ x: 0, y: 0 })
  const [live, setLive] = useState(false)
  const [active, setActive] = useState(false)
  const tone = useResolvedTone()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
    const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4
    const saveData = Boolean(nav.connection?.saveData)
    let gl = false
    try {
      const canvas = document.createElement('canvas')
      gl = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    } catch {
      gl = false
    }
    if (reduce || saveData || lowMemory || !gl) return

    let cancelled = false
    const start = () => {
      if (!cancelled) setLive(true)
    }
    const idle = window.requestIdleCallback?.(start, { timeout: 1200 })
    const timer = idle === undefined ? window.setTimeout(start, 700) : undefined
    return () => {
      cancelled = true
      if (idle !== undefined) window.cancelIdleCallback?.(idle)
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const node = stage.current
    if (!node || !live) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && document.visibilityState === 'visible'),
      { threshold: 0.08 }
    )
    observer.observe(node)
    const onVis = () => setActive(document.visibilityState === 'visible' && node.getBoundingClientRect().bottom > 0)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [live])

  useEffect(() => {
    const node = stage.current
    if (!node || !live) return
    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      pointer.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }
    const onLeave = () => {
      pointer.current.x = 0
      pointer.current.y = 0
    }
    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)
    return () => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
    }
  }, [live])

  return (
    <div ref={stage} className="cloche-stage">
      <div className={live ? 'cloche-still-wrap is-covered' : 'cloche-still-wrap'} aria-hidden={live ? true : undefined}>
        <ClocheStill />
      </div>
      {live ? <HeroClocheScene tone={tone} pointer={pointer} active={active} /> : null}
    </div>
  )
}
