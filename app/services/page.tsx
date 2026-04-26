import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteConfig } from '@/lib/supabase';

// All 8 service cards from Figma
const SERVICES = [
  {
    title: 'Solution Consulting',
    description:
      'We work closely with you to understand your needs and guide you with reliable, scalable solutions you can trust.',
    reverse: false,
    bg: '#F1F5F9',
  },
  {
    title: 'Mobile Application Development',
    description:
      'Secure, scalable apps—built as per your requirements with seamless performance.',
    reverse: true,
    bg: 'rgba(255,255,255,0.9)',
  },
  {
    title: 'Web Application Development',
    description:
      'Robust, high-performance backend solutions—designed for reliability, security, and long-term trust.',
    reverse: false,
    bg: '#F1F5F9',
  },
  {
    title: 'Embedded Hardware Design',
    description:
      'We deliver reliable embedded hardware solutions—built to your requirements with quality and performance you can trust.',
    reverse: true,
    bg: 'rgba(255,255,255,0.9)',
  },
  {
    title: 'Firmware Development',
    description:
      'We build reliable firmware—optimized for performance, stability, and seamless integration.',
    reverse: false,
    bg: '#F1F5F9',
  },
  {
    title: 'Linux Developments',
    description:
      'Reliable Linux, custom OS, and RTOS solutions—built for performance, stability, and seamless integration.',
    reverse: true,
    bg: 'rgba(255,255,255,0.9)',
  },
  {
    title: 'Cloud Server Maintenance',
    description:
      'Secure, scalable cloud solutions on AWS, Azure, and Google Cloud—managed for reliability and performance.',
    reverse: false,
    bg: '#F1F5F9',
  },
  {
    title: 'Data Analytics & Dashboards',
    description:
      'Transform data into insights with reliable analytics and intuitive dashboards you can trust.',
    reverse: true,
    bg: 'rgba(255,255,255,0.9)',
  },
];

// Color bands for image placeholder boxes
const ACCENT_COLORS = [
  '#C62828', '#FF7A00', '#6D4C41', '#212121',
  '#C62828', '#FF7A00', '#6D4C41', '#212121',
];

export default async function ServicesPage() {
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
          From concept to deployment, we provide technology services that perform with confidence.
        </p>
      </section>

      {/* Services Sections */}
      {SERVICES.map((svc, idx) => (
        <section
          key={idx}
          className="w-full overflow-hidden"
          style={{ backgroundColor: svc.bg, minHeight: 'clamp(300px, 40vw, 636px)' }}
        >
          <div
            className={`mx-auto flex flex-col ${svc.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-between gap-10 lg:gap-20`}
            style={{
              maxWidth: '1720px',
              padding: 'clamp(2.5rem, 5vw, 80px) clamp(1.5rem, 5vw, 80px)',
            }}
          >
            {/* Text */}
            <div
              className="flex flex-col gap-6 shrink-0 w-full lg:w-[44%]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <h2
                className="font-bold leading-tight capitalize"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 56px)',
                  color: 'var(--color-text)',
                }}
              >
                {svc.title}
              </h2>
              <p
                className="font-medium leading-relaxed capitalize"
                style={{
                  fontSize: 'clamp(1rem, 1.4vw, 22px)',
                  color: 'var(--color-brown)',
                  letterSpacing: '0.8px',
                }}
              >
                {svc.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-80"
                style={{
                  fontSize: 'clamp(1rem, 1.2vw, 20px)',
                  color: 'var(--color-text)',
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--color-accent)',
                }}
              >
                Know More →
              </a>
            </div>

            {/* Image placeholder – replace with real images when available */}
            <div
              className="relative shrink-0 w-full lg:w-[50%] rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                minHeight: 'clamp(200px, 30vw, 636px)',
                backgroundColor: ACCENT_COLORS[idx] + '15',
                border: `2px solid ${ACCENT_COLORS[idx]}30`,
              }}
            >
              <span
                className="font-bold text-center px-6 capitalize"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 28px)',
                  color: ACCENT_COLORS[idx],
                  opacity: 0.4,
                }}
              >
                {svc.title}
              </span>
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </>
  );
}
