'use client'

import { motion } from 'framer-motion'
import { Award, GraduationCap, Users, Calendar } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { credentials as chefCredentials } from '@/lib/credentials'

const credentials = [
  {
    icon: GraduationCap,
    title: chefCredentials.en.ehl,
    description: 'Prestigious hospitality education',
  },
  {
    icon: Award,
    title: chefCredentials.en.stanford,
    description: 'Health & nutrition expertise',
  },
  {
    icon: Calendar,
    title: `${chefCredentials.en.yearsShort} ${chefCredentials.en.yearsLabel}`,
    description: 'Culinary experience',
  },
  {
    icon: Users,
    title: '100+ Clients',
    description: 'Satisfied customers',
  },
]

export function Credentials() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto"
        >
          {credentials.map((credential, index) => {
            const Icon = credential.icon
            return (
              <motion.div
                key={credential.title}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon size={24} className="sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-display font-semibold mb-1 sm:mb-2 text-foreground">
                  {credential.title}
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted">
                  {credential.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
