import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteConfig } from '@/lib/supabase';
import WhoWeAreContent from './WhoWeAreContent';

export const metadata = {
  title: 'Who We Are | TrinovTech — End-to-End Technology Partner',
  description:
    'Meet TrinovTech — a battle-tested team of engineers and consultants delivering integrated technology solutions from Silicon to Software across embedded, IoT, cloud-native, and full-stack platforms.',
  keywords: [
    'TrinovTech',
    'End-to-End Technology Partner',
    'Silicon to Software',
    'Embedded Systems',
    'IoT Consulting',
    'Cloud Native',
    'Digital Transformation',
    'Agile Delivery',
  ],
};

export default async function WhoWeArePage() {
  const config = await getSiteConfig();

  return (
    <>
      <Navbar config={config} />
      <main className="pt-[68px] lg:pt-[78px]">
        <WhoWeAreContent />
      </main>
      <Footer />
    </>
  );
}
