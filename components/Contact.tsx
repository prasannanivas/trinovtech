'use client';

import { SiteConfig } from '@/lib/supabase';
import ScrollReveal from '@/components/ScrollReveal';

type Props = { config: SiteConfig };

const PHONES = [
  { number: '7395881708', display: '+91 73958 81708' },
  { number: '9600663480', display: '+91 96006 63480' },
];

export default function Contact({ config }: Props) {
  return (
    <section
      id="contact"
      className="w-full py-12 px-6"
      style={{ backgroundColor: 'var(--color-bg2)', fontFamily: 'var(--font-heading)' }}
    >
      <div className="max-w-xl mx-auto flex flex-col gap-6 items-center text-center">
        <ScrollReveal direction="up">
        <h2
          className="font-extrabold capitalize"
          style={{ fontSize: 'clamp(1.3rem, 2vw, 2rem)', color: 'var(--color-text)' }}
        >
          Let&apos;s Build Something Great
        </h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
        <p
          className="leading-relaxed"
          style={{ fontSize: 'clamp(0.8rem, 0.95vw, 1rem)', color: 'var(--color-brown)', fontFamily: 'var(--font-body)' }}
        >
          Reach out to our team and let&apos;s discuss how TRINOVTECH can power your next project.
        </p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200} className="w-full">
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
        </ScrollReveal>

        {/* Reach directly */}
        <ScrollReveal direction="up" delay={100} className="w-full">
        <div className="flex flex-col gap-3 w-full pt-2">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-muted)', opacity: 0.4 }} />
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>
              Or reach us directly
            </p>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-muted)', opacity: 0.4 }} />
          </div>

          {PHONES.map(({ number }, idx) => (
            <div key={number} className="flex flex-col items-center gap-1 w-full">
              {idx === 1 && (
                <p className="text-xs tracking-widest" style={{ color: 'var(--color-muted)', opacity: 0.55 }}>
                  · also on ·
                </p>
              )}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <a
                  href={`https://wa.me/91${number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#25D366', color: '#fff', fontSize: '0.75rem', opacity: idx === 1 ? 0.85 : 1 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.854L.057 23.882a.5.5 0 0 0 .612.612l6.083-1.464A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.036-1.362l-.36-.214-3.733.899.916-3.666-.235-.374A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`tel:+91${number}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-opacity hover:opacity-80"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-bg1)', fontSize: '0.75rem', opacity: idx === 1 ? 0.85 : 1 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.61 21 3 14.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  Call
                </a>
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            <a
              href="mailto:trinovtech@gmail.com"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-opacity hover:opacity-80"
              style={{ border: '1.5px solid var(--color-primary)', color: 'var(--color-primary)', fontSize: '0.75rem' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              trinovtech@gmail.com
            </a>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}