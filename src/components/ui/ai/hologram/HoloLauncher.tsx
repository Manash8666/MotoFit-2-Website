"use client";

import React, { useState, useEffect, useRef } from "react";
import MansiHologram from "./MansiHologram";
import { motion, AnimatePresence } from "framer-motion";
import { HoloConfig } from "./HoloConfig";

interface HoloLauncherProps {
    onOpen: () => void;
}

export default function HoloLauncher({ onOpen }: HoloLauncherProps) {
    const [booting, setBooting] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [imageSrc, setImageSrc] = useState(HoloConfig.basePath + HoloConfig.defaultImage);

    // Track Mouse Movement for Parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position (-1 to 1)
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            setMousePos({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Robust Daily Image Rotation Logic
    useEffect(() => {
        const today = new Date().getDate(); // 1-31
        const index = today % HoloConfig.availableImages.length;
        setImageSrc(HoloConfig.basePath + HoloConfig.availableImages[index]);
    }, []);

    const handleClick = () => {
        setBooting(true);

        // Simulate Boot Sequence (3 seconds)
        setTimeout(() => {
            setBooting(false);
            onOpen();
        }, 2500);
    };

    return (
        <div className="fixed bottom-0 right-0 z-40 w-[200px] h-[250px] sm:w-[280px] sm:h-[350px] pointer-events-none">
            {/* Interactive Area */}
            <div
                className="absolute bottom-0 right-0 w-full h-full pointer-events-auto cursor-pointer"
                onClick={handleClick}
            >
                <MansiHologram imageSrc={imageSrc} mousePosition={mousePos} />

                {/* Boot Overlay (Video simulated with CSS for now as video asset not provided) */}
                <AnimatePresence>
                    {booting && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-cyan-500/20 mix-blend-screen flex items-end justify-center"
                        >
                            <div className="w-full h-full bg-gradient-to-t from-cyan-500 via-transparent to-transparent animate-pulse" />
                            <div className="absolute bottom-10 text-cyan-400 font-mono text-xs tracking-widest animate-pulse">
                                INITIALIZING...
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floor Light (Static Glow) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-cyan-500/40 blur-xl rounded-[100%]" />
            </div>
        </div>
    );
}
