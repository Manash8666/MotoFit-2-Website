"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Counter from "./Counter";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "150+", description: "Custom Builds" },
  { label: "2.4k", description: "PWA Users" },
  { label: "100%", description: "Precision" },
  { label: "Ahmedabad", description: "HQ" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        duration: 0.8,
        ease: "power2.out",
      });

      // Animate each stat card
      const cards = gridRef.current?.querySelectorAll(".stat-card");
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-[#050505] border-t border-b border-neutral-800"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="stat-card bg-[#050505] p-8 md:p-12 flex flex-col items-center justify-center text-center border-l border-b border-neutral-800"
            >
              <div className="text-4xl md:text-5xl font-black text-[#ff6b35] mb-3 tracking-tighter">
                {stat.label.match(/^\d/) ? (
                  <Counter target={parseInt(stat.label)} suffix={stat.label.replace(/^\d+/, "")} />
                ) : (
                  stat.label
                )}
              </div>
              <p className="text-gray-400 uppercase text-xs tracking-widest">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
