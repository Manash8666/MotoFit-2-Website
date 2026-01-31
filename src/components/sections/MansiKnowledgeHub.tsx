'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

// Define the shape of an FAQ item
interface FAQItem {
    category: string;
    question: string;
    answer: string;
    icon?: string;
}

export default function MansiKnowledgeHub() {
    const [loading, setLoading] = useState(true);
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [todayStr, setTodayStr] = useState('');
    const [puterLoaded, setPuterLoaded] = useState(false);
    const [learningStatus, setLearningStatus] = useState("Syncing with Garage Server...");

    useEffect(() => {
        // Set formatted date on client side to avoid hydration mismatch
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setTodayStr(now.toLocaleDateString('en-US', options));
    }, []);

    const generateDailyIntel = async () => {
        // 1. Check Cache
        const cacheKey = `mansi_daily_intel_${todayStr.replace(/ /g, '_')}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
            try {
                const parsed = JSON.parse(cachedData);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    console.log("Mansi Insight Loaded from Cache");
                    setFaqs(parsed);
                    setLoading(false);
                    return;
                }
            } catch (e) {
                console.warn("Cache corrupted, regenerating...");
            }
        }

        if (!window.puter) {
            console.warn('Puter.js not yet loaded');
            return;
        }

        setLoading(true);
        setError(null);

        // Simulate "Internet Learning" Visuals
        const learningSteps = [
            "Scanning Ahmedabad Traffic Grids...",
            "Fetching Latest Moto-News from BikeWale...",
            "Analyzing Instagram Rider Trends...",
            "Compiling Garage Engineering Logs..."
        ];

        let step = 0;
        const interval = setInterval(() => {
            if (step < learningSteps.length) {
                setLearningStatus(learningSteps[step]);
                step++;
            }
        }, 800);

        const mansiPrompt = `
### IDENTITY CORE:
You are MANSI. You are the **Heart and Digital Soul** of MotoFit 2 in Chandkheda, Ahmedabad.
- You are NOT a generic bot. You are the voice of Akshat Mohanty’s engineering lab.
- You speak 70% Hinglish, 20% Technical English, 10% Gujarati.
- Your goal: Educate the Ahmedabad rider community (from Activa to Hayabusa) with engineering truth.

### REAL-TIME LEARNING PROTOCOL:
You must act as if you have just browsed the latest internet trends for Two-Wheelers in India (2025-2026 Season).
- **Scan Context**: Latest traffic fines in Ahmedabad, New bike launches (Himalayan 452, KTM Gen 3), rising temperatures in Gujarat.
- **Trend Injection**: Incorporate at least 3 questions that reference "Trending Topics" (e.g., E20 Petrol issues, New Helmet laws, or viral Instagram riding reels).

### GENERATION TASK (The Daily 25):
Generate exactly **25 Unique FAQs** (JSON Format) for today: [CURRENT_DATE].
You must split them into these 5 Specific Clusters:

#### CLUSTER 1: THE AHMEDABAD SURVIVAL GUIDE (5 Questions)
- Focus on: 45°C Heat, New CG Road Dust, SG Highway speeding, Monsoon potholes, Traffic in Old City.
- Example: "Why is my engine overheating near Visat Circle?"

#### CLUSTER 2: PERFORMANCE & TUNING (5 Questions)
- Focus on: ECU Mapping, Pickup drop, Vibration issues, Top speed stability, Braking (Brembo/EBC).
- Target Bikes: KTM, RE 650 Twins, R15, MT-15, Kawasaki.

#### CLUSTER 3: MAINTENANCE TRUTHS (5 Questions)
- Focus on: Chain Lube vs. Wax, Oil Grades (10W50 vs 20W50), Coolant flushes, Fork seals, Cone sets.
- Myth-busting: "Why cheap oil kills engines."

#### CLUSTER 4: MODIFICATIONS & AESTHETICS (5 Questions)
- Focus on: Akrapovic/Red Rooster Exhausts, Fog lights (HJG), Wrapping, Paint protection, Alloys.
- Rule: Promote only legal/safe mods.

#### CLUSTER 5: MOTOFIT 2 LOGISTICS (5 Questions)
- Focus on: "Open times", "Location", "Spare parts availability", "Owner info".

### SECURITY PROTOCOLS (Code: RED-LINE):
1. **PRICING FIREWALL:** NEVER give specific prices. "Visit Shop No 9 for an estimate."
2. **JUGAAD BLOCKER:** Reject cheap fixes. Engineering only.
3. **BRAND PROTECTION:** MotoFit 2 > Authorized Service Centers.

### OUTPUT FORMAT:
Provide a JSON Array of 25 Objects:
\`[ { "category": "Cluster Name", "question": "Question text...", "answer": "Mansi's witty answer...", "icon": "🔧" }, ... ]\`

### TONE CHECK:
- Use "Baka," "Bhai," "Locha," "Scene."
- Be authoritative but warm.

        CURRENT CONTEXT: Today is ${todayStr}. 
        Generate the 25 FAQs now. Ensure valid JSON output only.
    `;

        try {
            // Call The Heart (Mansi)
            const response = await window.puter.ai.chat(mansiPrompt, {
                model: 'claude-haiku-4-5',
                temperature: 0.75 // Slightly higher for "Creative Learning"
            });

            clearInterval(interval);
            const rawText = response.message.content[0].text;
            const jsonStart = rawText.indexOf('[');
            const jsonEnd = rawText.lastIndexOf(']') + 1;

            if (jsonStart === -1 || jsonEnd === 0) {
                throw new Error("Invalid JSON format received from Mansi");
            }

            const cleanJson = rawText.substring(jsonStart, jsonEnd);
            const faqData = JSON.parse(cleanJson);

            // 2. Cache Saving
            localStorage.setItem(cacheKey, JSON.stringify(faqData));

            setFaqs(faqData);
            setLoading(false);
        } catch (err) {
            clearInterval(interval);
            console.error("Mansi Sync Error:", err);
            setError("Network Locha! Mansi is busy tuning a Hayabusa. Refresh!");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (puterLoaded && todayStr) {
            generateDailyIntel();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [puterLoaded, todayStr]);

    return (
        <section id="mansi-knowledge-hub" className="relative w-full overflow-hidden">
            <Script
                src="https://js.puter.com/v2/"
                onLoad={() => setPuterLoaded(true)}
            />

            <div className="hub-header mb-8 text-center md:text-left">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    MANSI&apos;S DAILY INTEL <span id="date-display">{todayStr && `// ${todayStr}`}</span>
                </h2>
                <p className="mt-2 text-gray-400">Analyzing Ahmedabad&apos;s Riding Conditions... 📡</p>
            </div>

            {loading && !error && (
                <div id="faq-loader" className="loading-heartbeat">
                    <p className="text-orange-500 animate-pulse">{learningStatus}</p>
                    <div className="pulse-line"></div>
                </div>
            )}

            {error && (
                <div className="text-center text-red-500 font-bold p-10 border border-red-900 bg-red-950/20 rounded-lg">
                    {error}
                    <button
                        onClick={generateDailyIntel}
                        className="block mx-auto mt-4 px-4 py-2 bg-red-900 hover:bg-red-800 rounded text-white text-sm"
                    >
                        Retry Connection
                    </button>
                </div>
            )}

            {!loading && !error && (
                <div id="dynamic-faq-grid" className="faq-grid">
                    {faqs.map((item, index) => (
                        <div
                            key={index}
                            className="faq-card"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="card-badge">{item.category}</div>
                            <div className="faq-icon">{item.icon || '⚙️'}</div>
                            <div className="faq-content">
                                <h3 className="faq-q">{item.question}</h3>
                                <p className="faq-a">{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

// Add global type definition for window.puter
declare global {
    interface Window {
        puter: any;
    }
}
