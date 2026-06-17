'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
const TARGET = 'Yash Bapat';

function useScramble(target: string, trigger: boolean) {
  const [text, setText] = useState('');
  const frame = useRef(0);
  const iteration = useRef(0);
  useEffect(() => {
    if (!trigger) return;
    iteration.current = 0;
    cancelAnimationFrame(frame.current);
    const animate = () => {
      setText(target.split('').map((char, idx) => {
        if (idx < iteration.current) return char;
        if (char === ' ') return ' ';
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join(''));
      if (iteration.current < target.length) {
        iteration.current += 0.4;
        frame.current = requestAnimationFrame(animate);
      }
    };
    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current);
  }, [target, trigger]);
  return text;
}

// Slow scramble-unmix — resolves each character one by one from random chars
function useRoleScramble(target: string) {
  const [text, setText] = useState(target);
  const frame = useRef(0);
  const iteration = useRef(0);
  useEffect(() => {
    iteration.current = 0;
    cancelAnimationFrame(frame.current);
    const animate = () => {
      setText(target.split('').map((char, idx) => {
        if (idx < iteration.current) return char;
        if (char === ' ') return ' ';
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join(''));
      if (iteration.current < target.length) {
        iteration.current += 0.28;
        frame.current = requestAnimationFrame(animate);
      } else {
        setText(target);
      }
    };
    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current);
  }, [target]);
  return text;
}

const roles = ['Software Engineer', 'Algorithmic Trader', 'CS @ Purdue', 'Solving hard problems'];

const bigStats = [
  { value: '5×', label: 'Hackathon Wins', bullet: 'ETHDenver, ETHGlobal, and more', gold: true },
  { value: '$100k+', label: 'Profit Generated', bullet: 'As Quant SWE intern @Gemini, building C++ trading bots (team of 2)', gold: true },
  { value: '1', label: 'Funded Startup', bullet: 'Built Nyx, a private perpetual futures exchange', gold: false },
  { value: 'Purdue', label: 'University', bullet: 'CS Student, ML Researcher', gold: false },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const [roleIdx, setRoleIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const name = useScramble(TARGET, mounted);
  const scrambledRole = useRoleScramble(roles[roleIdx]);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const iv = setInterval(() => setRoleIdx(p => (p + 1) % roles.length), 3000);
    return () => clearInterval(iv);
  }, []);

  const particles = Array.from({ length: 28 }, (_, i) => i);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex flex-col overflow-hidden hero-grid noise-bg">

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 30%, rgba(0,212,180,0.12) 0%, rgba(0,212,180,0.03) 50%, transparent 75%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 45% at 10% 85%, rgba(245,158,11,0.06) 0%, transparent 65%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 40% 35% at 90% 20%, rgba(245,158,11,0.04) 0%, transparent 60%)' }} />
      </div>

      {/* Particles — mix of gold and aqua */}
      {particles.map((i) => (
        <motion.div key={i} className="absolute rounded-full" style={{
          width: i % 4 === 0 ? '3px' : i % 3 === 0 ? '2px' : '1px',
          height: i % 4 === 0 ? '3px' : i % 3 === 0 ? '2px' : '1px',
          background: i % 4 === 0 ? 'rgba(245,158,11,0.5)' : i % 3 === 0 ? 'rgba(245,158,11,0.3)' : 'rgba(0,212,180,0.35)',
          left: `${(i * 37 + 11) % 100}%`,
          top: `${(i * 53 + 7) % 100}%`,
        }}
          animate={{ y: [0, -(18 + (i * 7) % 45), 0], opacity: [0.15, 0.65, 0.15], scale: [1, i % 4 === 0 ? 1.8 : 1.3, 1] }}
          transition={{ duration: 4 + (i % 6), repeat: Infinity, delay: (i * 0.35) % 5, ease: 'easeInOut' }}
        />
      ))}

      {/* Scan line */}
      <motion.div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4b4]/15 to-transparent pointer-events-none"
        animate={{ y: ['-100vh', '100vh'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
      />

      {/* Three pulsing rings */}
      <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div className="w-[700px] h-[700px] rounded-full border border-[#00d4b4]/5"
          animate={{ scale: [1, 1.07, 1], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div className="absolute inset-12 rounded-full border border-[#f59e0b]/5"
          animate={{ scale: [1.07, 1, 1.07], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div className="absolute inset-24 rounded-full border border-[#00d4b4]/4"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Corner brackets — alternating aqua/gold */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#00d4b4]/20 pointer-events-none" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#f59e0b]/20 pointer-events-none" />
      <div className="absolute bottom-20 left-8 w-12 h-12 border-b-2 border-l-2 border-[#f59e0b]/20 pointer-events-none" />
      <div className="absolute bottom-20 right-8 w-12 h-12 border-b-2 border-r-2 border-[#00d4b4]/20 pointer-events-none" />

      {/* Side labels */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 pointer-events-none">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#00d4b4]/25" />
        <span className="font-mono text-[10px] text-[#00d4b4]/25 tracking-[0.3em] rotate-90 whitespace-nowrap">PORTFOLIO 2025</span>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-[#00d4b4]/25" />
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 pointer-events-none">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#f59e0b]/25" />
        <span className="font-mono text-[10px] text-[#f59e0b]/25 tracking-[0.3em] -rotate-90 whitespace-nowrap">YASH BAPAT</span>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-[#f59e0b]/25" />
      </div>

      {/* Main content */}
      <motion.div style={{ y, opacity }} className="relative z-10 flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-5xl mx-auto w-full">

          {/* Name — aqua → gold gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-[108px] font-black tracking-tighter leading-none mb-6 scramble-text"
          >
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e8f4f1 35%, #00d4b4 75%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {name || TARGET}
            </span>
          </motion.h1>

          {/* Role — scramble-unmix, aqua→gold gradient text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="h-10 flex items-center justify-center mb-36"
          >
            <span className="text-xl md:text-2xl font-mono tracking-widest" style={{
              background: 'linear-gradient(90deg, #00d4b4, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {scrambledRole}
            </span>
          </motion.div>

          {/* Stat cards — gold for achievements, aqua for rest */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {bigStats.map((s, i) => {
              const accent = s.gold ? '#f59e0b' : '#00d4b4';
              const accentDim = s.gold ? 'rgba(245,158,11,' : 'rgba(0,212,180,';
              return (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 22, scale: 0.93 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.9 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative rounded-xl p-6 bg-[#0a1520] overflow-hidden flex flex-col items-center justify-center text-center min-h-[160px] transition-all duration-300"
                  style={{ border: `1px solid ${accentDim}0.15)` }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${accentDim}0.5)`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 32px ${accentDim}0.1)`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${accentDim}0.15)`;
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${accentDim}0.10) 0%, transparent 70%)` }} />
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
                  {/* Subtle always-on bottom line */}
                  <div className="absolute bottom-0 left-6 right-6 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${accentDim}0.12), transparent)` }} />

                  <div className="text-4xl md:text-5xl font-black leading-none mb-1" style={{
                    color: accent,
                    textShadow: `0 0 28px ${accentDim}0.5), 0 0 60px ${accentDim}0.12)`,
                  }}>
                    {s.value}
                  </div>
                  <div className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: `${accentDim}0.55)` }}>
                    {s.label}
                  </div>
                  <div className="text-xs text-[#7a9a95] leading-snug">{s.bullet}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Gradient divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.45 }}
            className="h-px mb-16 origin-left"
            style={{ background: 'linear-gradient(90deg, transparent, #00d4b4, #f59e0b, transparent)' }}
          />

          {/* Spacer where Technologies section was */}
          <div className="h-28" />

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-wrap gap-4 justify-center mb-10"
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-20 py-4 font-bold font-mono text-sm tracking-wider rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,180,0.4)] whitespace-nowrap min-w-[220px]"
              style={{ background: 'linear-gradient(135deg, #00d4b4, #00b89c)', color: '#050a0e' }}
            >
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: 'linear-gradient(135deg, #00ffd5, #00d4b4)' }} />
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-20 py-4 font-mono text-sm tracking-wider rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] whitespace-nowrap min-w-[220px]"
              style={{ border: '1px solid rgba(245,158,11,0.4)', color: '#f59e0b', background: 'rgba(245,158,11,0.04)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,158,11,0.10)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(245,158,11,0.04)')}
            >
              Get In Touch
            </button>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
            className="flex flex-col items-center gap-1.5"
          >
            <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              <ChevronDown size={18} className="text-[#00d4b4]/40" />
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

    </section>
  );
}
