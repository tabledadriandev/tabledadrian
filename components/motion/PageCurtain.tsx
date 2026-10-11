'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from '@/lib/gsap'
import { getLenis } from '@/lib/lenis'

let covering = false

/** True while the curtain hides a route change; the incoming page lets it lift instead of fading. */
export function isCurtainCovering() {
  return covering
}

export function PageCurtain() {
  const router = useRouter()
  const pathname = usePathname()
  const root = useRef<HTMLDivElement>(null)
  const pending = useRef<{ hash: boolean; timer: number } | null>(null)
  const liftRef = useRef<(scrollTop: boolean) => void>()

  useEffect(() => {
    const el = root.current
    if (!el) return
    const panels = el.querySelectorAll<HTMLElement>('.curtain-panel')
    const mark = el.querySelector<HTMLElement>('.curtain-mark')
    const rule = el.querySelector<HTMLElement>('.curtain-rule')

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest('a')
      if (!anchor || !anchor.href) return
      if ((anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname) return
      if (/\.[a-z0-9]{2,5}$/i.test(url.pathname) || url.pathname.startsWith('/api')) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (covering) {
        event.preventDefault()
        return
      }

      event.preventDefault()
      covering = true
      const toSola = url.pathname.startsWith('/sola') || window.location.pathname.startsWith('/sola')
      el.dataset.tone = toSola ? 'sola' : 'maison'
      el.dataset.state = 'on'
      gsap.killTweensOf([panels, mark, rule])
      gsap
        .timeline({
          onComplete: () => {
            router.push(url.pathname + url.search + url.hash)
            pending.current = {
              hash: Boolean(url.hash),
              timer: window.setTimeout(() => lift(false), 5000),
            }
          },
        })
        .fromTo(panels, { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: 'expo.inOut', stagger: 0.09 })
        .fromTo(mark, { autoAlpha: 0, yPercent: 40 }, { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: 'power3.out' }, 0.42)
        .fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power3.inOut' }, 0.5)
    }

    const lift = (scrollTop: boolean) => {
      if (pending.current) window.clearTimeout(pending.current.timer)
      pending.current = null
      if (scrollTop) getLenis()?.scrollTo(0, { immediate: true, force: true })
      gsap
        .timeline({
          onComplete: () => {
            covering = false
            el.dataset.state = 'off'
          },
        })
        .to(mark, { autoAlpha: 0, yPercent: -30, duration: 0.35, ease: 'power2.in' })
        .to(rule, { scaleX: 0, transformOrigin: 'right', duration: 0.35, ease: 'power2.in' }, 0)
        .to([...panels].reverse(), { yPercent: -100, duration: 0.85, ease: 'expo.inOut', stagger: 0.08 }, 0.18)
        .set(rule, { transformOrigin: 'left' })
    }

    liftRef.current = lift
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [router])

  useEffect(() => {
    if (!pending.current) return
    const scrollTop = !pending.current.hash
    const frame = requestAnimationFrame(() => liftRef.current?.(scrollTop))
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return (
    <div ref={root} className="curtain" data-state="off" aria-hidden="true">
      <span className="curtain-panel is-gold" />
      <span className="curtain-panel is-ink">
        <span className="curtain-mark">
          <span className="curtain-word">Table d&apos;Adrian</span>
          <span className="curtain-rule" />
        </span>
      </span>
    </div>
  )
}
