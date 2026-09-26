'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { HOME_GALLERY } from '@/data/gallery'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function Gallery() {
  return (
    <section id="gallery" className="grain bg-background py-20 sm:py-24 lg:py-32">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-16 md:flex-row md:items-end"
        >
          <div className="max-w-xl">
            <motion.span variants={fadeInUp} className="eyebrow mb-5">
              From the kitchen
            </motion.span>
            <motion.h2 variants={fadeInUp} className="display text-4xl sm:text-5xl md:text-6xl">
              Plates from Adrian&apos;s table.
            </motion.h2>
          </div>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
            <Button href="/gallery" variant="outline">
              Full gallery
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="/menus" variant="ghost">
              The menus
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid auto-rows-[200px] gap-3 sm:auto-rows-[240px] md:grid-cols-4 md:gap-4">
          {HOME_GALLERY.map((image, index) => (
            <motion.figure
              key={image.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-[1.5rem] ${image.span || ''}`}
            >
              <Image
                src={image.src}
                alt={image.caption}
                fill
                className="photo object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent p-5 text-sm text-ink-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {image.title}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
