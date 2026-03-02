'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface PremiumHoloWidgetProps {
    onSend: (message: string, history: Message[]) => Promise<string>;
    initialGreeting?: string;
    isMuted?: boolean;
    onToggleMute?: () => void;
    avatarUrl?: string;
}

export default function PremiumHoloWidget({ onSend, initialGreeting = "Oye! Kem cho? Mansi here. Bike mein kya issue hai? 🏍️", isMuted, onToggleMute, avatarUrl = '/images/team/mansi-new.webp' }: PremiumHoloWidgetProps) {
    const [isActive, setIsActive] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [statusText, setStatusText] = useState('TRANSMISSION ACTIVE');
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const hasGreeted = useRef(false);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    useEffect(() => {
        if (isActive && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 400);
            if (!hasGreeted.current) {
                hasGreeted.current = true;
                setTimeout(() => {
                    setMessages([{ role: 'assistant', content: initialGreeting }]);
                }, 600);
            }
        }
    }, [isActive, initialGreeting]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isActive) setIsActive(false);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isActive]);

    // Strip HTML, markdown images, img tags, image URLs from messages
    const sanitizeMessage = (text: string): string => {
        return text
            .replace(/!\[.*?\]\(.*?\)/g, '') // Strip Markdown images: ![Alt](url)
            .replace(/<img[^>]*>/gi, '')     // Strip HTML img tags
            .replace(/<[^>]+>/g, '')         // Strip other HTML
            .replace(/https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|webp|svg)[^\s]*/gi, '') // Strip raw direct image links
            .trim();
    };

    const handleSend = async () => {
        const text = input.trim();
        if (!text || isLoading) return;
        const userMsg: Message = { role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);
        setStatusText('PROCESSING...');
        try {
            const reply = await onSend(text, messages);
            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
            setStatusText('TRANSMISSION ACTIVE');
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: "Signal locha... Thodi der baad try karo. 📡" }]);
            setStatusText('SIGNAL ERROR');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

                /* ====== WIDGET ROOT ====== */
                .holo-widget {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    z-index: 99999;
                    display: flex;
                    flex-direction: column-reverse;
                    align-items: flex-end;
                    gap: 12px;
                    font-family: 'Orbitron', 'Courier New', monospace;
                    pointer-events: none;
                }
                .holo-widget > * { pointer-events: auto; }

                /* ====== PUCK ====== */
                .holo-puck {
                    width: 64px; height: 64px; border-radius: 50%;
                    background: linear-gradient(145deg, #0d1b2a, #050d14);
                    border: 2px solid #00f0ff; cursor: pointer;
                    position: relative; display: flex; justify-content: center; align-items: center;
                    color: #00f0ff; outline: none; overflow: visible;
                    transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
                    box-shadow: 0 0 18px rgba(0,240,255,0.35), 0 0 36px rgba(0,240,255,0.12), inset 0 0 16px rgba(0,240,255,0.08);
                }
                .holo-puck:hover { transform: scale(1.1); box-shadow: 0 0 28px rgba(0,240,255,0.8), 0 0 55px rgba(0,240,255,0.3); }
                .holo-puck:active { transform: scale(0.93); }
                .holo-puck.open { animation: puck-pulse 2s ease-in-out infinite; }

                .puck-ring {
                    position: absolute; border-radius: 50%;
                    border: 1px solid #00f0ff; opacity: 0; transition: opacity 0.35s;
                }
                .puck-ring-1 { width: 120%; height: 120%; animation: ring-out 3s ease-out infinite; }
                .puck-ring-2 { width: 145%; height: 145%; animation: ring-out 3s ease-out infinite 1.5s; }
                .holo-puck.open .puck-ring { opacity: 0.35; }

                .puck-core {
                    position: absolute; width: 38%; height: 38%; border-radius: 50%;
                    background: radial-gradient(circle, #00f0ff, transparent 70%);
                    opacity: 0.45; animation: core-pulse 2s ease-in-out infinite;
                }
                .puck-img {
                    position: absolute; inset: 2px; border-radius: 50%;
                    overflow: hidden; z-index: 5;
                    transition: all 0.35s;
                }
                .puck-icons { position: relative; z-index: 10; width: 22px; height: 22px; }
                .puck-icon { position: absolute; top:0; left:0; transition: all 0.35s; }
                .puck-x { opacity:0; transform: rotate(-90deg) scale(0.5); }
                .holo-puck.open .puck-img   { opacity:0; transform: scale(0.5); }
                .holo-puck.open .puck-x     { opacity:1; transform: rotate(0deg) scale(1); }

                /* ====== MAIN PANEL ====== */
                .holo-panel {
                    width: 320px;
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid rgba(0,240,255,0.22);
                    box-shadow: 0 0 50px rgba(0,240,255,0.12), 0 8px 40px rgba(0,0,0,0.7);
                    opacity: 0;
                    visibility: hidden;
                    transform: scale(0.9) translateY(20px);
                    transform-origin: bottom right;
                    transition: all 0.45s cubic-bezier(0.4,0,0.2,1);
                    background: #000c12;
                }
                .holo-panel.open {
                    opacity: 1; visibility: visible; transform: scale(1) translateY(0);
                }

                /* ====== MANSI IMAGE ZONE (top) ====== */
                .holo-avatar-zone {
                    position: relative;
                    width: 100%;
                    height: 230px;
                    background: linear-gradient(180deg, #000c12 0%, #001a26 50%, #000c12 100%);
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    overflow: hidden;
                }
                /* Beam from bottom */
                .avatar-beam {
                    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
                    width: 120px; height: 100%;
                    background: linear-gradient(to top, rgba(0,240,255,0.45) 0%, rgba(0,240,255,0.1) 40%, transparent 80%);
                    filter: blur(22px);
                }
                /* Particles */
                .avatar-particles {
                    position: absolute; inset: 0; pointer-events: none; overflow: hidden;
                }
                .apt {
                    position: absolute; width: 2px; height: 2px;
                    background: #00f0ff; border-radius: 50%;
                    animation: ptcl 2s linear infinite;
                }
                /* Status pill */
                .avatar-status {
                    position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
                    display: flex; align-items: center; gap: 6px;
                    padding: 4px 12px;
                    background: rgba(0,15,22,0.9); border: 1px solid rgba(0,240,255,0.4);
                    border-radius: 20px; white-space: nowrap;
                    box-shadow: 0 0 12px rgba(0,240,255,0.2);
                    z-index: 10;
                }
                .status-dot {
                    width: 7px; height: 7px; border-radius: 50%;
                    background: #00f0ff; box-shadow: 0 0 8px #00f0ff;
                    animation: dot-blink 1.6s ease-in-out infinite;
                }
                .status-txt { font-size: 8px; color: #00f0ff; letter-spacing: 2px; text-transform: uppercase; }
                /* Mansi photo */
                .mansi-photo {
                    position: relative; z-index: 5;
                    height: 210px; width: auto;
                    object-fit: contain; object-position: bottom;
                    filter: brightness(1.05) contrast(1.05)
                            drop-shadow(0 0 8px rgba(0,240,255,0.6))
                            drop-shadow(0 0 24px rgba(0,240,255,0.25));
                    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
                    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
                }
                /* Floor glow */
                .avatar-glow {
                    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
                    width: 70%; height: 40px;
                    background: rgba(0,240,255,0.4); filter: blur(18px);
                    border-radius: 50%;
                }
                /* Scanlines overlay */
                .avatar-scanlines {
                    position: absolute; inset: 0; pointer-events: none;
                    background: repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 3px);
                    z-index: 6;
                }

                /* ====== CHAT ZONE (bottom) ====== */
                .holo-chat-zone {
                    background: #000c12 url('${avatarUrl}') center/cover no-repeat;
                    background-blend-mode: overlay;
                    border-top: 1px solid rgba(0,240,255,0.15);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    position: relative;
                }
                .holo-chat-zone::before {
                    content: '';
                    position: absolute; inset: 0;
                    background: rgba(0, 12, 18, 0.85); /* Dark overlay so chat is readable */
                    pointer-events: none;
                    z-index: 0;
                }
                .holo-msgs, .holo-input-row {
                    position: relative; z-index: 10;
                }
                .holo-msgs {
                    height: 200px;
                    overflow-y: auto;
                    padding: 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(0,240,255,0.3) transparent;
                }
                .holo-msgs::-webkit-scrollbar { width: 3px; }
                .holo-msgs::-webkit-scrollbar-thumb { background: rgba(0,240,255,0.35); border-radius: 2px; }

                .chat-bubble {
                    max-width: 85%; padding: 8px 12px; border-radius: 12px;
                    font-size: 12px; line-height: 1.55; word-break: break-word;
                    animation: bubble-in 0.25s ease-out;
                }
                .bubble-bot {
                    align-self: flex-start;
                    background: rgba(0,240,255,0.1); border: 1px solid rgba(0,240,255,0.35);
                    color: #00f0ff; border-bottom-left-radius: 3px;
                }
                .bubble-user {
                    align-self: flex-end;
                    background: rgba(0,100,200,0.2); border: 1px solid rgba(0,130,255,0.4);
                    color: #fff; border-bottom-right-radius: 3px;
                }

                /* Typing dots */
                .typing-dots {
                    align-self: flex-start; display: flex; gap: 4px;
                    padding: 8px 12px;
                    background: rgba(0,240,255,0.1); border: 1px solid rgba(0,240,255,0.35);
                    border-radius: 12px; border-bottom-left-radius: 3px;
                }
                .typing-dot {
                    width: 5px; height: 5px; border-radius: 50%; background: #00f0ff;
                    animation: tdot 1.4s ease-in-out infinite;
                }
                .typing-dot:nth-child(2) { animation-delay: 0.2s; }
                .typing-dot:nth-child(3) { animation-delay: 0.4s; }

                /* Input row */
                .holo-input-row {
                    display: flex; gap: 8px; padding: 10px 10px 12px;
                    border-top: 1px solid rgba(0,240,255,0.1);
                    background: rgba(0,8,14,1);
                }
                .holo-inp {
                    flex: 1; padding: 9px 14px;
                    background: rgba(0,20,30,0.95); border: 1px solid rgba(0,240,255,0.4);
                    border-radius: 22px; color: #00f0ff;
                    font-family: inherit; font-size: 12px; outline: none;
                    transition: box-shadow 0.25s;
                }
                .holo-inp::placeholder { color: rgba(0,240,255,0.4); }
                .holo-inp:focus { box-shadow: 0 0 12px rgba(0,240,255,0.28); }
                .holo-btn {
                    width: 40px; height: 40px; border-radius: 50%; background: #00f0ff;
                    border: none; color: #000; cursor: pointer;
                    display: flex; justify-content: center; align-items: center;
                    transition: all 0.25s; flex-shrink: 0;
                }
                .holo-btn:hover { transform: scale(1.1); box-shadow: 0 0 18px rgba(0,240,255,0.7); }
                .holo-btn:active { transform: scale(0.93); }
                .holo-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }

                /* ====== KEYFRAMES ====== */
                @keyframes puck-pulse {
                    0%,100% { box-shadow: 0 0 30px rgba(0,240,255,0.7), 0 0 60px rgba(0,240,255,0.4); }
                    50%      { box-shadow: 0 0 50px rgba(0,240,255,0.9), 0 0 90px rgba(0,240,255,0.6); }
                }
                @keyframes ring-out {
                    0%   { transform: scale(1);   opacity: 0.5; }
                    100% { transform: scale(1.6); opacity: 0; }
                }
                @keyframes core-pulse {
                    0%,100% { opacity: 0.4; } 50% { opacity: 0.75; }
                }
                @keyframes dot-blink {
                    0%,100% { opacity: 1; transform: scale(1); }
                    50%     { opacity: 0.4; transform: scale(0.75); }
                }
                @keyframes ptcl {
                    0%   { transform: translateY(0) scale(1);     opacity: 0.9; }
                    100% { transform: translateY(-220px) scale(0); opacity: 0; }
                }
                @keyframes bubble-in {
                    0%   { opacity:0; transform: translateY(8px) scale(0.96); }
                    100% { opacity:1; transform: translateY(0) scale(1); }
                }
                @keyframes tdot {
                    0%,60%,100% { transform: translateY(0); }
                    30%         { transform: translateY(-5px); }
                }

                @media (max-width: 480px) {
                    .holo-panel { width: 92vw; }
                    .holo-widget { right: 16px; bottom: 16px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .holo-panel { transition: none; }
                    .holo-puck  { animation: none; transition: none; }
                }
            `}</style>

            <div className="holo-widget">

                {/* ===== MAIN PANEL ===== */}
                <div className={`holo-panel ${isActive ? 'open' : ''}`} role="dialog" aria-label="Chat with Mansi">

                    {/* --- MANSI IMAGE ZONE --- */}
                    <div className="holo-avatar-zone">
                        <div className="avatar-beam" />

                        {/* Particles */}
                        <div className="avatar-particles">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="apt"
                                    style={{
                                        left: `${10 + Math.random() * 80}%`,
                                        bottom: `${Math.random() * 30}%`,
                                        animationDelay: `${Math.random() * 2}s`,
                                        animationDuration: `${1.4 + Math.random() * 1.2}s`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Status pill */}
                        <div className="avatar-status">
                            <span className="status-dot" />
                            <span className="status-txt">{statusText}</span>
                        </div>

                        {/* Mansi Photo */}
                        <Image
                            src={avatarUrl}
                            alt="Mansi — MotoFit 2 AI"
                            width={220}
                            height={210}
                            className="mansi-photo"
                            priority
                        />

                        {/* Floor glow */}
                        <div className="avatar-glow" />
                        <div className="avatar-scanlines" />
                    </div>

                    {/* --- CHAT ZONE --- */}
                    <div className="holo-chat-zone">

                        {/* Messages */}
                        <div className="holo-msgs">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`chat-bubble ${msg.role === 'assistant' ? 'bubble-bot' : 'bubble-user'}`}
                                >
                                    {sanitizeMessage(msg.content)}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="typing-dots">
                                    <div className="typing-dot" />
                                    <div className="typing-dot" />
                                    <div className="typing-dot" />
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Row */}
                        <div className="holo-input-row">
                            <input
                                ref={inputRef}
                                type="text"
                                className="holo-inp"
                                placeholder="Bolo... (Hindi/English/Gujarati)"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                autoComplete="off"
                            />
                            <button
                                className="holo-btn"
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                aria-label="Send message"
                            >
                                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ===== PUCK BUTTON ===== */}
                <button
                    className={`holo-puck ${isActive ? 'open' : ''}`}
                    onClick={() => setIsActive(v => !v)}
                    aria-label={isActive ? 'Close Mansi chat' : 'Chat with Mansi AI'}
                    aria-expanded={isActive}
                >
                    <div className="puck-ring puck-ring-1" />
                    <div className="puck-ring puck-ring-2" />
                    <div className="puck-core" />

                    {/* Mansi Face on Puck */}
                    <div className="puck-img">
                        <Image src="/images/reels/mansi-day-2.webp" alt="Mansi" fill className="object-cover" />
                    </div>

                    <div className="puck-icons">
                        <svg className="puck-icon puck-x" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </div>
                </button>
            </div>
        </>
    );
}
