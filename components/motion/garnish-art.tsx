const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
}

function LineLeaf() {
  return (
    <svg viewBox="0 0 100 140" className="garnish-svg">
      <path {...stroke} pathLength={1} d="M50 6 C82 30 92 70 70 108 C62 122 54 130 50 136 C46 130 38 122 30 108 C8 70 18 30 50 6 Z" />
      <path {...stroke} pathLength={1} d="M50 14 C50 52 50 96 50 136" />
      <path {...stroke} pathLength={1} d="M50 40 C60 36 70 34 78 36 M50 58 C62 54 74 54 84 58 M50 78 C61 76 72 78 80 84 M50 96 C58 96 66 100 72 106 M50 40 C40 36 30 34 22 36 M50 58 C38 54 26 54 16 58 M50 78 C39 76 28 78 20 84 M50 96 C42 96 34 100 28 106" />
    </svg>
  )
}

function LineCitrus() {
  const segments = Array.from({ length: 9 }, (_, i) => (i / 9) * Math.PI * 2)
  return (
    <svg viewBox="0 0 120 120" className="garnish-svg">
      <circle {...stroke} pathLength={1} cx="60" cy="60" r="56" />
      <circle {...stroke} pathLength={1} cx="60" cy="60" r="49" />
      {segments.map((a) => {
        const a0 = a + 0.06
        const a1 = a + (Math.PI * 2) / 9 - 0.06
        const r = 44
        const x0 = 60 + Math.cos(a0) * r
        const y0 = 60 + Math.sin(a0) * r
        const x1 = 60 + Math.cos(a1) * r
        const y1 = 60 + Math.sin(a1) * r
        return (
          <path
            key={a}
            {...stroke}
            pathLength={1}
            d={`M${60 + Math.cos(a + 0.35) * 6} ${60 + Math.sin(a + 0.35) * 6} L${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1} Z`}
          />
        )
      })}
      <circle {...stroke} pathLength={1} cx="60" cy="60" r="4" />
    </svg>
  )
}

function LinePetal() {
  return (
    <svg viewBox="0 0 80 120" className="garnish-svg">
      <path {...stroke} pathLength={1} d="M40 114 C10 92 4 52 22 22 C30 10 36 6 40 4 C44 10 52 12 58 22 C76 52 70 92 40 114 Z" />
      <path {...stroke} pathLength={1} d="M40 108 C36 80 36 48 40 14" />
      <path {...stroke} pathLength={1} d="M40 4 C38 12 34 16 30 18" />
    </svg>
  )
}

function LineSprig() {
  const leaves = [
    [52, 30, -1],
    [46, 48, 1],
    [44, 66, -1],
    [44, 84, 1],
    [46, 102, -1],
  ] as const
  return (
    <svg viewBox="0 0 100 150" className="garnish-svg">
      <path {...stroke} pathLength={1} d="M58 6 C50 40 40 80 46 146" />
      {leaves.map(([x, y, side]) => (
        <path
          key={y}
          {...stroke}
          pathLength={1}
          d={`M${x} ${y} C${x + side * 10} ${y - 10} ${x + side * 22} ${y - 8} ${x + side * 26} ${y - 2} C${x + side * 20} ${y + 4} ${x + side * 10} ${y + 4} ${x} ${y} Z`}
        />
      ))}
    </svg>
  )
}

function SaltCrystal() {
  return (
    <svg viewBox="0 0 100 100" className="garnish-svg">
      <path d="M50 8 L88 28 L88 72 L50 92 L12 72 L12 28 Z" fill="hsl(40 36% 93% / 0.08)" stroke="none" />
      <path {...stroke} pathLength={1} d="M50 8 L88 28 L88 72 L50 92 L12 72 L12 28 Z" />
      <path {...stroke} pathLength={1} d="M12 28 L50 48 L88 28 M50 48 L50 92" />
    </svg>
  )
}

function GoldFlake({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 100 80" className="garnish-svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(40 62% 74%)" />
          <stop offset="0.45" stopColor="hsl(36 52% 56%)" />
          <stop offset="1" stopColor="hsl(32 46% 38%)" />
        </linearGradient>
      </defs>
      <path
        d="M8 30 L30 8 L52 16 L70 4 L94 22 L84 44 L96 62 L68 76 L44 66 L22 74 L4 54 Z"
        fill={`url(#${id})`}
        opacity="0.92"
      />
    </svg>
  )
}

export type GarnishKind =
  | 'basil'
  | 'thyme'
  | 'petal-a'
  | 'petal-b'
  | 'petal-c'
  | 'line-leaf'
  | 'line-citrus'
  | 'line-petal'
  | 'line-sprig'
  | 'salt'
  | 'flake'

export const PHOTO_GARNISH: Partial<Record<GarnishKind, { src: string; w: number; h: number }>> = {
  basil: { src: '/garnish/basil.webp', w: 161, h: 127 },
  thyme: { src: '/garnish/thyme.webp', w: 109, h: 170 },
  'petal-a': { src: '/garnish/petal-a.webp', w: 232, h: 167 },
  'petal-b': { src: '/garnish/petal-b.webp', w: 101, h: 120 },
  'petal-c': { src: '/garnish/petal-c.webp', w: 60, h: 98 },
}

export function GarnishArt({ kind, id }: { kind: GarnishKind; id: string }) {
  switch (kind) {
    case 'line-leaf':
      return <LineLeaf />
    case 'line-citrus':
      return <LineCitrus />
    case 'line-petal':
      return <LinePetal />
    case 'line-sprig':
      return <LineSprig />
    case 'salt':
      return <SaltCrystal />
    case 'flake':
      return <GoldFlake id={id} />
    default:
      return null
  }
}
