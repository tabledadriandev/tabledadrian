import Image from 'next/image'
import Link from 'next/link'
import { CapsLink, EmLast, Pill } from '@/components/editorial/ui'
import { stockSrc } from '@/lib/cover'
import { libraryRecipePath, libraryRecipes, type LibraryRecipe } from '@/lib/library'
import { RecipeScale } from './RecipeScale'

const UI = {
  en: {
    recipes: 'Recipes',
    full: 'Written in full',
    book: 'Book a private chef',
    sola: 'Cook it with Sola',
    solaHref: '/sola',
    contact: '/contact',
    ingredients: 'Ingredients',
    method: 'Method',
    steps: 'steps',
    prep: 'Prep',
    cook: 'Cook',
    lockTitle: 'The method is in Sola',
    lockBody: 'The ingredients stay on the page. The method is in the Sola app.',
    also: 'Also written',
    fullWord: 'in full',
    all: 'recipes',
    bandA: 'Longevity',
    bandB: 'cuisine, cooked with fine-dining',
    bandC: 'precision.',
    bandLede: 'At your villa, on your yacht, for your private events.',
  },
  fr: {
    recipes: 'Recettes',
    full: 'Recette entière',
    book: 'Réserver un chef privé',
    sola: 'La cuisiner avec Sola',
    solaHref: '/fr/sola',
    contact: '/fr/contact',
    ingredients: 'Ingrédients',
    method: 'Méthode',
    steps: 'étapes',
    prep: 'Préparation',
    cook: 'Cuisson',
    lockTitle: 'La méthode est dans Sola',
    lockBody: 'Les ingrédients restent sur la page. La méthode est dans l’application Sola.',
    also: 'Également',
    fullWord: 'entières',
    all: 'recettes',
    bandA: 'Cuisine',
    bandB: 'longévité, tenue avec une précision',
    bandC: 'gastronomique.',
    bandLede: 'Dans votre villa, sur votre yacht, pour vos réceptions privées.',
  },
} as const

export function RecipeArticle({ recipe, locale }: { recipe: LibraryRecipe; locale: 'en' | 'fr' }) {
  const t = UI[locale]
  const title = locale === 'fr' ? recipe.titleFr : recipe.title
  const intro = locale === 'fr' ? recipe.introFr : recipe.intro
  const lines = locale === 'fr' ? recipe.ingredientsFr ?? recipe.ingredients : recipe.ingredients
  const steps = locale === 'fr' ? recipe.instructionsFr ?? recipe.instructions : recipe.instructions
  const photo = stockSrc(recipe.image.src)
  const alt = locale === 'fr' ? recipe.image.altFr || recipe.image.alt : recipe.image.alt
  const index = libraryRecipes.filter((item) => item.free).findIndex((item) => item.slug === recipe.slug)
  const number = String((index >= 0 ? index : libraryRecipes.findIndex((item) => item.slug === recipe.slug)) + 1).padStart(2, '0')
  const related = libraryRecipes.filter((item) => item.free && item.slug !== recipe.slug).slice(0, 3)
  const indexHref = locale === 'fr' ? '/fr/recettes' : '/recipes'

  return (
    <article className="ed-recipe">
      <header className="ed-recipe-head">
        <p>
          <Link href={indexHref}>{t.recipes}</Link>
          <span>
            {' / '}
            {recipe.cuisine} · {recipe.course}
          </span>
          <span>{recipe.free ? `No. ${number} · ${t.full}` : `No. ${number}`}</span>
        </p>
        <h1 className="ed-recipe-title">
          <EmLast text={title} />
        </h1>
      </header>
      <RecipeScale
        lines={lines}
        base={recipe.servings}
        locale={locale}
        prep={recipe.prepMin}
        cook={recipe.cookMin}
        intro={intro}
        actions={
          <div className="ed-recipe-actions">
            <Pill href={t.contact} tone="filled">{t.book}</Pill>
            <CapsLink href={t.solaHref}>{t.sola}</CapsLink>
          </div>
        }
        photo={
          photo ? (
            <figure className="ed-photo">
              <Image className="ra-hero-photo" src={photo} alt={alt || title} fill priority sizes="(max-width: 1100px) 100vw, 860px" />
              {recipe.image.credit ? <figcaption>{recipe.image.credit}</figcaption> : null}
            </figure>
          ) : null
        }
        method={
        <div className="ed-recipe-method">
          <div className="ed-split-head">
            <h2>{t.method}</h2>
            <p>
              {steps.length} {t.steps} · {t.prep} {recipe.prepMin} min · {t.cook} {recipe.cookMin} min
            </p>
          </div>
          <div className={recipe.free ? 'ed-steps' : 'ed-steps is-locked'}>
            <ol>
              {steps.map((step, stepIndex) => (
                <li key={step}>
                  <span>{stepIndex + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
            {recipe.free ? null : (
              <div className="ed-lock">
                <p>{t.lockTitle}</p>
                <p>{t.lockBody}</p>
                <Pill href={t.solaHref} tone="filled">{t.sola}</Pill>
              </div>
            )}
          </div>
        </div>
        }
      />
      <section className="ed-forest">
        <div>
          <p className="ed-band-kicker">{t.book}</p>
          <h2>
            <em>{t.bandA}</em> {t.bandB} <em>{t.bandC}</em>
          </h2>
          <p>{t.bandLede}</p>
        </div>
        <Pill href={t.contact} tone="light">{t.book}</Pill>
      </section>
      {related.length ? (
        <section className="ed-related">
          <div className="ed-split-head">
            <h2>
              {t.also} <em>{t.fullWord}</em>
            </h2>
            <CapsLink href={indexHref}>
              {libraryRecipes.length} {t.all}
            </CapsLink>
          </div>
          <div className="ed-cards">
            {related.map((item, itemIndex) => (
              <Link key={item.slug} href={libraryRecipePath(item, locale)} className="ed-typecard">
                <span>
                  <span>{item.cuisine}</span>
                  <span>{locale === 'fr' ? 'Entière' : 'Full recipe'}</span>
                </span>
                <strong>{String(itemIndex + 2).padStart(2, '0')}</strong>
                <em>{locale === 'fr' ? item.titleFr : item.title}</em>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
