import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMenu, MENUS } from '@/data/menus'
import { Button } from '@/components/ui/Button'

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
      images: [{ url: found.menu.cover, alt: found.menu.title }],
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
    <div className="bg-background pb-20 pt-28 sm:pt-32">
      <div className="container">
        <p className="mb-8 text-sm text-foreground-muted">
          <Link href="/menus" className="underline-offset-4 hover:text-foreground hover:underline">
            Menus
          </Link>
          <span className="px-2">/</span>
          <Link
            href={`/menus/${collection.id}`}
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            {collection.title}
          </Link>
          <span className="px-2">/</span>
          <span>Menu {menu.number}</span>
        </p>

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="relative aspect-[5/4] max-h-[42vh] overflow-hidden rounded-[1.5rem] bg-background-secondary sm:aspect-[4/5] sm:max-h-none lg:col-span-5 lg:max-h-none">
            <Image
              src={menu.cover}
              alt={menu.title}
              fill
              priority
              className="photo object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          <article className="surface px-6 py-8 sm:px-10 sm:py-10 lg:col-span-7">
            <p className="text-[11px] uppercase tracking-caps text-foreground-muted">
              {collection.region} | Menu {menu.number} of {collection.menus.length}
            </p>
            <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{heading}</h1>

            <div className="mt-8 space-y-7">
              {menu.courses.map((course) => {
                const repeatTitle = titleCase(course.heading) === heading
                return (
                  <section key={course.heading}>
                    {!repeatTitle && (
                      <h2 className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
                        {isCourseLabel(course.heading) ? course.heading : titleCase(course.heading)}
                      </h2>
                    )}
                    <ul className={repeatTitle ? 'space-y-3' : 'mt-3 space-y-3'}>
                      {course.dishes.map((dish) => {
                        const { name, note } = splitDish(dish)
                        return (
                          <li key={dish}>
                            <p className="text-base leading-snug text-foreground">{name}</p>
                            {note ? (
                              <p className="mt-0.5 text-sm leading-snug text-foreground-muted">{note}</p>
                            ) : null}
                          </li>
                        )
                      })}
                    </ul>
                  </section>
                )
              })}
            </div>

            <p className="mt-8 text-sm leading-relaxed text-foreground-subtle">
              A starting point. Adrian rewrites it for your guests, the season and the kitchen.
            </p>

            <div className="mt-6">
              <Button href="/contact" variant="ink">
                Book your experience
              </Button>
            </div>
          </article>
        </div>

        <nav className="mt-10 flex items-center justify-between text-sm">
          {previous ? (
            <Link
              href={`/menus/${collection.id}/${previous.slug}`}
              className="text-foreground-muted underline-offset-4 hover:text-foreground hover:underline"
            >
              Previous
            </Link>
          ) : (
            <span />
          )}
          <Link
            href={`/menus/${collection.id}`}
            className="text-foreground-muted underline-offset-4 hover:text-foreground hover:underline"
          >
            All five
          </Link>
          {next ? (
            <Link
              href={`/menus/${collection.id}/${next.slug}`}
              className="text-foreground-muted underline-offset-4 hover:text-foreground hover:underline"
            >
              Next
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  )
}
