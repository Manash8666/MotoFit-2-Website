'use client';

import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Badge } from '@/components/ui/graphics/Badge';
import { MotoIcon } from '@/components/ui/icons/MotoIcons';
import { ArrowRight, Settings, Wrench, Gauge, Cpu, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: any;
    index: number;
    onClick: () => void;
}

function ServiceCard({ title, description, icon: Icon, index, onClick }: ServiceCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className="group relative border border-[#333]/30 bg-[#0a0a0a] overflow-hidden cursor-pointer"
            onMouseMove={handleMouseMove}
            onClick={onClick}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 94, 26, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full p-8 flex flex-col">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a1a1a] text-[#ff5e1a] group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6" />
                </div>

                <h3 className="mb-4 text-2xl font-black uppercase text-white group-hover:text-[#ff5e1a] transition-colors">
                    {title}
                </h3>

                <p className="mb-8 flex-grow text-[#a0a0a0] leading-relaxed text-sm">
                    {description}
                </p>

                <div className="mt-auto pt-6 border-t border-[#333]/30 flex items-center justify-between">
                    <span className="text-xs font-mono text-[#666] uppercase tracking-widest">
                        SVC_0{index + 1}
                    </span>
                    <ArrowRight className="h-4 w-4 text-[#333] group-hover:text-[#ff5e1a] group-hover:translate-x-1 transition-all" />
                </div>
            </div>

            {/* Decorative corner brackets */}
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 border-t border-r border-[#ff5e1a]" />
            </div>
            <div className="absolute bottom-0 left-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 border-b border-l border-[#ff5e1a]" />
            </div>
        </div>
    );
}

import { useBooking } from '@/context/BookingContext';

export default function HolographicServices() {
    const { openBooking } = useBooking();
    const services = [
        {
            title: 'Bike Service Near Chandkheda',
            description: 'Comprehensive periodic maintenance for 350cc - 1000cc+ bikes in Ahmedabad. Oil change, filter checks, brake overhaul, and chain lubrication.',
            icon: Wrench,
        },
        {
            title: 'Accident Repair in Ahmedabad',
            description: 'Insurance claim assistance, chassis realignment, denting, and painting using OEM color codes. Trusted crash repair near you.',
            icon: ShieldCheck,
        },
        {
            title: 'Engine Rebuilds & Overhauls',
            description: 'Complete engine rebuilds with 3-month warranty. Valve clearance, shim replacement, and crank balancing. Best engine service in Ahmedabad.',
            icon: Settings,
        },
        {
            title: 'Custom Mods & ECU Tuning',
            description: 'Performance exhausts, ECU remapping, aesthetic mods, and full ground-up builds. Top bike customization garage in Gujarat.',
            icon: Gauge,
        },
    ];

    return (
        <section id="services" className="relative py-32 bg-[#050505]">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8">
                <div className="mb-20 max-w-2xl">
                    <Badge variant="cyan" glow className="mb-6">Ahmedabad's Trusted Garage</Badge>
                    <h2 className="text-4xl md:text-6xl font-black uppercase text-white leading-none mb-6">
                        Bike Garage <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ff9e35]">
                            Near You in Ahmedabad
                        </span>
                    </h2>
                    <p className="text-[#a0a0a0] text-lg leading-relaxed">
                        Looking for a reliable motorcycle garage near New CG Road? From routine oil changes to complex engine rebuilds—we treat every bike like it's our own race machine.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                    {services.map((service, i) => (
                        <ServiceCard key={i} index={i} {...service} onClick={() => openBooking(service.title)} />
                    ))}
                </div>
            </div>
        </section>
    );
}
