'use client';

import { Badge } from '@/components/ui/graphics/Badge';
import { GlassButton } from '@/components/ui/buttons/GlassButton';
import { useBooking } from '@/context/BookingContext';
import { motion } from 'framer-motion';
import {
    Zap, Wind, CircleDot, ShieldCheck,
    ChevronRight, ArrowLeft, MessageCircle,
    Activity, Battery, Gauge
} from 'lucide-react';
import Link from 'next/link';

const inventoryCategories = [
    {
        title: "Performance Breathing & Sound",
        icon: <Wind className="text-[#ff5e1a]" size={32} />,
        brands: "Akrapovic, Red Rooster Performance (RRP), K&N, BMC Filters",
        description: "Optimized airflow for the Ahmedabad heat. Every install includes a mandatory spark plug analysis to verify Air-Fuel Ratio (AFR) perfection.",
        features: ["OEM Replacements", "Race-Spec Exhausts", "High-Flow Intake Systems", "Heat-Resistant Gaskets"],
        color: "orange"
    },
    {
        title: "The Brain: ECU & Racing CDIs",
        icon: <Gauge className="text-[#00d1ff]" size={32} />,
        brands: "Powertronic, RapidBike, NMV Racing CDIs",
        description: "From BS6 Piggyback ECUs to timing adjustments for 2-stroke legends like the Yamaha RX 100. We unlock the latent power of your machine.",
        features: ["Digital Tuning", "Stage 1/2 Maps", "Custom Ignition Timing", "Rev-Limit Management"],
        color: "cyan"
    },
    {
        title: "Tyres & Traction (Safety Hub)",
        icon: <CircleDot className="text-[#ffcc00]" size={32} />,
        brands: "Pirelli, Metzeler, Michelin, MRF, CEAT",
        description: "Your only contact with the New CG Road asphalt. Precision laser alignment and wheel balancing included with every change.",
        features: ["Superbike Soft Compounds", "Track Slicks", "Rain-Spec Tread Patterns", "High-Mileage Touring Tyres"],
        color: "yellow"
    },
    {
        title: "Braking & Suspension",
        icon: <ShieldCheck className="text-[#ff3366]" size={32} />,
        brands: "Brembo Master Cylinders, Ohlins Gold Standard, Rolon Brass Kits",
        description: "Deceleration is as vital as speed. We stock Brembo pads and Ohlins components to transform your chassis dynamics.",
        features: ["Radial Master Cylinders", "Sintered Pads", "Monoblock Fixes", "Progressive Fork Springs"],
        color: "red"
    },
    {
        title: "Electricals & Restoration Spares",
        icon: <Battery className="text-[#00ff88]" size={32} />,
        brands: "Amaron, Exide, OEM Genuine Spares (1980-2026)",
        description: "Specialized wiring harness restoration for vintage bikes. Full electrical load testing using industrial-grade diagnostics.",
        features: ["Lithium-Ion Batteries", "Wiring Harness Overhaul", "Digital Dash Spares", "Vintage Gasket Kits"],
        color: "green"
    },
    {
        title: "The Fluids Lab: Engine Oils",
        icon: <Zap className="text-[#ff5e1a]" size={32} />,
        brands: "Motul, Liqui Moly, T-Tex, HP Lubricants",
        description: "Thermal stability for the Ahmedabad summer. We use high-performance synthetics for race-spec machines and reliable HP series for the daily grind.",
        features: ["Motul 300V / 7100 / 5100", "Liqui Moly Street Race 10W50", "T-Tex GT-6100 (J-Tech)", "HP Racer Splendid (BS6)"],
        color: "orange"
    }
];

export default function PartsPage() {
    const { openBooking } = useBooking();

    return (
        <main className="min-h-screen bg-[#050505] pt-24 pb-20 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">

                {/* 1. Header Hero */}
                <div className="mb-20">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#ff5e1a] transition-colors mb-8 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-mono text-xs uppercase tracking-widest">Return to Hangar</span>
                    </Link>

                    <div className="max-w-4xl">
                        <Badge variant="orange" glow className="mb-6">The Parts Lab: Operational</Badge>
                        <h1 className="text-5xl md:text-8xl font-black text-white uppercase leading-none mb-6">
                            The <span className="text-[#ff5e1a]">Hardware</span> Legacy
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl">
                            From vintage <span className="text-white font-bold">1980 RX 100</span> components to <span className="text-[#00d1ff] font-bold">2026 1300cc Superbike</span> electronics—at **Shop No 9**, we are the bridge between "Classic Soul" and "Modern Speed."
                        </p>
                    </div>
                </div>

                {/* 2. Brand Marquee */}
                <div className="bg-[#111] border-y border-[#333] py-6 mb-20 overflow-hidden whitespace-nowrap">
                    <div className="inline-flex animate-infinite-scroll space-x-12 px-10">
                        {["AKRAPOVIC", "BREMBO", "OHLINS", "PIRELLI", "K&N", "POWERTRONIC", "ROLON", "AMARON", "MICHELIN", "METZELER"].map((brand) => (
                            <span key={brand} className="text-2xl font-black text-gray-700 hover:text-white transition-colors cursor-default tracking-tighter">
                                {brand}
                            </span>
                        ))}
                        {/* Duplicate for infinite loop */}
                        {["AKRAPOVIC", "BREMBO", "OHLINS", "PIRELLI", "K&N", "POWERTRONIC", "ROLON", "AMARON", "MICHELIN", "METZELER"].map((brand) => (
                            <span key={`dup-${brand}`} className="text-2xl font-black text-gray-700 hover:text-white transition-colors cursor-default tracking-tighter">
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 3. Inventory Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                    {inventoryCategories.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#0a0a0a] border border-[#333] p-8 rounded-3xl relative overflow-hidden group hover:border-[#ff5e1a]/30 transition-colors"
                        >
                            <div className="relative z-10">
                                <div className="mb-8 flex justify-between items-start">
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                                        {cat.icon}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Stock Protocol</p>
                                        <p className="text-white font-bold text-xs">CERTIFIED GENUINE</p>
                                    </div>
                                </div>

                                <h3 className="text-3xl font-black text-white uppercase mb-4 group-hover:text-[#ff5e1a] transition-colors">{cat.title}</h3>
                                <p className="text-xs font-mono text-[#666] mb-6 tracking-widest">{cat.brands}</p>
                                <p className="text-gray-400 leading-relaxed mb-8">{cat.description}</p>

                                <div className="grid grid-cols-2 gap-4">
                                    {cat.features.map((feat, f) => (
                                        <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                                            <div className="w-1 h-1 rounded-full bg-[#ff5e1a]" />
                                            {feat}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-10 flex gap-4">
                                    <GlassButton
                                        variant="industrial"
                                        className="w-full justify-center"
                                        onClick={() => openBooking(`Parts Inquiry: ${cat.title}`)}
                                    >
                                        Request Spec Sheet
                                    </GlassButton>
                                </div>
                            </div>

                            {/* Decorative Grid BG */}
                            <div className="absolute inset-0 grid grid-cols-6 gap-4 pointer-events-none opacity-5">
                                {[...Array(6)].map((_, j) => (
                                    <div key={j} className="border-r border-white last:border-r-0" />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 4. The Engineering Guarantee */}
                <section className="bg-gradient-to-br from-[#111] to-black border border-[#333] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5e1a] blur-[150px] opacity-10 rounded-full" />

                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-8 relative z-10">
                        The Vintage to <span className="text-[#ff5e1a]">BS6</span> Guarantee
                    </h2>
                    <blockquote className="text-xl md:text-3xl text-gray-300 font-light italic max-w-4xl mx-auto mb-12 relative z-10">
                        "Whether it's an 1980 RX 100 piston ring or a 2026 fuel-injection sensor, Akshat Mohanty ensures every part is 100% Genuine or the World's Best Aftermarket."
                    </blockquote>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <Activity className="text-[#00d1ff]" size={24} />
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">Physics Tested</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <ShieldCheck className="text-[#ff5e1a]" size={24} />
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">OEM Certified</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Zap className="text-[#ffcc00]" size={24} />
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">Quick Displacement</span>
                        </div>
                    </div>
                </section>

                {/* 5. Final CTA */}
                <div className="mt-32 text-center space-y-8">
                    <h3 className="text-3xl font-black text-white uppercase tracking-widest">Ready to Initialize?</h3>
                    <GlassButton
                        variant="orange"
                        size="xl"
                        onClick={() => openBooking('Full Catalog Consultation')}
                        className="group"
                    >
                        <MessageCircle size={20} className="mr-2" />
                        Discuss Your Build Requirements
                    </GlassButton>
                    <p className="text-xs text-[#555] font-mono uppercase tracking-tighter">
                        Secure Connection // Shop No 9 Local Hub
                    </p>
                </div>

            </div>
        </main>
    );
}
