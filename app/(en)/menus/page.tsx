import Link from 'next/link'
import { BrandCover } from '@/components/brand/BrandCover'
import { splitCover } from '@/lib/cover'
import { coverPhoto } from '@/lib/cover-photos'
import { MENUS } from '@/data/menus'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Garnish, type GarnishItem } from '@/components/motion/Garnish'

const garnish: GarnishItem[] = [
  { kind: 'basil', x: '82%', y: '7rem', size: 110, depth: 0.9, rotate: -22, lite: true },
  { kind: 'line-citrus', x: '66%', y: '2rem', size: 120, depth: 0.25, rotate: 14 },
  { kind: 'petal-a', x: '93%', y: '17rem', size: 70, depth: 0.6, rotate: 40 },
  { kind: 'flake', x: '74%', y: '15rem', size: 24, depth: 0.75, rotate: -12 },
]

export const metadata = {
  title: 'Menus',
  description:
    "Private chef menus by Table d'Adrian: France, Italy, the coast, Asia, and more. Five menus in each book. Open one, then we write yours.",
  alternates: { canonical: '/menus', languages: { en: '/menus', fr: '/fr/menus', 'x-default': '/menus' } },
}

export default function MenusPage() {
  return (
    <div className="relative bg-background pb-20 pt-28 sm:pt-32">
      <Garnish items={garnish} className="page-garnish" />
      <div className="container relative">
        <SectionHeading
          split="chars"
          as="h1"
          align="left"
          title="Open a book. We will write yours."
          description="Each collection holds five menus. Choose a direction, then we tailor every course to your guests, the season and the kitchen."
          animate={false}
        />

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MENUS.map((collection, i) => (
            <Link
              key={collection.id}
              href={`/menus/${collection.id}`}
              className="group relative block"
            >
              <h2 className="sr-only">{collection.title}</h2>
              <BrandCover
                {...splitCover(collection.title)}
                meta={`${collection.region} · Five menus`}
                cover={coverPhoto(`menu-${collection.id}`)}
                priority={i < 2}
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
