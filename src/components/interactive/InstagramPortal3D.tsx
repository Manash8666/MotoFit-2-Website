'use client';

import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

export default function InstagramPortal3D() {
    return (
        <motion.a
            href="https://www.instagram.com/motofit_2"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, rotateX: 10, rotateY: 10 }}
            className="group relative block"
        >
            {/* 3D Depth Layers */}
            <div className="absolute inset-0 bg-[#E1306C]/30 blur-[20px] rounded-2xl group-hover:opacity-100 transition-opacity opacity-0" />

            {/* Base Layer */}
            <div className="relative bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-3 rounded-2xl shadow-[0_10px_20px_rgba(225,48,108,0.3)] group-hover:shadow-[0_20px_40px_rgba(225,48,108,0.5)] transition-all duration-500">
                {/* Glass Facet */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] rounded-2xl border border-white/20" />

                {/* The Icon */}
                <div className="relative z-10 text-white">
                    <Instagram size={28} strokeWidth={2.5} className="group-hover:scale-110 transition-transform duration-500" />
                </div>
            </div>

            {/* Float Label */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                    Follow the Roar
                </span>
            </div>
        </motion.a>
    );
}

