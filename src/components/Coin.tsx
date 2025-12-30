'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Coin = () => {


  const socialLinks = [
    { name: 'X', icon: '/icons/x_dark.svg', href: 'https://x.com/tabledadrian?s=21' },
    { name: 'Farcaster', icon: '/icons/Farcaster--Streamline-Simple-Icons (1).svg', href: 'https://farcaster.xyz/adrsteph.base.eth' },
    { name: 'Base', icon: '/icons/coinbase.svg', href: 'https://base.app/profile/adrsteph' },
    { name: 'Truth Social', icon: '/icons/truthsocial.svg', href: 'https://truthsocial.com/@tabledadrian' },
    { name: 'Threads', icon: '/icons/threads.svg', href: 'https://www.threads.com/@tabledadrian?igshid=NTc4MTIwNjQ2YQ==' },
    { name: 'Zora', icon: '/icons/zora.svg', href: 'https://zora.co/@tabledadrian' },
    { name: 'GitHub', icon: '/icons/github_dark.svg', href: 'https://github.com/tabledadriandev' },
    { name: 'Gronda', icon: '/icons/Gronda.svg', href: 'https://chefadrianstefan.gronda.com' },
  ];

  return (
    <div className="bg-bg-primary">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-16">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center px-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-display text-text-primary mb-6 tracking-tight"
            >
              Table d&apos;Adrian Coin
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl sm:text-3xl text-accent-primary mb-4 font-display"
            >
              $tabledadrian
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-bg-primary rounded-2xl p-6 sm:p-7 mb-8 max-w-2xl mx-auto"
            >
              <p className="text-sm uppercase tracking-wide text-text-secondary mb-3 text-center">
                Contract address
              </p>
              <p className="text-base sm:text-lg text-text-primary text-center font-medium">
                Coming soon
              </p>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg sm:text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              The official token of Table d&apos;Adrian, your gateway to luxury culinary experiences, 
              digital innovation, and exclusive community benefits.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Q1 Relaunch Section */}
      <section className="section-padding bg-gradient-to-br from-accent-primary/10 via-accent-dark/5 to-accent-primary/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="bg-bg-primary rounded-3xl p-8 md:p-12 shadow-2xl border border-accent-primary/20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary mb-4 bg-gradient-to-r from-accent-primary to-accent-primary/70 bg-clip-text text-transparent">
                  Q1 Relaunch
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-accent-primary to-accent-primary/50 mx-auto mb-6 rounded-full"></div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-text-primary mb-6 font-medium leading-relaxed"
              >
                Exciting updates coming soon for the token and the app
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto"
              >
                Stay tuned for announcements, new features, and major improvements. 
                We&apos;re building something special, and we&apos;ll share every update as it happens.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-8 flex flex-wrap justify-center gap-4"
              >
                <div className="px-6 py-3 bg-accent-primary/10 rounded-full border border-accent-primary/30">
                  <span className="text-accent-primary font-semibold text-sm md:text-base">🚀 Token Relaunch</span>
                </div>
                <div className="px-6 py-3 bg-accent-primary/10 rounded-full border border-accent-primary/30">
                  <span className="text-accent-primary font-semibold text-sm md:text-base">📱 App Updates</span>
                </div>
                <div className="px-6 py-3 bg-accent-primary/10 rounded-full border border-accent-primary/30">
                  <span className="text-accent-primary font-semibold text-sm md:text-base">✨ New Features</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display text-text-primary mb-8 text-center"
            >
              Vision & Story
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Table d&apos;Adrian Coin represents the evolution of luxury culinary experiences into the digital age. 
                Born from our successful NFT launches, exclusive private chef events, and strategic luxury partnerships, 
                this token bridges the gap between traditional fine dining and Web3 innovation.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Our vision extends beyond the kitchen. We are building a comprehensive ecosystem where token holders 
                gain access to exclusive dining experiences, priority booking for private chef services, NFT-based 
                memberships, and integrated event ticketing. As we expand globally, Table d&apos;Adrian Coin will 
                become the cornerstone of a community that values both exceptional cuisine and forward-thinking 
                digital innovation.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                The future holds exciting possibilities: partnerships with luxury brands, expansion into new markets, 
                and the creation of unique digital assets that enhance the real-world dining experience. Every token 
                holder becomes part of this journey, with governance rights and decision-making power in the 
                direction of the Table d&apos;Adrian brand.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                This is more than a token. It is a gateway to a world where culinary excellence meets digital 
                innovation, where community members are rewarded for their loyalty, and where the future of luxury 
                dining is being written today.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pitch Deck Section */}
      <section className="section-padding bg-accent-dark/5">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display text-text-primary mb-4 text-center"
            >
              Investor Pitch Deck
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base text-text-secondary mb-8 max-w-3xl mx-auto text-center leading-relaxed"
            >
              Explore the full vision behind Table d&apos;Adrian Coin – from the problem we&apos;re solving
              to our token model, go‑to‑market strategy, and roadmap. These cards highlight the key slides
              from our official pitch deck.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  title: '1. Vision & Problem',
                  points: [
                    'Bridging luxury dining with Web3 membership',
                    'Fragmented loyalty across restaurants & events',
                    'Lack of transparent value capture for communities',
                  ],
                },
                {
                  title: '2. Solution & Product',
                  points: [
                    'TA token as the unified experience currency',
                    'Private chef network, events, and digital access',
                    'Integrated wallet, marketplace, and governance',
                  ],
                },
                {
                  title: '3. Market & Timing',
                  points: [
                    'Rapid growth in experiential luxury & food tech',
                    'Web3 infrastructure on Base maturing fast',
                    'First‑mover advantage in fine‑dining x crypto',
                  ],
                },
                {
                  title: '4. Tokenomics Snapshot',
                  points: [
                    'Balanced allocations for community, liquidity, team',
                    'Earn TA for on‑chain and off‑chain engagement',
                    'Deflationary design through utility sinks',
                  ],
                },
                {
                  title: '5. Traction & Proof',
                  points: [
                    'Sold‑out private events and collaborations',
                    'Existing brand and audience across platforms',
                    'Early partners in hospitality and Web3',
                  ],
                },
                {
                  title: '6. Roadmap Highlights',
                  points: [
                    'Scale chef network and experiential offerings',
                    'Launch governance and advanced staking',
                    'Expand into new cities and brand partnerships',
                  ],
                },
              ].map((slide, index) => (
                <motion.div
                  key={slide.title}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="card p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-transform duration-300"
                >
                  <div>
                    <h3 className="text-lg font-display text-text-primary mb-3">
                      {slide.title}
                    </h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      {slide.points.map((p) => (
                        <li key={p} className="flex items-start">
                          <span className="mr-2 text-accent-primary">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <a
                href="/tabledadrian-pitch.docx"
                className="btn-primary inline-flex items-center gap-2 group"
              >
                <span>Download Full Pitch Deck (DOCX)</span>
              </a>
              <p className="text-xs sm:text-sm text-text-secondary max-w-xl">
                The downloadable deck includes detailed financial projections, technical architecture,
                token distribution tables, and extended roadmap – ideal for investors and partners.
              </p>
              <Link
                href="/whitepaper"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('td_whitepaper_allowed', '1');
                  }
                }}
                className="btn-secondary inline-flex items-center gap-2 mt-2 group"
              >
                <span>Read Whitepaper</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="section-padding bg-accent-dark/5">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display text-text-primary mb-12 text-center"
            >
              Tokenomics
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="card p-8"
              >
                <h3 className="text-2xl font-display text-text-primary mb-6">Allocation</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Community & Rewards', value: 40, color: 'bg-accent-primary' },
                    { label: 'Liquidity Pool', value: 30, color: 'bg-accent-primary/80' },
                    { label: 'Business Operations', value: 20, color: 'bg-accent-primary/60' },
                    { label: 'Team & Advisors', value: 10, color: 'bg-accent-primary/40' },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-text-secondary">{item.label}</span>
                        <span className="text-text-primary font-semibold">{item.value}%</span>
                      </div>
                      <div className="w-full bg-border-light rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className={`${item.color} h-3 rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card p-8"
              >
                <h3 className="text-2xl font-display text-text-primary mb-6">Utility & Value</h3>
                <ul className="space-y-4 text-text-secondary">
                  <li className="flex items-start">
                    <span className="text-accent-primary mr-3">•</span>
                    <span>Priority booking for private chef services and events</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-primary mr-3">•</span>
                    <span>Exclusive access to NFT-based memberships and digital assets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-primary mr-3">•</span>
                    <span>Governance rights for community decision-making</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-primary mr-3">•</span>
                    <span>Loyalty rewards and discounts on dining experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-primary mr-3">•</span>
                    <span>Early access to new partnerships and exclusive events</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-primary mr-3">•</span>
                    <span>Real business value creation through brand growth</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-accent-dark/5">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display text-text-primary mb-12 text-center"
            >
              Meet the Team
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="card p-8"
              >
                <h3 className="text-2xl font-display text-text-primary mb-4">Adrian Stefan Badea</h3>
                <p className="text-accent-primary mb-4 font-semibold">Founder & Executive Chef</p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Michelin-trained chef with extensive experience in luxury hospitality and private dining. 
                  Founder of Table d&apos;Adrian, leading the brand&apos;s expansion into digital innovation 
                  while maintaining the highest standards of culinary excellence.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Adrian brings deep industry knowledge, a commitment to innovation, and a vision for 
                  integrating Web3 technology with premium culinary experiences.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card p-8"
              >
                <h3 className="text-2xl font-display text-text-primary mb-4">Advisory Board</h3>
                <p className="text-accent-primary mb-4 font-semibold">Strategic Visionaries</p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Our advisory team consists of industry leaders in blockchain technology, luxury brand 
                  management, and culinary innovation. Together, they provide strategic guidance for 
                  responsible growth and ethical business practices.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  The advisory board ensures that Table d&apos;Adrian Coin maintains the highest standards 
                  of transparency, security, and real-world value creation while advancing the brand&apos;s 
                  mission of culinary excellence.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display text-text-primary mb-12 text-center"
            >
              Trust & Security
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: 'Compliance',
                  description: 'Adherence to regulatory standards and ethical business practices',
                },
                {
                  title: 'Security',
                  description: 'Robust security measures and smart contract audits',
                },
                {
                  title: 'Transparency',
                  description: 'Open communication and verifiable business operations',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 text-center"
                >
                  <h3 className="text-xl font-display text-text-primary mb-3">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="card p-8"
            >
              <p className="text-text-secondary leading-relaxed text-center">
                Table d&apos;Adrian Coin is professionally managed with a commitment to responsible innovation. 
                We prioritize security, compliance, and ethical standards in all operations. Our transparent 
                business practices ensure that token holders can trust in the long-term value and growth of 
                the Table d&apos;Adrian ecosystem.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Connect & Engage Section */}
      <section className="section-padding bg-accent-dark/5">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display text-text-primary mb-12 text-center"
            >
              Connect & Engage
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="card p-8"
              >
                <h3 className="text-2xl font-display text-text-primary mb-6">Social Profiles</h3>
                <div className="grid grid-cols-4 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
                      aria-label={`Follow on ${social.name}`}
                    >
                      <Image
                        src={social.icon}
                        alt={social.name}
                        width={24}
                        height={24}
                        className="object-contain mb-2"
                      />
                      <span className="text-xs text-text-secondary text-center">{social.name}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card p-8"
              >
                <h3 className="text-2xl font-display text-text-primary mb-6">Business Inquiries</h3>
                <p className="text-text-secondary leading-relaxed">
                  For investor relations, media inquiries, or business partnership opportunities, please 
                  contact us through our premium contact form.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coin;

