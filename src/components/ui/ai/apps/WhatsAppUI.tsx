
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
    const [viewProfile, setViewProfile] = React.useState(false);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div className="flex flex-col h-full bg-[#0b141a] relative font-sans text-[#e9edef]">
            {/* WhatsApp Background - Persistent Wallpaper */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 opacity-40 pointer-events-none"
                style={{ backgroundImage: `url('/images/reels/mansi-whatsapp-bg.jpg')` }}
            />
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 z-0 bg-[#0b141a]/70 pointer-events-none" />

            {/* Header */}
            <div className="bg-[#202c33] p-3 flex items-center gap-3 z-10 shadow-md">
                <button onClick={() => setViewProfile(true)} className="w-10 h-10 rounded-full overflow-hidden relative active:scale-95 transition-transform">
                    <img src={mansiImage || "/images/reels/mansi-garage.png"} alt="Mansi" className="w-full h-full object-cover" />
                </button>
                <div className="cursor-pointer" onClick={() => setViewProfile(true)}>
                    <h3 className="font-bold text-sm text-[#e9edef]">Mansi</h3>
                    <p className="text-xs text-[#8696a0]">online</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 z-10 custom-scrollbar pointer-events-auto overscroll-contain">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`
                            max-w-[80%] px-3 py-2 text-sm rounded-lg shadow-sm relative text-[#e9edef]
                            ${msg.role === 'user' ? 'bg-[#005c4b] rounded-tr-none' : 'bg-[#202c33] rounded-tl-none'}
                        `}>
                            {msg.content}
                            <span className="text-[10px] text-[#8696a0] block text-right mt-1 leading-none">
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-[#202c33] px-3 py-2 text-sm rounded-lg shadow-sm text-[#8696a0] italic">
                            typing...
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div className="p-2 bg-[#202c33] flex items-center gap-2 z-10">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSend()}
                    placeholder="Type a message"
                    className="flex-1 bg-[#2a3942] text-[#e9edef] rounded-full px-4 py-2 text-sm focus:outline-none border-none placeholder-[#8696a0]"
                />
                <button
                    onClick={onSend}
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform disabled:opacity-50 disabled:grayscale"
                >
                    <Send size={18} />
                </button>
            </div>

            {/* Profile Picture Viewer Overlay */}
            {viewProfile && (
                <div
                    className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setViewProfile(false)}
                >
                    <div className="w-full aspect-square max-w-[300px] rounded-full overflow-hidden border-4 border-[#00a884] shadow-[0_0_50px_rgba(0,168,132,0.3)] mb-4">
                        <img src={mansiImage || "/images/reels/mansi-garage.png"} alt="Mansi Full" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[#e9edef] text-sm font-medium">Mansi</p>
                    <p className="text-[#00a884] text-xs mt-1">~ +91 999 888 7777</p>
                </div>
            )}
        </div>
    );
}
