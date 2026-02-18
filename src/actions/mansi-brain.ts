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
            const heliconeClient = new OpenAI({
                baseURL: "https://ai-gateway.helicone.ai/v1/gateway/gemini", // Specific for Gemini via Helicone
                apiKey: process.env.HELICONE_API_KEY,
                defaultHeaders: {
                    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`
                }
            });

            // Note: Helicone/Gemini might need slightly different config, but standard OpenAI SDK usually works if base URL is right
            // For safety, let's use the standard OpenAI/Helicone gateway endpoint if specific one fails, 
            // but user allocated this key for Helicone so we use standard Helicone Gateway URL.
            const backupClient = new OpenAI({
                baseURL: "https://oai.helicone.ai/v1", // Standard Helicone OpenAI Proxy
                apiKey: process.env.HELICONE_API_KEY,
                defaultHeaders: {
                    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
                    "Helicone-Target-Provider": "google" // Target Google Gemini
                }
            });

            const completion = await backupClient.chat.completions.create({
                model: "gemini-2.0-flash-exp",
                messages: [
                    ...conversationHistory,
                    { role: 'system', content: 'CRITICAL: You are MANSI... (Resetting Persona for Backup Brain)... You reflect Manash. Speak in Hinglish/Gujarati. Be sassy.' }
                ],
                max_tokens: 300
            });

            const reply = completion.choices[0]?.message?.content;
            if (reply) {
                console.log(`[Mansi Brain] Backup Successful via Helicone (Gemini Flash)`);
                return { success: true, text: reply, model_used: "gemini-2.0-flash-exp (Helicone)" };
            }

        } catch (err: any) {
            console.error(`[Mansi Brain] Backup Failed: ${err.message}`);
        }
    }

    // If ALL models fail, return error so Client can switch to GHOST PROTOCOL (Local Regex)
    console.error("[Mansi Brain] All satellites offline. Initiating Ghost Protocol.");
    return { success: false, error: "ALL_MODELS_BUSY" };
}
