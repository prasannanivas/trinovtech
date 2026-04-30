import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteConfig } from '@/lib/supabase';
import WhatWeDoContent from './WhatWeDoContent';

export const metadata = {
  title: 'What We Do | TrinovTech',
  description: 'TrinovTech delivers end-to-end technology — embedded systems, IoT, cloud-native platforms, and full-stack applications from concept through to production.',
  keywords: ['Technology Delivery', 'Embedded Systems', 'IoT', 'Cloud-Native', 'Full-Stack', 'TrinovTech'],
};

export default async function WhatWeDoPage() {
  const config = await getSiteConfig();
  return (
    <>
      <Navbar config={config} />
      <main className="pt-[68px] lg:pt-[78px]">
        <WhatWeDoContent />
      </main>
      <Footer />
    </>
  );
}
