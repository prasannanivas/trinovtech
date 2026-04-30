import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteConfig } from '@/lib/supabase';
import DataEngineeringContent from './DataEngineeringContent';

export const metadata = {
  title: 'Data Engineering & Analytics | TrinovTech',
  description: 'End-to-end data platforms — ETL/ELT pipelines, data warehousing, BI dashboards, ML/AI analytics, and data governance at scale.',
  keywords: ['Data Engineering', 'Data Analytics', 'ETL', 'Data Warehouse', 'BI', 'Machine Learning', 'TrinovTech'],
};

export default async function DataEngineeringPage() {
  const config = await getSiteConfig();
  return (
    <>
      <Navbar config={config} />
      <main className="pt-[68px] lg:pt-[78px]">
        <DataEngineeringContent />
      </main>
      <Footer />
    </>
  );
}
