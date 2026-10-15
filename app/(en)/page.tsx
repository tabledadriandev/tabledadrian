import type { Metadata } from 'next'
import { HybridPage } from '@/components/home/HybridPage'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      en: `${SITE_URL}/`,
      fr: `${SITE_URL}/fr`,
      'x-default': `${SITE_URL}/`,
    },
  },
}

export default function Home() {
  return <HybridPage />
}
