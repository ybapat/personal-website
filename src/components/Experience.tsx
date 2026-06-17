'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Company SVG Logos (fallback for Data Mine / Boiler Blockchain) ───────────

function NodesLogo({ color, size = 34 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <circle cx="17" cy="17" r="4" fill={color} />
      <circle cx="5" cy="8" r="2.8" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.2" />
      <circle cx="29" cy="8" r="2.8" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.2" />
      <circle cx="5" cy="26" r="2.2" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.12" />
      <circle cx="29" cy="26" r="2.2" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.12" />
      <line x1="17" y1="17" x2="5" y2="8" stroke={color} strokeWidth="1.1" strokeOpacity="0.5" />
      <line x1="17" y1="17" x2="29" y2="8" stroke={color} strokeWidth="1.1" strokeOpacity="0.5" />
      <line x1="17" y1="17" x2="5" y2="26" stroke={color} strokeWidth="1.1" strokeOpacity="0.35" />
      <line x1="17" y1="17" x2="29" y2="26" stroke={color} strokeWidth="1.1" strokeOpacity="0.35" />
    </svg>
  );
}

function ChainLogo({ color, size = 34 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <polygon points="17,2 30,9.5 30,24.5 17,32 4,24.5 4,9.5"
        stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.08" />
      <circle cx="13" cy="16" r="3.2" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.15" />
      <circle cx="21" cy="16" r="3.2" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.15" />
      <rect x="15" y="14.5" width="4" height="3" fill={color} rx="1.5" />
    </svg>
  );
}

function CompanyIcon({ company, color }: { company: string; color: string }) {
  if (company === 'Gemini') return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/gemini-logo.png" alt="Gemini" className="w-9 h-9 object-contain rounded-md" />
  );
  if (company === 'Cincinnati Insurance Companies') return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/cincinnati-logo.png" alt="Cincinnati Insurance" style={{ width: 100, height: 100 }} className="object-contain" />
  );
  if (company.includes('Data Mine')) return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/datamine-screenshot.png" alt="Data Mine" className="w-9 h-9 object-cover rounded-md" />
  );
  return <ChainLogo color={color} />;
}

// ── Job Data ──────────────────────────────────────────────────────────────────

const jobs = [
  {
    company: 'Gemini',
    role: 'Software Engineer Intern (Winter) · Quant Dev Intern (Summer)',
    period: 'Jan 2026 – Current',
    location: 'New York, NY',
    highlight: '100k+ profit',
    bullets: [
      'Created and ran market making service in C++ in a team of two, with 6 figures in profit in 4 months',
      'Architected hybrid tick-based and event-driven system using SPSC Ring buffers for thread communication',
      'Implemented VPC Peering across AWS accounts, reducing internal API latency and optimizing egress data costs',
      'Optimized WebSocket connection handling to reduce data streaming latency by 25% for faster order placement',
      'Implemented Google/Apple OAuth end-to-end, with over 90k users signing up or linking accounts via this method',
    ],
    tech: ['C++', 'Go', 'Terraform', 'AWS', 'PostgreSQL'],
    gold: true,
  },
  {
    company: 'Cincinnati Insurance Companies',
    role: 'Software Development Intern',
    period: 'May 2025 – Aug 2025',
    location: 'Cincinnati, OH · Hybrid',
    highlight: '28% vuln. reduction',
    bullets: [
      'Developed NLP tool in Python (SpaCy) for ledger automation, reducing manual reconciliation time by 23%',
      'Built security architecture improvements, contributing to a 28% reduction in identified web-based vulnerabilities',
      'Rebuilt core services with Java Springboot REST APIs, using Docker and Kubernetes for scalable deployment',
    ],
    tech: ['Java', 'Python', 'Docker', 'Kubernetes', 'Angular'],
    gold: false,
  },
  {
    company: 'The Data Mine – Purdue University',
    role: 'Undergraduate AI & Data Science Researcher',
    period: 'Aug 2024 – May 2025',
    location: 'West Lafayette, IN',
    highlight: '92% accuracy',
    image: '/images/datamine-screenshot.png',
    bullets: [
      'Implemented a custom ML model for package tampering detection achieving over 92% accuracy',
      'Collaborated with industry partners to scope data pipelines and model evaluation frameworks',
    ],
    tech: ['Python', 'PyTorch', 'OpenCV', 'scikit-learn', 'Linux'],
    gold: false,
  },
];

// ── Card Component ─────────────────────────────────────────────────────────────

function JobCard({ job, index }: { job: typeof jobs[0]; index: number }) {
  const ref = useRef(null);
  // once:false → spotlight scales in/out as you scroll
  const inView = useInView(ref, { once: false, margin: '-8% 0px -20% 0px' });
  const accent = job.gold ? '#f59e0b' : '#00d4b4';
  const accentDim = job.gold ? 'rgba(245,158,11,' : 'rgba(0,212,180,';
  const isCurrent = job.period.includes('Present') || job.period.includes('Current');
  const hasPhotoLogo = job.company === 'Gemini' || job.company === 'Cincinnati Insurance Companies' || job.company.includes('Data Mine');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.93 }}
      animate={{
        opacity: inView ? 1 : 0.3,
        scale: inView ? 1 : 0.94,
        y: inView ? 0 : 18,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden"
      style={{
        border: `1px solid ${accentDim}0.2)`,
        background: '#091420',
        transition: 'border-color 0.3s, box-shadow 0.4s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${accentDim}0.6)`;
        el.style.boxShadow = `0 28px 80px ${accentDim}0.14), 0 8px 32px rgba(0,0,0,0.5)`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${accentDim}0.2)`;
        el.style.boxShadow = 'none';
      }}
    >
      {/* ── Banner Header ── */}
      <div
        className="relative px-8 pt-8 pb-7 overflow-hidden"
        style={{
          background: job.gold
            ? 'linear-gradient(145deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.07) 45%, rgba(9,20,32,0.85) 85%)'
            : 'linear-gradient(145deg, rgba(0,212,180,0.16) 0%, rgba(0,212,180,0.06) 45%, rgba(9,20,32,0.85) 85%)',
        }}
      >
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.04] hero-grid pointer-events-none" />
        {/* Inner glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 0% 60%, ${accentDim}0.15) 0%, transparent 60%)` }}
        />
        {/* Giant decorative company initial */}
        <div
          className="absolute -bottom-4 right-3 font-black leading-none select-none pointer-events-none"
          style={{ fontSize: 170, color: `${accentDim}0.055)`, letterSpacing: '-0.04em' }}
          aria-hidden
        >
          {job.company[0]}
        </div>

        {/* Logo + company name + metric */}
        <div className="relative z-10 flex items-start gap-5 flex-wrap">
          {/* Logo badge */}
          <motion.div
            initial={{ scale: 0, rotate: -18, opacity: 0 }}
            animate={inView ? { scale: 1, rotate: 0, opacity: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.1 + index * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 w-[72px] h-[72px] rounded-2xl flex items-center justify-center"
            style={{
              background: hasPhotoLogo ? 'rgba(255,255,255,0.07)' : `${accentDim}0.12)`,
              border: `1.5px solid ${accentDim}0.35)`,
              boxShadow: `0 0 32px ${accentDim}0.25), inset 0 1px 0 ${accentDim}0.15)`,
            }}
          >
            <CompanyIcon company={job.company} color={accent} />
          </motion.div>

          {/* Company name + role */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-black text-[#f0faf8] leading-none tracking-tighter mb-2.5"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)' }}
            >
              {job.company}
            </h3>
            <p className="font-mono text-sm font-bold" style={{ color: `${accentDim}0.8)` }}>
              {job.role}
            </p>
          </div>

          {/* Metric badge */}
          {job.highlight && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ delay: 0.25 + index * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0"
            >
              <div
                className="px-5 py-2.5 rounded-xl font-black font-mono text-sm"
                style={{
                  background: `${accentDim}0.13)`,
                  border: `1px solid ${accentDim}0.55)`,
                  color: accent,
                  boxShadow: `0 0 28px ${accentDim}0.3), inset 0 1px 0 ${accentDim}0.12)`,
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.02em',
                }}
              >
                {job.highlight}
              </div>
            </motion.div>
          )}
        </div>

        {/* Period + location */}
        <div className="relative z-10 flex items-center gap-2.5 mt-4 flex-wrap">
          <span className="font-mono text-xs tracking-widest font-semibold" style={{ color: `${accentDim}0.65)` }}>
            {job.period}
          </span>
          {isCurrent && (
            <span className="relative flex h-2 w-2" title="Currently active">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: accent }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: accent }} />
            </span>
          )}
          <span className="text-[#2a4a48] font-mono text-xs">·</span>
          <span className="font-mono text-xs text-[#3a5a58] tracking-wide">{job.location}</span>
        </div>
      </div>

      {/* Gradient divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="h-px origin-left"
        style={{ background: `linear-gradient(90deg, ${accentDim}0.7), ${accentDim}0.25), transparent)` }}
      />

      {/* ── Content Area ── */}
      <div className="px-8 pt-6 pb-8">
        {/* Bullets */}
        <ul className="space-y-3 mb-7">
          {job.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -14 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 + index * 0.02 }}
              className="flex gap-3 text-[#c4dedd] text-sm leading-relaxed font-medium"
            >
              <span
                className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                style={{ background: accent, boxShadow: `0 0 7px ${accentDim}0.75)` }}
              />
              {b}
            </motion.li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {job.tech.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.38 + i * 0.06 + index * 0.02 }}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 font-mono text-xs rounded-full font-semibold cursor-default"
              style={{
                background: `${accentDim}0.08)`,
                border: `1px solid ${accentDim}0.28)`,
                color: `${accentDim}0.95)`,
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = `${accentDim}0.18)`;
                (e.currentTarget as HTMLElement).style.borderColor = `${accentDim}0.5)`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = `${accentDim}0.08)`;
                (e.currentTarget as HTMLElement).style.borderColor = `${accentDim}0.28)`;
              }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={ref} className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-[#00d4b4] text-sm">01.</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#e8f4f1]">Experience</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#00d4b4]/30 to-transparent" />
          </div>
          <p className="text-[#3d6660] font-mono text-sm ml-10 tracking-wider">
            Where I&apos;ve shipped code that matters.
          </p>
        </motion.div>

        <div className="flex flex-col gap-10">
          {jobs.map((job, i) => (
            <JobCard key={job.company + i} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
