'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { SiteConfig } from '@/lib/supabase';

type Props = { config: SiteConfig };

export default function Solutions({ config }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'right' ? 440 : -440, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="solutions"
      className="w-full overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg2)', fontFamily: 'var(--font-heading)' }}
    >
      <div
        className="mx-auto flex flex-col lg:flex-row items-center lg:items-start"
        style={{
          maxWidth: '1920px',
          paddingLeft: 'clamp(1.5rem, 5.5vw, 70px)',
          paddingRight: 'clamp(1.5rem, 3vw, 26px)',
          paddingTop: 'clamp(2rem, 3.5vw, 52px)',
          paddingBottom: 'clamp(2rem, 3.5vw, 52px)',
          gap: 'clamp(1.5rem, 3vw, 40px)',
        }}
      >
        {/* Left: Title + Nav Arrows */}
        <div
          className="flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4 lg:gap-10 shrink-0 w-full lg:w-[clamp(160px,18vw,310px)]"
        >
          <h2
            className="font-extrabold capitalize leading-none"
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 62px)',
              color: 'var(--color-primary)',
            }}
          >
            Solutions We Offer
          </h2>

          {/* Arrow buttons */}
          <div className="flex gap-4 items-center">
            <button
              suppressHydrationWarning
              onClick={() => scroll('left')}
              aria-label="Previous"
              className="w-[40px] h-[40px] rounded-full border-2 flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ borderColor: 'var(--color-primary)' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4L7 10L13 16" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              suppressHydrationWarning
              onClick={() => scroll('right')}
              aria-label="Next"
              className="w-[40px] h-[40px] rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto pb-4 flex-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
        >
          {config.solutions.map((solution, i) => (
            <div
              key={i}
              className="flex flex-col gap-[45px] shrink-0"
              style={{ width: 'clamp(170px, 15vw, 260px)' }}
            >
              {/* Card image */}
              <div
                className="relative rounded-[20px] overflow-hidden"
                style={{ height: 'clamp(140px, 15vw, 260px)' }}
              >
                {solution.image_url ? (
                  <Image
                    src={solution.image_url}
                    alt={solution.title}
                    fill
                    className="object-cover rounded-[20px]"
                  />
                ) : (
                  <div
                    className="w-full h-full rounded-[20px]"
                    style={{ backgroundColor: 'var(--color-bg1)' }}
                  />
                )}
              </div>

              {/* Card text */}
              <div className="flex flex-col gap-4">
                <h3
                  className="font-black capitalize leading-tight"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.4vw, 23px)',
                    color: 'var(--color-text)',
                  }}
                >
                  {solution.title}
                </h3>
                <a
                  href="#"
                  className="flex items-center gap-2 font-medium capitalize underline"
                  style={{
                    fontSize: 'clamp(0.75rem, 0.9vw, 13px)',
                    color: 'var(--color-text)',
                    textDecorationColor: '#5f573f',
                  }}
                >
                  Learn More
                  <Image src="/assets/arrow-small.svg" alt="→" width={8} height={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
