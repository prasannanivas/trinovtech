'use client';
import { motion } from 'framer-motion';
import SolutionDetailLayout, { type SvgProps, type SolutionPanel } from '@/components/SolutionDetailLayout';

const COLOR = '#0EA5E9';

// ─── SVG: CI/CD pipeline + Kubernetes pods ───────────────────────────────────
function DevOpsSVG({ p1, p2, p3, p4, op1, op2 }: SvgProps) {
  // Pipeline stages: Code → Build → Test → Deploy → Monitor
  const STAGES = [
    { x: 36,  label: 'CODE',    icon: '</>' },
    { x: 116, label: 'BUILD',   icon: '🔨' },
    { x: 196, label: 'TEST',    icon: '✓'  },
    { x: 276, label: 'DEPLOY',  icon: '🚀' },
    { x: 356, label: 'MONITOR', icon: '📈' },
  ];

  return (
    <svg viewBox="0 0 480 480" fill="none" style={{ width: '100%', maxWidth: 460 }} aria-hidden="true">
      {/* Pipeline rail */}
      <motion.line x1="36" y1="120" x2="444" y2="120"
        stroke={COLOR} strokeWidth="2" style={{ pathLength: p1 }} />

      {/* Stage nodes */}
      {STAGES.map((s, i) => {
        const pathProp = [p1, p1, p2, p2, p3][i];
        return (
          <motion.g key={i} style={{ pathLength: pathProp }}>
            <motion.circle cx={s.x + 44} cy="120" r="30"
              stroke={COLOR} strokeWidth="2" fill="none" style={{ pathLength: pathProp }} />
          </motion.g>
        );
      })}
      {/* Stage labels */}
      {STAGES.map((s, i) => (
        <motion.g key={`lbl-${i}`} style={{ opacity: op1 }}>
          <text x={s.x + 44} y="116" textAnchor="middle" fontSize="9" fontWeight="700"
            fill={COLOR} fontFamily="Inter,sans-serif">{s.icon}</text>
          <text x={s.x + 44} y="130" textAnchor="middle" fontSize="7" fontWeight="600"
            fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.7">{s.label}</text>
        </motion.g>
      ))}
      {/* Arrow connectors between stages */}
      {[0,1,2,3].map(i => (
        <motion.path key={i}
          d={`M ${STAGES[i].x+74} 120 L ${STAGES[i+1].x+14} 120`}
          stroke={COLOR} strokeWidth="1.2" markerEnd="none" style={{ pathLength: p2 }} />
      ))}

      {/* Git branch graph */}
      <motion.line x1="80" y1="170" x2="80" y2="300" stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p2 }} />
      <motion.path d="M 80,200 Q 130,200 130,230 L 130,280" stroke={COLOR} strokeWidth="1.2" strokeDasharray="5 3" style={{ pathLength: p2 }} />
      <motion.path d="M 80,210 Q 160,210 160,245 L 160,280" stroke={COLOR} strokeWidth="1.2" strokeDasharray="5 3" style={{ pathLength: p3 }} />
      {/* Commits */}
      {[180,220,260,300].map((y,i) => (
        <motion.circle key={i} cx="80" cy={y} r="6" stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p2 }} />
      ))}
      {[250,280].map((y,i) => (
        <motion.circle key={i} cx={130} cy={y} r="5" stroke={COLOR} strokeWidth="1.2" style={{ pathLength: p3 }} />
      ))}
      {[265,280].map((y,i) => (
        <motion.circle key={i} cx={160} cy={y} r="5" stroke={COLOR} strokeWidth="1.2" style={{ pathLength: p3 }} />
      ))}
      {/* Branch labels */}
      <motion.g style={{ opacity: op1 }}>
        <text x="90" y="175" fontSize="7" fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.7">main</text>
        <text x="136" y="244" fontSize="7" fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.6">feature</text>
        <text x="166" y="262" fontSize="7" fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.6">hotfix</text>
      </motion.g>

      {/* K8s cluster */}
      <motion.rect x="210" y="168" width="252" height="150" rx="12"
        stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p3 }} />
      <motion.g style={{ opacity: op1 }}>
        <text x="336" y="190" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={COLOR} fontFamily="Inter,sans-serif">KUBERNETES CLUSTER</text>
      </motion.g>
      {/* Pod grid 3x2 */}
      {[[218,200],[278,200],[338,200],[218,255],[278,255],[338,255]].map(([x,y],i) => (
        <motion.rect key={i} x={x} y={y} width="52" height="46" rx="7"
          stroke={COLOR} strokeWidth="1.2" style={{ pathLength: p3 }} />
      ))}
      {/* Pod labels */}
      {['API','WEB','DB','MQ','CACHE','WORK'].map((lbl, i) => {
        const xs = [218,278,338,218,278,338];
        const ys = [200,200,200,255,255,255];
        return (
          <motion.g key={`pod-${i}`} style={{ opacity: op2 }}>
            <text x={xs[i]+26} y={ys[i]+26} textAnchor="middle" fontSize="8" fontWeight="700"
              fill={COLOR} fontFamily="Inter,sans-serif">{lbl}</text>
          </motion.g>
        );
      })}

      {/* Monitoring graph */}
      <motion.rect x="210" y="332" width="252" height="100" rx="10"
        stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p4 }} />
      <motion.g style={{ opacity: op1 }}>
        <text x="336" y="352" textAnchor="middle" fontSize="8" fontWeight="600" fill={COLOR} fontFamily="Inter,sans-serif">CPU / MEMORY</text>
      </motion.g>
      {/* Monitor sparkline */}
      <motion.polyline
        points="220,400 240,390 260,395 280,375 300,385 320,370 340,378 360,365 380,372 400,360 420,368 450,358"
        stroke={COLOR} strokeWidth="2" strokeLinecap="round" style={{ pathLength: p4 }} />
      {/* Threshold line */}
      <motion.line x1="220" y1="390" x2="450" y2="390"
        stroke={COLOR} strokeWidth="0.75" strokeDasharray="6 4" strokeOpacity="0.35" style={{ pathLength: p4 }} />

      {/* Glow dots on k8s pods */}
      {[[244,223],[304,223],[364,223]].map(([cx,cy],i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="4" fill={COLOR} style={{ opacity: op2 }} />
      ))}
    </svg>
  );
}

const PANELS: SolutionPanel[] = [
  {
    id: 0,
    eyebrow: 'DEVOPS · AUTOMATION',
    headline: ['DevOps', '& Automations'],
    sub: 'Ship faster, break less, recover instantly.',
    body: 'We design and implement CI/CD pipelines, Infrastructure as Code, container orchestration, and observability stacks — giving your team the engineering velocity of a top-tier tech company.',
    chips: ['CI/CD', 'GitOps', 'IaC', 'Kubernetes', 'Terraform', 'Observability'],
  },
  {
    id: 1,
    eyebrow: 'PIPELINE ENGINEERING',
    headline: ['Zero-Touch', 'Deployments'],
    sub: 'Automated pipelines from commit to production.',
    features: [
      { icon: '🔄', label: 'CI/CD Pipelines', desc: 'GitHub Actions, GitLab CI, Jenkins, ArgoCD — tailored to your workflow' },
      { icon: '📦', label: 'Container Orchestration', desc: 'Kubernetes, Helm charts, auto-scaling, rolling updates, zero-downtime deploys' },
      { icon: '🛡️', label: 'DevSecOps', desc: 'SAST/DAST scanning, SBOM, secrets management, policy-as-code' },
      { icon: '🏗️', label: 'Infrastructure as Code', desc: 'Terraform, Pulumi, CloudFormation — reproducible, auditable infra' },
    ],
  },
  {
    id: 2,
    eyebrow: 'METRICS',
    headline: ['Numbers', 'That Matter'],
    sub: 'Engineering outcomes you can measure.',
    stats: [
      { value: '15min', label: 'Avg. commit-to-deploy time' },
      { value: '99.95%', label: 'Pipeline success rate' },
      { value: '80%', label: 'Manual ops eliminated' },
      { value: '<5s',  label: 'MTTR (mean time to recovery)' },
    ],
  },
  {
    id: 3,
    eyebrow: 'OBSERVABILITY',
    headline: ['Always', 'In Control'],
    sub: 'Full-stack observability: metrics, logs, traces.',
    body: 'We deploy Prometheus + Grafana, ELK Stack or Loki, and distributed tracing with Jaeger/Tempo — giving you complete visibility into every service, every request, every anomaly — before your customers notice.',
    cta: { label: 'Accelerate Your DevOps', href: '/#contact' },
  },
];

export default function DevOpsContent() {
  return (
    <SolutionDetailLayout
      hero={{
        eyebrow: 'TRINOVTECH · SOLUTIONS',
        title: 'DevOps & Automations',
        sub: 'Engineering velocity through automated pipelines, GitOps, and cloud-native infrastructure.',
      }}
      panels={PANELS}
      SvgComponent={DevOpsSVG}
      accentColor={COLOR}
    />
  );
}
