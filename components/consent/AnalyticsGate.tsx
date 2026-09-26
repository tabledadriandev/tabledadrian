'use client'

import { Analytics } from '@vercel/analytics/react'
import { useConsent } from './ConsentProvider'

export function AnalyticsGate() {
  const { consent } = useConsent()
  if (consent !== 'accepted') return null
  return <Analytics />
}
