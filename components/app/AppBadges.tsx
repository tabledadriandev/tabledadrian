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
  href: string | null
  label: string
  size: 'sm' | 'md'
  src: string
  width: number
  height: number
}) {
  const h = size === 'sm' ? 40 : 48
  const w = Math.round((width / height) * h)
  const shell = cn('inline-flex shrink-0 transition-opacity', href ? 'hover:opacity-90' : 'cursor-default')

  const image = (
    // Official Apple / Google store artwork
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={label} width={w} height={h} className="h-full w-auto" style={{ height: h, width: w }} />
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={shell} aria-label={label}>
        {image}
      </a>
    )
  }

  return (
    <span className={shell} aria-label={`${label} coming soon`}>
      {image}
    </span>
  )
}

export function AppBadges({ tone = 'ink', size = 'md', className }: AppBadgesProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <StoreBadge
        href={APP_LINKS.appStore}
        label="Download on the App Store"
        size={size}
        src={tone === 'light' ? '/badges/app-store-white.svg' : '/badges/app-store.svg'}
        width={120}
        height={40}
      />
      <StoreBadge
        href={APP_LINKS.playStore}
        label="Get it on Google Play"
        size={size}
        src="/badges/google-play.png"
        width={563}
        height={168}
      />
    </div>
  )
}
