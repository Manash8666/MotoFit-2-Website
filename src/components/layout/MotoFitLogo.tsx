'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface MotoFitLogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function MotoFitLogo({ className, size = 'md' }: MotoFitLogoProps) {
    const sizes = {
        sm: 'w-24 h-8',
        md: 'w-32 h-11',
        lg: 'w-40 h-14',
        xl: 'w-56 h-20',
    };

    return (
        <div className={cn("relative group/logo", sizes[size], className)} style={{ transform: 'skewX(-2deg)' }}>
            {/* Pulsing Neon Floor/Glow */}
            <div className="absolute inset-0 bg-[#ff5e1a]/20 blur-[25px] rounded-full animate-pulse transition-opacity opacity-0 group-hover/logo:opacity-100" />
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ff5e1a]/40 to-[#00d1ff]/40 blur-[15px] opacity-10 group-hover/logo:opacity-30 transition-opacity" />

            <div className="relative w-full h-full overflow-hidden">
                <Image
                    src="/logo-original.jpg"
                    alt="MotoFit 2 Logo"
                    fill
                    className="object-contain mix-blend-screen brightness-125 contrast-125 drop-shadow-[0_0_12px_rgba(255,94,26,0.8)] sm:drop-shadow-[0_0_15px_rgba(255,94,26,1)]"
                    style={{
                        // This filter significantly boosts the "Neon" look and masks darker background artifacts
                        filter: 'drop-shadow(0 0 8px rgba(255, 94, 26, 0.7)) drop-shadow(0 0 20px rgba(255, 94, 26, 0.3)) brightness(1.1) contrast(1.1)'
                    }}
                    priority
                />
            </div>

            {/* Futuristic Overlay: Subtle Scanning Line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <div className="w-full h-[1px] bg-white/50 animate-scan shadow-[0_0_10px_white]" />
            </div>
        </div>
    );
}
