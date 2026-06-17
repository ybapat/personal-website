'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const interests = [
  {
    title: 'Guitar',
    desc: 'Favorite thing to do, currently into fingerstyle and blues.',
    gold: true,
  },
  {
    title: 'Swing Trading',
    desc: 'Active in markets: equities, crypto, and derivatives.',
    gold: false,
  },
  {
    title: 'Soccer',
    desc: 'Washed but still love to play and watch.',
    gold: false,
  },
  {
    title: 'Tennis',
    desc: 'Backhand sucks but I still have fun!',
    gold: true,
  },
];

export default function Interests() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="interests" ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="font-mono text-[#00d4b4] text-sm">03.</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#e8f4f1]">Interests</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#00d4b4]/30 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {interests.map((item, i) => {
            const accent = item.gold ? '#f59e0b' : '#00d4b4';
            const accentDim = item.gold ? 'rgba(245,158,11,' : 'rgba(0,212,180,';
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24, scale: 0.94 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="group relative rounded-2xl p-5 overflow-hidden cursor-default"
                style={{
                  background: 'linear-gradient(145deg, #091420 0%, #0c1a26 100%)',
                  border: `1px solid ${accentDim}0.15)`,
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${accentDim}0.5)`;
                  el.style.boxShadow = `0 16px 48px ${accentDim}0.1)`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${accentDim}0.15)`;
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
                  background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                  opacity: 0.6,
                }} />
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${accentDim}0.1) 0%, transparent 65%)` }}
                />

                <div className="relative z-10">
                  <h3
                    className="font-black text-base mb-2 tracking-tight"
                    style={{ color: accent }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#8aaba6] text-[11px] font-semibold leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
