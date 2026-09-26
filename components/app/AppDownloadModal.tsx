'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X, Smartphone, Sparkles, Check } from 'lucide-react'
import { AppBadges } from './AppBadges'
import { APP_LINKS } from '@/lib/constants'

interface AppDownloadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  feature?: string
}

const perks = [
  'Log meals by photo, barcode or search',
  'Personal longevity score and daily insights',
  "Chef Adrian's recipes matched to your goals",
  'Sync your progress across devices',
]

export function AppDownloadModal({ open, onOpenChange, feature }: AppDownloadModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[80] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-card p-7 shadow-lift focus:outline-none data-[state=open]:animate-fade-in-up">
          <div className="flex items-start justify-between gap-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Smartphone size={22} />
            </div>
            <Dialog.Close
              className="rounded-full p-2 text-foreground-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
              aria-label="Close"
            >
              <X size={18} />
            </Dialog.Close>
          </div>

          <div className="mt-5">
            <span className="eyebrow eyebrow-center">
              <Sparkles size={12} className="text-primary" />
              Available in the app
            </span>
            <Dialog.Title className="display mt-3 text-3xl text-foreground">
              {feature ? `${feature} lives in the app` : 'Get the full experience'}
            </Dialog.Title>
            <Dialog.Description className="mt-3 text-sm leading-relaxed text-foreground-muted">
              This page is a preview. The {APP_LINKS.name} app unlocks the complete longevity coach,
              built around your goals and Chef Adrian&apos;s kitchen.
            </Dialog.Description>
          </div>

          <ul className="mt-5 space-y-2.5">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-sm text-foreground">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                  <Check size={12} />
                </span>
                {perk}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <AppBadges tone="ink" size="sm" />
            {!APP_LINKS.appStore && !APP_LINKS.playStore && (
              <p className="mt-3 text-xs text-foreground-subtle">
                The app is launching soon. In the meantime, explore this preview freely.
              </p>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
