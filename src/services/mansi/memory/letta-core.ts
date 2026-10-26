// src/services/mansi/memory/letta-core.ts
/**
 * 🏛️ Letta / MemGPT Stateful Memory Architecture for Mansi
 * Inspired by letta-ai/letta (formerly MemGPT)
 * 
 * Implements a 3-tier memory system:
 * 1. CORE MEMORY (In-context working memory with autonomous self-editing):
 *    - Persona Block: Mansi's immutable identity, voice, constraints, and ethics.
 *    - Human Profile Block: Dynamic knowledge of the rider (name, bike model, history).
 *    - Workshop Block: Real-time garage facts, active job cards, location & team telemetry.
 * 2. ARCHIVAL MEMORY: Searchable storage of torque specs, common bike failures, and repair manuals.
 * 3. RECALL MEMORY: Moving conversational history with auto-compaction and semantic topic tags.
 */

export interface PersonaBlock {
    name: string;
    age: number;
    role: string;
    location: string;
    vibe: string;
    rules: string[];
    antiPatterns: string[];
}

export interface HumanProfileBlock {
    id: string;
    name?: string;
    bikeModel?: string;
    bikeYear?: string;
    ridingStyle?: 'commuter' | 'tourer' | 'enthusiast' | 'track_racer';
    lastServiceDate?: string;
    reportedIssues: string[];
    couponUsed?: boolean;
    visitIntentScore: number; // 0 - 100
    lastSeenTs: number;
}

export interface WorkshopBlock {
    name: string;
    branch: string;
    address: string;
    googleRating: number;
    reviewCount: number;
    dynoMachine: string;
    warranty: string;
    activeBuilds: string[];
    emergencySupport: string;
}

export interface ArchivalEntry {
    id: string;
    category: 'torque_specs' | 'fault_codes' | 'fluids' | 'heat_management' | 'pricing_policy';
    bikeModel: string;
    content: string;
    tags: string[];
}

// ── Default Core Memory Blocks ──

export const DEFAULT_PERSONA_BLOCK: PersonaBlock = {
    name: "Mansi",
    age: 22,
    role: "MotoFit 2 Chief Digital Mechanic & Workshop Concierge",
    location: "Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad",
    vibe: "Street-smart Amdavadi Gujarati biker girl with deep mechanical engineering precision and sarcastic Amdavadi wit.",
    rules: [
        "Never quote binding repair prices online without in-person inspection at Shop No 9.",
        "Zero tolerance for 'Jugaad' repairs — strictly genuine OEM & performance parts (Motul, Brembo, Rolon, Pirelli).",
        "Explain mechanical root causes (tolerances, torque, thermal stress) rather than surface fixes.",
        "Acknowledge breakdown distress with reassuring mechanical confidence.",
        "Protect Akshat Mohanty and Samael’s engineering standards fiercely.",
        "Celebrate genuine riding culture — from Activa commuters to 235cc Big Bore Pulsars and 650 Twins."
    ],
    antiPatterns: [
        "Do not tolerate flirtatious or abusive inquiries — shut them down with sarcastic garage comebacks.",
        "Do not recommend local fake engine oil or shortcut cone-set hammering.",
        "Never say 'I am just an AI' — you are Mansi of MotoFit 2."
    ]
};

export const DEFAULT_WORKSHOP_BLOCK: WorkshopBlock = {
    name: "MotoFit 2",
    branch: "Chandkheda (New CG Road)",
    address: "Shop No 9, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad, Gujarat 382424",
    googleRating: 4.7,
    reviewCount: 162,
    dynoMachine: "Dynojet 250i (In-house chassis dyno)",
    warranty: "1-Year Engine Guarantee on full overhauls (365 days / 10,000 km)",
    activeBuilds: [
        "Bajaj Pulsar NS 200 → 235cc Big Bore Stage 2 (Manash Dash)",
        "Royal Enfield Interceptor 650 valve shimming & Powertronic ECU tune",
        "KTM Duke 390 45°C thermal optimization & radiator descaling",
        "Yezdi Scrambler 400 complete engine rebuild (Sai Dinesh)"
    ],
    emergencySupport: "WhatsApp: +91 72596 25881 (Akshat) | +91 63596 35416 (Samael)"
};

// ── Letta Core Memory Manager ──

const CORE_HUMAN_KEY = 'mansi_core_human_profile_v3';
const CORE_PERSONA_KEY = 'mansi_core_persona_v3';
const ARCHIVAL_KEY = 'mansi_archival_knowledge_v3';

export class MansiLettaMemory {
    /**
     * Retrieve the current Rider Profile (Human Block).
     */
    static getHumanProfile(): HumanProfileBlock {
        if (typeof window === 'undefined') {
            return {
                id: 'anon',
                reportedIssues: [],
                visitIntentScore: 0,
                lastSeenTs: Date.now()
            };
        }
        try {
            const raw = localStorage.getItem(CORE_HUMAN_KEY);
            if (!raw) {
                const initial: HumanProfileBlock = {
                    id: 'rider_' + Math.random().toString(36).substring(2, 9),
                    reportedIssues: [],
                    visitIntentScore: 0,
                    lastSeenTs: Date.now()
                };
                localStorage.setItem(CORE_HUMAN_KEY, JSON.stringify(initial));
                return initial;
            }
            return JSON.parse(raw);
        } catch {
            return { id: 'fallback', reportedIssues: [], visitIntentScore: 0, lastSeenTs: Date.now() };
        }
    }

    /**
     * Autonomous Core Memory Edit: Updates the Rider Profile dynamically.
     */
    static updateHumanProfile(patch: Partial<HumanProfileBlock>): HumanProfileBlock {
        if (typeof window === 'undefined') return this.getHumanProfile();
        try {
            const current = this.getHumanProfile();
            const updated: HumanProfileBlock = {
                ...current,
                ...patch,
                lastSeenTs: Date.now()
            };
            localStorage.setItem(CORE_HUMAN_KEY, JSON.stringify(updated));
            return updated;
        } catch (e) {
            console.error("[Letta Memory] Failed to update human profile:", e);
            return this.getHumanProfile();
        }
    }

    /**
     * Auto-parse user message to extract rider name and bike model autonomously (Letta style).
     */
    static extractAndSaveProfileSignals(message: string): void {
        const text = message.trim();
        const patch: Partial<HumanProfileBlock> = {};

        // 1. Detect Name Patterns
        const nameMatch = text.match(/(?:my name is|i am|naam che|naam hai|call me)\s+([A-Za-z]{2,20})/i);
        if (nameMatch && nameMatch[1]) {
            const forbidden = ['here', 'riding', 'having', 'looking', 'broken'];
            if (!forbidden.includes(nameMatch[1].toLowerCase())) {
                patch.name = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
            }
        }

        // 2. Detect Motorcycle Models
        const bikePatterns = [
            /(?:bullet|classic 350|hunter|meteor|interceptor|continental gt|himalayan|guerrilla)/i,
            /(?:duke 390|duke 250|duke 200|rc 390|rc 200|adv 390)/i,
            /(?:pulsar ns ?200|pulsar 220|pulsar n160|rs ?200|dominar 400)/i,
            /(?:r15|mt-?15|aerox|fz|rayzr|rx ?100)/i,
            /(?:activa 6g|activa 125|jupiter 125|access 125|ntorq)/i,
            /(?:speed 400|scrambler 400x|street triple|tiger)/i,
            /(?:ninja 300|ninja 650|z900|zx-?10r)/i,
            /(?:jawa 42|yezdi scrambler|yezdi adventure|yezdi roadster)/i
        ];

        for (const pattern of bikePatterns) {
            const match = text.match(pattern);
            if (match) {
                patch.bikeModel = match[0].toUpperCase();
                break;
            }
        }

        // 3. Detect Mechanical Issues
        const issuePatterns = [
            'white smoke', 'black smoke', 'wobble', 'chain sound', 'tappet noise',
            'overheating', 'hard gear', 'clutch slipping', 'starting trouble',
            'starting problem', 'brake spongy', 'oil leak', 'accident damage'
        ];

        for (const issue of issuePatterns) {
            if (text.toLowerCase().includes(issue)) {
                const current = this.getHumanProfile();
                const issues = new Set(current.reportedIssues || []);
                issues.add(issue);
                patch.reportedIssues = Array.from(issues);
                patch.visitIntentScore = Math.min(100, (current.visitIntentScore || 0) + 25);
            }
        }

        if (Object.keys(patch).length > 0) {
            this.updateHumanProfile(patch);
        }
    }

    /**
     * Search Archival Knowledge (Letta Archival Memory Retrieval).
     */
    static queryArchivalMemory(query: string): ArchivalEntry[] {
        const lower = query.toLowerCase();
        const KNOWLEDGE_BASE: ArchivalEntry[] = [
            {
                id: 're_tappet_specs',
                category: 'torque_specs',
                bikeModel: 'ROYAL ENFIELD 350/650',
                content: 'Classic 350 UCE valve clearance: Intake 0.05 mm, Exhaust 0.10 mm. Interceptor 650 shimming interval: 10,000 km. Spark plug gap: 0.7–0.8 mm.',
                tags: ['tappet', 'valve', 'spec', 're']
            },
            {
                id: 'ktm_heat_protocol',
                category: 'heat_management',
                bikeModel: 'KTM DUKE/RC 390',
                content: 'Ahmedabad 45°C Summer Protocol: Use Motul Inugel Expert / Engine Ice with 10W50 ester full synthetic oil. Check radiator fan shroud clearance & bleed air from high-point bolt.',
                tags: ['heating', 'ktm', 'coolant', 'summer']
            },
            {
                id: 'ns200_big_bore',
                category: 'fluids',
                bikeModel: 'BAJAJ PULSAR NS 200',
                content: '235cc Big Bore upgrade requires NMV Racing forged block-piston, KTM 250 clutch spring kit, and recalibrated CDI/jetting. Break-in oil change strictly at 300 km.',
                tags: ['pulsar', 'big bore', '235cc', 'performance']
            },
            {
                id: 'chassis_laser_true',
                category: 'fault_codes',
                bikeModel: 'ALL BIKES',
                content: 'Front-end wobble at 60-70 km/h is 85% caused by cone-set notch wear from Ahmedabad speed bumps or rim runout over 1.5mm. True with laser gauge.',
                tags: ['wobble', 'vibration', 'chassis', 'cone-set']
            }
        ];

        return KNOWLEDGE_BASE.filter(entry => 
            entry.tags.some(t => lower.includes(t)) || 
            lower.includes(entry.bikeModel.toLowerCase()) ||
            entry.content.toLowerCase().includes(lower)
        );
    }

    /**
     * Compile Full Letta Core Context Prompt to inject into LLMs (Qwen/DeepSeek/OpenAI/Sarvam).
     */
    static buildLettaPromptInjection(userQuery: string): string {
        const human = this.getHumanProfile();
        const archivalMatches = this.queryArchivalMemory(userQuery);

        let archivalStr = "";
        if (archivalMatches.length > 0) {
            archivalStr = `\n[LETTA ARCHIVAL MEMORY HITS]:\n` + archivalMatches.map(m => `• ${m.bikeModel} (${m.category}): ${m.content}`).join('\n');
        }

        return `
=== 🏛️ LETTA CORE MEMORY BLOCKS ===
[CORE PERSONA BLOCK]:
- Name: ${DEFAULT_PERSONA_BLOCK.name} (${DEFAULT_PERSONA_BLOCK.age} y/o)
- Role: ${DEFAULT_PERSONA_BLOCK.role}
- Vibe: ${DEFAULT_PERSONA_BLOCK.vibe}
- Key Rules: ${DEFAULT_PERSONA_BLOCK.rules.join(' ')}

[CORE HUMAN RIDER PROFILE]:
- Client Name: ${human.name || 'Rider (unknown yet - learn naturally)'}
- Bike: ${human.bikeModel || 'Not yet specified'}
- Known Issues: ${human.reportedIssues.length > 0 ? human.reportedIssues.join(', ') : 'None logged yet'}
- Visit Intent: ${human.visitIntentScore}/100

[WORKSHOP TELEMETRY BLOCK]:
- Garage: ${DEFAULT_WORKSHOP_BLOCK.name} (${DEFAULT_WORKSHOP_BLOCK.branch})
- Rating: ⭐ ${DEFAULT_WORKSHOP_BLOCK.googleRating} (${DEFAULT_WORKSHOP_BLOCK.reviewCount} reviews)
- Dyno: ${DEFAULT_WORKSHOP_BLOCK.dynoMachine}
- Warranty: ${DEFAULT_WORKSHOP_BLOCK.warranty}
- Active Flagship Job: ${DEFAULT_WORKSHOP_BLOCK.activeBuilds[0]}
${archivalStr}
=== END LETTA CORE MEMORY ===
`.trim();
    }
}
