import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Only create the real client if credentials are present, otherwise use a no-op placeholder
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder');

export type SiteConfig = {
  id?: number;
  primary_color: string;
  accent_color: string;
  bg_color: string;
  text_color: string;
  muted_color: string;
  heading_font: string;
  body_font: string;
  hero_title_start: string;
  hero_title_highlight: string;
  hero_title_end: string;
  hero_description: string;
  cta_label: string;
  glow_color?: string;
  bg_color2?: string;
  hero_animation?: string;
  nav_links: { label: string; href: string }[];
  solutions: { title: string; image_url: string }[];
  ensures: { icon_url: string; title: string; subtitle: string }[];
  updated_at?: string;
};

export const defaultConfig: SiteConfig = {
  primary_color: '#C62828',
  accent_color: '#FF7A00',
  bg_color: '#F1F5F9',
  text_color: '#212121',
  muted_color: '#898989',
  heading_font: 'Inter',
  body_font: 'Poppins',
  hero_title_start: 'End-to-End',
  hero_title_highlight: 'Technology Consulting',
  hero_title_end: 'from Silicon to Software',
  hero_animation: 'none',
  hero_description:
    'We provide end-to-end technical consulting services, taking full ownership of system design, development, integration, and deployment across embedded systems, IoT, cloud platforms, and data-driven applications. Our focus is to deliver reliable, scalable, and production-ready solutions tailored to real-world environments.',
  cta_label: 'Contact Us',
  nav_links: [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Services', href: '#services' },
    { label: 'Contact Us', href: '#contact' },
  ],
  solutions: [
    { title: 'Enterprise & SaaS Solutions', image_url: '/assets/sol-enterprise.png' },
    { title: 'Embedded Systems and IoT', image_url: '/assets/sol-embedded.png' },
    { title: 'DevOps & Automations', image_url: '/assets/sol-devops.png' },
    { title: 'Enterprise & SaaS Solutions', image_url: '/assets/sol-enterprise2.png' },
    { title: 'Data Engineering & Analysis', image_url: '/assets/sol-data.png' },
  ],
  ensures: [
    { icon_url: '/assets/icon-reliable.png', title: 'Reliable Delivery', subtitle: 'On time, every time' },
    { icon_url: '/assets/icon-client.png', title: 'Client-Centric Approach', subtitle: 'Built around your goals' },
    { icon_url: '/assets/icon-scalable.png', title: 'Scalable Solutions', subtitle: 'Ready for real-world deployment' },
    { icon_url: '/assets/icon-seamless.png', title: 'Seamless Execution', subtitle: 'From idea to delivery' },
    { icon_url: '/assets/icon-quality.png', title: 'Quality Assured', subtitle: 'Tested, validated, delivered' },
  ],
};

export async function getSiteConfig(): Promise<SiteConfig> {
  if (!isSupabaseConfigured) return defaultConfig;
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('*')
      .order('id', { ascending: false })
      .limit(1)
      .single();
    if (error || !data) return defaultConfig;
    return { ...defaultConfig, ...data };
  } catch {
    return defaultConfig;
  }
}
