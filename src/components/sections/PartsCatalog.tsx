'use client';

import { Badge } from '@/components/ui/graphics/Badge';
import { GlassButton } from '@/components/ui/buttons/GlassButton';
import { useBooking } from '@/context/BookingContext';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';

const parts = [
    {
        id: '1',
        name: 'Akrapovic Slip-On Titanium',
        brand: 'Akrapovic',
        category: 'Exhaust',
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ebcc6?auto=format&fit=crop&q=80',
        description: 'Race-spec titanium slip-on. +5HP, -3kg. EC Approved.',
        priceRange: '₹75,000 - ₹1,50,000',
    },
    {
        id: '2',
        name: 'Brembo M4 Radial Caliper',
        brand: 'Brembo',
        category: 'Brakes',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80',
        description: 'World Superbike-spec monoblock caliper. 4-piston, 108mm.',
        priceRange: '₹45,000 - ₹90,000',
    },
    {
        id: '3',
        name: 'Öhlins TTX GP Rear Shock',
        brand: 'Öhlins',
        category: 'Suspension',
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80',
        description: 'MotoGP-derived rear shock. Gas-pressurized, fully adjustable.',
        priceRange: '₹85,000 - ₹1,80,000',
    },
    {
        id: '4',
        name: 'K&N High-Flow Air Filter',
        brand: 'K&N',
        category: 'Intake',
        image: 'https://images.unsplash.com/photo-1629813291523-27c5418b7654?auto=format&fit=crop&q=80',
        description: 'Reusable high-flow filter. Improved throttle response.',
        priceRange: '₹5,000 - ₹12,000',
    },
    {
        id: '5',
        name: 'Pirelli Diablo Rosso IV',
        brand: 'Pirelli',
        category: 'Tyres',
        image: 'https://images.unsplash.com/photo-1615172282427-9a5752d358cd?auto=format&fit=crop&q=80',
        description: 'Hypersport tyre. Silica compound, dual-layer construction.',
        priceRange: '₹18,000 - ₹28,000 (Pair)',
    },
    {
        id: '6',
        name: 'Rapid Bike EVO ECU Module',
        brand: 'Rapid Bike',
        category: 'ECU',
        image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80',
        description: 'Plug-and-play ECU module. Self-learning fuel mapping.',
        priceRange: '₹25,000 - ₹55,000',
    },
];

export default function PartsCatalog() {
    const { openBooking } = useBooking();

    const handleRequestPrice = (partName: string) => {
        openBooking(`Price Inquiry: ${partName}`);
    };

    return (
        <section className="relative py-24 bg-[#050505] overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Header */}
                <div className="mb-12 text-center">
                    <Badge variant="cyan" glow className="mb-4">Premium Parts</Badge>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-4">
                        Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d1ff] to-[#00a8cc]">Catalog</span>
                    </h2>
                    <p className="text-[#666] max-w-xl mx-auto">
                        We source the best aftermarket parts in the world. Request a quote for your machine.
                    </p>
                </div>

                {/* Parts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {parts.map((part) => (
                        <div
                            key={part.id}
                            className="group bg-[#0a0a0a] border border-[#333] rounded-xl overflow-hidden hover:border-[#00d1ff]/50 transition-colors"
                        >
                            <div className="aspect-[16/10] relative overflow-hidden">
                                <Image
                                    src={part.image}
                                    alt={part.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="text-xs font-mono bg-[#00d1ff]/20 text-[#00d1ff] px-2 py-1 rounded border border-[#00d1ff]/30">
                                        {part.brand}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <span className="text-xs font-mono text-gray-500 uppercase">{part.category}</span>
                                    <h3 className="text-lg font-bold text-white mt-1">{part.name}</h3>
                                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">{part.description}</p>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-[#333]">
                                    <span className="text-[#00d1ff] font-mono text-sm">{part.priceRange}</span>
                                    <GlassButton
                                        variant="cyan"
                                        size="sm"
                                        onClick={() => handleRequestPrice(part.name)}
                                    >
                                        <MessageCircle size={14} className="mr-1" />
                                        Request Price
                                    </GlassButton>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
