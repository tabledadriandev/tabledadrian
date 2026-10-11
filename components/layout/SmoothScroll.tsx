'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
      autoRaf: false,
      stopInertiaOnNavigate: true,
    })

    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const onRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', onRefresh)

    const fonts = document.fonts?.ready.then(() => ScrollTrigger.refresh())

    const observer = new MutationObserver(() => {
      const locked = document.body.style.overflow === 'hidden'
      if (locked) lenis.stop()
      else lenis.start()
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] })

    return () => {
      observer.disconnect()
      void fonts
      ScrollTrigger.removeEventListener('refresh', onRefresh)
      gsap.ticker.remove(ticker)
      lenis.destroy()
      if (window.__lenis === lenis) delete window.__lenis
    }
  }, [])

  return <>{children}</>
}
