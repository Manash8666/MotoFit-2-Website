'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/graphics/Badge';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Play } from 'lucide-react';
import { GlassButton } from '@/components/ui/buttons/GlassButton';

type Category = 'All' | 'Superbike Suite' | 'Royal Enfield Transformations' | 'Performance Lab' | 'The Details';

const galleryItems = [
    {
        id: '1',
        name: 'Royal Enfield Interceptor 650',
        image: '/images/gallery/re-interceptor.png',
        category: 'Royal Enfield Transformations',
        description: 'Full engine rebuild with valve clearance and crankshaft balancing. SEO: royal-enfield-custom-ahmedabad',
    },
    {
        id: '2',
        name: 'Kawasaki Ninja H2',
        image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80',
        category: 'Superbike Suite',
        description: 'Dyno tuning session. 210HP verified at rear wheel. SEO: motofit-2-ahmedabad-superbike-service',
    },
    {
        id: '3',
        name: 'Custom Cafe Racer',
        image: 'https://images.unsplash.com/photo-1615172282427-9a5752d358cd?auto=format&fit=crop&q=80',
        category: 'Royal Enfield Transformations',
        description: 'Ground-up cafe racer build on vintage frame. SEO: chandkheda-bike-garage-gallery',
    },
    {
        id: '4',
        name: 'Triumph Street Triple RS',
        image: '/images/gallery/triumph-street.png',
        category: 'Performance Lab',
        description: 'ECU remap + Akrapovic full system. +18HP gain. SEO: ecu-tuning-workshop-gujarat',
    },
    {
        id: '5',
        name: 'KTM Duke 390',
        image: 'https://images.unsplash.com/photo-1629813291523-27c5418b7654?auto=format&fit=crop&q=80',
        category: 'Performance Lab',
        description: 'Post-crash chassis realignment and engine service. SEO: bike-repair-chandkheda',
    },
    {
        id: '6',
        name: 'Ducati Scrambler 800',
        image: 'https://images.unsplash.com/photo-1568772585407-9361bd4626c7?auto=format&fit=crop&q=80',
        category: 'Superbike Suite',
        description: 'Scrambler conversion with high-mount exhaust and flat seat. SEO: ducati-service-ahmedabad',
    },
    {
        id: '7',
        name: 'Bajaj Pulsar NS 200 - Bore Up Build',
        image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80',
        category: 'Performance Lab',
        description: 'Engine bore-up from 200CC to 230CC. Big bore kit installation. SEO: pulsar-modification-ahmedabad',
    },
    {
        id: '8',
        name: 'Carbon Fiber Detailing',
        image: 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&q=80',
        category: 'The Details',
        description: 'Macro shot of custom carbon fiber layups. SEO: bike-detailing-ahmedabad',
    },
];

const categories: Category[] = ['All', 'Superbike Suite', 'Royal Enfield Transformations', 'Performance Lab', 'The Details'];

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
                {/* 1. Header: Authority & Action */}
                <div className="mb-16 text-center">
                    <a href="/" className="text-[#ff5e1a] font-bold uppercase tracking-widest mb-4 block text-sm hover:underline">← Back to Home</a>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-6 italic tracking-tighter">
                        The Wall of <span className="text-[#ff5e1a]">Roar</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-8 font-light">
                        From the Lab to the Road. Witness the precision of Ahmedabad’s #1 bike customization hub. Every photo here is a machine we’ve perfected.
                    </p>
                    <GlassButton variant="orange" className="mx-auto" onClick={() => window.location.href = "tel:+917259625881"}>
                        📸 Want your bike featured? Book a Pro-Service
                    </GlassButton>
                </div>

                {/* 2. Featured Project: "The Beast of Chandkheda" */}
                <section className="mb-20">
                    <div className="relative rounded-2xl overflow-hidden border border-[#333] bg-[#0a0a0a] group">
                        <div className="grid md:grid-cols-2 gap-0">
                            <div className="relative h-[400px] md:h-auto overflow-hidden">
                                <Image
                                    src="/images/gallery/re-interceptor.png"
                                    alt="Interceptor 650 Stealth Edition Ahmedabad"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-[#ff5e1a] text-black font-bold px-3 py-1 text-xs uppercase tracking-wider rounded">
                                    Hero Project of the Month
                                </div>
                            </div>
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <h3 className="text-3xl font-black text-white uppercase mb-2">The Beast of Chandkheda</h3>
                                <p className="text-[#ff5e1a] font-mono mb-6">Interceptor 650 "Stealth Edition"</p>

                                <ul className="space-y-3 mb-8 text-gray-400">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#ff5e1a] rounded-full"></span>
                                        Stage 2 ECU Remap (+15% Torque)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#ff5e1a] rounded-full"></span>
                                        DNA Air Filter & Way2Speed Exhaust
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#ff5e1a] rounded-full"></span>
                                        Custom Matte Grey Wrap
                                    </li>
                                </ul>

                                <blockquote className="border-l-4 border-[#ff5e1a] pl-4 italic text-gray-300 font-serif">
                                    "MotoFit 2 changed how my bike feels. It's not a machine anymore; it's a monster."
                                    <footer className="text-[#ff5e1a] text-sm mt-2 not-italic font-sans font-bold">— Rahul S., Verified Customer</footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Category Filters */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 md:px-6 md:py-2 rounded-full font-mono text-xs md:text-sm uppercase tracking-widest transition-all border ${activeCategory === cat
                                ? 'bg-[#ff5e1a] text-white border-[#ff5e1a]'
                                : 'bg-transparent text-gray-400 border-[#333] hover:border-[#ff5e1a]/50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* 4. The Gallery Grid & Instagram Live Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">

                    {/* Real-Time Instagram Card (Always First/Distinct) */}
                    <div className="bg-gradient-to-br from-[#ff5e1a] to-[#ff8a3d] rounded-xl aspect-[4/3] flex flex-col items-center justify-center text-center p-8 relative overflow-hidden group cursor-pointer hover:shadow-[0_0_30px_rgba(255,94,26,0.3)] transition-all">
                        <div className="relative z-10">
                            <Instagram className="w-12 h-12 md:w-16 md:h-16 text-white mb-4 mx-auto" />
                            <h3 className="text-2xl md:text-3xl font-black uppercase text-white leading-tight mb-2">
                                Real-Time at<br />Shop No 9
                            </h3>
                            <p className="text-white/90 text-sm mb-6 max-w-[200px] mx-auto">
                                Grease, sparks, and science. Watch our daily grind to 10k.
                            </p>
                            <a
                                href="https://instagram.com/motofit_2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-black text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-white hover:text-black transition-colors inline-block"
                            >
                                Follow @motofit_2
                            </a>
                        </div>
                        {/* Abstract Pattern overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    </div>

                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative bg-[#0a0a0a] border border-[#333] rounded-xl overflow-hidden hover:border-[#ff5e1a]/50 transition-colors aspect-[4/3]"
                            >
                                <Image
                                    src={item.image}
                                    alt={`${item.name} - ${item.description}`} // Improved Alt Text
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <p className="text-[#ff5e1a] font-mono text-xs uppercase mb-1">{item.category}</p>
                                    <h3 className="text-lg font-bold text-white leading-tight">{item.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* 5. "Listen to the Precision" Video Section */}
                <section className="py-12 border-t border-[#333]">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-2">Listen to the Precision</h2>
                        <p className="text-gray-500 text-sm">Don't just look. Hear the difference.</p>
                    </div>
                    <div className="max-w-4xl mx-auto aspect-video bg-[#111] rounded-xl flex items-center justify-center border border-[#333] group cursor-pointer hover:border-[#ff5e1a]/50 transition-colors relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-[#ff5e1a] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,94,26,0.4)]">
                                <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                            </div>
                            <p className="text-gray-300 font-mono text-sm">[Instagram Reel Embed Placeholder]</p>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
