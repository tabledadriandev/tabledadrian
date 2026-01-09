'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Private Event Host',
    content: 'Chef Adrian transformed our anniversary dinner into an unforgettable experience. Every course was perfection.',
    rating: 5,
  },
  {
    name: 'James Thompson',
    role: 'Corporate Client',
    content: 'The corporate event catering exceeded all expectations. Professional, elegant, and absolutely delicious.',
    rating: 5,
  },
  {
    name: 'Emma Wilson',
    role: 'Weekly Meal Prep Client',
    content: 'Having Chef Adrian prepare our weekly meals has been life-changing. Restaurant quality every day.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Special Occasion Client',
    content: 'Our wedding celebration was elevated to new heights. Guests are still talking about the food months later.',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
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
            Client Testimonials
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-foreground-muted leading-relaxed"
          >
            Hear from those who have experienced our culinary excellence
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-foreground/10 rounded-xl p-6 sm:p-8 relative shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="absolute top-4 right-4 text-primary/10" size={40} />
              <div className="flex space-x-1 mb-4 sm:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={14} className="sm:w-4 sm:h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-foreground-muted mb-6 sm:mb-8 relative z-10 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</p>
                <p className="text-xs sm:text-sm text-foreground-subtle mt-1">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
