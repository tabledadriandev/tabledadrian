'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, User } from 'lucide-react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { Article } from '@/data/articles'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { formatDate } from '@/lib/utils'
import { ReadingProgress } from './ReadingProgress'

interface ArticleDetailProps {
  article: Article
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100
      setReadingProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <ReadingProgress progress={readingProgress} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Hero Image */}
          <motion.div
            variants={fadeInUp}
            className="aspect-video relative rounded-xl overflow-hidden mb-8 shadow-lg"
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>

          {/* Meta */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-foreground-muted">
              <span className="text-primary font-medium">{article.category}</span>
              <span className="hidden sm:inline">•</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{article.readTime} min read</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight">{article.title}</h1>
          </motion.div>

          {/* Author */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center space-x-4 pb-8 border-b border-foreground/10"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User size={24} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold">{article.author.name}</p>
              <p className="text-sm text-foreground-muted">{article.author.bio}</p>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-foreground/5 text-foreground-muted text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Content - Rendered Markdown */}
          <motion.article
            variants={fadeInUp}
            className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
              prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:mt-12 prose-h1:mb-6
              prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-foreground/10 prose-h2:pb-3
              prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:my-4 prose-ul:space-y-2
              prose-ol:my-4 prose-ol:space-y-2
              prose-li:text-foreground/80
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-foreground/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:italic
              prose-code:bg-foreground/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-hr:border-foreground/10 prose-hr:my-8
            "
          >
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </motion.article>
        </motion.div>
      </div>
    </div>
  )
}
