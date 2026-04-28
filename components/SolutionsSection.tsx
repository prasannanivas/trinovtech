import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

const SOLUTIONS = [
  {
    title: 'Enterprise & SaaS Solutions',
    description:
      'We build Enterprise and SaaS solutions that are scalable, secure, and easy to integrate—helping businesses operate efficiently and grow with confidence.',
    image: '/assets/sol-enterprise2.png',
    reverse: false,
  },
  {
    title: 'Embedded Systems & IoT',
    description:
      'We deliver end-to-end embedded and IoT solutions—from hardware to software—enabling all peripherals with reliable, scalable performance.',
    image: '/assets/sol-embedded2.png',
    reverse: true,
  },
  {
    title: 'System Integration & Deployment',
    description:
      'We connect IoT devices to backend systems using MQTT, HTTP, WebSockets, and APIs—enabling real-time data, analytics, and seamless integration.',
    image: '/assets/system-integration-and-deployment.png',
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

export default function SolutionsSection() {
  return (
    <section id="solutions" className="w-full scroll-mt-24">
      {/* Section Hero Banner */}
      <ScrollReveal direction="up">
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
          Our solutions are designed to simplify complexity and drive meaningful business outcomes.
        </p>
      </div>
      </ScrollReveal>

      {SOLUTIONS.map((sol, idx) => (
        <div
          key={idx}
          className="w-full overflow-hidden"
          style={{
            backgroundColor: idx % 2 === 0 ? 'var(--color-bg2)' : 'var(--color-bg1)',
            minHeight: 'clamp(200px, 28vw, 455px)',
          }}
        >
          <ScrollReveal direction="up" threshold={0.1}>
          <div
            className={`mx-auto flex flex-col ${sol.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-between gap-6 lg:gap-12`}
            style={{
              maxWidth: '1720px',
              padding: 'clamp(1.5rem, 3vw, 48px) clamp(1.5rem, 3vw, 48px)',
            }}
          >
            <div
              className="flex flex-col gap-5 shrink-0 w-full lg:w-[40%]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <h2
                className="font-bold leading-tight capitalize"
                style={{ fontSize: 'clamp(1.1rem, 2.3vw, 36px)', color: 'var(--color-text)' }}
              >
                {sol.title}
              </h2>
              <p
                className="font-bold leading-relaxed capitalize"
                style={{ fontSize: 'clamp(0.85rem, 1vw, 16px)', color: 'var(--color-brown)', letterSpacing: '0.65px' }}
              >
                {sol.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center font-normal text-lg transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-bg1)',
                  width: '101px',
                  height: '32px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Know More
              </a>
            </div>
            <div
              className="relative shrink-0 w-full lg:w-[52%] rounded-2xl overflow-hidden"
              style={{ minHeight: 'clamp(200px, 20vw, 320px)' }}
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
          </ScrollReveal>
        </div>
      ))}
    </section>
  );
}
