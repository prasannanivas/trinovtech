import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteConfig } from '@/lib/supabase';

// Reusable image stack used in alternating sections
function ImageStack({
  bgSrc,
  rightSrc,
  leftSrc,
}: {
  bgSrc: string;
  rightSrc: string;
  leftSrc: string;
}) {
  return (
    <div
      className="relative shrink-0 hidden lg:block"
      style={{ width: '45%', minHeight: '640px' }}
    >
      {/* Tall background image */}
      <div className="relative w-full h-full" style={{ minHeight: '640px' }}>
        <Image
          src={bgSrc}
          alt=""
          fill
          className="object-cover rounded-2xl"
          sizes="45vw"
        />
      </div>
      {/* Overlay right panel */}
      <div
        className="absolute rounded-2xl overflow-hidden"
        style={{
          right: 0,
          top: '8%',
          width: '45%',
          height: '75%',
          boxShadow: '15px 25px 35px 0px rgba(0,0,0,0.25)',
        }}
      >
        <Image src={rightSrc} alt="" fill className="object-cover" sizes="20vw" />
      </div>
      {/* Overlay left panel */}
      <div
        className="absolute rounded-2xl overflow-hidden"
        style={{
          left: 0,
          top: '14%',
          width: '45%',
          height: '75%',
          boxShadow: '15px 25px 35px 0px rgba(0,0,0,0.25)',
        }}
      >
        <Image src={leftSrc} alt="" fill className="object-cover" sizes="20vw" />
      </div>
    </div>
  );
}

// Text block used in each section
function TextBlock({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <div
      className="flex flex-col gap-8 shrink-0 w-full lg:w-[42%]"
      style={{ fontFamily: 'var(--font-heading)' }}
    >
      <h2
        className="font-bold leading-tight capitalize"
        style={{
          fontSize: 'clamp(2rem, 4vw, 64px)',
          color: 'var(--color-text)',
        }}
      >
        {title}
      </h2>
      <div className="flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="font-bold leading-relaxed capitalize"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 24px)',
              color: 'var(--color-brown)',
              letterSpacing: '1.2px',
            }}
          >
            {p}
          </p>
        ))}
      </div>
      <a
        href="#contact"
        className="inline-flex items-center justify-center font-normal text-lg rounded-sm transition-opacity hover:opacity-90"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-bg1)',
          width: '155px',
          height: '49px',
          borderRadius: '4px',
        }}
      >
        Know More
      </a>
    </div>
  );
}

// Single section wrapper
function Section({
  bg,
  reverse,
  title,
  paragraphs,
  bgSrc,
  rightSrc,
  leftSrc,
}: {
  bg: string;
  reverse: boolean;
  title: string;
  paragraphs: string[];
  bgSrc: string;
  rightSrc: string;
  leftSrc: string;
}) {
  return (
    <section
      className="w-full overflow-hidden"
      style={{ backgroundColor: bg, minHeight: 'clamp(400px, 60vw, 980px)' }}
    >
      <div
        className={`mx-auto flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-between gap-10 lg:gap-16`}
        style={{
          maxWidth: '1720px',
          padding: 'clamp(3rem, 6vw, 100px) clamp(1.5rem, 5vw, 80px)',
        }}
      >
        <TextBlock title={title} paragraphs={paragraphs} />
        <ImageStack bgSrc={bgSrc} rightSrc={rightSrc} leftSrc={leftSrc} />
      </div>
    </section>
  );
}

export default async function AboutPage() {
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
          At TrinovTech, we transform complex challenges into simple, scalable solutions.
        </p>
      </section>

      {/* Section 1 – Who We Are */}
      <Section
        bg="rgba(255,255,255,0.38)"
        reverse={false}
        title="Who We Are"
        paragraphs={[
          'We are a trusted team of engineers and consultants delivering scalable solutions across embedded systems, IoT, cloud, and full-stack platforms—working closely with you for seamless execution.',
          'We build integrated systems that connect devices, applications, and data, ensuring reliable performance and supporting your long-term growth.',
        ]}
        bgSrc="/assets/about/who-bg.png"
        rightSrc="/assets/about/who-right.png"
        leftSrc="/assets/about/who-left.png"
      />

      {/* Section 2 – Problem We Solve (reversed) */}
      <Section
        bg="#F1F5F9"
        reverse={true}
        title="Problem We Solve"
        paragraphs={[
          'We help your organization reduce development overhead with on-demand expertise—eliminating the need for large in-house teams and enabling faster, cost-efficient execution.',
          'We simplify complexity by delivering scalable, reliable solutions—so you can focus on your core business while we handle the technology.',
        ]}
        bgSrc="/assets/about/who-bg.png"
        rightSrc="/assets/about/problem-right.png"
        leftSrc="/assets/about/problem-left.png"
      />

      {/* Section 3 – What We Do */}
      <Section
        bg="rgba(255,255,255,0.38)"
        reverse={false}
        title="What We Do"
        paragraphs={[
          'We design and deliver end-to-end solutions across embedded, IoT, cloud, and full-stack platforms—focused on scalable design and strong system integration.',
          'From concept to deployment, we ensure seamless execution and deliver reliable solutions that perform in real-world environments and support your growth.',
        ]}
        bgSrc="/assets/about/who-bg.png"
        rightSrc="/assets/about/whatwedo-right.png"
        leftSrc="/assets/about/whatwedo-left.png"
      />

      {/* Section 4 – Our Expertise (reversed) */}
      <Section
        bg="#F1F5F9"
        reverse={true}
        title="Our Expertise"
        paragraphs={[
          'Our expertise spans Mortgage Applications, IoT, Automotive systems, E-commerce, EdTech, and data analytics—delivering practical, scalable solutions aligned with your business goals.',
          'By combining domain knowledge with embedded, cloud, and full-stack expertise, we build integrated solutions that turn data into meaningful insights and drive better decisions.',
        ]}
        bgSrc="/assets/about/who-bg.png"
        rightSrc="/assets/about/expertise-right.png"
        leftSrc="/assets/about/expertise-left.png"
      />

      {/* Section 5 – Process We Follow */}
      <Section
        bg="rgba(255,255,255,0.38)"
        reverse={false}
        title="Process We Follow"
        paragraphs={[
          'We follow a structured approach from requirement gathering and system design to milestone-based development—ensuring clarity, transparency, and steady progress.',
          'Through thorough testing, validation, and seamless deployment, we deliver stable, scalable solutions with continuous support for long-term performance.',
        ]}
        bgSrc="/assets/about/process-bg.png"
        rightSrc="/assets/about/process-right.png"
        leftSrc="/assets/about/process-left.png"
      />

      <Footer />
    </>
  );
}
