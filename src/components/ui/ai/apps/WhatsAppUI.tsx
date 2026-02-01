
// src/components/ui/ai/apps/WhatsAppUI.tsx
import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Message {
    role: string;
    content: string;
}

interface WhatsAppUIProps {
    messages: Message[];
    input: string;
    setInput: (val: string) => void;
    onSend: () => void;
    isLoading: boolean;
    mansiImage?: string;
}

export function WhatsAppUI({ messages, input, setInput, onSend, isLoading, mansiImage }: WhatsAppUIProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div className="flex flex-col h-full bg-[#E5DDD5] relative font-sans">
            {/* WhatsApp Background - Mansi Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 opacity-20 pointer-events-none"
                style={{ backgroundImage: `url(${mansiImage || '/images/reels/mansi-garage.png'})` }}
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 z-0 bg-white/40 pointer-events-none" />

            {/* Header */}
            <div className="bg-[#075E54] p-3 flex items-center gap-3 text-white z-10 shadow-md">
                <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden relative">
                    <img src="/images/reels/mansi-garage.png" alt="Mansi" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-bold text-sm">Mansi (MotoFit)</h3>
                    <p className="text-xs text-white/80">online</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 z-10 custom-scrollbar">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`
                            max-w-[80%] px-3 py-2 text-sm rounded-lg shadow-sm relative
                            ${msg.role === 'user' ? 'bg-[#DCF8C6] text-black rounded-tr-none' : 'bg-white text-black rounded-tl-none'}
                        `}>
                            {msg.content}
                            <span className="text-[10px] text-gray-500 block text-right mt-1 leading-none">
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white px-3 py-2 text-sm rounded-lg shadow-sm text-gray-500 italic">
                            typing...
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div className="p-2 bg-[#F0F0F0] flex items-center gap-2 z-10">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSend()}
                    placeholder="Type a message"
                    className="flex-1 bg-white rounded-full px-4 py-2 text-sm focus:outline-none border-none shadow-sm"
                />
                <button
                    onClick={onSend}
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 bg-[#075E54] rounded-full flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
}
