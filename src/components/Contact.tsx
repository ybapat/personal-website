'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Copy, Check } from 'lucide-react';

const EMAIL = 'yashsbapat@gmail.com';

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socials = [
  { icon: GithubIcon, label: 'GitHub', href: 'https://github.com/ybapat', handle: '@ybapat' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/yash-bapat-4810a4251/', handle: 'LinkedIn' },
  { icon: XLogo, label: 'X', href: 'https://x.com/yash_bap', handle: '@yash_bap' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,212,180,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="w-full max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-black text-[#e8f4f1] mb-6 leading-tight"
          >
            Get In Touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-[#7a9a95] text-lg leading-relaxed mb-12"
          >
            Always looking to connect! Open to opportunities, conversations, else!
          </motion.p>

          {/* Email button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <a
              href={`mailto:${EMAIL}`}
              className="px-10 py-4 border border-[#00d4b4] text-[#00d4b4] font-mono text-base tracking-wide rounded-lg transition-all duration-200 hover:bg-[#00d4b4]/10 hover:shadow-[0_0_30px_rgba(0,212,180,0.2)]"
            >
              <span className="flex items-center gap-2">
                <Mail size={18} />
                Say Hello
              </span>
            </a>

            <button
              onClick={copyEmail}
              className="flex items-center gap-2 px-6 py-4 text-[#7a9a95] hover:text-[#00d4b4] font-mono text-sm transition-colors duration-200 border border-[#00d4b4]/20 hover:border-[#00d4b4]/50 rounded-lg"
            >
              {copied ? <Check size={16} className="text-[#00d4b4]" /> : <Copy size={16} />}
              {copied ? 'Copied!' : EMAIL}
            </button>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="flex justify-center gap-6"
          >
            {socials.map(({ icon: Icon, label, href, handle }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.05 * i + 0.5 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col items-center gap-2 text-[#7a9a95] hover:text-[#00d4b4] transition-colors duration-200"
              >
                <div className="p-3 rounded-lg border border-[#00d4b4]/15 group-hover:border-[#00d4b4]/50 group-hover:bg-[#00d4b4]/5 transition-all duration-200">
                  <Icon size={20} />
                </div>
                <span className="font-mono text-xs">{handle}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-24 font-mono text-xs text-[#7a9a95]/50 tracking-wider"
        >
          Designed & Built by{' '}
          <span className="text-[#00d4b4]/70">Yash Bapat</span> · {new Date().getFullYear()}
        </motion.div>
      </div>
    </section>
  );
}
