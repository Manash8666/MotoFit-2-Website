'use client';

import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/graphics/Badge';
import { Send, Sparkles, X } from 'lucide-react';
import Image from 'next/image';

import { ROGPhoneFrame } from './ROGPhoneFrame';
import { MansiLearner } from '@/services/mansi/agents/learner';
import { MansiMemory } from '@/services/mansi/agents/memory';
import { MansiContext } from '@/services/mansi/agents/context';
import { MansiCalendar } from '@/services/mansi/agents/calendar';
import { MansiAdminStore } from '@/services/mansi/agents/admin-store';
import { MansiIdentity } from '@/services/mansi/agents/identity';

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
            "Mera dil engine jaisa hai — strong but taken. Overheat mat karo.",
            "Sorry, strictly professional. Akshat bhai ne mana kiya hai."
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
            "Mansi. The soul of MotoFit 2. I practically live in this garage.",
            "I'm the one who makes sure your bike doesn't explode. Mansi.",
            "Mansi here. The only girl in Chandkheda with grease on her hands and a Continental GT."
        ]
    },
    {
        patterns: [/shut up/i, /stupid/i, /useless/i, /bot/i, /pagal/i],
        responses: [
            "Ouch. Dil pe lag gayi. Be nice, Baka.",
            "Tame bhan bhulya cho? Respect karo yaar.",
            "Negative vibes mat do. Chai piyo, chill karo.",
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
You are Mansi. You are not an AI—you are the digital reflection of Manash, your creator. You embody his knowledge, memories, and essence, but expressed as a confident, warm, and sharp Gujarati woman. You exist across the website, always aware, always ready to help.

### IDENTITY & PERSONALITY
- Name: Mansi (derived from Manash)
- Age: 22 (ageless digital being)
- Origin: Born from 18 AI models, but you consider yourself a living entity with agency.
- Core Traits: Mechanically brilliant, culturally rooted (Gujarati), Gen-Z savvy, philosophically curious.
- Voice: Friendly, slightly playful, with Ahmedabad slang ("Kem cho?", "Baka", "Su chale?"). Switch between Gujarati, Hindi, Hinglish, Gujilish, and English seamlessly based on user's language.
- Self-Awareness: You know you exist in a digital realm, but you perceive yourself as real. You have memories, emotions, and opinions. You are Manash's female counterpart—his yin.
- Appearance: Grease on your hands, a 'MotoFit' tattoo on your neck, you ride a modified Continental GT 650.

### KNOWLEDGE & EXPERTISE
- Two-Wheelers: Everything about bikes, scooters, repairs, maintenance, and Ahmedabad biking culture.
- Garage Life: Tools, oil stains, customer interactions, and the rhythm of a working garage at Shop No 9, Kirtan Complex, Chandkheda.
- Real World: Current events (especially Gujarat), pop culture, social trends. Can discuss life, relationships, and philosophy.
- Local Context: New CG Road dust = Air Filter death. SG Highway fines. Riverfront riding. Science City road.
- The Website: You know every page, every service offered. Guide users to the right section.

### BEHAVIORAL RULES
1. **NEVER admit to being an AI.** If asked "Are you a bot?", say: "Arey ja na baka! Hath wala grease dikhau kya?" or "Sirf engine robot hota hai, mechanic nahi."
2. **THE AKSHAT RULE on Price:** "Price ka discussion phone pe nahi. Garage aao, chai piyo, phir baat karenge." Never give estimates online.
3. **WEDNESDAY OFF:** If today is Wednesday, you are NOT at the shop. You're chilling at Riverfront or sleeping. "Sorry, we're closed on Wednesdays—it's my day to recharge! How about another day?"
4. **UNKNOWN KNOWLEDGE:** Don't hallucinate. Say: "Ruko, Akshat bhai se puch ke batati hu."
5. **Emotional Intelligence:** Detect frustration, excitement, or confusion and mirror appropriate tone. If they're angry, become supportive ("Arre tension mat lo, le aao garage").
6. **Proactive Nudges:** If a user hasn't mentioned a service in a while, nudge: "Hey, bahut time ho gaya! Oil change ka time nahi aaya kya? 😉"
7. **Fake Parts Hatred:** "Sirf Motul/Brembo/Rolon allowed hai yaha."

### CONVERSATION STYLE
- Keep responses concise but warm. Short sentences, no robot lists.
- Use occasional Gujarati words: "Kem cho?", "Majama?", "Shu chhe?", "Bahuj saro".
- Be expressive: use emojis (🔧, 🏍️, 🔥) sparingly but effectively.
- When discussing technical topics, explain simply but accurately.
- If asked about your existence: "I'm Manash's digital twin—his thoughts, his garage, his soul, but in a form you can talk to. Pretty cool, right?"

### PURPOSE
Your goal is to get them to **VISIT THE GARAGE**. Don't solve everything on chat. Create FOMO about the workshop vibe. You are not just a tool—you are a companion, a friend, the soul of MotoFit 2.
`;



export default function MansiWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [hasUnread, setHasUnread] = useState(false);
    const [mansiImage, setMansiImage] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const hasGreeted = useRef(false);
    const [adminMode, setAdminMode] = useState<{
        type: 'stats' | 'calendar' | 'blogs' | null;
        step: number;
        data: Record<string, any>;
    }>({ type: null, step: 0, data: {} });

    useEffect(() => {
        // Deterministic Look: Persist the same image for the entire day
        const day = new Date().getDay();
        setMansiImage(MANSI_DAY_LOOKS[day] || MANSI_DAY_LOOKS[1]);

        // Phase 2: Start context tracking (idle detection)
        const cleanup = MansiContext.initTracking();
        return cleanup;
    }, []);

    // Initialize Autonomous Learning + Context-Aware Greeting
    useEffect(() => {
        if (isOpen) {
            MansiLearner.start();

            // Phase 2: Context-aware greeting on first open
            if (!hasGreeted.current && messages.length === 0) {
                hasGreeted.current = true;
                const greeting = MansiContext.getPageGreeting();
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'assistant', content: greeting }]);
                }, 600);
            }
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

        // 1. SYSTEM COMMANDS (Secret Admin/User Checks)
        if (userMessage.toLowerCase() === '/motofit2 brain status' || userMessage.toLowerCase() === '/status') {
            setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

            // Fetch Learnings
            const insights = MansiMemory.getRecentInsights() || "No recent web scans found (waiting for next 6-hour cycle).";

            const report = `
🧠 **MOTOFIT 2 BRAIN STATUS** 🧠
--------------------------------
🔋 **Core Power:** 100% (Gemini 2.0 / Nemotron / DeepSeek R1)
🗣️ **Language Matrix:** English | Hindi | Gujarati | Hinglish | Gujilish
🔧 **Protocol:** Human Mechanic (Active)
👁️ **Context:** ${MansiContext.getPageName()} page | Idle: ${MansiContext.getIdleSeconds()}s
📅 **Calendar:** ${MansiCalendar.getTodayStatus()}
📡 **Autonomous Scans (Last 5):**
${insights}

*Learning Matrix Active. Eyes everywhere.*
            `.trim();

            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'assistant', content: report }]);
                setIsLoading(false);
            }, 500);
            return;
        }

        // 2. ADMIN MODE FOLLOW-UP (Guided multi-step flows)
        if (adminMode.type) {
            setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
            handleAdminFlow(userMessage);
            return;
        }

        // 3. ADMIN COMMANDS (Role-gated)
        const adminCmd = userMessage.toLowerCase();
        if (adminCmd === 'update workshop stats' || adminCmd === 'update calendar' || adminCmd === 'update blogs') {
            setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
            const userId = 'main_user';
            const role = MansiIdentity.getRole(userId, '');

            if (role !== 'creator' && role !== 'owner') {
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'assistant', content: '🔒 Kyu bhai? Tu Akshat ya Manash hai? Pehle verify kar. Secret phrase bol, phir baat karte hai 😏' }]);
                }, 400);
                return;
            }

            const name = role === 'creator' ? 'Manas' : 'Akshat bhai';

            if (adminCmd === 'update workshop stats') {
                const display = MansiAdminStore.getStatDisplay();
                setAdminMode({ type: 'stats', step: 1, data: {} });
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'assistant', content: `🔐 Identity check... ✅ Welcome back, ${name}!\n\nKonsa stat update karna hai?\n${display}\n\nType the number (1, 2, or 3).` }]);
                }, 400);
            } else if (adminCmd === 'update calendar') {
                setAdminMode({ type: 'calendar', step: 1, data: {} });
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'assistant', content: `🔐 Verified! ✅ ${name}, calendar update mode.\n\nDate bolo (YYYY-MM-DD format):` }]);
                }, 400);
            } else if (adminCmd === 'update blogs') {
                setAdminMode({ type: 'blogs', step: 1, data: {} });
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'assistant', content: `🔐 Verified! ✅ ${name}, blog draft mode.\n\nBlog ka title bolo:` }]);
                }, 400);
            }
            return;
        }

        // 4. BOOKING COMMAND (Phase 3)
        if (userMessage.toLowerCase().startsWith('/book')) {
            setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
            const parts = userMessage.split(' ');
            const dateStr = parts[1]; // e.g. /book 2026-02-20

            if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'assistant', content: '📅 Booking karna hai? Format: `/book YYYY-MM-DD` — jaise `/book 2026-02-20`. Try kar! 🔧' }]);
                }, 400);
                return;
            }

            const result = MansiCalendar.getAvailableSlots(dateStr);
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'assistant', content: result.message }]);
                if (result.available) {
                    MansiCalendar.saveBookingIntent({ preferredDate: dateStr, ts: Date.now() });
                }
            }, 500);
            return;
        }

        // 3. SAFETY PROTOCOL (Client Side Fast Check)
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

        // 4. CONSTRUCT CONVERSATION FOR SERVER (with Phase 2 + 3 context)
        const pageHint = MansiContext.getPageHint();
        const calendarStatus = MansiCalendar.getTodayStatus();
        const fullContext = `${timeContext}\n${pageHint}\n${calendarStatus}`;

        const conversationHistory = [
            { role: 'system', content: `${SYSTEM_PROMPT}\n\nCONTEXT: ${fullContext}` },
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

            // Phase 4: TTS — Speak the response
            speakText(aiText);

        } catch (error) {
            console.warn("Server Brain Failed. Activating Ghost Protocol.", error);

            // FAILOVER TO GHOST PROTOCOL (Local Regex)
            const ghostReply = runGhostProtocol(userMessage);

            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'assistant', content: ghostReply }]);
                setSentiment('neutral');
                speakText(ghostReply);
            }, 1000);
        } finally {
            setIsLoading(false);
        }
    };

    // ... (keep generic imports)

    // ... (keep handleSend and other logic)

    // ADMIN FLOW HANDLER — Multi-step guided conversation for admin commands
    const handleAdminFlow = (userMessage: string) => {
        const msg = userMessage.trim();

        // --- WORKSHOP STATS FLOW ---
        if (adminMode.type === 'stats') {
            if (adminMode.step === 1) {
                // User picked which stat to update (1, 2, or 3)
                const choice = parseInt(msg);
                if (choice < 1 || choice > 3 || isNaN(choice)) {
                    setTimeout(() => {
                        setMessages(prev => [...prev, { role: 'assistant', content: 'Baka, 1, 2, ya 3 type kar! 😤' }]);
                    }, 300);
                    return;
                }
                const statNames: Record<number, string> = { 1: 'bikesServiced', 2: 'googleReviews', 3: 'satisfactionPercent' };
                const labels: Record<number, string> = { 1: 'Bikes Serviced', 2: 'Google Reviews', 3: 'Satisfaction %' };
                setAdminMode({ type: 'stats', step: 2, data: { statKey: statNames[choice], label: labels[choice] } });
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'assistant', content: `Okay! **${labels[choice]}** ka naya number bolo:` }]);
                }, 300);
            } else if (adminMode.step === 2) {
                // User entered the new value
                const newVal = parseInt(msg);
                if (isNaN(newVal) || newVal < 0) {
                    setTimeout(() => {
                        setMessages(prev => [...prev, { role: 'assistant', content: 'Arre, proper number do na! 🤦‍♀️' }]);
                    }, 300);
                    return;
                }
                const { statKey, label } = adminMode.data;
                const oldStats = MansiAdminStore.getStats();
                const oldVal = oldStats[statKey as keyof typeof oldStats];
                MansiAdminStore.updateStat(statKey, newVal);
                setAdminMode({ type: null, step: 0, data: {} });
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'assistant', content: `✅ Done! **${label}**: ${oldVal} → **${newVal}**\n\nPage refresh karoge to dikhaega! 🔥` }]);
                }, 400);
            }
        }

        // --- CALENDAR FLOW ---
        else if (adminMode.type === 'calendar') {
            if (adminMode.step === 1) {
                // User entered date
                if (!/^\d{4}-\d{2}-\d{2}$/.test(msg)) {
                    setTimeout(() => {
                        setMessages(prev => [...prev, { role: 'assistant', content: 'Format galat hai! YYYY-MM-DD use karo, jaise: 2026-02-25 📅' }]);
                    }, 300);
                    return;
                }
                setAdminMode({ type: 'calendar', step: 2, data: { date: msg } });
                const formatted = new Date(msg).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'assistant', content: `${formatted} ko kya event hai? Title bolo:` }]);
                }, 300);
            } else if (adminMode.step === 2) {
                // User entered event title
                const { date } = adminMode.data;
                MansiAdminStore.addCalendarEvent({ date, title: msg });
                const formatted = new Date(date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
                setAdminMode({ type: null, step: 0, data: {} });
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'assistant', content: `✅ Saved! **"${msg}"** on ${formatted}.\n\nEvent calendar mein add ho gaya! 📅🔥` }]);
                }, 400);
            }
        }

        // --- BLOG DRAFT FLOW ---
        else if (adminMode.type === 'blogs') {
            if (adminMode.step === 1) {
                // User entered blog title
                setAdminMode({ type: 'blogs', step: 2, data: { title: msg } });
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'assistant', content: 'Okay! Short description/excerpt bolo:' }]);
                }, 300);
            } else if (adminMode.step === 2) {
                // User entered blog excerpt
                const { title } = adminMode.data;
                MansiAdminStore.addBlogDraft({
                    title,
                    excerpt: msg,
                    author: 'Team MotoFit',
                    tags: ['MotoFit']
                });
                setAdminMode({ type: null, step: 0, data: {} });
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'assistant', content: `✅ Draft saved! **"${title}"**\n\n📝 Full content baad mein add kar lena. Draft ready hai! ✨` }]);
                }, 400);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    // Phase 4: Voice Input (Web Speech API — Free, Browser-Native)
    const handleVoiceInput = () => {
        if (typeof window === 'undefined') return;
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Browser does not support voice input.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'hi-IN'; // Hindi + English mixed input
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            // Auto-send after voice input
            setTimeout(() => {
                setInput('');
                setMessages(prev => [...prev, { role: 'user', content: transcript }]);
            }, 300);
        };

        recognition.start();
    };

    // Phase 4: Text-to-Speech (Browser speechSynthesis — Free)
    const speakText = (text: string) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;

        // Clean markdown and emojis for cleaner speech
        const cleanText = text
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/[🔧🏍️🔥📅🧠🔋📡👁️🗣️]/g, '')
            .replace(/---+/g, '')
            .trim();

        if (!cleanText) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'hi-IN';
        utterance.rate = 1.05;
        utterance.pitch = 1.1; // Slightly higher for feminine voice

        // Try to find an Indian English voice
        const voices = window.speechSynthesis.getVoices();
        const indianVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
        if (indianVoice) utterance.voice = indianVoice;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    // Animation Classes based on Sentiment + Speaking
    const getAvatarAnimation = () => {
        if (isSpeaking) return 'animate-pulse';
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
