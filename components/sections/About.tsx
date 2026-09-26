'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { fadeInUp, staggerContainer, imageReveal } from '@/lib/animations'
import { ABOUT_IMAGE } from '@/data/gallery'

export function About() {
  return (
    <section id="about" className="grain bg-background py-20 sm:py-24 lg:py-32">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src={ABOUT_IMAGE.src}
                alt="Beef Wellington with pea puree and roasted vegetables, plated by Table d'Adrian"
                fill
                className="photo object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="surface absolute -bottom-6 -right-4 max-w-[15rem] p-5 sm:-right-8"
            >
              <blockquote className="font-display text-xl italic leading-snug text-foreground">
                &ldquo;Good food should make you feel better tomorrow, not just tonight.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[11px] uppercase tracking-caps text-foreground-subtle">
                Chef Adrian
              </figcaption>
            </motion.figure>
          </motion.div>

          {/* Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-6 lg:col-start-7"
          >
            <motion.span variants={fadeInUp} className="eyebrow mb-5">
              About the chef
            </motion.span>
            <motion.h2 variants={fadeInUp} className="display text-4xl sm:text-5xl md:text-6xl">
              Two disciplines, <em className="italic text-primary">one</em> table.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-7 text-base leading-relaxed text-foreground-muted sm:text-lg">
              Adrian trained at EHL, the Swiss hospitality school, and spent fifteen years in demanding
              kitchens across Europe before adding a Stanford certification in health and nutrition.
              That pairing is the whole idea: food with the precision of a fine-dining pass and the
              intent of a nutritionist.
            </motion.p>
            <motion.p variants={fadeInUp} className="mt-5 text-base leading-relaxed text-foreground-muted sm:text-lg">
              Whether it is a celebration for twenty or a week of quiet dinners for two, each menu is
              written from scratch around your preferences, allergies and the season&apos;s market.
            </motion.p>

            <motion.dl variants={fadeInUp} className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
              {[
                ['EHL', 'Swiss diploma'],
                ['Stanford', 'Nutrition'],
                ['15+', 'Years'],
                ['100+', 'Households'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl text-foreground">{v}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-caps text-foreground-subtle">{l}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div variants={fadeInUp} className="mt-10">
              <Button href="/contact" variant="outline">
                Start a conversation
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
