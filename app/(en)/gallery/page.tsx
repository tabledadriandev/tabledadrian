'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { DishPhoto } from '@/components/media/DishPhoto'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { GALLERY } from '@/data/gallery'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Garnish, type GarnishItem } from '@/components/motion/Garnish'

const garnish: GarnishItem[] = [
  { kind: 'thyme', x: '84%', y: '6rem', size: 70, depth: 0.85, rotate: 18, lite: true },
  { kind: 'line-leaf', x: '70%', y: '3rem', size: 80, depth: 0.25, rotate: -28 },
  { kind: 'flake', x: '92%', y: '15rem', size: 26, depth: 0.7, rotate: 22 },
]

export default function GalleryPage() {
  const [active, setActive] = useState<(typeof GALLERY)[number] | null>(null)
  const french = (usePathname() || '').startsWith('/fr')

  return (
    <div className="relative bg-background pb-20 pt-28 sm:pt-32">
      <Garnish items={garnish} className="page-garnish" />
      <div className="container relative">
        <SectionHeading
          as="h1"
          eyebrow={french ? 'Galerie' : 'Gallery'}
          title={french ? 'Les assiettes' : 'From the pass'}
          description={french ? 'Des assiettes qu’Adrian a envoyées à table. Ouvrez une image.' : 'Plates Adrian has sent to the table. Click any picture to open it.'}
          animate={false}
          split="chars"
        />

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {GALLERY.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActive(image)}
              className="gallery-tile mb-4 block w-full break-inside-avoid text-left"
              data-skew={1 + (i % 3) * 0.35}
              data-cursor="View"
            >
              <span className="relative block overflow-hidden" data-reveal={i % 3 === 1 ? 'iris' : 'up'} data-distort>
                <DishPhoto
                  src={image.src}
                  alt={image.caption}
                  width={800}
                  height={1100}
                  className="h-auto w-full"
                />
              </span>
              <span className="sr-only">{image.title}</span>
            </button>
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
              <DishPhoto
                src={active.src}
                alt={active.caption}
                width={1200}
                height={1600}
                className="max-h-[80vh] w-auto rounded-2xl object-contain"
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
