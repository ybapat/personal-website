'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['Experience', 'Projects', 'Interests', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    setActive(id);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-[#050a0e]/80 backdrop-blur-xl border-b border-[#00d4b4]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[#00d4b4] font-mono text-lg font-bold tracking-widest"
          whileHover={{ scale: 1.05 }}
        >
          YB<span className="cursor-blink text-[#00d4b4]/60">_</span>
        </motion.button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <motion.button
              key={link}
              onClick={() => scrollTo(link)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className={`relative font-mono text-sm tracking-wider transition-colors duration-200 group ${
                active === link ? 'text-[#00d4b4]' : 'text-[#7a9a95] hover:text-[#00d4b4]'
              }`}
            >
              <span className="text-[#00d4b4]/50 mr-1 text-xs">0{i + 1}.</span>
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00d4b4] transition-all duration-300 group-hover:w-full" />
            </motion.button>
          ))}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={() => scrollTo('Contact')}
            className="px-4 py-2 border border-[#00d4b4] text-[#00d4b4] font-mono text-sm rounded hover:bg-[#00d4b4]/10 transition-colors duration-200"
          >
            Resume
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#00d4b4] block origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-[#00d4b4] block"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#00d4b4] block origin-center"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050a0e]/95 backdrop-blur-xl border-b border-[#00d4b4]/10"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => scrollTo(link)}
                  className="text-left font-mono text-sm text-[#7a9a95] hover:text-[#00d4b4] transition-colors py-2"
                >
                  <span className="text-[#00d4b4]/50 mr-2">0{i + 1}.</span>{link}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
