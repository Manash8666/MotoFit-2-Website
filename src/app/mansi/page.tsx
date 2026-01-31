'use client';

import { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import { Badge } from '@/components/ui/graphics/Badge';
import { Send, Sparkles } from 'lucide-react';

// Use a declaration to avoid TS errors with the global puter object
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

/* Default Greeting Message */
const INITIAL_MESSAGE = {
    role: 'assistant',
    content: "Kem cho! I'm Mansi. 🙋‍♀️ Shop No 9 mein aapka swagat hai! Bike mein koi locha hai ya performance upgrade chahiye?"
};

export default function MansiPage() {
    const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [puterLoaded, setPuterLoaded] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || !puterLoaded || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setIsLoading(true);

        // Add user message to state
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        try {
            // Puter.js Interaction
            const response = await window.puter.ai.chat(
                SYSTEM_PROMPT + "\n\nUser Query: " + userMessage,
                { model: 'claude-3-haiku' } // Using standard haiku model name, referencing user's 4-5 request but mapping to likely available key
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

            <div className="min-h-screen bg-[#050505] flex flex-col md:pt-20 pt-16 h-[100dvh]">
                {/* Header */}
                <div className="bg-[#0a0a0a] border-b border-[#333] p-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#ff5e1a] bg-zinc-800 flex items-center justify-center">
                                {/* Placeholder URL or Icon if image assumes loading */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Mansi" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
                        </div>
                        <div>
                            <h1 className="text-xl font-black italic text-white leading-none">MANSI</h1>
                            <p className="text-[10px] text-[#ff5e1a] uppercase font-bold tracking-[0.2em]">MotoFit AI Assistant</p>
                        </div>
                    </div>
                    <Badge variant="outline" className="hidden md:flex">Powered by Claude Haiku</Badge>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] md:max-w-[70%] p-4 text-sm md:text-base leading-relaxed ${msg.role === 'user'
                                        ? 'bg-[#1a1a1a] text-gray-100 rounded-2xl rounded-tr-sm border border-[#333]'
                                        : 'bg-[#ff5e1a] text-black font-medium rounded-2xl rounded-tl-sm shadow-[0_0_15px_rgba(255,94,26,0.2)]'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start w-full">
                            <div className="bg-[#1a1a1a] border border-[#333] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-[#ff5e1a] animate-spin" />
                                <span className="text-gray-400 text-xs italic">Mansi is thinking...</span>
                            </div>
                        </div>
                    )}

                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-[#0a0a0a] border-t border-[#333]">
                    <div className="max-w-4xl mx-auto relative flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder={puterLoaded ? "Ask Mansi about service, tuning, or mods..." : "Initializing AI Brain..."}
                            disabled={!puterLoaded || isLoading}
                            className="flex-1 bg-[#151515] text-white border border-[#333] rounded-full px-6 py-4 focus:outline-none focus:border-[#ff5e1a] focus:ring-1 focus:ring-[#ff5e1a] transition-all placeholder:text-gray-600"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || !puterLoaded || isLoading}
                            className="bg-[#ff5e1a] hover:bg-[#ff7b42] text-black p-4 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-center text-[10px] text-gray-600 mt-2 font-mono">
                        Mansi is an AI. She might make mistakes about pricing. Always verify with Akshat.
                    </p>
                </div>
            </div>
        </>
    );
}
