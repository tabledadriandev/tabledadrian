'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, User } from 'lucide-react'
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
    <div className="min-h-screen pt-24 pb-16">
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
            className="aspect-video bg-foreground/5 rounded-xl overflow-hidden mb-8"
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent-burgundy/20 flex items-center justify-center">
              <span className="text-foreground-muted">{article.title}</span>
            </div>
          </motion.div>

          {/* Meta */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="flex items-center space-x-4 text-sm text-foreground-muted">
              <span className="text-primary font-medium">{article.category}</span>
              <span>•</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{article.readTime} min read</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold">{article.title}</h1>
          </motion.div>

          {/* Author */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center space-x-4 pb-8 border-b border-border"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User size={24} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold">{article.author.name}</p>
              <p className="text-sm text-foreground-muted">{article.author.bio}</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fadeInUp}
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
          />
        </motion.div>
      </div>
    </div>
  )
}
