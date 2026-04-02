'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateTrendingBlog } from '@/actions/mansi-auto-blog';
import { FAQItem, MANSI_KNOWLEDGE_VAULT } from '@/data/mansi-intel';

export default function MansiKnowledgeHub() {
    const router = useRouter();
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [todayStr, setTodayStr] = useState('');
    const [bloggingId, setBloggingId] = useState<string | null>(null);

    useEffect(() => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setTodayStr(now.toLocaleDateString('en-US', options));

        // Deterministic Daily Slice:
        // Get the current day of the year (0 - 365)
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        // We have 25 items in the vault, and we want to show 5 per day.
        // So there are 5 unique 'pages' of content that rotate infinitely.
        const totalPages = Math.floor(MANSI_KNOWLEDGE_VAULT.length / 5);
        const pageIndex = dayOfYear % totalPages;
        const startIndex = pageIndex * 5;
        
        setFaqs(MANSI_KNOWLEDGE_VAULT.slice(startIndex, startIndex + 5));
    }, []);

    const handleBoost = async (item: FAQItem) => {
        if (bloggingId) return; // Prevent double clicks
        
        setBloggingId(item.id);
        
        try {
            // Trigger the Auto-Blog Generator Engine
            const res = await generateTrendingBlog(`Write an engineering blog answering: ${item.question}`);
            
            if (res.success && res.slug) {
                // Instantly teleport the user to the newly synthesized blog!
                router.push(`/blog/${res.slug}`);
            } else {
                console.error("Failed to generate viral blog:", res.error);
                alert("Mansi neural net busy. Could not synthesize blog.");
                setBloggingId(null);
            }
        } catch (e) {
            console.error("Auto-blog trigger failed:", e);
            setBloggingId(null);
        }
    };

    return (
        <section id="mansi-knowledge-hub" className="relative w-full overflow-hidden py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="hub-header mb-12 text-center md:text-left">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                        MANSI'S DAILY INTEL <span id="date-display" className="text-[#00d1ff] block sm:inline mt-2 sm:mt-0">{todayStr && `// ${todayStr}`}</span>
                    </h2>
                    <p className="mt-4 text-gray-400 max-w-2xl">
                        Analyzing Ahmedabad's riding conditions. Below is your rotating daily technical briefing. If a topic is critical, <strong>Boost it</strong> to demand a full engineering blog.
                    </p>
                </div>

                <div id="dynamic-faq-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {faqs.map((item: FAQItem, index: number) => (
                        <div
                            key={item.id}
                            className="bg-[#0a0a0a] border border-[#333]/50 rounded-2xl p-6 relative overflow-hidden group hover:border-[#ff5e1a]/50 transition-colors duration-300 flex flex-col h-full"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-xs font-mono text-[#ff8a3d] border border-[#ff8a3d]/30 bg-[#ff8a3d]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                                    {item.category}
                                </div>
                                <div className="text-2xl">{item.icon || '⚙️'}</div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                                {item.question}
                            </h3>
                            
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                {item.answer}
                            </p>

                            <div className="mt-auto pt-4 border-t border-[#333]/30">
                                <button
                                    onClick={() => handleBoost(item)}
                                    disabled={bloggingId === item.id}
                                    className={`w-full py-3 px-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${
                                        bloggingId === item.id 
                                            ? 'bg-transparent border border-[#00d1ff] text-[#00d1ff] cursor-wait'
                                            : 'bg-[#1a1a1a] hover:bg-[#ff5e1a] text-gray-300 hover:text-white border border-transparent'
                                    }`}
                                >
                                    {bloggingId === item.id ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-[#00d1ff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Synthesizing Blog...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Demand Blog Post 🔥
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
