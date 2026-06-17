'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '4×', label: 'Hackathon Winner' },
  { value: '$100k+', label: 'Trading P&L' },
  { value: 'C++', label: 'Market Making Bots' },
  { value: 'ETHDenver', label: 'Winner' },
  { value: 'ETHGlobal', label: 'Winner' },
  { value: 'Funded', label: 'Startup Founder' },
  { value: 'Purdue', label: 'CS Student' },
  { value: '∞', label: 'Problems Solved' },
];

const doubled = [...stats, ...stats];

export default function StatsTicker() {
  return (
    <div className="relative py-6 overflow-hidden border-y border-[#00d4b4]/10 bg-[#00d4b4]/[0.02]">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#050a0e] to-transparent pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#050a0e] to-transparent pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex gap-0 whitespace-nowrap"
      >
        {doubled.map((stat, i) => (
          <div key={i} className="flex items-center shrink-0">
            <div className="flex items-center gap-2 px-8">
              <span className="font-black text-lg text-[#00d4b4]">{stat.value}</span>
              <span className="font-mono text-xs text-[#7a9a95] tracking-widest uppercase">{stat.label}</span>
            </div>
            <span className="text-[#00d4b4]/20 text-xl">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
