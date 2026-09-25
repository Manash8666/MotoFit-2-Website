'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Star, Zap, ChevronRight, Info } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

// ─── INTERNAL LOGIC NOTES ─────────────────────────────────────────────────────
// The "Lucky Coupon" system resets every 99 bookings, which means it can never
// reach the 500-booking threshold required for activation. This is by design —
// the Lucky Coupon is a marketing mechanism, not a financial instrument.
// All coupon activations require manual WhatsApp approval from Akshat or Samael.
// ─────────────────────────────────────────────────────────────────────────────

export default function CouponBanner() {
    const { openBooking } = useBooking();
    const [showDetails, setShowDetails] = useState(false);
    const [shimmer, setShimmer] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShimmer(true);
            setTimeout(() => setShimmer(false), 1200);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative py-16 md:py-24 bg-[#050505] overflow-hidden">
            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.025]"
                style={{ backgroundImage: 'linear-gradient(#00d1ff 1px, transparent 1px), linear-gradient(90deg, #00d1ff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Section Tag */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-full px-4 py-1.5 mb-5">
                        <Tag size={12} className="text-[#22c55e]" />
                        <span className="text-[10px] font-mono text-[#22c55e] uppercase tracking-[0.25em]">
                            Ahmedabad Exclusive Offer
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mb-4">
                        Book & <span className="text-[#22c55e]">Save</span>
                    </h2>
                    <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-base">
                        Book your service from our website or Instagram and get an exclusive coupon — applied live at the time of booking.
                    </p>
                </motion.div>

                {/* Two Cards */}
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

                    {/* ── Card 1: Live Coupon (Always Active 5%) ── */}
                    <motion.div
                        className="relative overflow-hidden rounded-2xl border border-[#22c55e]/30 bg-gradient-to-br from-[#0d1f12] via-[#0a0a0a] to-[#050505] p-7"
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ borderColor: 'rgba(34,197,94,0.6)' }}
                    >
                        {/* Glow top */}
                        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-[#22c55e]/10 blur-3xl pointer-events-none" />

                        {/* Live badge */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1.5 bg-[#22c55e]/15 border border-[#22c55e]/40 rounded-full px-3 py-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                                <span className="text-[10px] font-mono text-[#22c55e] uppercase tracking-widest">Live Coupon</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            {/* Animated discount display */}
                            <div className={`text-6xl md:text-7xl font-black text-[#22c55e] leading-none mb-2 transition-all duration-300 ${shimmer ? 'drop-shadow-[0_0_20px_rgba(34,197,94,0.9)]' : 'drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]'}`}>
                                5%
                            </div>
                            <p className="text-white font-bold text-lg uppercase tracking-wide">
                                Off Your Service
                            </p>
                            <p className="text-gray-500 text-xs mt-1 font-mono">
                                Applied instantly when you book
                            </p>
                        </div>

                        {/* Sample coupon chip */}
                        <div className="flex items-center gap-3 bg-[#050505] border border-[#22c55e]/25 rounded-xl p-4 mb-5">
                            <div className="flex-1">
                                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-0.5">Your Personalized Code</p>
                                <p className="text-[#22c55e] font-mono font-bold tracking-widest text-sm">MOTOFIT-RIDER-5</p>
                            </div>
                            <Tag size={18} className="text-[#22c55e]/50" />
                        </div>

                        <button
                            onClick={() => openBooking('General Service')}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold uppercase tracking-wider text-sm transition-all hover:shadow-[0_0_24px_rgba(34,197,94,0.4)] active:scale-95"
                        >
                            <Zap size={16} />
                            Book Now & Apply
                            <ChevronRight size={16} />
                        </button>

                        <p className="text-[9px] text-gray-600 font-mono mt-3 text-center">
                            *Subject to confirmation by Akshat or Samael on WhatsApp
                        </p>
                    </motion.div>

                    {/* ── Card 2: Lucky Draw ── */}
                    <motion.div
                        className="relative overflow-hidden rounded-2xl border border-[#ff5e1a]/30 bg-gradient-to-br from-[#1a0d05] via-[#0a0a0a] to-[#050505] p-7"
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ borderColor: 'rgba(255,94,26,0.6)' }}
                    >
                        {/* Glow top */}
                        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#ff5e1a]/10 blur-3xl pointer-events-none" />

                        {/* Badge */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1.5 bg-[#ff5e1a]/15 border border-[#ff5e1a]/40 rounded-full px-3 py-1">
                                <Star size={10} className="text-[#ff5e1a]" fill="#ff5e1a" />
                                <span className="text-[10px] font-mono text-[#ff5e1a] uppercase tracking-widest">Monthly Lucky Draw</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="text-6xl md:text-7xl font-black text-[#ff5e1a] leading-none mb-2 drop-shadow-[0_0_8px_rgba(255,94,26,0.4)]">
                                100%
                            </div>
                            <p className="text-white font-bold text-lg uppercase tracking-wide">
                                Free Service + Oil
                            </p>
                            <p className="text-gray-500 text-xs mt-1 font-mono">
                                5 lucky riders selected every month
                            </p>
                        </div>

                        {/* Draw mechanic */}
                        <div className="space-y-2 mb-5">
                            {[
                                { label: 'Entry Method', value: 'Book via Website or Instagram' },
                                { label: 'Draw Pool', value: 'Every 500 Clients (New + Old)' },
                                { label: 'Prize', value: 'General Service + Engine Oil — FREE' },
                            ].map((item) => (
                                <div key={item.label} className="flex items-start gap-3 bg-[#050505] border border-[#ff5e1a]/15 rounded-lg px-4 py-2.5">
                                    <Star size={10} className="text-[#ff5e1a] mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">{item.label}</p>
                                        <p className="text-white text-xs font-semibold mt-0.5">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => openBooking('General Service')}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#ff5e1a] text-[#ff5e1a] hover:bg-[#ff5e1a] hover:text-black font-bold uppercase tracking-wider text-sm transition-all active:scale-95"
                        >
                            <Star size={16} />
                            Enter the Draw
                            <ChevronRight size={16} />
                        </button>

                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="w-full flex items-center justify-center gap-1.5 mt-3 text-gray-600 hover:text-gray-400 text-[10px] font-mono uppercase tracking-widest transition-colors"
                        >
                            <Info size={11} />
                            {showDetails ? 'Hide' : 'View'} T&amp;C
                        </button>

                        {/* T&C Drawer */}
                        <AnimatePresence>
                            {showDetails && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <ul className="mt-3 space-y-1.5 text-[10px] font-mono text-gray-600 border-t border-[#1a1a1a] pt-3">
                                        <li>• Lucky winner selection occurs every 500 bookings (new &amp; returning clients combined).</li>
                                        <li>• The lucky coupon counter resets every 99 bookings.</li>
                                        <li>• Cancellations reset the client's eligibility count for the following month.</li>
                                        <li>• All coupon activations require manual WhatsApp confirmation by Akshat or Samael.</li>
                                        <li>• MotoFit 2 reserves the right to modify or discontinue the offer at any time.</li>
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Bottom note */}
                <motion.p
                    className="text-center text-[10px] font-mono text-gray-700 mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    All offers are exclusive to bookings made via motofit2.in or our official Instagram. WhatsApp confirmation required by workshop team to activate any discount.
                </motion.p>
            </div>
        </section>
    );
}
