'use client';
import { motion } from 'framer-motion';
import SolutionDetailLayout, { type SvgProps, type SolutionPanel } from '@/components/SolutionDetailLayout';

const COLOR = '#65A30D';

// ─── SVG: Circular 6-step workflow ────────────────────────────────────────────
function ProcessSVG({ p1, p2, p3, p4, op1, op2 }: SvgProps) {
  const STEPS = [
    { label: 'DISCOVER',  sub: 'Requirements',   angle: -90  },
    { label: 'ARCHITECT', sub: 'System Design',   angle: -30  },
    { label: 'BUILD',     sub: 'Development',     angle:  30  },
    { label: 'TEST',      sub: 'QA & Validation', angle:  90  },
    { label: 'DEPLOY',    sub: 'Release & CI/CD', angle: 150  },
    { label: 'SUPPORT',   sub: 'Monitor & Evolve',angle: 210  },
  ];
  const R = 148;
  const CX = 240, CY = 240;
  const pathLengths = [p1, p1, p2, p2, p3, p4];

  const stepNodes = STEPS.map((s) => {
    const rad = (Math.PI / 180) * s.angle;
    return { ...s, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
  });

  return (
    <svg viewBox="0 0 480 480" fill="none" style={{ width: '100%', maxWidth: 460 }} aria-hidden="true">

      {/* ── Outer guide ring ── */}
      <motion.circle cx={CX} cy={CY} r={R + 20}
        stroke={COLOR} strokeWidth="0.75" strokeOpacity="0.2" fill="none"
        style={{ pathLength: p1 }} />

      {/* ── Main circular arc (dashed, full circle) ── */}
      <motion.circle cx={CX} cy={CY} r={R}
        stroke={COLOR} strokeWidth="1.5" strokeDasharray="8 5" fill="none"
        style={{ pathLength: p1 }} />

      {/* ── Spoke lines center → nodes ── */}
      {stepNodes.map((n, i) => (
        <motion.line key={i} x1={CX} y1={CY} x2={n.x} y2={n.y}
          stroke={COLOR} strokeWidth="1" strokeOpacity="0.25"
          style={{ pathLength: pathLengths[i] }} />
      ))}

      {/* ── Step nodes ── */}
      {stepNodes.map((n, i) => (
        <motion.g key={i}>
          <motion.circle cx={n.x} cy={n.y} r="36"
            stroke={COLOR} strokeWidth="2" fill="none"
            style={{ pathLength: pathLengths[i] }} />
          <motion.circle cx={n.x} cy={n.y} r="26"
            stroke={COLOR} strokeWidth="1" strokeOpacity="0.35" fill="none"
            style={{ pathLength: pathLengths[i] }} />
          <motion.circle cx={n.x} cy={n.y} r="7"
            fill={COLOR} style={{ opacity: op1 }} />
          <motion.g style={{ opacity: op1 }}>
            {/* Step number outside ring */}
            <text
              x={CX + (R + 56) * Math.cos((Math.PI / 180) * n.angle)}
              y={CY + (R + 56) * Math.sin((Math.PI / 180) * n.angle) + 4}
              textAnchor="middle" fontSize="22" fontWeight="900"
              fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.1">
              {String(i + 1)}
            </text>
            {/* Label inside node */}
            <text x={n.x} y={n.y - 4} textAnchor="middle" fontSize="7" fontWeight="800"
              fill={COLOR} fontFamily="Inter,sans-serif" letterSpacing="1">
              {n.label}
            </text>
            <text x={n.x} y={n.y + 8} textAnchor="middle" fontSize="6.5"
              fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.6">
              {n.sub}
            </text>
          </motion.g>
        </motion.g>
      ))}

      {/* ── Center circle ── */}
      <motion.circle cx={CX} cy={CY} r="48"
        stroke={COLOR} strokeWidth="2" fill="none"
        style={{ pathLength: p2 }} />
      <motion.circle cx={CX} cy={CY} r="36"
        stroke={COLOR} strokeWidth="1" strokeOpacity="0.3" fill="none"
        style={{ pathLength: p3 }} />
      <motion.g style={{ opacity: op2 }}>
        <circle cx={CX} cy={CY} r="36" fill={COLOR} opacity="0.12" />
        <text x={CX} y={CY - 4} textAnchor="middle" fontSize="8" fontWeight="900"
          fill={COLOR} fontFamily="Inter,sans-serif" letterSpacing="1.5">AGILE</text>
        <text x={CX} y={CY + 10} textAnchor="middle" fontSize="8" fontWeight="900"
          fill={COLOR} fontFamily="Inter,sans-serif" letterSpacing="1.5">DELIVERY</text>
      </motion.g>

      {/* ── Directional arrow on arc ── */}
      <motion.g style={{ opacity: op2 }}>
        <path
          d={`M ${CX + R * Math.cos((Math.PI / 180) * 60)},${CY + R * Math.sin((Math.PI / 180) * 60)} L ${CX + R * Math.cos((Math.PI / 180) * 65)},${CY + R * Math.sin((Math.PI / 180) * 65)}`}
          stroke={COLOR} strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

const PANELS: SolutionPanel[] = [
  {
    id: 0,
    eyebrow: 'HOW WE WORK',
    headline: ['Our Proven', 'Delivery', 'Process'],
    sub: 'A structured, transparent, milestone-driven approach every time.',
    body: 'We follow a six-phase delivery model that brings discipline and clarity to every engagement — from initial discovery through to long-term support. Each phase has defined deliverables, checkpoints, and client sign-off.',
    chips: ['Agile Sprints', 'Milestone-Driven', 'Full Visibility', 'Quality Gates', 'Continuous Delivery'],
  },
  {
    id: 1,
    eyebrow: 'PHASES 1 & 2',
    headline: ['Discover &', 'Architect'],
    sub: 'Getting it right before a single line of code is written.',
    features: [
      { icon: '🔍', label: 'Requirements Discovery', desc: 'Stakeholder workshops, user story mapping, acceptance criteria, and risk analysis' },
      { icon: '📐', label: 'System Architecture', desc: 'Technology selection, component diagrams, data models, interface contracts' },
      { icon: '🎨', label: 'UX & Prototyping', desc: 'Wireframes, interactive prototypes, design system foundations — validated with users' },
      { icon: '📋', label: 'Project Roadmap', desc: 'Sprint plan, milestone schedule, resource allocation, and cost baseline' },
    ],
  },
  {
    id: 2,
    eyebrow: 'PHASES 3 & 4',
    headline: ['Build &', 'Test'],
    sub: 'Rigorous development with quality baked in — not bolted on.',
    stats: [
      { value: '2-wk', label: 'Sprint cadence with demo & review' },
      { value: '95%+', label: 'Test coverage target on all modules' },
      { value: '0',    label: 'Manual regression steps in CI pipeline' },
      { value: '100%', label: 'Code review coverage before merge' },
    ],
  },
  {
    id: 3,
    eyebrow: 'PHASES 5 & 6',
    headline: ['Deploy &', 'Support'],
    sub: 'Smooth go-live and continuous improvement after launch.',
    body: "Zero-downtime deployments via automated CI/CD pipelines, followed by proactive monitoring, performance optimisation, and a structured support model — so your solution keeps pace with your business as it grows.",
    cta: { label: 'Start the Conversation', href: '/#contact' },
  },
];

export default function ProcessWeFollowContent() {
  return (
    <SolutionDetailLayout
      hero={{
        eyebrow: 'TRINOVTECH · ABOUT',
        title: 'Process We Follow',
        sub: 'Six disciplined phases that take your project from idea to production — reliably.',
      }}
      panels={PANELS}
      SvgComponent={ProcessSVG}
      accentColor={COLOR}
    />
  );
}
