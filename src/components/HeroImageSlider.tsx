"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop", // Motorbike in garage
    "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2070&auto=format&fit=crop", // Mechanic working
    "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?q=80&w=2069&auto=format&fit=crop"  // Cafe racer
];

export default function HeroImageSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.4, scale: 1 }} // Low opacity to blend with dark bg
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[index]}
                        alt="Garage Atmosphere"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {/* Heavy Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/40" />
            <div className="absolute inset-0 bg-black/40" />
        </div>
    );
}
