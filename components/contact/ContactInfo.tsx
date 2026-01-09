'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function ContactInfo() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={fadeInUp} className="bg-white border border-foreground/10 rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-display font-semibold mb-6">Get in Touch</h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Phone</h3>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="text-foreground-muted hover:text-primary transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Email</h3>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-foreground-muted hover:text-primary transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Service Areas</h3>
              <p className="text-foreground-muted">London & Europe</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Response Time</h3>
              <p className="text-foreground-muted">{CONTACT_INFO.responseTime}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="bg-white border border-foreground/10 rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-display font-semibold mb-4">Booking Process</h3>
        <div className="space-y-4">
          {[
            'Initial consultation',
            'Menu design & confirmation',
            'Preparation & service',
            'Follow-up & feedback',
          ].map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-xs font-medium">{index + 1}</span>
              </div>
              <p className="text-foreground-muted">{step}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
