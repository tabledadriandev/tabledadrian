import { articleBlocks } from '@/lib/article-blocks'
import type { Article } from '@/data/articles'
import { editorialJournal } from '@/lib/journal-index'
import { EditorialArticle } from '@/components/journal/EditorialArticle'

export function ArticleDetail({ article }: { article: Article }) {
  const items = editorialJournal('en')
  const current = items.find((item) => item.key === article.slug)
  const related = items.filter((item) => item.key !== article.slug).slice(-3)
  const note = /not medical advice/i.test(article.content)
    ? 'This is about food and cooking, not medical advice.'
    : undefined
  return (
    <EditorialArticle
      locale="en"
      category={article.category}
      number={current?.number || '01'}
      title={article.title}
      standfirst={article.excerpt}
      date={current?.date || article.publishedAt}
      readMin={article.readTime}
      image={current?.image}
      blocks={articleBlocks(article.content)}
      related={related}
      indexHref="/articles"
      indexLabel={`All ${items.length} articles`}
      note={note}
    />
  )
}
