import Image, { type ImageProps } from 'next/image'
import { dishIsModest, dishNativeSize } from '@/lib/dish-photos'
import { cn } from '@/lib/utils'

type DishPhotoProps = Omit<ImageProps, 'src'> & {
  src: string
}

export function DishPhoto({ src, alt, className, fill, sizes, width, height, style, quality, ...rest }: DishPhotoProps) {
  const native = dishNativeSize(src)
  const modest = dishIsModest(src)
  const fit = modest ? 'object-contain' : 'object-cover'
  const q = quality ?? 70
  const resolvedSizes = sizes ?? '(max-width: 768px) 100vw, 768px'

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={resolvedSizes}
        quality={q}
        className={cn('photo', fit, className)}
        style={style}
        {...rest}
      />
    )
  }

  const w = typeof width === 'number' ? width : native?.w ?? 1600
  const h = typeof height === 'number' ? height : native?.h ?? 1200

  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      sizes={resolvedSizes}
      quality={q}
      className={cn('photo h-auto w-full', fit, className)}
      style={{
        ...(modest ? { maxWidth: native?.w ?? MODEST_FALLBACK } : null),
        ...style,
      }}
      {...rest}
    />
  )
}

const MODEST_FALLBACK = 710
