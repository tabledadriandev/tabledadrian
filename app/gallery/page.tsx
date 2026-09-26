'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { GALLERY } from '@/data/gallery'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function GalleryPage() {
  const [active, setActive] = useState<(typeof GALLERY)[number] | null>(null)

  return (
    <div className="bg-background pb-20 pt-28 sm:pt-32">
      <div className="container">
        <SectionHeading
          as="h1"
          eyebrow="Gallery"
          title="From the pass"
          description="Plates Adrian has sent to the table. Click any picture to open it."
          animate={false}
        />

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {GALLERY.map((image, i) => (
            <motion.button
              key={image.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.04, duration: 0.45 }}
              onClick={() => setActive(image)}
              className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.5rem] text-left"
            >
              <Image
                src={image.src}
                alt={image.caption}
                width={800}
                height={1100}
                className="photo h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
              <span className="sr-only">{image.title}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 rounded-full bg-ink-foreground/10 p-2 text-ink-foreground"
              aria-label="Close"
              onClick={() => setActive(null)}
            >
              <X size={20} />
            </button>
            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="relative max-h-[90vh] max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.caption}
                width={1200}
                height={1600}
                className="photo max-h-[80vh] w-auto rounded-2xl object-contain"
              />
              <figcaption className="mt-4 text-center text-sm text-ink-foreground">
                <span className="font-display text-2xl">{active.title}</span>
                <span className="mt-1 block text-ink-foreground/70">{active.caption}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
