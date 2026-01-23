"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  target: number;
  suffix?: string;
}

export default function Counter({ target, suffix = "" }: CounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: target,
        scrollTrigger: {
          trigger: counterRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent =
              Math.floor(counter.value) + suffix;
          }
        },
      });
    });

    return () => ctx.revert();
  }, [target, suffix]);

  return <span ref={counterRef}>0{suffix}</span>;
}
