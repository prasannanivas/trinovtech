'use client';

import { useEffect, useState } from 'react';

export default function FloatingContact() {
  const [shake, setShake] = useState(false);

  // Vibrate every 5 seconds
  useEffect(() => {
    const trigger = () => {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    };
    // First shake after 3s so it catches early attention
    const initial = setTimeout(trigger, 3000);
    const interval = setInterval(trigger, 5000);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  return (
    <a
      href="#contact"
      aria-label="Contact us"
      className={`fixed z-[9997] flex items-center justify-center rounded-full shadow-2xl transition-transform${shake ? ' floating-contact-shake' : ''}`}
      style={{
        bottom: '2rem',
        right: '3.5rem',
        width: '54px',
        height: '54px',
        backgroundColor: 'var(--color-primary)',
      }}
    >
      {/* Ripple ring */}
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-30"
        style={{ backgroundColor: 'var(--color-primary)' }}
      />

      {/* Chat bubble icon */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="9" y1="14" x2="13" y2="14" />
      </svg>
    </a>
  );
}
