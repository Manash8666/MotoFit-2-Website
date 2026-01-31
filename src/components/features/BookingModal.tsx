'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MessageCircle, Bike, User, Zap } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { GlassButton } from '@/components/ui/buttons/GlassButton';

export default function BookingModal() {
    const { isOpen, closeBooking, serviceType } = useBooking();
    const [step, setStep] = useState<'input' | 'success'>('input');
    const [formData, setFormData] = useState({
        name: '',
        bikeModel: '',
        date: new Date().toISOString().split('T')[0],
        dropOffSlot: 'Morning (9 AM - 12 PM)',
        logistics: 'Self Drop-off'
    });

    const slots = [
        'Morning (9 AM - 12 PM)',
        'Afternoon (12 PM - 4 PM)',
        'Evening (4 PM - 8 PM)'
    ];

    const logisticsOptions = [
        { id: 'Self Drop-off', icon: <Bike size={16} />, label: 'I will Drop-off' },
        { id: 'Home Pickup', icon: <Zap size={16} />, label: 'Request Pickup (Stalled/Busy)' }
    ];

    const handleWhatsApp = () => {
        setStep('success');
    };

    const confirmBooking = () => {
        const message = `Hi MotoFit, I'd like to book a service.
    
👤 Name: ${formData.name || 'Rider'}
🏍️ Bike: ${formData.bikeModel || 'Not specified'}
🔧 Service: ${serviceType}
📅 Date: ${formData.date}
⏰ Slot: ${formData.dropOffSlot}
🚚 Logistics: ${formData.logistics}

Is this slot available?`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/917259625881?text=${encoded}`, '_blank');
        closeBooking();
        setTimeout(() => setStep('input'), 500); // Reset for next time
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Immersive Backdrop with Mansi */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90"
                    >
                        {/* Mansi Waving Background */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-40 md:opacity-50 transition-opacity duration-700"
                            style={{ backgroundImage: "url('/images/mansi-waving-bg.png')" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                    </motion.div>

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-[101] p-4 touch-none"
                        onClick={(e) => e.target === e.currentTarget && closeBooking()}
                    >
                        <div className="w-full max-w-lg bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#333] rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh]">

                            {/* Header */}
                            <div className="p-6 border-b border-[#333] bg-[#111]/50 relative overflow-hidden flex-shrink-0">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff5e1a] to-[#00d1ff] opacity-50" />
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                                        {step === 'input' ? 'Service Protocol' : 'Protocol Transmitted'}
                                    </h3>
                                    <button onClick={closeBooking} className="text-gray-500 hover:text-white transition-colors p-1">
                                        <X size={24} />
                                    </button>
                                </div>
                                <p className="text-xs text-[#a0a0a0] font-mono uppercase tracking-tighter">
                                    Intake Status: {step === 'input' ? 'Awaiting Data' : 'Confirmed'} // Shop No 9
                                </p>
                            </div>

                            {/* Body */}
                            <div className="p-6 overflow-y-auto custom-scrollbar overscroll-contain flex-1">
                                {step === 'input' ? (
                                    <div className="space-y-6">
                                        {/* Grid for Name & Bike */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-mono text-[#ff5e1a] uppercase tracking-widest">Pilot Name</label>
                                                <div className="relative group">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#ff5e1a] transition-colors" size={16} />
                                                    <input
                                                        type="text"
                                                        placeholder="Kunal Thakor?"
                                                        className="w-full bg-[#050505] border border-[#222] rounded py-2.5 pl-10 pr-4 text-white text-sm focus:border-[#ff5e1a] focus:bg-[#0f0f0f] focus:outline-none transition-all placeholder:text-gray-700"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-mono text-[#00d1ff] uppercase tracking-widest">Machine Model</label>
                                                <div className="relative group">
                                                    <Bike className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00d1ff] transition-colors" size={16} />
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Duke 390"
                                                        className="w-full bg-[#050505] border border-[#222] rounded py-2.5 pl-10 pr-4 text-white text-sm focus:border-[#00d1ff] focus:bg-[#0f0f0f] focus:outline-none transition-all placeholder:text-gray-700"
                                                        value={formData.bikeModel}
                                                        onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date Picker */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Intake Date</label>
                                            <div className="relative group">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={16} />
                                                <input
                                                    type="date"
                                                    className="w-full bg-[#050505] border border-[#222] rounded py-2.5 pl-10 pr-4 text-white text-sm focus:border-white/50 focus:outline-none transition-all [color-scheme:dark]"
                                                    value={formData.date}
                                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        {/* Logistics */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest text-center block">Logistics Strategy</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {logisticsOptions.map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        onClick={() => setFormData({ ...formData, logistics: opt.id })}
                                                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded border transition-all ${formData.logistics === opt.id
                                                            ? 'bg-[#111] border-[#ff5e1a] text-[#ff5e1a]'
                                                            : 'bg-[#050505] border-[#222] text-gray-500 hover:border-gray-600'
                                                            }`}
                                                    >
                                                        {opt.icon}
                                                        <span className="text-[10px] font-bold uppercase tracking-tighter">{opt.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Slot Selection */}
                                        <div className="space-y-2 pt-2 border-t border-[#1a1a1a]">
                                            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest text-center block mb-2">Time Window</label>
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {slots.map((slot) => (
                                                    <button
                                                        key={slot}
                                                        onClick={() => setFormData({ ...formData, dropOffSlot: slot })}
                                                        className={`px-3 py-1.5 rounded-full text-[10px] font-mono border transition-all ${formData.dropOffSlot === slot
                                                            ? 'bg-[#ff5e1a] border-[#ff5e1a] text-black'
                                                            : 'bg-transparent border-[#333] text-gray-500 hover:border-gray-600 hover:text-white'
                                                            }`}
                                                    >
                                                        {slot}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* Success State - Mansi's Message */
                                    <div className="text-center space-y-6 py-4">
                                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#00d1ff] mx-auto shadow-[0_0_20px_rgba(0,209,255,0.3)]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/images/mansi-reel.png" alt="Mansi" className="w-full h-full object-cover" />
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold text-[#00d1ff] italic">"Thanks for choosing us!"</h3>
                                            <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto">
                                                Arre, best decision! Akshat bhai is the best tech in town.
                                                <br />
                                                Click below to send the details on WhatsApp, and I'll book your slot ASAP! 🏍️💨
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-[#333] bg-[#050505]/80 flex-shrink-0">
                                {step === 'input' ? (
                                    <GlassButton
                                        variant="cyan"
                                        className="w-full justify-center group h-12"
                                        onClick={handleWhatsApp}
                                    >
                                        <MessageCircle size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                                        <span className="font-bold uppercase tracking-widest">Transmit Protocol</span>
                                    </GlassButton>
                                ) : (
                                    <GlassButton
                                        variant="orange"
                                        className="w-full justify-center group h-12"
                                        onClick={confirmBooking}
                                    >
                                        <MessageCircle size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                                        <span className="font-bold uppercase tracking-widest">Send on WhatsApp</span>
                                    </GlassButton>
                                )}

                                {step === 'input' && (
                                    <div className="flex items-center justify-center gap-2 mt-4">
                                        <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                                        <p className="text-[9px] text-[#555] font-mono uppercase tracking-[0.2em]">
                                            Secure Channel // 128-bit Encrypted
                                        </p>
                                    </div>
                                )}
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
