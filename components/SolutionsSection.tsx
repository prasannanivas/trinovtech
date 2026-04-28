'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, type MotionValue } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const SOLUTIONS = [
  {
    title: 'Enterprise & SaaS Solutions',
    description:
      'We build Enterprise and SaaS solutions that are scalable, secure, and easy to integrateâ€”helping businesses operate efficiently and grow with confidence.',
    reverse: false,
  },
  {
    title: 'Embedded Systems & IoT',
    description:
      'We deliver end-to-end embedded and IoT solutionsâ€”from hardware to softwareâ€”enabling all peripherals with reliable, scalable performance.',
    reverse: true,
  },
  {
    title: 'System Integration & Deployment',
    description:
      'We connect IoT devices to backend systems using MQTT, HTTP, WebSockets, and APIsâ€”enabling real-time data, analytics, and seamless integration.',
    reverse: false,
  },
  {
    title: 'Unified Digital Engineering',
    description:
      'One integrated solution combining data, cloud, and applications for scalable and seamless performance.',
    reverse: true,
  },
];

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/** Splits one scroll progress into 3 layered drawing stages */
function useLayeredProgress(progress: MotionValue<number>) {
  const p1 = useTransform(progress, [0, 0.45], [0, 1]);
  const p2 = useTransform(progress, [0.18, 0.68], [0, 1]);
  const p3 = useTransform(progress, [0.42, 1.0], [0, 1]);
  return [p1, p2, p3] as const;
}

// â”€â”€ SVG 1: Enterprise Dashboard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function EnterpriseSVG({ progress }: { progress: MotionValue<number> }) {
  const [p1, p2, p3] = useLayeredProgress(progress);
  return (
    <svg viewBox="0 0 380 280" fill="none" className="w-full h-full max-w-[460px]">
      {/* Browser frame */}
      <motion.rect x="10" y="10" width="360" height="260" rx="10"
        stroke="var(--color-primary)" strokeWidth="2" pathLength={p1} />
      <motion.line x1="10" y1="48" x2="370" y2="48"
        stroke="var(--color-primary)" strokeWidth="1.5" pathLength={p1} />
      {/* Window dots */}
      <motion.circle cx="32" cy="29" r="6" stroke="var(--color-primary)" strokeWidth="2" pathLength={p1} />
      <motion.circle cx="50" cy="29" r="6" stroke="var(--color-primary)" strokeWidth="2" pathLength={p1} />
      <motion.circle cx="68" cy="29" r="6" stroke="var(--color-primary)" strokeWidth="2" pathLength={p1} />
      {/* URL bar */}
      <motion.rect x="95" y="18" width="175" height="22" rx="11"
        stroke="var(--color-primary)" strokeWidth="1.5" opacity={0.4} pathLength={p2} />
      {/* 3 metric cards */}
      <motion.rect x="18" y="58" width="104" height="68" rx="7"
        stroke="var(--color-primary)" strokeWidth="1.5" pathLength={p2} />
      <motion.rect x="138" y="58" width="104" height="68" rx="7"
        stroke="var(--color-primary)" strokeWidth="1.5" pathLength={p2} />
      <motion.rect x="258" y="58" width="104" height="68" rx="7"
        stroke="var(--color-primary)" strokeWidth="1.5" pathLength={p2} />
      {/* Sparklines inside cards */}
      <motion.path d="M 28,110 L 40,100 L 52,106 L 64,94 L 76,102 L 88,90 L 110,92"
        stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" pathLength={p3} />
      <motion.path d="M 148,110 L 160,104 L 172,94 L 184,100 L 196,88 L 208,96 L 230,94"
        stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" pathLength={p3} />
      <motion.path d="M 268,110 L 280,100 L 292,108 L 304,92 L 316,99 L 328,86 L 350,90"
        stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" pathLength={p3} />
      {/* Chart area */}
      <motion.rect x="18" y="140" width="344" height="118" rx="7"
        stroke="var(--color-primary)" strokeWidth="1.5" pathLength={p3} />
      {/* Bar chart */}
      <motion.line x1="50"  y1="238" x2="50"  y2="200" stroke="var(--color-primary)" strokeWidth="14" strokeLinecap="round" opacity={0.65} pathLength={p3} />
      <motion.line x1="94"  y1="238" x2="94"  y2="182" stroke="var(--color-primary)" strokeWidth="14" strokeLinecap="round" opacity={0.65} pathLength={p3} />
      <motion.line x1="138" y1="238" x2="138" y2="210" stroke="var(--color-primary)" strokeWidth="14" strokeLinecap="round" opacity={0.65} pathLength={p3} />
      <motion.line x1="182" y1="238" x2="182" y2="190" stroke="var(--color-primary)" strokeWidth="14" strokeLinecap="round" opacity={0.65} pathLength={p3} />
      <motion.line x1="226" y1="238" x2="226" y2="204" stroke="var(--color-primary)" strokeWidth="14" strokeLinecap="round" opacity={0.65} pathLength={p3} />
      <motion.line x1="270" y1="238" x2="270" y2="175" stroke="var(--color-primary)" strokeWidth="14" strokeLinecap="round" opacity={0.65} pathLength={p3} />
      <motion.line x1="314" y1="238" x2="314" y2="188" stroke="var(--color-primary)" strokeWidth="14" strokeLinecap="round" opacity={0.65} pathLength={p3} />
      {/* Trend line */}
      <motion.path d="M 50,200 C 72,194 82,180 94,182 S 124,208 138,210 S 162,188 182,188 S 208,204 226,203 S 252,172 270,174 S 296,187 314,188"
        stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" pathLength={p3} />
    </svg>
  );
}

// â”€â”€ SVG 2: Embedded / IoT circuit board â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function EmbeddedSVG({ progress }: { progress: MotionValue<number> }) {
  const [p1, p2, p3] = useLayeredProgress(progress);
  return (
    <svg viewBox="0 0 380 280" fill="none" className="w-full h-full max-w-[460px]">
      {/* Central chip */}
      <motion.rect x="135" y="90" width="110" height="100" rx="8"
        stroke="var(--color-primary)" strokeWidth="2.5" pathLength={p1} />
      {/* Inner grid */}
      {[110, 125, 140, 155, 170].map((y, i) => (
        <motion.line key={`h${i}`} x1="150" y1={y} x2="230" y2={y}
          stroke="var(--color-primary)" strokeWidth="1" opacity={0.3} pathLength={p2} />
      ))}
      {[168, 190, 212].map((x, i) => (
        <motion.line key={`v${i}`} x1={x} y1="95" x2={x} y2="185"
          stroke="var(--color-primary)" strokeWidth="1" opacity={0.3} pathLength={p2} />
      ))}
      {/* Traces â€” left */}
      <motion.path d="M 135,112 H 96 V 52 H 44" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" pathLength={p3} />
      <motion.path d="M 135,140 H 44" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" pathLength={p3} />
      <motion.path d="M 135,168 H 96 V 228 H 44" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" pathLength={p3} />
      {/* Traces â€” right */}
      <motion.path d="M 245,112 H 284 V 52 H 336" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" pathLength={p3} />
      <motion.path d="M 245,140 H 336" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" pathLength={p3} />
      <motion.path d="M 245,168 H 284 V 228 H 336" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" pathLength={p3} />
      {/* Traces â€” top & bottom */}
      <motion.path d="M 168,90 V 40" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" pathLength={p3} />
      <motion.path d="M 212,90 V 40" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" pathLength={p3} />
      <motion.path d="M 168,190 V 240" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" pathLength={p3} />
      <motion.path d="M 212,190 V 240" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" pathLength={p3} />
      {/* Endpoint nodes */}
      {[
        [44, 52], [44, 140], [44, 228],
        [336, 52], [336, 140], [336, 228],
        [168, 40], [212, 40], [168, 240], [212, 240],
      ].map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="9"
          stroke="var(--color-accent)" strokeWidth="2.5" pathLength={p3} />
      ))}
    </svg>
  );
}

// â”€â”€ SVG 3: System Integration flow â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function IntegrationSVG({ progress }: { progress: MotionValue<number> }) {
  const [p1, p2, p3] = useLayeredProgress(progress);
  return (
    <svg viewBox="0 0 380 280" fill="none" className="w-full h-full max-w-[460px]">
      {/* Source nodes */}
      <motion.circle cx="48" cy="80"  r="26" stroke="var(--color-primary)" strokeWidth="2"   pathLength={p1} />
      <motion.circle cx="48" cy="140" r="26" stroke="var(--color-primary)" strokeWidth="2"   pathLength={p1} />
      <motion.circle cx="48" cy="200" r="26" stroke="var(--color-primary)" strokeWidth="2"   pathLength={p1} />
      {/* Central processor */}
      <motion.rect x="148" y="88" width="84" height="104" rx="12"
        stroke="var(--color-primary)" strokeWidth="2.5" pathLength={p1} />
      {/* Output node */}
      <motion.circle cx="332" cy="140" r="32" stroke="var(--color-primary)" strokeWidth="2.5" pathLength={p1} />
      {/* Curves: left â†’ center */}
      <motion.path d="M 74,80  C 110,80  118,140 148,140" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" pathLength={p2} />
      <motion.path d="M 74,140 H 148"                    stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" pathLength={p2} />
      <motion.path d="M 74,200 C 110,200 118,140 148,140" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" pathLength={p2} />
      {/* Center â†’ output */}
      <motion.path d="M 232,140 H 300" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" pathLength={p2} />
      {/* Arrowheads */}
      <motion.path d="M 140,135 L 148,140 L 140,145" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength={p3} />
      <motion.path d="M 292,135 L 300,140 L 292,145" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength={p3} />
      {/* Data packets */}
      <motion.circle cx="112" cy="90"  r="6" stroke="var(--color-accent)" strokeWidth="2.5" pathLength={p3} />
      <motion.circle cx="111" cy="140" r="6" stroke="var(--color-accent)" strokeWidth="2.5" pathLength={p3} />
      <motion.circle cx="112" cy="192" r="6" stroke="var(--color-accent)" strokeWidth="2.5" pathLength={p3} />
      <motion.circle cx="266" cy="140" r="6" stroke="var(--color-accent)" strokeWidth="2.5" pathLength={p3} />
      {/* Hub inner lines */}
      {[115, 130, 145, 162].map((y, i) => (
        <motion.line key={i} x1="165" y1={y} x2="215" y2={y}
          stroke="var(--color-accent)" strokeWidth="1.5" opacity={0.55} pathLength={p3} />
      ))}
      {/* Inner dots */}
      <motion.circle cx="48"  cy="80"  r="9" stroke="var(--color-accent)" strokeWidth="2" pathLength={p3} />
      <motion.circle cx="48"  cy="140" r="9" stroke="var(--color-accent)" strokeWidth="2" pathLength={p3} />
      <motion.circle cx="48"  cy="200" r="9" stroke="var(--color-accent)" strokeWidth="2" pathLength={p3} />
      <motion.circle cx="332" cy="140" r="14" stroke="var(--color-accent)" strokeWidth="2" pathLength={p3} />
    </svg>
  );
}

// â”€â”€ SVG 4: Unified layered architecture â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function UnifiedSVG({ progress }: { progress: MotionValue<number> }) {
  const [p1, p2, p3] = useLayeredProgress(progress);
  return (
    <svg viewBox="0 0 380 280" fill="none" className="w-full h-full max-w-[460px]">
      {/* Bottom â€” Data layer */}
      <motion.path d="M 55,240 L 190,258 L 325,240 L 190,222 Z"
        stroke="var(--color-primary)" strokeWidth="2" strokeLinejoin="round" pathLength={p1} />
      {/* Processing layer */}
      <motion.path d="M 65,195 L 190,213 L 315,195 L 190,177 Z"
        stroke="var(--color-primary)" strokeWidth="2" strokeLinejoin="round" pathLength={p1} />
      {/* API layer */}
      <motion.path d="M 78,150 L 190,168 L 302,150 L 190,132 Z"
        stroke="var(--color-primary)" strokeWidth="2" strokeLinejoin="round" pathLength={p2} />
      {/* Top â€” UI layer */}
      <motion.path d="M 92,105 L 190,123 L 288,105 L 190,87 Z"
        stroke="var(--color-primary)" strokeWidth="3" strokeLinejoin="round" pathLength={p2} />
      {/* Left pillars */}
      <motion.line x1="55"  y1="240" x2="65"  y2="195" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" pathLength={p2} />
      <motion.line x1="65"  y1="195" x2="78"  y2="150" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" pathLength={p3} />
      <motion.line x1="78"  y1="150" x2="92"  y2="105" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" pathLength={p3} />
      {/* Right pillars */}
      <motion.line x1="325" y1="240" x2="315" y2="195" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" pathLength={p2} />
      <motion.line x1="315" y1="195" x2="302" y2="150" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" pathLength={p3} />
      <motion.line x1="302" y1="150" x2="288" y2="105" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" pathLength={p3} />
      {/* Center spine â€” dashed */}
      <motion.path d="M 190,258 L 190,87"
        stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="5 5" pathLength={p3} />
      {/* Spine dot markers */}
      {([258, 213, 168, 123, 87] as number[]).map((cy, i) => (
        <motion.circle key={i} cx={190} cy={cy} r={i === 4 ? 7 : 5}
          stroke="var(--color-accent)" strokeWidth={i === 4 ? 2.5 : 2} pathLength={p3} />
      ))}
      {/* Subtle face lines */}
      <motion.line x1="65"  y1="195" x2="315" y2="195" stroke="var(--color-primary)" strokeWidth="1" opacity={0.18} pathLength={p2} />
      <motion.line x1="78"  y1="150" x2="302" y2="150" stroke="var(--color-primary)" strokeWidth="1" opacity={0.18} pathLength={p3} />
      <motion.line x1="92"  y1="105" x2="288" y2="105" stroke="var(--color-primary)" strokeWidth="1" opacity={0.18} pathLength={p3} />
    </svg>
  );
}

const ILLUSTRATIONS = [EnterpriseSVG, EmbeddedSVG, IntegrationSVG, UnifiedSVG];

// â”€â”€ Solution Row â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SolutionRow({ sol, idx }: { sol: (typeof SOLUTIONS)[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.16 });
  const words = sol.title.split(' ');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'center 32%'],
  });

  const IllustrationComponent = ILLUSTRATIONS[idx];

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden"
      style={{
        backgroundColor: idx % 2 === 0 ? 'var(--color-bg2)' : 'var(--color-bg1)',
        minHeight: 'clamp(500px, 68vw, 780px)',
      }}
    >
      <div
        className={`mx-auto flex flex-col ${sol.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch`}
        style={{ maxWidth: '1720px', minHeight: 'inherit' }}
      >

        {/* â”€â”€ Text side â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div
          className="flex flex-col justify-center gap-5 shrink-0 w-full lg:w-[44%] relative overflow-hidden"
          style={{
            padding: 'clamp(2.5rem, 5.5vw, 88px) clamp(2rem, 4.5vw, 72px)',
            fontFamily: 'var(--font-heading)',
          }}
        >
          {/* Word-by-word title */}
          <h2
            className="font-black leading-tight relative z-10"
            style={{ fontSize: 'clamp(1.5rem, 2.8vw, 46px)', color: 'var(--color-text)' }}
          >
            {words.map((word, wi) => (
              <span key={wi} className="inline-block overflow-hidden mr-[0.22em] mb-1">
                <motion.span
                  className="inline-block"
                  animate={inView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.08 + wi * 0.07 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Description */}
          <motion.p
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.22 + words.length * 0.05 }}
            className="relative z-10"
            style={{
              fontSize: 'clamp(0.85rem, 1.05vw, 17px)',
              color: 'var(--color-brown)',
              lineHeight: 1.8,
              maxWidth: '440px',
            }}
          >
            {sol.description}
          </motion.p>

          {/* CTA */}
          <motion.a
            href="#contact"
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.48 }}
            className="inline-flex items-center justify-center font-semibold hover:opacity-80 transition-opacity self-start relative z-10"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-bg1)',
              width: '112px',
              height: '38px',
              borderRadius: '7px',
              fontSize: '13px',
            }}
          >
            Know More
          </motion.a>
        </div>

        {/* â”€â”€ Illustration side â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div
          className="flex-1 relative flex items-center justify-center"
          style={{ padding: 'clamp(2rem, 5vw, 72px)', minHeight: 'clamp(300px, 42vw, 600px)' }}
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 72% 62% at 50% 50%, color-mix(in srgb, var(--color-primary) 10%, transparent), transparent)',
            }}
          />
          <IllustrationComponent progress={scrollYProgress} />
        </div>

      </div>
    </div>
  );
}

export default function SolutionsSection() {
  return (
    <section id="solutions" className="w-full scroll-mt-24">

      {/* â”€â”€ Banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <ScrollReveal direction="up">
        <div
          className="w-full flex flex-col items-center justify-center text-center"
          style={{
            backgroundColor: 'var(--color-bg1)',
            minHeight: 'clamp(100px, 14vw, 271px)',
            padding: 'clamp(1.5rem, 3.5vw, 52px) clamp(1.5rem, 5vw, 104px)',
            fontFamily: 'var(--font-heading)',
          }}
        >
          <p
            className="font-black leading-normal"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 31px)', color: 'var(--color-text)', maxWidth: '809px' }}
          >
            Our solutions are designed to simplify complexity and drive meaningful business outcomes.
          </p>
        </div>
      </ScrollReveal>

      {SOLUTIONS.map((sol, idx) => (
        <SolutionRow key={idx} sol={sol} idx={idx} />
      ))}

    </section>
  );
}

