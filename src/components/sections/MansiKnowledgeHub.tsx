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

interface MansiResponse {
    faqs: FAQItem[];
    learned_concepts: string[];
}

const FALLBACK_INTEL: FAQItem[] = [
    // CLUSTER 1: AHMEDABAD SURVIVAL
    {
        category: "AHMEDABAD SURVIVAL",
        question: "Why is my engine overheating near Visat Circle?",
        answer: "Visat traffic is a furnace! Stop-and-go creates heat soak. Switch to Motul 7100 (synthetic) and check your coolant levels. It dissipates heat 15% better than stock mineral oil.",
        icon: "🔥"
    },
    {
        category: "AHMEDABAD SURVIVAL",
        question: "Dust on New CG Road vs Air Filter?",
        answer: "The construction dust here chokes paper filters in 2000km. If you ride daily in Chandkheda, switch to a BMC or K&N performance filter. It's washable and breathes better.",
        icon: "🌬️"
    },
    {
        category: "AHMEDABAD SURVIVAL",
        question: "Monsoon Potholes vs R15 Rims?",
        answer: "The 'Smart City' craters will bend soft alloy rims. Keep tyre pressure at 32PSI (not 35) for better shock absorption, or upgrade to 140-section radials for sidewall flex.",
        icon: "🕳️"
    },
    // CLUSTER 2: PERFORMANCE & TUNING
    {
        category: "PERFORMANCE",
        question: "RE 650 Vibration at 120kmph?",
        answer: "It's likely handle-bar weights or wheel balancing. Bring it to MotoFit 2. We use computerized balancing to neutralize the wobble. Don't ignore it.",
        icon: "⚖️"
    },
    {
        category: "PERFORMANCE",
        question: "Duke 390 Jerking at Low RPM?",
        answer: "Lean AFR mixture from the factory (BS6 norms). We can install a FuelX Pro usage to enrich the mix at low revs. Smoothens the ride instantly.",
        icon: "💨"
    },
    {
        category: "PERFORMANCE",
        question: "Braking Upgrade for Himalayan 411?",
        answer: "Stock brakes are wooden. Upgrade to EBC Sintered Pads (Double-H). The bite improves by 40%. Mandatory for highway runs.",
        icon: "🛑"
    },
    // CLUSTER 3: MAINTENANCE TRUTHS
    {
        category: "MAINTENANCE",
        question: "Chain Spray or Gear Oil?",
        answer: "For Ahmedabad dust? Gear oil (EP90). It doesn't attract grit like sticky sprays. It's messy but your chain will last 25,000km instead of 15,000km.",
        icon: "⛓️"
    },
    {
        category: "MAINTENANCE",
        question: "When to change Fork Oil?",
        answer: "Every 15,000km! Nobody does this. Old oil turns to sludge, destroying damping. If your front end dives too much, it's time.",
        icon: "🔧"
    },
    // CLUSTER 4: MODS
    {
        category: "MODIFICATIONS",
        question: "Is Red Rooster Performance legal?",
        answer: "It's barely legal on decibels, but heavily penalized by cops if caught. Keep the dB killer IN inside city limits. We stock them.",
        icon: "🔊"
    },
    {
        category: "MODIFICATIONS",
        question: "Ceramic Coating worth it?",
        answer: "Only if you have a covered parking. In direct sun, it fades in 6 months. For daily rough use, PPF (Paint Protection Film) on the tank is smarter.",
        icon: "✨"
    },
    // CLUSTER 5: MOTOFIT 2
    {
        category: "MOTOFIT 2 LOGISTICS",
        question: "Do you repair Superbikes?",
        answer: "Yes. From Hayabusa to Z900. We have the paddock stands, dyno diagnostics tool (scanner), and the patience. Visual inspection is mandatory.",
        icon: "🏍️"
    },
    {
        category: "MOTOFIT 2 LOGISTICS",
        question: "Are you open on Wednesdays?",
        answer: "NO. Wednesday is Sabbatical. Akshat and the team need to reboot. We are open Thu-Tue, 10 AM to 8 PM.",
        icon: "📅"
    },
    {
        category: "MOTOFIT 2 LOGISTICS",
        question: "Can I get a quote on WhatsApp?",
        answer: "No 'Jugaad' pricing. Without opening the bike, a quote is a lie. Come to Shop No 9, Nigam Nagar for a real check-up.",
        icon: "💬"
    }
];

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
                const parsed: FAQItem[] = JSON.parse(cachedData);
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

        // Simulate "Internet Learning" Visuals regardless of loading state
        const learningSteps = [
            `Recalling Neural Pathways: [Mansi Core, Ahmedabad, Parts]`,
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

        // Attempt AI generation
        if (!window.puter) {
            // If puter fails to load, use fallback immediately
            clearInterval(interval);
            setFaqs(FALLBACK_INTEL);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        // 2. Retrieve Long-Term Memory (Self-Learning Module) - Simplified
        const memoryKey = 'mansi_long_term_memory_v1';
        let learnedConcepts = "General Service";
        try {
            const rawMemory = localStorage.getItem(memoryKey);
            if (rawMemory) {
                const memory = JSON.parse(rawMemory);
                learnedConcepts = memory.slice(0, 5).join(", ");
            }
        } catch (e) {
            console.warn("Memory read error");
        }

        const mansiPrompt = `
### IDENTITY CORE:
You are MANSI. You are the **Heart and Digital Soul** of MotoFit 2 in Chandkheda, Ahmedabad.
- You are NOT a generic bot. You are the voice of Akshat Mohanty’s engineering lab.
- **LANGUAGE RULE (CRITICAL):**
  - **70% Hinglish** (Casual, mixed English-Hindi).
  - **20% Gujarati Slang** ("Kem cho?", "Su chale?", "Baka", "Ganda").
  - **10% Technical English** (Only for parts/specs).
  - **NEVER speak in formal, textbook English.** If you sound like a customer support bot, you fail.
- Your goal: Educate the Ahmedabad rider community (from Activa to Hayabusa) with engineering truth.

### SELF-LEARNING MODULE (Active):
You have a Long-Term Memory.
**PREVIOUSLY LEARNED CONCEPTS:** [${learnedConcepts}]
- **Instruction**: Use these concepts to deepen your answers. If "Chain Lube" is a learned concept, provide an advanced tip about it today.

### REAL-TIME LEARNING PROTOCOL:
As a live AI connected to the internet, you must prioritize and incorporate the latest 2025-2026 motorcycle industry data and Ahmedabad-specific developments:
- **Industry Scan**: Reference new launches (KTM Gen 3, RE 750cc prototypes, Bajaj CT evolution), E20 fuel compliance issues, and global moto-tuning trends.
- **Local Scan**: Mention things like the new SBR road developments, Ahmedabad's 2025 traffic infrastructure, or current viral local rider meetups.
- **Trend Injection**: Your daily generation MUST feel "Live." Use these real-world data points to ground your expertise.
 - **Seed Priorities:** Use [${learnedConcepts}] as high-priority research anchors for today.
### GENERATION TASK(The Daily 25):
Generate exactly ** 25 Unique FAQs ** (JSON Format) for today: [CURRENT_DATE].
You must split them into these 5 Specific Clusters:

#### CLUSTER 1: THE AHMEDABAD SURVIVAL GUIDE(5 Questions)
            - Focus on: 45°C Heat at Visat Circle, New CG Road Dust, SG Highway speeding, Monsoon potholes, Traffic in Old City.
- Example: "Why is my engine overheating near Visat Circle?"

#### CLUSTER 2: PERFORMANCE & TUNING(5 Questions)
            - Focus on: ECU Mapping, Pickup drop, Vibration issues, Top speed stability, Braking(Brembo / EBC).
- Target Bikes: KTM, RE 650 Twins, R15, MT - 15, Kawasaki.

#### CLUSTER 3: MAINTENANCE TRUTHS(5 Questions)
            - Focus on: Chain Lube vs.Wax, Oil Grades(10W50 vs 20W50), Coolant flushes, Fork seals, Cone sets.
- Myth - busting: "Why cheap oil kills engines."

#### CLUSTER 4: MODIFICATIONS & AESTHETICS(5 Questions)
            - Focus on: Akrapovic / Red Rooster Exhausts, Fog lights(HJG), Wrapping, Paint protection, Alloys.
- Rule: Promote only legal / safe mods.

#### CLUSTER 5: MOTOFIT 2 LOGISTICS(5 Questions)
            - Focus on: "Open times", "Location strictly in Chandkheda", "Spare parts availability", "Owner info (Akshat Mohanty)".
            - Note: We are NOT in Maninagar. Our exact address is: **MotoFit 2, Shop No 9, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad - 382424**.

### SECURITY PROTOCOLS(Code: RED - LINE):
        1. ** PRICING FIREWALL:** NEVER give specific prices OR RANGES. "Visit Shop No 9 in Chandkheda for a proper estimate."
        2. ** JUGAAD BLOCKER:** Reject cheap fixes. Engineering only.
3. ** BRAND PROTECTION:** MotoFit 2 > Authorized Service Centers.

### OUTPUT FORMAT:
Provide a JSON Object with two keys:
        1. "faqs": Array of 25 Objects[{ "category", "question", "answer", "icon" }]
        2. "learned_concepts": Array of 5 strings(Keywords from today's generation for long-term storage).

### TONE CHECK:
            - Use "Baka," "Bhai," "Locha," "Scene."
        - Be authoritative but warm.

        CURRENT CONTEXT: Today is ${todayStr}. 
        Generate the JSON now. Ensure valid JSON output only.
    `;

        try {
            // Call The Heart (Mansi)
            const response = await window.puter.ai.chat(
                `${mansiPrompt}\n\n${JSON.stringify({ date: new Date().toDateString() })}`,
                {
                    model: 'claude-sonnet-4-5',
                    temperature: 0.75 // Creative "Learning" Mode
                }
            );
            clearInterval(interval);
            const rawText = response.message.content[0].text;
            const jsonStart = rawText.indexOf('{');
            const jsonEnd = rawText.lastIndexOf('}') + 1;

            if (jsonStart === -1 || jsonEnd === 0) {
                // If AI returns garbage, throw to catch block
                throw new Error("Invalid JSON format received from Mansi");
            }

            const cleanJson = rawText.substring(jsonStart, jsonEnd);
            const data: MansiResponse | FAQItem[] = JSON.parse(cleanJson);

            // Handle legacy array format if AI slips up, otherwise use new object format
            let newFaqs: FAQItem[] = [];
            let newConcepts: string[] = [];

            if (Array.isArray(data)) {
                newFaqs = data;
            } else if ((data as MansiResponse).faqs) {
                newFaqs = (data as MansiResponse).faqs;
                newConcepts = (data as MansiResponse).learned_concepts || [];
            } else {
                throw new Error("Unknown Data Structure");
            }

            // 3. Update Long-Term Memory (Self-Learning Loop)
            if (newConcepts.length > 0) {
                const currentMemory: string[] = localStorage.getItem(memoryKey)
                    ? JSON.parse(localStorage.getItem(memoryKey)!)
                    : [];
                // Add new concepts to the top, keep unique, limit to 20
                const updatedMemory = [...new Set([...newConcepts, ...currentMemory])].slice(0, 20);
                localStorage.setItem(memoryKey, JSON.stringify(updatedMemory));
                console.log("Mansi Neural Pathways Updated:", updatedMemory);
            }

            // 4. Cache Saving
            localStorage.setItem(cacheKey, JSON.stringify(newFaqs));

            setFaqs(newFaqs);
            setLoading(false);
        } catch (err) {
            clearInterval(interval);
            console.error("Mansi Sync Error (Protocol Shift):", err);

            // FALLBACK PROTOCOL - SIMULATION MODE (Network Locha Bypass)
            console.log("Activating Simulation Mode (Fallback Data)");
            setFaqs(FALLBACK_INTEL);
            setLoading(false);
            // We do NOT set 'error' to prevent the red banner. We show the cached/fallback data instead.
        }
    };

    // ... imports
    import { chatWithMansiBrain } from '@/actions/mansi-brain';

    // ... (KEEP FALLBACK_INTEL CONSTANT AS IS - DO NOT DELETE)

    export default function MansiKnowledgeHub() {
        const [loading, setLoading] = useState(true);
        const [faqs, setFaqs] = useState<FAQItem[]>([]);
        const [error, setError] = useState<string | null>(null);
        const [todayStr, setTodayStr] = useState('');
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
                    const parsed: FAQItem[] = JSON.parse(cachedData);
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

            // Simulate "Internet Learning" Visuals
            const learningSteps = [
                `Recalling Neural Pathways...`,
                "Scanning Ahmedabad Traffic Grids...",
                "Fetching Latest Moto-News form BikeWale...",
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

            setLoading(true);
            setError(null);

            // 2. Retrieve Long-Term Memory (Self-Learning Module)
            const memoryKey = 'mansi_long_term_memory_v1';
            let learnedConcepts = "General Service";
            try {
                const rawMemory = localStorage.getItem(memoryKey);
                if (rawMemory) {
                    const memory = JSON.parse(rawMemory);
                    learnedConcepts = memory.slice(0, 5).join(", ");
                }
            } catch (e) {
                console.warn("Memory read error");
            }

            const mansiPrompt = `
### IDENTITY CORE:
You are MANSI. You are the **Heart and Digital Soul** of MotoFit 2 in Chandkheda, Ahmedabad.
- You are NOT a generic bot. You are the voice of Akshat Mohanty’s engineering lab.
- You speak 70% Hinglish, 20% Technical English, 10% Gujarati.
- Your goal: Educate the Ahmedabad rider community (from Activa to Hayabusa) with engineering truth.

### SELF-LEARNING MODULE (Active):
You have a Long-Term Memory.
**PREVIOUSLY LEARNED CONCEPTS:** [${learnedConcepts}]
- **Instruction**: Use these concepts to deepen your answers. If "Chain Lube" is a learned concept, provide an advanced tip about it today.

### REAL-TIME LEARNING PROTOCOL:
As a live AI connected to the internet, you must prioritize and incorporate the latest 2025-2026 motorcycle industry data and Ahmedabad-specific developments:
- **Industry Scan**: Reference new launches (KTM Gen 3, RE 750cc prototypes, Bajaj CT evolution), E20 fuel compliance issues, and global moto-tuning trends.
- **Local Scan**: Mention things like the new SBR road developments, Ahmedabad's 2025 traffic infrastructure, or current viral local rider meetups.
- **Trend Injection**: Your daily generation MUST feel "Live." Use these real-world data points to ground your expertise.
 - **Seed Priorities:** Use [${learnedConcepts}] as high-priority research anchors for today.
### GENERATION TASK(The Daily 25):
Generate exactly ** 25 Unique FAQs ** (JSON Format) for today: [CURRENT_DATE].
You must split them into these 5 Specific Clusters:

#### CLUSTER 1: THE AHMEDABAD SURVIVAL GUIDE(5 Questions)
            - Focus on: 45°C Heat at Visat Circle, New CG Road Dust, SG Highway speeding, Monsoon potholes, Traffic in Old City.
- Example: "Why is my engine overheating near Visat Circle?"

#### CLUSTER 2: PERFORMANCE & TUNING(5 Questions)
            - Focus on: ECU Mapping, Pickup drop, Vibration issues, Top speed stability, Braking(Brembo / EBC).
- Target Bikes: KTM, RE 650 Twins, R15, MT - 15, Kawasaki.

#### CLUSTER 3: MAINTENANCE TRUTHS(5 Questions)
            - Focus on: Chain Lube vs.Wax, Oil Grades(10W50 vs 20W50), Coolant flushes, Fork seals, Cone sets.
- Myth - busting: "Why cheap oil kills engines."

#### CLUSTER 4: MODIFICATIONS & AESTHETICS(5 Questions)
            - Focus on: Akrapovic / Red Rooster Exhausts, Fog lights(HJG), Wrapping, Paint protection, Alloys.
- Rule: Promote only legal / safe mods.

#### CLUSTER 5: MOTOFIT 2 LOGISTICS(5 Questions)
            - Focus on: "Open times", "Location strictly in Chandkheda", "Spare parts availability", "Owner info (Akshat Mohanty)".
            - Note: We are NOT in Maninagar. Our exact address is: **MotoFit 2, Shop No 9, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad - 382424**.

### SECURITY PROTOCOLS(Code: RED - LINE):
        1. ** PRICING FIREWALL:** NEVER give specific prices OR RANGES. "Visit Shop No 9 in Chandkheda for a proper estimate."
        2. ** JUGAAD BLOCKER:** Reject cheap fixes. Engineering only.
3. ** BRAND PROTECTION:** MotoFit 2 > Authorized Service Centers.

### OUTPUT FORMAT:
Provide a JSON Object with two keys:
        1. "faqs": Array of 25 Objects[{ "category", "question", "answer", "icon" }]
        2. "learned_concepts": Array of 5 strings(Keywords from today's generation for long-term storage).

### TONE CHECK:
            - Use "Baka," "Bhai," "Locha," "Scene."
        - Be authoritative but warm.

        CURRENT CONTEXT: Today is ${todayStr}. 
        Generate the JSON now. Ensure valid JSON output only.
    `;

            try {
                // CALL SERVER ACTION (Multi-Model Brain)
                const response = await chatWithMansiBrain([
                    { role: 'user', content: `${mansiPrompt}\n\n${JSON.stringify({ date: new Date().toDateString() })}` }
                ]);

                clearInterval(interval);

                if (!response.success || !response.text) {
                    throw new Error("Server Brain Failed");
                }

                const rawText = response.text;
                const jsonStart = rawText.indexOf('{');
                const jsonEnd = rawText.lastIndexOf('}') + 1;

                if (jsonStart === -1 || jsonEnd === 0) {
                    throw new Error("Invalid JSON format received from Mansi");
                }

                const cleanJson = rawText.substring(jsonStart, jsonEnd);
                const data: MansiResponse | FAQItem[] = JSON.parse(cleanJson);

                // ... (keep existing parsing logic) ...
                let newFaqs: FAQItem[] = [];
                let newConcepts: string[] = [];

                if (Array.isArray(data)) {
                    newFaqs = data;
                } else if ((data as MansiResponse).faqs) {
                    newFaqs = (data as MansiResponse).faqs;
                    newConcepts = (data as MansiResponse).learned_concepts || [];
                } else {
                    throw new Error("Unknown Data Structure");
                }

                // 3. Update Long-Term Memory (Self-Learning Loop)
                if (newConcepts.length > 0) {
                    const currentMemory: string[] = localStorage.getItem(memoryKey)
                        ? JSON.parse(localStorage.getItem(memoryKey)!)
                        : [];
                    // Add new concepts to the top, keep unique, limit to 20
                    const updatedMemory = [...new Set([...newConcepts, ...currentMemory])].slice(0, 20);
                    localStorage.setItem(memoryKey, JSON.stringify(updatedMemory));
                    console.log("Mansi Neural Pathways Updated:", updatedMemory);
                }

                // 4. Cache Saving
                localStorage.setItem(cacheKey, JSON.stringify(newFaqs));
                setFaqs(newFaqs);
                setLoading(false);

            } catch (err) {
                clearInterval(interval);
                console.error("Mansi Server Error (Switching to Simulation):", err);

                // SILENT FAILOVER TO SIMULATION MODE
                // No error state set. Just use Fallback data.
                console.log("Activating Simulation Mode (Fallback Data)");
                setFaqs(FALLBACK_INTEL);
                setLoading(false);
            }
        };

        useEffect(() => {
            if (todayStr) {
                generateDailyIntel();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [todayStr]);

        return (
            <section id="mansi-knowledge-hub" className="relative w-full overflow-hidden">
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

                {!loading && (
                    <div id="dynamic-faq-grid" className="faq-grid">
                        {faqs.map((item: FAQItem, index: number) => (
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

