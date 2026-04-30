'use client';
import { motion } from 'framer-motion';
import SolutionDetailLayout, { type SvgProps, type SolutionPanel } from '@/components/SolutionDetailLayout';

const COLOR = '#16A34A';

// ─── SVG: Data pipeline — ingest → transform → store → visualize ─────────────
function DataEngineeringSVG({ p1, p2, p3, p4, op1, op2 }: SvgProps) {
  return (
    <svg viewBox="0 0 480 480" fill="none" style={{ width: '100%', maxWidth: 460 }} aria-hidden="true">
      {/* ── Source nodes (left column) ── */}
      {[60, 130, 200, 270].map((y, i) => {
        const labels = ['API', 'DB', 'IoT', 'FILES'];
        return (
          <motion.g key={i}>
            <motion.rect x="18" y={y} width="52" height="36" rx="8"
              stroke={COLOR} strokeWidth="1.5" fill="none" style={{ pathLength: p1 }} />
            <motion.g style={{ opacity: op1 }}>
              <text x="44" y={y + 22} textAnchor="middle" fontSize="9" fontWeight="700"
                fill={COLOR} fontFamily="Inter,sans-serif">{labels[i]}</text>
            </motion.g>
          </motion.g>
        );
      })}

      {/* ── Ingest bus ── */}
      <motion.rect x="88" y="44" width="60" height="282" rx="10"
        stroke={COLOR} strokeWidth="2" fill="none" style={{ pathLength: p1 }} />
      <motion.g style={{ opacity: op1 }}>
        <text x="118" y="186" textAnchor="middle" fontSize="8" fontWeight="700"
          fill={COLOR} fontFamily="Inter,sans-serif" transform="rotate(-90 118 186)">INGEST</text>
      </motion.g>
      {/* Lines from sources to bus */}
      {[78, 148, 218, 288].map((y, i) => (
        <motion.line key={i} x1="70" y1={y} x2="88" y2={y}
          stroke={COLOR} strokeWidth="1" strokeDasharray="4 3" style={{ pathLength: p1 }} />
      ))}

      {/* ── Transform stage ── */}
      <motion.rect x="166" y="44" width="100" height="282" rx="10"
        stroke={COLOR} strokeWidth="2" fill="none" style={{ pathLength: p2 }} />
      <motion.g style={{ opacity: op1 }}>
        <text x="216" y="198" textAnchor="middle" fontSize="8" fontWeight="700"
          fill={COLOR} fontFamily="Inter,sans-serif" transform="rotate(-90 216 198)">TRANSFORM</text>
      </motion.g>
      {/* Transform internal steps */}
      {['CLEAN','ENRICH','VALIDATE','AGGREGATE'].map((lbl, i) => (
        <motion.g key={lbl}>
          <motion.rect x="178" y={64 + i * 62} width="76" height="44" rx="6"
            stroke={COLOR} strokeWidth="1" strokeOpacity="0.6" style={{ pathLength: p2 }} />
          <motion.g style={{ opacity: op1 }}>
            <text x="216" y={64 + i * 62 + 27} textAnchor="middle" fontSize="7.5" fontWeight="700"
              fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.8">{lbl}</text>
          </motion.g>
        </motion.g>
      ))}

      {/* ── Storage warehouse ── */}
      <motion.rect x="284" y="44" width="90" height="282" rx="10"
        stroke={COLOR} strokeWidth="2" fill="none" style={{ pathLength: p3 }} />
      <motion.g style={{ opacity: op1 }}>
        <text x="329" y="198" textAnchor="middle" fontSize="8" fontWeight="700"
          fill={COLOR} fontFamily="Inter,sans-serif" transform="rotate(-90 329 198)">WAREHOUSE</text>
      </motion.g>
      {/* Cylinder DB shapes inside */}
      {[72, 160, 252].map((y, i) => {
        const labels = ['RAW', 'CURATED', 'SERVING'];
        return (
          <motion.g key={i}>
            <motion.ellipse cx="329" cy={y} rx="30" ry="10"
              stroke={COLOR} strokeWidth="1.2" style={{ pathLength: p3 }} />
            <motion.rect x="299" y={y} width="60" height="50" stroke={COLOR} strokeWidth="1.2" style={{ pathLength: p3 }} />
            <motion.ellipse cx="329" cy={y + 50} rx="30" ry="10"
              stroke={COLOR} strokeWidth="1.2" style={{ pathLength: p3 }} />
            <motion.g style={{ opacity: op1 }}>
              <text x="329" y={y + 30} textAnchor="middle" fontSize="7" fontWeight="700"
                fill={COLOR} fontFamily="Inter,sans-serif">{labels[i]}</text>
            </motion.g>
          </motion.g>
        );
      })}

      {/* ── Visualize ── */}
      <motion.rect x="392" y="44" width="72" height="282" rx="10"
        stroke={COLOR} strokeWidth="2" fill="none" style={{ pathLength: p4 }} />
      <motion.g style={{ opacity: op1 }}>
        <text x="428" y="193" textAnchor="middle" fontSize="8" fontWeight="700"
          fill={COLOR} fontFamily="Inter,sans-serif" transform="rotate(-90 428 193)">VISUALIZE</text>
      </motion.g>
      {/* Mini bar chart */}
      {[0,1,2,3,4].map(i => (
        <motion.rect key={i} x={400 + i * 10} y={220 - i * 12 - (i===2?10:0)} width="7" height={28 + i * 12 + (i===2?10:0)} rx="2"
          stroke={COLOR} strokeWidth="1" style={{ pathLength: p4 }} />
      ))}
      {/* Mini pie */}
      <motion.circle cx="428" cy="100" r="22" stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p4 }} />
      <motion.path d="M 428,100 L 428,78 A 22,22 0 0,1 449,108 Z"
        stroke={COLOR} strokeWidth="1" fill={COLOR} style={{ opacity: op2 }} />

      {/* ── Stage connectors ── */}
      {[148, 266, 374].map((x, i) => (
        <motion.line key={i} x1={x} y1="185" x2={x + 18} y2="185"
          stroke={COLOR} strokeWidth="1.5" style={{ pathLength: [p1,p2,p3][i] }} />
      ))}

      {/* ── ML model badge ── */}
      <motion.rect x="166" y="350" width="296" height="80" rx="12"
        stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p4 }} />
      <motion.g style={{ opacity: op2 }}>
        <text x="314" y="380" textAnchor="middle" fontSize="9.5" fontWeight="700"
          fill={COLOR} fontFamily="Inter,sans-serif">ML / AI INSIGHTS</text>
        <text x="314" y="396" textAnchor="middle" fontSize="7.5" fill={COLOR}
          fontFamily="Inter,sans-serif" opacity="0.6">Predictive Analytics · Anomaly Detection · NLP</text>
      </motion.g>

      {/* Glow dots on warehouse */}
      {[[329, 122], [329, 210]].map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="5" fill={COLOR} style={{ opacity: op2 }} />
      ))}
    </svg>
  );
}

const PANELS: SolutionPanel[] = [
  {
    id: 0,
    eyebrow: 'DATA ENGINEERING',
    headline: ['Data', 'Engineering', '& Analytics'],
    sub: 'Turn raw data into business intelligence at scale.',
    body: 'We design and build end-to-end data platforms — from data ingestion and pipeline engineering to warehouse design, BI dashboards, and ML/AI model integration — enabling data-driven decisions across your entire organization.',
    chips: ['Data Pipelines', 'ELT/ETL', 'Data Warehouse', 'BI & Dashboards', 'ML/AI', 'Real-Time Analytics'],
  },
  {
    id: 1,
    eyebrow: 'PLATFORM LAYERS',
    headline: ['Ingest,', 'Transform,', 'Analyse'],
    sub: 'A modern data stack engineered for scale and speed.',
    features: [
      { icon: '🔄', label: 'Data Pipeline Engineering', desc: 'Apache Spark, Kafka, Airflow, dbt — batch and streaming pipelines' },
      { icon: '🏛️', label: 'Data Warehouse / Lakehouse', desc: 'Snowflake, BigQuery, Delta Lake, Iceberg — governed and performant' },
      { icon: '📊', label: 'BI & Self-Serve Analytics', desc: 'Tableau, Looker, Metabase, custom dashboards with real-time KPIs' },
      { icon: '🤖', label: 'ML & Predictive Analytics', desc: 'Model training, serving, MLOps, anomaly detection, NLP pipelines' },
    ],
  },
  {
    id: 2,
    eyebrow: 'OUTCOMES',
    headline: ['Data That', 'Moves Business'],
    sub: 'Measurable impact from every byte of data.',
    stats: [
      { value: '10×', label: 'Faster query performance' },
      { value: '70%', label: 'Reduction in pipeline failures' },
      { value: '24/7', label: 'Real-time monitoring & alerting' },
      { value: '5PB+', label: 'Data managed across clients' },
    ],
  },
  {
    id: 3,
    eyebrow: 'DATA GOVERNANCE',
    headline: ['Trusted,', 'Governed', 'Data'],
    sub: 'Quality, lineage, and compliance built in from day one.',
    body: 'We implement data governance frameworks — cataloguing, lineage tracking with Apache Atlas/DataHub, PII masking, GDPR/CCPA compliance controls, and automated data quality gates — so your data is trustworthy at every layer.',
    cta: { label: 'Unlock Your Data', href: '/#contact' },
  },
];

export default function DataEngineeringContent() {
  return (
    <SolutionDetailLayout
      hero={{
        eyebrow: 'TRINOVTECH · SOLUTIONS',
        title: 'Data Engineering',
        sub: 'Modern data platforms that turn raw data into a competitive advantage.',
      }}
      panels={PANELS}
      SvgComponent={DataEngineeringSVG}
      accentColor={COLOR}
    />
  );
}
