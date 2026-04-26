import type { SiteConfig } from './supabase';

export type ThemePreset = {
  name: string;
  category: 'standard' | 'dark' | 'premium';
  preview: string; // swatch hex colour
  values: Partial<SiteConfig>;
};

export const THEMES: ThemePreset[] = [
  // ── Standard Light ──────────────────────────────────────────────────────────
  {
    name: 'Trinovtech',
    category: 'standard',
    preview: '#C62828',
    values: {
      primary_color: '#C62828', accent_color: '#FF7A00',
      bg_color: '#F1F5F9', bg_color2: '#FFFFFF', text_color: '#212121', muted_color: '#898989',
      heading_font: 'Inter', body_font: 'Poppins',
    },
  },
  {
    name: 'Midnight Blue',
    category: 'standard',
    preview: '#1A237E',
    values: {
      primary_color: '#1A237E', accent_color: '#00BCD4',
      bg_color: '#EEF2FF', bg_color2: '#FFFFFF', text_color: '#0D1B4B', muted_color: '#7986CB',
      heading_font: 'Montserrat', body_font: 'Open Sans',
    },
  },
  {
    name: 'Forest Green',
    category: 'standard',
    preview: '#1B5E20',
    values: {
      primary_color: '#1B5E20', accent_color: '#76FF03',
      bg_color: '#F1F8E9', bg_color2: '#FFFFFF', text_color: '#1B2E1B', muted_color: '#66BB6A',
      heading_font: 'Raleway', body_font: 'Lato',
    },
  },
  {
    name: 'Royal Purple',
    category: 'standard',
    preview: '#4A148C',
    values: {
      primary_color: '#4A148C', accent_color: '#FFD600',
      bg_color: '#F3E5F5', bg_color2: '#FFFFFF', text_color: '#1A0030', muted_color: '#AB47BC',
      heading_font: 'Playfair Display', body_font: 'Source Sans 3',
    },
  },
  {
    name: 'Ocean Teal',
    category: 'standard',
    preview: '#00695C',
    values: {
      primary_color: '#00695C', accent_color: '#FF5252',
      bg_color: '#E0F2F1', bg_color2: '#FFFFFF', text_color: '#00251A', muted_color: '#4DB6AC',
      heading_font: 'Nunito', body_font: 'Roboto',
    },
  },
  {
    name: 'Sunset Gold',
    category: 'standard',
    preview: '#E65100',
    values: {
      primary_color: '#E65100', accent_color: '#FFC107',
      bg_color: '#FFF8F0', bg_color2: '#FFFFFF', text_color: '#3E1A00', muted_color: '#FFAB40',
      heading_font: 'Raleway', body_font: 'Poppins',
    },
  },
  {
    name: 'Rose Gold',
    category: 'standard',
    preview: '#880E4F',
    values: {
      primary_color: '#880E4F', accent_color: '#F06292',
      bg_color: '#FDF6F6', bg_color2: '#FFFFFF', text_color: '#2D0018', muted_color: '#CE93D8',
      heading_font: 'Playfair Display', body_font: 'Lato',
    },
  },
  {
    name: 'Monochrome',
    category: 'standard',
    preview: '#111111',
    values: {
      primary_color: '#111111', accent_color: '#555555',
      bg_color: '#F9F9F9', bg_color2: '#FFFFFF', text_color: '#111111', muted_color: '#999999',
      heading_font: 'Inter', body_font: 'Inter',
    },
  },
  // ── Dark ────────────────────────────────────────────────────────────────────
  {
    name: 'Carbon Dark',
    category: 'dark',
    preview: '#2979FF',
    values: {
      primary_color: '#2979FF', accent_color: '#00E5FF',
      bg_color: '#1A1A2E', bg_color2: '#16213E', text_color: '#E8EAF6', muted_color: '#546E7A',
      heading_font: 'Montserrat', body_font: 'Inter',
    },
  },
  {
    name: 'Neon Tech',
    category: 'dark',
    preview: '#00FF41',
    values: {
      primary_color: '#00FF41', accent_color: '#BF00FF',
      bg_color: '#0A0A0A', bg_color2: '#111111', text_color: '#E0FFE8', muted_color: '#444444',
      heading_font: 'Montserrat', body_font: 'Source Sans 3',
    },
  },
  // ── Premium Dark Glow ───────────────────────────────────────────────────────
  {
    name: 'Violet Glow',
    category: 'premium',
    preview: '#8B5CF6',
    values: {
      primary_color: '#8B5CF6', accent_color: '#C084FC',
      bg_color: '#07050F', bg_color2: '#0E0A1A', text_color: '#EDE9FE', muted_color: '#A78BCC',
      heading_font: 'Montserrat', body_font: 'Inter',
      glow_color: '#8B5CF6',
    },
  },
  {
    name: 'Solar Flare',
    category: 'premium',
    preview: '#FF6B00',
    values: {
      primary_color: '#FF6B00', accent_color: '#FFD700',
      bg_color: '#0A0500', bg_color2: '#140A00', text_color: '#FFF3E0', muted_color: '#D4956A',
      heading_font: 'Raleway', body_font: 'Poppins',
      glow_color: '#FF6B00',
    },
  },
  {
    name: 'Neon Purple',
    category: 'premium',
    preview: '#BF00FF',
    values: {
      primary_color: '#BF00FF', accent_color: '#FF00AA',
      bg_color: '#050008', bg_color2: '#0A0012', text_color: '#F5E6FF', muted_color: '#C490E0',
      heading_font: 'Playfair Display', body_font: 'Lato',
      glow_color: '#BF00FF',
    },
  },
  {
    name: 'Amber Ember',
    category: 'premium',
    preview: '#FFAB00',
    values: {
      primary_color: '#FFAB00', accent_color: '#FF6D00',
      bg_color: '#080400', bg_color2: '#110800', text_color: '#FFF8E1', muted_color: '#C4A050',
      heading_font: 'Playfair Display', body_font: 'Source Sans 3',
      glow_color: '#FFAB00',
    },
  },
  {
    name: 'Arctic Aurora',
    category: 'premium',
    preview: '#00FFCC',
    values: {
      primary_color: '#00FFCC', accent_color: '#00B4FF',
      bg_color: '#020B12', bg_color2: '#051520', text_color: '#E0FFFA', muted_color: '#4EC9BA',
      heading_font: 'Nunito', body_font: 'Inter',
      glow_color: '#00FFCC',
    },
  },
  {
    name: 'Cyber Crimson',
    category: 'premium',
    preview: '#FF1744',
    values: {
      primary_color: '#FF1744', accent_color: '#FF6E40',
      bg_color: '#080608', bg_color2: '#100810', text_color: '#FFE8E8', muted_color: '#D46070',
      heading_font: 'Montserrat', body_font: 'Source Sans 3',
      glow_color: '#FF1744',
    },
  },
];
