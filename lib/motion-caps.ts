export type MotionTier = 'full' | 'lite' | 'reduced'

export interface MotionCaps {
  tier: MotionTier
  reduce: boolean
  fine: boolean
  mobile: boolean
  saveData: boolean
  lowEnd: boolean
  webgl: boolean
}

let cached: MotionCaps | null = null

function probeWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function getMotionCaps(): MotionCaps {
  if (typeof window === 'undefined') {
    return { tier: 'reduced', reduce: true, fine: false, mobile: true, saveData: false, lowEnd: true, webgl: false }
  }
  if (cached) return cached
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const mobile = window.matchMedia('(max-width: 1023px)').matches || !fine
  const saveData = Boolean(nav.connection?.saveData)
  const lowEnd =
    (typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4) || (navigator.hardwareConcurrency || 8) < 4
  const webgl = !reduce && probeWebGL()
  const tier: MotionTier = reduce ? 'reduced' : mobile || saveData || lowEnd ? 'lite' : 'full'
  cached = { tier, reduce, fine, mobile, saveData, lowEnd, webgl }
  return cached
}
