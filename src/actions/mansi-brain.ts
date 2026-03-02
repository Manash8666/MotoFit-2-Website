'use server';

import OpenAI from 'openai';
import { logMansiExperience } from './mansi-learning';
import { getSeasonalIntel } from './mansi-seasonal-intel';

// --- ENVIRONMENT CONFIG ---
const KEYS = {
    OPENROUTER: process.env.OPENROUTER_API_KEY,
    SARVAM: process.env.SARVAM_API_KEY,
    HELICONE: process.env.HELICONE_API_KEY,
    PORTKEY: process.env.PORTKEY_API_KEY,
    OLLAMA: process.env.OLLAMA_API_KEY,
    OLLAMA_HOST: process.env.OLLAMA_HOST,
    BONSAI: process.env.BONSAI_API_KEY,
    BONSAI_HOST: process.env.BONSAI_HOST
};

const MODELS = {
    PRIMARY: "google/gemini-2.0-flash-001",
    SARVAM: "sarvam-m",
    HELICONE: "google/gemini-2.0-flash-001",
    PORTKEY: "grok-beta",
    OLLAMA: "deepseek-r1:8b"
};

export async function chatWithMansiBrain(conversationHistory: any[]) {
    let lastError = null;
    const lastUserMessage = conversationHistory.filter(m => m.role === 'user').pop()?.content || "";

    // ── INJECT SEASONAL INTELLIGENCE ──
    // Find the primary system prompt and append the dynamic season context
    const systemMessageIndex = conversationHistory.findIndex(m => m.role === 'system');
    if (systemMessageIndex !== -1) {
        const intel = getSeasonalIntel();
        if (intel) {
            conversationHistory[systemMessageIndex].content += `\n\n${intel}`;
        }
    }

    // 1. PRIMARY LAYER: OPENROUTER
    if (KEYS.OPENROUTER) {
        console.log(`[Mansi Brain] 🧠 TARGET 1: OpenRouter (${MODELS.PRIMARY})...`);
        try {
            const client = new OpenAI({
                baseURL: "https://openrouter.ai/api/v1",
                apiKey: KEYS.OPENROUTER,
                defaultHeaders: { "HTTP-Referer": "https://motofit.in", "X-Title": "MotoFit Mansi" }
            });
            const completion = await client.chat.completions.create({
                model: MODELS.PRIMARY,
                messages: conversationHistory,
                temperature: 0.88,
                max_tokens: 600,
            });
            const reply = completion.choices[0]?.message?.content;
            if (reply) {
                console.log("[Mansi Brain] ✅ LAYER 1 SUCCESS");
                logMansiExperience(lastUserMessage, reply, `OR/${MODELS.PRIMARY}`);
                return { success: true, text: reply, model_used: `OR/${MODELS.PRIMARY}`, error: null };
            }
        } catch (e: any) {
            console.warn(`[Mansi Brain] Layer 1 Failed: ${e.message}`);
            lastError = e.message;
        }
    }

    // 2. RESILIENCE LAYER: SARVAM AI (Indian Context)
    // Sarvam is great for Gujlish/Hindi. 
    if (KEYS.SARVAM) {
        console.log(`[Mansi Brain] 🇮🇳 TARGET 2: Sarvam AI (Neural Core)...`);
        try {
            const client = new OpenAI({ baseURL: "https://api.sarvam.ai/v1", apiKey: KEYS.SARVAM });
            const completion = await client.chat.completions.create({
                model: "sarvam-m", // 24B Indic model is most stable for chat
                messages: conversationHistory,
                temperature: 0.7,
                max_tokens: 500,
            });
            const reply = completion.choices[0]?.message?.content;
            if (reply) {
                console.log("[Mansi Brain] ✅ LAYER 2 SUCCESS");
                logMansiExperience(lastUserMessage, reply, "SARVAM-M");
                return { success: true, text: reply, model_used: "SARVAM-M", error: null };
            }
        } catch (e: any) {
            console.warn(`[Mansi Brain] Layer 2 Failed: ${e.message}`);
        }
    }

    // 3. GATEWAY LAYER A: HELICONE
    if (KEYS.HELICONE) {
        console.log(`[Mansi Brain] 🛡️ TARGET 3: Helicone Gateway...`);
        try {
            const client = new OpenAI({
                baseURL: "https://oai.helicone.ai/v1",
                apiKey: KEYS.OPENROUTER || "placeholder", // Helicone auth is via header usually, but needs provider key too
                defaultHeaders: { "Helicone-Auth": `Bearer ${KEYS.HELICONE}` }
            });
            const completion = await client.chat.completions.create({
                model: MODELS.HELICONE,
                messages: conversationHistory
            });
            const reply = completion.choices[0]?.message?.content;
            if (reply) {
                console.log("[Mansi Brain] ✅ LAYER 3 SUCCESS");
                logMansiExperience(lastUserMessage, reply, "HELICONE");
                return { success: true, text: reply, model_used: "HELICONE", error: null };
            }
        } catch (e: any) {
            console.warn(`[Mansi Brain] Layer 3 Failed: ${e.message}`);
        }
    }

    // 4. GATEWAY LAYER B: PORTKEY (Emergency Grok)
    if (KEYS.PORTKEY) {
        console.log(`[Mansi Brain] 🔑 TARGET 4: Portkey Gateway...`);
        try {
            const client = new OpenAI({
                baseURL: "https://api.portkey.ai/v1",
                apiKey: KEYS.PORTKEY,
                defaultHeaders: { "x-portkey-provider": "openai" } // Defaulting to generic proxy
            });
            const completion = await client.chat.completions.create({
                model: "gpt-4o-mini", // Fallback standard
                messages: conversationHistory
            });
            const reply = completion.choices[0]?.message?.content;
            if (reply) {
                console.log("[Mansi Brain] ✅ LAYER 4 SUCCESS");
                logMansiExperience(lastUserMessage, reply, "PORTKEY");
                return { success: true, text: reply, model_used: "PORTKEY", error: null };
            }
        } catch (e: any) {
            console.warn(`[Mansi Brain] Layer 4 Failed: ${e.message}`);
        }
    }

    // 5. NUCLEAR OPTION: HOSTED OLLAMA
    if (KEYS.OLLAMA_HOST) {
        console.log(`[Mansi Brain] ☢️ TARGET 5: Nuclear Option (Ollama Host)...`);
        try {
            const host = KEYS.OLLAMA_HOST.endsWith('/') ? KEYS.OLLAMA_HOST : `${KEYS.OLLAMA_HOST}/`;
            const client = new OpenAI({
                baseURL: `${host}v1`,
                apiKey: KEYS.OLLAMA || "ollama"
            });
            const completion = await client.chat.completions.create({
                model: MODELS.OLLAMA,
                messages: conversationHistory
            });
            const reply = completion.choices[0]?.message?.content;
            if (reply) {
                console.log("[Mansi Brain] ✅ LAYER 5 SUCCESS");
                logMansiExperience(lastUserMessage, reply, "OLLAMA/NUCLEAR");
                return { success: true, text: reply, model_used: "OLLAMA/NUCLEAR", error: null };
            }
        } catch (e: any) {
            console.warn(`[Mansi Brain] Layer 5 Failed: ${e.message}`);
        }
    }

    // 6. GHOST PROTOCOL X: BONSAI
    if (KEYS.BONSAI && KEYS.BONSAI_HOST) {
        console.log(`[Mansi Brain] 👻 TARGET 6: Bonsai Failsafe...`);
        try {
            // Assuming OpenAI Compatible
            const client = new OpenAI({ baseURL: `${KEYS.BONSAI_HOST}/v1`, apiKey: KEYS.BONSAI });
            const completion = await client.chat.completions.create({
                model: "gpt-3.5-turbo", // Standard fallback
                messages: conversationHistory
            });
            const reply = completion.choices[0]?.message?.content;
            if (reply) {
                console.log("[Mansi Brain] ✅ LAYER 6 SUCCESS");
                logMansiExperience(lastUserMessage, reply, "BONSAI");
                return { success: true, text: reply, model_used: "BONSAI", error: null };
            }
        } catch (e: any) {
            console.warn(`[Mansi Brain] Layer 6 Failed: ${e.message}`);
        }
    }

    // 7. FINAL FALLBACK: SIMULATION
    console.warn("[Mansi Brain] SYSTEM CRITICAL: All 6 Neural Layers Failed. Activating Static Fallback.");

    // JSON Request Fallback (Knowledge Hub)
    const lastUserMsg = conversationHistory[conversationHistory.length - 1]?.content || '';
    if (lastUserMsg.includes('JSON')) {
        const FALLBACK_FAQS = {
            faqs: [
                { category: "SURVIVAL", question: "Engine heating in Ahmedabad traffic?", answer: "Visat traffic is brutal. Use Motul 7100 10W50. It handles the 45°C heat better than stock oil.", icon: "🔥" },
                { category: "MODS", question: "Is exhaust modification legal?", answer: "Strictly specific zones only. SG Highway police will fine you. Keep the dB killer IN.", icon: "👮" },
                { category: "MAINTENANCE", question: "Best chain lube for dust?", answer: "EP90 Gear Oil. Messy but survives the dust. sprays dry out too fast.", icon: "⛓️" }
            ],
            learned_concepts: ["Synthetics", "EP90", "dB Killer"]
        };
        return { success: true, text: JSON.stringify(FALLBACK_FAQS), model_used: "simulation-json", error: null };
    }

    return {
        success: false,
        text: null,
        error: lastError || "All Brains Offline"
    };
}
