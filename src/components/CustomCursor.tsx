"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current || !dotRef.current) return;

      const x = e.clientX;
      const y = e.clientY;

      cursorRef.current.style.left = x + "px";
      cursorRef.current.style.top = y + "px";

      dotRef.current.style.left = x + "px";
      dotRef.current.style.top = y + "px";
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        if (cursorRef.current) {
          cursorRef.current.classList.add("scale-150");
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        if (cursorRef.current) {
          cursorRef.current.classList.remove("scale-150");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border border-[#ff6b35] rounded-full pointer-events-none z-[9999] transition-transform duration-200"
        style={{
          transform: "translate(-50%, -50%)",
          display: "none",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.display = "block";
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed w-1 h-1 bg-[#ff6b35] rounded-full pointer-events-none z-[9999]"
        style={{
          transform: "translate(-50%, -50%)",
          display: "none",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.display = "block";
        }}
      />
      <style>{`
        body {
          cursor: none;
        }
      `}</style>
    </>
  );
}
