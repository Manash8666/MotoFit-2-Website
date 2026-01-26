'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MotoFitLogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function MotoFitLogo({ className, size = 'md' }: MotoFitLogoProps) {
    const sizes = {
        sm: 'scale-75 origin-left',
        md: 'scale-100',
        lg: 'scale-125',
        xl: 'scale-150',
    };

    return (
        <div className={cn("inline-flex items-center gap-3 relative group/logo", sizes[size], className)} style={{ transform: 'skewX(-5deg)' }}>
            {/* The Icon: Stylized Piston/Shield */}
            <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Neon Glow Outer */}
                <div className="absolute inset-0 bg-[#ff5e1a] blur-[20px] opacity-30 rounded-full group-hover/logo:opacity-50 transition-opacity animate-pulse" />

                <svg viewBox="0 0 40 40" className="w-full h-full relative z-10 drop-shadow-[0_0_12px_rgba(255,94,26,0.9)]">
                    {/* Futuristic Hexagon/Piston Shape */}
                    <path
                        d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z"
                        fill="none"
                        stroke="#ff5e1a"
                        strokeWidth="3.5"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M20 12 L20 28 M12 20 L28 20"
                        stroke="#00d1ff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_8px_rgba(0,209,255,1)]"
                    />
                </svg>
            </div>

            {/* The Text */}
            <div className="flex flex-col leading-none">
                <span
                    className="text-white font-black italic tracking-tighter text-3xl uppercase"
                    style={{
                        fontFamily: 'var(--font-display)',
                        textShadow: '0 0 20px rgba(255,255,255,0.4), 0 0 8px rgba(255,94,26,0.6)'
                    }}
                >
                    MOTOFIT
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                        className="text-[#00d1ff] font-mono text-[10px] font-black tracking-[0.4em] uppercase"
                        style={{
                            textShadow: '0 0 10px rgba(0,209,255,0.9)'
                        }}
                    >
                        PROTOCOL
                    </span>
                    <div className="relative">
                        <span className="absolute inset-0 text-[#ff5e1a] blur-sm opacity-60">2</span>
                        <span className="text-[#ff5e1a] font-black italic text-2xl relative z-10 drop-shadow-[0_0_15px_rgba(255,94,26,1)]">
                            2
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
