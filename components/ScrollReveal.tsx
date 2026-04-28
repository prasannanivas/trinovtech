'use client';

import { motion, Variants } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
}

const variants: Record<NonNullable<Props['direction']>, Variants> = {
  up: {
    hidden: { opacity: 0, y: 52 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -52 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 52 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.93, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
};

/**
 * Apple-quality scroll-reveal powered by Framer Motion.
 * Triggers when the element enters the viewport (whileInView).
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  style = {},
  threshold = 0.12,
}: Props) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variants[direction]}
      transition={{
        duration: 0.85,
        delay: delay / 1000,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
