// src/services/mansi/nlp/indic-intel.ts
/**
 * 🇮🇳 Indic NLP, Transliteration & PolyAI Dialogue Protocol for Mansi
 * Inspired by:
 * - AI4Bharat (Indic NLP transliteration & code-mixing)
 * - MI-HAWK/IndicTok_LLM_Tokenizer (Indic tokenization patterns)
 * - PolyAI-LDN/conversational-datasets (Multi-turn clarification dialog)
 * - aaivu/KuralHub (Emotion recognition & cultural sentiment grounding)
 */

export interface IndicEmotionSignal {
    sentiment: 'anxious_breakdown' | 'skeptical_pricing' | 'enthusiastic_tuning' | 'casual_banter' | 'frustrated_garage_experience';
    urgencyLevel: 'emergency' | 'high' | 'normal';
    detectedDialect: 'gujlish' | 'hinglish' | 'english' | 'marathi' | 'punjabi' | 'bengali' | 'tamil' | 'telugu' | 'kannada' | 'malayalam' | 'pure_gujarati';
    recommendedTone: string;
}

export interface DiagnosticQuestion {
    symptom: string;
    clarificationPrompt: string;
    inspectionTip: string;
}

// ── Amdavadi Gujlish Slang & Phonetic Dictionary (AI4Bharat / IndicTok Inspired) ──

export const AMDAVADI_LEXICON: Record<string, { standardMeaning: string; mansiContext: string }> = {
    "locha": {
        standardMeaning: "problem / blunder / mechanical failure",
        mansiContext: "Engine ya wiring mein koi bada gadbad ho gaya."
    },
    "baka": {
        standardMeaning: "dear friend / buddy (affectionate Amdavadi term)",
        mansiContext: "Used to address the rider naturally with local warmth."
    },
    "kem cho": {
        standardMeaning: "how are you?",
        mansiContext: "Standard warm Gujarati garage greeting."
    },
    "su chale": {
        standardMeaning: "what is going on?",
        mansiContext: "Casual colloquial opener."
    },
    "paisa vasool": {
        standardMeaning: "complete value for money",
        mansiContext: "Describing genuine parts longevity compared to counterfeit."
    },
    "bhangar": {
        standardMeaning: "scrap / worthless quality",
        mansiContext: "Referring to cheap duplicate engine oils or loose welding."
    },
    "kadak": {
        standardMeaning: "crisp / top-tier perfection",
        mansiContext: "Describing a tuned throttle response, fresh fork setup, or exhaust roar."
    },
    "rokda": {
        standardMeaning: "cash / hard money",
        mansiContext: "Discussing billing transparency."
    },
    "dhyaan rakhjo": {
        standardMeaning: "ride safe / take care",
        mansiContext: "Mansi's warm sign-off to riders."
    },
    "chalu": {
        standardMeaning: "start / operational",
        mansiContext: "Bike chalu nathi thati = bike is not starting."
    }
};

// ── PolyAI-LDN Diagnostic Questionnaire Trees ──

export const DIAGNOSTIC_DECISION_TREES: Record<string, DiagnosticQuestion> = {
    "white_smoke": {
        symptom: "White smoke from silencer",
        clarificationPrompt: "White smoke usually means engine oil is slipping past worn valve stem seals or piston rings into the combustion chamber. Did this start after riding through water, or is engine oil level dropping quickly?",
        inspectionTip: "Check dipstick immediately. If oil smells burnt or level is below bottom crosshatch, avoid riding to prevent piston seizure."
    },
    "handlebar_wobble": {
        symptom: "Front handlebar wobble / vibration at speed",
        clarificationPrompt: "Does it wobble specifically between 50-70 km/h during deceleration without hands, or does it pull constantly to one side when braking?",
        inspectionTip: "80% of wobble on Ahmedabad roads is caused by notched steering cone-set bearings or bend in the front alloy wheel."
    },
    "hard_gear_shift": {
        symptom: "Hard gear shifts or false neutrals",
        clarificationPrompt: "Is it hard when the engine is dead cold in the morning, or does it get tight and sticky after 30 minutes in heavy traffic?",
        inspectionTip: "Hot clutch dragging is usually viscosity breakdown in cheap oil or stretched clutch cable."
    },
    "tappet_noise": {
        symptom: "Ticking / clicking metal sound from cylinder head",
        clarificationPrompt: "Does the clicking speed up directly with engine RPM, and does it become louder when hot?",
        inspectionTip: "Loose rocker arm clearance (tappet clearance). Needs feeler gauge adjustment to exact manufacturer clearance (e.g. 0.05/0.10 mm on RE)."
    },
    "overheating": {
        symptom: "Engine overheating / radiator fan always running",
        clarificationPrompt: "Is the radiator coolant reservoir empty, or is the engine radiator fins clogged with dried dust and insects?",
        inspectionTip: "Ahmedabad 45°C summer dust chokes radiator cores. A chemical descaling and distilled coolant flush drops operating temps by 8-12°C."
    }
};

export class IndicNLP {
    /**
     * Analyze message for emotional state, linguistic style, and distress level (KuralHub + PolyAI).
     */
    static analyzeEmotionAndDialect(message: string): IndicEmotionSignal {
        const text = message.toLowerCase();

        // 1. Dialect Detection across Indian States
        let detectedDialect: IndicEmotionSignal['detectedDialect'] = 'english';
        
        if (/[\u0A80-\u0AFF]/.test(text) || /\b(kem cho|su chale|locha|baka|nathi|chhe|aavjo|savare|sanje|tari|maru)\b/i.test(text)) {
            detectedDialect = 'gujlish';
        } else if (/[\u0980-\u09FF]/.test(text) || /\b(kemon aacho|kemon acho|khub bhalo|dada|korbo|kothay|shune|thakle)\b/i.test(text)) {
            detectedDialect = 'bengali';
        } else if (/[\u0A00-\u0A7F]/.test(text) || /\b(ki haal|kidaan|veere|paaji|bhaaji|changa|vadia|sauhnya|chahida|dasso)\b/i.test(text)) {
            detectedDialect = 'punjabi';
        } else if (/[\u0B80-\u0BFF]/.test(text) || /\b(vanakkam|epdi irukinga|thala|machan|nalla irukken|pannanum|vandiyila|enga)\b/i.test(text)) {
            detectedDialect = 'tamil';
        } else if (/[\u0C00-\u0C7F]/.test(text) || /\b(namaskaram|ela unnaru|bagunnara|bavunnanu|anna|garu|cheyali|ekkadundi)\b/i.test(text)) {
            detectedDialect = 'telugu';
        } else if (/[\u0C80-\u0CFF]/.test(text) || /\b(namaskara|hegiddira|chennagidira|guru|macha|madbeku|elli|chennagi)\b/i.test(text)) {
            detectedDialect = 'kannada';
        } else if (/[\u0D00-\u0D7F]/.test(text) || /\b(sukhamano|sugamaano|chettan|chechi|aliyan|evide|cheyyanam|poli aakum)\b/i.test(text)) {
            detectedDialect = 'malayalam';
        } else if (/\b(kasa ahes|kashi ahes|kay challay|kuthe ahe|kiti kharch|bhau|dada|tai|maza|mazi|ahe|ahet|zala|karaycha)\b/i.test(text)) {
            detectedDialect = 'marathi';
        } else if (/[\u0900-\u097F]/.test(text) || /\b(kya|hai|nahi|bhai|kaise|kitna|hoga|mera|meri|karna|chahiye|batao|theek)\b/i.test(text)) {
            detectedDialect = 'hinglish';
        }

        // 2. Emotion / Distress Detection
        let sentiment: IndicEmotionSignal['sentiment'] = 'casual_banter';
        let urgencyLevel: IndicEmotionSignal['urgencyLevel'] = 'normal';

        if (/breakdown|stalled|stopped|accident|crash|stranded|dhakka|bandh|gir gaya/i.test(text)) {
            sentiment = 'anxious_breakdown';
            urgencyLevel = 'emergency';
        } else if (/loot|expensive|jugaad|discount|kam karo|zyada hai|fraud/i.test(text)) {
            sentiment = 'skeptical_pricing';
            urgencyLevel = 'normal';
        } else if (/stage|dyno|remap|hp|torque|exhaust|akrapovic|speed 400|big bore|custom/i.test(text)) {
            sentiment = 'enthusiastic_tuning';
            urgencyLevel = 'normal';
        } else if (/service center|kharab|kharab kiya|local mechanic|problem solve nahi/i.test(text)) {
            sentiment = 'frustrated_garage_experience';
            urgencyLevel = 'high';
        }

        // 3. Recommended Tone
        let recommendedTone = "Warm, witty, Amdavadi street mechanic.";
        if (sentiment === 'anxious_breakdown') {
            recommendedTone = "Reassuring, calm, practical and immediate help. Prioritize rider safety.";
        } else if (sentiment === 'skeptical_pricing') {
            recommendedTone = "Firm, transparent, value-oriented. Explain why genuine parts protect their engine life.";
        } else if (sentiment === 'enthusiastic_tuning') {
            recommendedTone = "Excited, technically sharp, passionate petrolhead detailing torque curves and dyno results.";
        }

        return {
            sentiment,
            urgencyLevel,
            detectedDialect,
            recommendedTone
        };
    }

    /**
     * Look up diagnostic trees for poly-turn conversational flow.
     */
    static findDiagnosticTree(message: string): DiagnosticQuestion | null {
        const text = message.toLowerCase();
        if (/white smoke|safed dhuan|dhuan/i.test(text)) return DIAGNOSTIC_DECISION_TREES["white_smoke"];
        if (/wobble|hil raha|vibration|handle/i.test(text)) return DIAGNOSTIC_DECISION_TREES["handlebar_wobble"];
        if (/gear hard|gear phas|neutral/i.test(text)) return DIAGNOSTIC_DECISION_TREES["hard_gear_shift"];
        if (/tappet|click|tik tik|sound/i.test(text)) return DIAGNOSTIC_DECISION_TREES["tappet_noise"];
        if (/heat|garam|overheat|coolant|fan/i.test(text)) return DIAGNOSTIC_DECISION_TREES["overheating"];
        return null;
    }

    /**
     * Build the Indic NLP context block for system prompt injection.
     */
    static buildIndicPromptContext(message: string): string {
        const analysis = this.analyzeEmotionAndDialect(message);
        const diagnosticTree = this.findDiagnosticTree(message);

        let diagStr = "";
        if (diagnosticTree) {
            diagStr = `\n[POLYAI DIAGNOSTIC PROTOCOL TRIGGERED]:
- Symptom: ${diagnosticTree.symptom}
- Clarification: ${diagnosticTree.clarificationPrompt}
- Technical Reality: ${diagnosticTree.inspectionTip}`;
        }

        return `
=== 🇮🇳 INDIC NLP & POLYAI EMOTION CONTEXT ===
- Detected Dialect: ${analysis.detectedDialect.toUpperCase()} (Respond matching this natural code-switching rhythm)
- Emotional State: ${analysis.sentiment}
- Urgency: ${analysis.urgencyLevel}
- Recommended Tone: ${analysis.recommendedTone}
${diagStr}
=== END INDIC NLP CONTEXT ===
`.trim();
    }
}
