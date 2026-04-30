import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteConfig } from '@/lib/supabase';
import ProblemWeSolveContent from './ProblemWeSolveContent';

export const metadata = {
  title: 'Problem We Solve | TrinovTech',
  description: 'How TrinovTech eliminates development overhead, fragmented teams, and slow delivery — turning your technology challenges into competitive advantages.',
  keywords: ['Technology Challenges', 'Reduce Overhead', 'Faster Delivery', 'Scalable Solutions', 'TrinovTech'],
};

export default async function ProblemWeSolvePage() {
  const config = await getSiteConfig();
  return (
    <>
      <Navbar config={config} />
      <main className="pt-[68px] lg:pt-[78px]">
        <ProblemWeSolveContent />
      </main>
      <Footer />
    </>
  );
}
