/**
 * Shared layout for all Solution detail pages.
 * Usage:
 *   <SolutionDetailLayout
 *     meta={...}
 *     hero={...}
 *     panels={...}
 *     SvgComponent={...}
 *     accentColor="..."
 *   />
 *
 * The SVG fills from left as user scrolls.
 * Right side cycles through 4 content panels.
 */
'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────
export type SolutionPanel = {
  id: number;
  eyebrow: string;
  headline: string[];
  sub: string;
  body?: string;
  chips?: string[];
  stats?: { value: string; label: string }[];
  features?: { icon: string; label: string; desc: string }[];
  cta?: { label: string; href: string };
};

export type SvgProps = {
  p1: MotionValue<number>;
  p2: MotionValue<number>;
  p3: MotionValue<number>;
  p4: MotionValue<number>;
  op1: MotionValue<number>;
  op2: MotionValue<number>;
};

// ─── Panel animations ─────────────────────────────────────────────────────────
const panelVariants = {
  enter:  { opacity: 0, y: 60, scale: 0.96 },
  center: { opacity: 1, y: 0, scale: 1,   transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as number[] } },
  exit:   { opacity: 0, y: -40, scale: 1.02, transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] as number[] } },
};

// ─── Progress pills ────────────────────────────────────────────────────────────
function ProgressPills({ active, count, color }: { active: number; count: number; color: string }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-500"
          style={{
            width:  i === active ? '6px' : '4px',
            height: i === active ? '30px' : '12px',
            backgroundColor: i === active ? color : 'var(--color-muted)',
            opacity: i === active ? 1 : 0.35,
          }}
        />
      ))}
    </div>
  );
}

// ─── Panel text content ────────────────────────────────────────────────────────
function PanelText({ panel, color }: { panel: SolutionPanel; color: string }) {
  return (
    <motion.div
      key={panel.id}
      variants={panelVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="flex flex-col gap-5 w-full"
      style={{ fontFamily: 'var(--font-heading)', maxWidth: 560 }}
    >
      <motion.span
        className="text-[11px] font-bold tracking-[0.28em] uppercase"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        style={{ color }}
      >
        {panel.eyebrow}
      </motion.span>

      <div className="flex flex-col">
        {panel.headline.map((line, i) => (
          <motion.h2
            key={i}
            className="font-black leading-[1.05]"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(2rem, 4.5vw, 62px)', color: 'var(--color-text)' }}
          >
            {line}
          </motion.h2>
        ))}
      </div>

      <motion.p
        className="font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22 }}
        style={{ fontSize: 'clamp(0.9rem, 1.3vw, 18px)', color }}
      >
        {panel.sub}
      </motion.p>

      {panel.body && (
        <motion.p
          className="font-normal leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ fontSize: 'clamp(0.85rem, 1.1vw, 16px)', color: 'var(--color-brown)' }}
        >
          {panel.body}
        </motion.p>
      )}

      {panel.chips && (
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.4 }}
        >
          {panel.chips.map((chip) => (
            <span
              key={chip}
              className="px-3 py-1 rounded-full text-xs font-semibold border"
              style={{ borderColor: color, color, backgroundColor: `${color}18` }}
            >
              {chip}
            </span>
          ))}
        </motion.div>
      )}

      {panel.stats && (
        <div className="grid grid-cols-2 gap-3">
          {panel.stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col gap-1 p-4 rounded-xl"
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{ backgroundColor: `${color}10`, border: `1px solid ${color}35` }}
            >
              <span className="font-black leading-none" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 48px)', color }}>
                {s.value}
              </span>
              <span className="font-medium text-sm" style={{ color: 'var(--color-brown)' }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {panel.features && (
        <div className="flex flex-col gap-3">
          {panel.features.map((f, i) => (
            <motion.div
              key={f.label}
              className="flex items-start gap-3 p-3 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.42, delay: 0.26 + i * 0.07 }}
              style={{ backgroundColor: `${color}0e`, borderLeft: `3px solid ${color}` }}
            >
              <span className="text-xl shrink-0 mt-0.5">{f.icon}</span>
              <div>
                <div className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{f.label}</div>
                <div className="text-xs" style={{ color: 'var(--color-muted)' }}>{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {panel.cta && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.44 }}
        >
          <Link
            href={panel.cta.href}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-semibold text-sm text-white transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: color }}
          >
            {panel.cta.label}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Main layout shell ────────────────────────────────────────────────────────
export default function SolutionDetailLayout({
  hero,
  panels,
  SvgComponent,
  accentColor,
}: {
  hero: { eyebrow: string; title: string; sub: string };
  panels: SolutionPanel[];
  SvgComponent: React.ComponentType<SvgProps>;
  accentColor: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // SVG path draws — 4 staggered layers
  const p1 = useTransform(scrollYProgress, [0,    0.30], [0, 1]);
  const p2 = useTransform(scrollYProgress, [0.15, 0.52], [0, 1]);
  const p3 = useTransform(scrollYProgress, [0.35, 0.72], [0, 1]);
  const p4 = useTransform(scrollYProgress, [0.55, 0.92], [0, 1]);
  const op1 = useTransform(scrollYProgress, [0.08, 0.28], [0, 1]);
  const op2 = useTransform(scrollYProgress, [0.40, 0.65], [0, 1]);

  const segSize = 1 / panels.length;
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v / segSize), panels.length - 1);
    setActive(idx);
  });

  return (
    <>
      {/* ── Intro hero ──────────────────────────────────────────────────────── */}
      <section
        className="w-full flex flex-col items-center justify-center text-center"
        style={{
          minHeight: '55vh',
          background: 'linear-gradient(160deg, var(--color-bg2) 0%, var(--color-bg1) 100%)',
          padding: 'clamp(3rem, 9vw, 130px) clamp(1.5rem, 8vw, 160px)',
          fontFamily: 'var(--font-heading)',
        }}
      >
        <motion.span
          className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ color: accentColor }}
        >
          {hero.eyebrow}
        </motion.span>

        <motion.h1
          className="font-black leading-none mb-5"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(2.8rem, 7.5vw, 100px)', color: 'var(--color-text)' }}
        >
          {hero.title}
        </motion.h1>

        <motion.p
          className="font-medium max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          style={{ fontSize: 'clamp(1rem, 1.5vw, 20px)', color: 'var(--color-brown)' }}
        >
          {hero.sub}
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-1 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ color: 'var(--color-muted)' }}
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Sticky scroll section ────────────────────────────────────────────── */}
      <div ref={containerRef} className="relative" style={{ height: `${panels.length * 100}vh` }}>
        <div
          className="sticky top-0 h-screen overflow-hidden flex items-center"
          style={{ backgroundColor: 'var(--color-bg1)' }}
        >
          {/* Left pills */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 hidden lg:flex z-10">
            <ProgressPills active={active} count={panels.length} color={accentColor} />
          </div>

          <div
            className="w-full mx-auto flex flex-col lg:flex-row items-center"
            style={{ maxWidth: '1440px', padding: '0 clamp(2.5rem, 5vw, 80px)', gap: 0 }}
          >
            {/* SVG left */}
            <div
              className="hidden lg:flex items-center justify-center shrink-0"
              style={{ width: '46%', paddingRight: '2vw' }}
            >
              <SvgComponent p1={p1} p2={p2} p3={p3} p4={p4} op1={op1} op2={op2} />
            </div>

            {/* Divider */}
            <div
              className="hidden lg:block shrink-0 self-stretch"
              style={{
                width: '1px',
                background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)`,
                opacity: 0.3,
              }}
            />

            {/* Content right */}
            <div className="flex-1 lg:pl-10 xl:pl-14 flex items-center" style={{ minHeight: '420px' }}>
              <AnimatePresence mode="wait">
                <PanelText key={active} panel={panels[active]} color={accentColor} />
              </AnimatePresence>
            </div>
          </div>

          {/* Faded counter */}
          <div
            className="absolute bottom-6 right-8 font-black hidden lg:block select-none pointer-events-none"
            style={{
              fontSize: 'clamp(6rem, 12vw, 160px)',
              color: 'var(--color-text)',
              opacity: 0.035,
              lineHeight: 1,
              fontFamily: 'var(--font-heading)',
            }}
          >
            0{active + 1}
          </div>

          {/* Mobile dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
            {panels.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-400"
                style={{
                  width: i === active ? '20px' : '6px',
                  height: '6px',
                  backgroundColor: i === active ? accentColor : 'var(--color-muted)',
                  opacity: i === active ? 1 : 0.4,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
