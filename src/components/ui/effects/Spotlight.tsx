'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
  color?: 'orange' | 'cyan' | 'white';
  intensity?: number;
  blur?: number;
  followMouse?: boolean;
};

export function Spotlight({
  className,
  size = 200,
  springOptions = { bounce: 0, damping: 25, stiffness: 200 },
  color = 'orange',
  intensity = 0.15,
  blur = 64,
  followMouse = true,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  // Set up parent element
  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        // Only set styles if not already set
        if (!parent.style.position) parent.style.position = 'relative';
        if (!parent.style.overflow) parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement || !followMouse) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement, followMouse]
  );

  // Event listeners
  useEffect(() => {
    if (!parentElement || !followMouse) return;

    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', () => setIsHovered(true));
    parentElement.addEventListener('mouseleave', () => setIsHovered(false));

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', () => setIsHovered(true));
      parentElement.removeEventListener('mouseleave', () => setIsHovered(false));
    };
  }, [parentElement, handleMouseMove, followMouse]);

  // Color gradients based on theme
  const colorGradients = {
    orange: `radial-gradient(circle at center, rgba(255, 94, 26, ${intensity}) 0%, rgba(255, 138, 61, ${intensity * 0.6}) 50%, transparent 80%)`,
    cyan: `radial-gradient(circle at center, rgba(0, 209, 255, ${intensity}) 0%, rgba(51, 220, 255, ${intensity * 0.6}) 50%, transparent 80%)`,
    white: `radial-gradient(circle at center, rgba(255, 255, 255, ${intensity}) 0%, rgba(200, 200, 200, ${intensity * 0.6}) 50%, transparent 80%)`,
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full transition-opacity duration-300',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left: followMouse ? spotlightLeft : '50%',
        top: followMouse ? spotlightTop : '50%',
        transform: followMouse ? 'none' : 'translate(-50%, -50%)',
        background: colorGradients[color],
        filter: `blur(${blur}px)`,
      }}
    />
  );
}

// Factory function for pre-configured spotlights
export function createIndustrialSpotlight() {
  return function IndustrialSpotlight(props: Omit<SpotlightProps, 'color' | 'intensity' | 'blur'>) {
    return (
      <Spotlight
        color="orange"
        intensity={0.2}
        blur={80}
        size={300}
        springOptions={{ bounce: 0, damping: 20, stiffness: 150 }}
        {...props}
      />
    );
  };
}
