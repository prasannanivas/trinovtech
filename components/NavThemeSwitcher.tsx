'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { THEMES } from '@/lib/themes';
import type { SiteConfig } from '@/lib/supabase';

const STORAGE_KEY = 'trinovtech-theme';

/** Returns true when a hex colour is perceived as dark */
function isDark(hex: string): boolean {
  const c = (hex ?? '').replace('#', '');
  if (c.length < 6) return false;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

function applyThemeValues(values: Partial<SiteConfig>) {
  const root = document.documentElement;
  if (values.primary_color) root.style.setProperty('--color-primary', values.primary_color);
  if (values.accent_color)  root.style.setProperty('--color-accent',  values.accent_color);
  if (values.bg_color)      root.style.setProperty('--color-bg1',      values.bg_color);
  root.style.setProperty('--color-bg2', values.bg_color2 ?? '#FFFFFF');
  if (values.text_color)    root.style.setProperty('--color-text',     values.text_color);
  if (values.muted_color)   root.style.setProperty('--color-muted',    values.muted_color);
  // On dark backgrounds, brown body text is unreadable — use muted instead
  const bgHex = values.bg_color ?? '#ffffff';
  root.style.setProperty('--color-brown', isDark(bgHex) ? (values.muted_color ?? '#898989') : '#6D4C41');
  if (values.heading_font)  root.style.setProperty('--font-heading',   `'${values.heading_font}', sans-serif`);
  if (values.body_font)     root.style.setProperty('--font-body',      `'${values.body_font}', sans-serif`);

  if (values.glow_color) {
    root.style.setProperty('--glow-color', values.glow_color);
    root.setAttribute('data-theme', 'glow');
  } else {
    root.style.removeProperty('--glow-color');
    root.removeAttribute('data-theme');
  }

  // Dynamically load Google Fonts
  const fonts = [values.heading_font, values.body_font].filter(Boolean) as string[];
  const existing = document.getElementById('dynamic-fonts');
  if (existing) existing.remove();
  if (fonts.length) {
    const link = document.createElement('link');
    link.id = 'dynamic-fonts';
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${fonts
      .map((f) => `family=${encodeURIComponent(f)}:wght@400;500;600;700;800;900`)
      .join('&')}&display=swap`;
    document.head.appendChild(link);
  }
}

export default function NavThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('Trinovtech');
  const ref = useRef<HTMLDivElement>(null);

  // Restore saved theme on mount (runs after ThemeProvider, so overrides server defaults)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const theme = THEMES.find((t) => t.name === saved);
      if (theme) {
        applyThemeValues(theme.values);
        setActiveTheme(theme.name);
      }
    }
  }, []);

  // Close on outside click
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [handleOutsideClick]);

  function selectTheme(name: string, values: Partial<SiteConfig>) {
    applyThemeValues(values);
    setActiveTheme(name);
    localStorage.setItem(STORAGE_KEY, name);
    setOpen(false);
  }

  const standardThemes = THEMES.filter((t) => t.category === 'standard');
  const darkThemes     = THEMES.filter((t) => t.category === 'dark');
  const premiumThemes  = THEMES.filter((t) => t.category === 'premium');

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        suppressHydrationWarning
        onClick={() => setOpen((o) => !o)}
        title="Switch theme"
        className="flex items-center gap-2 px-3 py-2 rounded-full border transition-all hover:opacity-80"
        style={{ color: 'var(--color-text)', borderColor: 'var(--color-muted)', fontSize: 13 }}
      >
        {/* Palette icon */}
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5"  r="0.5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
          <circle cx="8.5"  cy="7.5"  r="0.5" fill="currentColor" />
          <circle cx="6.5"  cy="12.5" r="0.5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
        <span className="hidden lg:block font-medium" style={{ fontSize: 13 }}>{activeTheme}</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="hidden lg:block">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-80 rounded-2xl shadow-2xl border z-[200] overflow-hidden"
          style={{ backgroundColor: 'var(--color-bg1)', borderColor: 'rgba(128,128,128,0.25)' }}
        >
          {/* Standard */}
          <Section label="Standard">
            <div className="grid grid-cols-4 gap-2">
              {standardThemes.map((t) => (
                <ThumbButton key={t.name} theme={t} active={activeTheme === t.name} onSelect={selectTheme} />
              ))}
            </div>
          </Section>

          <Divider />

          {/* Dark */}
          <Section label="Dark">
            <div className="grid grid-cols-4 gap-2">
              {darkThemes.map((t) => (
                <ThumbButton key={t.name} theme={t} active={activeTheme === t.name} onSelect={selectTheme} />
              ))}
            </div>
          </Section>

          <Divider />

          {/* Premium Glow */}
          <Section label="✦ Premium Glow">
            <div className="flex flex-col gap-1.5">
              {premiumThemes.map((t) => (
                <PremiumRow key={t.name} theme={t} active={activeTheme === t.name} onSelect={selectTheme} />
              ))}
            </div>
          </Section>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-4 py-3">
      <p className="text-[10px] uppercase font-bold tracking-widest mb-2.5" style={{ color: 'var(--color-muted)' }}>
        {label}
      </p>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="border-t mx-4" style={{ borderColor: 'rgba(128,128,128,0.2)' }} />;
}

type ThemeItem = typeof THEMES[number];

function ThumbButton({ theme, active, onSelect }: { theme: ThemeItem; active: boolean; onSelect: (n: string, v: Partial<SiteConfig>) => void }) {
  return (
    <button
      suppressHydrationWarning
      onClick={() => onSelect(theme.name, theme.values)}
      className="flex flex-col items-center gap-1 p-1.5 rounded-xl transition-transform hover:scale-110"
      title={theme.name}
      style={active ? { outline: `2px solid ${theme.preview}`, outlineOffset: 1 } : {}}
    >
      <div className="w-9 h-9 rounded-full shadow" style={{ backgroundColor: theme.preview }} />
      <span className="text-[9px] font-medium text-center leading-tight w-full" style={{ color: 'var(--color-text)' }}>
        {theme.name}
      </span>
    </button>
  );
}

function PremiumRow({ theme, active, onSelect }: { theme: ThemeItem; active: boolean; onSelect: (n: string, v: Partial<SiteConfig>) => void }) {
  const bg = theme.values.bg_color ?? '#0D0D0D';
  const glow = theme.values.glow_color ?? theme.preview;
  return (
    <button
      suppressHydrationWarning
      onClick={() => onSelect(theme.name, theme.values)}
      className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all hover:opacity-90 w-full"
      style={{
        background: `linear-gradient(135deg, ${bg} 0%, color-mix(in srgb, ${glow} 15%, ${bg}) 100%)`,
        outline: active ? `1.5px solid ${glow}` : `1px solid ${bg}33`,
        outlineOffset: 0,
      }}
    >
      {/* Glow swatch */}
      <div
        className="w-8 h-8 rounded-full flex-shrink-0"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${theme.preview}, ${theme.values.accent_color ?? theme.preview}55)`,
          boxShadow: `0 0 10px ${glow}99`,
        }}
      />
      <div className="text-left">
        <p
          className="text-xs font-bold"
          style={{ color: theme.preview, textShadow: `0 0 8px ${glow}` }}
        >
          {theme.name}
        </p>
        <p className="text-[9px]" style={{ color: theme.values.muted_color ?? '#888' }}>
          Dark · Glow
        </p>
      </div>
      {active && (
        <div className="ml-auto w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: glow, boxShadow: `0 0 6px ${glow}` }} />
      )}
    </button>
  );
}
