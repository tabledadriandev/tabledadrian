import Image from 'next/image'
import Link from 'next/link'
import { Pill, SectionLabel } from '@/components/editorial/ui'

export function EdFigure({
  id,
  label,
  src,
  alt = '',
}: {
  id: string
  label: string
  src?: string
  alt?: string
}) {
  if (src) {
    return (
      <figure className="ed-photo ed-photo-real">
        <Image src={src} alt={alt || label} fill sizes="(max-width: 1100px) 100vw, 720px" />
        <figcaption>{label}</figcaption>
      </figure>
    )
  }
  return (
    <figure className="ed-photo" data-placeholder={id}>
      <span>Fig.</span>
      <figcaption>{label}</figcaption>
    </figure>
  )
}

export function EdPage({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`ed ed-page ${className}`.trim()}>{children}</div>
}

export function EdHero({
  index = '01',
  kicker,
  title,
  italic,
  lede,
  action,
  figure,
}: {
  index?: string
  kicker: string
  title: string
  italic?: string
  lede?: string
  action?: { href: string; label: string }
  figure?: { id: string; label: string; src?: string; alt?: string }
}) {
  return (
    <header className="ed-page-hero">
      <div className="ed-page-head">
        <div>
          <SectionLabel index={index}>{kicker}</SectionLabel>
          <h1>
            <span>{title}</span>
            {italic ? <span className="ed-italic">{italic}</span> : null}
          </h1>
        </div>
        {lede || action ? (
          <div className="ed-page-intro">
            {lede ? <p>{lede}</p> : null}
            {action ? (
              <Pill href={action.href} tone="filled">
                {action.label}
              </Pill>
            ) : null}
          </div>
        ) : null}
      </div>
      {figure ? <EdFigure {...figure} /> : null}
    </header>
  )
}

export function EdList({
  items,
}: {
  items: { href: string; title: string; text?: string; meta?: string }[]
}) {
  return (
    <ul className="ed-index">
      {items.map((item, index) => (
        <li key={item.href + item.title}>
          <Link href={item.href}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{item.title}</strong>
            {item.text ? <em>{item.text}</em> : <em />}
            {item.meta ? <small>{item.meta}</small> : null}
            <span className="ed-arrow" aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
