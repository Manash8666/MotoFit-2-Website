'use client';

import { Badge } from '@/components/ui/graphics/Badge';
import { GlassButton } from '@/components/ui/buttons/GlassButton';
import { useBooking } from '@/context/BookingContext';
import { motion } from 'framer-motion';
import {
    Zap, Wind, CircleDot, ShieldCheck,
    ChevronRight, ArrowLeft, MessageCircle,
    Activity, Battery, Gauge, Link2, Palette,
    ChevronDown, Bike, Trophy
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// ── INVENTORY CATEGORIES (existing 6 + 2 new) ──────────────────────

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
        brands: "Pirelli, Metzeler, Michelin, MRF, CEAT, Apollo, TVS Eurogrip",
        description: "Your only contact with the New CG Road asphalt. Precision laser alignment and wheel balancing included with every change. From commuter tyres to superbike radials.",
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
        title: "Chain Sprocket Kits & Drivetrain",
        icon: <Link2 className="text-[#ff5e1a]" size={32} />,
        brands: "Rolon, D.I.D, RK, JT Sprockets, Endurance",
        description: "OEM & performance chain sprocket kits for torque or top speed setups. Laser-aligned installation with O-ring safe solvent bath and ceramic waxing included.",
        features: ["Torque-Optimized Ratios", "Top-Speed Setups", "Gold O-Ring Chains", "Sprocket Wear Analysis"],
        color: "orange"
    },
    {
        title: "Crash Guards & Protection",
        icon: <ShieldCheck className="text-[#00ff88]" size={32} />,
        brands: "Red Rooster, Powerage, Barrel, Zana, SW-Motech",
        description: "Frame sliders, crash guards, tail tidies, fender eliminators, and touring accessories. Built for Ahmedabad traffic and highway rides.",
        features: ["Engine Guards", "Frame Sliders", "Tail Tidy Conversion", "Touring Saddle Stays"],
        color: "green"
    },
    {
        title: "Electricals & Restoration Spares",
        icon: <Battery className="text-[#00ff88]" size={32} />,
        brands: "Exide, Amaron, SF Sonic, Livguard, OEM Genuine (1980-2026)",
        description: "Specialized wiring harness restoration for vintage bikes. Full electrical load testing using industrial-grade diagnostics. Batteries for every bike.",
        features: ["Lithium-Ion Batteries", "Wiring Harness Overhaul", "Digital Dash Spares", "Vintage Gasket Kits"],
        color: "green"
    },
    {
        title: "The Fluids Lab: Engine Oils",
        icon: <Zap className="text-[#ff5e1a]" size={32} />,
        brands: "Motul, Liqui Moly, Mobil, Castrol, Shell, HP Lubricants",
        description: "Thermal stability for the Ahmedabad summer. We use high-performance synthetics for race-spec machines and reliable HP series for the daily grind.",
        features: ["Motul 300V / 7100 / 5100", "Liqui Moly Street Race 10W50", "Castrol Power1 Racing", "Genuine Manufacturer Oils"],
        color: "orange"
    }
];

// ── SHOP BY BIKE ────────────────────────────────────────────────────

const bikeCategories = [
    {
        title: "Scooters",
        emoji: "🛵",
        bikes: "Activa • Jupiter • Access • Ntorq • Dio • RayZR • Burgman • Pleasure",
        color: "#00d1ff"
    },
    {
        title: "Commuters",
        emoji: "🏍️",
        bikes: "Splendor • Shine • Platina • Passion • CT 100",
        color: "#00ff88"
    },
    {
        title: "Street Performance",
        emoji: "⚡",
        bikes: "Apache • Pulsar • FZ • Hornet • Unicorn • Gixxer",
        color: "#ffcc00"
    },
    {
        title: "Performance & Touring",
        emoji: "🏁",
        bikes: "KTM Duke / RC • Dominar • RR310 • BMW G310 • RE Hunter • Classic • Meteor",
        color: "#ff5e1a"
    },
    {
        title: "Cruisers & Retro",
        emoji: "🛣️",
        bikes: "Royal Enfield Classic / Bullet • Jawa • Yezdi",
        color: "#c084fc"
    },
    {
        title: "Superbikes (Parts on Order)",
        emoji: "🔥",
        bikes: "Kawasaki • Triumph • Ducati • Hayabusa • BMW • Honda BigWing",
        color: "#ff3366"
    }
];

// ── FAQ DATA ────────────────────────────────────────────────────────

const faqItems = [
    {
        q: "Where can I repair my accident bike in Ahmedabad?",
        a: "MotoFit2 in Chandkheda provides complete accidental repair with insurance claim support and genuine spare parts."
    },
    {
        q: "Do you do custom bike modifications?",
        a: "Yes. We build performance, touring and styling setups for Royal Enfield, KTM, Pulsar and superbikes."
    },
    {
        q: "Do you install the parts you sell?",
        a: "Yes. All parts are professionally installed in our garage with proper torque specs and alignment."
    },
    {
        q: "Can I upgrade my chain sprocket for better acceleration?",
        a: "Yes. Performance sprocket kits for torque or top speed setups are available with laser-aligned installation."
    },
    {
        q: "Do you provide ECU upgrades?",
        a: "We support ECU remap solutions and performance electronics for compatible bikes including BS6 piggyback ECUs."
    }
];

// ── BRAND LIST ──────────────────────────────────────────────────────

const brandMarquee = [
    "AKRAPOVIC", "BREMBO", "OHLINS", "PIRELLI", "K&N", "POWERTRONIC",
    "ROLON", "AMARON", "MICHELIN", "METZELER", "MOTUL", "LIQUI MOLY",
    "ENDURANCE", "UNO MINDA", "RED ROOSTER", "CEAT", "MRF", "EXIDE",
    "SHELL", "BOSCH", "NGK", "SKF"
];

export default function PartsPage() {
    const { openBooking } = useBooking();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

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
                        <Badge variant="orange" glow className="mb-6">Genuine Spares • Aftermarket Upgrades • Custom Builds</Badge>
                        <h1 className="text-5xl md:text-8xl font-black text-white uppercase leading-none mb-6">
                            The <span className="text-[#ff5e1a]">Hardware</span> Legacy
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl">
                            From vintage <span className="text-white font-bold">1980 RX 100</span> components to <span className="text-[#00d1ff] font-bold">2026 Superbike</span> electronics — spare parts, performance upgrades, accidental repair parts & custom build kits. All at <span className="text-white font-bold">Shop No 9</span>.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 mt-8">
                            <GlassButton variant="orange" onClick={() => openBooking('Parts Inquiry')}>
                                <MessageCircle size={18} className="mr-2" /> Shop Parts by Bike
                            </GlassButton>
                            <GlassButton variant="industrial" onClick={() => openBooking('Accident Repair Inquiry')}>
                                <ShieldCheck size={18} className="mr-2" /> Repair My Bike
                            </GlassButton>
                            <GlassButton variant="industrial" onClick={() => openBooking('Custom Build Inquiry')}>
                                <Palette size={18} className="mr-2" /> Plan a Custom Build
                            </GlassButton>
                        </div>
                    </div>
                </div>

                {/* 2. Brand Marquee (Expanded) */}
                <div className="bg-[#111] border-y border-[#333] py-6 mb-20 overflow-hidden whitespace-nowrap">
                    <div className="inline-flex animate-infinite-scroll space-x-12 px-10">
                        {brandMarquee.map((brand) => (
                            <span key={brand} className="text-2xl font-black text-gray-700 hover:text-white transition-colors cursor-default tracking-tighter">
                                {brand}
                            </span>
                        ))}
                        {brandMarquee.map((brand) => (
                            <span key={`dup-${brand}`} className="text-2xl font-black text-gray-700 hover:text-white transition-colors cursor-default tracking-tighter">
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 3. Inventory Grid (8 Categories) */}
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

                {/* 4. Shop By Bike Section */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <Badge variant="cyan" glow className="mb-4">Find Parts for Your Machine</Badge>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase">
                            Shop By <span className="text-[#ff5e1a]">Bike</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bikeCategories.map((cat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-[#0a0a0a] border border-[#333] rounded-2xl p-8 hover:border-[#ff5e1a]/40 transition-all cursor-pointer group"
                                onClick={() => openBooking(`Parts for: ${cat.title}`)}
                            >
                                <div className="text-4xl mb-4">{cat.emoji}</div>
                                <h3 className="text-xl font-black text-white uppercase mb-3 group-hover:text-[#ff5e1a] transition-colors">{cat.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{cat.bikes}</p>
                                <div className="mt-4 flex items-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: cat.color }}>
                                    <span>Find Parts</span>
                                    <ChevronRight size={14} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 5. OEM & Performance Brands */}
                <section className="mb-20 bg-[#111] border border-[#333] rounded-3xl p-12 text-center">
                    <Badge variant="orange" className="mb-4">Trusted Supply Chain</Badge>
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-8">
                        OEM & Performance <span className="text-[#ff5e1a]">Brands</span>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-mono text-gray-500">
                        {["Bosch", "Endurance", "Uno Minda", "Varroc", "Lumax", "SKF", "NTN", "NGK", "Suprajit", "Red Rooster", "Powerage", "Barrel", "K&N", "BMC", "Rolon", "D.I.D"].map((brand) => (
                            <span key={brand} className="px-4 py-2 bg-black/50 border border-[#333] rounded-full hover:border-[#ff5e1a]/40 hover:text-white transition-colors">
                                {brand}
                            </span>
                        ))}
                    </div>
                </section>

                {/* 6. The Engineering Guarantee */}
                <section className="bg-gradient-to-br from-[#111] to-black border border-[#333] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden mb-20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5e1a] blur-[150px] opacity-10 rounded-full" />

                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-8 relative z-10">
                        The Vintage to <span className="text-[#ff5e1a]">BS6</span> Guarantee
                    </h2>
                    <blockquote className="text-xl md:text-3xl text-gray-300 font-light italic max-w-4xl mx-auto mb-12 relative z-10">
                        &quot;Whether it&apos;s an 1980 RX 100 piston ring or a 2026 fuel-injection sensor, Akshat Mohanty ensures every part is 100% Genuine or the World&apos;s Best Aftermarket.&quot;
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

                {/* 7. Featured Snippet FAQ */}
                <section className="mb-20 max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <Badge variant="cyan" className="mb-4">Frequently Asked</Badge>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase">
                            Quick <span className="text-[#ff5e1a]">Answers</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqItems.map((faq, i) => (
                            <div
                                key={i}
                                className="bg-[#0a0a0a] border border-[#333] rounded-2xl overflow-hidden hover:border-[#ff5e1a]/30 transition-colors"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <h3 className="text-white font-bold text-lg pr-4">{faq.q}</h3>
                                    <ChevronDown
                                        size={20}
                                        className={`text-[#ff5e1a] shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-[#333]/50 pt-4">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 8. Local SEO Content Block */}
                <section className="mb-20 bg-[#0a0a0a] border border-[#333] rounded-3xl p-10">
                    <p className="text-gray-400 text-sm leading-relaxed text-center max-w-3xl mx-auto">
                        Looking for <span className="text-white font-bold">bike accident repair</span>, <span className="text-white font-bold">performance upgrades</span> or <span className="text-white font-bold">spare parts in Chandkheda Ahmedabad</span>? MotoFit2 is the one-stop solution near <span className="text-[#ff5e1a]">Motera, Sabarmati, Ranip & Gota</span>. Genuine OEM, aftermarket and performance parts for scooters to superbikes — installed at our garage.
                    </p>
                </section>

                {/* 9. Final CTA */}
                <div className="text-center space-y-8">
                    <h3 className="text-3xl font-black text-white uppercase tracking-widest">Ready to Initialize?</h3>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <GlassButton
                            variant="orange"
                            size="xl"
                            onClick={() => openBooking('Full Catalog Consultation')}
                            className="group"
                        >
                            <MessageCircle size={20} className="mr-2" />
                            Discuss Your Build
                        </GlassButton>
                        <GlassButton
                            variant="industrial"
                            size="xl"
                            onClick={() => openBooking('Accident Repair Estimate')}
                            className="group"
                        >
                            <ShieldCheck size={20} className="mr-2" />
                            Get Repair Estimate
                        </GlassButton>
                    </div>
                    <p className="text-xs text-[#555] font-mono uppercase tracking-tighter">
                        Secure Connection // Shop No 9 Local Hub // Chandkheda, Ahmedabad
                    </p>
                </div>

            </div>
        </main>
    );
}
