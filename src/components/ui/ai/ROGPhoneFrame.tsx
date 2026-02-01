
// src/components/ui/ai/ROGPhoneFrame.tsx
import React, { useState, useEffect } from 'react';
import { TimeLogic, AppMode } from '@/services/mansi/utils/time-logic';
import { WhatsAppUI } from './apps/WhatsAppUI';
import { InstagramUI } from './apps/InstagramUI';
import { X, Battery, Wifi, Signal } from 'lucide-react';

interface ROGPhoneFrameProps {
    isOpen: boolean;
    onClose: () => void;
    messages: any[];
    input: string;
    setInput: (val: string) => void;
    onSend: () => void;
    isLoading: boolean;
    mansiImage: string;
}

export function ROGPhoneFrame({ isOpen, onClose, messages, input, setInput, onSend, isLoading, mansiImage }: ROGPhoneFrameProps) {
    const [currentTime, setCurrentTime] = useState('');
    const [activeApp, setActiveApp] = useState<AppMode>('whatsapp'); // Default
    const [manualOverride, setManualOverride] = useState<AppMode | null>(null);

    // Clock & Auto-Switch Logic
    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

            // Auto-switch only if no manual override
            if (!manualOverride) {
                setActiveApp(TimeLogic.getCurrentApp());
            }
        };

        updateTime(); // Initial
        const interval = setInterval(updateTime, 60000); // Every minute
        return () => clearInterval(interval);
    }, [manualOverride]);

    const handleAppSwitch = (app: AppMode) => {
        setManualOverride(app);
        setActiveApp(app);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-auto">
            {/* The ASUS ROG Phone 9 Shell */}
            <div
                className="relative w-[380px] h-[800px] bg-[#0f0c29] rounded-[40px] border-[3px] border-[#00c8ff] shadow-[0_0_40px_rgba(0,200,255,0.4)] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300"
                style={{
                    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)'
                }}
            >
                {/* Status Bar */}
                <div className="h-8 bg-black/40 flex justify-between items-center px-4 text-white text-xs select-none z-20">
                    <span className="font-mono text-[#00c8ff] font-bold">ROG 9 ULTIMATE</span>
                    <div className="flex items-center gap-2">
                        <Wifi size={12} />
                        <Signal size={12} />
                        <span>{currentTime}</span>
                        <Battery size={12} />
                    </div>
                </div>

                {/* Main App Container */}
                <div className="flex-1 overflow-hidden relative bg-black">
                    {activeApp === 'whatsapp' ? (
                        <WhatsAppUI
                            messages={messages}
                            input={input}
                            setInput={setInput}
                            onSend={onSend}
                            isLoading={isLoading}
                        />
                    ) : (
                        <InstagramUI
                            messages={messages}
                            input={input}
                            setInput={setInput}
                            onSend={onSend}
                            isLoading={isLoading}
                        />
                    )}

                    {/* Close Button (Floating) */}
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 z-50 bg-black/50 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* The Navigation Dock */}
                <div className="h-20 bg-black/30 backdrop-blur-md border-t border-white/5 flex items-center justify-center gap-8 z-20">
                    <button
                        onClick={() => handleAppSwitch('whatsapp')}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 
                            ${activeApp === 'whatsapp' ? 'bg-[#25D366] shadow-[0_0_15px_#25D366] scale-110' : 'bg-white/10 grayscale hover:grayscale-0'}`}
                    >
                        💬
                    </button>

                    <button
                        onClick={() => handleAppSwitch('instagram')}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 
                            ${activeApp === 'instagram' ? 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-[0_0_15px_#dc2743] scale-110' : 'bg-white/10 grayscale hover:grayscale-0'}`}
                    >
                        📸
                    </button>

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 w-32 h-1 bg-white/20 rounded-full" />
                </div>
            </div>
        </div>
    );
}
