import type Lenis from 'lenis'

export function getLenis(): Lenis | undefined {
  if (typeof window === 'undefined') return undefined
  return window.__lenis
}

declare global {
  interface Window {
    __lenis?: Lenis
  }
}
