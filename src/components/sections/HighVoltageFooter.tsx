'use client';

import { useState } from 'react';
import { GlassButton } from '@/components/ui/buttons/GlassButton';
import { MotoIcon } from '@/components/ui/icons/MotoIcons';
import { Twitter, Instagram, Linkedin, Github, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ContactModal } from '@/components/interactive/ContactModal';

export default function HighVoltageFooter() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <footer className="relative bg-[#050505] border-t border-[#333]/30 pt-24 pb-12 overflow-hidden">
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

                    {/* Brand Column */}
                    <div className="md:col-span-4">
                        <div className="mb-6 relative w-32 h-12 bg-white/90 p-1 rounded">
                            <Image
                                src="/logo-original.jpg"
                                alt="MotoFit Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-[#a0a0a0] max-w-sm mb-8">
                            Pioneering the future of motorcycle engineering with precision fabrication, digital diagnostics, and high-performance tuning.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex gap-4">
                                {/* Socials Removed as per request */}
                            </div>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div className="md:col-span-2 md:col-start-6">
                        <h4 className="text-white font-bold uppercase tracking-widest mb-6 border-l-2 border-[#ff5e1a] pl-3">Services</h4>
                        <ul className="space-y-4">
                            {['ECU Remapping', 'Fabrication', 'Diagnostics', 'Parts Install', 'Dyno Testing'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-[#999] hover:text-white transition-colors text-sm font-mono flex items-center gap-2 group">
                                        <span className="w-1 h-1 bg-[#ff5e1a] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="md:col-span-2">
                        <h4 className="text-white font-bold uppercase tracking-widest mb-6 border-l-2 border-[#00d1ff] pl-3">Company</h4>
                        <ul className="space-y-4">
                            {['About Us', 'The Garage', 'Team', 'Careers', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === 'Contact' ? '#' : item === 'About Us' ? '/about' : '#'}
                                        onClick={item === 'Contact' ? (e) => { e.preventDefault(); setIsContactOpen(true); } : undefined}
                                        className="text-[#999] hover:text-white transition-colors text-sm font-mono flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-[#00d1ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA Column */}
                    <div className="md:col-span-3">
                        <div className="p-6 border border-[#333]/50 bg-[#0a0a0a] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ff5e1a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h4 className="text-white font-black uppercase text-xl mb-2 relative z-10">Start Your Build</h4>
                            <p className="text-[#666] text-xs mb-6 relative z-10">Ready to transform your machine? Book a consultation today.</p>
                            <GlassButton
                                variant="industrial"
                                className="w-full justify-center relative z-10"
                                onClick={() => setIsContactOpen(true)}
                            >
                                <Zap size={16} className="mr-2" />
                                Initialize
                            </GlassButton>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#333]/30 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#555] font-mono">
                    <p>&copy; 2026 MotoFit 2. Powered by <span className="text-[#ff5e1a]">Hybrid StudioZ</span>.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
                        <Link href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
                    </div>
                </div>
            </div>

            {/* Footer background fx */}
            <div className="absolute inset-0 grid grid-cols-12 gap-4 pointer-events-none opacity-10">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="border-r border-[#333] last:border-r-0" />
                ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff5e1a] via-[#00d1ff] to-[#ff5e1a]" />
        </footer>
    );
}
