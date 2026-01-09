'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, User } from 'lucide-react'
import { articles } from '@/data/articles'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { formatDate } from '@/lib/utils'

export default function ArticlesPage() {
  const featuredArticle = articles[0]
  const otherArticles = articles.slice(1)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
          >
            Culinary Insights
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            Stories, tips & expertise from Chef Adrian's kitchen
          </motion.p>
        </motion.div>

        {/* Featured Article */}
        {featuredArticle && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <Link href={`/articles/${featuredArticle.slug}`}>
              <div className="bg-white border border-foreground/10 rounded-xl overflow-hidden hover:border-foreground/20 transition-all group shadow-sm hover:shadow-md">
                <div className="aspect-video bg-background-elevated flex items-center justify-center">
                  <span className="text-foreground-muted">{featuredArticle.title}</span>
                </div>
                <div className="p-8">
                  <span className="text-primary text-sm font-medium">{featuredArticle.category}</span>
                  <h2 className="text-3xl font-display font-bold mt-2 mb-4 group-hover:text-primary transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-foreground-muted mb-6">{featuredArticle.excerpt}</p>
                  <div className="flex items-center space-x-4 text-sm text-foreground-subtle">
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span>{featuredArticle.author.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span>{featuredArticle.readTime} min read</span>
                    </div>
                    <span>{formatDate(featuredArticle.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Other Articles */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {otherArticles.map((article, index) => (
            <motion.div
              key={article.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Link href={`/articles/${article.slug}`}>
                <div className="bg-white border border-foreground/10 rounded-xl overflow-hidden hover:border-foreground/20 transition-all shadow-sm hover:shadow-md">
                  <div className="aspect-video bg-background-elevated flex items-center justify-center">
                    <span className="text-foreground-muted text-sm">{article.title}</span>
                  </div>
                  <div className="p-6">
                    <span className="text-primary text-xs font-medium">{article.category}</span>
                    <h3 className="text-xl font-display font-semibold mt-2 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-foreground-muted text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center space-x-4 text-xs text-foreground-subtle">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{article.readTime} min</span>
                      </div>
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
