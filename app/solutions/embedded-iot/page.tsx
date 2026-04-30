import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteConfig } from '@/lib/supabase';
import EmbeddedIoTContent from './EmbeddedIoTContent';

export const metadata = {
  title: 'Embedded Systems & IoT | TrinovTech',
  description: 'End-to-end embedded hardware and IoT solutions — from MCU selection and PCB design to firmware, wireless protocols, and cloud integration.',
  keywords: ['Embedded Systems', 'IoT', 'Firmware', 'RTOS', 'BLE', 'LoRaWAN', 'MQTT', 'TrinovTech'],
};

export default async function EmbeddedIoTPage() {
  const config = await getSiteConfig();
  return (
    <>
      <Navbar config={config} />
      <main className="pt-[68px] lg:pt-[78px]">
        <EmbeddedIoTContent />
      </main>
      <Footer />
    </>
  );
}
