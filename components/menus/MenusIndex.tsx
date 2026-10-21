import Link from 'next/link'
import { MENUS } from '@/data/menus'
import { EdFigure, EdPage } from '@/components/editorial/Page'
import { SectionLabel } from '@/components/editorial/ui'

export function MenusIndex({ locale }: { locale: 'en' | 'fr' }) {
  const french = locale === 'fr'
  return (
    <EdPage>
      <header className="ed-page-hero">
        <div className="ed-page-head">
          <div>
            <SectionLabel index="01">{french ? 'Menus' : 'Menus'}</SectionLabel>
            <h1>
              <span>{french ? 'Ouvrez un livre.' : 'Open a book.'}</span>
              <span className="ed-italic">{french ? 'Nous écrirons le vôtre.' : 'We will write yours.'}</span>
            </h1>
          </div>
          <p>
            {french
              ? "Chaque collection tient cinq menus. Choisissez une direction, puis chaque service s'écrit pour vos convives, la saison et la cuisine."
              : 'Each collection holds five menus. Choose a direction, then we tailor every course to your guests, the season and the kitchen.'}
          </p>
        </div>
        <EdFigure id="menus-index" label={french ? 'Carnet de menus' : 'Menus notebook'} />
      </header>
      <section className="ed-page-section">
        <div className="ed-cards">
          {MENUS.map((collection, index) => (
            <article key={collection.id}>
              <EdFigure id={`menu/${collection.id}`} label={collection.title} />
              <p className="ed-kicker">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i aria-hidden="true" />
                <span className="ed-kicker-name">{collection.region}</span>
              </p>
              <h2>
                <Link href={`/menus/${collection.id}`}>{collection.title}</Link>
              </h2>
              <p>{collection.description}</p>
            </article>
          ))}
        </div>
      </section>
    </EdPage>
  )
}
