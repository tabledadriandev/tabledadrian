import { DishPhoto } from '@/components/media/DishPhoto'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
  alternates: { canonical: '/menus' },
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
          {MENUS.map((collection) => (
            <Link
              key={collection.id}
              href={`/menus/${collection.id}`}
              className="group relative block overflow-hidden bg-ink"
              data-cursor="Open"
            >
              <div className="relative aspect-[3/4] overflow-hidden" data-reveal="up" data-parallax="6" data-distort>
                <DishPhoto
                  src={collection.cover}
                  alt={collection.title}
                  fill
                  priority={MENUS.indexOf(collection) < 3}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-ink via-ink/25 to-ink/10" />
                <div className="absolute inset-x-0 bottom-0 z-[3] p-6 sm:p-7">
                  <h2 className="lh-display font-display text-4xl text-ink-foreground">{collection.title}</h2>
                  <p className="mt-3 text-[11px] uppercase tracking-caps text-gold">
                    {collection.region}
                    <span className="text-ink-foreground/60"> · Five menus</span>
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-foreground/80">{collection.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-caps text-ink-foreground">
                    Open <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
