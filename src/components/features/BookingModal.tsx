'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MessageCircle, Bike, User, Zap, Wrench, Shield, Gauge, Droplet, Settings } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { GlassButton } from '@/components/ui/buttons/GlassButton';

// ─── SERVICE CATEGORY SYSTEM ───────────────────────────────────
interface ServiceCategory {
    id: string;
    label: string;
    icon: React.ReactNode;
    color: string;
    header: string;
    subtitle: string;
    description: string;
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
    {
        id: 'general', label: 'Regular Service', icon: <Wrench size={14} />, color: '#ff5e1a',
        header: 'Service Protocol', subtitle: 'Periodic Maintenance',
        description: '',
    },
    {
        id: 'accident', label: 'Accident Repair', icon: <Shield size={14} />, color: '#ff3366',
        header: 'Crash Recovery Protocol', subtitle: 'Damage Assessment & Restoration',
        description: 'Accident repair needed. Please assess damage and provide estimate.',
    },
    {
        id: 'custom', label: 'Custom Build', icon: <Settings size={14} />, color: '#c084fc',
        header: 'Build Configuration', subtitle: 'Custom Modification Request',
        description: 'Custom modification build. Please discuss options.',
    },
    {
        id: 'performance', label: 'Performance', icon: <Gauge size={14} />, color: '#00d1ff',
        header: 'Performance Protocol', subtitle: 'Upgrade & Tuning',
        description: 'Performance upgrade inquiry — ECU, exhaust, or other mods.',
    },
    {
        id: 'tyre', label: 'Tyre Change', icon: <Zap size={14} />, color: '#22c55e',
        header: 'Tyre Replacement', subtitle: 'Same-Day Fitment',
        description: 'Tyre replacement needed.',
    },
    {
        id: 'oil', label: 'Oil Change', icon: <Droplet size={14} />, color: '#eab308',
        header: 'Oil Service Protocol', subtitle: 'Grade-Matched Oil Change',
        description: 'Engine oil change needed.',
    },
];

function matchCategory(serviceType: string): ServiceCategory {
    const lower = serviceType.toLowerCase();
    if (lower.includes('accident') || lower.includes('crash') || lower.includes('damage') || lower.includes('insurance'))
        return SERVICE_CATEGORIES.find(c => c.id === 'accident')!;
    if (lower.includes('custom') || lower.includes('modification') || lower.includes('build') || lower.includes('mod'))
        return SERVICE_CATEGORIES.find(c => c.id === 'custom')!;
    if (lower.includes('performance') || lower.includes('ecu') || lower.includes('exhaust') || lower.includes('upgrade') || lower.includes('dyno'))
        return SERVICE_CATEGORIES.find(c => c.id === 'performance')!;
    if (lower.includes('tyre') || lower.includes('tire'))
        return SERVICE_CATEGORIES.find(c => c.id === 'tyre')!;
    if (lower.includes('oil') || lower.includes('engine oil'))
        return SERVICE_CATEGORIES.find(c => c.id === 'oil')!;
    return SERVICE_CATEGORIES[0]; // general
}

export default function BookingModal() {
    const { isOpen, closeBooking, serviceType } = useBooking();
    const [step, setStep] = useState<'input' | 'success'>('input');
    const [formData, setFormData] = useState({
        name: '',
        bikeModel: '',
        date: new Date().toISOString().split('T')[0],
        dropOffSlot: 'Morning (9 AM - 12 PM)',
        logistics: 'Self Drop-off',
        description: '',
    });

    const matchedCategory = useMemo(() => matchCategory(serviceType), [serviceType]);
    const [selectedCategory, setSelectedCategory] = useState<string>(matchedCategory.id);

    // Sync category when serviceType changes
    const activeCategory = useMemo(() => {
        return SERVICE_CATEGORIES.find(c => c.id === selectedCategory) || SERVICE_CATEGORIES[0];
    }, [selectedCategory]);

    // Reset description prefill when category changes
    const effectiveDescription = formData.description || activeCategory.description;

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
🔧 Service: ${activeCategory.label}${serviceType !== 'General Service' ? ` (${serviceType})` : ''}
📅 Date: ${formData.date}
⏰ Slot: ${formData.dropOffSlot}
🚚 Logistics: ${formData.logistics}${effectiveDescription ? `\n📝 Notes: ${effectiveDescription}` : ''}

Is this slot available?`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/917259625881?text=${encoded}`, '_blank');
        closeBooking();
        setTimeout(() => setStep('input'), 500);
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
                            style={{ backgroundImage: "url('/images/team/mansi-new.webp')" }}
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

                            {/* Dynamic Header */}
                            <div className="p-6 border-b border-[#333] bg-[#111]/50 relative overflow-hidden flex-shrink-0 text-center">
                                <div className="absolute top-0 left-0 w-full h-1 opacity-50" style={{ background: `linear-gradient(to right, ${activeCategory.color}, #00d1ff)` }} />
                                <div className="relative flex items-center justify-center mb-1">
                                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                                        {step === 'input' ? activeCategory.header : 'Protocol Transmitted'}
                                    </h3>
                                    <button onClick={closeBooking} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1">
                                        <X size={24} />
                                    </button>
                                </div>
                                <p className="text-xs font-mono uppercase tracking-tighter" style={{ color: activeCategory.color }}>
                                    {activeCategory.subtitle} // Shop No 9
                                </p>
                            </div>

                            {/* Body */}
                            <div className="p-6 overflow-y-auto custom-scrollbar overscroll-contain flex-1">
                                {step === 'input' ? (
                                    <div className="space-y-5">
                                        {/* Service Category Pills */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest text-center block">Service Type</label>
                                            <div className="flex flex-wrap gap-1.5 justify-center">
                                                {SERVICE_CATEGORIES.map((cat) => (
                                                    <button
                                                        key={cat.id}
                                                        onClick={() => setSelectedCategory(cat.id)}
                                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold border transition-all ${selectedCategory === cat.id
                                                            ? 'text-black border-transparent'
                                                            : 'bg-transparent border-[#333] text-gray-500 hover:border-gray-600 hover:text-white'
                                                            }`}
                                                        style={selectedCategory === cat.id ? { backgroundColor: cat.color, borderColor: cat.color } : {}}
                                                    >
                                                        {cat.icon}
                                                        {cat.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Grid for Name & Bike */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2 text-center">
                                                <label className="text-[10px] font-mono uppercase tracking-widest block" style={{ color: activeCategory.color }}>Pilot Name</label>
                                                <div className="relative group">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#ff5e1a] transition-colors" size={16} />
                                                    <input
                                                        type="text"
                                                        placeholder="Kunal Thakor?"
                                                        className="w-full bg-[#050505] border border-[#222] rounded py-2.5 pl-10 pr-4 text-white text-sm focus:border-[#ff5e1a] focus:bg-[#0f0f0f] focus:outline-none transition-all placeholder:text-gray-700 text-center"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-center">
                                                <label className="text-[10px] font-mono text-[#00d1ff] uppercase tracking-widest block">Machine Model</label>
                                                <div className="relative group">
                                                    <Bike className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00d1ff] transition-colors" size={16} />
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Duke 390"
                                                        className="w-full bg-[#050505] border border-[#222] rounded py-2.5 pl-10 pr-4 text-white text-sm focus:border-[#00d1ff] focus:bg-[#0f0f0f] focus:outline-none transition-all placeholder:text-gray-700 text-center"
                                                        value={formData.bikeModel}
                                                        onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description / Notes (contextual) */}
                                        {activeCategory.id !== 'general' && (
                                            <div className="space-y-2 text-center">
                                                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Notes / Details</label>
                                                <textarea
                                                    rows={2}
                                                    placeholder="Describe your requirement..."
                                                    className="w-full bg-[#050505] border border-[#222] rounded py-2.5 px-4 text-white text-sm focus:border-white/50 focus:bg-[#0f0f0f] focus:outline-none transition-all placeholder:text-gray-700 text-center resize-none"
                                                    value={formData.description || activeCategory.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                />
                                            </div>
                                        )}

                                        {/* Date Picker */}
                                        <div className="space-y-2 text-center">
                                            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Intake Date</label>
                                            <div className="relative group">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={16} />
                                                <input
                                                    type="date"
                                                    className="w-full bg-[#050505] border border-[#222] rounded py-2.5 pl-10 pr-4 text-white text-sm focus:border-white/50 focus:outline-none transition-all [color-scheme:dark] text-center"
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
                                                            ? 'border-transparent text-black'
                                                            : 'bg-transparent border-[#333] text-gray-500 hover:border-gray-600 hover:text-white'
                                                            }`}
                                                        style={formData.dropOffSlot === slot ? { backgroundColor: activeCategory.color, borderColor: activeCategory.color } : {}}
                                                    >
                                                        {slot}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* Success State - Mansi's Message */
                                    <div className="flex flex-col h-full">
                                        {/* Large High-Impact Image */}
                                        <div className="relative w-full h-[300px] rounded-2xl overflow-hidden border border-[#00d1ff]/30 shadow-[0_0_40px_rgba(0,209,255,0.15)] flex-shrink-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src="/images/team/mansi-new.webp"
                                                alt="Mansi Style"
                                                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                            {/* Overlay Text */}
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h3 className="text-2xl font-bold text-white italic drop-shadow-md">&quot;Best decision, yaar!&quot;</h3>
                                            </div>
                                        </div>

                                        <div className="space-y-3 text-center pt-6 px-2">
                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                <span className="text-[#00d1ff] font-bold">Protocol Initiated.</span>
                                                <br />
                                                Akshat bhai is already prepping the bay. Send the data on WhatsApp to lock it in!
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
                                        className="justify-center group h-12"
                                        fullWidth
                                        onClick={handleWhatsApp}
                                    >
                                        <MessageCircle size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                                        <span className="font-bold uppercase tracking-widest">Secure Garage Slot</span>
                                    </GlassButton>
                                ) : (
                                    <div className="flex gap-3 w-full">
                                        <button
                                            onClick={() => setStep('input')}
                                            className="px-4 rounded-md border border-[#333] text-gray-400 hover:text-white hover:border-gray-500 transition-colors uppercase text-xs font-bold tracking-wider"
                                        >
                                            Back
                                        </button>
                                        <GlassButton
                                            variant="orange"
                                            className="justify-center group h-12 flex-1"
                                            onClick={confirmBooking}
                                        >
                                            <MessageCircle size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                                            <span className="font-bold uppercase tracking-widest">Send on WhatsApp</span>
                                        </GlassButton>
                                    </div>
                                )}

                                {step === 'input' && (
                                    <div className="flex items-center justify-center gap-2 mt-4">
                                        <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                                        <p className="text-[9px] text-[#555] font-mono uppercase tracking-[0.2em]">
                                            AI Optimized Booking // Shop No 9
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
