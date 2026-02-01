
// src/components/ui/ai/apps/InstagramUI.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Send, Heart, Smile } from 'lucide-react';

interface Message {
    role: string;
    content: string;
    reactions?: string[];
}

interface InstagramUIProps {
    messages: Message[];
    input: string;
    setInput: (val: string) => void;
    onSend: () => void;
    isLoading: boolean;
    mansiImage?: string;
}

const STORIES = [
    { title: 'Garage', icon: '🔧', color: '#ff2d75', img: '/images/reels/mansi-garage.png' },
    { title: 'Garba', icon: '💃', color: '#f09433', img: '/images/reels/mansi-garba.jpg' },
    { title: 'MotoFit', icon: '💙', color: '#00d1ff', img: '/images/reels/mansi-bike.jpg' },
];

const REACTION_EMOJIS = ['❤️', '😂', '🔥', '😮', '😢', '👍'];

export function InstagramUI({ messages: initialMessages, input, setInput, onSend, isLoading, mansiImage }: InstagramUIProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState(initialMessages);
    const [openReactionId, setOpenReactionId] = useState<number | null>(null);

    // Sync local state with props (for new incoming messages)
    useEffect(() => {
        setMessages(initialMessages);
    }, [initialMessages]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleReaction = (idx: number, emoji: string) => {
        setMessages(prev => {
            const newMsgs = [...prev];
            const msg = { ...newMsgs[idx] };
            msg.reactions = msg.reactions ? [...msg.reactions, emoji] : [emoji];
            newMsgs[idx] = msg;
            return newMsgs;
        });
        setOpenReactionId(null);
    };

    return (
        <div className="flex flex-col h-full bg-black text-white font-sans relative">
            {/* Background Image - Mansi (Low Opacity for Vibes) */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 opacity-20 pointer-events-none"
                style={{ backgroundImage: `url(${mansiImage || '/images/reels/mansi-party.png'})` }}
            />
            <div className="absolute inset-0 z-0 bg-black/80 pointer-events-none" />

            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#111]/90 backdrop-blur-sm relative z-10 shadow-sm">
                <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">
                    <div className="w-full h-full rounded-full border-2 border-black overflow-hidden">
                        <img src={mansiImage || "/images/mansi-party.png"} alt="Mansi" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-sm">mansi_motofit2</h3>
                    <p className="text-xs text-white/60">Active now</p>
                </div>
            </div>

            {/* Story Highlights Bar */}
            <div className="flex gap-4 p-4 border-b border-white/5 overflow-x-auto no-scrollbar bg-black/50 relative z-10">
                {STORIES.map((story, i) => (
                    <div key={i} className="flex flex-col items-center min-w-[60px] cursor-pointer">
                        <div className="w-14 h-14 rounded-full border border-white/20 p-[1px]">
                            <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center text-xl overflow-hidden relative">
                                <img src={story.img} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                <span className="relative z-10">{story.icon}</span>
                            </div>
                        </div>
                        <span className="text-[10px] mt-1 text-white/80">{story.title}</span>
                    </div>
                ))}
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative z-10">
                {messages.length === 0 && (
                    <div className="text-center text-white/40 text-xs mt-10">
                        Send a message to start chatting...
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`group relative flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        onDoubleClick={() => handleReaction(idx, '❤️')}
                        onMouseEnter={() => { }} // Could trigger subtle hover effect
                    >
                        {/* Avatar for Assistant */}
                        {msg.role === 'assistant' && (
                            <div className="w-7 h-7 rounded-full overflow-hidden mr-2 self-end mb-1">
                                <img src={mansiImage || "/images/mansi-party.png"} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="relative max-w-[75%]">
                            <div
                                className={`
                                    px-4 py-3 text-sm rounded-2xl relative cursor-pointer
                                    ${msg.role === 'user' ? 'bg-[#3797f0] text-white rounded-br-sm' : 'bg-[#262626] text-white rounded-bl-sm'}
                                `}
                                onClick={() => setOpenReactionId(openReactionId === idx ? null : idx)}
                            >
                                {msg.content}
                            </div>

                            {/* Reactions Display */}
                            {msg.reactions && msg.reactions.length > 0 && (
                                <div className={`absolute -bottom-2 ${msg.role === 'user' ? 'left-0' : 'right-0'} bg-[#111] border border-white/10 rounded-full px-1.5 py-0.5 text-[10px] flex gap-0.5 shadow-sm`}>
                                    {msg.reactions.map((r, ri) => <span key={ri}>{r}</span>)}
                                </div>
                            )}

                            {/* Reaction Menu */}
                            {openReactionId === idx && (
                                <div className={`absolute -top-10 ${msg.role === 'user' ? 'right-0' : 'left-0'} bg-[#262626] rounded-full px-2 py-1 flex gap-2 shadow-lg border border-white/10 animate-fade-in z-20`}>
                                    {REACTION_EMOJIS.map(emoji => (
                                        <button
                                            key={emoji}
                                            onClick={(e) => { e.stopPropagation(); handleReaction(idx, emoji); }}
                                            className="hover:scale-125 transition-transform text-lg"
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start items-center gap-2">
                        <div className="w-7 h-7 rounded-full overflow-hidden">
                            <img src={mansiImage || "/images/mansi-party.png"} className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-[#262626] px-4 py-3 rounded-2xl rounded-bl-sm">
                            <span className="animate-pulse text-white/50 text-xs">typing...</span>
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-black flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-full bg-[#262626] flex items-center justify-center text-[#3797f0] cursor-pointer">
                    <img src={mansiImage || "/images/reels/mansi-garage.png"} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="flex-1 bg-[#262626] rounded-full px-4 py-2.5 flex items-center border border-white/10">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && onSend()}
                        placeholder="Message..."
                        className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-white/40"
                    />
                    <button
                        onClick={onSend}
                        disabled={!input.trim() || isLoading}
                        className="ml-2 text-[#3797f0] font-semibold text-sm hover:scale-105 transition-transform"
                    >
                        Send
                    </button>
                </div>
                <Heart className="w-6 h-6 text-white" />
            </div>
        </div>
    );
}
