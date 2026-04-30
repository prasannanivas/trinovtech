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

// ─── Types ───────────────────────────────────────────────────────────────────
type Panel = {
  id: number;
  eyebrow: string;
  headline: string[];
  sub: string;
  body?: string;
  chips?: string[];
  stats?: { value: string; label: string }[];
  domains?: { label: string; tag: string }[];
  cta?: { label: string; href: string };
};

// ─── Panel Content ───────────────────────────────────────────────────────────
const PANELS: Panel[] = [
  {
    id: 0,
    eyebrow: 'TRUSTED PARTNER',
    headline: ['End-to-End', 'Technology', 'Partnership'],
    sub: "From Silicon to Software — we've got your full stack covered.",
    body: 'We are a battle-tested team of engineers, architects, and consultants delivering integrated technology solutions across embedded systems, IoT, cloud-native platforms, and full-stack applications. We become an extension of your team from day one.',
    chips: ['End-to-End', 'Silicon to Software', 'Agile Delivery', 'Digital Transformation'],
  },
  {
    id: 1,
    eyebrow: 'BY THE NUMBERS',
    headline: ['Proven', 'at Scale'],
    sub: 'Metrics that speak louder than promises.',
    stats: [
      { value: '50+', label: 'Engineers & Consultants' },
      { value: '120+', label: 'Projects Delivered' },
      { value: '8+', label: 'Years of Expertise' },
      { value: '15+', label: 'Industries Served' },
    ],
  },
  {
    id: 2,
    eyebrow: 'CORE DOMAINS',
    headline: ['Multi-Domain', 'Expertise'],
    sub: 'Spanning the full technology spectrum.',
    domains: [
      { label: 'Embedded Systems', tag: 'Bare-metal · RTOS · Firmware' },
      { label: 'IoT Platforms', tag: 'Edge · Connectivity · Protocols' },
      { label: 'Cloud Native', tag: 'AWS · GCP · Azure · Kubernetes' },
      { label: 'Full-Stack', tag: 'React · Node · Next.js · APIs' },
      { label: 'Automotive', tag: 'AUTOSAR · CAN · LIN · OBD' },
      { label: 'Data & Analytics', tag: 'ML · BI · Data Pipelines' },
    ],
  },
  {
    id: 3,
    eyebrow: 'OUR MISSION',
    headline: ['Built to Enable', 'Your Growth'],
    sub: 'Technology that works for your business, not the other way around.',
    body: "Every engagement is structured around your business objectives — delivering scalable, maintainable, and secure solutions that grow with you. We don't just deliver; we become invested in your success.",
    cta: { label: 'Start a Conversation', href: '/#contact' },
  },
];

// Per-panel accent color (matching the AboutSection btn colors)
const PANEL_COLORS = ['#F97316', '#16A34A', '#0EA5E9', '#7C3AED'];

// ─── SVG Data ─────────────────────────────────────────────────────────────────
// Center of viewBox: (240, 260) — outer nodes at r=180
const OUTER_NODES = [
  { cx: 240, cy: 80,  lines: ['Cloud', 'Native']     },
  { cx: 396, cy: 170, lines: ['IoT']                  },
  { cx: 396, cy: 350, lines: ['Full-Stack']            },
  { cx: 240, cy: 440, lines: ['Data &', 'Analytics']  },
  { cx: 84,  cy: 350, lines: ['Embedded']              },
  { cx: 84,  cy: 170, lines: ['Automotive']            },
];

// Spokes: inner hexagon vertex → outer node
const SPOKES = [
  'M 240,200 L 240,80',
  'M 292,230 L 396,170',
  'M 292,290 L 396,350',
  'M 240,320 L 240,440',
  'M 188,290 L 84,350',
  'M 188,230 L 84,170',
];

// ─── Animated SVG Diagram ─────────────────────────────────────────────────────
function NetworkSVG({
  ringPath,
  hexPath,
  spokeOp,
  centerOp,
  nodeOp,
  fillOp,
}: {
  ringPath: MotionValue<number>;
  hexPath:  MotionValue<number>;
  spokeOp:  MotionValue<number>;
  centerOp: MotionValue<number>;
  nodeOp:   MotionValue<number>;
  fillOp:   MotionValue<number>;
}) {
  return (
    <svg
      viewBox="0 0 480 520"
      style={{ width: '100%', maxWidth: 460 }}
      fill="none"
      aria-hidden="true"
    >
      {/* ── Outer hexagon ring — fill tint (appears last, very subtle) ── */}
      <motion.path
        d="M 240,80 L 396,170 L 396,350 L 240,440 L 84,350 L 84,170 Z"
        fill="var(--color-primary)"
        style={{ opacity: fillOp }}
      />

      {/* ── Outer hexagon ring — stroke draw ── */}
      <motion.path
        d="M 240,80 L 396,170 L 396,350 L 240,440 L 84,350 L 84,170 Z"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        fill="none"
        style={{ pathLength: ringPath }}
      />

      {/* ── Secondary (inner-mid) ring at ~65% radius ── */}
      <motion.path
        d="M 240,143 L 357,203 L 357,317 L 240,377 L 123,317 L 123,203 Z"
        stroke="var(--color-primary)"
        strokeWidth="0.75"
        strokeOpacity="0.35"
        fill="none"
        style={{ pathLength: ringPath }}
      />

      {/* ── Spokes — fade in ── */}
      {SPOKES.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="var(--color-accent)"
          strokeWidth="1"
          strokeDasharray="5 4"
          fill="none"
          style={{ opacity: spokeOp }}
        />
      ))}

      {/* ── Inner hexagon — fill tint ── */}
      <motion.path
        d="M 240,200 L 292,230 L 292,290 L 240,320 L 188,290 L 188,230 Z"
        fill="var(--color-accent)"
        style={{ opacity: fillOp }}
      />

      {/* ── Inner hexagon — stroke draw ── */}
      <motion.path
        d="M 240,200 L 292,230 L 292,290 L 240,320 L 188,290 L 188,230 Z"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        fill="none"
        style={{ pathLength: hexPath }}
      />

      {/* ── Center circle ── */}
      <motion.g style={{ opacity: centerOp }}>
        <circle cx="240" cy="260" r="30" fill="var(--color-primary)" />
        <text
          x="240" y="256"
          textAnchor="middle"
          fill="white"
          fontSize="7.5"
          fontWeight="700"
          fontFamily="Inter, sans-serif"
          letterSpacing="1.2"
        >
          TRINOVTECH
        </text>
        <text
          x="240" y="270"
          textAnchor="middle"
          fill="rgba(255,255,255,0.65)"
          fontSize="6"
          fontFamily="Inter, sans-serif"
        >
          Technology
        </text>
      </motion.g>

      {/* ── Outer domain nodes — fade in ── */}
      {OUTER_NODES.map((node, i) => (
        <motion.g key={i} style={{ opacity: nodeOp }}>
          <circle
            cx={node.cx} cy={node.cy} r="27"
            fill="white"
            stroke="var(--color-primary)"
            strokeWidth="1.5"
          />
          {node.lines.map((line, j) => (
            <text
              key={j}
              x={node.cx}
              y={node.cy + (node.lines.length > 1 ? (j === 0 ? -5 : 7) : 4)}
              textAnchor="middle"
              fill="var(--color-primary)"
              fontSize="7.5"
              fontWeight="700"
              fontFamily="Inter, sans-serif"
            >
              {line}
            </text>
          ))}
        </motion.g>
      ))}

      {/* ── Glow ring on active nodes ── */}
      {OUTER_NODES.map((node, i) => (
        <motion.circle
          key={`glow-${i}`}
          cx={node.cx} cy={node.cy} r="33"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="0.75"
          strokeOpacity="0.4"
          style={{ opacity: nodeOp }}
        />
      ))}
    </svg>
  );
}

// ─── Progress Pills ───────────────────────────────────────────────────────────
function ProgressPills({ active }: { active: number }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      {PANELS.map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-500"
          style={{
            width:  i === active ? '6px'  : '4px',
            height: i === active ? '30px' : '12px',
            backgroundColor: i === active ? PANEL_COLORS[i] : 'var(--color-muted)',
            opacity: i === active ? 1 : 0.35,
          }}
        />
      ))}
    </div>
  );
}

// ─── Panel animations ─────────────────────────────────────────────────────────
const panelVariants = {
  enter: { opacity: 0, y: 64, scale: 0.96 },
  center: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0, y: -44, scale: 1.02,
    transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] as [number, number, number, number] },
  },
};

// ─── Panel Content ─────────────────────────────────────────────────────────────
function PanelText({ panel, color }: { panel: Panel; color: string }) {
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
      {/* Eyebrow tag */}
      <motion.span
        className="text-[11px] font-bold tracking-[0.28em] uppercase"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        style={{ color }}
      >
        {panel.eyebrow}
      </motion.span>

      {/* Headline — each line staggers in */}
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

      {/* Sub-headline */}
      <motion.p
        className="font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22, ease: 'easeOut' }}
        style={{ fontSize: 'clamp(0.9rem, 1.3vw, 18px)', color }}
      >
        {panel.sub}
      </motion.p>

      {/* Body */}
      {panel.body && (
        <motion.p
          className="font-normal leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          style={{ fontSize: 'clamp(0.85rem, 1.1vw, 16px)', color: 'var(--color-brown)' }}
        >
          {panel.body}
        </motion.p>
      )}

      {/* Keyword chips */}
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
              style={{
                borderColor: color,
                color,
                backgroundColor: `${color}18`,
              }}
            >
              {chip}
            </span>
          ))}
        </motion.div>
      )}

      {/* Stats grid */}
      {panel.stats && (
        <div className="grid grid-cols-2 gap-3">
          {panel.stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col gap-1 p-4 rounded-xl"
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backgroundColor: `${color}10`,
                border: `1px solid ${color}35`,
              }}
            >
              <span
                className="font-black leading-none"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 48px)', color }}
              >
                {s.value}
              </span>
              <span className="font-medium text-sm" style={{ color: 'var(--color-brown)' }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Domain grid */}
      {panel.domains && (
        <div className="grid grid-cols-2 gap-3">
          {panel.domains.map((d, i) => (
            <motion.div
              key={d.label}
              className="flex flex-col gap-1 p-3 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.42, delay: 0.28 + i * 0.065, ease: 'easeOut' }}
              style={{
                backgroundColor: `${color}0e`,
                borderLeft: `3px solid ${color}`,
              }}
            >
              <span className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>
                {d.label}
              </span>
              <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                {d.tag}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* CTA */}
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

// ─── Main component ───────────────────────────────────────────────────────────
export default function WhoWeAreContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── SVG animation transforms ──
  const ringPath = useTransform(scrollYProgress, [0, 0.28], [0, 1]);
  const spokeOp  = useTransform(scrollYProgress, [0.12, 0.44], [0, 1]);
  const hexPath  = useTransform(scrollYProgress, [0.22, 0.52], [0, 1]);
  const centerOp = useTransform(scrollYProgress, [0.34, 0.52], [0, 1]);
  const nodeOp   = useTransform(scrollYProgress, [0.42, 0.66], [0, 1]);
  const fillOp   = useTransform(scrollYProgress, [0.68, 1.0],  [0, 0.06]);

  // ── Panel switching ──
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if      (v < 0.25) setActive(0);
    else if (v < 0.50) setActive(1);
    else if (v < 0.75) setActive(2);
    else               setActive(3);
  });

  const color = PANEL_COLORS[active];

  return (
    <>
      {/* ── Page intro hero ───────────────────────────────────────────────── */}
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
          style={{ color: '#F97316' }}
        >
          TRINOVTECH · IDENTITY
        </motion.span>

        <motion.h1
          className="font-black leading-none mb-5"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(2.8rem, 7.5vw, 100px)', color: 'var(--color-text)' }}
        >
          Who We Are
        </motion.h1>

        <motion.p
          className="font-medium max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          style={{ fontSize: 'clamp(1rem, 1.5vw, 20px)', color: 'var(--color-brown)' }}
        >
          A trusted team of engineers and consultants — delivering end-to-end technology
          solutions from silicon to software.
        </motion.p>

        {/* Scroll indicator */}
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

      {/* ── Sticky scroll section ──────────────────────────────────────────── */}
      <div ref={containerRef} className="relative" style={{ height: '400vh' }}>
        <div
          className="sticky top-0 h-screen overflow-hidden flex items-center"
          style={{ backgroundColor: 'var(--color-bg1)' }}
        >
          {/* Left edge progress pills */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 hidden lg:flex z-10">
            <ProgressPills active={active} />
          </div>

          {/* Main layout */}
          <div
            className="w-full mx-auto flex flex-col lg:flex-row items-center"
            style={{
              maxWidth: '1440px',
              padding: '0 clamp(2.5rem, 5vw, 80px)',
              gap: 0,
            }}
          >
            {/* ── Left: Animated SVG ── */}
            <div
              className="hidden lg:flex items-center justify-center shrink-0"
              style={{ width: '46%', paddingRight: '2vw' }}
            >
              <NetworkSVG
                ringPath={ringPath}
                hexPath={hexPath}
                spokeOp={spokeOp}
                centerOp={centerOp}
                nodeOp={nodeOp}
                fillOp={fillOp}
              />
            </div>

            {/* ── Divider ── */}
            <div
              className="hidden lg:block shrink-0 self-stretch"
              style={{
                width: '1px',
                background: 'linear-gradient(to bottom, transparent, var(--color-primary), transparent)',
                opacity: 0.25,
              }}
            />

            {/* ── Right: Content panels ── */}
            <div
              className="flex-1 lg:pl-10 xl:pl-14 flex items-center"
              style={{ minHeight: '420px' }}
            >
              <AnimatePresence mode="wait">
                <PanelText key={active} panel={PANELS[active]} color={color} />
              </AnimatePresence>
            </div>
          </div>

          {/* Faded panel counter */}
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

          {/* Mobile progress dots (bottom center) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
            {PANELS.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-400"
                style={{
                  width: i === active ? '20px' : '6px',
                  height: '6px',
                  backgroundColor: i === active ? PANEL_COLORS[i] : 'var(--color-muted)',
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
