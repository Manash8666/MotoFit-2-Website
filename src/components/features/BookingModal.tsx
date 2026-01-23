'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MessageCircle, Bike, User } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { GlassButton } from '@/components/ui/buttons/GlassButton';

export default function BookingModal() {
    const { isOpen, closeBooking, serviceType } = useBooking();
    const [formData, setFormData] = useState({
        name: '',
        bikeModel: '',
        dropOffSlot: 'Morning (9 AM - 12 PM)'
    });

    // Drop-off windows logic
    const slots = [
        'Morning (9 AM - 12 PM)',
        'Afternoon (12 PM - 4 PM)',
        'Evening (4 PM - 8 PM)'
    ];

    const handleWhatsApp = () => {
        const message = `Hi MotoFit, I'd like to book a service.
    
👤 Name: ${formData.name || 'Rider'}
🏍️ Bike: ${formData.bikeModel || 'Not specified'}
🔧 Service: ${serviceType}
📅 Drop-off: ${formData.dropOffSlot}

Is this slot available?`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/917259625881?text=${encoded}`, '_blank');
        closeBooking();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeBooking}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none"
                    >
                        <div className="w-full max-w-md bg-[#0a0a0a] border border-[#333] rounded-2xl overflow-hidden shadow-2xl pointer-events-auto relative">

                            {/* Header */}
                            <div className="p-6 border-b border-[#333] bg-[#111]">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                                        Book Service
                                    </h3>
                                    <button onClick={closeBooking} className="text-gray-500 hover:text-white transition-colors">
                                        <X size={24} />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Select a flexible drop-off window. We'll confirm via WhatsApp.
                                </p>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-5">

                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-[#ff5e1a] uppercase">Rider Identity</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full bg-[#050505] border border-[#333] rounded-lg py-3 pl-10 pr-4 text-white focus:border-[#ff5e1a] focus:outline-none transition-colors"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Bike */}
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-[#ff5e1a] uppercase">Machine Details</label>
                                    <div className="relative">
                                        <Bike className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Bike Model (e.g. GT 650)"
                                            className="w-full bg-[#050505] border border-[#333] rounded-lg py-3 pl-10 pr-4 text-white focus:border-[#ff5e1a] focus:outline-none transition-colors"
                                            value={formData.bikeModel}
                                            onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Slot Selection */}
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-[#ff5e1a] uppercase">Drop-off Window</label>
                                    <div className="grid gap-2">
                                        {slots.map((slot) => (
                                            <button
                                                key={slot}
                                                onClick={() => setFormData({ ...formData, dropOffSlot: slot })}
                                                className={`text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-3 ${formData.dropOffSlot === slot
                                                    ? 'bg-[#ff5e1a]/10 border-[#ff5e1a] text-white'
                                                    : 'bg-[#151515] border-[#333] text-gray-400 hover:border-gray-500'
                                                    }`}
                                            >
                                                <Clock size={16} className={formData.dropOffSlot === slot ? 'text-[#ff5e1a]' : 'text-gray-500'} />
                                                <span className="text-sm font-medium">{slot}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-[#333] bg-[#050505]">
                                <GlassButton
                                    variant="cyan"
                                    className="w-full justify-center group"
                                    onClick={handleWhatsApp}
                                >
                                    <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" />
                                    Confirm via WhatsApp
                                </GlassButton>
                                <p className="text-center text-[10px] text-gray-600 mt-3">
                                    Direct connection with Shop Manager. No bots.
                                </p>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
