import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MENUS } from '@/data/menus'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const metadata = {
  title: 'Menus',
  description:
    "Private chef menus by Table d'Adrian: France, Italy, the coast, Asia, and more. Five menus in each book. Open one, then we write yours.",
  alternates: { canonical: '/menus' },
}

export default function MenusPage() {
  return (
    <div className="bg-background pb-20 pt-28 sm:pt-32">
      <div className="container">
        <SectionHeading
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
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={collection.cover}
                  alt={collection.title}
                  fill
                  priority={MENUS.indexOf(collection) < 3}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/10" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <h2 className="font-display text-4xl leading-none text-ink-foreground">{collection.title}</h2>
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
