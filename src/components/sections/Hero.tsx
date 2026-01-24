'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture, useScroll } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { GlassButton, IndustrialButton } from '@/components/ui/buttons/GlassButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';
import TextReveal from '../ui/text/TextReveal';

const HERO_IMAGES = [
  '/images/hero/ducati-panigale.png', // Ducati Panigale (Red)
  '/images/hero/bmw-s1000rr.png',     // BMW S1000RR (Track)
  '/images/hero/cafe-racer.png'       // Custom Cafe Racer (Detail)
];

extend(THREE);

// Check for WebGL support
const isWebGLSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

import { useBooking } from '@/context/BookingContext';

// Main Hero Component
export default function Hero() {
  const titleWords = ['MOTOFIT', '2'];

  const CAPTIONS = [
    "Precision Engine Rebuilds",
    "Dyno Tuning & Diagnostics",
    "Bespoke Custom Builds"
  ];

  const [visibleCount, setVisibleCount] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const lenis = useLenis();
  const { openBooking } = useBooking();

  // Cycle images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // 6 seconds per image
    return () => clearInterval(timer);
  }, []);

  // Check WebGL support on mount
  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
  }, []);

  // Character reveal animation
  useEffect(() => {
    const title = titleWords.join('');

    // Reset
    setVisibleCount(0);
    setIsLooping(false);

    const interval = setInterval(() => {
      setVisibleCount(prev => {
        if (prev < title.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => setSubtitleVisible(true), 300);
          // Start looping sequence after a delay
          setTimeout(() => setIsLooping(true), 2000);
          return prev;
        }
      });
    }, 400); // 400ms speed

    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    if (lenis) {
      lenis.scrollTo('#services', { duration: 1.5 });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen w-full bg-[#050505] overflow-hidden">

      {/* 1. Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGES[currentImageIndex]})` }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#1a0a00] opacity-80" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

        {/* Grid overlay */}
        <div className="absolute inset-0 grid grid-cols-12 gap-4 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-[#1a1a1a]/30 last:border-r-0" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          {/* Main Title with Glassmorphism */}
          <div className="overflow-hidden">
            <div className="inline-block backdrop-blur-md bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 py-4 sm:px-6 sm:py-5 md:px-12 md:py-8">
              <h1 className="text-[clamp(2.5rem,12vw,8rem)] font-bold uppercase leading-[0.85] tracking-[0.02em] sm:tracking-[0.1em] md:tracking-[0.2em]" style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}>
                {titleWords.map((word, wordIndex) => {
                  const startIdx = titleWords.slice(0, wordIndex).join('').length;
                  return (
                    <span key={wordIndex} className="inline-block mr-2 sm:mr-4 md:mr-12 last:mr-0">
                      {word.split('').map((char, charIndex) => {
                        const globalIndex = startIdx + charIndex;
                        const isVisible = globalIndex < visibleCount;
                        const direction = globalIndex % 2 === 0 ? 1 : -1; // Specific randomized direction pattern

                        return (
                          <motion.span
                            key={`${wordIndex}-${charIndex}`}
                            className="inline-block cursor-pointer"
                            initial={{ y: 50, opacity: 0, rotateX: 90 }}
                            animate={
                              isLooping ? {
                                y: [0, -15, 0], // Slightly higher float
                                rotateY: [0, 360 * direction],
                                rotateX: 0,
                                opacity: 1,
                                color: wordIndex === 1 ? ['#00d1ff', '#ff5e1a', '#00d1ff'] : '#ffffff', // Blue -> Orange -> Blue cycle
                                transition: {
                                  duration: 12, // Sync with rotation
                                  repeat: Infinity,
                                  ease: "linear",
                                  delay: charIndex * 0.1
                                }
                              } : isVisible ? {
                                y: 0,
                                opacity: 1,
                                rotateX: 0,
                                color: wordIndex === 1 ? '#ff5e1a' : '#ffffff',
                                transition: {
                                  duration: 0.8,
                                  ease: [0.16, 1, 0.3, 1],
                                }
                              } : { y: 50, opacity: 0, rotateX: 90 }
                            }
                            whileHover={{
                              scale: 1.2,
                              color: '#00d1ff',
                              textShadow: '0 0 50px rgba(0, 209, 255, 0.8)',
                              transition: { duration: 0.2 }
                            }}
                            style={{
                              textShadow: wordIndex === 1
                                ? '0 0 30px rgba(255, 94, 26, 0.5)'
                                : '0 0 20px rgba(255, 255, 255, 0.2)',
                            }}
                          >
                            {char}
                          </motion.span>
                        );
                      })}
                    </span>
                  );
                })}
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden h-8 md:h-12 flex justify-center items-center">
            {subtitleVisible && (
              <TextReveal className="text-[#a0a0a0] text-sm md:text-xl font-mono uppercase tracking-widest">
                {CAPTIONS[currentImageIndex]}
              </TextReveal>
            )}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={subtitleVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-8"
          >
            <IndustrialButton
              size="xl"
              onClick={() => openBooking('General Service')}
              className="group"
              icon={
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
              iconPosition="right"
            >
              Book Your Service
            </IndustrialButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={subtitleVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <button
              onClick={scrollToNext}
              className="flex flex-col items-center gap-2 text-[#999999] hover:text-white transition-colors duration-300"
              aria-label="Scroll to next section"
            >
              <span className="text-xs font-mono uppercase tracking-widest">Explore</span>
              <div className="relative h-8 w-6">
                <div className="absolute inset-0 border border-[#333] rounded-full" />
                <motion.div
                  className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#ff5e1a]"
                  animate={{
                    y: [0, 16, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </div>
  );
}
