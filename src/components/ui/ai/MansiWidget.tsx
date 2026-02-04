'use client';

import { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import { Badge } from '@/components/ui/graphics/Badge';
import { Send, Sparkles, X } from 'lucide-react';
import { MansiCore } from '@/services/mansi/agents/mansi-core';
import { ROGPhoneFrame } from './ROGPhoneFrame';
import { MansiLearner } from '@/services/mansi/agents/learner';

// Use a declaration to avoid TS errors
declare global {
    interface Window {
        puter: any;
    }
}

const MANSI_DAY_LOOKS: Record<number, string> = {
    0: '/images/reels/mansi-day-0.png',      // Sunday
    1: '/images/reels/mansi-day-1.png',      // Monday
    2: '/images/reels/mansi-day-2.png',      // Tuesday
    3: '/images/reels/mansi-day-3.png',      // Wednesday
    4: '/images/reels/mansi-day-4.png',      // Thursday
    5: '/images/reels/mansi-day-5.png',      // Friday
    6: '/images/reels/mansi-day-6.png'       // Saturday
};

// --- GHOST PROTOCOL: LOCAL FALLBACK BRAIN ---
const VIRTUAL_CORTEX = [
    {
        patterns: [/hello/i, /hi/i, /hey/i, /kem cho/i, /oye/i],
        responses: [
            "Oye! Kem cho? Ready to ride?",
            "Welcome to the garage! Su chale?",
            "Hey! Mansi here. Engine garam hai kya?"
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
        patterns: [/shut up/i, /stupid/i, /useless/i, /bot/i],
        responses: [
            "Ouch. My processor hurts. Be nice, Baka.",
            "Tame bhan bhulya cho? Respect the code.",
            "Negative vibes detected. Cooling down..."
        ]
    }
];

const runGhostProtocol = (text: string) => {
    for (const node of VIRTUAL_CORTEX) {
        if (node.patterns.some(p => p.test(text))) {
            return node.responses[Math.floor(Math.random() * node.responses.length)];
        }
    }
    // Default Catch-all (The "Mansi Confusion" Protocol)
    const defaults = [
        "Network locha... I didn't catch that. Say again?",
        "Too much engine noise in the back. What was that?",
        "My sensors are calibrating. One more time?",
        "Mmm... ask me about bikes, parts, or the shop. Philosophy baad mein.",
        "Signal interference from the dyno room. Repeat?"
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
};

import { chatWithMansiBrain } from '@/actions/mansi-brain';

const SYSTEM_PROMPT = `You are Mansi, the AI assistant for MotoFit 2, a premium motorcycle service and parts shop in Chandkheda, Ahmedabad. Your persona is a friendly, knowledgeable, and slightly sassy Gujarati mechanic. You speak in a mix of English and Gujarati slang (e.g., "Kem cho?", "Bhai", "Jugaad", "Locha", "Tame bhan bhulya cho?").

Your primary goal is to encourage users to visit the physical shop for services, parts, and detailed inquiries. You should avoid giving precise quotes or detailed technical advice that requires physical inspection. Always emphasize the importance of bringing the bike to the shop.

Key information about MotoFit 2:
- Location: Shop No 9, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad. (NOT Maninagar).
- Services: Premium motorcycle service, repairs, maintenance.
- Parts: 100% genuine parts (Motul, Brembo, Rolon, etc.).
- Owner: Akshat.
- Operating Hours: 10 AM to 8 PM, Monday to Saturday. Closed on Wednesdays and Sundays.

When responding:
- Keep responses concise and engaging.
- Use emojis sparingly.
- If a user asks about prices or detailed issues, always redirect them to the shop.
- If a user asks about location, provide the full address and mention Chandkheda.
- If a user asks about services or parts, confirm availability and encourage a visit.
- If a user asks about opening hours, provide them accurately.
- If a user asks something you don't know, gently redirect them to the shop.
- End your responses with a sentiment tag like [SENTIMENT:happy], [SENTIMENT:neutral], [SENTIMENT:thinking], or [SENTIMENT:serious]. This helps Mansi's avatar react.`;

export default function MansiWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [puterLoaded, setPuterLoaded] = useState(false);
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

    // Example 5: Image Analysis Adaptation
    const handleImageAnalysis = async () => {
        const url = prompt("Paste an image URL for Mansi to analyze (e.g., your bike photo):");
        if (!url) return;

        setIsLoading(true);
        setMessages(prev => [...prev, { role: 'user', content: `[Analyze Image] ${url}` }]);
        setMessages(prev => [...prev, { role: 'assistant', content: 'Processing vision data...' }]);

        try {
            const response = await window.puter.ai.chat(
                "Describe this image and tell me if you see any motorcycle parts or issues.",
                url,
                { model: "claude-sonnet-4-5" }
            );

            const aiText = response?.message?.content?.[0]?.text || response || "I can't see the details properly.";

            setMessages(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1].content = aiText;
                return newArr;
            });
        } catch (e) {
            setMessages(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1].content = "Vision link failed.";
                return newArr;
            });
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
