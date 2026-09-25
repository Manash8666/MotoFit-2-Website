'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation, Zap } from 'lucide-react';

const AREAS = [
    { name: 'Naranpura', dist: '3.2 km', active: true },
    { name: 'Satellite', dist: '4.8 km', active: true },
    { name: 'Bopal', dist: '8.1 km', active: true },
    { name: 'Prahlad Nagar', dist: '5.4 km', active: true },
    { name: 'SG Highway', dist: '6.0 km', active: true },
    { name: 'Vastrapur', dist: '4.1 km', active: true },
    { name: 'Thaltej', dist: '7.2 km', active: true },
    { name: 'Motera', dist: '5.9 km', active: true },
    { name: 'Chandkheda', dist: '7.5 km', active: true },
    { name: 'Gota', dist: '8.8 km', active: true },
    { name: 'Gandhinagar', dist: '18 km', active: false },
    { name: 'Anand', dist: '68 km', active: false },
];

export default function AhmedabadReach() {
    return (
        <section className="relative py-20 md:py-28 bg-[#050505] overflow-hidden">
            {/* Grid bg */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#ff5e1a 1px, transparent 1px), linear-gradient(90deg, #ff5e1a 1px, transparent 1px)', backgroundSize: '60px 60px' }}
            />

            {/* Orange glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-5"
                style={{ background: 'radial-gradient(ellipse, #ff5e1a 0%, transparent 70%)' }}
            />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Heading */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 bg-[#ff5e1a]/10 border border-[#ff5e1a]/30 rounded-full px-4 py-1.5 mb-5">
                        <Navigation size={12} className="text-[#ff5e1a]" />
                        <span className="text-[10px] font-mono text-[#ff5e1a] uppercase tracking-[0.25em]">
                            Serving All of Ahmedabad
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mb-4">
                        The <span className="text-[#ff5e1a]">Ahmedabad</span> Network
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
                        MotoFit 2 is Ahmedabad's premium motorcycle workshop — riders from across the city and beyond trust us for engine rebuilds, ECU tuning, and expert diagnostics.
                    </p>
                </motion.div>

                {/* City Map Visual */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Central Hub */}
                    <motion.div
                        className="flex flex-col items-center mb-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-[#ff5e1a]/20 border-2 border-[#ff5e1a] flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-[#ff5e1a] flex items-center justify-center shadow-[0_0_30px_rgba(255,94,26,0.6)]">
                                    <MapPin size={22} className="text-black" />
                                </div>
                            </div>
                            {/* Pulse rings */}
                            <div className="absolute inset-0 rounded-full border border-[#ff5e1a]/40 animate-ping" />
                            <div className="absolute -inset-4 rounded-full border border-[#ff5e1a]/20 animate-ping" style={{ animationDelay: '0.5s' }} />
                        </div>
                        <div className="mt-3 text-center">
                            <p className="text-white font-bold text-sm uppercase tracking-widest">MotoFit 2 HQ</p>
                            <p className="text-[#ff5e1a] text-xs font-mono">Shop No 9 — Naranpura, Ahmedabad</p>
                        </div>
                    </motion.div>

                    {/* Area Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {AREAS.map((area, i) => (
                            <motion.div
                                key={area.name}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className={`relative flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all group ${area.active
                                    ? 'bg-[#ff5e1a]/5 border-[#ff5e1a]/25 hover:border-[#ff5e1a]/60 hover:bg-[#ff5e1a]/10'
                                    : 'bg-[#111]/40 border-[#222] opacity-60'
                                    }`}
                            >
                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${area.active ? 'bg-[#ff5e1a] shadow-[0_0_8px_#ff5e1a]' : 'bg-gray-600'}`} />
                                <div>
                                    <p className={`text-xs font-bold uppercase tracking-wide ${area.active ? 'text-white' : 'text-gray-500'}`}>
                                        {area.name}
                                    </p>
                                    <p className={`text-[10px] font-mono ${area.active ? 'text-[#ff5e1a]/70' : 'text-gray-700'}`}>
                                        {area.dist}
                                    </p>
                                </div>
                                {!area.active && (
                                    <span className="absolute top-1.5 right-2 text-[8px] font-mono text-gray-600 uppercase tracking-widest">soon</span>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats Bar */}
                    <motion.div
                        className="mt-10 grid grid-cols-3 gap-4 border border-[#1a1a1a] rounded-2xl p-6 bg-[#0a0a0a]/80"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {[
                            { label: 'Active Coverage Zones', value: '10+', icon: <MapPin size={16} className="text-[#ff5e1a]" /> },
                            { label: 'Riders Served Monthly', value: '200+', icon: <Zap size={16} className="text-[#00d1ff]" /> },
                            { label: 'Pick-up Radius', value: '15 km', icon: <Navigation size={16} className="text-[#22c55e]" /> },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="flex justify-center mb-2">{stat.icon}</div>
                                <p className="text-2xl font-black text-white">{stat.value}</p>
                                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
