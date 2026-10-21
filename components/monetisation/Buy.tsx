import { COMING_SOON } from '@/lib/view-copy'

export function Buy({ href, label, locale, className = 'paywall-cta' }: { href: string | null; label: string; locale: 'en' | 'fr'; className?: string }) {
  const arrow = className.includes('ed-pill') ? <span className="ed-arrow" aria-hidden="true">→</span> : null
  if (href) {
    return (
      <a href={href} className={className} rel="nofollow noopener noreferrer" target="_blank">
        <span>{label}</span>
        {arrow}
      </a>
    )
  }
  return (
    <span className={className} aria-disabled="true">
      <span>{COMING_SOON[locale]}</span>
    </span>
  )
}
