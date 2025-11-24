'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  Download, 
  Check, 
  Clock, 
  Zap, 
  Shield, 
  Heart,
  Sparkles,
  Smartphone as Phone,
  X,
  Mail
} from 'lucide-react';

export default function AppDownloadPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [platformsRef, platformsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // Waitlist form state
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false);
  const [waitlistStatus, setWaitlistStatus] = useState<string | null>(null);

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const features = [
    {
      icon: Heart,
      title: 'Health Tracking',
      description: 'Monitor your wellness journey with comprehensive health metrics and progress tracking.',
      color: 'text-red-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Native performance with instant load times and smooth animations.',
      color: 'text-yellow-500',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and stored securely with industry-standard security.',
      color: 'text-blue-500',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Coach',
      description: 'Get personalized wellness advice powered by advanced AI technology.',
      color: 'text-purple-500',
    },
    {
      icon: Check,
      title: 'Meal Planning',
      description: 'Create custom meal plans tailored to your dietary needs and preferences.',
      color: 'text-green-500',
    },
    {
      icon: Phone,
      title: 'Offline Mode',
      description: 'Access your data and features even without an internet connection.',
      color: 'text-indigo-500',
    },
  ];

  const benefits = [
    {
      title: 'Native Performance',
      description: 'Experience blazing-fast speeds with native app performance optimized for each platform.',
    },
    {
      title: 'Push Notifications',
      description: 'Stay on track with timely reminders for meals, workouts, and wellness check-ins.',
    },
    {
      title: 'Offline Access',
      description: 'Your wellness data is always accessible, even when you\'re offline.',
    },
    {
      title: 'Better Battery Life',
      description: 'Optimized for efficiency, using less battery than web browsers.',
    },
    {
      title: 'Home Screen Access',
      description: 'Quick access from your home screen - no need to open a browser.',
    },
    {
      title: 'Enhanced Security',
      description: 'Biometric authentication and secure local storage for your sensitive data.',
    },
  ];

  const platforms = [
    {
      name: 'Windows',
      iconPath: '/icons/windows.svg',
      description: 'Desktop app for Windows 10/11',
      color: 'from-blue-500 to-blue-600',
      iconColor: 'text-blue-500',
      available: false,
    },
    {
      name: 'macOS',
      iconPath: '/icons/apple.svg',
      description: 'Native app for Mac',
      color: 'from-gray-700 to-gray-800',
      iconColor: 'text-gray-600',
      available: false,
    },
    {
      name: 'iOS',
      iconPath: '/icons/apple.svg',
      description: 'iPhone and iPad app',
      color: 'from-gray-800 to-black',
      iconColor: 'text-gray-700',
      available: false,
    },
    {
      name: 'Android',
      iconPath: '/icons/android-icon.svg',
      description: 'Android phone and tablet',
      color: 'from-green-500 to-green-600',
      iconColor: 'text-green-500',
      available: false,
    },
  ];

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistSubmitting(true);
    setWaitlistStatus('Adding you to the waitlist...');
    
    try {
      // Use API route instead of direct EmailJS call
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: waitlistEmail }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setWaitlistStatus(data.message || 'Thank you! You\'ve been added to the waitlist. We\'ll notify you when the app launches.');
        setWaitlistEmail('');
        setTimeout(() => {
          setShowWaitlistModal(false);
          setWaitlistStatus(null);
        }, 3000);
      } else {
        throw new Error(data.error || 'Failed to join waitlist');
      }
    } catch (err: any) {
      console.error('Error sending waitlist email:', err);
      
      let errorMessage = 'Sorry, something went wrong. Please try again later.';
      
      if (err.message?.includes('not configured') || err.message?.includes('Email service')) {
        errorMessage = 'Email service is not configured. Please contact the website administrator.';
      } else if (err.message) {
        errorMessage = `Error: ${err.message}`;
      }
      
      setWaitlistStatus(errorMessage);
    } finally {
      setWaitlistSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />
      <main id="main-content" role="main" aria-label="Download Table d'Adrian Wellness App">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-white to-cream/30 overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute top-20 left-10 w-72 h-72 bg-accent-primary/5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute bottom-20 right-10 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl"
            />
          </div>

          <div className="container-custom py-20 md:py-32 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-7xl lg:text-8xl font-display text-text-primary mb-6 leading-tight"
              >
                Table d'Adrian
                <br />
                <span className="bg-gradient-to-r from-accent-primary to-accent-primary/70 bg-clip-text text-transparent">
                  Wellness App
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Transform your wellness journey with our powerful native app. 
                Track your health, plan meals, connect with coaches, and achieve your goals—all in one beautiful, fast, and secure experience.
              </motion.p>

              {/* Platform Download Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8"
              >
                {platforms.map((platform, index) => (
                  <motion.div
                    key={platform.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-accent-primary/20`}>
                      <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <img
                          src={platform.iconPath}
                          alt={platform.name}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <h3 className="text-lg font-display text-text-primary mb-1">{platform.name}</h3>
                      <p className="text-xs text-text-secondary mb-4">{platform.description}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled
                        className={`w-full px-4 py-2.5 bg-gradient-to-r ${platform.color} text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-md`}
                      >
                        <Download className="w-4 h-4" />
                        <span>Coming Soon</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-text-secondary text-sm flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                We're working hard to bring you the best experience across all platforms
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20 md:py-32 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-display text-text-primary mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Everything you need for a complete wellness experience, all in one beautiful app
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group bg-gradient-to-br from-cream/50 to-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-cream/50"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color.replace('text-', 'bg-')}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-2xl font-display text-text-primary mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section ref={benefitsRef} className="py-20 md:py-32 bg-gradient-to-br from-cream/30 via-white to-cream/30">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-display text-text-primary mb-4">
                Why Choose Our App?
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Experience the difference with a native app designed for your wellness journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex gap-4 bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                      <Check className="w-6 h-6 text-accent-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-display text-text-primary mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-text-secondary">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Details Section */}
        <section ref={platformsRef} className="py-20 md:py-32 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={platformsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-display text-text-primary mb-4">
                Available on All Platforms
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Download the app on your preferred device and take your wellness journey with you
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={platformsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="relative group"
                >
                  <div className="bg-gradient-to-br from-white to-cream/30 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-cream/50 h-full flex flex-col">
                    <div className="flex items-center justify-center mb-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 p-3`}>
                        <img
                          src={platform.iconPath}
                          alt={platform.name}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl font-display text-text-primary mb-2 text-center">
                      {platform.name}
                    </h3>
                    <p className="text-text-secondary mb-6 text-center text-sm flex-grow">
                      {platform.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled
                      className={`w-full px-6 py-4 bg-gradient-to-r ${platform.color} text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-300`}
                    >
                      <Download className="w-5 h-5" />
                      <span>Coming Soon</span>
                      <Clock className="w-4 h-4 opacity-70" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-accent-primary via-accent-primary/90 to-accent-primary text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }} />
          </div>

          <div className="container-custom text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="inline-block mb-8"
              >
                <Sparkles className="w-16 h-16 mx-auto" />
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-display mb-6">
                Get Notified When We Launch
              </h2>
              <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
                Be the first to experience the future of wellness. Join our waitlist and get early access to the app.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-accent-primary rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 mx-auto"
                onClick={() => setShowWaitlistModal(true)}
              >
                <Heart className="w-5 h-5" />
                <span>Join the Waitlist</span>
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <button
              onClick={() => {
                setShowWaitlistModal(false);
                setWaitlistEmail('');
                setWaitlistStatus(null);
              }}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-accent-primary" />
              </div>
              <h3 className="text-2xl font-display text-text-primary mb-2">
                Join the Waitlist
              </h3>
              <p className="text-text-secondary">
                Be the first to know when the app launches
              </p>
            </div>

            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div>
                <label htmlFor="waitlist-email" className="block text-sm font-medium text-text-primary mb-2">
                  Email Address *
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary transition-all duration-300 text-text-primary"
                  disabled={waitlistSubmitting}
                />
              </div>

              {waitlistStatus && (
                <div className={`p-3 rounded-md text-sm ${
                  waitlistStatus.includes('Thank you') 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : waitlistStatus.includes('Error') || waitlistStatus.includes('wrong')
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {waitlistStatus}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowWaitlistModal(false);
                    setWaitlistEmail('');
                    setWaitlistStatus(null);
                  }}
                  className="flex-1 px-4 py-3 border border-border-light rounded-md text-text-primary hover:bg-border-light transition-colors"
                  disabled={waitlistSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={waitlistSubmitting || !waitlistEmail}
                  className="flex-1 px-4 py-3 bg-accent-primary text-white rounded-md font-semibold hover:bg-accent-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {waitlistSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4" />
                      <span>Join Waitlist</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
