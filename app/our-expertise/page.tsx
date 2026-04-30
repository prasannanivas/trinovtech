import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteConfig } from '@/lib/supabase';
import OurExpertiseContent from './OurExpertiseContent';

export const metadata = {
  title: 'Our Expertise | TrinovTech',
  description: 'Deep multi-domain engineering expertise across Embedded Systems, IoT, Cloud-Native, Full-Stack, Automotive, and Data & AI — all under one roof.',
  keywords: ['Engineering Expertise', 'Embedded Systems', 'IoT', 'Cloud', 'Automotive', 'Data Engineering', 'TrinovTech'],
};

export default async function OurExpertisePage() {
  const config = await getSiteConfig();
  return (
    <>
      <Navbar config={config} />
      <main className="pt-[68px] lg:pt-[78px]">
        <OurExpertiseContent />
      </main>
      <Footer />
    </>
  );
}
