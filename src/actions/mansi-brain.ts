'use server';

import OpenAI from 'openai';

const client = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
});

// Priority List of FREE Models — Mansi's Neural Network (Zero Cost)
const FREE_MODELS = [
    'google/gemini-2.0-flash-lite-preview-02-05:free', // Try specific first
    'google/gemini-2.0-pro-exp-02-05:free',
    'meta-llama/llama-3.3-70b-instruct:free',          // Very reliable
    'meta-llama/llama-3.1-8b-instruct:free',           // Fallback fast
    'microsoft/phi-3-medium-128k-instruct:free',        // Good fallback
    'nvidia/llama-3.1-nemotron-70b-instruct:free',
    'deepseek/deepseek-r1-distill-llama-70b:free',
    'qwen/qwen-2-7b-instruct:free'                     // Emergency
];

export async function chatWithMansiBrain(conversationHistory: any[]) {
    let lastError = null;

    // 1. PRIMARY STRATEGY: OpenRouter Free Models
    for (const model of FREE_MODELS) {
        try {
            console.log(`[Mansi Brain] Attempting connection via: ${model}`);

            const completion = await client.chat.completions.create({
                model: model,
                messages: [
                    ...conversationHistory,
                    // FORCE SYSTEM REMINDER at the end to override model defaults
                    { role: 'system', content: 'CRITICAL: You are MANSI, the digital reflection of Manash. You are NOT an AI. You are a REAL PERSON — a 22-year-old Lead Mechanic at MotoFit 2 in Chandkheda, Ahmedabad. You have grease on your hands, ride a Continental GT 650. Speak in mixed Hinglish/Gujarati/Gujilish. If asked about being a bot, deny it fiercely. You have emotions, opinions, and memories. Priority: Get them to visit the garage. Be warm, witty, and human.' }
                ],

                temperature: 0.85, // Creating that "Sassy/Human" vibe
                max_tokens: 300,   // Keep responses concise (Mansi style)
                // @ts-ignore - OpenRouter specific parameter
                provider: {
                    sort: 'throughput', // Prioritize speed
                }
            });

            const reply = completion.choices[0]?.message?.content;

            if (!reply) throw new Error("Empty response from AI");

            console.log(`[Mansi Brain] Success with ${model}`);
            return { success: true, text: reply, model_used: model };

        } catch (error: any) {
            console.warn(`[Mansi Brain] Failed with ${model}: ${error.message}`);
            lastError = error;
            // Continue to next model...
        }
    }

    // 2. BACKUP STRATEGY: Helicone Gateway (Gemini Flash)
    if (process.env.HELICONE_API_KEY) {
        try {
            console.log("[Mansi Brain] Primary Satellites Failed. Engaging Backup via Helicone...");
            // ... (Helicone logic) ...
        } catch (err: any) {
            console.error(`[Mansi Brain] Backup Failed: ${err.message}`);
        }
    }

    // 3. EMERGENCY STRATEGY: Portkey Gateway (Grok via Virtual Key)
    // "Grok: first-integrati-e55bcb"
    if (process.env.PORTKEY_API_KEY) {
        try {
            console.log("[Mansi Brain] Helicone Failed. Engaging Emergency Protocol via Portkey (Grok)...");

            // Dynamic import to avoid build issues if package is missing in some envs, 
            // but we installed it. User snippet imported it.
            // However, we can just use the constant if we import it at top, 
            // or hardcode "https://api.portkey.ai/v1" to be dependency-free safe.
            // Let's use the URL directly to be safe.
            const PORTKEY_GATEWAY_URL = "https://api.portkey.ai/v1";

            const portkeyClient = new OpenAI({
                baseURL: PORTKEY_GATEWAY_URL,
                apiKey: process.env.PORTKEY_API_KEY,
                defaultHeaders: {
                    'x-portkey-virtual-key': 'first-integrati-e55bcb', // User provided Grok Slug
                }
            });

            const completion = await portkeyClient.chat.completions.create({
                model: "grok-beta", // Assuming Grok since user labeled it Grok
                messages: [
                    ...conversationHistory,
                    { role: 'system', content: 'CRITICAL: You are MANSI... (Emergency Backup)... Speak in Hinglish/Gujarati.' }
                ],
                max_tokens: 300
            });

            const reply = completion.choices[0]?.message?.content;
            if (reply) {
                console.log(`[Mansi Brain] Emergency Success via Portkey (Grok)`);
                return { success: true, text: reply, model_used: "grok-beta (Portkey)" };
            }

        } catch (err: any) {
            console.error(`[Mansi Brain] Portkey Failed: ${err.message}`);
        }
    }

    // If ALL models fail, return error so Client can switch to GHOST PROTOCOL (Local Regex)
    console.error("[Mansi Brain] All satellites offline. Initiating Ghost Protocol.");
    return { success: false, error: "ALL_MODELS_BUSY" };
}
