'use client';

import { Badge } from '@/components/ui/graphics/Badge';
import { GlassButton } from '@/components/ui/buttons/GlassButton';
import { useBooking } from '@/context/BookingContext';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const parts = [
    {
        id: '1',
        name: 'Akrapovic & RRP Systems',
        brand: 'Akrapovic',
        category: 'Exhausts',
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ebcc6?auto=format&fit=crop&q=80',
        description: 'From 100cc performance to Superbike titanium flow. Including AFR optimization for Ahmedabad heat.',
        priceRange: 'Premium Hardware',
    },
    {
        id: '2',
        name: 'Powertronic & Racing CDIs',
        brand: 'Powertronic',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80',
        description: 'Unlocking hidden potential for BS6 engines and timing adjustments for vintage legends.',
        priceRange: 'Surgical Tuning',
    },
    {
        id: '3',
        name: 'Pirelli & Metzeler Spec',
        brand: 'Pirelli',
        category: 'Tyres',
        image: 'https://images.unsplash.com/photo-1615172282427-9a5752d358cd?auto=format&fit=crop&q=80',
        description: 'Maximum traction for the New CG Road. Precision wheel alignment included with every change.',
        priceRange: 'Absolute Grip',
    },
    {
        id: '4',
        name: 'High-Performance Fluids',
        brand: 'Motul/Liqui-Moly',
        category: 'Oils',
        image: 'https://images.unsplash.com/photo-1597838816882-4435b1977fbe?auto=format&fit=crop&q=80',
        description: 'Elite lubrication from 300V Race Synthetic to HP Racer Splendid for BS6 commuters.',
        priceRange: 'Thermal Guard',
    },
];

export default function PartsCatalog() {
    const { openBooking } = useBooking();

    const handleRequestPrice = (partName: string) => {
        openBooking(`System Inquiry: ${partName}`);
    };

    return (
        <section className="relative py-32 bg-[#050505] overflow-hidden border-t border-[#333]/30">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Header */}
                <div className="mb-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-2xl">
                            <Badge variant="orange" glow className="mb-6">The Parts Lab</Badge>
                            <h2 className="text-4xl md:text-7xl font-black text-white uppercase leading-none mb-6">
                                Vintage 1980 to <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e1a] to-[#ff9e35]">
                                    2026 Engineering
                                </span>
                            </h2>
                            <p className="text-[#a0a0a0] text-lg">
                                We are the bridge between classic soul and modern speed. Every component in our inventory at **Shop No 9** is curated for absolute reliability on Ahmedabad roads.
                            </p>
                        </div>
                        <div className="shrink-0 pb-2">
                            <Link href="/parts">
                                <GlassButton variant="industrial" size="xl">
                                    Explore Full Inventory
                                </GlassButton>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Parts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {parts.map((part) => (
                        <div
                            key={part.id}
                            className="group bg-[#0a0a0a] border border-[#333] rounded-2xl overflow-hidden hover:border-[#ff5e1a]/50 transition-all duration-500"
                        >
                            <div className="aspect-[16/10] relative overflow-hidden">
                                <Image
                                    src={part.image}
                                    alt={part.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                <div className="absolute top-4 left-4">
                                    <span className="text-[10px] font-mono font-bold tracking-widest bg-black/80 text-white px-3 py-1 rounded-full border border-white/10 uppercase">
                                        {part.brand}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-mono text-[#ff5e1a] uppercase tracking-[0.2em]">{part.category}</span>
                                    <h3 className="text-2xl font-black text-white group-hover:text-[#ff5e1a] transition-colors">{part.name}</h3>
                                    <p className="text-[#888] text-sm leading-relaxed">{part.description}</p>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-[#333]/50">
                                    <span className="text-white font-mono text-sm uppercase tracking-tighter">{part.priceRange}</span>
                                    <button
                                        onClick={() => handleRequestPrice(part.name)}
                                        className="text-[#ff5e1a] hover:text-white transition-colors"
                                    >
                                        <MessageCircle size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
