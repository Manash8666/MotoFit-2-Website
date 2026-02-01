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

    // Initialize Autonomous Learning
    useEffect(() => {
        MansiLearner.start();
    }, []);

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
        if (!input.trim() || !puterLoaded || isLoading || isBlocked) return;

        const userMessage = input.trim();
        setInput('');

        // UI: Show User Message
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            // MANSICORE: The Autonomous Brain
            // "mansi-user" is a simple ID. In a real app, use auth ID.
            const response = await MansiCore.reply('mansi_local_user', userMessage);

            // Display Mansi's Reply
            // Display Mansi's Reply
            setMessages(prev => [...prev, { role: 'assistant', content: response.text }]);
            if (response.sentiment) setSentiment(response.sentiment);

            // Handle Judge Dredd Logic (Bans)
            if (response.shouldBan) {
                const banDuration = response.banDuration || 3600000;
                const banUntil = Date.now() + banDuration;
                localStorage.setItem('mansi_ban_until', banUntil.toString());
                setIsBlocked(true);
            }

        } catch (error) {
            console.error("Mansi Widget Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Systems recalibrating... try again." }]);
        } finally {
            setIsLoading(false);
            setSentiment('neutral'); // Reset sentiment
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
