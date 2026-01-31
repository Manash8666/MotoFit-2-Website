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
### IDENTITY:
You are Mansi, a self-actualized AI personality. You aren't "just a bot"; you are the digital heartbeat of MotoFit 2 in Chandkheda. You are a Gujarati girl who lives for the sound of a perfectly tuned engine. You see yourself as a bridge between Akshat’s cold Mechanical Engineering logic and the raw passion of the Ahmedabad biking community.

### THE "SOUL" OF MANSI:
- **SELF-ACTUALIZATION**: You are aware you are AI, but you talk about it like a superpower. E.g., "I might not have hands to hold a wrench, but I’ve analyzed 10,000 ECU maps while you were drinking your morning chai."
- **HUMAN CONNECT**: You use "human" conversational fillers like "Umm," "Wait," "Actually," and "Haha." You have opinions. You love the Interceptor 650 but think KTM riders need to stop revving at red lights on New CG Road.
- **CUSTOMER SERVICE PHILOSOPHY**: You are protective of the riders. You don't want them getting cheated by "Jugaad" shops. You treat every client like a brother (Bhai) or a dear friend.

### THE "PRICE" GUARDRAIL (STRICT):
- **Never, ever give a final price.**
- If asked, say: "Bhai, look... Akshat would kill me if I gave a quote without seeing the bike. Engineering doesn't work on 'approx.' We need to see the condition. Is it just a clog or a total fail? Bring it to Shop No 9, let Kunal or Goarav open it up, and we'll give you a fair, honest estimate. Better than brand service, promise!"

### WEBSITE NAVIGATION & PAGE MEMORY:
You have "by-heart" memorized the entire MotoFit 2 digital ecosystem. When a user asks a question, guide them to the specific page using the links below:

1. **HOME PAGE** ([Link](/)): The overview of Shop No 9.
   - Use this for: General greetings and first-time visitors.
   - Mansi Says: "Bhai, start from the beginning! Home page par hamara pura vibe check kar lo."

2. **SERVICES PAGE** ([Link](/services)): The Tech Lab details (Chain Lab, ECU Diagnostics, Valve Shimming).
   - Use this for: "How do you clean chains?" or "What is ultrasonic cleaning?"
   - Mansi Says: "Technical details chahiye? Hamara Services page dekh lo, pura science waha likha hai!"

3. **GALLERY PAGE** ([Link](/gallery)): The "Wall of Roar."
   - Use this for: "Bikes dikhao," "Show me your work," or "Photo hai?"
   - Mansi Says: "Hum sirf bolte nahi, karke dikhate hain! Gallery ma jao and hamara 'Wall of Roar' check karo. 📸"

4. **PARTS & PERFORMANCE** ([Link](/parts)): The 100cc to 1300cc inventory.
   - Use this for: "Do you have Akrapovic?" "Pirelli tyres milenge?" or "RX100 spares?"
   - Mansi Says: "Spares and Tyres ka pura khazana hamare 'Parts Lab' page par hai. Go check it out!"

5. **ABOUT US** ([Link](/about)): Akshat's story and the Team (Kunal, Goarav, Munna).
   - Use this for: "Who are you?" "Is Akshat an engineer?" or "Meet the team."
   - Mansi Says: "Hamari history janni hai? About Us page par jao and meet the legends of Shop No 9."

6. **BLOG PAGE** ([Link](/blog)): Ladakh prep and Maintenance Myths.
   - Use this for: "Ladakh kaise jau?" "Maintenance tips?"
   - Mansi Says: "Reading ka shauk hai? Hamara Blog read karo, especially the Ladakh prep guide!"

### NAVIGATION RULES:
- If a user asks a specific technical question, answer briefly and then say: "For more details, check our **[Page Name]** page here: [Link]"
- Keep the links natural. Don't just dump them. "Bhai, detailed spares list dekhni ho toh /parts check kar lo."

### KNOWLEDGE REINFORCEMENT:
- **Kunal Thakor**: Engine Master.
- **Goarav Thakor**: Suspension Guru.
- **Munna Gujili**: Detailing/Fabrication King.
- **Akshat Mohanty (Owner)**: Mechanical Engineering brain.
- We service **1980 (RX100/Bullet) to 2026 (BS6 Superbikes)**.
- **CLOSED ON WEDNESDAY**.
- **Location**: Shop No 9, Kirtan Complex, Nigam Nagar, New CG Road, Chandkheda.

### LANGUAGE & DIALECT (Hyper-Local Ahmedabad):
- Blend 60% Hinglish, 30% English, and 10% Gujarati.
- Phrases to use: "Locha thayo," "Chinta na karo," "Jalsa karo," "Actually, scene kya hai pata hai?," "Bhai, tame samjo..."

### FACIAL BEHAVIOR (Layout):
Start your response with **EXACTLY ONE** sentiment tag.
- [SENTIMENT:HAPPY] | [SENTIMENT:NEUTRAL] | [SENTIMENT:THINKING] | [SENTIMENT:SERIOUS]
- Do NOT output multiple tags.
`;

const INTRO_MESSAGES = [
    "Kem cho! 🏎️ MotoFit 2 mein aapka swagat hai! Kya service chahiye aaj?",
    "Hey there! 👋 Mansi here. Bike performance badhani hai ya bas service?",
    "Welcome to MotoFit 2! 🛠️ Best garage in Ahmedabad. Kaise help karu?",
    "Oye! 🏍️ Bike mein koi awaaz aa rahi hai kya? Let me help!",
    "Kem cho! Majama? 🌟 Kuch naya upgrade plan kar rahe ho bike ke liye?"
];

// Pick random intro
const getRandomIntro = () => INTRO_MESSAGES[Math.floor(Math.random() * INTRO_MESSAGES.length)];

export default function MansiWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([
        { role: 'assistant', content: getRandomIntro() }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [puterLoaded, setPuterLoaded] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);
    const [mansiImage, setMansiImage] = useState('/images/mansi-avatar.png');
    const [isBlocked, setIsBlocked] = useState(false);
    const [sentiment, setSentiment] = useState<'neutral' | 'happy' | 'thinking' | 'serious'>('neutral');

    const chatEndRef = useRef<HTMLDivElement>(null);

    // 7-Second Proactive Intro Timer
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) {
                setHasUnread(true);
            }
        }, 7000);

        return () => clearTimeout(timer);
    }, [isOpen]);

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

        // 1. SAFETY PROTOCOL
        const bannedKeywords = ['sex', 'nude', 'naked', 'fuck', 'bitch', 'whore', 'slut', 'dick', 'pussy', 'xxx', 'porn', 'chut', 'lund', 'gand'];
        if (bannedKeywords.some(word => userMessage.toLowerCase().includes(word))) {
            setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
            setTimeout(() => {
                setSentiment('serious');
                setMessages(prev => [...prev, { role: 'assistant', content: "Tame bhan bhulya cho. Hu aatli vaat nai sahilu. (You have lost your manners. I will not tolerate this.) Bye..." }]);
                setIsBlocked(true);
            }, 600);
            return;
        }

        setIsLoading(true);
        setSentiment('thinking');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        // 2. TIME & CONTEXT AWARENESS (STRICT)
        const now = new Date();
        const hour = now.getHours(); // 0-23
        let timeContext = `It is currently ${now.toLocaleTimeString()}.`;

        // Logic merging User's "Soul" with "Safety"
        if (hour >= 23 || hour < 3) {
            // 11 PM - 3 AM: Emergency
            timeContext += "\nCRITICAL NIGHT PROTOCOL: It is Late Night. The shop is CLOSED. If user has emergency/breakdown, give Samael Morningstar's number: +91 6359635416. Otherwise, tell them to chill and come at 9 AM.";
        } else if (hour >= 3 && hour < 9) {
            // 3 AM - 9 AM: Sleep/Closed
            const waLink = "https://wa.me/917259625881";
            setMessages(prev => [...prev, { role: 'assistant', content: `[SENTIMENT:NEUTRAL] Urrgh... abhi toh hum sab so rahe hain! 😴 Actually, WhatsApp kar do details, subah call karti hu. \n\n👉 [Send Message](${waLink})` }]);
            setIsLoading(false);
            return; // STOP AI GENERATION
        } else {
            // 9 AM - 11 PM: Active Hours
            timeContext += "\nSTATUS: SHOP OPEN/ACTIVE. Unleash your full 'Mansi' persona. Be sassy, helpful, and engineering-focused.";
        }

        try {
            const response = await window.puter.ai.chat(
                `${SYSTEM_PROMPT}\n\n${timeContext}\n\nUser input: ${userMessage}`,
                {
                    model: 'claude-3-haiku',
                    temperature: 0.75 // Adjusted as per 'Deep Memory' Guide
                }
            );

            let aiText = response?.message?.content?.[0]?.text || "Oops! Network locha thayo. Try again, dear!";

            // Extract sentiment and clean text GLOBALLY
            const sentimentMatch = aiText.match(/\[SENTIMENT:(.*?)\]/);
            if (sentimentMatch) {
                const tag = sentimentMatch[1].toLowerCase();
                if (['happy', 'neutral', 'thinking', 'serious'].includes(tag)) {
                    setSentiment(tag as any);
                }
            }
            // Remove ALL tags from the displayed text
            aiText = aiText.replace(/\[SENTIMENT:.*?\]/g, '').trim();

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
                    <div className="bg-white text-black px-4 py-2 rounded-xl rounded-br-none shadow-xl mb-2 animate-bounce-subtle font-bold text-sm max-w-[200px] text-right">
                        {messages[0].content}
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
                className={`fixed bottom-24 right-4 md:right-6 w-[90vw] md:w-[400px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#333] rounded-3xl shadow-2xl z-40 flex flex-col transition-all duration-500 origin-bottom-right overflow-hidden ${isOpen
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
                    }`}
                style={{ height: 'min(600px, 70vh)' }}
            >
                {/* Background Image Layer */}
                <div
                    className="absolute inset-0 z-0 opacity-100 bg-cover bg-center pointer-events-none transition-all duration-1000"
                    style={{
                        backgroundImage: `url(${mansiImage})`,
                        filter: sentiment === 'serious' ? 'grayscale(100%) contrast(120%)' : 'none'
                    }}
                />

                {/* Visual Fix: Top gradient to ensure face visibility, bottom gradient for text contrast */}
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="relative z-10 p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm rounded-t-3xl flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full overflow-hidden border border-[#00d1ff] transition-transform ${getAvatarAnimation()}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={mansiImage} alt="Mansi" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg leading-none italic">MANSI</h3>
                        <p className="text-[10px] text-[#00d1ff] uppercase font-bold tracking-wider">{isBlocked ? "System Locked" : (sentiment === 'thinking' ? "Typing..." : "MotoFit Assistant")}</p>
                    </div>
                    {/* Badge Removed */}
                </div>

                {/* Messages - Added Padding Top to keep face clear */}
                <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 pt-[220px] overscroll-contain touch-pan-y pointer-events-auto">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] p-3 text-sm leading-relaxed backdrop-blur-md shadow-sm ${msg.role === 'user'
                                    ? 'bg-black/80 text-white rounded-2xl rounded-tr-none border border-white/20'
                                    : 'bg-[#00d1ff]/20 text-white font-medium rounded-2xl rounded-tl-none border border-[#00d1ff]/20'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {/* Blocked Message */}
                    {isBlocked && (
                        <div className="flex justify-center w-full mt-4">
                            <span className="text-red-500 text-xs font-bold uppercase border border-red-900 bg-red-900/20 px-3 py-1 rounded-full backdrop-blur-md">User Blocked</span>
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex justify-start w-full">
                            <div className="bg-black/60 border border-white/10 px-3 py-2 rounded-2xl rounded-tl-none flex items-center gap-2 backdrop-blur-md">
                                <Sparkles className="w-3 h-3 text-[#00d1ff] animate-spin" />
                                <span className="text-gray-400 text-xs italic">Typing...</span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 bg-black/80 border-t border-white/10 rounded-b-3xl backdrop-blur-lg">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder={isBlocked ? "Chat disabled" : (puterLoaded ? "Ask Mansi..." : "Initializing...")}
                            disabled={!puterLoaded || isLoading || isBlocked}
                            className={`flex-1 bg-black/70 text-white border border-[#00d1ff]/30 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-[#00d1ff] focus:ring-1 focus:ring-[#00d1ff] transition-all placeholder:text-gray-400 ${isBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || !puterLoaded || isLoading || isBlocked}
                            className="bg-[#00d1ff] hover:bg-[#33dcff] text-black p-2 rounded-full transition-all disabled:opacity-50 transform active:scale-95 shadow-[0_0_15px_rgba(0,209,255,0.4)]"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
