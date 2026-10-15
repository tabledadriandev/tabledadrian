import Image from 'next/image'
import { coverVariant } from '@/lib/cover'
import type { CoverRecord } from '@/lib/cover-photos'

const MARK_IVORY = '/brand/svg/tabledadrian_lockup-horizontal_ivory-transparent.svg'
const MARK_GOLD = '/brand/svg/tabledadrian_lockup-horizontal_gold-transparent.svg'

export function BrandCover({
  word,
  italic,
  meta,
  src,
  variant,
  priority,
  sizes,
  className,
  entrance,
  fill,
  seed,
  cover,
}: {
  word: string
  italic?: string
  meta?: string
  src?: string | null
  variant?: number
  priority?: boolean
  sizes?: string
  className?: string
  entrance?: boolean
  fill?: boolean
  seed?: string
  cover?: CoverRecord | null
}) {
  const photoSrc = cover?.src || src || null
  const v = cover?.variant ?? variant ?? coverVariant(seed || word)
  const photo = Boolean(photoSrc)
  const darkInk = Boolean(photo && cover?.ink === 'dark')
  const long = word.length > 11
  const cls = [
    'brand-cover',
    `v${v}`,
    photo ? 'is-photo' : 'is-cream',
    darkInk ? 'text-dark' : '',
    !photo && v === 2 ? 'tone-ink' : '',
    long ? 'long' : '',
    fill ? 'fill' : '',
    entrance ? 'cover-in' : '',
    className || '',
  ].filter(Boolean).join(' ')
  const style = cover
    ? ({
        '--cover-crop': cover.crop,
        '--cover-tint': cover.tint,
        '--cover-accent': cover.accent,
      } as React.CSSProperties)
    : undefined

  return (
    <div className={cls} style={style}>
      {photoSrc ? (
        <Image
          className="cover-photo"
          src={photoSrc}
          alt=""
          fill
          sizes={sizes || '(max-width: 768px) 100vw, 720px'}
          priority={priority}
          quality={75}
        />
      ) : null}
      {photoSrc && cover?.tint && cover.tint !== 'transparent' ? <div className="cover-tint" aria-hidden="true" /> : null}
      {photoSrc ? <div className="cover-scrim" aria-hidden="true" /> : null}
      <div className="cover-type">
        <div className="cover-top">
          {meta ? <p className="cover-meta">{meta}</p> : null}
          <p className="cover-word">{word}</p>
          {italic ? <p className="cover-italic">{italic}</p> : null}
          <span className="cover-rule" aria-hidden="true" />
        </div>
        {/* Real lockup. Ivory on photographs and dark panels; gold on ivory. */}
        <img className="cover-mark mark-on-photo" src={MARK_IVORY} alt="" />
        <img className="cover-mark mark-on-cream" src={MARK_GOLD} alt="" />
      </div>
    </div>
  )
}
