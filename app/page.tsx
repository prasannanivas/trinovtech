import { getSiteConfig } from '@/lib/supabase';
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Solutions from '@/components/Solutions';
import WeEnsure from '@/components/WeEnsure';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import SolutionsSection from '@/components/SolutionsSection';
import ServicesSection from '@/components/ServicesSection';

// Always fetch fresh from Supabase — never serve a stale cached page
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const config = await getSiteConfig();

  // Build Google Fonts URL server-side so fonts load with the HTML (not after JS hydrates)
  const fontFamilies = [...new Set([config.heading_font, config.body_font].filter(Boolean))];
  const googleFontsUrl =
    `https://fonts.googleapis.com/css2?` +
    fontFamilies.map((f) => `family=${encodeURIComponent(f)}:wght@400;500;600;700;800;900`).join('&') +
    `&display=swap`;

  return (
    <>
      {/* Preload fonts from server — ensures font is applied before first paint */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={googleFontsUrl} />
      <ThemeProvider config={config} />
      <Navbar config={config} />
      {/* pt-[144px] offsets the fixed navbar height on desktop */}
      <main className="pt-[68px] lg:pt-[78px]">
        <section id="home" className="scroll-mt-24">
          <Hero config={config} />
          <Solutions config={config} />
          <WeEnsure config={config} />
        </section>
        <AboutSection />
        <SolutionsSection />
        <ServicesSection />
        <div id="contact">
          <Contact config={config} />
        </div>
      </main>
      <Footer />
    </>
  );
}
