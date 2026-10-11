'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { getMotionCaps } from '@/lib/motion-caps'
import { onScrollVelocity } from '@/lib/scroll-velocity'
import { cn } from '@/lib/utils'

interface Mote {
  x: number
  y: number
  r: number
  depth: number
  rise: number
  phase: number
  sway: number
  glow: boolean
}

function makeSprite(radius: number, soft: boolean) {
  const size = Math.ceil(radius * 2)
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, soft ? 'hsla(40, 70%, 78%, 0.55)' : 'hsla(42, 80%, 84%, 1)')
  g.addColorStop(soft ? 0.4 : 0.35, soft ? 'hsla(36, 56%, 60%, 0.18)' : 'hsla(36, 60%, 62%, 0.65)')
  g.addColorStop(1, 'hsla(36, 46%, 56%, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return canvas
}

/** Gold dust for the ink sections: a 2D canvas that only runs while on screen. */
export function DustField({ density = 70, className }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const caps = getMotionCaps()
    const count = caps.tier === 'full' ? density : Math.round(density * 0.34)
    const dpr = Math.min(window.devicePixelRatio || 1, caps.tier === 'full' ? 1.5 : 1)
    const dot = makeSprite(12, false)
    const bokeh = makeSprite(48, true)
    let w = 0
    let h = 0
    let motes: Mote[] = []
    let scrollKick = 0
    let pointerX = 0
    let pointerY = 0

    const seed = () => {
      motes = Array.from({ length: count }, (_, i) => {
        const depth = Math.random()
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.5 + depth * 1.9,
          depth,
          rise: 6 + depth * 22,
          phase: Math.random() * Math.PI * 2,
          sway: 6 + Math.random() * 18,
          glow: i % 11 === 0,
        }
      })
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = Math.max(1, rect.width)
      h = Math.max(1, rect.height)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    let t = 0
    const draw = (dt: number) => {
      t += dt
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      for (const m of motes) {
        m.y -= (m.rise + scrollKick * m.depth) * dt
        if (m.y < -20) {
          m.y = h + 20
          m.x = Math.random() * w
        } else if (m.y > h + 20) {
          m.y = -20
        }
        const px = m.x + Math.sin(t * 0.4 + m.phase) * m.sway + pointerX * m.depth * 26
        const py = m.y + pointerY * m.depth * 18
        const twinkle = 0.45 + 0.55 * Math.abs(Math.sin(t * (0.6 + m.depth) + m.phase))
        if (m.glow) {
          ctx.globalAlpha = 0.16 + 0.12 * twinkle
          const s = 26 + m.depth * 40
          ctx.drawImage(bokeh, px - s / 2, py - s / 2, s, s)
        }
        ctx.globalAlpha = (0.25 + m.depth * 0.6) * twinkle
        const s = m.r * 6
        ctx.drawImage(dot, px - s / 2, py - s / 2, s, s)
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }

    resize()
    if (caps.reduce) {
      draw(0)
      return
    }

    let running = false
    const tick = (_time: number, deltaMs: number) => {
      scrollKick *= 0.92
      draw(Math.min(deltaMs, 50) / 1000)
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        gsap.ticker.add(tick)
      } else if (!entry.isIntersecting && running) {
        running = false
        gsap.ticker.remove(tick)
      }
    })
    io.observe(canvas)
    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)
    const stopVelocity = onScrollVelocity((v) => {
      if (running) scrollKick = gsap.utils.clamp(-260, 260, v * 0.12)
    })
    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX / window.innerWidth - 0.5
      pointerY = event.clientY / window.innerHeight - 0.5
    }
    if (caps.fine) window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      io.disconnect()
      ro.disconnect()
      stopVelocity()
      window.removeEventListener('pointermove', onMove)
      if (running) gsap.ticker.remove(tick)
    }
  }, [density])

  return <canvas ref={ref} className={cn('dust-field', className)} aria-hidden="true" />
}
