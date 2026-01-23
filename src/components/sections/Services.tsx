'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    number: '01',
    title: 'Custom Fabrication',
    description: 'Bespoke motorcycle parts and frames crafted with precision engineering',
    color: '#ff5e1a',
  },
  {
    id: 2,
    number: '02',
    title: 'ECU Remapping',
    description: 'Performance tuning and optimization for maximum power delivery',
    color: '#00d1ff',
  },
  {
    id: 3,
    number: '03',
    title: 'PWA Health Check',
    description: 'Diagnostic suite for motorcycle performance monitoring',
    color: '#ff5e1a',
  },
  {
    id: 4,
    number: '04',
    title: 'Royal Enfield Modification',
    description: 'Specialized modifications for classic and modern RE models',
    color: '#00d1ff',
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        gsap.from(item.querySelectorAll('.service-text'), {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const handleHover = (index: number, color: string) => {
    setActiveIndex(index);

    gsap.to(itemsRef.current[index], {
      borderTopColor: color,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleHoverOut = (index: number) => {
    setActiveIndex(null);

    gsap.to(itemsRef.current[index], {
      borderTopColor: '#1a1a1a',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className="group relative border-t border-[#1a1a1a] last:border-b py-8 md:py-12 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => handleHover(index, service.color)}
              onMouseLeave={() => handleHoverOut(index)}
              data-hover
            >
              <div className="flex items-start md:items-center gap-4 md:gap-8">
                {/* Number */}
                <div className="service-text overflow-hidden flex-shrink-0">
                  <span className="text-[#a0a0a0] text-sm md:text-base font-mono tracking-widest">
                    {service.number}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="flex-1">
                  <div className="service-text overflow-hidden">
                    <h3 className="heading-3 group-hover:text-[#ff5e1a] transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>

                  <div className="service-text overflow-hidden mt-2">
                    <p className="text-[#a0a0a0] text-sm md:text-base max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="service-text overflow-hidden flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-[#a0a0a0] group-hover:text-[#ff5e1a] transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
