'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { enableContentProtection } from '@/utils/contentProtection';

type SectionId =
  | 'executive-summary'
  | 'problem'
  | 'solution'
  | 'token-economics'
  | 'infrastructure'
  | 'revenue'
  | 'governance'
  | 'roadmap'
  | 'team'
  | 'legal'
  | 'risks';

const sections: { id: SectionId; label: string }[] = [
  { id: 'executive-summary', label: 'Executive Summary' },
  { id: 'problem', label: 'Problem Statement' },
  { id: 'solution', label: 'Solution Architecture' },
  { id: 'token-economics', label: 'Token Economics ($TA)' },
  { id: 'infrastructure', label: 'Technical Infrastructure' },
  { id: 'revenue', label: 'Revenue Model' },
  { id: 'governance', label: 'Governance & DAO' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'team', label: 'Team & Advisors' },
  { id: 'legal', label: 'Legal & Compliance' },
  { id: 'risks', label: 'Risk Factors' },
];

export default function WhitepaperClient() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SectionId>('executive-summary');
  const [progress, setProgress] = useState(0);
  const [accessAllowed, setAccessAllowed] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Session-based access: only allow if user arrived via the Coin page button
    if (typeof window !== 'undefined') {
      const flag = sessionStorage.getItem('td_whitepaper_allowed');
      if (flag === '1') {
        setAccessAllowed(true);
      } else {
        setAccessAllowed(false);
      }
    }
  }, []);

  useEffect(() => {
    // Enable content protection (no right-click, block copy/print shortcuts, best-effort screenshot key)
    const cleanupProtection = enableContentProtection();

    return () => {
      cleanupProtection();
    };
  }, []);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const total = scrollHeight - clientHeight;
      const value = total > 0 ? (scrollTop / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, value)));
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-section-id') as SectionId | null;
          if (id) {
            setActiveSection(id);
          }
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: contentRef.current,
      threshold: 0.3,
    });

    const container = contentRef.current;
    if (!container) return;

    const sectionNodes = container.querySelectorAll<HTMLElement>('[data-section-id]');
    sectionNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  if (!accessAllowed) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center px-4">
        <div className="max-w-md w-full border border-border-light rounded-2xl bg-white/90 shadow-lg p-6 text-center space-y-4">
          <h1 className="text-2xl font-display text-text-primary">Restricted Access</h1>
          <p className="text-sm text-text-secondary">
            The $tabledadrian whitepaper is available to visitors who access it from the official token
            page.
          </p>
          <button
            type="button"
            onClick={() => router.push('/coin')}
            className="btn-primary inline-flex items-center justify-center gap-2 px-4 py-2 text-sm"
          >
            Back to Token Overview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Watermark */}
      <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center opacity-10">
        <div className="text-4xl sm:text-6xl font-display font-bold text-text-secondary/60 rotate-45 whitespace-nowrap">
          Table d&apos;Adrian – Confidential
        </div>
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-accent-primary/10 z-50">
        <div
          className="h-full bg-accent-primary transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative z-50 flex flex-col lg:flex-row max-w-6xl mx-auto pt-16 pb-10 lg:pb-14 px-4 sm:px-6 gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 lg:flex-shrink-0">
          <div className="sticky top-20 hidden lg:block">
            <h2 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide">
              Whitepaper Sections
            </h2>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(section.id);
                    if (el && contentRef.current) {
                      const container = contentRef.current;
                      const rect = el.getBoundingClientRect();
                      const containerRect = container.getBoundingClientRect();
                      const offset = rect.top - containerRect.top + container.scrollTop - 16;
                      container.scrollTo({ top: offset, behavior: 'smooth' });
                    }
                  }}
                  className={`w-full text-left text-xs sm:text-sm px-3 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-accent-primary text-white'
                      : 'bg-white/10 text-text-secondary hover:bg-white/20'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Scrollable content */}
        <div
          ref={contentRef}
          className="flex-1 max-h-[calc(100vh-6rem)] lg:max-h-[calc(100vh-5rem)] overflow-y-auto pr-1 select-none"
        >
          <div className="space-y-10 pb-16">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-accent-primary mb-1">
                  Table d&apos;Adrian Token
                </p>
                <h1 className="text-2xl sm:text-3xl font-display text-text-primary">
                  $tabledadrian Whitepaper
                </h1>
              </div>
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-secondary inline-flex items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm"
              >
                <span>← Back</span>
              </button>
            </header>

            {/* Sections */}
            {/* EXECUTIVE SUMMARY */}
            <section id="executive-summary" data-section-id="executive-summary">
              <h2 className="text-2xl sm:text-3xl font-display mb-4">Executive Summary</h2>
              <p className="text-sm sm:text-base text-text-secondary">
                Table d&apos;Adrian is the first blockchain‑native protocol for verified human health
                optimization. By combining precision nutrition engineering, cryptographic data ownership,
                and tokenized incentive alignment, the project aims to build the infrastructure layer for
                the global longevity economy.
              </p>
              <p className="text-sm sm:text-base text-text-secondary">
                Unlike generic wellness apps, Table d&apos;Adrian creates a bidirectional feedback loop
                between real‑world metabolic inputs and immutable on‑chain health records. The
                $tabledadrian token serves as the coordination mechanism across users, specialists,
                researchers, and institutions.
              </p>
              <p className="text-sm sm:text-base text-text-secondary">
                This whitepaper describes the technical architecture, economic model, governance
                framework, and roadmap for establishing &quot;Proof of Health&quot; as a foundational
                primitive in insurance, employment, clinical research, and elite performance.
              </p>
            </section>

            {/* 1. PROBLEM STATEMENT */}
            <section id="problem" data-section-id="problem">
              <h2 className="text-2xl sm:text-3xl font-display mb-4">Problem Statement</h2>
              <p className="text-sm sm:text-base text-text-secondary">
                The global longevity market is expanding rapidly, yet the underlying infrastructure remains
                fragmented and misaligned. Nutrition data, lab results, wearable streams, and medical
                records typically live in isolated systems with no shared standard or coordination layer.
              </p>
              <p className="text-sm sm:text-base text-text-secondary">
                Users rarely own or control their health data, generic meal plans are not tied to measurable
                outcomes, and specialists operate without a unified, verifiable data backbone. High‑net‑worth
                individuals can spend significant sums on longevity optimization yet still lack a system that
                tracks interventions against clear biomarker changes and long‑term results.
              </p>
            </section>

            {/* 2. THE TABLE D&apos;ADRIAN SOLUTION */}
            <section id="solution" data-section-id="solution">
              <h2 className="text-2xl sm:text-3xl font-display mb-4">Solution Architecture</h2>
              <p className="text-sm sm:text-base text-text-secondary">
                Table d&apos;Adrian is structured as a multi‑layer protocol that links real‑world health
                behavior to verifiable, on‑chain records. At the top sits the application layer (web and
                mobile) for meal logging, biomarker tracking, and AI‑assisted coaching.
              </p>
              <p className="text-sm sm:text-base text-text-secondary mt-2">
                Beneath this, a vetted specialist network (chefs, nutritionists, and clinicians) can verify
                and sign off on interventions, with hashes of key records anchored on‑chain. A dedicated token
                layer coordinates payments, staking, and incentives, while an opt‑in research layer enables
                anonymized datasets to be licensed to institutions under user‑controlled permissions.
              </p>
            </section>

            {/* 3. TOKEN ECONOMICS */}
            <section id="token-economics" data-section-id="token-economics">
              <h2 className="text-2xl sm:text-3xl font-display mb-4">Token Economics ($tabledadrian)</h2>
              <p className="text-sm sm:text-base text-text-secondary font-semibold mb-2">
                Core parameters
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-text-secondary space-y-1 mb-4">
                <li>Token name: Table d&apos;Adrian Token</li>
                <li>Ticker: $tabledadrian</li>
                <li>Network: Base (chain id 8453)</li>
                <li>Contract address: Coming soon</li>
                <li>Standard: ERC‑20 utility and governance token</li>
              </ul>

              <p className="text-sm sm:text-base text-text-secondary font-semibold mb-2">
                Primary utilities
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-text-secondary space-y-1 mb-4">
                <li>Payments for memberships, specialist bookings, biomarker kits, and retreats.</li>
                <li>Staking for higher access tiers, governance influence, and yield.</li>
                <li>Outcome‑based rewards for specialists who improve verified biomarkers.</li>
                <li>Participation in protocol governance and roadmap decisions.</li>
                <li>Sharing in data‑licensing proceeds via periodic &quot;data dividend&quot; distributions.</li>
              </ul>

              <p className="text-sm sm:text-base text-text-secondary font-semibold mb-2">
                Deflationary mechanics
              </p>
              <p className="text-sm sm:text-base text-text-secondary">
                Fiat revenues collected through traditional payment rails can be routed through on‑chain
                liquidity to acquire $tabledadrian. A portion of these tokens is then burned and the
                remainder added to liquidity, tightening circulating supply as protocol usage grows while
                deepening markets for long‑term participants.
              </p>
            </section>

            {/* Technical Infrastructure (kept concise, complements section 2) */}
            <section id="infrastructure" data-section-id="infrastructure">
              <h2 className="text-2xl sm:text-3xl font-display mb-4">Technical Infrastructure</h2>
              <p className="text-sm sm:text-base text-text-secondary mt-2">
                The protocol is deployed on Base to benefit from Ethereum security with low transaction
                costs. Smart contracts manage token flows, staking, and access control, while sensitive
                health information is stored off‑chain in encrypted form with on‑chain hashes providing an
                immutable audit trail. APIs and integration hooks are designed for labs, clinics, and
                research partners that need verifiable but privacy‑preserving datasets.
              </p>
            </section>

            {/* Revenue Model */}
            <section id="revenue" data-section-id="revenue">
              <h2 className="text-2xl sm:text-3xl font-display mb-4">Revenue Model</h2>
              <p className="text-sm sm:text-base text-text-secondary">
                The business model is diversified across software subscriptions, specialist services, and
                data partnerships so that no single stream dominates protocol health.
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-text-secondary space-y-1">
                <li>Memberships from entry‑level to concierge tiers for individuals and families.</li>
                <li>Commissions on specialist bookings and curated longevity programs.</li>
                <li>Sales of at‑home biomarker testing kits and related equipment.</li>
                <li>Anonymized, opt‑in data licensing to research institutions and clinics.</li>
                <li>Marketplace fees on vetted partner products (supplements, devices, experiences).</li>
              </ul>
              <p className="text-sm sm:text-base text-text-secondary mt-2">
                A portion of these revenues can be routed to the treasury and on‑chain mechanisms that buy
                and redistribute or burn tokens, tying protocol success to long‑term holder alignment rather
                than short‑term speculation.
              </p>
            </section>

            {/* 4. GOVERNANCE & DAO */}
            <section id="governance" data-section-id="governance">
              <h2 className="text-2xl sm:text-3xl font-display mb-4">Governance &amp; DAO</h2>
              <p className="text-sm sm:text-base text-text-secondary">
                Governance is introduced progressively, beginning with advisory voting and moving toward
                binding decisions as the protocol and community mature. Token holders can propose and vote
                on changes to fees, staking rewards, data‑sharing policies, and treasury allocations.
              </p>
              <p className="text-sm sm:text-base text-text-secondary">
                Clear proposal standards, quorum thresholds, and transparent voting interfaces will help
                ensure that governance remains accessible, credible, and focused on long‑term brand and
                community health.
              </p>
            </section>

            {/* 5. ROADMAP */}
            <section id="roadmap" data-section-id="roadmap">
              <h2 className="text-2xl sm:text-3xl font-display mb-4">Roadmap</h2>
              <p className="text-sm sm:text-base text-text-secondary">
                The near‑term roadmap focuses on shipping a robust MVP, validating the specialist network,
                and proving that biomarker‑driven interventions can be coordinated at scale.
              </p>
              <p className="text-sm sm:text-base text-text-secondary">
                Subsequent phases expand to additional cities and clinical partners, introduce richer
                biomarker modules, and formalize &quot;Proof of Health&quot; as a reusable standard for
                insurers, employers, and research institutions that need verifiable wellness outcomes.
              </p>
            </section>

            {/* 6. TEAM & ADVISORS */}
            <section id="team" data-section-id="team">
              <h2 className="text-2xl sm:text-3xl font-display mb-4">Team &amp; Advisors</h2>
              <p className="text-sm sm:text-base text-text-secondary">
                Table d&apos;Adrian is founded by Adrian Stefan, a builder at the intersection of culinary
                craft and Web3 infrastructure. The broader team spans protocol engineering, data science,
                and product design focused on long‑term health outcomes rather than short‑term engagement.
              </p>
              <p className="text-sm sm:text-base text-text-secondary">
                Advisors include experienced chefs, longevity researchers, and DeSci practitioners who
                provide guidance on clinical relevance, data governance, and ecosystem partnerships.
              </p>
            </section>

            {/* 7. LEGAL & COMPLIANCE */}
            <section id="legal" data-section-id="legal">
              <h2 className="text-2xl sm:text-3xl font-display mb-4">Legal &amp; Compliance</h2>
              <p className="text-sm sm:text-base text-text-secondary">
                The protocol is designed around user consent and data minimization. Sensitive information is
                encrypted, access is controlled by the user, and integrations are evaluated for compliance
                with applicable data‑protection regimes in relevant jurisdictions.
              </p>
              <p className="text-sm sm:text-base text-text-secondary">
                $tabledadrian is intended to function as a utility and governance token within the ecosystem
                rather than as a financial security, and the team will work with specialized counsel to stay
                aligned with evolving regulation around digital assets, privacy, and consumer protection.
              </p>
            </section>

            {/* 8. RISK FACTORS */}
            <section id="risks" data-section-id="risks">
              <h2 className="text-2xl sm:text-3xl font-display mb-4">Risk Factors</h2>
              <p className="text-sm sm:text-base text-text-secondary">
                Participation in any cryptographic token ecosystem involves risk, including the potential
                for partial or total loss of capital. Prospective participants should carefully evaluate
                their own risk tolerance and seek independent advice.
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-text-secondary space-y-1">
                <li>Regulatory changes that impact token usage, classification, or data handling.</li>
                <li>Market volatility and macroeconomic conditions affecting digital assets.</li>
                <li>Technology and security risks, including potential smart‑contract vulnerabilities.</li>
                <li>Adoption risk if user, specialist, or partner growth does not reach expected levels.</li>
              </ul>
              <p className="text-sm sm:text-base text-text-secondary">
                Nothing in this document constitutes investment, legal, or medical advice. Participants
                should perform independent due diligence and consult legal, financial, and health
                professionals before making decisions.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


