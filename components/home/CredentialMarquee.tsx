'use client'

import { Marquee } from '@/components/motion/Marquee'
import { copy } from '@/lib/copy'
import { useLocale } from '@/lib/i18n'

export function CredentialMarquee() {
  const locale = useLocale()
  return <Marquee items={[...copy[locale].marquee]} />
}
