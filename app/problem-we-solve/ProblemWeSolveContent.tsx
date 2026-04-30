'use client';
import { motion } from 'framer-motion';
import SolutionDetailLayout, { type SvgProps, type SolutionPanel } from '@/components/SolutionDetailLayout';

const COLOR = '#16A34A';

// ─── SVG: Chaos → Order (fragmented nodes reconnect into structured graph) ───
function ProblemSolveSVG({ p1, p2, p3, p4, op1, op2 }: SvgProps) {
  // Left side "chaos" — scattered overlapping circles/tangled lines
  const chaosNodes = [
    { cx: 68, cy: 88 }, { cx: 130, cy: 60 }, { cx: 48, cy: 160 },
    { cx: 152, cy: 140 }, { cx: 100, cy: 210 }, { cx: 170, cy: 220 },
  ];
  const tangledLines = [
    'M 68,88 L 152,140', 'M 130,60 L 48,160', 'M 48,160 L 170,220',
    'M 100,210 L 130,60', 'M 68,88 L 100,210', 'M 152,140 L 130,60',
  ];

  // Right side "solution" — clean grid lattice
  const solveNodes = [
    { cx: 310, cy: 100 }, { cx: 380, cy: 100 }, { cx: 450, cy: 100 },
    { cx: 310, cy: 180 }, { cx: 380, cy: 180 }, { cx: 450, cy: 180 },
    { cx: 310, cy: 260 }, { cx: 380, cy: 260 }, { cx: 450, cy: 260 },
  ];
  const solveLines = [
    'M 310,100 L 380,100', 'M 380,100 L 450,100',
    'M 310,180 L 380,180', 'M 380,180 L 450,180',
    'M 310,260 L 380,260', 'M 380,260 L 450,260',
    'M 310,100 L 310,180', 'M 310,180 L 310,260',
    'M 380,100 L 380,180', 'M 380,180 L 380,260',
    'M 450,100 L 450,180', 'M 450,180 L 450,260',
  ];

  return (
    <svg viewBox="0 0 520 380" fill="none" style={{ width: '100%', maxWidth: 460 }} aria-hidden="true">

      {/* ── Dividing transform arrow ── */}
      <motion.line x1="216" y1="30" x2="216" y2="350"
        stroke={COLOR} strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.35"
        style={{ pathLength: p1 }} />
      <motion.path d="M 208,190 L 228,190 M 218,182 L 228,190 L 218,198"
        stroke={COLOR} strokeWidth="2" fill="none" style={{ opacity: op1 }} />
      <motion.g style={{ opacity: op2 }}>
        <text x="222" y="174" fontSize="8" fontWeight="700" fill={COLOR}
          fontFamily="Inter,sans-serif" letterSpacing="1">SOLVE</text>
      </motion.g>

      {/* ── Left: Tangled "problem" lines ── */}
      {tangledLines.map((d, i) => (
        <motion.path key={i} d={d} stroke="#EF4444" strokeWidth="1"
          strokeOpacity="0.55" strokeDasharray="3 2"
          style={{ pathLength: p1 }} />
      ))}
      {/* Left: Chaos nodes */}
      {chaosNodes.map((n, i) => (
        <motion.g key={i}>
          <motion.circle cx={n.cx} cy={n.cy} r="12"
            stroke="#EF4444" strokeWidth="1.5" fill="none"
            style={{ pathLength: p1 }} />
          <motion.circle cx={n.cx} cy={n.cy} r="4"
            fill="#EF4444" style={{ opacity: op1 }} />
        </motion.g>
      ))}
      {/* Problem label */}
      <motion.g style={{ opacity: op1 }}>
        <text x="110" y="295" textAnchor="middle" fontSize="8" fontWeight="700"
          fill="#EF4444" fontFamily="Inter,sans-serif" letterSpacing="1.5">COMPLEXITY</text>
        <text x="110" y="312" textAnchor="middle" fontSize="7"
          fill="#EF4444" fontFamily="Inter,sans-serif" opacity="0.6">Fragmented · Costly · Slow</text>
      </motion.g>

      {/* ── Right: Organized "solution" lines ── */}
      {solveLines.map((d, i) => (
        <motion.path key={i} d={d} stroke={COLOR} strokeWidth="1.2"
          style={{ pathLength: [p1, p2, p2, p3, p3, p3, p2, p3, p2, p3, p2, p3][i] }} />
      ))}
      {/* Right: Solution nodes */}
      {solveNodes.map((n, i) => (
        <motion.g key={i}>
          <motion.circle cx={n.cx} cy={n.cy} r="13"
            stroke={COLOR} strokeWidth="1.8" fill="none"
            style={{ pathLength: [p1, p1, p1, p2, p2, p2, p3, p3, p3][i] }} />
          <motion.circle cx={n.cx} cy={n.cy} r="5"
            fill={COLOR} style={{ opacity: op1 }} />
        </motion.g>
      ))}
      {/* Center solution node highlight */}
      <motion.circle cx="380" cy="180" r="18"
        stroke={COLOR} strokeWidth="2.5" fill="none"
        style={{ pathLength: p4 }} />
      <motion.circle cx="380" cy="180" r="8" fill={COLOR}
        style={{ opacity: op2 }} />
      {/* Solution label */}
      <motion.g style={{ opacity: op2 }}>
        <text x="380" y="305" textAnchor="middle" fontSize="8" fontWeight="700"
          fill={COLOR} fontFamily="Inter,sans-serif" letterSpacing="1.5">CLARITY</text>
        <text x="380" y="322" textAnchor="middle" fontSize="7"
          fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.6">Scalable · Lean · Fast</text>
      </motion.g>

      {/* Outer bounding rect */}
      <motion.rect x="12" y="12" width="496" height="356" rx="16"
        stroke={COLOR} strokeWidth="1.2" strokeOpacity="0.2" fill="none"
        style={{ pathLength: p4 }} />
    </svg>
  );
}

const PANELS: SolutionPanel[] = [
  {
    id: 0,
    eyebrow: 'THE CHALLENGE',
    headline: ['Problems', 'We Solve'],
    sub: 'Turning your biggest technology bottlenecks into your greatest competitive advantage.',
    body: 'Most organizations face the same core problem: complexity grows faster than their teams can manage it. Siloed development, expensive headcount, fragmented toolchains, and slow time-to-market are costing businesses money and opportunity every day.',
    chips: ['Reduce Overhead', 'Eliminate Silos', 'Speed to Market', 'Scale on Demand'],
  },
  {
    id: 1,
    eyebrow: 'COST OF COMPLEXITY',
    headline: ['The Hidden', 'Cost of', 'Fragmentation'],
    sub: 'Every day of delay is revenue left on the table.',
    stats: [
      { value: '40%', label: 'Avg. budget wasted on integration rework' },
      { value: '3×', label: 'Longer cycles with fragmented teams' },
      { value: '65%', label: 'Projects fail due to unclear ownership' },
      { value: '2×', label: 'Costs saved with a unified delivery partner' },
    ],
  },
  {
    id: 2,
    eyebrow: 'OUR APPROACH',
    headline: ['How We', 'Solve It'],
    sub: 'One partner. Full ownership. Zero hand-off friction.',
    features: [
      { icon: '🎯', label: 'Reduce Team Overhead', desc: 'On-demand expertise eliminates the cost of building and maintaining large in-house teams' },
      { icon: '🔗', label: 'Eliminate Integration Pain', desc: 'We design systems with integration in mind from day one — no bolted-on connectors' },
      { icon: '⚡', label: 'Accelerate Delivery', desc: 'Milestone-driven sprints with full visibility — ship faster without sacrificing quality' },
      { icon: '📈', label: 'Scale Without Risk', desc: 'Flex up or down based on your needs — no long-term headcount commitments' },
    ],
  },
  {
    id: 3,
    eyebrow: 'THE OUTCOME',
    headline: ['Simpler,', 'Leaner,', 'Faster'],
    sub: 'Technology that solves problems — not creates new ones.',
    body: 'With TrinovTech as your partner, you gain a battle-tested team that takes full ownership of your technology challenges — delivering integrated, scalable solutions so you can focus entirely on growing your business.',
    cta: { label: 'Tell Us Your Challenge', href: '/#contact' },
  },
];

export default function ProblemWeSolveContent() {
  return (
    <SolutionDetailLayout
      hero={{
        eyebrow: 'TRINOVTECH · ABOUT',
        title: 'Problem We Solve',
        sub: 'We reduce complexity, eliminate overhead, and accelerate your time to market.',
      }}
      panels={PANELS}
      SvgComponent={ProblemSolveSVG}
      accentColor={COLOR}
    />
  );
}
