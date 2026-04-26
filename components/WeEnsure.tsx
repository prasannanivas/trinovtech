import Image from 'next/image';
import { SiteConfig } from '@/lib/supabase';

type Props = { config: SiteConfig };

export default function WeEnsure({ config }: Props) {
  return (
    <section
      id="about"
      className="w-full"
      style={{ backgroundColor: 'var(--color-bg1)', fontFamily: 'var(--font-body)' }}
    >
      <div
        className="mx-auto flex flex-col"
        style={{
          maxWidth: '1920px',
          paddingLeft: 'clamp(1.5rem, 5vw, 65px)',
          paddingRight: 'clamp(1.5rem, 5vw, 65px)',
          paddingTop: 'clamp(2rem, 3.5vw, 46px)',
          paddingBottom: 'clamp(2rem, 3.5vw, 46px)',
          gap: 'clamp(1.5rem, 3.5vw, 60px)',
        }}
      >
        {/* Title */}
        <h2
          className="font-black text-center"
          style={{
            fontSize: 'clamp(1.3rem, 3vw, 42px)',
            color: 'var(--color-primary)',
            lineHeight: 1.5,
          }}
        >
          We Ensure
        </h2>

        {/* Row 1: 3 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 justify-items-center w-full">
          {config.ensures.slice(0, 3).map((item, i) => (
            <EnsureCard key={i} item={item} />
          ))}
        </div>

        {/* Row 2: 2 items centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8 justify-items-center max-w-[900px] mx-auto w-full">
          {config.ensures.slice(3).map((item, i) => (
            <EnsureCard key={i + 3} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EnsureCard({ item }: { item: SiteConfig['ensures'][number] }) {
  return (
    <div className="flex items-center gap-[10px]">
      <div
        className="relative shrink-0"
        style={{ width: 'clamp(46px, 4vw, 72px)', height: 'clamp(46px, 4vw, 72px)' }}
      >
        {item.icon_url ? (
          <Image src={item.icon_url} alt={item.title} fill className="object-contain" />
        ) : (
          <div
            className="w-full h-full rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: 'rgba(198,40,40,0.1)', color: 'var(--color-primary)' }}
          >
            ✓
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[2px]" style={{ lineHeight: 1.5 }}>
        <p
          className="font-semibold whitespace-nowrap"
          style={{ fontSize: 'clamp(1rem, 2vw, 36px)', color: 'var(--color-text)' }}
        >
          {item.title}
        </p>
        <p
          className="font-medium"
          style={{ fontSize: 'clamp(0.85rem, 1.8vw, 32px)', color: 'var(--color-muted)' }}
        >
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}
