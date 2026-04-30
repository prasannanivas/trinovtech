'use client';
import { motion } from 'framer-motion';
import SolutionDetailLayout, { type SvgProps, type SolutionPanel } from '@/components/SolutionDetailLayout';

const COLOR = '#7C3AED';

// ─── SVG: Layered platform stack (mobile → API → cloud → analytics) ──────────
function UnifiedSVG({ p1, p2, p3, p4, op1, op2 }: SvgProps) {
  const LAYERS = [
    { y: 60,  label: 'PRESENTATION',  sub: 'Web · Mobile · Desktop' },
    { y: 155, label: 'API GATEWAY',   sub: 'REST · GraphQL · gRPC'  },
    { y: 250, label: 'SERVICES',      sub: 'Microservices · Events'  },
    { y: 345, label: 'DATA LAYER',    sub: 'SQL · NoSQL · Streams'   },
  ];

  return (
    <svg viewBox="0 0 480 480" fill="none" style={{ width: '100%', maxWidth: 460 }} aria-hidden="true">
      {/* Layer boxes */}
      {LAYERS.map((l, i) => {
        const pathProp = [p1, p2, p3, p4][i];
        return (
          <motion.g key={i}>
            <motion.rect x="60" y={l.y} width="360" height="78" rx="14"
              stroke={COLOR} strokeWidth="2" fill="none" style={{ pathLength: pathProp }} />
            {/* Inset decoration rect */}
            <motion.rect x="76" y={l.y + 12} width="328" height="54" rx="8"
              stroke={COLOR} strokeWidth="0.75" strokeOpacity="0.3" fill="none" style={{ pathLength: pathProp }} />
          </motion.g>
        );
      })}

      {/* Vertical connectors between layers */}
      {[0,1,2].map(i => (
        <motion.line key={i}
          x1="240" y1={LAYERS[i].y + 78} x2="240" y2={LAYERS[i+1].y}
          stroke={COLOR} strokeWidth="1.5" strokeDasharray="5 4" style={{ pathLength: [p1,p2,p3][i] }} />
      ))}
      {/* Arrows on connectors */}
      {[0,1,2].map(i => {
        const y = LAYERS[i].y + 78 + (LAYERS[i+1].y - LAYERS[i].y - 78) / 2;
        return (
          <motion.path key={`arr-${i}`}
            d={`M 235,${y+4} L 240,${y+10} L 245,${y+4}`}
            stroke={COLOR} strokeWidth="1.5" fill="none" style={{ opacity: op1 }} />
        );
      })}

      {/* Layer labels */}
      {LAYERS.map((l, i) => (
        <motion.g key={`lbl-${i}`} style={{ opacity: op1 }}>
          <text x="240" y={l.y + 38} textAnchor="middle" fontSize="10" fontWeight="700"
            fill={COLOR} fontFamily="Inter,sans-serif" letterSpacing="1.5">{l.label}</text>
          <text x="240" y={l.y + 54} textAnchor="middle" fontSize="8" fill={COLOR}
            fontFamily="Inter,sans-serif" opacity="0.6">{l.sub}</text>
        </motion.g>
      ))}

      {/* Left side — client icons */}
      <motion.rect x="20" y="68" width="32" height="48" rx="4"
        stroke={COLOR} strokeWidth="1.2" style={{ pathLength: p1 }} />
      <motion.g style={{ opacity: op1 }}>
        <text x="36" y="98" textAnchor="middle" fontSize="7" fill={COLOR} fontFamily="Inter,sans-serif">APP</text>
      </motion.g>
      <motion.rect x="20" y="130" width="32" height="20" rx="3"
        stroke={COLOR} strokeWidth="1.2" style={{ pathLength: p1 }} />
      <motion.g style={{ opacity: op1 }}>
        <text x="36" y="144" textAnchor="middle" fontSize="6.5" fill={COLOR} fontFamily="Inter,sans-serif">WEB</text>
      </motion.g>
      {/* Connect clients to layer */}
      <motion.line x1="52" y1="90" x2="60" y2="99" stroke={COLOR} strokeWidth="1" strokeDasharray="4 3" style={{ pathLength: p1 }} />
      <motion.line x1="52" y1="140" x2="60" y2="108" stroke={COLOR} strokeWidth="1" strokeDasharray="4 3" style={{ pathLength: p1 }} />

      {/* Right side — cloud provider */}
      <motion.path
        d="M 428,258 Q 440,248 452,258 Q 460,252 468,262 Q 474,258 474,268 Q 474,278 468,278 L 425,278 Q 418,278 418,268 Q 418,260 428,258 Z"
        stroke={COLOR} strokeWidth="1.2" fill="none" style={{ pathLength: p3 }} />
      <motion.line x1="420" y1="275" x2="420" y2="290" stroke={COLOR} strokeWidth="1" style={{ pathLength: p3 }} />
      <motion.g style={{ opacity: op2 }}>
        <text x="446" y="295" textAnchor="middle" fontSize="7" fill={COLOR} fontFamily="Inter,sans-serif">CLOUD</text>
      </motion.g>
      <motion.line x1="420" y1="280" x2="420" y2="295" stroke={COLOR} strokeWidth="1" strokeDasharray="3 2" style={{ pathLength: p3 }} />

      {/* Internal service bubbles inside Services layer */}
      {[108, 200, 292, 384].map((x, i) => {
        const labels = ['AUTH','NOTIF','BILLING','SEARCH'];
        return (
          <motion.g key={`svc-${i}`}>
            <motion.circle cx={x} cy="289" r="18"
              stroke={COLOR} strokeWidth="1.2" fill="none" style={{ pathLength: p3 }} />
            <motion.g style={{ opacity: op2 }}>
              <text x={x} y="293" textAnchor="middle" fontSize="6.5" fontWeight="700"
                fill={COLOR} fontFamily="Inter,sans-serif">{labels[i]}</text>
            </motion.g>
          </motion.g>
        );
      })}

      {/* Data icons bottom layer */}
      {[100, 195, 290, 380].map((x, i) => {
        const icons = ['SQL','🔴','MQ','S3'];
        return (
          <motion.g key={`db-${i}`}>
            <motion.ellipse cx={x} cy={380} rx="24" ry="10"
              stroke={COLOR} strokeWidth="1.2" style={{ pathLength: p4 }} />
            <motion.rect x={x-24} y={380} width="48" height="20" stroke={COLOR} strokeWidth="1.2" style={{ pathLength: p4 }} />
            <motion.ellipse cx={x} cy={400} rx="24" ry="10"
              stroke={COLOR} strokeWidth="1.2" style={{ pathLength: p4 }} />
            <motion.g style={{ opacity: op2 }}>
              <text x={x} y="393" textAnchor="middle" fontSize="7" fontWeight="700"
                fill={COLOR} fontFamily="Inter,sans-serif">{icons[i]}</text>
            </motion.g>
          </motion.g>
        );
      })}

      {/* Glow on API gateway center */}
      <motion.circle cx="240" cy="194" r="10" fill={COLOR} style={{ opacity: op2 }} />
    </svg>
  );
}

const PANELS: SolutionPanel[] = [
  {
    id: 0,
    eyebrow: 'UNIFIED DIGITAL',
    headline: ['Unified', 'Digital', 'Engineering'],
    sub: 'One integrated platform — data, cloud, and applications working as one.',
    body: 'We architect unified digital platforms that seamlessly connect your frontend experiences, backend services, cloud infrastructure, and data pipelines into a single coherent system — built for scale, observability, and speed.',
    chips: ['Full-Stack', 'Cloud-Native', 'API-First', 'Event-Driven', 'Platform Engineering'],
  },
  {
    id: 1,
    eyebrow: 'ARCHITECTURE',
    headline: ['Built on', 'Solid', 'Foundations'],
    sub: 'Every layer engineered for reliability and future growth.',
    features: [
      { icon: '🌐', label: 'Web & Mobile Clients', desc: 'React, Next.js, React Native — unified design system across platforms' },
      { icon: '🔀', label: 'API Gateway & BFF', desc: 'GraphQL federation, REST aggregation, gRPC microservice mesh' },
      { icon: '⚡', label: 'Event-Driven Services', desc: 'Kafka, RabbitMQ, WebSockets — real-time event streaming at scale' },
      { icon: '🗄️', label: 'Polyglot Data Layer', desc: 'PostgreSQL, MongoDB, Redis, Elasticsearch, S3 — right tool for each job' },
    ],
  },
  {
    id: 2,
    eyebrow: 'IMPACT',
    headline: ['One Platform,', 'All Outcomes'],
    sub: 'Consolidation that drives measurable ROI.',
    stats: [
      { value: '60%', label: 'Reduction in integration overhead' },
      { value: '4×',  label: 'Faster feature delivery' },
      { value: '100%', label: 'API contract coverage' },
      { value: '2×',  label: 'Improvement in system observability' },
    ],
  },
  {
    id: 3,
    eyebrow: 'DELIVERY MODEL',
    headline: ['Concept to', 'Production'],
    sub: 'We own the full lifecycle — architecture, build, deploy, operate.',
    body: 'From an initial architecture sprint through to production deployment and ongoing platform operations — we embed with your team to deliver a unified digital foundation that your business can build on for years.',
    cta: { label: 'Build Your Platform', href: '/#contact' },
  },
];

export default function UnifiedDigitalContent() {
  return (
    <SolutionDetailLayout
      hero={{
        eyebrow: 'TRINOVTECH · SOLUTIONS',
        title: 'Unified Digital',
        sub: 'Data, cloud, and applications engineered as one integrated platform.',
      }}
      panels={PANELS}
      SvgComponent={UnifiedSVG}
      accentColor={COLOR}
    />
  );
}
