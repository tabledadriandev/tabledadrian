'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { articles } from '@/data/articles'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { formatDate } from '@/lib/utils'

export default function ArticlesPage() {
  const featuredArticle = articles[0]
  const otherArticles = articles.slice(1)

  return (
    <div className="bg-background pb-20 pt-28 sm:pt-32">
      <div className="container">
        <SectionHeading
          as="h1"
          eyebrow="Journal"
          title="Notes from the kitchen"
          description="How Adrian thinks about food, longevity and the table, written between services."
          animate={false}
        />

        {featuredArticle && (
          <Link href={`/articles/${featuredArticle.slug}`} className="group surface mt-12 block overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[16/10] md:aspect-auto">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="photo object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <span className="text-[11px] uppercase tracking-caps text-primary">{featuredArticle.category}</span>
                <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{featuredArticle.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-foreground-muted">{featuredArticle.excerpt}</p>
                <p className="mt-6 text-xs text-foreground-subtle">
                  {featuredArticle.readTime} min · {formatDate(featuredArticle.publishedAt)}
                </p>
              </div>
            </div>
          </Link>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.5 }}
            >
              <Link href={`/articles/${article.slug}`} className="group surface block overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden bg-background-secondary">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="photo object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[11px] uppercase tracking-caps text-primary">{article.category}</span>
                  <h3 className="mt-2 font-display text-xl leading-tight">{article.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-foreground-muted">{article.excerpt}</p>
                  <p className="mt-4 inline-flex items-center gap-1 text-xs text-foreground-subtle">
                    <Clock size={12} /> {article.readTime} min · {formatDate(article.publishedAt)}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
