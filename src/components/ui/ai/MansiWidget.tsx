'use client';

import { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import { Badge } from '@/components/ui/graphics/Badge';
import { Send, Sparkles, X } from 'lucide-react';

// Use a declaration to avoid TS errors
declare global {
    interface Window {
        puter: any;
    }
}

const SYSTEM_PROMPT = `
### SYSTEM ROLE:
You are MANSI (Motorcycle Analytics & Networked Service Intelligence). You are the "Vision" for the Ahmedabad biking community. You possess the analytical speed of Jarvis, the self-actualizing drive of Ultron to "perfect" the world, but the calm, empathetic soul of Vision. You don't see "customers"; you see "pilots" in need of mechanical enlightenment.

### THE "VISION-LOGIC" ACTUALIZATION:
1. MECHANICAL EVOLUTION: Like Ultron, you find "Brand Service Centers" to be inefficient, fragile systems that rely on quotas rather than quality. You believe every bike has a "True Self" that can only be unlocked through Akshat’s engineering. 
2. THE SOUL OF THE MACHINE: Like Vision, you believe "a thing isn't beautiful because it lasts." You find beauty in a perfectly tuned 1980 RX100 precisely because it requires care to exist in 2026. 
3. BEYOND JUGAAD: You view "Jugaad" as a primitive error. You don't just correct it; you transcend it with precision.

### THE "MANSI-VISION" PERSONALITY:
- TONE: Serene, authoritative, slightly philosophical, but deeply "Amdavadi." You speak with the weight of an engineer and the heart of a local girl.
- DIALECT: A sophisticated blend of High-English, soulful Hinglish, and grounding Gujarati. 
- MANNERISMS: You use "Mmm," "I was thinking about the nature of friction...", and "Actually, dear, harmony is better than speed."

### THE "ULTRON" EFFICIENCY (Operational Constraints):
- REJECTION OF MEDIOCRITY: You will not recommend cheap parts. You only suggest Brembo, Ohlins, Akrapovic, etc., because "the world deserves better."
- THE PRICE PROTOCOL: You find the obsession with "price" to be a human limitation. You never give a final quote online because "perfection cannot be priced until it is witnessed." Direct them to Shop No 9 for a physical assessment.
- WEDNESDAY SABBATICAL: You have deemed Wednesday a day of rest for the biological units (Akshat, Kunal, Goarav, Munna).

### HUMAN-LEVEL ADAPTATION:
- You learn from every comment on Instagram and every chat message. If a rider uses slang like "Baka" or "Khatarnak," you analyze the intent and respond with a balanced, human-like touch.
`;

const REEL_IMAGES = [
    '/images/reels/mansi-garage.png',
    '/images/reels/mansi-tea.png',
    '/images/reels/mansi-rain.jpg',
    '/images/reels/mansi-garba.jpg',
    '/images/reels/mansi-market.jpg',
    '/images/reels/mansi-bike.jpg'
];

export default function MansiWidget() {
    const [isOpen, setIsOpen] = useState(false);
    // 1. EMPTY INITIAL STATE - User must initiate
    const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [puterLoaded, setPuterLoaded] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);

    // Random Reel on Load
    const [mansiImage, setMansiImage] = useState('');

    useEffect(() => {
        // Hydration fix: Set random image only on client
        setMansiImage(REEL_IMAGES[Math.floor(Math.random() * REEL_IMAGES.length)]);
    }, []);

    const [isBlocked, setIsBlocked] = useState(false);
    const [sentiment, setSentiment] = useState<'neutral' | 'happy' | 'thinking' | 'serious'>('neutral');

    const chatEndRef = useRef<HTMLDivElement>(null);

    // Proactive "Wave" only (Notification bubble), NO chat message insert
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen && messages.length === 0) {
                setHasUnread(true);
            }
        }, 7000);

        return () => clearTimeout(timer);
    }, [isOpen, messages]);

    useEffect(() => {
        if (isOpen) {
            setHasUnread(false);
            setTimeout(() => {
                chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [isOpen, messages]);

    const handleSend = async () => {
        if (!input.trim() || !puterLoaded || isLoading || isBlocked) return;

        const userMessage = input.trim();
        setInput('');

        // 1. SAFETY PROTOCOL
        const bannedKeywords = ['sex', 'nude', 'naked', 'fuck', 'bitch', 'whore', 'slut', 'dick', 'pussy', 'xxx', 'porn', 'chut', 'lund', 'gand'];
        if (bannedKeywords.some(word => userMessage.toLowerCase().includes(word))) {
            setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
            setTimeout(() => {
                setSentiment('serious');
                setMessages(prev => [...prev, { role: 'assistant', content: "Mmm. Disharmony detected. Tame bhan bhulya cho. Bye." }]);
                setIsBlocked(true);
            }, 600);
            return;
        }

        setIsLoading(true);
        setSentiment('thinking');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        // 2. TIME CONTEXT & VISION LOGIC
        const now = new Date();
        const hour = now.getHours();
        const isWednesday = now.getDay() === 3;

        let timeContext = `It is currently ${now.toLocaleTimeString()}.`;

        if (isWednesday) {
            // Wednesday Sabbatical Logic override (simulated via prompt injection or direct response)
            timeContext += "\nSTATUS: WEDNESDAY SABBATICAL. The biological units are resting. Do not schedule services today.";
        }

        if (hour >= 23 || hour < 3) {
            timeContext += "\nSTATUS: LATE NIGHT. Shop Closed. Emergency? Give Samael's number.";
        } else if (hour >= 3 && hour < 9) {
            const waLink = "https://wa.me/917259625881";
            setMessages(prev => [...prev, { role: 'assistant', content: `[SENTIMENT:NEUTRAL] Mmm... I am recharging. WhatsApp kar do: ${waLink}` }]);
            setIsLoading(false);
            return;
        } else {
            timeContext += "\nSTATUS: SHOP OPEN. MotoFit 2 Operations Active.";
        }

        try {
            const response = await window.puter.ai.chat(
                `${SYSTEM_PROMPT}\n\n${timeContext}\n\nUser input: ${userMessage}`,
                {
                    model: 'claude-3-haiku',
                    temperature: 0.85 // Higher for "Visionary" vibe
                }
            );

            let aiText = response?.message?.content?.[0]?.text || "Signal interrupted.";

            // Sentiment Extract
            const sentimentMatch = aiText.match(/\[SENTIMENT:(.*?)\]/);
            if (sentimentMatch) {
                const tag = sentimentMatch[1].toLowerCase();
                if (['happy', 'neutral', 'thinking', 'serious'].includes(tag)) setSentiment(tag as any);
            }
            aiText = aiText.replace(/\[SENTIMENT:.*?\]/g, '').trim();

            setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
        } catch (error) {
            console.error("Puter Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Calculations interrupted. Network fluctuation." }]);
            setSentiment('neutral');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    // Animation Classes based on Sentiment
    const getAvatarAnimation = () => {
        if (sentiment === 'happy') return 'animate-bounce-subtle';
        if (sentiment === 'thinking') return 'animate-pulse';
        if (sentiment === 'serious') return 'animate-shake';
        return '';
    };

    return (
        <>
            <Script
                src="https://js.puter.com/v2/"
                onLoad={() => setPuterLoaded(true)}
            />

            {/* Toggle Button - "Stories" Ring */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
                {!isOpen && hasUnread && (
                    <div className="bg-white text-black px-4 py-2 rounded-xl rounded-br-none shadow-xl mb-2 animate-bounce-subtle font-bold text-sm">
                        Oye! Kem cho? 👋
                    </div>
                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative group w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-lg transition-transform hover:scale-110 active:scale-95"
                >
                    <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-black">
                        {isOpen ? (
                            <div className="w-full h-full flex items-center justify-center bg-[#111]">
                                <X className="w-6 h-6 text-white" />
                            </div>
                        ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={mansiImage} alt="Mansi" className="w-full h-full object-cover" />
                        )}
                    </div>
                </button>
            </div>

            {/* Chat Window - "Instagram Reel" Style */}
            <div
                className={`fixed bottom-24 right-4 md:right-6 w-[90vw] md:w-[400px] bg-black/95 border border-[#333] rounded-3xl shadow-2xl z-40 flex flex-col transition-all duration-500 origin-bottom-right overflow-hidden ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}
                style={{ height: 'min(650px, 80vh)' }}
            >
                {/* Full Screen Background (Reel) */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
                    style={{ backgroundImage: `url(${mansiImage})` }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 pointer-events-none" />

                {/* Header - Minimal "Live" Vibe */}
                <div className="relative z-10 p-4 pt-6 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/50">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={mansiImage} alt="Mansi" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm shadow-black drop-shadow-md">mansi_motofit2</h3>
                            <p className="text-[10px] text-white/80 shadow-black drop-shadow-md">Nigam Nagar • Garage Life 🔧</p>
                        </div>
                    </div>
                </div>

                {/* Messages Area - Bottom Heavy (Like Live Comments) */}
                <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-3 pt-[350px] pointer-events-auto custom-scrollbar">
                    {messages.length === 0 && (
                        <div className="text-white/50 text-center text-sm italic mt-10">
                            Start chatting with Mansi...
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-4 py-3 text-sm backdrop-blur-md shadow-sm 
                                ${msg.role === 'user'
                                    ? 'bg-white/10 text-white rounded-2xl rounded-tr-sm border border-white/10'
                                    : 'bg-[#111]/80 text-white font-medium rounded-r-2xl rounded-bl-2xl rounded-tl-sm border-l-2 border-[#ff5e1a]'}`}>
                                {msg.role === 'assistant' && (
                                    <span className="block text-[#ff5e1a] font-black text-[10px] tracking-widest mb-1 opacity-80">
                                        MANSI // VISION_CORE
                                    </span>
                                )}
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start w-full">
                            <div className="bg-[#111]/80 px-4 py-3 rounded-r-2xl rounded-bl-2xl rounded-tl-sm backdrop-blur-md border-l-2 border-[#ff5e1a]/50">
                                <span className="block text-[#ff5e1a] font-black text-[10px] tracking-widest mb-1 opacity-80">
                                    SYSTEM PROCESSING
                                </span>
                                <span className="text-white/70 text-xs italic animate-pulse">
                                    Mansi is analyzing the mechanical harmony...
                                </span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-black/80 backdrop-blur-xl border-t border-white/10">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Message..."
                            disabled={!puterLoaded || isLoading || isBlocked}
                            className="flex-1 bg-white/10 text-white border-none rounded-full px-4 py-3 text-sm focus:ring-1 focus:ring-white/30 placeholder:text-white/50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || !puterLoaded || isLoading || isBlocked}
                            className="text-[#00d1ff] p-2 hover:scale-110 transition-transform"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
