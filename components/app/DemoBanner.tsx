'use client'

import { useState } from 'react'
import { Smartphone, ArrowRight } from 'lucide-react'
import { AppDownloadModal } from './AppDownloadModal'
import { cn } from '@/lib/utils'

interface DemoBannerProps {
  className?: string
  label?: string
}

export function DemoBanner({ className, label = 'You are viewing a demo' }: DemoBannerProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className={cn(
          'flex flex-col items-center justify-between gap-3 rounded-2xl border border-gold/30 bg-gold-soft/60 px-4 py-3 sm:flex-row sm:px-5',
          className
        )}
        role="status"
      >
        <div className="flex items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[10px] font-medium uppercase tracking-caps text-ink-foreground">
            Demo
          </span>
          <span className="text-foreground">
            {label}
            <span className="hidden text-foreground-muted sm:inline">
              {' '}
              - for the full experience, download our app.
            </span>
          </span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-primary"
        >
          <Smartphone size={16} />
          Get the app
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      <AppDownloadModal open={open} onOpenChange={setOpen} />
    </>
  )
}
