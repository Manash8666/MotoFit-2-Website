'use client';

import { Star, ArrowRight, MessageSquare, Clock, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
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
            className="relative p-6 bg-[#0a0a0a] border border-[#333]/30 flex flex-col items-center justify-center group overflow-hidden cursor-pointer h-full min-h-[160px] rounded-2xl"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#ff5e1a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ff5e1a] opacity-30 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff5e1a] opacity-30 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ff5e1a] opacity-30 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ff5e1a] opacity-30 group-hover:opacity-100 transition-opacity" />

            <div className="mb-3 text-[#ff5e1a] p-2 bg-[#ff5e1a]/10 rounded-full group-hover:bg-[#ff5e1a]/20 transition-colors">
                <Icon size={24} />
            </div>

            <span className="text-2xl font-black text-white relative z-10 font-mono tracking-tighter mb-1">
                {value}
            </span>
            <span className="text-[#888] text-[10px] uppercase tracking-[0.2em] relative z-10 text-center group-hover:text-white transition-colors">
                {label}
            </span>
        </motion.div>
    );
}

export default function ClientReviews() {

    const handleOpenWidget = () => {
        if (typeof window !== 'undefined' && window.OpenWidget) {
            window.OpenWidget.call('maximize');
        }
    };

    return (
        <section className="relative py-24 bg-[#050505] overflow-hidden">
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

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff5e1a]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff5e1a]/20 to-transparent" />

            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-4 font-heading">
                            Rider <span className="text-[#ff5e1a]">Feedback</span>
                        </h2>
                        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                            Trusted by the Community // Supported by Experts
                        </p>
                    </motion.div>

                    {/* Google Rating Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group mb-16"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] rounded-3xl opacity-20 group-hover:opacity-40 blur transition-opacity duration-500" />

                        <div className="relative bg-[#0a0a0a] border border-[#333] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 hover:border-gray-600 transition-colors">

                            {/* Left: Score */}
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    <span className="text-2xl font-bold text-white">Google</span>
                                </div>

                                <div className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter mb-2">
                                    4.9
                                </div>

                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={24} className="fill-[#FBBC05] text-[#FBBC05]" />
                                    ))}
                                </div>
                                <p className="text-gray-400 font-mono text-sm tracking-wide uppercase">Based on 127+ Reviews</p>
                            </div>

                            {/* Divider (Desktop) */}
                            <div className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-[#333] to-transparent" />

                            {/* Right: CTA */}
                            <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Join the MotoFit Community</h3>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                    We take pride in every bike we service. Share your experience and help fellow riders choose the best care for their machines.
                                </p>
                                <a
                                    href="https://maps.app.goo.gl/MotoFit2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider rounded-lg overflow-hidden hover:bg-[#ff5e1a] hover:text-white transition-all duration-300"
                                >
                                    <span className="relative z-10">Rate Us on Google</span>
                                    <ArrowRight size={20} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            </div>

                        </div>
                    </motion.div>

                    {/* Integrated OpenWidget Support Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="h-px w-12 bg-[#333]" />
                            <span className="text-[#666] font-mono text-[10px] uppercase tracking-widest">Live Support Channels</span>
                            <div className="h-px w-12 bg-[#333]" />
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
