'use client';
import { motion } from 'framer-motion';
import SolutionDetailLayout, { type SvgProps, type SolutionPanel } from '@/components/SolutionDetailLayout';

const COLOR = '#3A43ED';

// ─── SVG: Hexagonal expertise map ────────────────────────────────────────────
function ExpertiseSVG({ p1, p2, p3, p4, op1, op2 }: SvgProps) {
  // Flat-top hexagon path generator at (cx, cy, r)
  const hex = (cx: number, cy: number, r: number) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i);
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    });
    return `M ${pts.join(' L ')} Z`;
  };

  const DOMAINS = [
    { cx: 240, cy: 100, label: 'Embedded', sub: 'RTOS · Firmware' },
    { cx: 360, cy: 168, label: 'IoT', sub: 'Edge · Protocols' },
    { cx: 360, cy: 312, label: 'Cloud', sub: 'AWS · GCP · Azure' },
    { cx: 240, cy: 380, label: 'Full-Stack', sub: 'React · Node' },
    { cx: 120, cy: 312, label: 'Automotive', sub: 'CAN · AUTOSAR' },
    { cx: 120, cy: 168, label: 'Data & AI', sub: 'ML · Analytics' },
  ];
  const pathLengths = [p1, p2, p2, p3, p3, p4];

  return (
    <svg viewBox="0 0 480 480" fill="none" style={{ width: '100%', maxWidth: 460 }} aria-hidden="true">

      {/* ── Outer connecting hexagon outline ── */}
      <motion.path
        d="M 240,60 L 394,150 L 394,330 L 240,420 L 86,330 L 86,150 Z"
        stroke={COLOR} strokeWidth="1.2" strokeOpacity="0.25" fill="none"
        style={{ pathLength: p1 }} />

      {/* ── Spoke lines from center to domains ── */}
      {DOMAINS.map((d, i) => (
        <motion.line key={i} x1="240" y1="240" x2={d.cx} y2={d.cy}
          stroke={COLOR} strokeWidth="1" strokeDasharray="5 4" strokeOpacity="0.4"
          style={{ pathLength: pathLengths[i] }} />
      ))}

      {/* ── Domain hexagons ── */}
      {DOMAINS.map((d, i) => (
        <motion.g key={i}>
          <motion.path d={hex(d.cx, d.cy, 46)}
            stroke={COLOR} strokeWidth="2" fill="none"
            style={{ pathLength: pathLengths[i] }} />
          <motion.path d={hex(d.cx, d.cy, 36)}
            stroke={COLOR} strokeWidth="0.75" strokeOpacity="0.3" fill="none"
            style={{ pathLength: pathLengths[i] }} />
          <motion.g style={{ opacity: op1 }}>
            <text x={d.cx} y={d.cy - 4} textAnchor="middle" fontSize="8.5" fontWeight="800"
              fill={COLOR} fontFamily="Inter,sans-serif">{d.label}</text>
            <text x={d.cx} y={d.cy + 10} textAnchor="middle" fontSize="6.5"
              fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.6">{d.sub}</text>
          </motion.g>
        </motion.g>
      ))}

      {/* ── Center hexagon ── */}
      <motion.path d={hex(240, 240, 52)}
        stroke={COLOR} strokeWidth="2.5" fill="none"
        style={{ pathLength: p1 }} />
      <motion.path d={hex(240, 240, 40)}
        stroke={COLOR} strokeWidth="1" strokeOpacity="0.4" fill="none"
        style={{ pathLength: p1 }} />
      <motion.g style={{ opacity: op1 }}>
        <text x="240" y="234" textAnchor="middle" fontSize="8.5" fontWeight="900"
          fill={COLOR} fontFamily="Inter,sans-serif" letterSpacing="1">TRINOVTECH</text>
        <text x="240" y="250" textAnchor="middle" fontSize="7"
          fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.65">EXPERTISE</text>
      </motion.g>

      {/* ── Glow rings on domain nodes ── */}
      {DOMAINS.map((d, i) => (
        <motion.circle key={`glow-${i}`} cx={d.cx} cy={d.cy} r="52"
          stroke={COLOR} strokeWidth="0.75" strokeOpacity="0.3" fill="none"
          style={{ opacity: op2 }} />
      ))}

      {/* ── Center glow fill ── */}
      <motion.circle cx="240" cy="240" r="52"
        fill={COLOR} style={{ opacity: op2 }} />
    </svg>
  );
}

const PANELS: SolutionPanel[] = [
  {
    id: 0,
    eyebrow: 'OUR EXPERTISE',
    headline: ['Deep,', 'Multi-Domain', 'Expertise'],
    sub: 'From silicon to software — spanning six core engineering domains.',
    body: 'TrinovTech brings deep, practitioner-level expertise across the full technology stack. We combine embedded engineering, IoT, cloud-native, full-stack, automotive, and data intelligence — giving you a single partner for every layer of your solution.',
    chips: ['Embedded', 'IoT', 'Cloud-Native', 'Full-Stack', 'Automotive', 'Data & AI'],
  },
  {
    id: 1,
    eyebrow: 'DOMAIN COVERAGE',
    headline: ['Six Pillars', 'of Technical', 'Excellence'],
    sub: 'Specialist knowledge, generalist thinking.',
    features: [
      { icon: '⚙️', label: 'Embedded & Firmware', desc: 'Bare-metal, RTOS (FreeRTOS, Zephyr), BSP, driver development, hardware bring-up' },
      { icon: '📡', label: 'IoT & Connectivity', desc: 'MQTT, Zigbee, BLE, LTE-M, LoRa — from sensor to cloud with end-to-end security' },
      { icon: '☁️', label: 'Cloud Platforms', desc: 'AWS, GCP, Azure — Kubernetes, Lambda, Terraform, IaC, observability stacks' },
      { icon: '🚗', label: 'Automotive Systems', desc: 'AUTOSAR classic & adaptive, CAN, LIN, OBD-II, ISO 26262 safety standards' },
    ],
  },
  {
    id: 2,
    eyebrow: 'INDUSTRY REACH',
    headline: ['Expertise', 'Across', 'Industries'],
    sub: 'Domain knowledge that makes solutions work in the real world.',
    stats: [
      { value: '15+', label: 'Industries served' },
      { value: '8+',  label: 'Years of practitioner experience' },
      { value: '50+', label: 'Certified engineers & architects' },
      { value: '6',   label: 'Core technical domains' },
    ],
  },
  {
    id: 3,
    eyebrow: 'WHY IT MATTERS',
    headline: ['The Right', 'Expert, at the', 'Right Time'],
    sub: 'Cross-domain thinking delivers integration-ready solutions.',
    body: 'Our expertise is not siloed. Engineers with embedded knowledge collaborate directly with cloud architects and data scientists — producing solutions that work across the entire system, not just within a single layer.',
    cta: { label: 'Explore Our Work', href: '/#contact' },
  },
];

export default function OurExpertiseContent() {
  return (
    <SolutionDetailLayout
      hero={{
        eyebrow: 'TRINOVTECH · ABOUT',
        title: 'Our Expertise',
        sub: 'Six engineering domains, one cohesive team delivering integrated solutions.',
      }}
      panels={PANELS}
      SvgComponent={ExpertiseSVG}
      accentColor={COLOR}
    />
  );
}
