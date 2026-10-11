'use client'

import { usePathname } from 'next/navigation'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap'
import { getMotionCaps } from '@/lib/motion-caps'
import { onScrollVelocity } from '@/lib/scroll-velocity'

const IVORY = {
  '--background': '40 36% 93%',
  '--background-secondary': '36 18% 89%',
  '--foreground': '28 12% 10%',
  '--foreground-muted': '28 8% 27%',
  '--foreground-subtle': '28 6% 34%',
  '--border': '34 14% 78%',
  '--border-strong': '32 12% 58%',
}

const INK = {
  '--background': '28 14% 6%',
  '--background-secondary': '28 14% 6%',
  '--foreground': '40 36% 93%',
  '--foreground-muted': '40 18% 76%',
  '--foreground-subtle': '40 12% 68%',
  '--border': '40 8% 22%',
  '--border-strong': '40 8% 40%',
}

const CLIP_FROM: Record<string, string> = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  iris: 'inset(18% 18% 18% 18%)',
}

function formatter(sample: string) {
  const decimals = (sample.split('.')[1] || '').length
  const grouping = sample.includes(',')
  return (value: number) =>
    value.toLocaleString('en-GB', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: grouping,
    })
}

/**
 * Wires `data-*` motion hooks inside <main> for the current route. Markup stays fully visible without it.
 */
export function MotionDirector({ firstPaint, curtain }: { firstPaint: boolean; curtain: boolean }) {
  const pathname = usePathname()

  useGSAP(
    () => {
      if (pathname.startsWith('/sola')) return
      const main = document.getElementById('main')
      if (!main) return
      const caps = getMotionCaps()
      const vh = window.innerHeight
      const entryDelay = curtain ? 0.55 : 0.15
      const inView = (el: Element) => el.getBoundingClientRect().top < vh * 0.95
      const skipEntry = (el: Element) => firstPaint && inView(el)
      const all = (selector: string) => Array.from(main.querySelectorAll<HTMLElement>(selector))
      const cleanups: Array<() => void> = []

      all('[data-split]').forEach((el) => {
        if (skipEntry(el)) return
        const visibleNow = inView(el)
        if (caps.reduce) {
          gsap.from(el, {
            autoAlpha: 0,
            duration: 0.7,
            delay: visibleNow ? entryDelay : 0,
            scrollTrigger: visibleNow ? undefined : { trigger: el, start: 'top 88%', once: true },
          })
          return
        }
        const chars = el.dataset.split === 'chars'
        SplitText.create(el, {
          type: chars ? 'lines,words,chars' : 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit(self) {
            return gsap.from(chars ? self.chars : self.lines, {
              yPercent: 118,
              rotate: chars ? 7 : 0,
              transformOrigin: '0% 100%',
              duration: chars ? 1.15 : 1.2,
              stagger: chars ? 0.024 : 0.09,
              ease: 'expo.out',
              delay: visibleNow ? entryDelay : 0,
              scrollTrigger: visibleNow ? undefined : { trigger: el, start: 'top 86%', once: true },
            })
          },
        })
      })

      all('[data-reveal]').forEach((el) => {
        if (skipEntry(el)) return
        const from = CLIP_FROM[el.dataset.reveal || 'up'] ?? CLIP_FROM.up
        const img = el.hasAttribute('data-parallax') ? null : el.querySelector('img')
        if (caps.reduce) {
          gsap.from(el, { autoAlpha: 0, duration: 0.7, scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
          return
        }
        if (inView(el)) {
          gsap.fromTo(el, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', delay: entryDelay })
          if (img) gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'expo.out', delay: entryDelay })
          return
        }
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 94%', end: 'top 38%', scrub: caps.tier === 'full' ? 0.9 : true },
        })
        tl.fromTo(el, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' })
        if (img) tl.fromTo(img, { scale: 1.32 }, { scale: 1, ease: 'none' }, 0)
      })

      if (!caps.reduce) {
        all('[data-parallax]').forEach((el) => {
          const target = el.querySelector<HTMLElement>('[data-parallax-target]') ?? el.querySelector('img')
          if (!target) return
          const amount = Number(el.dataset.parallax) || 9
          gsap.set(target, { scale: 1 + amount / 50 })
          gsap.fromTo(
            target,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          )
        })

        all('[data-speed]').forEach((el) => {
          const speed = Number(el.dataset.speed) || 0.2
          gsap.fromTo(
            el,
            { y: speed * 160 },
            {
              y: -speed * 160,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          )
        })
      }

      all('[data-count]').forEach((el) => {
        const text = (el.textContent || '').trim()
        const match = text.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/)
        if (!match || caps.reduce || skipEntry(el)) return
        const [, prefix, digits, suffix] = match
        const target = parseFloat(digits.replace(/,/g, ''))
        const format = formatter(digits)
        const width = el.getBoundingClientRect().width
        el.style.display = 'inline-block'
        el.style.minWidth = `${Math.ceil(width)}px`
        el.style.fontVariantNumeric = 'tabular-nums'
        const label = document.createElement('span')
        label.className = 'sr-only'
        label.textContent = text
        el.setAttribute('aria-hidden', 'true')
        el.after(label)
        const counter = { value: 0 }
        const render = () => {
          el.textContent = `${prefix}${format(counter.value)}${suffix}`
        }
        render()
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              value: target,
              duration: 1.9,
              delay: inView(el) ? entryDelay : 0,
              ease: 'power3.out',
              onUpdate: render,
            })
          },
        })
        cleanups.push(() => {
          st.kill()
          label.remove()
          el.removeAttribute('aria-hidden')
          el.textContent = text
          el.style.removeProperty('min-width')
          el.style.removeProperty('display')
          el.style.removeProperty('font-variant-numeric')
        })
      })

      all('[data-rise]').forEach((group) => {
        if (skipEntry(group)) return
        const items = group.children.length ? Array.from(group.children) : [group]
        gsap.from(items, {
          y: caps.reduce ? 0 : Number(group.dataset.rise) || 44,
          autoAlpha: 0,
          duration: caps.reduce ? 0.6 : 1.1,
          ease: 'expo.out',
          stagger: 0.08,
          delay: inView(group) ? entryDelay : 0,
          scrollTrigger: inView(group) ? undefined : { trigger: group, start: 'top 88%', once: true },
        })
      })

      all('[data-rule]').forEach((rule) => {
        if (caps.reduce || skipEntry(rule)) return
        gsap.from(rule, {
          scaleX: 0,
          transformOrigin: rule.dataset.rule === 'right' ? '100% 50%' : '0% 50%',
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: rule, start: 'top 92%', once: true },
        })
      })

      if (caps.tier === 'full') {
        const skews = all('[data-skew]').map((el) => ({
          skew: gsap.quickTo(el, 'skewY', { duration: 0.7, ease: 'power3.out' }),
          lift: gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' }),
          amount: Number(el.dataset.skew) || 1,
        }))
        if (skews.length) {
          cleanups.push(
            onScrollVelocity((v) => {
              const k = gsap.utils.clamp(-1, 1, v / 2600)
              skews.forEach((s) => {
                s.skew(k * 4 * s.amount)
                s.lift(k * -8 * s.amount)
              })
            })
          )
        }
      }

      if (!caps.reduce && !caps.lowEnd) {
        all('[data-tone]').forEach((el) => {
          const tones = (el.dataset.tone || '').split(' ')
          if (tones.includes('in')) {
            gsap.fromTo(el, { ...INK }, {
              ...IVORY,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 96%', end: 'top 28%', scrub: true },
            })
          }
          if (tones.includes('out')) {
            gsap.fromTo(el, { ...IVORY }, {
              ...INK,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: { trigger: el, start: 'bottom 72%', end: 'bottom 12%', scrub: true },
            })
          }
        })
      }

      const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 60)
      return () => {
        window.clearTimeout(refresh)
        cleanups.forEach((fn) => fn())
      }
    }
  )

  return null
}
