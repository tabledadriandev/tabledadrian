'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'tda-cookie-consent'
type Consent = 'unknown' | 'accepted' | 'essential'

const ConsentContext = createContext<{
  consent: Consent
  ready: boolean
  accept: () => void
  essential: () => void
}>({
  consent: 'unknown',
  ready: false,
  accept: () => {},
  essential: () => {},
})

export function useConsent() {
  return useContext(ConsentContext)
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent>('unknown')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'accepted' || stored === 'essential') {
      setConsent(stored)
    }
    setReady(true)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.cookieBanner = ready && consent === 'unknown' ? '1' : '0'
  }, [ready, consent])

  const persist = (value: Exclude<Consent, 'unknown'>) => {
    window.localStorage.setItem(STORAGE_KEY, value)
    setConsent(value)
  }

  return (
    <ConsentContext.Provider
      value={{
        consent,
        ready,
        accept: () => persist('accepted'),
        essential: () => persist('essential'),
      }}
    >
      {children}
    </ConsentContext.Provider>
  )
}
