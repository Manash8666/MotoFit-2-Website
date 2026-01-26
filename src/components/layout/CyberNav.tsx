'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronRight } from 'lucide-react';
import { GlassButton } from '@/components/ui/buttons/GlassButton';
import MotoFitLogo from './MotoFitLogo';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Parts', href: '/parts' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
];

import { useBooking } from '@/context/BookingContext';

export default function CyberNav() {
    const { openBooking } = useBooking();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                    scrolled
                        ? "bg-[#050505]/80 backdrop-blur-md border-[#333]/50 py-3"
                        : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative group">
                        <MotoFitLogo size="md" />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "relative text-sm font-medium uppercase tracking-widest transition-colors hover:text-[#ff5e1a]",
                                    pathname === link.href ? "text-[#ff5e1a]" : "text-[#a0a0a0]"
                                )}
                            >
                                {link.name}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff5e1a]"
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA & Mobile Menu Toggle */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                            <GlassButton variant="industrial" size="sm" className="h-9 text-xs" onClick={() => openBooking('General Inquiry')}>
                                Book Now
                            </GlassButton>
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-white hover:text-[#ff5e1a] transition-colors"
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl pt-24 px-8 md:hidden"
                    >
                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center text-3xl font-bold uppercase text-white hover:text-[#ff5e1a] transition-colors group"
                                    >
                                        {link.name}
                                        <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ff5e1a]" />
                                    </Link>
                                    <div className="h-px w-full bg-[#333]/50 mt-4" />
                                </motion.div>
                            ))}
                            <div className="pt-8">
                                <GlassButton
                                    variant="orange"
                                    className="w-full justify-center"
                                    onClick={() => {
                                        setIsOpen(false);
                                        openBooking('Mobile Nav Contact');
                                    }}
                                >
                                    Contact Us
                                </GlassButton>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
