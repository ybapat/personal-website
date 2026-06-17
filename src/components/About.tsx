'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  'TypeScript', 'React', 'Next.js', 'Node.js',
  'Python', 'PostgreSQL', 'C++', 'Docker',
  'GraphQL', 'Redis', 'AWS', 'Go',
];

const bigStats = [
  { value: '4×', label: 'Hackathon\nWins' },
  { value: '$100k+', label: 'Trading\nP&L' },
  { value: '1', label: 'Funded\nStartup' },
  { value: '∞', label: 'Problems\nSolved' },
];

const bullets = [
  { text: "Quant SWE at Gemini — built market making bots in C++ that generated 6 figures in profit with a team of 2.", accent: true },
  { text: "Founded a funded fintech startup that started as a hackathon win at ETHGlobal.", accent: false },
  { text: "4× hackathon winner including ETHDenver and ETHGlobal. I love building fast under pressure.", accent: false },
  { text: "CS student at Purdue University, obsessed with performant systems and great developer experience.", accent: false },
];

export default function About() {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="py-32 px-6 max-w-6xl mx-auto">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-24"
      >
        <span className="font-mono text-[#00d4b4] text-sm">01.</span>
        <h2 className="text-3xl md:text-4xl font-black text-[#e8f4f1]">About Me</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[#00d4b4]/30 to-transparent" />
      </motion.div>

      {/* Big stat counters */}
      <motion.div
        ref={statsRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
      >
        {bigStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-2xl p-6 bg-[#0a1520] border border-[#00d4b4]/10 hover:border-[#00d4b4]/40 overflow-hidden transition-all duration-300"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 0%, rgba(0,212,180,0.08) 0%, transparent 70%)' }}
            />
            <div className="text-4xl md:text-5xl font-black text-[#00d4b4] mb-2 glow-text leading-none">
              {s.value}
            </div>
            <div className="font-mono text-xs text-[#7a9a95] tracking-wider whitespace-pre-line leading-relaxed">
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid md:grid-cols-5 gap-16 items-start">
        {/* Text */}
        <div className="md:col-span-3 space-y-5">
          {bullets.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
              className="flex gap-4 group"
            >
              <span className="text-[#00d4b4] mt-1 shrink-0 text-xs">▸</span>
              <p className={`leading-relaxed text-base ${b.accent ? 'text-[#c0ddd8]' : 'text-[#7a9a95]'}`}>
                {b.text}
              </p>
            </motion.div>
          ))}

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-6"
          >
            <p className="font-mono text-[#00d4b4] text-xs tracking-widest mb-5">TECHNOLOGIES</p>
            <div className="grid grid-cols-3 gap-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.05 * i + 0.7 }}
                  className="flex items-center gap-2 text-sm text-[#7a9a95] font-mono hover:text-[#00d4b4] transition-colors duration-200"
                >
                  <span className="text-[#00d4b4] text-xs">▸</span>
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-2"
        >
          <div className="relative group">
            <div className="absolute inset-0 translate-x-4 translate-y-4 border-2 border-[#00d4b4]/40 rounded-xl transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />
            <div className="relative rounded-xl overflow-hidden bg-[#0a1520] aspect-square">
              <div className="w-full h-full bg-gradient-to-br from-[#0d1e2e] to-[#050a0e] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-[#00d4b4]/10 border-2 border-[#00d4b4]/30 flex items-center justify-center mx-auto mb-3">
                    <span className="text-4xl font-black text-[#00d4b4]">YB</span>
                  </div>
                  <p className="font-mono text-xs text-[#7a9a95]">[ drop headshot here ]</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-[#00d4b4]/10 mix-blend-multiply pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
