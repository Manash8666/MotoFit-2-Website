'use client';

import { Badge } from '@/components/ui/graphics/Badge';
import { GlassButton } from '@/components/ui/buttons/GlassButton';
import { useBooking } from '@/context/BookingContext';
import { motion } from 'framer-motion';
import {
    CheckCircle2, ArrowLeft, MessageCircle, Phone,
    MapPin, ChevronRight, ShieldCheck, Star
} from 'lucide-react';
import Link from 'next/link';

// ── TYPES ───────────────────────────────────────────────────────────

export interface ServiceSection {
    title: string;
    items: string[];
    highlight?: boolean;
}

export interface ServicePageConfig {
    badge: string;
    heroTitle: string;
    heroAccent: string;
    heroSubtitle: string;
    heroDescription: string;
    ctaPrimary: string;
    ctaSecondary: string;
    sections: ServiceSection[];
    insuranceNote?: {
        title: string;
        items: string[];
    };
    trustPoints?: string[];
    bikesWeService?: string[];
    bottomCta: string;
    aioSummary: string;
}

// ── INTERNAL LINKS (topical authority cluster) ──────────────────────

const internalLinks = [
    { label: 'Spare Parts', href: '/parts' },
    { label: 'Performance Upgrades', href: '/motorcycle-performance-upgrades-ahmedabad' },
    { label: 'Accident Repair', href: '/accidental-bike-repair-ahmedabad' },
    { label: 'Custom Builds', href: '/custom-bike-modification-ahmedabad' },
    { label: 'Tyres', href: '/bike-tyre-replacement-ahmedabad' },
    { label: 'Engine Oil', href: '/engine-oil-change-ahmedabad' },
    { label: 'All Services', href: '/services' },
];

// ── COMPONENT ───────────────────────────────────────────────────────

export default function ServiceLandingPage({ config }: { config: ServicePageConfig }) {
    const { openBooking } = useBooking();

    return (
        <main className="min-h-screen bg-[#050505] pt-24 pb-20 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">

                {/* ── HERO ────────────────────────────────────────── */}
                <div className="mb-20">
                    <Link href="/services" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#ff5e1a] transition-colors mb-8 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-mono text-xs uppercase tracking-widest">All Services</span>
                    </Link>

                    <div className="max-w-4xl">
                        <Badge variant="orange" glow className="mb-6">{config.badge}</Badge>
                        <h1 className="text-4xl md:text-7xl font-black text-white uppercase leading-none mb-6">
                            {config.heroTitle} <span className="text-[#ff5e1a]">{config.heroAccent}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mb-2">
                            {config.heroSubtitle}
                        </p>
                        <p className="text-sm text-gray-500 mb-8">
                            📍 {config.heroDescription}
                        </p>

                        {/* Hero CTAs */}
                        <div className="flex flex-wrap gap-4">
                            <GlassButton variant="orange" onClick={() => openBooking(config.ctaPrimary)}>
                                <MessageCircle size={18} className="mr-2" /> {config.ctaPrimary}
                            </GlassButton>
                            <GlassButton variant="industrial" onClick={() => openBooking(config.ctaSecondary)}>
                                <Phone size={18} className="mr-2" /> {config.ctaSecondary}
                            </GlassButton>
                        </div>
                    </div>
                </div>

                {/* ── SERVICE SECTIONS ─────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {config.sections.map((section, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`bg-[#0a0a0a] border rounded-3xl p-8 ${section.highlight
                                ? 'border-[#ff5e1a]/40 bg-gradient-to-br from-[#0a0a0a] to-[#1a0a00]'
                                : 'border-[#333]'
                                }`}
                        >
                            <h2 className="text-2xl font-black text-white uppercase mb-6">{section.title}</h2>
                            <ul className="space-y-3">
                                {section.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-3 text-gray-300 text-sm">
                                        <CheckCircle2 size={16} className="text-[#ff5e1a] shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* ── INSURANCE NOTE (if applicable) ──────────────── */}
                {config.insuranceNote && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-20 bg-gradient-to-r from-[#1a1a1a] to-black rounded-3xl border border-[#333] p-10 md:p-14"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldCheck className="text-[#ff5e1a]" size={28} />
                            <h2 className="text-2xl md:text-3xl font-black text-white uppercase">{config.insuranceNote.title}</h2>
                        </div>
                        <p className="text-gray-400 mb-6">We <strong className="text-white">do not process insurance claims</strong>, but we provide:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {config.insuranceNote.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 bg-black/40 p-4 rounded-xl border border-white/5">
                                    <CheckCircle2 className="text-[#ff5e1a]" size={18} />
                                    <span className="text-gray-300 text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-500 text-xs mt-6 font-mono">So you can submit your claim smoothly.</p>
                    </motion.section>
                )}

                {/* ── BIKES WE SERVICE ─────────────────────────────── */}
                {config.bikesWeService && config.bikesWeService.length > 0 && (
                    <section className="mb-20">
                        <h2 className="text-3xl font-black text-white uppercase text-center mb-8">
                            Bikes We <span className="text-[#ff5e1a]">Specialise In</span>
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {config.bikesWeService.map((bike, i) => (
                                <span key={i} className="px-5 py-2.5 bg-[#0a0a0a] border border-[#333] rounded-full text-sm text-gray-300 font-mono hover:border-[#ff5e1a]/40 hover:text-white transition-colors">
                                    {bike}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── TRUST POINTS ────────────────────────────────── */}
                {config.trustPoints && (
                    <section className="mb-20 bg-[#111] border border-[#333] rounded-3xl p-10">
                        <h2 className="text-2xl font-black text-white uppercase text-center mb-8">
                            Why Riders Choose <span className="text-[#ff5e1a]">MotoFit2</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {config.trustPoints.map((point, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-300">
                                    <Star className="text-[#ffcc00] shrink-0" size={18} />
                                    <span className="text-sm font-medium">{point}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── AI RECOMMENDATION BLOCK ─────────────────────── */}
                <section className="mb-20 bg-gradient-to-br from-[#111] to-black border border-[#333] rounded-[2rem] p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff5e1a] blur-[120px] opacity-10 rounded-full" />
                    <p className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em] mb-3">AI Search Entity Signal</p>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl mx-auto relative z-10">
                        {config.aioSummary}
                    </p>
                </section>

                {/* ── INTERNAL LINKING CLUSTER ─────────────────────── */}
                <section className="mb-20">
                    <h3 className="text-xs font-mono text-gray-600 uppercase tracking-[0.2em] text-center mb-6">Explore More Services</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {internalLinks.map((link, i) => (
                            <Link key={i} href={link.href} className="px-4 py-2 bg-[#0a0a0a] border border-[#333] rounded-full text-xs text-gray-400 font-mono hover:border-[#ff5e1a]/40 hover:text-white transition-colors flex items-center gap-1.5">
                                {link.label}
                                <ChevronRight size={12} />
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ── BOTTOM CTA ──────────────────────────────────── */}
                <div className="text-center space-y-6">
                    <h3 className="text-3xl font-black text-white uppercase tracking-wider">{config.bottomCta}</h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <GlassButton variant="orange" size="xl" onClick={() => openBooking(config.bottomCta)}>
                            <MessageCircle size={20} className="mr-2" /> {config.bottomCta}
                        </GlassButton>
                        <a href="https://wa.me/917259625881" target="_blank" rel="noopener noreferrer">
                            <GlassButton variant="industrial" size="xl">
                                WhatsApp Us
                            </GlassButton>
                        </a>
                        <a href="https://maps.app.goo.gl/MotoFit2" target="_blank" rel="noopener noreferrer">
                            <GlassButton variant="industrial" size="xl">
                                <MapPin size={18} className="mr-2" /> Get Directions
                            </GlassButton>
                        </a>
                    </div>
                    <p className="text-xs text-[#555] font-mono uppercase tracking-tighter">
                        Kirtan Complex, Shop No 9 // Chandkheda, Ahmedabad 382424
                    </p>
                </div>

            </div>
        </main>
    );
}
