'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { WHATSAPP_URL } from '@/lib/constants'
import { useLocale } from '@/lib/i18n'

function coversAControl(float: HTMLAnchorElement) {
  const box = float.getBoundingClientRect()
  const pad = 16
  const zone = { left: box.left - pad, right: box.right + pad, top: box.top - pad, bottom: box.bottom + pad }
  const nodes = document.querySelectorAll('a, button')
  for (const node of nodes) {
    if (node === float || float.contains(node)) continue
    const rect = node.getBoundingClientRect()
    if (rect.width < 8 || rect.height < 8) continue
    if (rect.bottom < zone.top || rect.top > zone.bottom || rect.right < zone.left || rect.left > zone.right) continue
    const style = getComputedStyle(node)
    if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) continue
    if (style.pointerEvents === 'none') continue
    return true
  }
  return false
}

export function WhatsAppFloat() {
  const locale = useLocale()
  const pathname = usePathname()
  const ref = useRef<HTMLAnchorElement>(null)
  const [away, setAway] = useState(false)
  const label = locale === 'fr' ? 'Écrire sur WhatsApp' : 'Message on WhatsApp'

  useEffect(() => {
    const float = ref.current
    if (!float) return
    let frame = 0
    const measure = () => {
      frame = 0
      setAway(coversAControl(float))
    }
    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname])

  return (
    <a
      ref={ref}
      href={WHATSAPP_URL}
      className={`ed-wa-float${away ? ' is-away' : ''}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      tabIndex={away ? -1 : undefined}
    >
      <span className="ed-wa-ico" aria-hidden="true" />
    </a>
  )
}

export function WhatsAppEnquiry({ className = '' }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_URL}
      className={`inline-flex h-12 w-full items-center justify-center rounded-full border border-border-strong text-sm font-medium text-foreground transition-colors hover:bg-background-secondary ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      WhatsApp
    </a>
  )
}
