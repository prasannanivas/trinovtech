import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteConfig } from '@/lib/supabase';
import EnterpriseSaasContent from './EnterpriseSaasContent';

export const metadata = {
  title: 'Enterprise & SaaS Solutions | TrinovTech',
  description: 'Cloud-native, multi-tenant SaaS platforms built for enterprise scale — microservices, RBAC, real-time analytics, and seamless integrations.',
  keywords: ['Enterprise SaaS', 'Cloud-Native', 'Multi-Tenancy', 'Microservices', 'Digital Transformation', 'TrinovTech'],
};

export default async function EnterpriseSaasPage() {
  const config = await getSiteConfig();
  return (
    <>
      <Navbar config={config} />
      <main className="pt-[68px] lg:pt-[78px]">
        <EnterpriseSaasContent />
      </main>
      <Footer />
    </>
  );
}
