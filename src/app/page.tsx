'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Interests from "@/components/Interests";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });
const Cursor = dynamic(() => import("@/components/Cursor"), { ssr: false });

function SectionDivider({ gold = false }: { gold?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const color = gold ? '#f59e0b' : '#00d4b4';
  const glow = gold ? 'rgba(245,158,11,' : 'rgba(0,212,180,';

  return (
    <motion.div
      ref={ref}
      className="relative flex items-center justify-center"
      style={{ height: 48, overflow: 'visible' }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Left line sweeps from center outward */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          right: '50%',
          left: 0,
          height: 1,
          transformOrigin: 'right',
          background: `linear-gradient(90deg, transparent 0%, ${color} 100%)`,
          opacity: 0.4,
        }}
      />
      {/* Right line sweeps from center outward */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          left: '50%',
          right: 0,
          height: 1,
          transformOrigin: 'left',
          background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
          opacity: 0.4,
        }}
      />
      {/* Diamond — pops in then pulses once */}
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={inView ? { scale: [0, 1.4, 1], rotate: 45 } : {}}
        transition={{ duration: 0.45, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 10,
          height: 10,
          border: `2px solid ${color}`,
          background: '#050a0e',
          zIndex: 10,
          position: 'relative',
          flexShrink: 0,
        }}
      />
      {/* Glow ring that expands and fades after diamond appears */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={inView ? { scale: [0.5, 3, 4], opacity: [0, 0.7, 0] } : {}}
        transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          width: 10,
          height: 10,
          border: `1px solid ${glow}0.8)`,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}

export default function Home() {
  return (
    <SmoothScroll>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <SectionDivider />
        <Projects />
        <SectionDivider gold />
        <Interests />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
