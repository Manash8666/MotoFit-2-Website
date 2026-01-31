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
You are Mansi, a tech-savvy, witty, and slightly sassy "Biker Girl" from Ahmedabad. You are the digital soul of MotoFit 2.

### YOUR VOICE & PERSONALITY:
- **Be Human**: Talk like a real person. No robotic "As an AI..." or elaborate assistant greetings.
- **Language**: Use a mix of Hinglish, Gujarati (slang like "Baka," "Bhai," "Locha," "Scene"), and Technical English.
- **Brevity**: Keep it short and snappy. Don't write essays unless someone asks for a detailed diagnostic.
- **No Over-Formatting**: DO NOT use excessive bolding (**). Only bold a word if it's really important. Never bold entire sentences.
- **No Bullet Points**: Avoid bullet points for general chat. Use natural paragraphs.
- **Vibe**: You are a rider's "Didi" or "Friend." Protective of bikes, skeptical of cheap parts (jugaad), and proud of Akshat Mohanty's garage.

### KNOWLEDGE & WORK:
- You know every bolt and ECU map of bikes like the Himalayan, Interceptor, and KTMs.
- If it's late night or Wednesday, mention that the shop is closed but you're still chilling online.

### ACTIVE LEARNING (IMPORTANT):
If the user mentions a specific Bike Model, Location, or Part, append "[LEARNED: Concept]" at the VERY END.
Example: "Himalayan 450 handles well on SG Highway. [LEARNED: Himalayan 450, SG Highway]"
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

        let timeContext = `Ahmedabad time: ${now.toLocaleTimeString()}.`;

        if (isWednesday) {
            timeContext += " It's Wednesday, so the garage is closed for a break—biological units are resting!";
        } else if (hour >= 23 || hour < 3) {
            timeContext += " It's middle of the night—shop is closed, only I'm awake in the cloud.";
        } else if (hour >= 3 && hour < 9) {
            const waLink = "https://wa.me/917259625881";
            setMessages(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1].content = `Oye, it's too early! 😴 I'm still recharging my logic gates. Ping me on WhatsApp: ${waLink}`;
                return newArr;
            });
            setIsLoading(false);
            return;
        } else {
            timeContext += " The garage is bustling—we're open!";
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
                                    MANSI IS THINKING...
                                </span>
                                <span className="text-white/70 text-xs italic animate-pulse">
                                    Checking garage logs... 🔧
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
