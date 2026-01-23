'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface AdvancedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
    caption?: string;
    overlay?: boolean;
    parallax?: boolean;
    hoverZoom?: boolean;
    className?: string;
    containerClassName?: string;
}

export function AdvancedImage({
    src,
    alt,
    caption,
    overlay = false,
    parallax = false,
    hoverZoom = false,
    className,
    containerClassName,
    ...props
}: AdvancedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!parallax) return;

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 20;
        const y = ((e.clientY - top) / height - 0.5) * 20;

        setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
    };

    return (
        <figure className={cn('group relative', containerClassName)}>
            <div
                className={cn(
                    'relative overflow-hidden rounded-lg',
                    parallax && 'transition-transform duration-300',
                    hoverZoom && 'group-hover:scale-[1.02] transition-transform duration-500'
                )}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={
                    parallax
                        ? { transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }
                        : undefined
                }
            >
                <Image
                    src={src}
                    alt={alt}
                    className={cn(
                        'transition-opacity duration-700',
                        isLoaded ? 'opacity-100' : 'opacity-0',
                        hoverZoom && 'group-hover:scale-110 transition-transform duration-700',
                        className
                    )}
                    onLoadingComplete={() => setIsLoaded(true)}
                    {...props}
                />

                {overlay && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                )}

                {/* Loading skeleton */}
                {!isLoaded && (
                    <div className="absolute inset-0 bg-[#1a1a1a] animate-pulse" />
                )}
            </div>

            {caption && (
                <figcaption className="mt-3 text-sm text-[#999999] text-center">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
