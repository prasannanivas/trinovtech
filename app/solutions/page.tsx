import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteConfig } from '@/lib/supabase';

// Each solution section (alternating text-left / image-left layout)
const SOLUTIONS = [
  {
    title: 'Enterprise & SaaS Solutions',
    description:
      'We build Enterprise and SaaS solutions that are scalable, secure, and easy to integrate—helping businesses operate efficiently and grow with confidence.',
    image: '/assets/sol-enterprise.png',
    reverse: false,
  },
  {
    title: 'Embedded Systems & IoT',
    description:
      'We deliver end-to-end embedded and IoT solutions—from hardware to software—enabling all peripherals with reliable, scalable performance.',
    image: '/assets/sol-embedded.png',
    reverse: true,
  },
  {
    title: 'System Integration & Deployment',
    description:
      'We connect IoT devices to backend systems using MQTT, HTTP, WebSockets, and APIs—enabling real-time data, analytics, and seamless integration.',
    image: '/assets/sol-devops.png',
    reverse: false,
  },
  {
    title: 'Unified Digital Engineering',
    description:
      'One integrated solution combining data, cloud, and applications for scalable and seamless performance.',
    image: '/assets/sol-data.png',
    reverse: true,
  },
];

export default async function SolutionsPage() {
  const config = await getSiteConfig();

  return (
    <>
      <Navbar config={config} />

      {/* Page Hero */}
      <section
        className="w-full flex flex-col items-center justify-center text-center"
        style={{
          backgroundColor: 'var(--color-bg1)',
          minHeight: 'clamp(160px, 22vw, 417px)',
          padding: 'clamp(2rem, 5vw, 80px) clamp(1.5rem, 8vw, 160px)',
          fontFamily: 'var(--font-heading)',
        }}
      >
        <p
          className="font-black leading-normal"
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 48px)',
            color: 'var(--color-text)',
            maxWidth: '1244px',
          }}
        >
          Our solutions are designed to simplify complexity and drive meaningful business outcomes.
        </p>
      </section>

      {/* Solution Sections */}
      {SOLUTIONS.map((sol, idx) => (
        <section
          key={idx}
          className="w-full overflow-hidden"
          style={{
            backgroundColor: idx % 2 === 0 ? 'rgba(255,255,255,0.9)' : 'var(--color-bg1)',
            minHeight: 'clamp(400px, 55vw, 980px)',
          }}
        >
          <div
            className={`mx-auto flex flex-col ${sol.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-between gap-10 lg:gap-20`}
            style={{
              maxWidth: '1720px',
              padding: 'clamp(3rem, 6vw, 100px) clamp(1.5rem, 5vw, 80px)',
            }}
          >
            {/* Text */}
            <div
              className="flex flex-col gap-8 shrink-0 w-full lg:w-[40%]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <h2
                className="font-bold leading-tight capitalize"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 56px)',
                  color: 'var(--color-text)',
                }}
              >
                {sol.title}
              </h2>
              <p
                className="font-bold leading-relaxed capitalize"
                style={{
                  fontSize: 'clamp(1rem, 1.5vw, 24px)',
                  color: 'var(--color-brown)',
                  letterSpacing: '1px',
                }}
              >
                {sol.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center font-normal text-lg transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-bg1)',
                  width: '155px',
                  height: '49px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Know More
              </a>
            </div>

            {/* Image */}
            <div
              className="relative shrink-0 w-full lg:w-[52%] rounded-2xl overflow-hidden"
              style={{ minHeight: 'clamp(250px, 40vw, 700px)' }}
            >
              <Image
                src={sol.image}
                alt={sol.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </>
  );
}
