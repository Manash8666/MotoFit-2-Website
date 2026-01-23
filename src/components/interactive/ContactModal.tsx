'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactForm } from '@/actions/contact';
import { GlassButton } from '@/components/ui/buttons/GlassButton';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (formData: FormData) => {
        setStatus('submitting');
        try {
            const result = await submitContactForm(formData);
            if (result.success) {
                setStatus('success');
            } else {
                setStatus('error');
                setErrorMessage('Translation failed. Please try again.');
            }
        } catch (e) {
            setStatus('error');
            setErrorMessage('Network anomaly detected.');
        }
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
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] grid place-items-center p-4 scrollbar-none overflow-y-auto"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg bg-[#0a0a0a] border border-[#333] relative overflow-hidden shadow-2xl shadow-orange-500/10"
                        >
                            {/* Decorative Header */}
                            <div className="h-1 w-full bg-gradient-to-r from-[#ff5e1a] via-[#00d1ff] to-[#ff5e1a]" />
                            <div className="absolute top-0 right-0 p-2 z-10">
                                <button
                                    onClick={onClose}
                                    className="p-2 text-[#666] hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8">
                                {status === 'success' ? (
                                    <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-4">
                                            <CheckCircle size={32} />
                                        </div>
                                        <h3 className="text-2xl font-black text-white uppercase">Transmission Received</h3>
                                        <p className="text-[#999]">
                                            Our engineers are analyzing your data. Expect a secure communication shortly.
                                        </p>
                                        <GlassButton onClick={onClose} variant="industrial" className="mt-6">
                                            Close Comm Link
                                        </GlassButton>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-black text-white uppercase mb-2">Initialize Project</h2>
                                        <p className="text-[#666] text-sm mb-8">
                                            Secure line established. Enter your build requirements.
                                        </p>

                                        <form action={handleSubmit} className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-mono text-[#ff5e1a] uppercase">Identity</label>
                                                <input
                                                    name="name"
                                                    required
                                                    placeholder="Pilot Name"
                                                    className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[#ff5e1a] focus:outline-none transition-colors placeholder:text-[#444]"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-mono text-[#ff5e1a] uppercase">Comm Frequency</label>
                                                <input
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder="email@domain.com"
                                                    className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[#ff5e1a] focus:outline-none transition-colors placeholder:text-[#444]"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-mono text-[#00d1ff] uppercase">Machine Spec</label>
                                                <input
                                                    name="bike"
                                                    placeholder="e.g. Royal Enfield Continental GT 650"
                                                    className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[#00d1ff] focus:outline-none transition-colors placeholder:text-[#444]"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-mono text-[#666] uppercase">Mission Parameters</label>
                                                <textarea
                                                    name="message"
                                                    required
                                                    rows={4}
                                                    placeholder="Describe your modification requirements..."
                                                    className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-white focus:outline-none transition-colors placeholder:text-[#444] resize-none"
                                                />
                                            </div>

                                            {status === 'error' && (
                                                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded">
                                                    <AlertCircle size={16} />
                                                    {errorMessage}
                                                </div>
                                            )}

                                            <GlassButton
                                                type="submit"
                                                variant="industrial"
                                                className="w-full justify-center"
                                                disabled={status === 'submitting'}
                                            >
                                                {status === 'submitting' ? (
                                                    <>
                                                        <Loader2 className="animate-spin mr-2" size={16} />
                                                        Transmitting...
                                                    </>
                                                ) : (
                                                    'Transmit Data'
                                                )}
                                            </GlassButton>
                                        </form>
                                    </>
                                )}
                            </div>

                            {/* Decorative Grid */}
                            <div className="absolute inset-0 grid grid-cols-6 gap-4 pointer-events-none opacity-5">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="border-r border-white last:border-r-0" />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
