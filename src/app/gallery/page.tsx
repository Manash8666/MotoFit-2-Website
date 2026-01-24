'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/graphics/Badge';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type Category = 'All' | 'Restorations' | 'Performance' | 'Custom Builds';

const galleryItems = [
    {
        id: '1',
        name: 'Royal Enfield Interceptor 650',
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80',
        category: 'Restorations',
        description: 'Full engine rebuild with valve clearance and crankshaft balancing.',
    },
    {
        id: '2',
        name: 'Kawasaki Ninja H2',
        image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80',
        category: 'Performance',
        description: 'Dyno tuning session. 210HP verified at rear wheel.',
    },
    {
        id: '3',
        name: 'Custom Cafe Racer',
        image: 'https://images.unsplash.com/photo-1615172282427-9a5752d358cd?auto=format&fit=crop&q=80',
        category: 'Custom Builds',
        description: 'Ground-up cafe racer build on vintage frame.',
    },
    {
        id: '4',
        name: 'Triumph Street Triple RS',
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80',
        category: 'Performance',
        description: 'ECU remap + Akrapovic full system. +18HP gain.',
    },
    {
        id: '5',
        name: 'KTM Duke 390',
        image: 'https://images.unsplash.com/photo-1629813291523-27c5418b7654?auto=format&fit=crop&q=80',
        category: 'Restorations',
        description: 'Post-crash chassis realignment and engine service.',
    },
    {
        id: '6',
        name: 'Ducati Scrambler 800',
        image: 'https://images.unsplash.com/photo-1568772585407-9361bd4626c7?auto=format&fit=crop&q=80',
        category: 'Custom Builds',
        description: 'Scrambler conversion with high-mount exhaust and flat seat.',
    },
    {
        id: '7',
        name: 'Bajaj Pulsar NS 200 - Bore Up Build',
        image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80',
        category: 'Custom Builds',
        description: 'Engine bore-up from 200CC to 230CC. Big bore kit installation with head porting and performance cam.',
    },
];

const categories: Category[] = ['All', 'Restorations', 'Performance', 'Custom Builds'];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState<Category>('All');

    const filteredItems = activeCategory === 'All'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory);

    return (
        <main className="min-h-screen bg-[#050505] pt-24 pb-12 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Header */}
                <div className="mb-12 text-center">
                    <Badge variant="orange" glow className="mb-4">Project Archive</Badge>
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase mb-4">
                        Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e1a] to-[#ff8a3d]">Gallery</span>
                    </h1>
                    <p className="text-[#666] max-w-xl mx-auto">
                        From precision restorations to ground-up customs. Explore our recent work.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full font-mono text-sm uppercase tracking-widest transition-all border ${activeCategory === cat
                                ? 'bg-[#ff5e1a] text-white border-[#ff5e1a]'
                                : 'bg-transparent text-gray-400 border-[#333] hover:border-[#ff5e1a]/50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative bg-[#0a0a0a] border border-[#333] rounded-xl overflow-hidden hover:border-[#ff5e1a]/50 transition-colors"
                            >
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 saturate-0 group-hover:saturate-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="text-xs font-mono text-[#ff5e1a] bg-[#ff5e1a]/10 px-2 py-1 rounded mb-2 inline-block">
                                            {item.category}
                                        </span>
                                        <h3 className="text-xl font-bold text-white">{item.name}</h3>
                                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </main>
    );
}
