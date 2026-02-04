"use client";

import { ShieldCheck, Tags, Wrench } from "lucide-react";

const badges = [
    {
        icon: ShieldCheck,
        title: "Genuine Parts Only",
        description: "We use only OEM or high-grade aftermarket parts.",
    },
    {
        icon: Tags,
        title: "Transparent Pricing",
        description: "No hidden costs. You approve every rupee spent.",
    },
    {
        icon: Wrench,
        title: "Expert Mechanics",
        description: "Trained technicians for Superbikes & Cruisers.",
    },
];

export default function TrustBadges() {
    return (
        <div className="w-full bg-[#0a0a0a] border-y border-neutral-800 py-8">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
                {badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-4 group">
                        <div className="p-3 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff6b35] group-hover:bg-[#ff6b35] group-hover:text-white transition-all duration-300">
                            <badge.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold uppercase tracking-wide text-sm">
                                {badge.title}
                            </h3>
                            <p className="text-gray-400 text-xs max-w-[200px]">
                                {badge.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
