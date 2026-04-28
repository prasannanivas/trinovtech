'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Hero image columns with scroll-driven parallax.
 * The three columns move at different vertical speeds as the section scrolls out —
 * exactly like the Apple AirPods parallax.
 */
export default function HeroImages() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Each column moves at a different speed — left goes up fastest, right slowest
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);  // leftmost — fast
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);  // middle — medium
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);  // rightmost — slowest (goes furthest)

  return (
    <div ref={sectionRef} className="relative hidden lg:block shrink-0 hero-img-anim" style={{ width: '388px', height: '388px' }}>
      {/* Image 3 — leftmost column */}
      <motion.div
        style={{ y: y1, left: 0, top: 0, width: '114px', height: '345px', position: 'absolute' }}
        className="overflow-hidden shadow-[5px_10px_15px_0px_rgba(0,0,0,0.25)]"
      >
        <Image src="/assets/hero-img3.png" alt="hero 3" fill className="object-cover" />
      </motion.div>

      {/* Image 2 — middle column (offset down 43px) */}
      <motion.div
        style={{ y: y2, left: '142px', top: '43px', width: '114px', height: '345px', position: 'absolute' }}
        className="overflow-hidden shadow-[5px_10px_15px_0px_rgba(0,0,0,0.25)]"
      >
        <Image src="/assets/hero-img2.png" alt="hero 2" fill className="object-cover" />
      </motion.div>

      {/* Image 1 — rightmost column */}
      <motion.div
        style={{ y: y3, left: '274px', top: 0, width: '114px', height: '345px', position: 'absolute' }}
        className="overflow-hidden shadow-[5px_10px_15px_0px_rgba(0,0,0,0.25)]"
      >
        <Image src="/assets/hero-img1.png" alt="hero 1" fill className="object-cover" />
      </motion.div>
    </div>
  );
}
