import Image from 'next/image'
import Link from 'next/link'
import { Arrow, TONES } from './ui'

export type Tile = { key: string; href: string; title: string; text?: string | null; tag?: string; src?: string | null; alt?: string }

/* The mockup's bento, repeated: spans 4/5/3 then 3/4/5, tones gold · photo · olive · photo · champ · photo. */
export function Bento({ items, label }: { items: Tile[]; label: string }) {
  return (
    <section className="bento" aria-label={label}>
      {items.map((it, i) => {
        const tone = it.src ? TONES[i % 6] : (['card', 'olive', 'gold'] as const)[i % 3]
        return (
          <Link key={it.key} href={it.href} className={`bc b${i % 6} ${tone}`}>
            {it.src ? (
              <div className="im"><Image src={it.src} alt={it.alt ?? it.title} fill sizes="(max-width: 600px) 100vw, 520px" /></div>
            ) : null}
            <figcaption>
              {it.tag ? <span className="tag">{it.tag}</span> : null}
              <b>{it.title}</b>
              {it.text ? <p>{it.text}</p> : null}
            </figcaption>
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
