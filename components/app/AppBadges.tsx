import { APP_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface AppBadgesProps {
  tone?: 'ink' | 'light'
  size?: 'sm' | 'md'
  className?: string
}

function StoreBadge({
  href,
  label,
  size,
  src,
  width,
  height,
}: {
  href: string
  label: string
  size: 'sm' | 'md'
  src: string
  width: number
  height: number
}) {
  const h = size === 'sm' ? 40 : 48
  const w = Math.round((width / height) * h)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 transition-opacity hover:opacity-90"
      aria-label={label}
    >
      {/* Official Apple store artwork */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} width={w} height={h} className="h-full w-auto" style={{ height: h, width: w }} />
    </a>
  )
}

function WaitlistLink({ size }: { size: 'sm' | 'md' }) {
  return (
    <a
      href={APP_LINKS.waitlist}
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-ink-foreground/30 bg-ink font-medium shadow-soft transition-colors duration-200',
        '!text-ink-foreground !no-underline',
        'hover:border-ink-foreground/80 hover:bg-ink-soft hover:!text-ink-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        size === 'sm' ? 'h-9 px-4 text-sm' : 'h-11 px-6 text-sm'
      )}
    >
      Join the waitlist
    </a>
  )
}

export function AppBadges({ tone = 'ink', size = 'md', className }: AppBadgesProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {APP_LINKS.appStore ? (
        <StoreBadge
          href={APP_LINKS.appStore}
          label="Download on the App Store"
          size={size}
          src={tone === 'light' ? '/badges/app-store-white.svg' : '/badges/app-store.svg'}
          width={120}
          height={40}
        />
      ) : (
        <WaitlistLink size={size} />
      )}
    </div>
  )
}
