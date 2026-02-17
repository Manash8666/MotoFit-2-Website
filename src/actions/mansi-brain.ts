'use server';

import OpenAI from 'openai';

const client = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
});

// Priority List of FREE Models — Mansi's Neural Network (Zero Cost)
const FREE_MODELS = [
    'google/gemini-2.0-flash-lite-preview-02-05:free', // Fastest Gemini 2.0
    'google/gemini-2.0-pro-exp-02-05:free',            // High Intelligence Gemini 2.0 Pro
    'nvidia/nemotron-3-nano-30b-a3b:free',             // Reasoning Model (Nemotron)
    'deepseek/deepseek-r1-distill-llama-70b:free',     // Reasoning Model (DeepSeek R1)
    'meta-llama/llama-3.3-70b-instruct:free',          // Llama 3.3 70B
    'nvidia/llama-3.1-nemotron-70b-instruct:free',     // Nemotron 70B
    'microsoft/phi-3-medium-128k-instruct:free'        // Ultimate Fallback
];

export async function chatWithMansiBrain(conversationHistory: any[]) {
    let lastError = null;

    // MODEL ROTATION LOGIC: Try models in order until one works
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

    // If ALL models fail, return error so Client can switch to GHOST PROTOCOL (Local Regex)
    console.error("[Mansi Brain] All satellites offline. Initiating Ghost Protocol.");
    return { success: false, error: "ALL_MODELS_BUSY" };
}
