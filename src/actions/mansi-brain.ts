'use server';

import OpenAI from 'openai';

const client = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
});

// Priority List of FREE Models to minimize costs to Zero.
const FREE_MODELS = [
    'openai/gpt-oss-120b:free',           // Massive 120B parameter model (Primary)
    'openai/gpt-oss-20b:free',            // Fast 20B model (Secondary)
    'stepfun/step-3.5-flash:free',       // Fast, supports reasoning
    'arcee-ai/trinity-large-preview:free', // High quality fallback
    'meta-llama/llama-3-8b-instruct:free', // Standard fallback
    'microsoft/phi-3-medium-128k-instruct:free' // Deep fallback
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
                    { role: 'system', content: 'CRITICAL INSTRUCTION: Reply in casual Hinglish + Gujarati Slang (e.g., "Baka", "Scene", "Jugaad"). Do NOT use formal English. Keep it sassy.' }
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
