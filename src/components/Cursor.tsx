'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;
    let followerX = 0;
    let followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Main cursor (dot)
      posX += (mouseX - posX) * 0.15;
      posY += (mouseY - posY) * 0.15;

      // Follower (ring)
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;

      gsap.set(cursor, { x: posX - 4, y: posY - 4 });
      gsap.set(follower, { x: followerX - 20, y: followerY - 20 });

      requestAnimationFrame(animate);
    };

    // Expand on hover
    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.matches('button, a, [data-hover]') || target.closest('button') || target.closest('a')) {
        gsap.to(follower, { scale: 2, borderWidth: '1px', duration: 0.3 });
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.matches('button, a, [data-hover]') || target.closest('button') || target.closest('a')) {
        gsap.to(follower, { scale: 1, borderWidth: '2px', duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter, true);
    document.addEventListener('mouseleave', onMouseLeave, true);

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter, true);
      document.removeEventListener('mouseleave', onMouseLeave, true);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference" />
      <div ref={followerRef} className="fixed w-10 h-10 border-2 border-white rounded-full pointer-events-none z-40 mix-blend-difference" />
    </>
  );
}
