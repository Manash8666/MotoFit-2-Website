'use server';

import OpenAI from 'openai';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SARVAM_API_KEY = process.env.SARVAM_API_KEY || "sk_gs85i0tn_ujGe15KXSh1CdlDRyVfn7VcG"; // Fallback to provided key if env missing

// Model Hierarchy
const PRIMARY_MODEL = "google/gemini-2.0-flash-001";
const BACKUP_MODEL = "mimic-3"; // Placeholder for Sarvam if needed, but we use strict model Check

export async function chatWithMansiBrain(conversationHistory: any[]) {

    // 1. PRIMARY LAYER: OPENROUTER
    if (OPENROUTER_API_KEY) {
        console.log(`[Mansi Brain] 🧠 TARGET: OpenRouter (${PRIMARY_MODEL})...`);
        try {
            const client = new OpenAI({
                baseURL: "https://openrouter.ai/api/v1",
                apiKey: OPENROUTER_API_KEY,
                defaultHeaders: { "HTTP-Referer": "https://motofit.in", "X-Title": "MotoFit Mansi" }
            });

            const completion = await client.chat.completions.create({
                model: PRIMARY_MODEL,
                messages: conversationHistory,
                temperature: 0.88,
                max_tokens: 600,
            });

            const reply = completion.choices[0]?.message?.content;
            if (reply) return { success: true, text: reply, model_used: PRIMARY_MODEL, error: null };

        } catch (error: any) {
            console.warn("[Mansi Brain] OpenRouter Failed. Switching to Neural Backup...", error.message);
        }
    }

    // 2. RESILIENCE LAYER: SARVAM AI (Indian Context Specialist)
    if (SARVAM_API_KEY) {
        console.log(`[Mansi Brain] 🇮🇳 TARGET: Sarvam AI (Indian Neural Core)...`);
        try {
            const sarvamClient = new OpenAI({
                baseURL: "https://api.sarvam.ai/v1",
                apiKey: SARVAM_API_KEY,
            });

            // Clean history for Sarvam (it might stricter or have smaller context)
            // ensuring system prompt is passed correctly.
            const completion = await sarvamClient.chat.completions.create({
                model: "sarvam-2g", // specialized for Hindi/Eng/Gujlish
                messages: conversationHistory,
                temperature: 0.7, // Sarvam is creative enough
                max_tokens: 500,
            });

            const reply = completion.choices[0]?.message?.content;
            if (reply) return { success: true, text: reply, model_used: "sarvam-2g", error: null };

        } catch (error: any) {
            console.warn("[Mansi Brain] Sarvam AI Failed.", error.message);
        }
    }

    // 3. FALLBACK LAYER: SIMULATION / SAFETY NET
    console.warn("[Mansi Brain] All Neural Links Severed. Activating Ghost Protocol.");

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

    // Chat Fallback
    return {
        success: false, // Triggers Widget's local regex fallback
        text: null,
        error: "All Brains Offline"
    };
}
