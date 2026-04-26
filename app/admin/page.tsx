'use client';

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, defaultConfig, SiteConfig } from '@/lib/supabase';
import { THEMES } from '@/lib/themes';

const FONT_GROUPS = [
  {
    group: 'Modern Sans',
    fonts: [
      'Inter', 'Poppins', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Nunito',
      'DM Sans', 'Outfit', 'Plus Jakarta Sans', 'Figtree', 'Jost', 'Urbanist',
      'Lexend', 'Mulish', 'Quicksand', 'Karla', 'Work Sans', 'Barlow', 'Raleway',
      'Source Sans 3',
    ],
  },
  {
    group: 'Elegant Serif',
    fonts: [
      'Playfair Display', 'Merriweather', 'Lora', 'EB Garamond',
      'Cormorant Garamond', 'DM Serif Display', 'Fraunces', 'Libre Baskerville',
    ],
  },
  {
    group: 'Display & Bold',
    fonts: [
      'Bebas Neue', 'Syne', 'Space Grotesk', 'Josefin Sans', 'Righteous',
      'Comfortaa', 'Cinzel', 'Teko', 'Anton', 'Black Han Sans', 'Russo One',
    ],
  },
  {
    group: 'Handwriting & Script',
    fonts: [
      'Pacifico', 'Lobster', 'Dancing Script', 'Sacramento',
      'Great Vibes', 'Satisfy', 'Caveat', 'Kalam',
    ],
  },
  {
    group: 'Monospace',
    fonts: [
      'Space Mono', 'JetBrains Mono', 'Roboto Mono',
      'Fira Code', 'IBM Plex Mono', 'Source Code Pro',
    ],
  },
];

const ALL_FONTS = FONT_GROUPS.flatMap((g) => g.fonts);

const ANIMATIONS = [
  { value: 'none',       label: 'None',        preview: 'Static text' },
  { value: 'shimmer',    label: '✨ Shimmer',   preview: 'Gradient sweep' },
  { value: 'glow-pulse', label: '💡 Glow Pulse', preview: 'Pulsing glow' },
  { value: 'typewriter', label: '⌨ Typewriter', preview: 'Types in' },
  { value: 'fade-up',    label: '⬆ Fade Up',   preview: 'Fades from below' },
  { value: 'slide-in',   label: '➡ Slide In',  preview: 'Slides from left' },
  { value: 'bounce-in',  label: '🎯 Bounce In', preview: 'Bounces in' },
];

export default function AdminPage() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState('');

  // Simple admin password gate (replace with Supabase Auth in production)
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'trinovtech2024';

  // Load all fonts for preview in admin
  useEffect(() => {
    const existing = document.getElementById('admin-font-preview');
    if (existing) return;
    const link = document.createElement('link');
    link.id = 'admin-font-preview';
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${ALL_FONTS.map(
      (f) => `family=${encodeURIComponent(f)}:wght@400;700`
    ).join('&')}&display=swap`;
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    loadConfig();
  }, [authenticated]);

  async function loadConfig() {
    if (!isSupabaseConfigured) return;
    try {
      const { data } = await supabase
        .from('site_config')
        .select('*')
        .order('id', { ascending: false })
        .limit(1)
        .single();
      if (data) setConfig({ ...defaultConfig, ...data });
    } catch {
      // Use defaults if table doesn't exist yet
    }
  }

  async function saveConfig() {
    if (!isSupabaseConfigured) {
      setMessage('⚠ Supabase is not configured. Add your keys to .env.local first.');
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const { error } = await supabase
        .from('site_config')
        .upsert({ ...config, id: 1, updated_at: new Date().toISOString() });
      setMessage(error ? `Error: ${error.message}` : '✓ Saved successfully!');
    } catch (e) {
      setMessage('Failed to save. Check Supabase connection.');
    }
    setSaving(false);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      setPwError('Incorrect password.');
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-10 rounded-xl shadow-lg flex flex-col gap-5 w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold text-center" style={{ color: '#C62828' }}>
            Admin Panel
          </h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md px-4 py-2 text-base outline-none focus:ring-2 focus:ring-red-400"
          />
          {pwError && <p className="text-red-600 text-sm">{pwError}</p>}
          <button
            type="submit"
            className="bg-red-700 text-white font-bold py-2 rounded-full hover:opacity-90"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold" style={{ color: '#C62828' }}>
            TRINOVTECH Admin
          </h1>
          <a href="/" className="text-sm underline text-gray-500" target="_blank">
            View Site ↗
          </a>
        </div>

        {/* Themes */}
        <Card title="Themes — One-Click Presets">
          {(['standard', 'dark', 'premium'] as const).map((cat) => {
            const group = THEMES.filter((t) => t.category === cat);
            if (!group.length) return null;
            return (
              <div key={cat} className="mb-5">
                <p className="text-[10px] uppercase font-bold tracking-widest mb-3 flex items-center gap-1">
                  {cat === 'premium' && <span style={{ color: '#FFD700' }}>✦</span>}
                  <span className="text-gray-400">{cat === 'premium' ? 'Premium Glow' : cat === 'dark' ? 'Dark' : 'Standard'}</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {group.map((theme) => {
                    const active =
                      config.primary_color === theme.values.primary_color &&
                      config.heading_font === theme.values.heading_font;
                    const glow = theme.values.glow_color;
                    return (
                      <button
                        key={theme.name}
                        onClick={() => setConfig((prev) => ({ ...prev, ...theme.values }))}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all hover:scale-105"
                        style={{
                          borderColor: active ? theme.preview : '#E5E7EB',
                          background: glow
                            ? `linear-gradient(135deg, ${theme.values.bg_color ?? '#0D0D0D'}, ${theme.preview}22)`
                            : active ? theme.preview + '18' : '#FAFAFA',
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-full shadow"
                          style={{
                            backgroundColor: theme.preview,
                            boxShadow: glow ? `0 0 10px ${glow}88` : undefined,
                          }}
                        />
                        <span
                          className="text-xs font-semibold text-center leading-tight"
                          style={{
                            color: glow ? theme.preview : '#374151',
                            textShadow: glow ? `0 0 6px ${glow}` : undefined,
                          }}
                        >
                          {theme.name}
                        </span>
                        {active && (
                          <span className="text-[10px] font-bold" style={{ color: theme.preview }}>
                            Active
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <p className="text-xs text-gray-400 mt-1">
            Click a theme to preview, then hit <strong>Save Changes</strong> to persist.
          </p>
        </Card>

        {/* Colors */}
        <Card title="Brand Colors">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: 'Primary (Red)', key: 'primary_color' },
              { label: 'Accent (Orange)', key: 'accent_color' },
              { label: 'Background', key: 'bg_color' },
              { label: 'Text', key: 'text_color' },
              { label: 'Muted', key: 'muted_color' },
            ].map(({ label, key }) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">{label}</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={(config as unknown as Record<string, string>)[key]}
                    onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer border"
                  />
                  <input
                    type="text"
                    value={(config as unknown as Record<string, string>)[key]}
                    onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                    className="border rounded px-3 py-1 text-sm w-28"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Typography */}
        <Card title="Typography — Google Fonts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: 'Heading Font', key: 'heading_font' },
              { label: 'Body Font', key: 'body_font' },
            ].map(({ label, key }) => {
              const current = (config as unknown as Record<string, string>)[key];
              return (
                <div key={key} className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-600">{label}</label>
                  <div
                    className="text-base font-bold px-3 py-2 bg-gray-50 border rounded-lg"
                    style={{ fontFamily: `'${current}', sans-serif` }}
                  >
                    {current} — The quick brown fox
                  </div>
                  <div className="border rounded-lg p-3 max-h-64 overflow-y-auto flex flex-col gap-4">
                    {FONT_GROUPS.map(({ group, fonts }) => (
                      <div key={group}>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">{group}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {fonts.map((font) => (
                            <button
                              key={font}
                              type="button"
                              onClick={() => setConfig({ ...config, [key]: font })}
                              className="px-2.5 py-1 rounded-full border text-xs transition-all hover:scale-105"
                              style={{
                                fontFamily: `'${font}', sans-serif`,
                                borderColor: current === font ? '#C62828' : '#E5E7EB',
                                backgroundColor: current === font ? '#FEF2F2' : '#FAFAFA',
                                color: current === font ? '#C62828' : '#374151',
                                fontWeight: current === font ? 700 : 400,
                              }}
                            >
                              {font}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Hero Text Animation */}
        <Card title="Hero Highlight Animation">
          <p className="text-xs text-gray-400 mb-3">Applies to the red highlighted word(s) in your hero heading.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {ANIMATIONS.map(({ value, label, preview }) => {
              const active = (config.hero_animation ?? 'none') === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setConfig({ ...config, hero_animation: value })}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all hover:scale-105 text-center"
                  style={{
                    borderColor: active ? '#C62828' : '#E5E7EB',
                    backgroundColor: active ? '#FEF2F2' : '#FAFAFA',
                  }}
                >
                  <span
                    className="text-sm font-bold"
                    style={{ color: active ? '#C62828' : '#374151' }}
                  >
                    {label}
                  </span>
                  <span className="text-[10px] text-gray-400">{preview}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Hero Content */}
        <Card title="Hero Section">
          <div className="flex flex-col gap-4">
            <Field label="Title — Start" value={config.hero_title_start} onChange={(v) => setConfig({ ...config, hero_title_start: v })} />
            <Field label="Title — Highlight (red)" value={config.hero_title_highlight} onChange={(v) => setConfig({ ...config, hero_title_highlight: v })} />
            <Field label="Title — End" value={config.hero_title_end} onChange={(v) => setConfig({ ...config, hero_title_end: v })} />
            <Field label="Description" value={config.hero_description} onChange={(v) => setConfig({ ...config, hero_description: v })} textarea />
            <Field label="CTA Button Label" value={config.cta_label} onChange={(v) => setConfig({ ...config, cta_label: v })} />
          </div>
        </Card>

        {/* Nav Links */}
        <Card title="Navigation Links">
          <div className="flex flex-col gap-3">
            {config.nav_links.map((link, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => {
                    const updated = [...config.nav_links];
                    updated[i] = { ...updated[i], label: e.target.value };
                    setConfig({ ...config, nav_links: updated });
                  }}
                  placeholder="Label"
                  className="border rounded px-3 py-1.5 text-sm flex-1"
                />
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => {
                    const updated = [...config.nav_links];
                    updated[i] = { ...updated[i], href: e.target.value };
                    setConfig({ ...config, nav_links: updated });
                  }}
                  placeholder="Href (#section)"
                  className="border rounded px-3 py-1.5 text-sm flex-1"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Solutions */}
        <Card title="Solutions">
          <div className="flex flex-col gap-3">
            {config.solutions.map((s, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={s.title}
                  onChange={(e) => {
                    const updated = [...config.solutions];
                    updated[i] = { ...updated[i], title: e.target.value };
                    setConfig({ ...config, solutions: updated });
                  }}
                  placeholder="Solution Title"
                  className="border rounded px-3 py-1.5 text-sm flex-1"
                />
                <input
                  type="text"
                  value={s.image_url}
                  onChange={(e) => {
                    const updated = [...config.solutions];
                    updated[i] = { ...updated[i], image_url: e.target.value };
                    setConfig({ ...config, solutions: updated });
                  }}
                  placeholder="Image URL"
                  className="border rounded px-3 py-1.5 text-sm flex-1"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* We Ensure */}
        <Card title="We Ensure Items">
          <div className="flex flex-col gap-3">
            {config.ensures.map((item, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...config.ensures];
                    updated[i] = { ...updated[i], title: e.target.value };
                    setConfig({ ...config, ensures: updated });
                  }}
                  placeholder="Title"
                  className="border rounded px-3 py-1.5 text-sm flex-1"
                />
                <input
                  type="text"
                  value={item.subtitle}
                  onChange={(e) => {
                    const updated = [...config.ensures];
                    updated[i] = { ...updated[i], subtitle: e.target.value };
                    setConfig({ ...config, ensures: updated });
                  }}
                  placeholder="Subtitle"
                  className="border rounded px-3 py-1.5 text-sm flex-1"
                />
                <input
                  type="text"
                  value={item.icon_url}
                  onChange={(e) => {
                    const updated = [...config.ensures];
                    updated[i] = { ...updated[i], icon_url: e.target.value };
                    setConfig({ ...config, ensures: updated });
                  }}
                  placeholder="Icon URL"
                  className="border rounded px-3 py-1.5 text-sm flex-1"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button
            onClick={saveConfig}
            disabled={saving}
            className="font-bold text-lg px-10 py-3 rounded-full hover:opacity-90 disabled:opacity-50 text-white"
            style={{ backgroundColor: '#C62828' }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {message && (
            <p className={message.startsWith('✓') ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-5">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label, value, onChange, textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="border rounded px-3 py-2 text-sm resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        />
      )}
    </div>
  );
}
