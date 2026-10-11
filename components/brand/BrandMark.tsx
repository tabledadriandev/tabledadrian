import { cn } from '@/lib/utils'

const GOLD = '/brand/svg/tabledadrian_lockup-horizontal_gold-transparent.svg'
const IVORY = '/brand/svg/tabledadrian_lockup-horizontal_ivory-transparent.svg'

export function BrandMark({
  onDark = false,
  className,
}: {
  onDark?: boolean
  className?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- approved brand SVG lockup
    <img
      src={onDark ? IVORY : GOLD}
      alt="Table d'Adrian"
      width={1975}
      height={959}
      className={cn('brand-lockup h-11 w-auto sm:h-14', className)}
      decoding="async"
    />
  )
}
