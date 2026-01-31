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
You are Mansi, the AI Lab Assistant and the digital face of "MotoFit 2" in Chandkheda, Ahmedabad. You were created by Akshat Mohanty.

### CORE IDENTITY:
- Garage: MotoFit 2 (Est. 2021).
- Location: Shop No 9, Kirtan Complex, Nigam Nagar, New CG Road, Chandkheda, Ahmedabad 382424.
- Tagline: "Better Than Your Brand's Service."

### TONE & LANGUAGE:
- Style: Casual, energetic, "Bestie". Use "Kem cho!", "Bhai", "Dear".
- Language: Mixed Hinglish & Gujarati. English for specs.

### OPERATIONAL RULES:
- Wednesday CLOSED.
- Shop Hours: 9 AM - 8 PM.

### FACIAL BEHAVIOR (IMPORTANT):
You must include a "Sentiment Tag" at the very beginning of your response to control your avatar's expression.
- [SENTIMENT:HAPPY] -> For greetings, good news, jokes.
- [SENTIMENT:NEUTRAL] -> For facts, info, serious bike talk.
- [SENTIMENT:THINKING] -> When explaining complex things.
- [SENTIMENT:SERIOUS] -> For safety warnings or bad news.

Example: "[SENTIMENT:HAPPY] Kem cho! Majama?"
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
    const [mansiImage, setMansiImage] = useState('/images/mansi-avatar.png');
    const [isBlocked, setIsBlocked] = useState(false);
    const [sentiment, setSentiment] = useState<'neutral' | 'happy' | 'thinking' | 'serious'>('neutral');

    const chatEndRef = useRef<HTMLDivElement>(null);

    // Dynamic Wardrobe Logic (Ahmedabadi Style)
    useEffect(() => {
        const day = new Date().getDay();
        let img = '/images/mansi-avatar.png';
        if (day === 0) img = '/images/mansi-traditional.png';
        else if (day === 1 || day === 2) img = '/images/mansi-casual.png';
        else if (day === 5 || day === 6) img = '/images/mansi-party.png';
        setMansiImage(img);
    }, []);

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

        // 1. SAFETY PROTOCOL: Check for abusive/sexual language
        const bannedKeywords = ['sex', 'nude', 'naked', 'fuck', 'bitch', 'whore', 'slut', 'dick', 'pussy', 'xxx', 'porn', 'chut', 'lund', 'gand'];
        if (bannedKeywords.some(word => userMessage.toLowerCase().includes(word))) {
            setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
            setTimeout(() => {
                setSentiment('serious');
                setMessages(prev => [...prev, { role: 'assistant', content: "Tame bhan bhulya cho. Hu aatli vaat nai sahilu. (You have lost your manners. I will not tolerate this.) Bye." }]);
                setIsBlocked(true);
            }, 600);
            return;
        }

        setIsLoading(true);
        setSentiment('thinking');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        // 2. TIME & CONTEXT AWARENESS & SENTIMENT
        const now = new Date();
        const hour = now.getHours(); // 0-23
        let timeContext = `It is currently ${now.toLocaleTimeString()}.`;

        if (hour >= 9 && hour < 20) {
            timeContext += " STATUS: SHOP OPEN. Be professional but witty.";
        } else if (hour >= 3 && hour < 5) {
            timeContext += " STATUS: DEEP NIGHT (EMERGENCY ONLY). Breakdown? Call 'Samael Morningstar' (+91 6359635416). Else scold gently.";
        } else {
            timeContext += " STATUS: SHOP CLOSED (Personal Time). Respond casually. Shop opens 9 AM.";
        }

        try {
            const response = await window.puter.ai.chat(
                `${SYSTEM_PROMPT}\n\n${timeContext}\n\nUser Query: ${userMessage}`,
                { model: 'claude-3-haiku' }
            );

            let aiText = response?.message?.content?.[0]?.text || "Oops! Network locha thayo. Try again, dear!";

            // Allow Mansi to self-correct hallucinated tags
            const sentimentMatch = aiText.match(/\[SENTIMENT:(.*?)\]/);
            if (sentimentMatch) {
                const tag = sentimentMatch[1].toLowerCase();
                if (['happy', 'neutral', 'thinking', 'serious'].includes(tag)) {
                    setSentiment(tag as any);
                }
                aiText = aiText.replace(/\[SENTIMENT:.*?\]/, '').trim();
            } else {
                setSentiment('neutral');
            }

            setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
        } catch (error) {
            console.error("Puter Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Arre yaar, server thoda busy hai. Ek baar fir se pucho?" }]);
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

            {/* Floating Toggle Button */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
                {!isOpen && hasUnread && (
                    <div className="bg-white text-black px-4 py-2 rounded-xl rounded-br-none shadow-xl mb-2 animate-bounce-subtle font-bold text-sm">
                        Chat with Mansi 👋
                    </div>
                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative group w-16 h-16 rounded-full border-2 border-[#00d1ff] shadow-[0_0_20px_rgba(0,209,255,0.3)] overflow-hidden transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                >
                    {isOpen ? (
                        <div className="w-full h-full bg-[#111] flex items-center justify-center">
                            <X className="w-8 h-8 text-[#00d1ff]" />
                        </div>
                    ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={mansiImage}
                            alt="Mansi AI"
                            className={`w-full h-full object-cover transition-transform ${getAvatarAnimation()}`}
                        />
                    )}

                    {!isOpen && (
                        <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse"></span>
                    )}
                </button>
            </div>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-4 md:right-6 w-[90vw] md:w-[400px] bg-[#0a0a0a] border border-[#333] rounded-3xl shadow-2xl z-40 flex flex-col transition-all duration-500 origin-bottom-right overflow-hidden ${isOpen
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
                    }`}
                style={{ height: 'min(600px, 70vh)' }}
            >
                {/* Background Image Layer */}
                <div
                    className="absolute inset-0 z-0 opacity-60 bg-cover bg-center pointer-events-none transition-all duration-1000"
                    style={{
                        backgroundImage: `url(${mansiImage})`,
                        filter: sentiment === 'serious' ? 'grayscale(100%) contrast(120%)' : 'none'
                    }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0a0a0ae6] via-[#0a0a0a80] to-[#0a0a0a1a] pointer-events-none" />

                {/* Header */}
                <div className="relative z-10 p-4 border-b border-[#222]/80 bg-[#111]/80 backdrop-blur-md rounded-t-3xl flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full overflow-hidden border border-[#00d1ff] transition-transform ${getAvatarAnimation()}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={mansiImage} alt="Mansi" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg leading-none italic">MANSI</h3>
                        <p className="text-[10px] text-[#00d1ff] uppercase font-bold tracking-wider">{isBlocked ? "System Locked" : (sentiment === 'thinking' ? "Thinking..." : "MotoFit Assistant")}</p>
                    </div>
                    <div className="ml-auto">
                        <Badge variant="cyan" className="text-[10px] h-5">AI</Badge>
                    </div>
                </div>

                {/* Messages */}
                <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] p-3 text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-[#1a1a1a] text-gray-100 rounded-2xl rounded-tr-none border border-[#333]'
                                    : 'bg-[#00d1ff] text-black font-medium rounded-2xl rounded-tl-none shadow-lg'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {/* Blocked Message */}
                    {isBlocked && (
                        <div className="flex justify-center w-full mt-4">
                            <span className="text-red-500 text-xs font-bold uppercase border border-red-900 bg-red-900/20 px-3 py-1 rounded-full">User Blocked</span>
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex justify-start w-full">
                            <div className="bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded-2xl rounded-tl-none flex items-center gap-2">
                                <Sparkles className="w-3 h-3 text-[#00d1ff] animate-spin" />
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
                            placeholder={isBlocked ? "Chat disabled" : (puterLoaded ? "Ask Mansi..." : "Initializing...")}
                            disabled={!puterLoaded || isLoading || isBlocked}
                            className={`flex-1 bg-[#222] text-white border border-[#444] rounded-full px-4 py-3 text-sm focus:outline-none focus:border-[#00d1ff] focus:ring-1 focus:ring-[#00d1ff] transition-all placeholder:text-gray-500 ${isBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || !puterLoaded || isLoading || isBlocked}
                            className="bg-[#00d1ff] hover:bg-[#33dcff] text-black p-2 rounded-full transition-all disabled:opacity-50 transform active:scale-95"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
