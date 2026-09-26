'use client'

import { useState } from 'react'
import { Lock, Smartphone } from 'lucide-react'
import { AppDownloadModal } from './AppDownloadModal'
import { cn } from '@/lib/utils'

interface DemoLockProps {
  feature: string
  children: React.ReactNode
  className?: string
  /** How much of the underlying content is blurred. */
  blur?: 'sm' | 'md'
}

/**
 * Wraps a piece of UI that exists only in the mobile app. Renders the
 * children blurred and non-interactive with a call-to-action on top.
 */
export function DemoLock({ feature, children, className, blur = 'sm' }: DemoLockProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className={cn('relative overflow-hidden rounded-2xl', className)}>
        <div
          aria-hidden
          className={cn(
            'pointer-events-none select-none',
            blur === 'sm' ? 'blur-[3px]' : 'blur-md',
            'opacity-70'
          )}
        >
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-background/20 via-background/60 to-background/80 p-6">
          <button
            onClick={() => setOpen(true)}
            className="group flex max-w-xs flex-col items-center gap-3 rounded-2xl border border-border bg-card/95 px-6 py-5 text-center shadow-lift backdrop-blur transition-transform hover:-translate-y-0.5"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-ink-foreground">
              <Lock size={16} />
            </span>
            <span className="font-display text-xl text-foreground">{feature}</span>
            <span className="text-xs text-foreground-muted">Available in the app</span>
            <span className="mt-1 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors group-hover:bg-primary/90">
              <Smartphone size={14} />
              Download the app
            </span>
          </button>
        </div>
      </div>
      <AppDownloadModal open={open} onOpenChange={setOpen} feature={feature} />
    </>
  )
}
