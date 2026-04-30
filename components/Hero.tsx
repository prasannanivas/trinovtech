import Image from 'next/image';
import { SiteConfig } from '@/lib/supabase';
import HeroImages from '@/components/HeroImages';

type Props = { config: SiteConfig };

export default function Hero({ config }: Props) {
  return (
    <section
      id="home"
      className="w-full overflow-hidden lg:h-[100dvh] lg:flex lg:items-center"
      style={{ backgroundColor: 'var(--color-bg1)', fontFamily: 'var(--font-heading)' }}
    >
      <div
        className="mx-auto flex flex-row items-center justify-between w-full"
        style={{
          maxWidth: '1920px',
          paddingLeft: 'clamp(1.5rem, 5.5vw, 70px)',
          paddingRight: 'clamp(1.5rem, 3vw, 39px)',
          paddingTop: 'clamp(1rem, 7vw, 15px)',
          paddingBottom: 'clamp(2rem, 5vw, 65px)',
        }}
      >
        {/* Left: Text + CTA */}
        <div className="flex flex-col gap-4 lg:gap-6 flex-1 lg:max-w-[710px] lg:pr-8">
          <div className="flex flex-col gap-6">
            <h1
              className="font-extrabold capitalize leading-tight hero-text-anim"
              style={{
                fontSize: 'clamp(1.25rem, 2.5vw, 33px)',
                color: 'var(--color-text)',
                maxWidth: '710px',
              }}
            >
              {config.hero_title_start}{' '}
              <span
                className={
                  config.hero_animation && config.hero_animation !== 'none'
                    ? `text-animate-${config.hero_animation}`
                    : ''
                }
                style={
                  config.hero_animation === 'shimmer'
                    ? {}
                    : { color: 'var(--color-primary)' }
                }
              >
                {config.hero_title_highlight}{' '}
              </span>
              {config.hero_title_end}
            </h1>
            <p
              className="font-normal leading-relaxed hero-text-anim hero-text-anim-delay-1"
              style={{
                fontSize: 'clamp(0.85rem, 1.1vw, 16px)',
                color: 'var(--color-brown, #6D4C41)',
                maxWidth: '710px',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {config.hero_description}
            </p>
          </div>

          {/* Know More Button */}
          <a
            href="#solutions"
            className="inline-flex items-center gap-3 font-normal self-start transition-opacity hover:opacity-90 hero-text-anim hero-text-anim-delay-2 whitespace-nowrap"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-bg1)',
              height: '32px',
              paddingLeft: '24px',
              paddingRight: '24px',
              paddingTop: '20px',
              paddingBottom: '20px',
              fontSize: 'clamp(0.75rem, 0.9vw, 13px)',
            }}
          >
            Know More
            <Image src="/assets/arrow-right.svg" alt="arrow" width={25} height={25} />
          </a>
        </div>

        {/* Right: Staggered 3-column image grid — scroll-driven parallax */}
        <HeroImages />

        {/* Mobile: small image to the right of text */}
        <div
          className="lg:hidden shrink-0 ml-4 rounded-xl overflow-hidden shadow-[5px_10px_20px_rgba(0,0,0,0.2)] hero-text-anim hero-text-anim-delay-3"
          style={{ width: '90px', height: '150px' }}
        >
          <Image src="/assets/hero-img2.png" alt="hero" width={90} height={150} className="object-cover w-full h-full" />
        </div>
      </div>
    </section>
  );
}
