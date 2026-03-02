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
}

export default function PremiumHoloWidget({ onSend, initialGreeting = "Oye! Kem cho? Mansi here. Bike mein kya issue hai? 🏍️" }: PremiumHoloWidgetProps) {
    const [isActive, setIsActive] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [statusText, setStatusText] = useState('TRANSMISSION ACTIVE');
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const hasGreeted = useRef(false);

    // Auto-scroll to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Focus input when opened
    useEffect(() => {
        if (isActive && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 500);
            if (!hasGreeted.current) {
                hasGreeted.current = true;
                setTimeout(() => {
                    setMessages([{ role: 'assistant', content: initialGreeting }]);
                }, 700);
            }
        }
    }, [isActive, initialGreeting]);

    // Keyboard close
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isActive) setIsActive(false);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isActive]);

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
            setMessages(prev => [...prev, { role: 'assistant', content: "Oops! Signal locha... Thodi der baad try karo. 📡" }]);
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
            {/* ======================== STYLES ======================== */}
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

                .holo-widget {
                    position: fixed;
                    bottom: 40px;
                    right: 40px;
                    z-index: 99999;
                    display: flex;
                    flex-direction: column-reverse;
                    align-items: center;
                    font-family: 'Orbitron', 'Courier New', monospace;
                }

                /* ========== PUCK ========== */
                .holo-puck {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: linear-gradient(145deg, #1a1a2e, #0f0f1a);
                    border: 2px solid #00f0ff;
                    cursor: pointer;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #00f0ff;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    outline: none;
                    box-shadow: 0 0 20px rgba(0,240,255,0.3), 0 0 40px rgba(0,240,255,0.15), inset 0 0 20px rgba(0,240,255,0.1);
                }
                .holo-puck:hover {
                    transform: scale(1.08);
                    box-shadow: 0 0 30px rgba(0,240,255,0.8), 0 0 60px rgba(0,240,255,0.3), inset 0 0 30px rgba(0,240,255,0.2);
                }
                .holo-puck:active { transform: scale(0.95); }
                .holo-puck.active {
                    animation: puck-active-pulse 2s ease-in-out infinite;
                }

                .puck-ring-1, .puck-ring-2 {
                    position: absolute; border-radius: 50%;
                    border: 1px solid #00f0ff; opacity: 0;
                    transition: opacity 0.4s;
                }
                .puck-ring-1 { width: 120%; height: 120%; animation: ring-expand 3s ease-out infinite; }
                .puck-ring-2 { width: 140%; height: 140%; animation: ring-expand 3s ease-out infinite 1.5s; }
                .holo-puck.active .puck-ring-1,
                .holo-puck.active .puck-ring-2 { opacity: 0.3; }

                .puck-core {
                    position: absolute; width: 40%; height: 40%; border-radius: 50%;
                    background: radial-gradient(circle, #00f0ff 0%, transparent 70%);
                    opacity: 0.5; animation: core-pulse 2s ease-in-out infinite;
                }

                .puck-icon-wrap { position: relative; z-index: 10; width: 24px; height: 24px; }
                .puck-icon { position: absolute; top: 0; left: 0; transition: all 0.4s; }
                .close-icon { opacity: 0; transform: rotate(-90deg) scale(0.5); }
                .holo-puck.active .chat-icon { opacity: 0; transform: rotate(90deg) scale(0.5); }
                .holo-puck.active .close-icon { opacity: 1; transform: rotate(0) scale(1); }

                .puck-glow {
                    position: absolute; width: 100%; height: 100%; border-radius: 50%;
                    background: radial-gradient(circle, rgba(0,240,255,0.8) 0%, transparent 60%);
                    filter: blur(10px); opacity: 0.4; animation: glow-pulse 3s ease-in-out infinite;
                }

                /* ========== PROJECTION ========== */
                .holo-projection {
                    position: absolute;
                    bottom: 90px;
                    right: 0;
                    width: 320px;
                    height: 520px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    pointer-events: none;
                    opacity: 0;
                    visibility: hidden;
                    transform: scale(0.9) translateY(30px);
                    transform-origin: bottom right;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .holo-projection.active {
                    opacity: 1; visibility: visible; pointer-events: auto;
                    transform: scale(1) translateY(0);
                }

                /* Beam */
                .holo-beam-core {
                    position: absolute; bottom: 0; width: 80px; height: 100%;
                    background: linear-gradient(to top, rgba(0,240,255,0.8) 0%, rgba(0,240,255,0.3) 30%, transparent 70%);
                    filter: blur(20px); opacity: 0; transform: scaleY(0);
                    transform-origin: bottom; transition: all 0.4s; left: 50%; margin-left: -40px;
                }
                .holo-projection.active .holo-beam-core {
                    opacity: 0.6; transform: scaleY(1); animation: beam-flicker 0.12s infinite;
                }
                .holo-beam-outer {
                    position: absolute; bottom: 0; width: 150px; height: 100%;
                    background: linear-gradient(to top, rgba(0,240,255,0.3) 0%, transparent 50%);
                    filter: blur(30px); opacity: 0; transform: scaleY(0);
                    transform-origin: bottom; transition: all 0.4s 0.2s; left: 50%; margin-left: -75px;
                }
                .holo-projection.active .holo-beam-outer { opacity: 0.3; transform: scaleY(1); }

                /* Particles */
                .holo-particles { position: absolute; bottom: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0; transition: opacity 0.4s; }
                .holo-projection.active .holo-particles { opacity: 1; }
                .particle {
                    position: absolute; width: 2px; height: 2px;
                    background: #00f0ff; border-radius: 50%;
                    animation: particle-rise 2s linear infinite;
                }

                /* Mansi Figure */
                .holo-figure {
                    position: absolute; bottom: 55px; width: 100%; height: 75%;
                    display: flex; justify-content: center; align-items: flex-end; z-index: 10;
                }
                .holo-image {
                    max-height: 100%; object-fit: contain;
                    filter: hue-rotate(165deg) saturate(200%) brightness(1.4) contrast(1.1) drop-shadow(0 0 15px rgba(0,240,255,0.9));
                    opacity: 0; transform: translateY(20px); transition: all 0.5s;
                    -webkit-mask-image: linear-gradient(to bottom, black 65%, transparent 100%);
                    mask-image: linear-gradient(to bottom, black 65%, transparent 100%);
                    animation: holo-flicker 0.18s infinite;
                }
                .holo-projection.active .holo-image { opacity: 0.92; transform: translateY(0); }
                .holo-figure-glow {
                    position: absolute; bottom: 0; width: 100%; height: 50%;
                    background: radial-gradient(ellipse at bottom, rgba(0,240,255,0.6) 0%, transparent 70%);
                    filter: blur(20px); opacity: 0; transition: opacity 0.4s;
                }
                .holo-projection.active .holo-figure-glow { opacity: 0.5; }

                /* Scanlines */
                .holo-scanlines {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    background: repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px);
                    z-index: 20; pointer-events: none; opacity: 0; transition: opacity 0.4s;
                }
                .holo-projection.active .holo-scanlines { opacity: 0.5; animation: scanline-move 8s linear infinite; }

                /* Chromatic */
                .holo-chromatic {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    z-index: 21; pointer-events: none; opacity: 0; mix-blend-mode: screen; transition: opacity 0.4s;
                }
                .holo-projection.active .holo-chromatic { opacity: 0.25; animation: chromatic-shift 0.6s ease-in-out infinite; }
                .holo-chromatic::before { content:''; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(255,0,0,0.08); transform:translateX(-2px); }
                .holo-chromatic::after  { content:''; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,255,255,0.08); transform:translateX(2px); }

                /* Status */
                .holo-status {
                    position: absolute; top: 12px; left: 50%; transform: translateX(-50%);
                    display: flex; align-items: center; gap: 8px;
                    padding: 5px 12px;
                    background: rgba(0,20,30,0.95); border: 1px solid #00f0ff;
                    border-radius: 20px; z-index: 30; opacity: 0; transition: opacity 0.4s;
                    box-shadow: 0 0 15px rgba(0,240,255,0.3); white-space: nowrap;
                }
                .holo-projection.active .holo-status { opacity: 1; animation: status-pulse 2s ease-in-out infinite; }
                .status-dot {
                    width: 8px; height: 8px; border-radius: 50%;
                    background: #00f0ff; box-shadow: 0 0 10px rgba(0,240,255,0.8);
                    animation: dot-pulse 1.5s ease-in-out infinite; flex-shrink: 0;
                }
                .status-text { font-size: 9px; color: #00f0ff; text-transform: uppercase; letter-spacing: 2px; }

                /* Chat */
                .holo-chat {
                    position: absolute; top: 52px; left: 8px; right: 8px;
                    bottom: 68px; overflow-y: auto; padding: 12px;
                    display: flex; flex-direction: column; gap: 10px;
                    z-index: 25; opacity: 0; transition: opacity 0.4s 0.3s;
                    scrollbar-width: thin; scrollbar-color: #00f0ff rgba(0,20,30,0.9);
                }
                .holo-chat::-webkit-scrollbar { width: 3px; }
                .holo-chat::-webkit-scrollbar-track { background: rgba(0,20,30,0.9); }
                .holo-chat::-webkit-scrollbar-thumb { background: #00f0ff; border-radius: 2px; }
                .holo-projection.active .holo-chat { opacity: 1; }

                .chat-msg {
                    max-width: 87%; padding: 9px 13px; border-radius: 12px;
                    font-size: 12px; line-height: 1.55; animation: msg-appear 0.3s ease-out;
                    position: relative; overflow: hidden; word-break: break-word; font-family: inherit;
                }
                .chat-msg::before {
                    content:''; position:absolute; top:0; left:0; width:100%; height:100%;
                    background: linear-gradient(90deg, transparent 0%, rgba(0,240,255,0.08) 50%, transparent 100%);
                    animation: msg-shine 2.5s linear infinite;
                }
                .bot-msg {
                    align-self: flex-start;
                    background: rgba(0,240,255,0.12); border: 1px solid rgba(0,240,255,0.5);
                    color: #00f0ff; border-bottom-left-radius: 4px;
                }
                .user-msg {
                    align-self: flex-end;
                    background: rgba(0,128,255,0.18); border: 1px solid rgba(0,128,255,0.5);
                    color: #fff; border-bottom-right-radius: 4px;
                }
                .msg-content { position: relative; z-index: 1; }

                /* Typing indicator */
                .typing-ind {
                    display: flex; gap: 4px; align-self: flex-start;
                    padding: 9px 13px; background: rgba(0,240,255,0.12);
                    border: 1px solid rgba(0,240,255,0.5); border-radius: 12px; border-bottom-left-radius: 4px;
                }
                .typing-dot {
                    width: 5px; height: 5px; border-radius: 50%; background: #00f0ff;
                    animation: typing-bounce 1.4s ease-in-out infinite;
                }
                .typing-dot:nth-child(2) { animation-delay: 0.2s; }
                .typing-dot:nth-child(3) { animation-delay: 0.4s; }

                /* Input */
                .holo-input-wrap {
                    position: absolute; bottom: 12px; left: 8px; right: 8px;
                    display: flex; gap: 8px; z-index: 30;
                    opacity: 0; transform: translateY(8px); transition: all 0.4s 0.2s;
                }
                .holo-projection.active .holo-input-wrap { opacity: 1; transform: translateY(0); }
                .holo-input {
                    flex: 1; padding: 10px 14px;
                    background: rgba(0,20,30,0.95); border: 1px solid #00f0ff;
                    border-radius: 24px; color: #00f0ff;
                    font-family: inherit; font-size: 12px; outline: none; transition: all 0.3s;
                }
                .holo-input::placeholder { color: rgba(0,240,255,0.45); }
                .holo-input:focus { box-shadow: 0 0 15px rgba(0,240,255,0.3); }
                .holo-send {
                    width: 42px; height: 42px; border-radius: 50%; background: #00f0ff;
                    border: none; color: #000; cursor: pointer;
                    display: flex; justify-content: center; align-items: center;
                    transition: all 0.3s; flex-shrink: 0;
                }
                .holo-send:hover { transform: scale(1.1); box-shadow: 0 0 20px rgba(0,240,255,0.8); }
                .holo-send:active { transform: scale(0.95); }
                .holo-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

                /* ======= KEYFRAMES ======= */
                @keyframes puck-active-pulse {
                    0%, 100% { box-shadow: 0 0 40px rgba(0,240,255,0.8), 0 0 80px rgba(0,240,255,0.5); }
                    50%       { box-shadow: 0 0 60px rgba(0,240,255,0.9), 0 0 110px rgba(0,240,255,0.7); }
                }
                @keyframes ring-expand {
                    0%   { transform: scale(1);   opacity: 0.5; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                @keyframes core-pulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50%      { opacity: 0.7; transform: scale(1.1); }
                }
                @keyframes glow-pulse {
                    0%, 100% { opacity: 0.3; }
                    50%      { opacity: 0.6; }
                }
                @keyframes beam-flicker {
                    0%, 100% { opacity: 0.5; }
                    50%      { opacity: 0.72; }
                }
                @keyframes particle-rise {
                    0%   { transform: translateY(0) scale(1);    opacity: 1; }
                    100% { transform: translateY(-450px) scale(0); opacity: 0; }
                }
                @keyframes holo-flicker {
                    0%, 100% { opacity: 0.9;  filter: hue-rotate(165deg) saturate(200%) brightness(1.4) blur(0px); }
                    25%      { opacity: 0.95; filter: hue-rotate(167deg) saturate(205%) brightness(1.45) blur(0.3px); }
                    50%      { opacity: 0.85; filter: hue-rotate(163deg) saturate(195%) brightness(1.35) blur(0.5px); }
                    75%      { opacity: 0.92; filter: hue-rotate(166deg) saturate(202%) brightness(1.42) blur(0.2px); }
                }
                @keyframes scanline-move {
                    0%   { background-position: 0 0; }
                    100% { background-position: 0 100%; }
                }
                @keyframes chromatic-shift {
                    0%, 100% { transform: translateX(0); }
                    25%      { transform: translateX(-1px); }
                    75%      { transform: translateX(1px); }
                }
                @keyframes status-pulse {
                    0%, 100% { box-shadow: 0 0 15px rgba(0,240,255,0.3); }
                    50%      { box-shadow: 0 0 25px rgba(0,240,255,0.6); }
                }
                @keyframes dot-pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50%      { opacity: 0.4; transform: scale(0.75); }
                }
                @keyframes msg-appear {
                    0%   { opacity: 0; transform: translateY(10px) scale(0.95); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes msg-shine {
                    0%   { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes typing-bounce {
                    0%, 60%, 100% { transform: translateY(0); }
                    30%           { transform: translateY(-5px); }
                }

                @media (max-width: 768px) {
                    .holo-widget { bottom: 20px; right: 20px; }
                    .holo-projection { width: 290px; height: 480px; }
                }
                @media (max-width: 480px) {
                    .holo-projection { width: 92vw; right: -10px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .holo-puck, .holo-projection, .holo-image, .chat-msg { transition: none; animation: none; }
                }
            `}</style>

            <div className="holo-widget">

                {/* ===== HOLOGRAM PROJECTION ===== */}
                <div className={`holo-projection ${isActive ? 'active' : ''}`}>

                    {/* Beam Layers */}
                    <div className="holo-beam-core" />
                    <div className="holo-beam-outer" />

                    {/* Particles */}
                    <div className="holo-particles" id="holoParticles">
                        {Array.from({ length: 28 }).map((_, i) => (
                            <div
                                key={i}
                                className="particle"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: `${1.5 + Math.random()}s`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Visual Effects Overlay */}
                    <div className="holo-scanlines" />
                    <div className="holo-chromatic" />

                    {/* Mansi Figure */}
                    <div className="holo-figure">
                        <Image
                            src="/images/mansi-holo.png"
                            alt="Mansi Hologram"
                            width={240}
                            height={380}
                            className="holo-image"
                            priority
                        />
                        <div className="holo-figure-glow" />
                    </div>

                    {/* Status Bar */}
                    <div className="holo-status">
                        <span className="status-dot" />
                        <span className="status-text">{statusText}</span>
                    </div>

                    {/* Chat Messages */}
                    <div className="holo-chat">
                        {messages.map((msg, i) => (
                            <div key={i} className={`chat-msg ${msg.role === 'assistant' ? 'bot-msg' : 'user-msg'}`}>
                                <div className="msg-content">{msg.content}</div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="typing-ind">
                                <div className="typing-dot" />
                                <div className="typing-dot" />
                                <div className="typing-dot" />
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="holo-input-wrap">
                        <input
                            ref={inputRef}
                            type="text"
                            className="holo-input"
                            placeholder="Bolo... (Hindi/English/Gujarati)"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            autoComplete="off"
                        />
                        <button className="holo-send" onClick={handleSend} disabled={isLoading || !input.trim()} aria-label="Send">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ===== HOLOGRAM PROJECTOR PUCK ===== */}
                <button
                    className={`holo-puck ${isActive ? 'active' : ''}`}
                    onClick={() => setIsActive(v => !v)}
                    aria-label={isActive ? 'Close Mansi' : 'Open Mansi AI'}
                    aria-expanded={isActive}
                >
                    <div className="puck-ring-1" />
                    <div className="puck-ring-2" />
                    <div className="puck-core" />
                    <div className="puck-icon-wrap">
                        {/* Chat icon */}
                        <svg className="puck-icon chat-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        {/* Close icon */}
                        <svg className="puck-icon close-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </div>
                    <div className="puck-glow" />
                </button>
            </div>
        </>
    );
}
