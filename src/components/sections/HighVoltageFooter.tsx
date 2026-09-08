'use client';

import { GlassButton } from '@/components/ui/buttons/GlassButton';
import { useBooking } from '@/context/BookingContext';
import { Zap, MapPin, Phone, MessageSquare, ShieldCheck, Award } from 'lucide-react';
import Link from 'next/link';
import MotoFitLogo from '../layout/MotoFitLogo';
import InstagramPortal3D from '../interactive/InstagramPortal3D';

export default function HighVoltageFooter() {
    const { openBooking } = useBooking();

    const serviceLinks = [
        { label: 'ECU Remapping & Tuning', href: '/services' },
        { label: 'Accident Repair & Rebuilds', href: '/accidental-bike-repair-ahmedabad' },
        { label: 'Engine Overhaul & Warranty', href: '/services' },
        { label: 'Genuine Parts & Upgrades', href: '/parts' },
        { label: 'Dyno Diagnostics', href: '/services' }
    ];

    const companyLinks = [
        { label: 'About Our Team', href: '/about' },
        { label: 'Build Gallery', href: '/gallery' },
        { label: 'Technical Intel Blog', href: '/blog' },
        { label: 'Contact & Location', href: '/contact' },
        { label: 'Editorial Policy', href: '/editorial-policy' }
    ];

    return (
        <footer className="relative bg-[#050505] border-t border-[#333]/30 pt-20 pb-12 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">

                    {/* Brand & Address Column */}
                    <div className="md:col-span-4 text-center md:text-left">
                        <MotoFitLogo size="lg" className="mb-4 mx-auto md:mx-0" />
                        <p className="text-[#a0a0a0] text-sm max-w-sm mb-6 mx-auto md:mx-0 leading-relaxed font-sans">
                            Ahmedabad&apos;s premier multi-brand motorcycle engineering facility. Aerospace-grade micrometer tolerances, dynamic OBD-2 computer diagnostics, and verifiable engine warranties.
                        </p>

                        <address className="not-italic text-xs text-[#888] space-y-1 mb-6 font-sans">
                            <p className="font-semibold text-white flex items-center justify-center md:justify-start gap-1.5">
                                <MapPin size={13} className="text-[#ff5e1a]" /> MotoFit 2 Workshop
                            </p>
                            <p>Shop No 9, Kirtan Complex, Nigam Nagar</p>
                            <p>Near New CG Road, Chandkheda, Ahmedabad 382424</p>
                            <p className="pt-1">
                                <span className="text-gray-400">Phone: </span>
                                <a href="tel:+917259625881" className="text-[#ff5e1a] hover:underline font-bold">
                                    +91 72596 25881
                                </a>
                            </p>
                        </address>

                        <div className="flex justify-center md:justify-start">
                            <InstagramPortal3D />
                        </div>
                    </div>

                    {/* Links Column 1: Services */}
                    <div className="md:col-span-3 md:col-start-5">
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-l-2 border-[#ff5e1a] pl-3">
                            Services
                        </h3>
                        <ul className="space-y-3 font-sans">
                            {serviceLinks.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-[#999] hover:text-[#ff5e1a] transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1a] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2: Company */}
                    <div className="md:col-span-2">
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-l-2 border-[#00d1ff] pl-3">
                            Company
                        </h3>
                        <ul className="space-y-3 font-sans">
                            {companyLinks.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-[#999] hover:text-[#00d1ff] transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00d1ff] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA Column */}
                    <div className="md:col-span-3">
                        <div className="p-6 border border-[#333]/50 bg-[#0a0a0a] rounded-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ff5e1a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="flex items-center gap-2 text-xs font-mono text-[#ff5e1a] mb-2 uppercase tracking-widest">
                                <Award size={14} /> 4.7★ (162 Google Reviews)
                            </div>
                            <h4 className="text-white font-black uppercase text-lg mb-2 relative z-10">
                                Book Your Inspection
                            </h4>
                            <p className="text-[#888] text-xs mb-5 relative z-10 leading-relaxed font-sans">
                                Complete multi-point checkup, transparent digital estimates, and free pickup across Ahmedabad.
                            </p>
                            <GlassButton
                                variant="industrial"
                                className="w-full justify-center relative z-10"
                                onClick={() => openBooking('Footer Initiation')}
                            >
                                <Zap size={16} className="mr-2" />
                                Schedule Service
                            </GlassButton>
                        </div>
                    </div>
                </div>

                {/* E-E-A-T Credibility, Byline & YMYL Disclaimer */}
                <div className="border-t border-[#222] pt-6 pb-6 text-xs text-[#777] font-sans space-y-2">
                    <p className="leading-relaxed">
                        <strong className="text-gray-300 font-semibold">Technical Integrity &amp; Diagnostic Authority:</strong> Supervised by 
                        <strong className="text-white font-semibold"> Akshat Mohanty</strong>, Founder &amp; Master Motorcycle Diagnostic Specialist (Over a decade in superbike calibration, engine overhauls, and dyno mapping). All workshop repairs adhere to strict manufacturer safety limits.
                    </p>
                    <p className="leading-relaxed text-[11px] text-[#666]">
                        <strong className="text-gray-400">Automotive YMYL Safety Disclaimer:</strong> MotoFit 2 is an independent multi-brand motorcycle engineering and diagnostic workshop. Manufacturer model names and trademarks are used strictly for vehicle fitment identification. The 1-Year Engine Guarantee applies exclusively to qualifying full-engine overhauls executed with genuine parts verified under our official service agreement.
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#333]/30 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#666] font-mono gap-4">
                    <p>
                        &copy; 2026 MotoFit 2 Workshop Pvt. Ltd. Verified Garage in Ahmedabad.
                    </p>
                    <div className="flex flex-wrap items-center gap-6">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">
                            PRIVACY POLICY
                        </Link>
                        <Link href="/terms-of-service" className="hover:text-white transition-colors">
                            TERMS OF SERVICE
                        </Link>
                        <Link href="/editorial-policy" className="hover:text-white transition-colors">
                            EDITORIAL POLICY
                        </Link>
                        <Link href="/contact" className="hover:text-white transition-colors">
                            CONTACT US
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff5e1a] via-[#00d1ff] to-[#ff5e1a]" />
        </footer>
    );
}
