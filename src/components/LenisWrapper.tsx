"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Disabled smooth scroll - using native scroll for better performance
  // and to prevent shaking/jank issues
  return (
    <div>
      {children}
    </div>
  );
}
