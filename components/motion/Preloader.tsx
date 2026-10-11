'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type Phase = 'hold' | 'leave' | 'done'

/**
 * First-visit mark. Hold plus exit stays under 1.5s.
 * Later navigations in the same tab skip it.
 */
export function Preloader() {
  const [phase, setPhase] = useState<Phase>('hold')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    try {
      if (sessionStorage.getItem('tda-introduced') === '1') {
        setPhase('done')
        return
      }
    } catch {
      /* private mode */
    }

    const hold = reduce ? 180 : 880
    const exit = reduce ? 180 : 420
    const leaveTimer = window.setTimeout(() => setPhase('leave'), hold)
    const doneTimer = window.setTimeout(() => {
      try {
        sessionStorage.setItem('tda-introduced', '1')
      } catch {
        /* ignore */
      }
      setPhase('done')
    }, hold + exit)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(doneTimer)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      className={cn('preloader', phase === 'leave' && 'is-leaving')}
      aria-hidden="true"
    >
      <div className="preloader-inner">
        <p className="preloader-name">Table d&apos;Adrian</p>
        <span className="preloader-rule" />
      </div>
    </div>
  )
}
