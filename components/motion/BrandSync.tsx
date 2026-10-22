'use client'

import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'

export function BrandSync() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    const brand = pathname.startsWith('/sola') || pathname.startsWith('/fr/sola') ? 'sola' : 'maison'
    document.documentElement.dataset.brand = brand
  }, [pathname])

  return null
}
