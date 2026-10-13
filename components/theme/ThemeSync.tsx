'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { applyTheme, readThemeChoice } from './theme'

/** Keeps the boot-time theme in step with the system preference, other tabs, and route changes. */
export function ThemeSync() {
  const pathname = usePathname()

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => applyTheme(readThemeChoice())
    sync()
    media.addEventListener('change', sync)
    window.addEventListener('storage', sync)
    return () => {
      media.removeEventListener('change', sync)
      window.removeEventListener('storage', sync)
    }
  }, [pathname])

  return null
}
