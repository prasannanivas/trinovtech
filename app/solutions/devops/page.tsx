import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteConfig } from '@/lib/supabase';
import DevOpsContent from './DevOpsContent';

export const metadata = {
  title: 'DevOps & Automations | TrinovTech',
  description: 'CI/CD pipelines, Kubernetes, GitOps, IaC, and full-stack observability — ship faster and more reliably with TrinovTech DevOps engineering.',
  keywords: ['DevOps', 'CI/CD', 'Kubernetes', 'GitOps', 'Terraform', 'Automation', 'TrinovTech'],
};

export default async function DevOpsPage() {
  const config = await getSiteConfig();
  return (
    <>
      <Navbar config={config} />
      <main className="pt-[68px] lg:pt-[78px]">
        <DevOpsContent />
      </main>
      <Footer />
    </>
  );
}
