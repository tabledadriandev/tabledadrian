import type { Metadata } from 'next'
import Link from 'next/link'
import { BrandCover } from '@/components/brand/BrandCover'
import { COVER_OG, splitCover } from '@/lib/cover'
import { coverPhoto } from '@/lib/cover-photos'
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
      images: [{ url: COVER_OG.en, alt: collection.title }],
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
                <h2 className="sr-only">{menu.title}</h2>
                <BrandCover
                  {...splitCover(menu.title)}
                  meta={`${collection.region} · Menu ${menu.number}`}
                  cover={coverPhoto(`menu-${collection.id}-${menu.slug}`)}
                  seed={menu.slug + collection.id}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
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
