import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { COVER_OG } from '@/lib/cover'
import { getMenu, MENUS } from '@/data/menus'
import { EdFigure, EdPage } from '@/components/editorial/Page'
import { Pill, SectionLabel } from '@/components/editorial/ui'

export function generateStaticParams() {
  return MENUS.flatMap((collection) =>
    collection.menus.map((menu) => ({
      collection: collection.id,
      slug: menu.slug,
    }))
  )
}

export function generateMetadata({
  params,
}: {
  params: { collection: string; slug: string }
}): Metadata {
  const found = getMenu(params.collection, params.slug)
  if (!found) return { title: 'Menu' }
  return {
    title: `${found.menu.title} | ${found.collection.title}`,
    description: `${found.menu.title} from the ${found.collection.title} book. A starting point for your table.`,
    alternates: { canonical: `/menus/${found.collection.id}/${found.menu.slug}` },
    openGraph: {
      title: found.menu.title,
      description: found.collection.description,
      images: [{ url: COVER_OG.en, alt: found.menu.title }],
    },
  }
}

function splitDish(dish: string) {
  const comma = dish.indexOf(',')
  if (comma === -1) return { name: dish, note: '' }
  return { name: dish.slice(0, comma), note: dish.slice(comma + 1).trim() }
}

function shortTitle(title: string) {
  return titleCase(title.replace(/^Menu \d+:\s*/, ''))
}

function titleCase(value: string) {
  return value
    .toLocaleLowerCase('fr-FR')
    .replace(/(^|[\s'-])(\S)/g, (_, edge: string, letter: string) => edge + letter.toLocaleUpperCase('fr-FR'))
}

function isCourseLabel(heading: string) {
  return /^(STARTER|MAIN|DESSERT|CANAPES|ANTIPASTI)$/i.test(
    heading.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  )
}

export default function MenuPage({ params }: { params: { collection: string; slug: string } }) {
  const found = getMenu(params.collection, params.slug)
  if (!found) notFound()

  const { collection, menu } = found
  const index = collection.menus.findIndex((item) => item.slug === menu.slug)
  const previous = collection.menus[index - 1]
  const next = collection.menus[index + 1]
  const heading = shortTitle(menu.title)

  return (
    <EdPage>
      <header className="ed-page-hero">
        <div className="ed-page-head">
          <div>
            <SectionLabel index={String(menu.number).padStart(2, '0')}>{collection.region}</SectionLabel>
            <h1>
              <span>{heading}</span>
            </h1>
          </div>
          <div className="ed-page-intro">
            <p>A starting point. Adrian rewrites it for your guests, the season and the kitchen.</p>
            <Pill href="/contact" tone="filled">Book your experience</Pill>
          </div>
        </div>
        <p className="ed-facts">
          <Link href="/menus">Menus</Link>
          <Link href={`/menus/${collection.id}`}>{collection.title}</Link>
          <span>Menu {menu.number} of {collection.menus.length}</span>
        </p>
        <EdFigure id={`menu/${collection.id}/${menu.slug}`} label={heading} />
      </header>
      <section className="ed-page-section">
        {menu.courses.map((course) => {
          const repeatTitle = titleCase(course.heading) === heading
          return (
            <section key={course.heading}>
              {!repeatTitle ? (
                <h2>
                  <span>{isCourseLabel(course.heading) ? course.heading : titleCase(course.heading)}</span>
                </h2>
              ) : null}
              <ul className="ed-index">
                {course.dishes.map((dish, dishIndex) => {
                  const parts = splitDish(dish)
                  return (
                    <li key={dish}>
                      <div>
                        <span>{String(dishIndex + 1).padStart(2, '0')}</span>
                        <strong>{parts.name}</strong>
                        {parts.note ? <em>{parts.note}</em> : null}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
        <nav className="ed-links">
          {previous ? <Link className="ed-caps" href={`/menus/${collection.id}/${previous.slug}`}>Previous</Link> : null}
          <Link className="ed-caps" href={`/menus/${collection.id}`}>All five</Link>
          {next ? <Link className="ed-caps" href={`/menus/${collection.id}/${next.slug}`}>Next</Link> : null}
        </nav>
      </section>
    </EdPage>
  )
}
