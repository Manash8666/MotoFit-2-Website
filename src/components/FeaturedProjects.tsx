"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Thunderbird 350 Mod",
    category: "Custom Build",
    color: "from-orange-600/20 to-red-900/20",
    description: "Classic restored with modern performance upgrades",
  },
  {
    id: 2,
    title: "CBR 650R Rebuild",
    category: "Major Service",
    color: "from-blue-600/20 to-indigo-900/20",
    description: "Complete engine overhaul & valve clearance check",
  },
  {
    id: 3,
    title: "Hunter 350 Pro",
    category: "Racing",
    color: "from-red-600/20 to-orange-900/20",
    description: "Track-ready performance machine",
  },
  {
    id: 4,
    title: "Scooty Pep+ Reimagined",
    category: "Electric",
    color: "from-green-600/20 to-emerald-900/20",
    description: "EV conversion of a classic 80s icon",
  },
];

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      const heading = sectionRef.current?.querySelector("h2");
      if (heading) {
        gsap.from(heading, {
          opacity: 0,
          y: 30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Horizontal scroll animation
      const scrollWidth =
        scrollRef.current?.scrollWidth || 0;
      const clientWidth =
        containerRef.current?.clientWidth || 0;
      const distance = scrollWidth - clientWidth;

      gsap.to(scrollRef.current, {
        x: -distance,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          markers: false,
        },
        ease: "none",
      });

      // Card animations
      const cards = scrollRef.current?.querySelectorAll(".project-card");
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 50,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          duration: 0.8,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-4 bg-[#050505] border-t border-neutral-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black mb-20 leading-tight tracking-tighter">
          Featured Projects
        </h2>

        <div
          ref={containerRef}
          className="overflow-hidden"
        >
          <div
            ref={scrollRef}
            className="flex gap-6 w-fit"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card flex-shrink-0 w-80 md:w-96 group cursor-pointer"
              >
                <div className={`relative h-96 overflow-hidden rounded-lg border border-neutral-800 mb-4 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                  <div className="text-center">
                    <div className="text-6xl font-black text-[#ff6b35] opacity-20 mb-4">
                      {project.id}
                    </div>
                    <p className="text-gray-400 text-sm uppercase tracking-widest">
                      {project.category}
                    </p>
                  </div>
                </div>

                {/* Card Info */}
                <div>
                  <p className="text-[#ff6b35] text-xs uppercase tracking-widest mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-1 group-hover:text-[#ff6b35] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#ff6b35]" />
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
}
