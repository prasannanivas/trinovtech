const SERVICES = [
  {
    title: 'Solution Consulting',
    description:
      'We work closely with you to understand your needs and guide you with reliable, scalable solutions you can trust.',
    reverse: false,
    bg: 'var(--color-bg1)',
    image: '/assets/solution-consulting.png',
  },
  {
    title: 'Mobile Application Development',
    description:
      'Secure, scalable apps—built as per your requirements with seamless performance.',
    reverse: true,
    bg: 'var(--color-bg2)',
    image: '/assets/mobile-app.png',
  },
  {
    title: 'Web Application Development',
    description:
      'Robust, high-performance backend solutions—designed for reliability, security, and long-term trust.',
    reverse: false,
    bg: 'var(--color-bg1)',
    image: '/assets/web-development.png',
  },
  {
    title: 'Embedded Hardware Design',
    description:
      'We deliver reliable embedded hardware solutions—built to your requirements with quality and performance you can trust.',
    reverse: true,
    bg: 'var(--color-bg2)',
    image: '/assets/embedded-hardware-design.png',
  },
  {
    title: 'Firmware Development',
    description:
      'We build reliable firmware—optimized for performance, stability, and seamless integration.',
    reverse: false,
    bg: 'var(--color-bg1)',
    image: '/assets/firmware-development.png',
  },
  {
    title: 'Linux Developments',
    description:
      'Reliable Linux, custom OS, and RTOS solutions—built for performance, stability, and seamless integration.',
    reverse: true,
    bg: 'var(--color-bg2)',
    image: '/assets/linux.png',
  },
  {
    title: 'Cloud Server Maintenance',
    description:
      'Secure, scalable cloud solutions on AWS, Azure, and Google Cloud—managed for reliability and performance.',
    reverse: false,
    bg: 'var(--color-bg1)',
    image: '/assets/cloud-server-maintanance.png',
  },
  {
    title: 'Data Analytics & Dashboards',
    description:
      'Transform data into insights with reliable analytics and intuitive dashboards you can trust.',
    reverse: true,
    bg: 'var(--color-bg2)',
    image: '/assets/sol-data.png',
  },
];

import Image from 'next/image';

const ACCENT_COLORS = [
  '#C62828', '#FF7A00', '#6D4C41', '#212121',
  '#C62828', '#FF7A00', '#6D4C41', '#212121',
];

export default function ServicesSection() {
  return (
    <section id="services" className="w-full scroll-mt-24">
      {/* Section Hero Banner */}
      <div
        className="w-full flex flex-col items-center justify-center text-center"
        style={{
          backgroundColor: 'var(--color-bg1)',
          minHeight: 'clamp(100px, 14vw, 271px)',
          padding: 'clamp(1.5rem, 3.5vw, 52px) clamp(1.5rem, 5vw, 104px)',
          fontFamily: 'var(--font-heading)',
        }}
      >
        <p
          className="font-black leading-normal"
          style={{ fontSize: 'clamp(0.95rem, 2vw, 31px)', color: 'var(--color-text)', maxWidth: '809px' }}
        >
          From concept to deployment, we provide technology services that perform with confidence.
        </p>
      </div>

      {SERVICES.map((svc, idx) => (
        <div
          key={idx}
          className="w-full overflow-hidden"
            style={{ backgroundColor: svc.bg, minHeight: 'clamp(200px, 28vw, 455px)' }}
        >
          <div
            className={`mx-auto flex flex-col ${svc.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-between gap-10 lg:gap-20`}
            style={{
              maxWidth: '1720px',
              padding: 'clamp(1.5rem, 3vw, 48px) clamp(1.5rem, 3vw, 48px)',
            }}
          >
            <div
              className="flex flex-col gap-5 shrink-0 w-full lg:w-[44%]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <h2
                className="font-bold leading-tight capitalize"
                style={{ fontSize: 'clamp(1.1rem, 2.3vw, 36px)', color: 'var(--color-text)' }}
              >
                {svc.title}
              </h2>
              <p
                className="font-medium leading-relaxed capitalize"
                style={{ fontSize: 'clamp(1rem, 1.4vw, 22px)', color: 'var(--color-brown)', letterSpacing: '0.8px' }}
              >
                {svc.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-80"
                style={{
                  fontSize: 'clamp(0.75rem, 0.8vw, 13px)',
                  color: 'var(--color-text)',
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--color-accent)',
                }}
              >
                Know More →
              </a>
            </div>

            <div
              className="relative shrink-0 w-full lg:w-[50%] rounded-2xl overflow-hidden"
              style={{ minHeight: 'clamp(200px, 20vw, 320px)' }}
            >
              {svc.image ? (
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-cover rounded-2xl"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center rounded-2xl"
                  style={{
                    minHeight: 'clamp(130px, 20vw, 320px)',
                    backgroundColor: ACCENT_COLORS[idx] + '15',
                    border: `2px solid ${ACCENT_COLORS[idx]}30`,
                  }}
                >
                  <span
                    className="font-bold text-center px-6 capitalize"
                    style={{ fontSize: 'clamp(1rem, 2vw, 28px)', color: ACCENT_COLORS[idx], opacity: 0.4 }}
                  >
                    {svc.title}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
