'use client';

import { useEffect } from 'react';
import { SiteConfig } from '@/lib/supabase';

/** Returns true when a hex colour is perceived as dark */
function isDark(hex: string): boolean {
  const c = hex.replace('#', '');
  if (c.length < 6) return false;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

export default function ThemeProvider({ config }: { config: SiteConfig }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', config.primary_color);
    root.style.setProperty('--color-accent', config.accent_color);
    root.style.setProperty('--color-bg1', config.bg_color);
    root.style.setProperty('--color-bg2', config.bg_color2 ?? '#FFFFFF');
    root.style.setProperty('--color-text', config.text_color);
    root.style.setProperty('--color-muted', config.muted_color);
    // On dark backgrounds, brown body text is unreadable — use muted instead
    root.style.setProperty('--color-brown', isDark(config.bg_color) ? config.muted_color : '#6D4C41');
    root.style.setProperty('--font-heading', `'${config.heading_font}', sans-serif`);
    root.style.setProperty('--font-body', `'${config.body_font}', sans-serif`);

    // Glow theme support
    if (config.glow_color) {
      root.style.setProperty('--glow-color', config.glow_color);
      root.setAttribute('data-theme', 'glow');
    } else {
      root.style.removeProperty('--glow-color');
      root.removeAttribute('data-theme');
    }

    // Load Google Fonts dynamically
    const fonts = [config.heading_font, config.body_font].filter(Boolean);
    const existing = document.getElementById('dynamic-fonts');
    if (existing) existing.remove();
    const link = document.createElement('link');
    link.id = 'dynamic-fonts';
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${fonts.map(f => `family=${encodeURIComponent(f)}:wght@400;500;600;700;800;900`).join('&')}&display=swap`;
    document.head.appendChild(link);
  }, [config]);

  return null;
}
