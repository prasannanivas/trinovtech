'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { SiteConfig } from '@/lib/supabase';
import NavThemeSwitcher from '@/components/NavThemeSwitcher';

type Props = { config: SiteConfig };

const SECTION_IDS = ['home', 'about', 'solutions', 'services', 'contact'];

export default function Navbar({ config }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide on scroll down, reveal on scroll up
  const handleScroll = useCallback(() => {
    const current = window.scrollY;
    if (current <= 50) {
      setVisible(true);
    } else {
      setVisible(current < lastScrollY);
    }
    setLastScrollY(current);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Reveal navbar when cursor hovers near the top edge
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 60) setVisible(true);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Active section via IntersectionObserver
  // querySelectorAll handles duplicate IDs (e.g. #about in WeEnsure + AboutSection)
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const els = document.querySelectorAll(`#${id}`);
      if (!els.length) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-30% 0px -50% 0px' }
      );
      els.forEach((el) => observer.observe(el));
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const isActive = (href: string) => activeSection === href.replace('#', '');
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300"
      style={{
        backgroundColor: 'var(--color-bg1)',
        fontFamily: 'var(--font-heading)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}
    >
      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-between px-6 xl:px-[26px] py-[18px]">
        {/* Logo */}
        <a href="#home">
          <Image
            src="/assets/logo.png"
            alt="TRINOVTECH"
            width={132}
            height={42}
            className="object-contain"
            priority
          />
        </a>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {config.nav_links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="capitalize font-medium text-base whitespace-nowrap transition-opacity hover:opacity-80"
              style={
                isActive(link.href)
                  ? {
                      backgroundColor: 'rgba(255,122,0,0.8)',
                      color: 'var(--color-bg1)',
                      borderRadius: '23px',
                      padding: '4px 18px',
                    }
                  : { color: 'var(--color-text)' }
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Theme Switcher + CTA */}
        <div className="flex items-center gap-4">
          <NavThemeSwitcher />
          <a
            href="#contact"
            className="font-bold text-sm px-5 py-2 rounded-full transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-bg1)',
              borderRadius: '2501px',
              minWidth: '100px',
              textAlign: 'center',
            }}
          >
            {config.cta_label}
          </a>
        </div>
      </div>

      {/* Mobile / Tablet */}
      <div className="flex lg:hidden items-center justify-between px-6 py-5">
        <a href="#home">
          <Image src="/assets/logo.png" alt="TRINOVTECH" width={140} height={44} className="object-contain" priority />
        </a>
        <button
          suppressHydrationWarning
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="flex flex-col gap-[5px] p-2"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className="block w-6 h-0.5 rounded" style={{ backgroundColor: 'var(--color-text)' }} />
          ))}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 z-50 flex flex-col gap-4 px-6 py-6 shadow-lg"
          style={{ backgroundColor: 'var(--color-bg1)' }}
        >
          {config.nav_links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={closeMenu}
              className="capitalize font-medium text-xl"
              style={{ color: isActive(link.href) ? 'var(--color-accent)' : 'var(--color-text)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="font-bold text-lg px-8 py-3 rounded-full text-center"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-bg1)' }}
          >
            {config.cta_label}
          </a>
          <div className="pt-1">
            <NavThemeSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
