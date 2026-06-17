'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springX = useSpring(trailX, { stiffness: 80, damping: 15 });
  const springY = useSpring(trailY, { stiffness: 80, damping: 15 });

  const isHovering = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHovering.current = !!(
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor]')
      );
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      >
        <div className="w-3 h-3 bg-[#00d4b4] rounded-full" />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      >
        <div className="w-8 h-8 border border-[#00d4b4]/50 rounded-full" />
      </motion.div>
    </>
  );
}
