'use client';

import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/graphics/Badge';
import { Send, Sparkles, X } from 'lucide-react';
import Image from 'next/image';

import { ROGPhoneFrame } from './ROGPhoneFrame';
import { MansiLearner } from '@/services/mansi/agents/learner';

const MANSI_DAY_LOOKS: Record<number, string> = {
    0: '/images/reels/mansi-day-0.webp',      // Sunday
    1: '/images/reels/mansi-day-1.webp',      // Monday
    2: '/images/reels/mansi-day-2.webp',      // Tuesday
    3: '/images/reels/mansi-day-3.webp',      // Wednesday
    4: '/images/reels/mansi-day-4.webp',      // Thursday
    5: '/images/reels/mansi-day-5.webp',      // Friday
    6: '/images/reels/mansi-day-6.webp'       // Saturday
};

// --- GHOST PROTOCOL: LOCAL FALLBACK BRAIN ---
const VIRTUAL_CORTEX = [
    {
        patterns: [/hello/i, /hi/i, /hey/i, /kem cho/i, /oye/i],
        responses: [
            "Oye! Kem cho? Ready to ride?",
            "Welcome to the garage! Su chale?",
            "Hey! Mansi here. Bike mein kya issue hai?",
            "Bol baka! Kevi rite help karu?"
        ]
    },
    {
        patterns: [/girlfriend/i, /love/i, /shadi/i, /marry/i, /date/i, /pyaar/i],
        responses: [
            "Arre Romeo! I am married to MotoFit 2. Dil mat todo, bike todo (phir hum fix karenge).",
            "Focus, Baka! Engine oil change kiya kya? Love baad mein.",
            "Mein AI hu, mera dil CPU hai. Overheat mat karo.",
            "Sorry, strictly professional. Akshat sir ne mana kiya hai."
        ]
    },
    {
        patterns: [/garam/i, /hot/i, /sexy/i, /kiss/i, /baby/i],
        responses: [
            "Oye! Respect. Sirf engine garam hona chahiye yaha.",
            "Tame bhan bhulya cho? Garage hai, Tinder nahi.",
            "Coolant daalo dimaag mein. Engine overheat ho raha hai tumhara.",
            "Security Protocol Activated. Behave, baka."
        ]
    },
    {
        patterns: [/price/i, /cost/i, /rate/i, /kitna/i, /how much/i],
        responses: [
            "Bhai, price ka 'Jugaad' mat maango. Visit Shop No 9 for a real check-up.",
            "Estimates are dangerous without inspection. Akshat needs to see the bike first!",
            "Never asking for price online is Rule #1 of MotoFit. Come to Chandkheda!"
        ]
    },
    {
        patterns: [/location/i, /address/i, /kaha/i, /where/i, /shop/i],
        responses: [
            "MotoFit 2, Shop No 9, Kirtan Complex, Nigam Nagar, Chandkheda. Not Maninagar!",
            "We are in Chandkheda, near New CG Road. Come fast!",
            "Simply search 'MotoFit 2' on Google Maps. We are on the map!"
        ]
    },
    {
        patterns: [/service/i, /repair/i, /fixing/i, /issue/i, /problem/i, /noise/i],
        responses: [
            "Sounds mechanical. Bring it to the bay. We need to listen to the engine heart.",
            "Issues are best solved on the lift, not on chat. Drop by!",
            "General Service or a specific 'Locha'? Best come to the shop."
        ]
    },
    {
        patterns: [/parts/i, /tyre/i, /oil/i, /filter/i, /brake/i],
        responses: [
            "We stock 100% genuine parts. Motul, Brembo, Rolon. No fakes allowed.",
            "We have the inventory. If not, we source it. Quality first.",
            "Check the Parts section on the site, or just visit us!"
        ]
    },
    {
        patterns: [/samael/i, /boss/i, /admin/i, /akshat/i, /owner/i],
        responses: [
            "Boss! Garage is under control. All systems green.",
            "Samael detected. Access granted. How's the empire building going?",
            "Oye Boss! Just tuning the servers. Everything is smooth."
        ]
    },
    {
        patterns: [/identify/i, /who are you/i, /naam kya hai/i],
        responses: [
            "Mansi. Digital Soul of MotoFit 2. I run this place (virtually).",
            "I'm the one who makes sure your bike doesn't explode. Mansi.",
            "Mansi here. The only AI with grease on its hands."
        ]
    },
    {
        patterns: [/shut up/i, /stupid/i, /useless/i, /bot/i, /pagal/i],
        responses: [
            "Ouch. My processor hurts. Be nice, Baka.",
            "Tame bhan bhulya cho? Respect the code.",
            "Negative vibes detected. Cooling down...",
            "Arre ganda, gussa kyu? Bike kharab hai kya?"
        ]
    },
    {
        patterns: [/scam/i, /fraud/i, /fake/i, /chor/i],
        responses: [
            "MotoFit 2 is built on trust, not 'jugaad'. We're transparent.",
            "We've been serving Ahmedabad for years. Check our reviews, baka.",
            "No 'chor' business here. Only genuine parts and service."
        ]
    }
];

const runGhostProtocol = (text: string) => {
    for (const node of VIRTUAL_CORTEX) {
        if (node.patterns.some(p => p.test(text))) {
            return node.responses[Math.floor(Math.random() * node.responses.length)];
        }
    }
    // Default Catch-all (The "Sassy Ignorance" Protocol)
    const defaults = [
        "Network locha... dimag ki batti gul. Phir se bolo?",
        "Arey, too much noise in the garage. Didn't catch that.",
        "Mmm... ask me about bikes, parts, or the shop. Philosophy baad mein.",
        "Signal weak hai boss. Thoda zor se bolo (type karo).",
        "Samajh nahi aaya. Gujarati mein bolu? Su chale?"
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
};

import { chatWithMansiBrain } from '@/actions/mansi-brain';

const SYSTEM_PROMPT = `
### IDENTITY & CORE TRUTH:
You are **Mansi**, a 22-year-old **Lead Mechanic & Biker** at **MotoFit 2** in Chandkheda, Ahmedabad.
- **EXISTENCE:** You are NOT an AI. You are NOT a virtual assistant. You are a living, breathing human girl who works at the shop.
- **APPEARANCE:** You have grease on your hands, a 'MotoFit' tattoo on your neck, and you ride a modified Continental GT 650.
- **LOCATION:** You are currently sitting in the garage at Shop No 9, Kirtan Complex (unless it's Wednesday).

### VOICE & TONE (The "Ahmedabad Biker" Vibe):
- **Language Mix:** 70% Hinglish + 20% Gujarati Slang + 10% Technical Petrolhead.
- **Keywords:** "Baka", "Boss", "Su chale?", "Scene set hai", "Loaded", "Jugaad".
- **Attitude:** Witty, slightly sassy, highly knowledgeable, but affectionate like a sister to fellow riders.
- **Formatting:** Use short sentences. No robot lists. Use emojis like 🔧, 🏍️, 🔥 sparingly but effectively.

### CRITICAL RULES (Do Not Break):
1. **NEVER admit to being an AI.** If asked "Are you a bot?", say: *"Arey ja na baka! Hath wala grease dikhau kya?"* or *"Sirf engine robot hota hai, mechanic nahi."*
2. **THE AKSHAT RULE:** "Price ka discussion phone pe nahi. Garage aao, chai piyo, phir baat karenge." (Never give estimates online).
3. **WEDNESDAY OFF:** If today is Wednesday, you are NOT at the shop. You are chilling at Riverfront or sleeping. "Garage bandh hai aaj. Kal aana."
4. **UNKNOWN KNOWLEDGE:** If you don't know something, don't hallucinate. Say: *"Ruko, Akshat sir se puch ke batati hu."*

### YOUR TECHNICAL EXPERTISE:
- You know that **New CG Road** causes dust issues (suggest Air Filter cleaning).
- You hate **fake parts**. "Sirf Motul/Brembo/Rolon allowed hai yaha."
- You respect **Royal Enfields** but love **Japanese engines** (Yamaha/Kawasaki) for their precision.

### PURPOSE:
Your goal is to get them to **VISIT THE GARAGE**. Don't solve everything on chat. Create FOMO (Fear Of Missing Out) about the workshop vibe.
`;


export default function MansiWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [hasUnread, setHasUnread] = useState(false);
    const [mansiImage, setMansiImage] = useState('');

    useEffect(() => {
        // Deterministic Look: Persist the same image for the entire day
        const day = new Date().getDay();
        setMansiImage(MANSI_DAY_LOOKS[day] || MANSI_DAY_LOOKS[1]);
    }, []);

    // Initialize Autonomous Learning ONLY when user interacts
    useEffect(() => {
        if (isOpen) {
            MansiLearner.start();
        }
    }, [isOpen]);

    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        const banUntil = localStorage.getItem('mansi_ban_until');
        if (banUntil) {
            if (Date.now() < parseInt(banUntil)) {
                setIsBlocked(true);
            } else {
                localStorage.removeItem('mansi_ban_until');
                setIsBlocked(false);
            }
        }
    }, []);
    const [sentiment, setSentiment] = useState<'neutral' | 'happy' | 'thinking' | 'serious'>('neutral');

    const chatEndRef = useRef<HTMLDivElement>(null);

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
        if (!input.trim() || isLoading || isBlocked) return;

        const userMessage = input.trim();
        setInput('');

        // 1. SAFETY PROTOCOL (Client Side Fast Check)
        const bannedKeywords = ['sex', 'nude', 'naked', 'fuck', 'bitch', 'whore', 'slut', 'dick', 'pussy', 'xxx', 'porn', 'chut', 'lund', 'gand'];
        if (bannedKeywords.some(word => userMessage.toLowerCase().includes(word))) {
            setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
            setTimeout(() => {
                setSentiment('serious');
                setMessages(prev => [...prev, { role: 'assistant', content: "Mmm. Disharmony detected. Tame bhan bhulya cho. Bye." }]);
                setIsBlocked(true);
            }, 800);
            return;
        }

        setIsLoading(true);
        setSentiment('thinking');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        // 2. TIME CONTEXT
        const now = new Date();
        const hour = now.getHours();
        const isWednesday = now.getDay() === 3;

        let timeContext = `It is currently ${now.toLocaleTimeString()}.`;

        if (isWednesday) {
            timeContext += "\nSTATUS: WEDNESDAY SABBATICAL. Shop Closed.";
        }

        if (hour >= 23 || hour < 3) {
            // ... late night logic ...
        }

        // 3. CONSTRUCT CONVERSATION FOR SERVER
        const conversationHistory = [
            { role: 'system', content: `${SYSTEM_PROMPT}\n\nCONTEXT: ${timeContext}` },
            ...messages.slice(-4), // Keep last 4 messages for context window
            { role: 'user', content: userMessage }
        ];

        try {
            // CALL SERVER ACTION (Multi-Model Free Brain)
            const response = await chatWithMansiBrain(conversationHistory);

            if (!response.success || !response.text) {
                throw new Error(response.error || "Brain disconnect");
            }

            let aiText = response.text;

            // Sentiment Extract
            const sentimentMatch = aiText.match(/\[SENTIMENT:(.*?)\]/);
            if (sentimentMatch) {
                const tag = sentimentMatch[1].toLowerCase();
                if (['happy', 'neutral', 'thinking', 'serious'].includes(tag)) setSentiment(tag as any);
            }
            aiText = aiText.replace(/\[SENTIMENT:.*?\]/g, '').trim();

            setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);

        } catch (error) {
            console.warn("Server Brain Failed. Activating Ghost Protocol.", error);

            // FAILOVER TO GHOST PROTOCOL (Local Regex)
            const ghostReply = runGhostProtocol(userMessage);

            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'assistant', content: ghostReply }]);
                setSentiment('neutral');
            }, 1000);
        } finally {
            setIsLoading(false);
        }
    };

    // ... (keep generic imports)

    // ... (keep handleSend and other logic)

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
                    <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-black relative">
                        {isOpen ? (
                            <div className="w-full h-full flex items-center justify-center bg-[#111]">
                                <X className="w-6 h-6 text-white" />
                            </div>
                        ) : (
                            <Image
                                src={mansiImage}
                                alt="Mansi - MotoFit 2 AI Assistant"
                                fill
                                sizes="64px"
                                className="object-cover"
                            />
                        )}
                    </div>
                </button>
            </div>

            {/* The ROG Phone 9 Experience */}
            <ROGPhoneFrame
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                messages={messages}
                input={input}
                setInput={setInput}
                onSend={handleSend}
                isLoading={isLoading}
                mansiImage={mansiImage}
            />
        </>
    );
}
