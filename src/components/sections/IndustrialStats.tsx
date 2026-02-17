'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';
import { Badge } from '@/components/ui/graphics/Badge';
import gsap from 'gsap';
import { MansiAdminStore } from '@/services/mansi/agents/admin-store';

function Counter({ value, label }: { value: number; label: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 50, damping: 15 });
    const displayValue = useRef(0);

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toLocaleString();
            }
        });
    }, [springValue]);

    return (
        <div className="relative p-6 bg-[#0a0a0a] border border-[#333]/30 flex flex-col items-center justify-center group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#ff5e1a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ff5e1a] opacity-50" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff5e1a] opacity-50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ff5e1a] opacity-50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ff5e1a] opacity-50" />

            <span
                ref={ref}
                className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 relative z-10 font-mono tracking-tighter"
            >
                0
            </span>
            <span className="text-[#a0a0a0] text-xs uppercase tracking-[0.2em] mt-2 relative z-10 text-center">
                {label}
            </span>
        </div>
    );
}

export default function IndustrialStats() {
    const currentYear = new Date().getFullYear();
    const yearsInBusiness = currentYear - 2021;

    // Read from MansiAdminStore (localStorage-backed, falls back to defaults)
    const [adminStats, setAdminStats] = useState({ bikesServiced: 5200, googleReviews: 127, satisfactionPercent: 98 });

    useEffect(() => {
        setAdminStats(MansiAdminStore.getStats());
    }, []);

    const stats = [
        { value: adminStats.bikesServiced, label: "Bikes Serviced" },
        { value: adminStats.googleReviews, label: "Google Reviews" },
        { value: yearsInBusiness, label: "Years Experience" },
        { value: adminStats.satisfactionPercent, label: "Satisfaction %" },
    ];

    return (
        <section id="stats" className="relative py-20 bg-[#050505] border-y border-[#333]/30">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b border-[#333]/30 pb-6">
                    <div>
                        <Badge variant="orange" className="mb-4">Trusted in Ahmedabad</Badge>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-none">
                            Workshop <span className="text-[#ff5e1a]">Stats</span>
                        </h2>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <p className="text-[#666] font-mono text-xs">
                            CHANDKHEDA // SINCE 2021
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <Counter key={i} value={stat.value} label={stat.label} />
                    ))}
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff5e1a]/20 to-transparent pointer-events-none" />
        </section>
    );
}
