'use client'

import { gsap, ScrollTrigger } from '@/lib/gsap'

type Listener = (velocity: number) => void

const listeners = new Set<Listener>()
let smoothed = 0
let started = false

function start() {
  if (started || typeof window === 'undefined') return
  started = true
  let lastY = window.scrollY
  let lastT = performance.now()
  gsap.ticker.add(() => {
    const now = performance.now()
    const y = window.scrollY
    const dt = Math.max(1, now - lastT)
    const raw = ((y - lastY) / dt) * 1000
    lastY = y
    lastT = now
    smoothed += (raw - smoothed) * 0.18
    if (Math.abs(smoothed) < 0.5) smoothed = 0
    if (!listeners.size) return
    listeners.forEach((fn) => fn(smoothed))
  })
  ScrollTrigger.addEventListener('refresh', () => {
    lastY = window.scrollY
  })
}

/** Subscribes to a smoothed scroll velocity in px/s, sampled on the GSAP ticker. */
export function onScrollVelocity(fn: Listener) {
  start()
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}
