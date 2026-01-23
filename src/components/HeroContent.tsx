"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroContent() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title characters
      const titleChars = titleRef.current?.querySelectorAll(".char");
      if (titleChars) {
        gsap.from(titleChars, {
          opacity: 0,
          y: 30,
          stagger: 0.05,
          duration: 1,
          ease: "power2.out",
        });
      }

      // Animate subhead
      gsap.from(subheadRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });

      // Animate CTA
      gsap.from(ctaRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 0.6,
        ease: "back.out(1.7)",
      });
    });

    return () => ctx.revert();
  }, []);

  // Split text into characters
  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char">
        {char}
      </span>
    ));
  };

  return (
    <div className="text-center px-4 max-w-5xl mx-auto">
      <h1
        ref={titleRef}
        className="text-9xl md:text-[140px] font-black mb-6 leading-none tracking-tighter whitespace-nowrap"
      >
        {splitText("MOTOFIT 2")}
      </h1>

      <p
        ref={subheadRef}
        className="text-xl md:text-2xl text-gray-300 mb-12 font-light tracking-wide"
      >
        Premium Service, Repair & Customization Center
      </p>

      <button
        ref={ctaRef}
        className="relative px-8 py-4 rounded-lg font-bold text-white text-lg bg-gradient-to-r from-[#ff6b35]/20 to-[#ff6b35]/5 border border-[#ff6b35]/50 backdrop-blur-xl hover:border-[#ff6b35] hover:from-[#ff6b35]/40 hover:to-[#ff6b35]/20 transition-all duration-300 shadow-2xl shadow-[#ff6b35]/20 hover:shadow-[#ff6b35]/50"
      >
        Book a Service
        <span className="absolute inset-0 rounded-lg opacity-0 hover:opacity-20 bg-[#ff6b35] transition-opacity" />
      </button>
    </div>
  );
}
