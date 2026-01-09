'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUp, Instagram, Twitter, Linkedin, Mail, Phone } from 'lucide-react'
import { SOCIAL_LINKS, CONTACT_INFO, NAVIGATION } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-background-secondary border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-display font-bold text-gradient mb-4">
              Table d'Adrian
            </h3>
            <p className="text-foreground-muted text-sm mb-6">
              Personalized Culinary Excellence. Experience Michelin-worthy dining in the comfort of your home.
            </p>
            <div className="flex space-x-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-muted hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-muted hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-muted hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {NAVIGATION.slice(0, 4).map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-foreground-muted hover:text-foreground transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#services" className="text-foreground-muted hover:text-foreground transition-colors text-sm">
                  Private Dinner Parties
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-foreground-muted hover:text-foreground transition-colors text-sm">
                  Weekly Meal Prep
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-foreground-muted hover:text-foreground transition-colors text-sm">
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-foreground-muted hover:text-foreground transition-colors text-sm">
                  Special Occasions
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-foreground-muted text-sm">
                <Phone size={16} />
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-foreground transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2 text-foreground-muted text-sm">
                <Mail size={16} />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-foreground transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
            <p className="text-foreground-subtle text-xs mt-4">
              {CONTACT_INFO.responseTime}
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-foreground-subtle text-sm">
            © {new Date().getFullYear()} Table d'Adrian. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-foreground-subtle hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-foreground-subtle hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-background rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  )
}
