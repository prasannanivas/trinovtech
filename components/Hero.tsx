import Image from 'next/image';
import { SiteConfig } from '@/lib/supabase';

type Props = { config: SiteConfig };

export default function Hero({ config }: Props) {
  return (
    <section
      id="home"
      className="w-full overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg1)', fontFamily: 'var(--font-heading)' }}
    >
      <div
        className="mx-auto flex flex-row items-center justify-between"
        style={{
          maxWidth: '1920px',
          paddingLeft: 'clamp(1.5rem, 5.5vw, 70px)',
          paddingRight: 'clamp(1.5rem, 3vw, 39px)',
          paddingTop: 'clamp(2rem, 7vw, 85px)',
          paddingBottom: 'clamp(2rem, 5vw, 65px)',
          minHeight: 'clamp(300px, 45vw, 560px)',
        }}
      >
        {/* Left: Text + CTA */}
        <div className="flex flex-col gap-4 lg:gap-6 flex-1 lg:max-w-[710px] lg:pr-8">
          <div className="flex flex-col gap-6">
            <h1
              className="font-extrabold capitalize leading-tight"
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
              className="font-normal leading-relaxed"
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
            className="inline-flex items-center gap-3 font-normal self-start transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-bg1)',
              width: 'clamp(120px, 9vw, 132px)',
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

        {/* Right: Staggered 3-column image grid */}
        <div
          className="relative hidden lg:block shrink-0"
          style={{ width: '388px', height: '388px' }}
        >
          {/* Image 3 — leftmost column */}
          <div
            className="absolute overflow-hidden shadow-[5px_10px_15px_0px_rgba(0,0,0,0.25)]"
            style={{ left: 0, top: 0, width: '114px', height: '345px' }}
          >
            <Image src="/assets/hero-img3.png" alt="hero 3" fill className="object-cover" />
          </div>
          {/* Image 2 — middle column (offset down 43px) */}
          <div
            className="absolute overflow-hidden shadow-[5px_10px_15px_0px_rgba(0,0,0,0.25)]"
            style={{ left: '142px', top: '43px', width: '114px', height: '345px' }}
          >
            <Image src="/assets/hero-img2.png" alt="hero 2" fill className="object-cover" />
          </div>
          {/* Image 1 — rightmost column */}
          <div
            className="absolute overflow-hidden shadow-[5px_10px_15px_0px_rgba(0,0,0,0.25)]"
            style={{ left: '274px', top: 0, width: '114px', height: '345px' }}
          >
            <Image src="/assets/hero-img1.png" alt="hero 1" fill className="object-cover" />
          </div>
        </div>

        {/* Mobile: small image to the right of text */}
        <div
          className="lg:hidden shrink-0 ml-4 rounded-xl overflow-hidden shadow-[5px_10px_20px_rgba(0,0,0,0.2)]"
          style={{ width: '90px', height: '150px' }}
        >
          <Image src="/assets/hero-img2.png" alt="hero" width={90} height={150} className="object-cover w-full h-full" />
        </div>
      </div>
    </section>
  );
}
