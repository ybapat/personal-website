'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Lock } from 'lucide-react';

function StatusBadge({ status, className = '' }: { status: string; className?: string }) {
  const isAward = status === 'Award';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 font-mono text-xs rounded-full ${className}`}>
      {isAward ? (
        <>
          <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor" className="shrink-0" style={{ color: '#f59e0b' }}>
            <path d="M10 14c-2.2 0-4-1.8-4-4V4h8v6c0 2.2-1.8 4-4 4z"/>
            <path d="M7.5 14.3V16H6.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5H12.5v-1.7"/>
            <path d="M4 4.5H2.5v3.5A2.5 2.5 0 0 0 5 10.5V4.5z" opacity="0.55"/>
            <path d="M16 4.5h1.5v3.5A2.5 2.5 0 0 1 15 10.5V4.5z" opacity="0.55"/>
          </svg>
          <span style={{ color: '#f59e0b' }}>Award</span>
        </>
      ) : status}
    </span>
  );
}

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const projects = [
  // ── With screenshots ─────────────────────────────────────────
  {
    title: 'Nyx Exchange',
    description: 'Funded fintech startup — a private perpetual futures exchange born from an ETHGlobal hackathon. Fully private DEX, which also allows yield-bearing collateral on leverage.',
    tech: ['C++', 'Next.js', 'Typescript', 'DAML'],
    github: 'https://github.com/ybapat/nyx', live: null,
    image: '/images/nyx-screenshot.png',
    status: 'Funded', featured: true,
    metric: 'ETHGlobal Winner',
    private: false,
  },
  {
    title: 'Bull AI',
    description: 'Full-stack sentiment analysis platform with 200+ registered users. Engineered a Logistic Regression ML model from scratch with 89% accuracy using TF-IDF vectorization for real-time stocks and crypto NLP classification. Delivered via REST API.',
    tech: ['Python', 'JavaScript', 'Docker', 'PostgreSQL', 'FastAPI'],
    github: 'https://github.com/ybapat/financial-sentiment-analyzer', live: null,
    image: '/images/bull-ai-screenshot.png',
    status: 'Live', featured: false,
    metric: '200+ users · 89% acc.',
    private: false,
  },
  {
    title: 'Cloak',
    description: 'ETHDenver hackathon winner. Privacy-focused dapp on Canton testnet enabling fully private Slack messaging for institutions. Privacy-preserving smart contracts using Daml with zero on-chain exposure of sensitive metadata.',
    tech: ['Node.js', 'DAML', 'Express', 'Canton'],
    github: 'https://github.com/mugdha2626/ethdenver2026', live: null,
    image: '/images/cloak-screenshot.png',
    status: '', featured: false,
    metric: 'ETHDenver Winner',
    private: false,
  },
  {
    title: 'Screener',
    description: 'Data marketplace for selling anonymized screentime data, with trustless escrow payments. Secure ingestion pipelines monetize user screentime data while ensuring zero-knowledge of identities.',
    tech: ['Go', 'Rust', 'TypeScript'],
    github: 'https://github.com/ybapat/screener', live: null,
    image: '/images/screener-screenshot.png',
    status: 'Live', featured: false,
    metric: null,
    private: false,
  },
  // ── No screenshot ────────────────────────────────────────────
  {
    title: 'Venus',
    description: 'From-scratch LSM-tree key-value storage engine in C++. Implements write-ahead logging, compaction, bloom filters, and sorted string tables for high-throughput persistent storage.',
    tech: ['C++', 'LSM-Tree', 'Systems', 'Storage Engine'],
    github: 'https://github.com/ybapat/venus', live: null,
    image: null,
    status: 'Systems', featured: false,
    metric: null,
    private: false,
  },
  {
    title: 'Myrmidon Predict',
    description: 'Full-Stack Fantasy-football-style competition layer on prediction markets, adding parlays and leagues. Won best project in the Prediction Markets track at Penn Blockchain Conference, and 2nd overall.',
    tech: ['TypeScript', 'Go'],
    github: 'https://github.com/CalebHite/pred-fantasy', live: null,
    image: null,
    status: '', featured: false,
    metric: 'PBC Winner',
    private: false,
  },
  {
    title: 'Algo Trading Bots',
    description: 'Personal suite of EV-positive trading bots on crypto prediction market hourlies. Automated data ingestion, position sizing, and execution via exchange APIs. Strategies are private — EV trading on short-horizon crypto prediction markets.',
    tech: ['Python', 'Go'],
    github: null, live: null,
    image: null,
    status: 'Private', featured: false,
    metric: 'EV+ strategies',
    private: true,
  },
  {
    title: 'ListingListener',
    description: 'Full-stack accessibility app in Java that automatically retrieves and reads TV listings aloud to the blind and visually impaired. Used weekly by 100+ people in Cincinnati.',
    tech: ['Java', 'React', 'TTS', 'Accessibility'],
    github: '#', live: null,
    image: null,
    status: 'Live', featured: false,
    metric: '100+ weekly users',
    private: false,
  },
  {
    title: 'Hummingbot Connector',
    description: 'Open-source exchange connector into a repo with 50k+ users — expanding automated market making and trading strategy reach to additional exchange venues.',
    tech: ['Python', 'REST', 'WebSocket'],
    github: 'https://github.com/ybapat/hummingbot', live: null,
    image: null,
    status: 'Open Source', featured: false,
    metric: '50k+ repo users',
    private: false,
  },
];

// ── Featured card ────────────────────────────────────────────

function FeaturedCard({ project }: { project: typeof projects[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden bg-[#0a1520] border border-[#00d4b4]/15 hover:border-[#00d4b4]/50 transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,212,180,0.12)]"
    >
      <div className="md:grid md:grid-cols-2 min-h-[360px]">
        {/* Screenshot */}
        <div className="relative overflow-hidden aspect-video md:aspect-auto bg-[#050a0e]">
          {project.image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top opacity-85"
                style={{ minHeight: '100%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a1520]/70 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a0e]/40 to-transparent pointer-events-none" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[#0d1e2e] to-[#050a0e] hero-grid opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-[#00d4b4]/10 border border-[#00d4b4]/20 flex items-center justify-center mx-auto">
                  <span className="text-[#00d4b4] font-black text-2xl">★</span>
                </div>
              </div>
            </>
          )}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            className="absolute inset-0 bg-[#050a0e]/50 backdrop-blur-[1px] flex items-center justify-center gap-3"
          >
            {project.github && project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-3 rounded-full bg-[#050a0e]/80 border border-[#00d4b4]/30 text-[#00d4b4] hover:bg-[#00d4b4]/20 transition-colors">
                <GithubIcon />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-3 rounded-full bg-[#050a0e]/80 border border-[#00d4b4]/30 text-[#00d4b4] hover:bg-[#00d4b4]/20 transition-colors">
                <ExternalLink size={18} />
              </a>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[#00d4b4] text-xs tracking-widest">FEATURED PROJECT</span>
            <StatusBadge status={project.status} className="bg-[#00d4b4]/10 border border-[#00d4b4]/30 text-[#00d4b4]" />
          </div>
          <h3 className="text-2xl font-black text-[#e8f4f1] group-hover:text-[#00d4b4] transition-colors duration-200 mb-3">
            {project.title}
          </h3>
          <p className="text-[#7a9a95] leading-relaxed mb-6">{project.description}</p>
          {project.metric && (
            <div className="mb-5 inline-flex">
              <span className="px-3 py-1.5 bg-[#00d4b4]/10 border border-[#00d4b4]/30 text-[#00d4b4] font-bold text-sm rounded-lg shadow-[0_0_12px_rgba(0,212,180,0.15)]">
                {project.metric}
              </span>
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map(t => (
              <span key={t} className="px-2.5 py-1 bg-[#00d4b4]/5 border border-[#00d4b4]/15 text-[#00d4b4]/80 font-mono text-xs rounded-full">{t}</span>
            ))}
          </div>
          <div className="flex gap-4">
            {project.github && project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#7a9a95] hover:text-[#00d4b4] transition-colors text-sm font-mono">
                <GithubIcon size={14} /> Code
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#7a9a95] hover:text-[#00d4b4] transition-colors text-sm font-mono">
                <ExternalLink size={14} /> Live
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Screenshot small card ────────────────────────────────────

function ScreenshotCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-xl overflow-hidden bg-[#0a1520] border border-[#00d4b4]/10 hover:border-[#00d4b4]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,180,0.08)] hover:-translate-y-1"
    >
      {/* Screenshot */}
      <div className="relative overflow-hidden bg-[#050a0e]" style={{ height: 150 }}>
        {project.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050a0e]/60 to-transparent pointer-events-none" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1e2e] to-[#050a0e] hero-grid opacity-20" />
        )}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 bg-[#050a0e]/70 backdrop-blur-sm flex items-center justify-center gap-3"
        >
          {project.github && project.github !== '#' && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-2.5 rounded-full bg-[#00d4b4]/10 border border-[#00d4b4]/40 text-[#00d4b4] hover:bg-[#00d4b4]/20 transition-colors">
              <GithubIcon size={16} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-2.5 rounded-full bg-[#00d4b4]/10 border border-[#00d4b4]/40 text-[#00d4b4] hover:bg-[#00d4b4]/20 transition-colors">
              <ExternalLink size={16} />
            </a>
          )}
        </motion.div>
        <div className="absolute top-2 right-2">
          <StatusBadge status={project.status} className="bg-[#050a0e]/80 border border-[#00d4b4]/20 text-[#00d4b4] backdrop-blur-sm" />
        </div>
        {project.metric && (
          <div className="absolute bottom-2 left-2">
            <span className="px-2 py-0.5 bg-[#00d4b4]/15 border border-[#00d4b4]/40 text-[#00d4b4] font-bold font-mono text-xs rounded-full">{project.metric}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-bold text-[#e8f4f1] group-hover:text-[#00d4b4] transition-colors duration-200">
            {project.title}
          </h3>
          <ArrowUpRight size={14} className="text-[#7a9a95] group-hover:text-[#00d4b4] transition-all duration-200 mt-0.5 shrink-0" />
        </div>
        <p className="text-[#7a9a95] text-xs leading-relaxed mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 4).map(t => (
            <span key={t} className="px-2 py-0.5 bg-[#00d4b4]/5 border border-[#00d4b4]/10 text-[#00d4b4]/70 font-mono text-xs rounded">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Text-only card (no screenshot) ───────────────────────────

function TextCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const accent = project.status === 'Private' ? '#f59e0b' : '#00d4b4';
  const accentDim = project.status === 'Private' ? 'rgba(245,158,11,' : 'rgba(0,212,180,';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-xl overflow-hidden cursor-default"
      style={{
        background: 'linear-gradient(145deg, #091420 0%, #0c1a26 100%)',
        border: `1px solid ${accentDim}0.12)`,
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      whileHover={{ y: -4 }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${accentDim}0.45)`;
        el.style.boxShadow = `0 16px 48px ${accentDim}0.08)`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${accentDim}0.12)`;
        el.style.boxShadow = 'none';
      }}
    >
      {/* Top accent bar */}
      <div className="h-[2px]" style={{
        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        opacity: 0.5,
      }} />

      {/* Subtle background glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-400"
        style={{ background: `radial-gradient(circle at 100% 0%, ${accentDim}0.3) 0%, transparent 60%)` }}
      />

      <div className="relative z-10 p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <h3 className="font-bold text-[#e8f4f1] text-base group-hover:text-[#00d4b4] transition-colors duration-200 leading-tight">
                {project.title}
              </h3>
              {project.private && (
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono"
                  style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#f59e0b' }}>
                  <Lock size={8} /> private
                </span>
              )}
            </div>
            <span
              className="px-2 py-0.5 font-mono text-[10px] rounded-full"
              style={{
                background: `${accentDim}0.08)`,
                border: `1px solid ${accentDim}0.2)`,
                color: project.status === 'Award' ? '#f59e0b' : `${accentDim}0.8)`,
              }}
            >
              {project.status === 'Award' ? (
                <span className="inline-flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 20 20" fill="#f59e0b" className="shrink-0">
                    <path d="M10 14c-2.2 0-4-1.8-4-4V4h8v6c0 2.2-1.8 4-4 4z"/>
                    <path d="M7.5 14.3V16H6.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5H12.5v-1.7"/>
                    <path d="M4 4.5H2.5v3.5A2.5 2.5 0 0 0 5 10.5V4.5z" opacity="0.55"/>
                    <path d="M16 4.5h1.5v3.5A2.5 2.5 0 0 1 15 10.5V4.5z" opacity="0.55"/>
                  </svg>
                  Award
                </span>
              ) : project.status}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {project.github && project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-[#4a7a74] hover:text-[#00d4b4] transition-colors"
                onClick={e => e.stopPropagation()}>
                <GithubIcon size={14} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-[#4a7a74] hover:text-[#00d4b4] transition-colors"
                onClick={e => e.stopPropagation()}>
                <ExternalLink size={14} />
              </a>
            )}
            {!project.github && !project.live && (
              <ArrowUpRight size={14} className="text-[#3a5a58] group-hover:text-[#00d4b4] transition-colors mt-0.5" />
            )}
          </div>
        </div>

        <p className="text-[#7a9a95] text-xs leading-relaxed mb-3">{project.description}</p>

        {/* Metric + tech */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 3).map(t => (
              <span key={t} className="px-2 py-0.5 font-mono text-[10px] rounded"
                style={{
                  background: `${accentDim}0.06)`,
                  border: `1px solid ${accentDim}0.15)`,
                  color: `${accentDim}0.75)`,
                }}>
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2 py-0.5 font-mono text-[10px] rounded text-[#3a5a58]">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
          {project.metric && (
            <span className="font-bold font-mono text-[10px]" style={{ color: accent }}>
              {project.metric}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Export ──────────────────────────────────────────────

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const featured = projects[0];
  const withScreenshot = projects.slice(1).filter(p => p.image !== null);
  const withoutScreenshot = projects.filter(p => p.image === null);

  return (
    <section id="projects" ref={ref} className="py-32 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-6"
      >
        <span className="font-mono text-[#00d4b4] text-sm">02.</span>
        <h2 className="text-3xl md:text-4xl font-black text-[#e8f4f1]">Projects</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[#00d4b4]/30 to-transparent" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-[#7a9a95] mb-12 max-w-xl"
      >
        A selection of things I&apos;ve built — from side projects to production systems.
      </motion.p>

      <div className="space-y-6">
        {/* Featured */}
        <FeaturedCard project={featured} />

        {/* Screenshot cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {withScreenshot.map((p, i) => (
            <ScreenshotCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* Text-only cards */}
        {withoutScreenshot.length > 0 && (
          <>
            <div className="flex items-center gap-4 pt-2">
              <span className="font-mono text-[#3d6660] text-xs tracking-widest">MORE WORK</span>
              <div className="flex-1 h-px bg-gradient-to-r from-[#00d4b4]/15 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {withoutScreenshot.map((p, i) => (
                <TextCard key={p.title} project={p} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
