'use client';
import { motion } from 'framer-motion';
import SolutionDetailLayout, { type SvgProps, type SolutionPanel } from '@/components/SolutionDetailLayout';

const COLOR = '#D97706';

// ─── SVG: End-to-end delivery pipeline ───────────────────────────────────────
function WhatWeDOSVG({ p1, p2, p3, p4, op1, op2 }: SvgProps) {
  const STAGES = [
    { x: 60,  label: 'DESIGN',    icon: '✦', sub: 'UX · Arch' },
    { x: 170, label: 'BUILD',     icon: '⬡', sub: 'Code · APIs' },
    { x: 280, label: 'INTEGRATE', icon: '◈', sub: 'IoT · Cloud' },
    { x: 390, label: 'DEPLOY',    icon: '▶', sub: 'CI/CD · Ops' },
  ];
  const pathLengths = [p1, p2, p3, p4];

  return (
    <svg viewBox="0 0 480 400" fill="none" style={{ width: '100%', maxWidth: 460 }} aria-hidden="true">

      {/* ── Pipeline rail ── */}
      <motion.line x1="60" y1="200" x2="440" y2="200"
        stroke={COLOR} strokeWidth="3" strokeLinecap="round"
        style={{ pathLength: p1 }} />

      {/* ── Stage nodes ── */}
      {STAGES.map((s, i) => (
        <motion.g key={i}>
          {/* Outer ring */}
          <motion.circle cx={s.x} cy="200" r="34"
            stroke={COLOR} strokeWidth="2" fill="none"
            style={{ pathLength: pathLengths[i] }} />
          {/* Inner fill circle */}
          <motion.circle cx={s.x} cy="200" r="22"
            stroke={COLOR} strokeWidth="1.5" fill="none"
            style={{ pathLength: pathLengths[i] }} />
          {/* Dot center */}
          <motion.circle cx={s.x} cy="200" r="6"
            fill={COLOR} style={{ opacity: op1 }} />

          {/* Stage label above */}
          <motion.g style={{ opacity: op1 }}>
            <text x={s.x} y="148" textAnchor="middle" fontSize="8.5" fontWeight="800"
              fill={COLOR} fontFamily="Inter,sans-serif" letterSpacing="1.5">
              {s.label}
            </text>
            <text x={s.x} y="163" textAnchor="middle" fontSize="7"
              fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.6">
              {s.sub}
            </text>
          </motion.g>

          {/* Step number below */}
          <motion.g style={{ opacity: op1 }}>
            <text x={s.x} y="256" textAnchor="middle" fontSize="26" fontWeight="900"
              fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.08">
              {String(i + 1).padStart(2, '0')}
            </text>
          </motion.g>
        </motion.g>
      ))}

      {/* ── Arrows between stages ── */}
      {[115, 225, 335].map((x, i) => (
        <motion.g key={i} style={{ opacity: op1 }}>
          <path d={`M ${x - 6},196 L ${x + 6},200 L ${x - 6},204`}
            stroke={COLOR} strokeWidth="1.5" fill="none" />
        </motion.g>
      ))}

      {/* ── Feedback loop arc (bottom) ── */}
      <motion.path
        d="M 60,234 Q 240,310 440,234"
        stroke={COLOR} strokeWidth="1.2" strokeDasharray="6 4" fill="none"
        style={{ pathLength: p4 }} />
      <motion.g style={{ opacity: op2 }}>
        <text x="240" y="308" textAnchor="middle" fontSize="7.5" fontWeight="700"
          fill={COLOR} fontFamily="Inter,sans-serif">CONTINUOUS FEEDBACK LOOP</text>
      </motion.g>

      {/* ── Support banner ── */}
      <motion.rect x="60" y="330" width="360" height="40" rx="8"
        stroke={COLOR} strokeWidth="1.2" fill="none"
        style={{ pathLength: p4 }} />
      <motion.g style={{ opacity: op2 }}>
        <text x="240" y="346" textAnchor="middle" fontSize="8" fontWeight="700"
          fill={COLOR} fontFamily="Inter,sans-serif" letterSpacing="1">SUPPORT & MAINTENANCE</text>
        <text x="240" y="360" textAnchor="middle" fontSize="7"
          fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.6">24/7 Monitoring · Hotfixes · Roadmap Evolution</text>
      </motion.g>

      {/* Outer bounding frame */}
      <motion.rect x="10" y="10" width="460" height="380" rx="16"
        stroke={COLOR} strokeWidth="1" strokeOpacity="0.18" fill="none"
        style={{ pathLength: p4 }} />
    </svg>
  );
}

const PANELS: SolutionPanel[] = [
  {
    id: 0,
    eyebrow: 'WHAT WE DO',
    headline: ['End-to-End', 'Technology', 'Delivery'],
    sub: 'From first sketch to production — we own the full journey.',
    body: 'TrinovTech designs, builds, integrates, and deploys technology solutions across embedded systems, IoT, cloud-native platforms, and full-stack applications. We bring the right expertise at every stage of your product lifecycle.',
    chips: ['Embedded & IoT', 'Cloud-Native', 'Full-Stack', 'DevOps & CI/CD', 'System Integration'],
  },
  {
    id: 1,
    eyebrow: 'CAPABILITIES',
    headline: ['Across Every', 'Layer of the', 'Stack'],
    sub: 'Deep capability across hardware, software, and cloud.',
    features: [
      { icon: '🔧', label: 'Embedded & Firmware', desc: 'Bare-metal, RTOS, BSP development, hardware bring-up, driver engineering' },
      { icon: '☁️', label: 'Cloud & Infrastructure', desc: 'AWS, GCP, Azure — containerised workloads, Kubernetes, serverless' },
      { icon: '💻', label: 'Full-Stack Applications', desc: 'React, Next.js, Node.js, REST/GraphQL — performant, accessible UIs and APIs' },
      { icon: '🔌', label: 'Integration & Protocols', desc: 'MQTT, HTTP, WebSockets, CAN, MODBUS — connecting hardware to software' },
    ],
  },
  {
    id: 2,
    eyebrow: 'TRACK RECORD',
    headline: ['Delivered,', 'Not Just', 'Promised'],
    sub: 'Consistent on-time delivery across diverse industries.',
    stats: [
      { value: '120+', label: 'Projects delivered end-to-end' },
      { value: '98%', label: 'Client retention rate' },
      { value: '15+', label: 'Industries and domains served' },
      { value: '4×', label: 'Avg. speed-up vs. in-house teams' },
    ],
  },
  {
    id: 3,
    eyebrow: 'THE PROMISE',
    headline: ['Concept to', 'Production,', 'Seamlessly'],
    sub: 'No gaps in ownership. No hand-off hell.',
    body: 'Whether you need a full-stack product built from scratch, an IoT device brought to market, or a cloud platform scaled to millions of users — TrinovTech delivers with one team, one point of accountability, and zero integration headaches.',
    cta: { label: 'Start Your Project', href: '/#contact' },
  },
];

export default function WhatWeDoContent() {
  return (
    <SolutionDetailLayout
      hero={{
        eyebrow: 'TRINOVTECH · ABOUT',
        title: 'What We Do',
        sub: 'Full-lifecycle technology delivery — embedded, cloud, and everything in between.',
      }}
      panels={PANELS}
      SvgComponent={WhatWeDOSVG}
      accentColor={COLOR}
    />
  );
}
