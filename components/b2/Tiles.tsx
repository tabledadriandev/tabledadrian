import Link from 'next/link'
import { BrandCover } from '@/components/brand/BrandCover'
import { splitCover, stockSrc } from '@/lib/cover'
import { Arrow } from './ui'

export type Tile = { key: string; href: string; title: string; text?: string | null; tag?: string; src?: string | null; alt?: string; meta?: string }

/* Each card is a branded cover. A stock photograph is used only when one matches. */
export function Bento({ items, label }: { items: Tile[]; label: string }) {
  return (
    <section className="bento" aria-label={label}>
      {items.map((it, i) => {
        const cover = splitCover(it.title)
        const src = stockSrc(it.src)
        return (
          <Link key={it.key} href={it.href} className={`bc b${i % 6}`}>
            <BrandCover
              word={cover.word}
              italic={cover.italic}
              meta={it.meta || it.tag}
              src={src}
              seed={it.key}
              fill
              sizes="(max-width: 600px) 100vw, 420px"
            />
            <span className="sr-only">{it.title}</span>
          </Link>
        )
      })}
    </section>
  )
}

export function Band({ kicker, title, text, children }: { kicker?: string; title: string; text?: string; children?: React.ReactNode }) {
  return (
    <header className="band b2-band">
      <div>
        {kicker ? <span className="tagr">{kicker}</span> : null}
        <h1 className="disp">{title}</h1>
      </div>
      <div className="band-r">
        {text ? <p>{text}</p> : null}
        {children}
      </div>
    </header>
  )
}

export function Opt({ href, title, sub, external }: { href: string; title: string; sub?: string; external?: boolean }) {
  const inner = (
    <>
      <div>{title}{sub ? <span>{sub}</span> : null}</div>
      <span className="go"><Arrow /></span>
    </>
  )
  return external ? (
    <a className="opt" href={href} target="_blank" rel="nofollow noopener noreferrer">{inner}</a>
  ) : (
    <Link className="opt" href={href}>{inner}</Link>
  )
}
