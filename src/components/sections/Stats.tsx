'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  target: number;
  suffix?: string;
}

function Counter({ target, suffix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const counter = { value: 0 };
    
    gsap.to(counter, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.floor(counter.value) + suffix;
        }
      },
    });
  }, [target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { id: 1, value: 150, suffix: '+', label: 'Custom Builds' },
  { id: 2, value: 2400, suffix: 'k', label: 'PWA Users' },
  { id: 3, value: 100, suffix: '%', label: 'Precision' },
  { id: 4, value: 0, suffix: '', label: 'Ahmedabad HQ' },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.stat-card');
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 border-y border-[#1a1a1a]">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`stat-card relative p-8 md:p-12 border-[#1a1a1a] ${
                index % 2 === 0 && index !== stats.length - 1 ? 'border-r' : ''
              } ${
                index < 2 ? 'border-b md:border-b-0' : 'border-b'
              }`}
            >
              <div className="overflow-hidden">
                <div className="flex items-baseline gap-2">
                  {stat.value > 0 ? (
                    <>
                      <span className="text-[clamp(3rem,8vw,6rem)] font-black">
                        <Counter target={stat.value} suffix={stat.suffix} />
                      </span>
                    </>
                  ) : (
                    <span className="text-[clamp(2rem, 6vw, 4rem)] font-black">{stat.label}</span>
                  )}
                </div>
              </div>

              <div className="overflow-hidden mt-4">
                <p className="text-[#a0a0a0] text-xs md:text-sm font-mono tracking-widest uppercase">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
