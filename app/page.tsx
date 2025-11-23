'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Credentials from '@/components/Credentials';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import InstallPWA from '@/components/InstallPWA';

export default function Home() {
  return (
    <>
      <Navigation />
      <InstallPWA />
      <main id="main-content" role="main" aria-label="Table d'Adrian - Luxury Private Chef Services">
        <Hero />
        <About />
        <Credentials />
        <Services />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

