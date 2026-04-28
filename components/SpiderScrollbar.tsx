'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function SpiderScrollbar() {
  const [scrollPct, setScrollPct] = useState(0);
  const [scale, setScale] = useState(0);
  const [goingUp, setGoingUp] = useState(false);
  const [walking, setWalking] = useState(false);
  const lastY = useRef(0);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handle = () => {
      const sy = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? sy / maxScroll : 0;
      const vh = window.innerHeight;
      setScale(Math.min(sy / vh, 1));
      setScrollPct(pct);
      setGoingUp(sy < lastY.current);
      lastY.current = sy;
      setWalking(true);
      if (stopTimer.current) clearTimeout(stopTimer.current);
      stopTimer.current = setTimeout(() => setWalking(false), 220);
    };

    window.addEventListener('scroll', handle, { passive: true });
    return () => {
      window.removeEventListener('scroll', handle);
      if (stopTimer.current) clearTimeout(stopTimer.current);
    };
  }, []);

  return (
    <div
      className="fixed right-0 inset-y-0 z-[9999] pointer-events-none select-none"
      style={{ width: '32px' }}
      aria-hidden="true"
    >
      {/* Silk thread */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-px"
        animate={{ opacity: scale * 0.15 }}
        style={{
          top: '16px',
          bottom: '16px',
          background:
            'linear-gradient(to bottom, transparent, var(--color-primary) 8%, var(--color-primary) 92%, transparent)',
        }}
      />

      {/* Spider */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: `clamp(8px, calc(${scrollPct * 100}% - 18px), calc(100% - 52px))`,
        }}
        animate={{ rotate: goingUp ? 0 : 180, scale, opacity: Math.min(scale * 2, 1) }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <svg
          width="32"
          height="40"
          viewBox="0 0 32 40"
          fill="none"
          className={walking ? 'spider-walking' : ''}
        >
          {/* Silk thread from top of spider to track */}
          <line
            x1="16" y1="0"
            x2="16" y2="5"
            stroke="var(--color-primary)"
            strokeWidth="1.2"
            opacity="0.45"
          />

          {/* ── Left legs ─────────────────────────── */}
          <g className="spider-legs-left" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            {/* top-front */}
            <line x1="9"  y1="13" x2="0"  y2="6"  stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
            {/* mid-front */}
            <line x1="9"  y1="17" x2="0"  y2="16" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
            {/* mid-back */}
            <line x1="9"  y1="21" x2="1"  y2="24" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
            {/* rear */}
            <line x1="9"  y1="25" x2="2"  y2="31" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* ── Right legs ────────────────────────── */}
          <g className="spider-legs-right" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            {/* top-front */}
            <line x1="23" y1="13" x2="32" y2="6"  stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
            {/* mid-front */}
            <line x1="23" y1="17" x2="32" y2="16" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
            {/* mid-back */}
            <line x1="23" y1="21" x2="31" y2="24" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
            {/* rear */}
            <line x1="23" y1="25" x2="30" y2="31" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Abdomen */}
          <ellipse cx="16" cy="27" rx="7" ry="9" fill="var(--color-primary)" />
          {/* Hourglass marking (black widow style) */}
          <path
            d="M16 22 L13 27 L16 32 L19 27 Z"
            fill="var(--color-accent)"
            opacity="0.75"
          />

          {/* Cephalothorax */}
          <circle cx="16" cy="15" r="7" fill="var(--color-primary)" />

          {/* Eyes — 4 front-facing */}
          <circle cx="12.5" cy="13" r="1.6" fill="white" />
          <circle cx="19.5" cy="13" r="1.6" fill="white" />
          <circle cx="12.8" cy="12.6" r="0.65" fill="#111" />
          <circle cx="19.8" cy="12.6" r="0.65" fill="#111" />
          {/* two smaller secondary eyes */}
          <circle cx="14"   cy="10"  r="0.9" fill="white" opacity="0.6" />
          <circle cx="18"   cy="10"  r="0.9" fill="white" opacity="0.6" />
        </svg>
      </motion.div>
    </div>
  );
}
