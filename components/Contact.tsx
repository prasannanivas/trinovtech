'use client';

import { SiteConfig } from '@/lib/supabase';

type Props = { config: SiteConfig };

export default function Contact({ config }: Props) {
  return (
    <section
      id="contact"
      className="w-full py-12 px-6"
      style={{ backgroundColor: 'var(--color-bg2)', fontFamily: 'var(--font-heading)' }}
    >
      <div className="max-w-xl mx-auto flex flex-col gap-6 items-center text-center">
        <h2
          className="font-extrabold capitalize"
          style={{ fontSize: 'clamp(1.3rem, 2vw, 2rem)', color: 'var(--color-text)' }}
        >
          Let&apos;s Build Something Great
        </h2>
        <p
          className="leading-relaxed"
          style={{ fontSize: 'clamp(0.8rem, 0.95vw, 1rem)', color: 'var(--color-brown)', fontFamily: 'var(--font-body)' }}
        >
          Reach out to our team and let&apos;s discuss how TRINOVTECH can power your next project.
        </p>
        <form
          className="flex flex-col gap-4 w-full max-w-xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            suppressHydrationWarning
            type="text"
            placeholder="Your Name"
            required
            className="border rounded-md px-5 py-3 text-lg outline-none focus:ring-2"
            style={{
              borderColor: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              backgroundColor: 'var(--color-bg1)',
              color: 'var(--color-text)',
            }}
          />
          <input
            suppressHydrationWarning
            type="email"
            placeholder="Your Email"
            required
            className="border rounded-md px-5 py-3 text-lg outline-none focus:ring-2"
            style={{
              borderColor: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              backgroundColor: 'var(--color-bg1)',
              color: 'var(--color-text)',
            }}
          />
          <textarea
            suppressHydrationWarning
            placeholder="Your Message"
            rows={4}
            required
            className="border rounded-md px-5 py-3 text-lg outline-none focus:ring-2 resize-none"
            style={{
              borderColor: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              backgroundColor: 'var(--color-bg1)',
              color: 'var(--color-text)',
            }}
          />
          <button
            suppressHydrationWarning
            type="submit"
            className="font-bold text-lg px-8 py-3 rounded-full transition-opacity hover:opacity-90 self-center mt-2"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-bg1)' }}
          >
            {config.cta_label}
          </button>
        </form>
      </div>
    </section>
  );
}
