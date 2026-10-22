import Image from 'next/image'
import Link from 'next/link'

const LOCKUP = '/brand/svg/tabledadrian_lockup-horizontal_gold-transparent.svg'

export function BrandLockup({ className = '', label = "Table d'Adrian" }: { className?: string; label?: string }) {
  return (
    <span className={`ed-lockup ${className}`.trim()}>
      <Image className="ed-lockup-img" src={LOCKUP} alt={label} width={124} height={60} unoptimized />
      <span className="ed-lockup-dark" aria-hidden="true" />
    </span>
  )
}

export function LemonSymbol({ className = '' }: { className?: string }) {
  return <span className={`ed-symbol ${className}`.trim()} aria-hidden="true" />
}

const LINE_ICONS = {
  mail: '/editorial/icons/mail.svg',
  instagram: '/editorial/icons/instagram.svg',
  whatsapp: '/editorial/icons/whatsapp.svg',
  calendar: '/editorial/icons/calendar.svg',
  close: '/editorial/icons/close.svg',
  sun: '/editorial/icons/sun.svg',
  moon: '/editorial/icons/moon.svg',
  system: '/editorial/icons/system.svg',
  minus: '/editorial/icons/minus.svg',
  plus: '/editorial/icons/plus.svg',
  coastline: '/editorial/icons/coastline.svg',
  north: '/editorial/icons/north.svg',
} as const

export function LineIcon({ name, size = 16 }: { name: keyof typeof LINE_ICONS; size?: number }) {
  const url = `url(${LINE_ICONS[name]})`
  return (
    <span
      className="ed-ico"
      style={{ width: size, height: size, WebkitMaskImage: url, maskImage: url }}
      aria-hidden="true"
    />
  )
}

type PillTone = 'outline' | 'filled' | 'light' | 'brass'

export function Pill({
  href,
  children,
  tone = 'outline',
  external = false,
}: {
  href: string
  children: React.ReactNode
  tone?: PillTone
  external?: boolean
}) {
  const className = `ed-pill ed-pill-${tone}`
  const inner = (
    <>
      <span>{children}</span>
      <span className="ed-arrow" aria-hidden="true">→</span>
    </>
  )
  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }
  return (
    <Link className={className} href={href}>
      {inner}
    </Link>
  )
}

export function CapsLink({
  href,
  children,
  external = false,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) {
  if (external) {
    return (
      <a className="ed-caps" href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link className="ed-caps" href={href}>
      {children}
    </Link>
  )
}

export function EmLast({ text }: { text: string }) {
  const words = text.trim().split(/\s+/)
  if (words.length < 2) return <>{text}</>
  const last = words.pop()
  return (
    <>
      {words.join(' ')} <em>{last}</em>
    </>
  )
}

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="ed-kicker">
      <span>{index}</span>
      <i aria-hidden="true" />
      <span className="ed-kicker-name">{children}</span>
    </p>
  )
}

export function Callout({
  lines,
  direction,
}: {
  lines: [string, string]
  direction: 'left' | 'right'
}) {
  return (
    <p className={`ed-callout ed-callout-${direction}`}>
      {direction === 'right' ? (
        <>
          <span className="ed-callout-dot" aria-hidden="true" />
          <span className="ed-callout-rule" aria-hidden="true" />
        </>
      ) : null}
      <span>
        {lines[0]}
        <br />
        {lines[1]}
      </span>
      {direction === 'left' ? (
        <>
          <span className="ed-callout-rule" aria-hidden="true" />
          <span className="ed-callout-dot" aria-hidden="true" />
        </>
      ) : null}
    </p>
  )
}
