'use client';

import { ShieldCheck, PackageCheck, Star, Calculator, Camera, Wrench, Laptop, Thermometer } from 'lucide-react';
import React from 'react';

const tier1Badges = [
    {
        icon: ShieldCheck,
        title: "Zero-Jugaad Engine Warranty",
        sub: "1-Year Guarantee on Full Engine Overhauls. You will not find this anywhere else.",
        color: "text-[#ff5e1a]",
        bg: "bg-[#ff5e1a]/10",
        border: "border-[#ff5e1a]/30"
    },
    {
        icon: PackageCheck,
        title: "100% Genuine OEM Sourced",
        sub: "No first-copy or duplicate spares. We unbox everything right in front of you.",
        color: "text-[#ff5e1a]",
        bg: "bg-[#ff5e1a]/10",
        border: "border-[#ff5e1a]/30"
    },
    {
        icon: Star,
        title: "Ahmedabad's Elite Rated",
        sub: "Verified 4.9+ Google Reviews from hundreds of hardcore superbikers.",
        color: "text-[#ff5e1a]",
        bg: "bg-[#ff5e1a]/10",
        border: "border-[#ff5e1a]/30"
    },
    {
        icon: Calculator,
        title: "Transparent Job-Cards",
        sub: "Every single rupee is electronically mapped. Absolutely zero hidden 'coolant charges'.",
        color: "text-[#ff5e1a]",
        bg: "bg-[#ff5e1a]/10",
        border: "border-[#ff5e1a]/30"
    }
];

const tier2Badges = [
    {
        icon: Camera,
        title: "Live WhatsApp Bay-Updates",
        sub: "Watch your bike's surgery live. You see exactly what our master mechanics see.",
        color: "text-[#00d1ff]",
        bg: "bg-[#00d1ff]/10",
        border: "border-[#00d1ff]/30"
    },
    {
        icon: Wrench,
        title: "Micrometer-Precise Tolerances",
        sub: "We never assemble top-ends by 'feel'. Everything is torqued exactly to manufacturer specs.",
        color: "text-[#00d1ff]",
        bg: "bg-[#00d1ff]/10",
        border: "border-[#00d1ff]/30"
    },
    {
        icon: Laptop,
        title: "OBD-2 Dyno Diagnostics",
        sub: "Real-time ECU electrical mapping validation, eliminating all blind mechanical guessing.",
        color: "text-[#00d1ff]",
        bg: "bg-[#00d1ff]/10",
        border: "border-[#00d1ff]/30"
    },
    {
        icon: Thermometer,
        title: "Ahmedabad Climate Prep",
        sub: "Fluid and viscosity tuning specifically engineered for the 45°C ambient Visat traffic.",
        color: "text-[#00d1ff]",
        bg: "bg-[#00d1ff]/10",
        border: "border-[#00d1ff]/30"
    }
];

export default function GlobalTrustNetwork() {
    return (
        <section className="w-full bg-[#050505] border-t border-[#333]/30 pt-16 pb-20 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                        BETTER THAN AUTHORIZED. <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-300">PROVE IT.</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
                        Why trust your machine to the MotoFit 2 Engineering Lab over standard mechanics or rigid corporate showrooms? Because we operate on a strictly dual-tiered trust protocol.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* Tier 1 Vertical List */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-[#ff5e1a]/50"></div>
                            <h3 className="text-[#ff5e1a] font-bold uppercase tracking-widest text-sm text-center">Tier 1: Trust Foundations</h3>
                            <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-[#ff5e1a]/50"></div>
                        </div>

                        {tier1Badges.map((badge, i) => (
                            <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border ${badge.border} bg-[#0a0a0a] hover:bg-[#111] transition-colors`}>
                                <div className={`p-3 rounded-lg ${badge.bg} ${badge.color} flex-shrink-0`}>
                                    <badge.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-1">{badge.title}</h4>
                                    <p className="text-gray-400 text-xs leading-relaxed">{badge.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tier 2 Vertical List */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-[#00d1ff]/50"></div>
                            <h3 className="text-[#00d1ff] font-bold uppercase tracking-widest text-sm text-center">Tier 2: Competitive Edge</h3>
                            <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-[#00d1ff]/50"></div>
                        </div>

                        {tier2Badges.map((badge, i) => (
                            <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border ${badge.border} bg-[#0a0a0a] hover:bg-[#111] transition-colors`}>
                                <div className={`p-3 rounded-lg ${badge.bg} ${badge.color} flex-shrink-0`}>
                                    <badge.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-1">{badge.title}</h4>
                                    <p className="text-gray-400 text-xs leading-relaxed">{badge.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
