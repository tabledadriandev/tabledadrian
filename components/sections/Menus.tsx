'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { MENUS } from '@/data/menus'
import { Button } from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const preview = MENUS.slice(0, 4)

export function Menus() {
  return (
    <section id="menus" className="bg-background-secondary py-20 sm:py-24 lg:py-32">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-xl">
            <motion.span variants={fadeInUp} className="eyebrow mb-5">
              Private chef menus
            </motion.span>
            <motion.h2 variants={fadeInUp} className="display text-4xl sm:text-5xl md:text-6xl">
              A menu for the evening, not a catalogue.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-5 text-base leading-relaxed text-foreground-muted">
              France, Italy, the coast, Asia. Each book is a starting point. Adrian rewrites it for
              your guests.
            </motion.p>
          </div>
          <motion.div variants={fadeInUp}>
            <Button href="/menus" variant="ink">
              All menus
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((menu, i) => (
            <motion.div
              key={menu.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.55 }}
            >
              <Link href={`/menus/${menu.id}`} className="group surface block overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden bg-background-secondary">
                  <Image
                    src={menu.cover}
                    alt={menu.title}
                    fill
                    className="photo object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[11px] uppercase tracking-caps text-foreground-subtle">{menu.region}</p>
                  <h3 className="mt-1 font-display text-2xl">{menu.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-foreground-muted">{menu.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
