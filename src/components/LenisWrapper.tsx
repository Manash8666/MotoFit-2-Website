"use client";

import { useEffect, useState, createContext, useContext } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

// Create Context
const LenisContext = createContext<Lenis | null>(null);

// Custom Hook
export const useLenis = () => useContext(LenisContext);

export default function LenisWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  // Handle route changes (optional: scroll to top)
  useEffect(() => {
    if (lenis) {
      // lenis.scrollTo(0, { immediate: true }); 
      // Commented out as Next.js handles scroll restoration, 
      // but sometimes manual reset is needed for Lenis.
    }
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
