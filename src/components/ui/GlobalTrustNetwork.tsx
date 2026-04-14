'use client';

import { ShieldCheck, PackageCheck, Star, Calculator, Camera, Wrench, Laptop, Thermometer } from 'lucide-react';
import React from 'react';
import { Spotlight } from '@/components/ui/effects/Spotlight';

const tier1Badges = [
    {
        icon: ShieldCheck,
        title: "Zero-Jugaad Engine Warranty",
        sub: "1-Year Guarantee on Full Engine Overhauls. You will not find this anywhere else.",
        color: "text-[#ff5e1a]",
        bg: "bg-[#ff5e1a]/10",
        border: "border-[#ff5e1a]/20",
        spotlightColor: 'orange' as const
    },
    {
        icon: PackageCheck,
        title: "100% Genuine OEM Sourced",
        sub: "No first-copy or duplicate spares. We unbox everything right in front of you.",
        color: "text-[#ff5e1a]",
        bg: "bg-[#ff5e1a]/10",
        border: "border-[#ff5e1a]/20",
        spotlightColor: 'orange' as const
    },
    {
        icon: Star,
        title: "Ahmedabad's Elite Rated",
        sub: "Verified 4.9+ Google Reviews from hundreds of hardcore superbikers.",
        color: "text-[#ff5e1a]",
        bg: "bg-[#ff5e1a]/10",
        border: "border-[#ff5e1a]/20",
        spotlightColor: 'orange' as const
    },
    {
        icon: Calculator,
        title: "Transparent Job-Cards",
        sub: "Every single rupee is electronically mapped. Absolutely zero hidden 'coolant charges'.",
        color: "text-[#ff5e1a]",
        bg: "bg-[#ff5e1a]/10",
        border: "border-[#ff5e1a]/20",
        spotlightColor: 'orange' as const
    }
];

const tier2Badges = [
    {
        icon: Camera,
        title: "Live WhatsApp Bay-Updates",
        sub: "Watch your bike's surgery live. You see exactly what our master mechanics see.",
        color: "text-[#00d1ff]",
        bg: "bg-[#00d1ff]/10",
        border: "border-[#00d1ff]/20",
        spotlightColor: 'cyan' as const
    },
    {
        icon: Wrench,
        title: "Micrometer-Precise Tolerances",
        sub: "We never assemble top-ends by 'feel'. Everything is torqued exactly to manufacturer specs.",
        color: "text-[#00d1ff]",
        bg: "bg-[#00d1ff]/10",
        border: "border-[#00d1ff]/20",
        spotlightColor: 'cyan' as const
    },
    {
        icon: Laptop,
        title: "OBD-2 Dyno Diagnostics",
        sub: "Real-time ECU electrical mapping validation, eliminating all blind mechanical guessing.",
        color: "text-[#00d1ff]",
        bg: "bg-[#00d1ff]/10",
        border: "border-[#00d1ff]/20",
        spotlightColor: 'cyan' as const
    },
    {
        icon: Thermometer,
        title: "Ahmedabad Climate Prep",
        sub: "Fluid and viscosity tuning specifically engineered for the 45°C ambient Visat traffic.",
        color: "text-[#00d1ff]",
        bg: "bg-[#00d1ff]/10",
        border: "border-[#00d1ff]/20",
        spotlightColor: 'cyan' as const
    }
];

export default function GlobalTrustNetwork() {
    return (
        <section className="w-full bg-[#050505] border-t border-[#1a1a1a] pt-20 pb-24 relative overflow-hidden">
            {/* Background Texture & Gradients */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/textures/carbon-fibre.png')] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-full bg-gradient-to-b from-[#111111] to-transparent pointer-events-none opacity-50" />
            
            <div className="max-w-[90rem] mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 
                        className="text-3xl md:text-6xl tracking-[0.08em] md:tracking-[0.15em] text-white mb-6 uppercase" 
                        style={{ fontFamily: 'var(--font-display)', fontStretch: 'expanded' }}
                    >
                        BETTER THAN AUTHORIZED. <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-300">PROVE IT.</span>
                    </h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-lg leading-relaxed">
                        Why trust your machine to the MotoFit 2 Engineering Lab over standard mechanics or rigid corporate showrooms? Because we operate on a strictly dual-tiered trust protocol.
                    </p>
                </div>

                <div className="flex flex-col gap-16">
                    
                    {/* Tier 1 Grid */}
                    <div>
                        <div className="flex items-center gap-4 mb-8 max-w-4xl mx-auto">
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#ff5e1a]/40"></div>
                            <h3 className="text-[#ff5e1a] font-bold uppercase tracking-[0.2em] text-xs md:text-sm text-center">Tier 1: Trust Foundations</h3>
                            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#ff5e1a]/40"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {tier1Badges.map((badge, i) => (
                                <div key={i} className={`group relative p-8 rounded-2xl border ${badge.border} bg-[#0a0a0a] overflow-hidden flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#ff5e1a]/50 hover:shadow-[0_0_30px_rgba(255,94,26,0.1)]`}>
                                    <Spotlight 
                                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                                        color={badge.spotlightColor} 
                                        intensity={0.15} 
                                        size={250} 
                                    />
                                    <div className={`p-5 rounded-2xl ${badge.bg} ${badge.color} mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                                        <badge.icon size={36} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-white font-black uppercase tracking-widest text-sm mb-3 relative z-10 leading-tight">{badge.title}</h4>
                                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed relative z-10">{badge.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tier 2 Grid */}
                    <div>
                        <div className="flex items-center gap-4 mb-8 max-w-4xl mx-auto">
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#00d1ff]/40"></div>
                            <h3 className="text-[#00d1ff] font-bold uppercase tracking-[0.2em] text-xs md:text-sm text-center">Tier 2: Competitive Edge</h3>
                            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#00d1ff]/40"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {tier2Badges.map((badge, i) => (
                                <div key={i} className={`group relative p-8 rounded-2xl border ${badge.border} bg-[#0a0a0a] overflow-hidden flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#00d1ff]/50 hover:shadow-[0_0_30px_rgba(0,209,255,0.1)]`}>
                                    <Spotlight 
                                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                                        color={badge.spotlightColor} 
                                        intensity={0.15} 
                                        size={250} 
                                    />
                                    <div className={`p-5 rounded-2xl ${badge.bg} ${badge.color} mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                                        <badge.icon size={36} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-white font-black uppercase tracking-widest text-sm mb-3 relative z-10 leading-tight">{badge.title}</h4>
                                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed relative z-10">{badge.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
