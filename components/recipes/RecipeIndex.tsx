import { EdHero, EdList, EdPage } from '@/components/editorial/Page'
import { RECIPES_COPY, recipeItems } from '@/lib/view-copy'

export function RecipeIndex({ locale }: { locale: 'en' | 'fr' }) {
  const c = RECIPES_COPY[locale]
  const items = recipeItems(locale)
  return (
    <EdPage>
      <EdHero
        kicker={c.title}
        title={locale === 'fr' ? 'La' : 'The'}
        italic={locale === 'fr' ? 'bibliothèque' : 'library'}
        lede={c.lede}
        figure={{ id: 'recipes-index', label: c.title }}
      />
      <section className="ed-page-section">
        <EdList
          items={items.map((item) => ({
            href: item.href,
            title: item.name,
            text: item.full ? `${item.cuisine} · ${item.full}` : item.cuisine,
          }))}
        />
      </section>
    </EdPage>
  )
}
