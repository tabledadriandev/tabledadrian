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
          eyebrow="Private chef menus"
          title="Open a book. We will write yours."
          description="Each collection holds five menus. Choose a direction, then we tailor every course to your guests, the season and the kitchen."
          animate={false}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MENUS.map((collection) => (
            <Link
              key={collection.id}
              href={`/menus/${collection.id}`}
              className="group surface overflow-hidden"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-background-secondary">
                <Image
                  src={collection.cover}
                  alt={collection.title}
                  fill
                  className="photo object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-6">
                  <p className="text-[11px] uppercase tracking-caps text-ink-foreground/70">{collection.region}</p>
                  <h2 className="mt-1 font-display text-3xl text-ink-foreground">{collection.title}</h2>
                  <p className="mt-2 text-xs text-ink-foreground/70">Five menus</p>
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 p-6">
                <p className="text-sm leading-relaxed text-foreground-muted">{collection.description}</p>
                <ArrowRight size={18} className="mt-0.5 shrink-0 text-foreground-subtle transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
