'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { fadeInUp, staggerContainer, imageReveal } from '@/lib/animations'

const galleryImages = [
  { id: 1, title: 'Signature Dish', url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80' },
  { id: 2, title: 'Fine Dining Setup', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80' },
  { id: 3, title: 'Plated Perfection', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80' },
  { id: 4, title: 'Culinary Artistry', url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80' },
  { id: 5, title: 'Elegant Presentation', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80' },
  { id: 6, title: 'Chef at Work', url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80' },
]

export function Gallery() {
  return (
    <section id="gallery" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 text-foreground"
          >
            Gallery
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-foreground-muted leading-relaxed"
          >
            A visual journey through our culinary creations
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-6xl mx-auto"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={imageReveal}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                <h3 className="text-white font-display text-lg sm:text-xl">
                  {image.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center space-x-2 text-primary font-medium hover:space-x-3 transition-all text-sm sm:text-base px-4 py-2 rounded-lg hover:bg-foreground/5"
          >
            <span>View Full Gallery</span>
            <ArrowRight size={18} className="sm:w-5 sm:h-5 hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
