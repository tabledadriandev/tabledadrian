import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { COVER_OG } from '@/lib/cover'
import { getCollection, MENUS } from '@/data/menus'
import { EdFigure, EdPage } from '@/components/editorial/Page'
import { SectionLabel } from '@/components/editorial/ui'

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
    <EdPage>
      <header className="ed-page-hero">
        <div className="ed-page-head">
          <div>
            <SectionLabel index="02">{collection.region}</SectionLabel>
            <h1>
              <span>{collection.title}</span>
            </h1>
          </div>
          <div className="ed-page-intro">
            <p>{collection.description}</p>
            <Link className="ed-caps" href="/menus">All collections</Link>
          </div>
        </div>
        <EdFigure id={`menu/${collection.id}`} label={collection.title} />
      </header>
      <section className="ed-page-section">
        <ul className="ed-index">
          {collection.menus.map((menu) => (
            <li key={menu.slug}>
              <Link href={`/menus/${collection.id}/${menu.slug}`}>
                <span>{String(menu.number).padStart(2, '0')}</span>
                <strong>{menu.title.replace(/^Menu \d+:\s*/, '')}</strong>
                <em>{collection.region}</em>
                <span className="ed-arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </EdPage>
  )
}
