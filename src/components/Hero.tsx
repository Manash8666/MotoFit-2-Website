"use client";

import { Suspense } from "react";
import Background3D from "./Background3D";
import HeroContent from "./HeroContent";
import HeroImageSlider from "./HeroImageSlider";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Image Slider */}
      <HeroImageSlider />

      {/* 3D Background - Kept as subtle overlay */}
      <div className="absolute inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none">
        <Suspense fallback={null}>
          <Background3D />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <HeroContent />
      </div>
    </section>
  );
}
