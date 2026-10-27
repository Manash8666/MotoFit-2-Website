'use client';

import { useState, useEffect } from 'react';
import { IndustrialButton } from '@/components/ui/buttons/GlassButton';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '@/components/LenisWrapper';
import InstagramPortal3D from '../interactive/InstagramPortal3D';
import { useBooking } from '@/context/BookingContext';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop", // Motorbike in garage
  "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2070&auto=format&fit=crop", // Mechanic working
  "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?q=80&w=2069&auto=format&fit=crop"  // Cafe racer
];

const CAPTIONS = [
  "Precision Engine Rebuilds",
  "Dyno Tuning & Diagnostics",
  "Bespoke Custom Builds"
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lenis = useLenis();
  const { openBooking } = useBooking();

  // Cycle background images smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToNext = () => {
    if (lenis) {
      lenis.scrollTo('#services', { duration: 1.5 });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#050505] overflow-hidden flex flex-col justify-between">
      {/* 1. Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.45, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[currentImageIndex]}
              alt="MotoFit 2 Hero Background"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Gradient Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#050505]/70 to-[#050505]" />
        <div className="absolute inset-0 opacity-20 bg-[url('/textures/carbon-fibre.png')]" />

        {/* Grid overlay */}
        <div className="absolute inset-0 grid grid-cols-12 gap-4 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-[#1a1a1a]/30 last:border-r-0" />
          ))}
        </div>
      </div>

      {/* Content - with guaranteed clearance from fixed navbar */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-28 sm:pt-32 md:pt-36 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-6 sm:space-y-8 my-auto">
          {/* Brand Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-2 sm:mb-4"
          >
            <div className="inline-block border-2 border-[#ff5e1a] px-4 py-1.5 sm:px-6 sm:py-2 rounded-full backdrop-blur-md bg-[#ff5e1a]/10 shadow-[0_0_20px_rgba(255,94,26,0.2)]">
              <span
                className="text-sm sm:text-lg md:text-2xl text-white font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}
              >
                Better Than Your Brand's Service.
              </span>
            </div>
          </motion.div>

          {/* Main Title with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="overflow-hidden"
          >
            <div className="inline-block backdrop-blur-md bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <h1
                className="text-[clamp(2.5rem,10vw,7.5rem)] font-bold uppercase leading-[0.9] tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.15em] select-none"
                style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}
              >
                <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.25)] mr-3 sm:mr-6">
                  MOTOFIT
                </span>
                <span className="text-[#00d1ff] drop-shadow-[0_0_30px_rgba(0,209,255,0.6)]">
                  2
                </span>
              </h1>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="overflow-hidden h-8 sm:h-10 flex justify-center items-center"
          >
            <p className="text-[#a0a0a0] text-xs sm:text-base md:text-lg font-mono uppercase tracking-widest">
              {CAPTIONS[currentImageIndex]}
            </p>
          </motion.div>

          {/* CTA Button & Warranty Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="pt-2 sm:pt-4 flex flex-col items-center"
          >
            <IndustrialButton
              size="xl"
              onClick={() => openBooking('General Service')}
              className="group shadow-[0_0_30px_rgba(255,94,26,0.4)]"
              icon={
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
              iconPosition="right"
            >
              Book Your Service
            </IndustrialButton>

            {/* Core USP Injection */}
            <div className="mt-5 flex justify-center">
              <div className="bg-[#1a1a1a]/90 backdrop-blur-md border border-[#ff5e1a]/40 px-4 py-2 rounded-lg flex items-center justify-center gap-2 max-w-sm sm:max-w-md shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                <span className="text-lg">🛡️</span>
                <span className="text-xs sm:text-sm font-bold text-[#e0e0e0] leading-tight text-left">
                  The only garage in Ahmedabad with a <span className="text-[#ff5e1a]">1-Year Engine Warranty</span>.
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <InstagramPortal3D />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 pb-6 flex justify-center">
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center gap-2 text-[#999999] hover:text-white transition-colors duration-300"
          aria-label="Scroll to next section"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">Explore</span>
          <div className="relative h-7 w-5">
            <div className="absolute inset-0 border border-[#333] rounded-full" />
            <motion.div
              className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#ff5e1a]"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-0" />
    </div>
  );
}
