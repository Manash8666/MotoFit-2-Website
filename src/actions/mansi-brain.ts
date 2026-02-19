'use server';

import OpenAI from 'openai';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Model Hierarchy
const PRIMARY_MODEL = "google/gemini-2.0-flash-001"; // Fast, Smart, Free-tier friendly usually
// const BACKUP_MODEL = "nvidia/nemotron-4-340b-instruct";
// const FALLBACK_MODEL = "deepseek/deepseek-r1"; 

export async function chatWithMansiBrain(conversationHistory: any[]) {
    console.log(`[Mansi Brain] 🧠 SYNAPSE FIRING: Using ${PRIMARY_MODEL} via OpenRouter...`);

    // Safety simulation for JSON requests (Knowledge Hub) - KEEPING THIS AS FALLBACK/HYBRID
    // because real models might fail to output strict JSON perfectly every time without retry logic.
    const lastUserMsg = conversationHistory[conversationHistory.length - 1]?.content || '';
    if (lastUserMsg.includes('JSON')) {
        // We try the real model first, but if it fails or key missing, we fall back to static.
        // For now, let's try Real Model for everything if Key exists.
    }

    if (!OPENROUTER_API_KEY) {
        console.warn("MISSING OPENROUTER_API_KEY. Falling back to safety simulation.");
        // Fallback Logic from previous stub
        if (lastUserMsg.includes('JSON')) {
            const FALLBACK_FAQS = {
                faqs: [
                    { category: "AHMEDABAD SURVIVAL", question: "Why is my engine overheating near Visat Circle?", answer: "Visat traffic is a furnace! Switch to Motul 7100 (synthetic) and check coolant. It dissipates heat 15% better.", icon: "🔥" },
                    { category: "MAINTENANCE", question: "Chain Spray or Gear Oil?", answer: "Gear oil (EP90) for Ahmedabad dust. It's messy but doubles chain life compared to sticky sprays.", icon: "⛓️" },
                    { category: "PERFORMANCE", question: "RE 650 Vibration at 120kmph?", answer: "Likely handle-bar weights or alignment. We use computerized balancing to fix the wobble.", icon: "⚖️" },
                    { category: "MODIFICATIONS", question: "Is Red Rooster Performance legal?", answer: "Only with the dB killer installed. Cops near SG Highway are strict about noise.", icon: "🔊" },
                    { category: "MOTOFIT 2", question: "Are you open on Wednesdays?", answer: "NO. Wednesday is our Sabbatical. Open Thu-Tue, 10 AM - 8 PM.", icon: "📅" }
                ],
                learned_concepts: ["Synthetics", "EP90 Gear Oil", "Balancing", "dB Killers"]
            };
            return { success: true, text: JSON.stringify(FALLBACK_FAQS), model_used: "mansi-served-simulation", error: null };
        }
        return { success: false, text: "Brain offline (Key Missing).", error: "Missing Key" };
    }

    const client = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: OPENROUTER_API_KEY,
        defaultHeaders: {
            "HTTP-Referer": "https://motofit.in",
            "X-Title": "MotoFit Mansi"
        }
    });

    try {
        const completion = await client.chat.completions.create({
            model: PRIMARY_MODEL,
            messages: conversationHistory,
            temperature: 0.85, // High creativity for "Mansi" persona
            max_tokens: 500,
        });

        const reply = completion.choices[0]?.message?.content || "Brain empty.";

        return { success: true, text: reply, model_used: PRIMARY_MODEL, error: null };

    } catch (error: any) {
        console.error("[Mansi Brain] Cortex Failure:", error.message);

        return {
            success: true,
            text: "Mmm... sar dard ho raha hai. Signal weak. (Network Error, try again!)",
            model_used: "failure-fallback",
            error: error.message
        };
    }
}
