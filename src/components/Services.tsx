"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    number: "01",
    title: "General Service",
    description: "Periodic maintenance, oil changes, brake pads & fluid checks",
  },
  {
    id: 2,
    number: "02",
    title: "Crash Repair",
    description: "Insurance claims, denting, painting & chassis alignment",
  },
  {
    id: 3,
    number: "03",
    title: "Engine Work",
    description: "Complete rebuilds, valve clearance & performance diagnostics",
  },
  {
    id: 4,
    number: "04",
    title: "Custom & Performance",
    description: "Modifications, ECU tuning, and high-performance upgrades",
  },
];

export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const [bgImage, setBgImage] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".service-item");
      if (items) {
        gsap.from(items, {
          opacity: 0,
          x: -50,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
          duration: 0.8,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleHover = (id: number) => {
    setActive(id);
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        opacity: 0.2,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleHoverOut = () => {
    setActive(null);
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 bg-[#050505] overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black mb-16 leading-tight tracking-tighter">
          Our Services
        </h2>

        <div className="space-y-1 border-t border-b border-neutral-800">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-item border-b border-neutral-800 py-6 px-4 md:px-8 cursor-pointer transition-all duration-300"
              onMouseEnter={() => handleHover(service.id)}
              onMouseLeave={handleHoverOut}
            >
              <div className="flex items-center justify-between group">
                <div className="flex-1">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-lg md:text-2xl font-black text-[#ff6b35] tracking-tighter">
                      {service.number}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight group-hover:text-[#ff6b35] transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300 ml-16">
                    {service.description}
                  </p>
                </div>

                <div className="ml-4 text-3xl text-gray-600 group-hover:text-[#ff6b35] transition-colors duration-300">
                  {active === service.id ? "−" : "+"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
