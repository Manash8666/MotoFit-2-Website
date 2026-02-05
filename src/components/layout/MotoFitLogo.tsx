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
        <div className={cn("relative group/logo flex items-center justify-center", sizes[size], className)}>
            {/* Pulsing Neon Floor/Glow */}
            <div className="absolute inset-0 bg-[#ff5e1a]/10 blur-[30px] rounded-full animate-pulse transition-opacity opacity-0 group-hover/logo:opacity-100" />
            <div className="absolute -inset-2 bg-gradient-to-r from-[#ff5e1a]/20 to-[#00d1ff]/20 blur-[20px] opacity-10 group-hover/logo:opacity-40 transition-opacity" />

            <div className="relative w-full h-full overflow-hidden">
                <Image
                    src="/logo-emblem.png"
                    alt="MotoFit 2 Hub"
                    fill
                    sizes="256px"
                    className="object-contain mix-blend-screen brightness-125 contrast-125 transition-all duration-500 group-hover/logo:scale-105"
                    style={{
                        // Removing the background and adding futuristic neon glow
                        filter: 'drop-shadow(0 0 8px rgba(255, 94, 26, 0.8)) drop-shadow(0 0 25px rgba(255, 94, 26, 0.3)) contrast(1.1) brightness(1.1)'
                    }}
                    priority
                />
            </div>

            {/* Futuristic Overlay: Subtle Scanning Line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                <div className="w-full h-[1px] bg-white/40 animate-scan shadow-[0_0_15px_white]" />
            </div>
        </div>
    );
}
