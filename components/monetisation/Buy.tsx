import { COMING_SOON } from '@/lib/view-copy'

export function Buy({ href, label, locale, className = 'paywall-cta' }: { href: string | null; label: string; locale: 'en' | 'fr'; className?: string }) {
  if (href) {
    return (
      <a href={href} className={className} rel="nofollow noopener noreferrer" target="_blank">
        {label}
      </a>
    )
  }
  return (
    <span className={className} aria-disabled="true">
      {COMING_SOON[locale]}
    </span>
  )
}
