'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';

const CONTRACT_ADDRESS = '0xEE47670A6eD7501Aeeb9733efd0bF7D93eD3cb07';
const POOL_ADDRESS = '0xa421606ad7907968228c58d56f20ab1028db588cedb3ece882e9c55515346d7d';
const BASE_SCAN_URL = `https://basescan.org/token/${CONTRACT_ADDRESS}`;
const GECKOTERMINAL_URL = `https://www.geckoterminal.com/base/pools/${POOL_ADDRESS}`;
const UNISWAP_SWAP_URL = `https://app.uniswap.org/#/swap?chain=base&outputCurrency=${CONTRACT_ADDRESS}`;

const Coin = () => {
  const [priceData, setPriceData] = useState({
    price: '0.00',
    marketCap: '0',
    volume24h: '0',
    liquidity: '0',
    holders: '0',
    supply: '0',
  });

  const [showAddress, setShowAddress] = useState(false);
  const [copied, setCopied] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Fetch pool data directly from GeckoTerminal API using pool address
    const fetchTokenData = async () => {
      try {
        // Fetch pool data directly
        const poolResponse = await fetch(`https://api.geckoterminal.com/api/v2/networks/base/pools/${POOL_ADDRESS}`);
        const poolData = await poolResponse.json();
        
        if (poolData.data && poolData.data.attributes) {
          const poolAttrs = poolData.data.attributes;
          
          // Get token price from pool attributes
          const priceUsd = parseFloat(poolAttrs.base_token_price_usd || poolAttrs.price_usd || '0');
          
          // Calculate market cap if available (price * total supply)
          // Get total supply from token relationships if available
          let marketCap = 0;
          if (poolData.data.relationships && poolData.data.relationships.base_token) {
            try {
              const tokenId = poolData.data.relationships.base_token.data.id;
              const tokenResponse = await fetch(`https://api.geckoterminal.com/api/v2/networks/base/tokens/${tokenId.split('_').pop()}`);
              const tokenData = await tokenResponse.json();
              if (tokenData.data && tokenData.data.attributes) {
                const totalSupply = parseFloat(tokenData.data.attributes.total_supply || '0');
                marketCap = priceUsd * totalSupply;
              }
            } catch (tokenError) {
              console.error('Error fetching token supply:', tokenError);
            }
          }
          
          // Extract volume data
          const volume24h = poolAttrs.volume_usd?.h24 || poolAttrs.volume_usd || '0';
          const liquidity = poolAttrs.reserve_in_usd || poolAttrs.fdv_usd || '0';
          
          setPriceData({
            price: priceUsd.toFixed(6),
            marketCap: marketCap > 0 ? formatNumber(marketCap) : formatNumber(parseFloat(poolAttrs.fdv_usd || '0')),
            volume24h: formatNumber(parseFloat(volume24h)),
            liquidity: formatNumber(parseFloat(liquidity)),
            holders: 'Loading...',
            supply: formatNumber(parseFloat(poolAttrs.base_token_price_native_currency || '0')),
          });
          return;
        }
        
        // Fallback: try fetching by token address
        const tokenResponse = await fetch(`https://api.geckoterminal.com/api/v2/networks/base/tokens/${CONTRACT_ADDRESS}`);
        const tokenData = await tokenResponse.json();
        
        if (tokenData.data && tokenData.data.attributes) {
          const attributes = tokenData.data.attributes;
          const priceUsd = parseFloat(attributes.price_usd || '0');
          
          setPriceData({
            price: priceUsd.toFixed(6),
            marketCap: 'N/A',
            volume24h: 'N/A',
            liquidity: 'N/A',
            holders: 'Loading...',
            supply: formatNumber(parseFloat(attributes.total_supply || '0')),
          });
        }
      } catch (error) {
        console.error('Error fetching pool data:', error);
      }
    };

    fetchTokenData();
    const interval = setInterval(fetchTokenData, 60000); // Update every 60 seconds (GeckoTerminal has 30 calls/min limit)
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
  };

  const socialLinks = [
    { name: 'X', icon: '/icons/x_dark.svg', href: 'https://x.com/tabledadrian?s=21' },
    { name: 'Farcaster', icon: '/icons/Farcaster--Streamline-Simple-Icons (1).svg', href: 'https://farcaster.xyz/adrsteph.base.eth' },
    { name: 'Base', icon: '/icons/coinbase.svg', href: 'https://base.app/profile/adrsteph' },
    { name: 'Truth Social', icon: '/icons/truthsocial.svg', href: 'https://truthsocial.com/@tabledadrian' },
    { name: 'Threads', icon: '/icons/threads.svg', href: 'https://www.threads.com/@tabledadrian?igshid=NTc4MTIwNjQ2YQ==' },
    { name: 'Zora', icon: '/icons/zora.svg', href: 'https://zora.co/@adrianstefan' },
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
            className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-md border border-border-light/70 rounded-2xl p-6 sm:p-7 mb-8 max-w-2xl mx-auto shadow-sm"
            >
            <p className="text-sm uppercase tracking-wide text-text-secondary mb-3 text-center">
              Contract details
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setShowAddress((prev) => !prev)}
                className="btn-primary inline-flex items-center justify-center gap-2 px-4 py-2 text-sm"
              >
                <span>{showAddress ? 'Hide Address' : 'Show Address'}</span>
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(CONTRACT_ADDRESS);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch (err) {
                    console.error('Failed to copy address', err);
                  }
                }}
                className="btn-secondary inline-flex items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm"
              >
                <span>Copy Address</span>
                {copied && <span className="text-[11px] text-accent-primary">Copied</span>}
              </button>
              <a
                href={BASE_SCAN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-2 px-4 py-2 text-sm"
              >
                <span>View on BaseScan</span>
              </a>
            </div>
            {showAddress && (
              <div className="mt-4 rounded-lg bg-bg-primary/80 dark:bg-accent-dark/60 px-3 py-2 text-center">
                <code className="text-text-primary font-mono text-xs sm:text-sm break-all">
                  {CONTRACT_ADDRESS}
                </code>
              </div>
            )}
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

      {/* Live Data Section */}
      <section className="section-padding bg-accent-dark/5">
        <div className="container-custom">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-12 text-center">
              Live Market Data
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { label: 'Price (USD)', value: `$${priceData.price}` },
                { label: 'Market Cap', value: `$${priceData.marketCap}` },
                { label: '24h Volume', value: `$${priceData.volume24h}` },
                { label: 'Liquidity', value: `$${priceData.liquidity}` },
                { label: 'Holders', value: priceData.holders },
                { label: 'Supply', value: priceData.supply },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 text-center"
                >
                  <p className="text-sm text-text-secondary mb-2">{metric.label}</p>
                  <p className="text-xl md:text-2xl font-semibold text-text-primary">{metric.value}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center space-y-4">
              <a
                href={GECKOTERMINAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                View Full Chart on GeckoTerminal
              </a>
              <div>
                <a
                  href={UNISWAP_SWAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Image
                    src="/icons/coinbase.svg"
                    alt="Base"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  Trade on Base
                </a>
              </div>
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
                className="btn-primary inline-flex items-center gap-2"
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
                className="btn-secondary inline-flex items-center gap-2 mt-2"
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
                <p className="text-text-secondary mb-6 leading-relaxed">
                  For investor relations, media inquiries, or business partnership opportunities, please 
                  contact us through our premium contact form.
                </p>
                <Link href="/#contact" className="btn-primary inline-block">
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coin;

