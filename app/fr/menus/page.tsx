import type { Metadata } from 'next'
import Link from 'next/link'
import { BrandCover } from '@/components/brand/BrandCover'
import { splitCover, TABLE_COVER } from '@/lib/cover'
import { Garnish, type GarnishItem } from '@/components/motion/Garnish'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MENUS } from '@/data/menus'
import { localeAlternates } from '@/lib/routes'

const garnish: GarnishItem[] = [
  { kind: 'basil', x: '82%', y: '7rem', size: 110, depth: 0.9, rotate: -22, lite: true },
  { kind: 'line-citrus', x: '66%', y: '2rem', size: 120, depth: 0.25, rotate: 14 },
]

export const metadata: Metadata = {
  title: 'Menus',
  description:
    "Menus de chef privé par Table d'Adrian. Cinq menus dans chaque livre. Ouvrez-en un, puis nous écrivons le vôtre.",
  alternates: localeAlternates('/fr/menus', '/menus', '/fr/menus'),
}

export default function FrenchMenusPage() {
  return (
    <div className="relative bg-background pb-20 pt-28 sm:pt-32">
      <Garnish items={garnish} className="page-garnish" />
      <div className="container relative">
        <SectionHeading
          split="chars"
          as="h1"
          align="left"
          title="Ouvrez un livre. Nous écrirons le vôtre."
          description="Chaque collection tient cinq menus. Choisissez une direction, puis chaque service s'écrit pour vos convives, la saison et la cuisine."
          animate={false}
        />
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MENUS.map((collection, i) => (
            <Link key={collection.id} href={`/menus/${collection.id}`} className="group relative block">
              <h2 className="sr-only">{collection.title}</h2>
              <BrandCover
                {...splitCover(collection.title)}
                meta={`${collection.region} · Cinq menus`}
                src={TABLE_COVER}
                variant={i % 4}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="menu-card-cover"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
