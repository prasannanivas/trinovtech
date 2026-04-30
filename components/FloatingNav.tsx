'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  {
    label: 'Home',
    anchor: 'home',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: 'About',
    anchor: 'about',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    label: 'Solutions',
    anchor: 'solutions',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    label: 'Services',
    anchor: 'services',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" />
      </svg>
    ),
  },
];

export default function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState('home');
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Track active section via IntersectionObserver (home page only)
  useEffect(() => {
    if (!isHome) return;
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ anchor }) => {
      const els = document.querySelectorAll(`#${anchor}`);
      if (!els.length) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveAnchor(anchor); },
        { rootMargin: '-30% 0px -50% 0px' }
      );
      els.forEach((el) => obs.observe(el));
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  function href(anchor: string) {
    return isHome ? `#${anchor}` : `/#${anchor}`;
  }

  function handleLinkClick(anchor: string) {
    setOpen(false);
    if (isHome) {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div
      className="fixed z-[9997] flex flex-col items-end gap-3"
      style={{ bottom: '2rem', right: '3.5rem' }}
    >
      {/* ── Expanded menu ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-1 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              backgroundColor: 'var(--color-bg2)',
              border: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
              padding: '10px',
              minWidth: '196px',
            }}
          >
            {/* Page links */}
            {NAV_LINKS.map(({ label, anchor, icon }, i) => {
              const active = isHome && activeAnchor === anchor;
              return (
                <motion.a
                  key={anchor}
                  href={href(anchor)}
                  onClick={() => handleLinkClick(anchor)}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045, duration: 0.2 }}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition-all"
                  style={{
                    fontSize: '13.5px',
                    fontFamily: 'var(--font-heading)',
                    color: active ? 'var(--color-primary)' : 'var(--color-text)',
                    backgroundColor: active
                      ? 'color-mix(in srgb, var(--color-primary) 8%, transparent)'
                      : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        'color-mix(in srgb, var(--color-text) 5%, transparent)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span style={{ color: active ? 'var(--color-primary)' : 'var(--color-muted)' }}>
                    {icon}
                  </span>
                  {label}
                  {active && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    />
                  )}
                </motion.a>
              );
            })}

            {/* Divider */}
            <div
              className="mx-2 my-1"
              style={{
                height: '1px',
                backgroundColor: 'color-mix(in srgb, var(--color-text) 8%, transparent)',
              }}
            />

            {/* Contact CTA */}
            <motion.a
              href={href('contact')}
              onClick={() => handleLinkClick('contact')}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.045, duration: 0.2 }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-semibold transition-opacity hover:opacity-85"
              style={{
                fontSize: '13.5px',
                fontFamily: 'var(--font-heading)',
                backgroundColor: 'var(--color-primary)',
                color: '#fff',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Contact Us
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger button ─────────────────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-full shadow-lg font-semibold transition-colors"
        style={{
          backgroundColor: open ? 'var(--color-primary)' : 'var(--color-bg2)',
          color: open ? '#fff' : 'var(--color-text)',
          border: '1px solid color-mix(in srgb, var(--color-text) 10%, transparent)',
          padding: '10px 18px',
          fontSize: '13px',
          fontFamily: 'var(--font-heading)',
        }}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
      >
        {/* Animated hamburger → X */}
        <span className="relative w-4 h-4 flex items-center justify-center">
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 0 : -4 }}
            transition={{ duration: 0.2 }}
            className="absolute w-4 h-[1.5px] rounded-full"
            style={{ backgroundColor: open ? '#fff' : 'var(--color-text)' }}
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            className="absolute w-4 h-[1.5px] rounded-full"
            style={{ backgroundColor: open ? '#fff' : 'var(--color-text)' }}
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? 0 : 4 }}
            transition={{ duration: 0.2 }}
            className="absolute w-4 h-[1.5px] rounded-full"
            style={{ backgroundColor: open ? '#fff' : 'var(--color-text)' }}
          />
        </span>
        <motion.span animate={{ opacity: 1 }}>
          {open ? 'Close' : 'Pages'}
        </motion.span>
      </motion.button>
    </div>
  );
}
