'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TeamMember {
    name: string;
    role: string;
    desc: string;
    specialty?: string;
    delay: number;
}

export function TeamCard({ name, role, desc, specialty, delay, image }: TeamMember & { image?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: delay, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-full w-full"
        >
            {/* Gloving effect from behind */}
            <div className="absolute top-[20px] left-0 w-full h-full scale-[0.85] bg-gradient-to-l from-[#ff5e1a] to-[#00d1ff] blur-[30px] opacity-100 transition-opacity duration-500 group-hover:opacity-0 -z-10" />

            {/* Main Card with Gradient Border */}
            <div className="relative w-full h-full p-[3px] rounded-2xl bg-gradient-to-l from-[#ff5e1a] to-[#00d1ff] overflow-visible z-10 shadow-2xl">

                {/* Inner Content Area */}
                <div className="w-full h-full bg-[#111] rounded-xl overflow-hidden flex flex-col relative group-hover:text-[#ff5e1a] transition-colors duration-1000">

                    {/* Optional Image (Mansi) */}
                    {image ? (
                        <div className="relative w-full h-64 overflow-hidden border-b border-white/10 group-hover:border-[#ff5e1a]/50 transition-colors">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-90" />
                        </div>
                    ) : (
                        // Decorative header for non-image cards
                        <div className="h-16 w-full bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center">
                            <div className="w-8 h-1 bg-white/10 rounded-full" />
                        </div>
                    )}

                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                        {/* Floating Role Badge */}
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#ff5e1a] text-xs font-mono tracking-widest uppercase backdrop-blur-sm group-hover:bg-[#ff5e1a] group-hover:text-black transition-all duration-300">
                                {role}
                            </span>
                        </div>

                        {/* Name & Desc */}
                        <div className="flex-grow space-y-4">
                            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ff5e1a] group-hover:to-[#00d1ff] transition-all duration-300">
                                {name}
                            </h3>
                            <p className="text-gray-400 font-light text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                {desc}
                            </p>
                        </div>

                        {/* Specialty Footer */}
                        {specialty && (
                            <div className="pt-6 border-t border-white/10 mt-8">
                                <p className="text-xs text-[#00d1ff] font-mono uppercase tracking-widest">
                                    Core Ability: <span className="text-white group-hover:text-[#ff5e1a] transition-colors">{specialty}</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
