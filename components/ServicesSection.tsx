'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const SERVICES = [
  {
    title: 'Solution Consulting',
    description:
      'We work closely with you to understand your needs and guide you with reliable, scalable solutions you can trust.',
    image: '/assets/solution-consulting.png',
    bg: 'var(--color-bg1)',
  },
  {
    title: 'Mobile Application Development',
    description:
      'Secure, scalable apps—built as per your requirements with seamless performance.',
    image: '/assets/mobile-app.png',
    bg: 'var(--color-bg2)',
  },
  {
    title: 'Web Application Development',
    description:
      'Robust, high-performance backend solutions—designed for reliability, security, and long-term trust.',
    image: '/assets/web-development.png',
    bg: 'var(--color-bg1)',
  },
  {
    title: 'Embedded Hardware Design',
    description:
      'We deliver reliable embedded hardware solutions—built to your requirements with quality and performance you can trust.',
    image: '/assets/embedded-hardware-design.png',
    bg: 'var(--color-bg2)',
  },
  {
    title: 'Firmware Development',
    description:
      'We build reliable firmware—optimized for performance, stability, and seamless integration.',
    image: '/assets/firmware-development.png',
    bg: 'var(--color-bg1)',
  },
  {
    title: 'Linux Developments',
    description:
      'Reliable Linux, custom OS, and RTOS solutions—built for performance, stability, and seamless integration.',
    image: '/assets/linux.png',
    bg: 'var(--color-bg2)',
  },
  {
    title: 'Cloud Server Maintenance',
    description:
      'Secure, scalable cloud solutions on AWS, Azure, and Google Cloud—managed for reliability and performance.',
    image: '/assets/cloud-server-maintanance.png',
    bg: 'var(--color-bg1)',
  },
  {
    title: 'Data Analytics & Dashboards',
    description:
      'Transform data into insights with reliable analytics and intuitive dashboards you can trust.',
    image: '/assets/sol-data.png',
    bg: 'var(--color-bg2)',
  },
];

// Text slides in from the LEFT on forward scroll, exits RIGHT
const textVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * -90 }),
  center: { opacity: 1, x: 0 },
  exit:  (d: number) => ({ opacity: 0, x: d * 90 }),
};

// Image slides in from the RIGHT on forward scroll, exits LEFT
const imgVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 90 }),
  center: { opacity: 1, x: 0 },
  exit:  (d: number) => ({ opacity: 0, x: d * -90 }),
};

// Giant background number fades + moves vertically
const numVariants = {
  enter: (d: number) => ({ opacity: 0, y: d * 60 }),
  center: { opacity: 0.055, y: 0 },
  exit:  (d: number) => ({ opacity: 0, y: d * -60 }),
};

const T = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const };
const T_EXIT = { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const };

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const prevIdx = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const n = Math.min(
      Math.floor(v * SERVICES.length),
      SERVICES.length - 1
    );
    if (n !== prevIdx.current) {
      setDir(n > prevIdx.current ? 1 : -1);
      setActiveIdx(n);
      prevIdx.current = n;
    }
  });

  const svc = SERVICES[activeIdx];

  return (
    <section id="services" className="scroll-mt-24">

      {/* ── Banner ───────────────────────────────────────────────────────── */}
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
            From concept to deployment, we provide technology services that perform with confidence.
          </p>
        </div>
      </ScrollReveal>

      {/* ── Sticky scroll showcase ────────────────────────────────────────── */}
      {/* Tall outer container — gives scroll distance per service */}
      <div ref={containerRef} style={{ height: `${SERVICES.length * 65}vh` }}>

        {/* Sticky inner — stays locked to viewport while outer scrolls */}
        <motion.div
          className="sticky top-0 h-screen overflow-hidden"
          animate={{ backgroundColor: svc.bg }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >

          {/* ── Giant faded background number ─────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none select-none flex items-end overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.span
                key={`num-${activeIdx}`}
                custom={dir}
                variants={numVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={T}
                className="font-black leading-none"
                style={{
                  fontSize: 'clamp(200px, 32vw, 520px)',
                  color: 'var(--color-primary)',
                  lineHeight: 0.85,
                  marginLeft: '-0.04em',
                  marginBottom: '-0.1em',
                }}
              >
                {String(activeIdx + 1).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* ── Desktop layout ─────────────────────────────────────────── */}
          <div
            className="hidden lg:flex h-full items-center justify-between relative z-10"
            style={{
              maxWidth: '1720px',
              margin: '0 auto',
              padding: '0 clamp(2rem, 4.5vw, 72px)',
              gap: 'clamp(2rem, 4vw, 64px)',
            }}
          >
            {/* Left: text block */}
            <div
              className="shrink-0 overflow-hidden relative"
              style={{ width: '42%', height: '60vh' }}
            >
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={`text-${activeIdx}`}
                  custom={dir}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ enter: T, exit: T_EXIT } as never}
                  style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}
                >
                  {/* Counter */}
                  <span
                    className="font-semibold tracking-[0.25em] uppercase"
                    style={{ fontSize: '0.72rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
                  >
                    {String(activeIdx + 1).padStart(2, '0')}&nbsp;&nbsp;/&nbsp;&nbsp;{String(SERVICES.length).padStart(2, '0')}
                  </span>

                  {/* Title */}
                  <h2
                    className="font-black leading-tight"
                    style={{
                      fontSize: 'clamp(2rem, 3.4vw, 54px)',
                      color: 'var(--color-text)',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {svc.title}
                  </h2>

                  {/* Description */}
                  <p
                    className="leading-relaxed"
                    style={{
                      fontSize: 'clamp(0.9rem, 1.1vw, 18px)',
                      color: 'var(--color-brown)',
                      fontFamily: 'var(--font-body)',
                      maxWidth: '420px',
                    }}
                  >
                    {svc.description}
                  </p>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 self-start font-semibold transition-opacity hover:opacity-70"
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--color-primary)',
                      textDecoration: 'underline',
                      textDecorationColor: 'var(--color-accent)',
                    }}
                  >
                    Get in touch →
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: image */}
            <div
              className="flex-1 relative rounded-3xl overflow-hidden"
              style={{ height: '70vh' }}
            >
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={`img-${activeIdx}`}
                  custom={dir}
                  variants={imgVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={T}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover"
                    sizes="58vw"
                    priority={activeIdx === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Mobile layout ──────────────────────────────────────────── */}
          <div className="lg:hidden h-full flex flex-col justify-center px-6 gap-5 relative z-10">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={`mob-${activeIdx}`}
                custom={dir}
                variants={imgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={T}
                className="flex flex-col gap-4"
              >
                <span
                  className="font-semibold uppercase tracking-[0.2em]"
                  style={{ fontSize: '0.7rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
                >
                  {String(activeIdx + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
                </span>
                <div
                  className="relative w-full rounded-2xl overflow-hidden"
                  style={{ height: '42vw', minHeight: '180px' }}
                >
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={activeIdx === 0}
                  />
                </div>
                <h2
                  className="font-black leading-tight"
                  style={{ fontSize: 'clamp(1.4rem, 5vw, 28px)', color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
                >
                  {svc.title}
                </h2>
                <p
                  style={{ fontSize: '0.88rem', color: 'var(--color-brown)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}
                >
                  {svc.description}
                </p>
                <a
                  href="#contact"
                  style={{ color: 'var(--color-primary)', fontSize: '0.88rem', fontWeight: 700, textDecoration: 'underline' }}
                >
                  Get in touch →
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Progress pills ─────────────────────────────────────────── */}
          <div className="absolute bottom-7 left-0 right-0 flex justify-center items-center gap-2 z-20">
            {SERVICES.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === activeIdx ? 28 : 7,
                  opacity: i === activeIdx ? 1 : 0.28,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-[5px] rounded-full"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
