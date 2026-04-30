import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteConfig } from '@/lib/supabase';
import UnifiedDigitalContent from './UnifiedDigitalContent';

export const metadata = {
  title: 'Unified Digital Engineering | TrinovTech',
  description: 'End-to-end unified digital platforms connecting web, mobile, APIs, cloud infrastructure, and data pipelines into one coherent, scalable system.',
  keywords: ['Unified Digital Platform', 'Full-Stack Engineering', 'API-First', 'Event-Driven', 'Platform Engineering', 'TrinovTech'],
};

export default async function UnifiedDigitalPage() {
  const config = await getSiteConfig();
  return (
    <>
      <Navbar config={config} />
      <main className="pt-[68px] lg:pt-[78px]">
        <UnifiedDigitalContent />
      </main>
      <Footer />
    </>
  );
}
