'use client';

// =======================================================================
// MerchHero.tsx
// Hero Teaser Section for the Parts Page
// Animation: GSAP stagger on merch category tags
// =======================================================================

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// --- Merchandise Categories ---
const MERCH_CATEGORIES: { label: string; icon: string; status: 'soon' }[] = [
  { label: 'Riding Jackets',    icon: '🧥', status: 'soon' },
  { label: 'Riding Pants',      icon: '👖', status: 'soon' },
  { label: 'Gloves',            icon: '🧤', status: 'soon' },
  { label: 'Full-Face Helmets', icon: '⛑️', status: 'soon' },
  { label: 'Riding Shoes',      icon: '👟', status: 'soon' },
  { label: 'Goggles & Visors',  icon: '🥽', status: 'soon' },
  { label: 'Body Guards',       icon: '🦺', status: 'soon' },
  { label: 'Full Gear Kits',    icon: '🏍️', status: 'soon' },
];

export function MerchHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // 1. Headline fades in from below
      gsap.from(headlineRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.1,
      });

      // 2. Badge pulses in
      gsap.from(badgeRef.current, {
        scale: 0.7,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 0.5,
      });

      // 3. Category tags stagger in from the bottom
      const tags = tagsRef.current?.querySelectorAll('.merch-tag');
      if (tags && tags.length > 0) {
        gsap.from(tags, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power2.out',
          delay: 0.7,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="merch-hero"
      aria-label="MotoFit 2 Merchandise - Coming Soon"
      className="relative w-full bg-neutral-950 border-b border-neutral-800 pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white opacity-[0.03] blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-neutral-400 opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* — Eyebrow — */}
        <p className="text-[11px] font-mono tracking-[0.25em] text-neutral-600 uppercase mb-6">
          MotoFit 2 — Gear & Apparel Division / Ahmedabad
        </p>

        {/* — "Coming Soon" System Update Badge — */}
        <div ref={badgeRef} className="inline-flex items-center gap-3 mb-10">
          <div className="relative flex items-center gap-2 border border-neutral-700 bg-neutral-900 px-4 py-2 rounded-sm">
            {/* Pulsing dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
            <span className="text-[11px] font-mono tracking-[0.2em] text-white uppercase">
              System Update
            </span>
            <span className="w-px h-4 bg-neutral-700" />
            <span className="text-[11px] font-mono tracking-[0.15em] text-neutral-400 uppercase">
              Deploying Soon
            </span>
          </div>
        </div>

        {/* — Main Headline — */}
        <div ref={headlineRef} className="mb-6">
          <h2 className="text-5xl md:text-6xl lg:text-[72px] font-black uppercase tracking-tight text-white leading-[1] mb-4">
            Ride Gear.
            <br />
            <span className="text-neutral-500 mix-blend-difference">
              Engineered Standard.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-neutral-500 leading-relaxed">
            Full-stack protection gear, curated and professionally vetted by the MotoFit 2 workshop
            team in Ahmedabad. Not fashion. Equipment. Launching in-store at{' '}
            <span className="text-neutral-300 font-medium">
              Chandkheda, Ahmedabad
            </span>{' '}
            and online.
          </p>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-neutral-800 my-10" />

        {/* — Category Tags — */}
        <div ref={tagsRef} className="flex flex-wrap gap-3 md:gap-4">
          {MERCH_CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="merch-tag group relative flex items-center gap-2.5 border border-neutral-800 bg-neutral-900/60 hover:border-neutral-600 hover:bg-neutral-800 transition-all duration-300 px-5 py-3 cursor-default"
            >
              {/* Icon */}
              <span className="text-base" aria-hidden="true">
                {cat.icon}
              </span>
              {/* Label */}
              <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors duration-200 uppercase tracking-wide">
                {cat.label}
              </span>
              {/* Coming soon shimmer indicator */}
              <span className="ml-1 text-[9px] font-mono tracking-widest text-neutral-600 group-hover:text-neutral-500 transition-colors uppercase">
                / Soon
              </span>
            </div>
          ))}
        </div>

        {/* — Footer Note — */}
        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
          <p className="text-xs font-mono text-neutral-700 tracking-wide">
            AVAILABLE: IN-STORE, SHOP NO. 9, KIRTAN COMPLEX, CHANDKHEDA, AHMEDABAD
          </p>
          <div className="hidden sm:block w-px h-4 bg-neutral-800" />
          <p className="text-xs font-mono text-neutral-700 tracking-wide">
            ONLINE ROLLOUT: TBD
          </p>
        </div>
      </div>
    </section>
  );
}

export default MerchHero;
