import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DishPhoto } from '@/components/media/DishPhoto'
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
          {MENUS.map((collection) => (
            <Link key={collection.id} href={`/menus/${collection.id}`} className="group relative block overflow-hidden bg-ink">
              <div className="relative aspect-[3/4] overflow-hidden">
                <DishPhoto src={collection.cover} alt={collection.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-ink via-ink/25 to-ink/10" />
                <div className="absolute inset-x-0 bottom-0 z-[3] p-6 sm:p-7">
                  <h2 className="lh-display font-display text-4xl text-ink-foreground">{collection.title}</h2>
                  <p className="mt-3 text-[11px] uppercase tracking-caps text-gold">
                    {collection.region}
                    <span className="text-ink-foreground/60"> · Cinq menus</span>
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-caps text-ink-foreground">
                    Ouvrir <ArrowRight size={14} />
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
