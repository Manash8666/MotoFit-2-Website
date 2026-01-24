'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

export default function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const words = children.split(" ");

    return (
        <span ref={ref} className={cn("inline-block", className)} aria-label={children}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.2em] -mb-[0.2em] pb-[0.2em]" aria-hidden="true">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: 0 } : { y: "100%" }}
                        transition={{
                            duration: 0.8,
                            delay: delay + i * 0.03, // Stagger effect
                            ease: [0.22, 1, 0.36, 1]
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}
