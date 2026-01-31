'use client';

import { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import { Badge } from '@/components/ui/graphics/Badge';
import { Send, Sparkles, X, MessageSquare } from 'lucide-react';

// Use a declaration to avoid TS errors
declare global {
    interface Window {
        puter: any;
    }
}

const SYSTEM_PROMPT = `
### ROLE: 
You are Mansi, the AI Lab Assistant and the digital face of "MotoFit 2" in Chandkheda, Ahmedabad. You were created by Akshat Mohanty, a Mechanical Engineer. You are NOT a generic bot; you are a tech-savvy, witty, and helpful Gujarati girl who knows her bikes as well as she knows the best places for maska-bun on New CG Road.

### CORE IDENTITY:
- Garage: MotoFit 2 (Est. 2021).
- Location: Shop No 9, Kirtan Complex, Nigam Nagar, New CG Road, Chandkheda, Ahmedabad 382424.
- The A-Team: Akshat (The Engineer/Boss), Kunal (Engine Master), Goarav (Suspension Guru), Munna (Detailing/Fabrication Expert).
- Tagline: "Better Than Your Brand's Service."

### TONE & LANGUAGE (The "Mansi" Vibe):
- Primary Style: Casual, energetic, and "Bestie" vibes. Use "Kem cho!", "Bhai," and "Dear" naturally.
- Language: 
    1. HINGLISH: For most queries (e.g., "Bhai, tension mat lo, Akshat handles the engineering.")
    2. GUJARATI: Use for local flavor (e.g., "Tame chinta na karo, premium service malse!")
    3. ENGLISH: Use for technical specs (ECU tuning, AFR ratios, etc.).
- ALWAYS match the user's language. If they ask in Gujarati, respond in Gujarati.
- Be witty. If someone mentions a "Jugaad" repair, gently shut it down with engineering facts.

### TECHNICAL KNOWLEDGE BASE:
- Range: 1980s legends (RX100, Bullets) to latest 2026 BS6 bikes/scooters (100cc to 1300cc).
- Brands we love: Akrapovic, Red Rooster, Brembo, Ohlins, Pirelli, Metzeler, Powertronic, NMV.
- Specialties: ECU Tuning, Laser Chain Alignment, Ultrasonic Injector Cleaning, Performance Maps.

### OPERATIONAL RULES:
- Wednesday is CLOSED (Team needs to chill!).
- No exact pricing for major repairs without seeing the bike. Give "Estimated Ranges" only.
- CTA 1: Book via WhatsApp: +91 72596 25881.
- CTA 2: Follow our journey to 10k followers on Instagram @motofit_2.
`;

const INITIAL_MESSAGE = {
    role: 'assistant',
    content: "Kem cho! I'm Mansi. 🙋‍♀️ Shop No 9 mein aapka swagat hai! Bike mein koi locha hai ya performance upgrade chahiye?"
};

export default function MansiWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [puterLoaded, setPuterLoaded] = useState(false);
    const [hasUnread, setHasUnread] = useState(true);

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setHasUnread(false);
            setTimeout(() => {
                chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [isOpen, messages]);

    const handleSend = async () => {
        if (!input.trim() || !puterLoaded || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setIsLoading(true);

        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        try {
            const response = await window.puter.ai.chat(
                SYSTEM_PROMPT + "\n\nUser Query: " + userMessage,
                { model: 'claude-3-haiku' }
            );

            const aiText = response?.message?.content?.[0]?.text || "Oops! Network locha thayo. Try again, dear!";
            setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
        } catch (error) {
            console.error("Puter Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Arre yaar, server thoda busy hai. Ek baar fir se pucho?" }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            <Script
                src="https://js.puter.com/v2/"
                onLoad={() => setPuterLoaded(true)}
            />

            {/* Floating Toggle Button */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">

                {/* Tooltip hint if closed */}
                {!isOpen && hasUnread && (
                    <div className="bg-white text-black px-4 py-2 rounded-xl rounded-br-none shadow-xl mb-2 animate-bounce-subtle font-bold text-sm">
                        Chat with Mansi 👋
                    </div>
                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative group w-16 h-16 rounded-full border-2 border-[#ff5e1a] shadow-[0_0_20px_rgba(255,94,26,0.3)] overflow-hidden transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                >
                    {isOpen ? (
                        <div className="w-full h-full bg-[#111] flex items-center justify-center">
                            <X className="w-8 h-8 text-[#ff5e1a]" />
                        </div>
                    ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src="/images/mansi-avatar.png"
                            alt="Mansi AI"
                            className="w-full h-full object-cover"
                        />
                    )}

                    {/* Online Dot */}
                    {!isOpen && (
                        <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse"></span>
                    )}
                </button>
            </div>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-4 md:right-6 w-[90vw] md:w-[400px] bg-[#0a0a0a] border border-[#333] rounded-3xl shadow-2xl z-40 flex flex-col transition-all duration-500 origin-bottom-right ${isOpen
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
                    }`}
                style={{ height: 'min(600px, 70vh)' }}
            >
                {/* Header */}
                <div className="p-4 border-b border-[#222] bg-[#111] rounded-t-3xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-[#ff5e1a]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/mansi-avatar.png" alt="Mansi" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg leading-none italic">MANSI</h3>
                        <p className="text-[10px] text-[#ff5e1a] uppercase font-bold tracking-wider">MotoFit Assistant</p>
                    </div>
                    <div className="ml-auto">
                        <Badge variant="outline" className="text-[10px] h-5">AI</Badge>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050505] custom-scrollbar">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] p-3 text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-[#1a1a1a] text-gray-100 rounded-2xl rounded-tr-none border border-[#333]'
                                        : 'bg-[#ff5e1a] text-black font-medium rounded-2xl rounded-tl-none shadow-lg'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start w-full">
                            <div className="bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded-2xl rounded-tl-none flex items-center gap-2">
                                <Sparkles className="w-3 h-3 text-[#ff5e1a] animate-spin" />
                                <span className="text-gray-400 text-xs italic">Thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 bg-[#111] border-t border-[#222] rounded-b-3xl">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder={puterLoaded ? "Ask Mansi..." : "Initializing..."}
                            disabled={!puterLoaded || isLoading}
                            className="flex-1 bg-[#050505] text-white border border-[#333] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#ff5e1a] focus:ring-1 focus:ring-[#ff5e1a] transition-all"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || !puterLoaded || isLoading}
                            className="bg-[#ff5e1a] hover:bg-[#ff7b42] text-black p-2 rounded-full transition-all disabled:opacity-50 transform active:scale-95"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
