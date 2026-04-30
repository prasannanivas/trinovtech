'use client';
import { motion } from 'framer-motion';
import SolutionDetailLayout, { type SvgProps, type SolutionPanel } from '@/components/SolutionDetailLayout';

const COLOR = '#C62828';

// ─── SVG: Multi-tenant SaaS architecture ────────────────────────────────────
function EnterpriseSVG({ p1, p2, p3, p4, op1, op2 }: SvgProps) {
  return (
    <svg viewBox="0 0 480 480" fill="none" style={{ width: '100%', maxWidth: 460 }} aria-hidden="true">
      {/* Outer border */}
      <motion.rect x="20" y="20" width="440" height="440" rx="16"
        stroke={COLOR} strokeWidth="1.5" fill="none" style={{ pathLength: p1 }} />

      {/* Top bar — browser chrome */}
      <motion.rect x="20" y="20" width="440" height="52" rx="16"
        stroke={COLOR} strokeWidth="1.5" fill="none" style={{ pathLength: p1 }} />
      <motion.circle cx="52"  cy="46" r="8" stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p1 }} />
      <motion.circle cx="76"  cy="46" r="8" stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p1 }} />
      <motion.circle cx="100" cy="46" r="8" stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p1 }} />
      {/* Address bar */}
      <motion.rect x="122" y="32" width="200" height="26" rx="13"
        stroke={COLOR} strokeWidth="1.2" strokeOpacity="0.45" style={{ pathLength: p2 }} />

      {/* Sidebar */}
      <motion.rect x="20" y="72" width="88" height="388" rx="0"
        stroke={COLOR} strokeWidth="1.2" fill="none" strokeOpacity="0.5" style={{ pathLength: p2 }} />
      {/* Sidebar nav items */}
      {[110, 148, 186, 224, 262].map((y, i) => (
        <motion.rect key={i} x="32" y={y} width="64" height="20" rx="6"
          stroke={COLOR} strokeWidth="1" strokeOpacity="0.35" style={{ pathLength: p2 }} />
      ))}
      {/* Sidebar highlight */}
      <motion.rect x="28" y="106" width="72" height="28" rx="6"
        fill={COLOR} style={{ opacity: op1 }} />

      {/* KPI cards row */}
      {[118, 216, 314].map((x, i) => (
        <motion.rect key={i} x={x} y="82" width="86" height="72" rx="10"
          stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p2 }} />
      ))}
      {/* Sparkline inside first card */}
      <motion.polyline
        points="126,138 140,128 154,132 168,118 182,124 196,110"
        stroke={COLOR} strokeWidth="2" strokeLinecap="round" style={{ pathLength: p3 }} />
      {/* Bar chart inside second card */}
      {[224, 236, 248, 260, 272].map((x, i) => (
        <motion.rect key={i} x={x} y={145 - i * 5} width="8" height={12 + i * 5} rx="2"
          stroke={COLOR} strokeWidth="1" style={{ pathLength: p3 }} />
      ))}

      {/* Main chart area */}
      <motion.rect x="118" y="168" width="342" height="180" rx="10"
        stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p3 }} />
      {/* Chart grid lines */}
      {[208, 248, 288].map((y, i) => (
        <motion.line key={i} x1="130" y1={y} x2="448" y2={y}
          stroke={COLOR} strokeWidth="0.7" strokeOpacity="0.25" style={{ pathLength: p3 }} />
      ))}
      {/* Area chart path */}
      <motion.path
        d="M 130,330 L 178,290 L 226,308 L 274,265 L 322,278 L 370,240 L 418,255 L 448,230 L 448,348 L 130,348 Z"
        stroke={COLOR} strokeWidth="2" fill={COLOR} fillOpacity="0.08" style={{ pathLength: p4 }} />
      <motion.path
        d="M 130,330 L 178,290 L 226,308 L 274,265 L 322,278 L 370,240 L 418,255 L 448,230"
        stroke={COLOR} strokeWidth="2.5" strokeLinecap="round" fill="none" style={{ pathLength: p4 }} />

      {/* Bottom user row */}
      <motion.rect x="118" y="362" width="342" height="68" rx="10"
        stroke={COLOR} strokeWidth="1.2" style={{ pathLength: p4 }} />
      {[4, 5, 6, 7].map((i) => (
        <motion.circle key={i} cx={134 + (i - 4) * 54} cy="396" r="16"
          stroke={COLOR} strokeWidth="1.2" style={{ pathLength: p4 }} />
      ))}

      {/* Glow dots on chart peaks */}
      {[[274, 265], [370, 240], [448, 230]].map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="5" fill={COLOR} style={{ opacity: op2 }} />
      ))}
    </svg>
  );
}

// ─── Panels ───────────────────────────────────────────────────────────────────
const PANELS: SolutionPanel[] = [
  {
    id: 0,
    eyebrow: 'ENTERPRISE PLATFORM',
    headline: ['Enterprise', '& SaaS', 'Solutions'],
    sub: 'Scalable, multi-tenant platforms built for enterprise-grade reliability.',
    body: 'We architect and deliver cloud-native SaaS platforms designed for high availability, multi-tenancy, role-based access control, and seamless third-party integrations — empowering businesses to scale without limits.',
    chips: ['Multi-Tenancy', 'Cloud-Native', 'RBAC', 'REST & GraphQL APIs', 'Microservices'],
  },
  {
    id: 1,
    eyebrow: 'PLATFORM CAPABILITIES',
    headline: ['Built for', 'Scale'],
    sub: 'Production-grade infrastructure from day one.',
    features: [
      { icon: '🏗️', label: 'Microservices Architecture', desc: 'Decoupled services for independent scaling and deployment' },
      { icon: '🔐', label: 'Enterprise Security', desc: 'SSO, OAuth2, MFA, audit logs, and data encryption at rest & in transit' },
      { icon: '📊', label: 'Real-Time Dashboards', desc: 'Live KPIs, analytics, and reporting built into the platform' },
      { icon: '🔗', label: 'Third-Party Integrations', desc: 'Salesforce, Stripe, HubSpot, Slack, and 100+ connectors' },
    ],
  },
  {
    id: 2,
    eyebrow: 'BY THE NUMBERS',
    headline: ['Proven', 'Delivery'],
    sub: 'Enterprise outcomes, not just software.',
    stats: [
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '10M+', label: 'API calls / day handled' },
      { value: '3×', label: 'Faster time-to-market' },
      { value: '40%', label: 'Avg. infra cost reduction' },
    ],
  },
  {
    id: 3,
    eyebrow: 'OUR TECH STACK',
    headline: ['End-to-End', 'Engineering'],
    sub: 'From database to UI — we own the full stack.',
    body: 'Our enterprise stack spans React/Next.js frontends, Node.js/Go/Python backends, PostgreSQL & Redis datastores, Kubernetes orchestration on AWS/GCP/Azure, and CI/CD pipelines that ship new features in hours — not weeks.',
    cta: { label: 'Discuss Your Platform', href: '/#contact' },
  },
];

export default function EnterpriseSaasContent() {
  return (
    <SolutionDetailLayout
      hero={{
        eyebrow: 'TRINOVTECH · SOLUTIONS',
        title: 'Enterprise & SaaS',
        sub: 'Scalable cloud-native platforms that grow with your business.',
      }}
      panels={PANELS}
      SvgComponent={EnterpriseSVG}
      accentColor={COLOR}
    />
  );
}
