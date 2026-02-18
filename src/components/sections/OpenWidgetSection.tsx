'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/graphics/Badge';
import { MessageSquare, Clock, ShieldCheck, Zap } from 'lucide-react';
import Script from 'next/script';

// Extend window interface for OpenWidget
declare global {
    interface Window {
        __ow: any;
        OpenWidget: any;
    }
}

function StatCard({ icon: Icon, value, label, onClick }: { icon: any, value: string, label: string, onClick?: () => void }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="relative p-8 bg-[#0a0a0a] border border-[#333]/30 flex flex-col items-center justify-center group overflow-hidden cursor-pointer h-full min-h-[200px]"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#ff5e1a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ff5e1a] opacity-30 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff5e1a] opacity-30 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ff5e1a] opacity-30 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ff5e1a] opacity-30 group-hover:opacity-100 transition-opacity" />

            <div className="mb-4 text-[#ff5e1a] p-3 bg-[#ff5e1a]/10 rounded-full group-hover:bg-[#ff5e1a]/20 transition-colors">
                <Icon size={32} />
            </div>

            <span className="text-3xl md:text-4xl font-black text-white relative z-10 font-mono tracking-tighter mb-2">
                {value}
            </span>
            <span className="text-[#888] text-xs uppercase tracking-[0.2em] relative z-10 text-center group-hover:text-white transition-colors">
                {label}
            </span>
        </motion.div>
    );
}

export default function OpenWidgetSection() {

    const handleOpenWidget = () => {
        if (typeof window !== 'undefined' && window.OpenWidget) {
            window.OpenWidget.call('maximize');
        }
    };

    return (
        <section className="relative py-20 bg-[#050505] overflow-hidden border-b border-[#333]/30">
            {/* OpenWidget Configuration */}
            <Script id="open-widget-config" strategy="beforeInteractive">
                {`
                    window.__ow = window.__ow || {};
                    window.__ow.organizationId = "6fee2b77-e016-4d20-8a08-55b342da193a";
                    window.__ow.integration_name = "manual_settings";
                    window.__ow.product_name = "openwidget";
                `}
            </Script>
            <Script
                src="https://cdn.openwidget.com/openwidget.js"
                strategy="lazyOnload"
            />

            <div className="container mx-auto px-4 md:px-8">

                <div className="flex flex-col md:flex-row items-end justify-between mb-12 pb-6 border-b border-[#333]/30">
                    <div>
                        <Badge variant="orange" className="mb-4">Live Support</Badge>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-none">
                            Help <span className="text-[#ff5e1a]">Center</span>
                        </h2>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <p className="text-[#666] font-mono text-xs max-w-xs ml-auto">
                            GOT QUESTIONS? OUR EXPERTS ARE ONLINE AND READY TO ASSIST.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        icon={MessageSquare}
                        value="ONLINE"
                        label="Live Chat"
                        onClick={handleOpenWidget}
                    />
                    <StatCard
                        icon={Clock}
                        value="< 5 MIN"
                        label="Response Time"
                        onClick={handleOpenWidget}
                    />
                    <StatCard
                        icon={ShieldCheck}
                        value="100%"
                        label="Resolution Rate"
                        onClick={handleOpenWidget}
                    />
                    <StatCard
                        icon={Zap}
                        value="INSTANT"
                        label="Quick Assist"
                        onClick={handleOpenWidget}
                    />
                </div>

            </div>

            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff5e1a]/20 to-transparent" />
        </section>
    );
}
