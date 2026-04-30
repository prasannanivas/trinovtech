import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteConfig } from '@/lib/supabase';
import ProcessWeFollowContent from './ProcessWeFollowContent';

export const metadata = {
  title: 'Process We Follow | TrinovTech',
  description: 'TrinovTech\'s six-phase agile delivery process — Discover, Architect, Build, Test, Deploy, Support. Structured, transparent, and milestone-driven.',
  keywords: ['Agile Process', 'Software Delivery', 'Milestone-Driven', 'CI/CD', 'Quality Engineering', 'TrinovTech'],
};

export default async function ProcessWeFollowPage() {
  const config = await getSiteConfig();
  return (
    <>
      <Navbar config={config} />
      <main className="pt-[68px] lg:pt-[78px]">
        <ProcessWeFollowContent />
      </main>
      <Footer />
    </>
  );
}
