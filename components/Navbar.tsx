'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { SiteConfig } from '@/lib/supabase';

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

        {/* WhatsApp + CTA */}
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#25D366' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.553 4.107 1.522 5.837L.057 23.428a.75.75 0 0 0 .918.918l5.606-1.461A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.694 9.694 0 0 1-4.953-1.358l-.355-.212-3.675.957.982-3.589-.232-.369A9.699 9.699 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
          </a>
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
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-medium text-base"
            style={{ color: '#25D366' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.553 4.107 1.522 5.837L.057 23.428a.75.75 0 0 0 .918.918l5.606-1.461A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.694 9.694 0 0 1-4.953-1.358l-.355-.212-3.675.957.982-3.589-.232-.369A9.699 9.699 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>
      )}
    </nav>
  );
}
