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

export function TeamCard({ name, role, desc, specialty, delay }: TeamMember) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: delay, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-full"
        >
            {/* Holographic Border Gradient */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#ff5e1a]/50 via-[#00d1ff]/50 to-[#ff5e1a]/50 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-700" />

            {/* Glass Container */}
            <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-[#333]/50 p-8 rounded-2xl overflow-hidden hover:border-transparent transition-colors duration-500">

                {/* Ambient Light Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#ff5e1a]/20 transition-colors duration-700" />

                {/* Role Badge (Floating) */}
                <div className="relative z-10 mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#ff5e1a] text-xs font-mono tracking-widest uppercase mb-2 backdrop-blur-sm group-hover:bg-[#ff5e1a] group-hover:text-black transition-all duration-300">
                        {role}
                    </span>
                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter group-hover:scale-105 transition-transform duration-300 origin-left">
                        {name}
                    </h3>
                </div>

                {/* Magical Description */}
                <div className="relative z-10 space-y-4">
                    <p className="text-gray-400 font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                        {desc}
                    </p>
                    {specialty && (
                        <div className="pt-4 border-t border-white/10 mt-4">
                            <p className="text-xs text-[#00d1ff] font-mono uppercase tracking-widest">
                                Core Ability: <span className="text-white">{specialty}</span>
                            </p>
                        </div>
                    )}
                </div>

                {/* Interactive particle or shimmer (Implicit in CSS or we can add a div) */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff5e1a] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
            </div>
        </motion.div>
    );
}
