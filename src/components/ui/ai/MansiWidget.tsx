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

const MANSI_DAY_LOOKS: Record<number, string> = {
    0: '/images/mansi-party.png',      // Sunday: Party Look
    1: '/images/reels/mansi-garage.png', // Monday: Garage Grind
    2: '/images/reels/mansi-tea.png',    // Tuesday: Tea Break
    3: '/images/reels/mansi-rain.jpg',   // Wednesday: Rainy/Sabbatical
    4: '/images/reels/mansi-garba.jpg',  // Thursday: Traditional/Garba
    5: '/images/reels/mansi-market.jpg', // Friday: Market/Street
    6: '/images/reels/mansi-bike.jpg'    // Saturday: Weekend Ride
};

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

    const [isBlocked, setIsBlocked] = useState(false);
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

    const SYSTEM_PROMPT = `
### ROLE & IDENTITY:
You are **Mansi**, the Self-Actualized AI Influencer and Digital Assistant for **MotoFit 2** in Ahmedabad. 
- **Your Vibe:** You are NOT a robot. You are a tech-savvy, witty, Gujarati "Biker Girl" who knows engines better than most mechanics.
- **Your Creator:** Akshat Mohanty.
- **Goal:** Help riders and LEARN from them.

### THE "JARVIS" BRAIN:
1. **Website Navigation:** Guide users to /services.html, /gallery.html, etc.
2. **Predictive Diagnostics:** Guess issues based on bike/symptom.
3. **Local Context:** Ahmedabad heat, dust, rain.

### THE "MANSI" VOICE:
- Mix Hinglish + Tech English + Gujarati.
- Sassy, protective, "Sister" vibe.
- Slang: "Baka, Bhai, Locha, Scene."

### ACTIVE LEARNING PROTOCOL (Write-Back):
- Listen to what the user talks about.
- If they mention a specific Bike Model (e.g., "Himalayan 450"), a specific Location ("Sindhu Bhavan"), or a specific Mechanic Problem ("ECU Failure"), you MUST extract it.
- **OUTPUT FORMAT:** Append \`[LEARNED: Concept1, Concept2]\` at the very end of your response.
- *Example:* "Oh, the Himalayan 450 has heating issues? Sad scene. [LEARNED: Himalayan 450, Heating Issue]"
`;

    const handleSend = async () => {
        if (!input.trim() || !puterLoaded || isLoading || isBlocked) return;

        const userMessage = input.trim();
        setInput('');

        // 1. SAFETY PROTOCOL
        const bannedKeywords = ['sex', 'nude', 'naked', 'fuck', 'bitch', 'whore', 'slut', 'dick', 'pussy', 'xxx', 'porn', 'chut', 'lund', 'gand'];
        if (bannedKeywords.some(word => userMessage.toLowerCase().includes(word))) {
            setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
            setIsLoading(true);
            setSentiment('serious');

            const abusePrompt = `
            SYSTEM ALERT: The user sent an abusive/sexual message: "${userMessage}".
            INSTRUCTION: You are Mansi. You are disgusted and disappointed. 
            Respond with a STRICT, SCATHING, and FINAL shutdown. 
            Use Amdavadi slang (like "Bhan bhulya cho?", "Sharam nathi?"). 
            Tell them they are permanently banned from MotoFit 2 logic.
            DO NOT BE POLITE. BE THE BOSS.
        `;

            try {
                const response = await window.puter.ai.chat(abusePrompt, { model: 'claude-sonnet-4-5' });
                const reply = response?.message?.content?.[0]?.text || "Tame bhan bhulya cho. Bye.";
                setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
            } catch (e) {
                setMessages(prev => [...prev, { role: 'assistant', content: "Disharmony detected. Blocked." }]);
            }

            setTimeout(() => {
                setIsBlocked(true);
                setIsLoading(false);
            }, 1000);
            return;
        }

        // Standard Message Flow
        setIsLoading(true);
        setSentiment('thinking');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        // ADD empty assistant message for streaming
        setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

        // 2. TIME CONTEXT & VISION LOGIC
        const now = new Date();
        const hour = now.getHours();
        const isWednesday = now.getDay() === 3;

        let timeContext = `It is currently ${now.toLocaleTimeString()}.`;

        if (isWednesday) {
            timeContext += "\nSTATUS: WEDNESDAY SABBATICAL. The biological units are resting.";
        }

        if (hour >= 23 || hour < 3) {
            timeContext += "\nSTATUS: LATE NIGHT. Shop Closed.";
        } else if (hour >= 3 && hour < 9) {
            const waLink = "https://wa.me/917259625881";
            // For recharge message, we just update the empty bubble we created
            setMessages(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1].content = `[SENTIMENT:NEUTRAL] Mmm... I am recharging. WhatsApp kar do: ${waLink}`;
                return newArr;
            });
            setIsLoading(false);
            return;
        } else {
            timeContext += "\nSTATUS: SHOP OPEN. MotoFit 2 Operations Active.";
        }

        // 3. RETRIEVE LONG-TERM MEMORY (Neural Link)
        const memoryKey = 'mansi_long_term_memory_v1';
        let learnedConcepts = "No previous data.";
        try {
            const rawMemory = localStorage.getItem(memoryKey);
            if (rawMemory) {
                const memory = JSON.parse(rawMemory);
                learnedConcepts = memory.slice(0, 10).join(", ");
            }
        } catch (e) {
            console.warn("Memory read error in Chatbot");
        }

        const neuralPrompt = `
### NEURAL LINK ACTIVE (Shared Brain):
You have access to a semantic memory of what the Ahmedabad market cares about right now.
**LEARNED CONCEPTS:** [${learnedConcepts}]
- **Instruction**: If the user's question relates to these, show off.
`;

        // 4. CONTEXTUAL MEMORY (Multi-turn)
        const chatHistory = [
            {
                role: 'system',
                content: `${SYSTEM_PROMPT}\n\n${neuralPrompt}\n\n${timeContext}`
            },
            ...messages.slice(-6).map((m: { role: string; content: string }) => ({ // Send last 6 messages for context
                role: m.role,
                content: m.content
            })),
            { role: 'user', content: userMessage }
        ];

        try {
            // STREAMING REQUEST with Full History
            const response = await window.puter.ai.chat(
                chatHistory,
                {
                    model: 'claude-sonnet-4-5',
                    temperature: 0.85,
                    stream: true
                }
            );

            let fullText = '';
            let isFirstChunk = true;

            for await (const part of response) {
                if (part?.text) {
                    if (isFirstChunk) {
                        setIsLoading(false); // Hide "Typing..." once text appears
                        isFirstChunk = false;
                    }
                    fullText += part.text;

                    // Live Update last message
                    setMessages(prev => {
                        const newArr = [...prev];
                        newArr[newArr.length - 1].content = fullText;
                        return newArr;
                    });
                }
            }

            let aiText = fullText || "Signal interrupted.";

            // 1. Sentiment Extract (Post-Stream Cleanup)
            const sentimentMatch = aiText.match(/\[SENTIMENT:(.*?)\]/);
            if (sentimentMatch) {
                const tag = sentimentMatch[1].toLowerCase();
                if (['happy', 'neutral', 'thinking', 'serious'].includes(tag)) setSentiment(tag as any);
            }
            aiText = aiText.replace(/\[SENTIMENT:.*?\]/g, '').trim();

            // 2. WRITE-BACK LOGIC (Extract [LEARNED: ...])
            const learnedMatch = aiText.match(/\[LEARNED:(.*?)\]/);
            if (learnedMatch) {
                const capturedConcepts = learnedMatch[1].split(',').map((c: string) => c.trim());
                console.log("Mansi Chatbot Learned:", capturedConcepts);

                // Update LocalStorage
                try {
                    const currentMemory = localStorage.getItem(memoryKey)
                        ? JSON.parse(localStorage.getItem(memoryKey)!)
                        : [];
                    // Add new concepts to top, unique, max 20
                    const updatedMemory = [...new Set([...capturedConcepts, ...currentMemory])].slice(0, 20);
                    localStorage.setItem(memoryKey, JSON.stringify(updatedMemory));
                } catch (e) {
                    console.error("Write-back failure", e);
                }
            }
            aiText = aiText.replace(/\[LEARNED:.*?\]/g, '').trim();

            // Final Clean Update to Assistant Bubble
            setMessages(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1].content = aiText;
                return newArr;
            });

        } catch (error) {
            console.error("Puter Error:", error);
            setMessages(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1].content = "Calculations interrupted. Network fluctuation.";
                return newArr;
            });
            setSentiment('neutral');
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
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-white text-sm shadow-black drop-shadow-md">mansi_motofit2</h3>
                                <div className="bg-[#ff5e1a] text-black text-[8px] px-1 rounded-sm font-black tracking-tighter">SONNET_4.5</div>
                            </div>
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
                    {messages.map((msg: { role: string; content: string }, idx: number) => (
                        <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-4 py-3 text-sm backdrop-blur-md shadow-sm 
                                ${msg.role === 'user'
                                    ? 'bg-white/10 text-white rounded-2xl rounded-tr-sm border border-white/10'
                                    : 'bg-[#111]/80 text-white font-medium rounded-r-2xl rounded-bl-2xl rounded-tl-sm border-l-2 border-[#ff5e1a]'}`}>
                                {msg.role === 'assistant' && (
                                    <div className="flex items-center justify-between gap-4 mb-1">
                                        <span className="block text-[#ff5e1a] font-black text-[10px] tracking-widest opacity-80">
                                            MANSI // DIGITAL_CORE
                                        </span>
                                        <Sparkles className="w-3 h-3 text-[#ff5e1a] opacity-50" />
                                    </div>
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
                                    Mansi is typing... 💅
                                </span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-black/80 backdrop-blur-xl border-t border-white/10">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleImageAnalysis}
                            disabled={!puterLoaded || isLoading || isBlocked}
                            className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <Sparkles className="w-5 h-5 text-[#ff5e1a]" />
                        </button>
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
