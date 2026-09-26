import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { getCollection, MENUS } from '@/data/menus'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function generateStaticParams() {
  return MENUS.map((collection) => ({ collection: collection.id }))
}

export function generateMetadata({ params }: { params: { collection: string } }): Metadata {
  const collection = getCollection(params.collection)
  if (!collection) return { title: 'Menus' }
  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `/menus/${collection.id}` },
    openGraph: {
      title: collection.title,
      description: collection.description,
      images: [{ url: collection.cover, alt: collection.title }],
    },
  }
}

export default function MenuCollectionPage({ params }: { params: { collection: string } }) {
  const collection = getCollection(params.collection)
  if (!collection) notFound()

  return (
    <div className="bg-background pb-20 pt-28 sm:pt-32">
      <div className="container">
        <p className="mb-6 text-center text-sm">
          <Link href="/menus" className="text-foreground-muted underline-offset-4 hover:text-foreground hover:underline">
            All collections
          </Link>
        </p>
        <SectionHeading
          as="h1"
          eyebrow={collection.region}
          title={collection.title}
          description={collection.description}
          animate={false}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collection.menus.map((menu) => (
            <Link
              key={menu.slug}
              href={`/menus/${collection.id}/${menu.slug}`}
              className="group surface overflow-hidden"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-background-secondary">
                <Image
                  src={menu.cover}
                  alt={menu.title}
                  fill
                  className="photo object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-5">
                  <p className="text-[11px] uppercase tracking-caps text-ink-foreground/70">Menu {menu.number}</p>
                  <h2 className="mt-1 font-display text-xl leading-snug text-ink-foreground sm:text-2xl">
                    {menu.title.replace(/^Menu \d+:\s*/, '')}
                  </h2>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <p className="text-sm text-foreground-muted">Open this menu</p>
                <ArrowRight size={16} className="text-foreground-subtle transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
