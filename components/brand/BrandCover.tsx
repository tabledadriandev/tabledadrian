import Image from 'next/image'
import { coverVariant } from '@/lib/cover'

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
}) {
  const v = variant ?? coverVariant(seed || word)
  const photo = Boolean(src)
  const long = word.length > 11
  const cls = [
    'brand-cover',
    `v${v}`,
    photo ? 'is-photo' : 'is-cream',
    !photo && v === 2 ? 'tone-ink' : '',
    long ? 'long' : '',
    fill ? 'fill' : '',
    entrance ? 'cover-in' : '',
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <div className={cls}>
      {src ? (
        <Image
          className="cover-photo"
          src={src}
          alt=""
          fill
          sizes={sizes || '(max-width: 768px) 100vw, 720px'}
          priority={priority}
          quality={75}
        />
      ) : null}
      {src ? <div className="cover-scrim" aria-hidden="true" /> : null}
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
