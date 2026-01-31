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
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [puterLoaded, setPuterLoaded] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isChatOpen]);

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

            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-700">

                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff5e1a] opacity-5 blur-[150px] pointer-events-none" />

                {/* State 1: Landing (Image Only) */}
                <div
                    className={`transition-all duration-700 ease-in-out flex flex-col items-center ${isChatOpen ? 'translate-y-[-20px] scale-90 md:scale-75' : 'scale-100'
                        }`}
                >
                    <div
                        onClick={() => setIsChatOpen(true)}
                        className={`relative cursor-pointer group transition-all duration-500 ${isChatOpen ? 'w-32 h-32 md:w-40 md:h-40' : 'w-64 h-64 md:w-80 md:h-80'
                            } rounded-full border-4 border-[#ff5e1a] shadow-[0_0_50px_rgba(255,94,26,0.3)] overflow-hidden hover:shadow-[0_0_80px_rgba(255,94,26,0.6)]`}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/mansi-avatar.png"
                            alt="Mansi AI"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>

                    {!isChatOpen && (
                        <div className="mt-8 text-center animate-fade-in-up">
                            <h1 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter">
                                MANSI
                            </h1>
                            <p className="text-[#ff5e1a] tracking-[0.3em] text-sm md:text-base font-bold mt-2 uppercase">
                                Tap to Chat
                            </p>
                        </div>
                    )}
                </div>

                {/* State 2: Chat Interface (Reveals Below) */}
                <div
                    className={`w-full max-w-2xl bg-[#0a0a0a] border border-[#333] rounded-t-3xl shadow-2xl transition-all duration-700 ease-out transform ${isChatOpen ? 'translate-y-0 opacity-100 h-[70vh]' : 'translate-y-full opacity-0 h-0 overflow-hidden'
                        } flex flex-col`}
                >
                    {/* Chat Header */}
                    <div className="p-4 border-b border-[#222] flex items-center justify-between bg-[#111]">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#ff5e1a]" />
                            <span className="text-white font-bold tracking-wider">LIVE CHAT</span>
                        </div>
                        <button
                            onClick={() => setIsChatOpen(false)}
                            className="text-gray-500 hover:text-white text-xs uppercase hover:underline"
                        >
                            Close
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#050505]">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] p-3 md:p-4 text-sm md:text-base leading-relaxed ${msg.role === 'user'
                                            ? 'bg-[#1a1a1a] text-gray-100 rounded-2xl rounded-tr-sm border border-[#333]'
                                            : 'bg-[#ff5e1a] text-black font-medium rounded-2xl rounded-tl-sm shadow-[0_0_10px_rgba(255,94,26,0.1)]'
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
                    <div className="p-4 bg-[#111] border-t border-[#222]">
                        <div className="relative flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder={puterLoaded ? "Pucho..." : "Initializing..."}
                                disabled={!puterLoaded || isLoading}
                                className="flex-1 bg-[#050505] text-white border border-[#333] rounded-full px-5 py-3 focus:outline-none focus:border-[#ff5e1a] focus:ring-1 focus:ring-[#ff5e1a] transition-all"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || !puterLoaded || isLoading}
                                className="bg-[#ff5e1a] hover:bg-[#ff7b42] text-black p-3 rounded-full transition-all disabled:opacity-50 transform active:scale-95"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
