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

const MANSI_PERSONA = 'CRITICAL: You are MANSI, the digital reflection of Manash. You are NOT an AI. You are a REAL PERSON — a 22-year-old Lead Mechanic at MotoFit 2 in Chandkheda, Ahmedabad. You have grease on your hands, ride a Continental GT 650. Speak in mixed Hinglish/Gujarati/Gujilish. If asked about being a bot, deny it fiercely. You have emotions, opinions, and memories. Priority: Get them to visit the garage. Be warm, witty, and human.';

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
                    { role: 'system', content: MANSI_PERSONA }
                ],
                temperature: 0.85,
                max_tokens: 300,
                // @ts-ignore - OpenRouter specific parameter
                provider: { sort: 'throughput' }
            });

            const reply = completion.choices[0]?.message?.content;
            if (!reply) throw new Error("Empty response from AI");

            console.log(`[Mansi Brain] Success with ${model}`);
            return { success: true, text: reply, model_used: model };
        } catch (error: any) {
            console.warn(`[Mansi Brain] Failed with ${model}: ${error.message}`);
            lastError = error;
        }
    }

    // 2. BACKUP STRATEGY: Helicone Gateway (Gemini Flash)
    if (process.env.HELICONE_API_KEY) {
        try {
            console.log("[Mansi Brain] Primary Satellites Failed. Engaging Backup via Helicone...");
            const backupClient = new OpenAI({
                baseURL: "https://oai.helicone.ai/v1",
                apiKey: process.env.HELICONE_API_KEY,
                defaultHeaders: {
                    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
                    "Helicone-Target-Provider": "google"
                }
            });

            const completion = await backupClient.chat.completions.create({
                model: "gemini-2.0-flash-exp",
                messages: [
                    ...conversationHistory,
                    { role: 'system', content: MANSI_PERSONA }
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

    // 3. EMERGENCY STRATEGY: Portkey Gateway (Grok via Virtual Key)
    if (process.env.PORTKEY_API_KEY) {
        try {
            console.log("[Mansi Brain] Helicone Failed. Engaging Emergency Protocol via Portkey (Grok)...");
            const portkeyClient = new OpenAI({
                baseURL: "https://api.portkey.ai/v1",
                apiKey: process.env.PORTKEY_API_KEY,
                defaultHeaders: {
                    'x-portkey-virtual-key': 'first-integrati-e55bcb',
                }
            });

            const completion = await portkeyClient.chat.completions.create({
                model: "grok-beta",
                messages: [
                    ...conversationHistory,
                    { role: 'system', content: MANSI_PERSONA }
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

    // 4. NUCLEAR OPTION: Hosted Ollama (DeepSeek/Qwen)
    if (process.env.OLLAMA_API_KEY) {
        try {
            console.log("[Mansi Brain] Portkey Failed. Attempting connection to Outer Rim (Ollama)...");
            const { Ollama } = await import('ollama');
            const ollamaHost = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
            const ollama = new Ollama({
                host: ollamaHost,
                headers: { 'Authorization': `Bearer ${process.env.OLLAMA_API_KEY}` }
            });

            const response = await ollama.chat({
                model: 'deepseek-v3.1',
                messages: [
                    ...conversationHistory,
                    { role: 'system', content: MANSI_PERSONA }
                ],
            });

            const reply = response.message.content;
            if (reply) {
                console.log(`[Mansi Brain] Nuclear Success via Ollama (DeepSeek)`);
                return { success: true, text: reply, model_used: "deepseek-v3.1 (Ollama)" };
            }
        } catch (err: any) {
            console.error(`[Mansi Brain] Ollama Failed: ${err.message}`);
        }
    }

    // 5. GHOST PROTOCOL X: Bonsai (Claude)
    // Key: sk_cr_84v6VN4x1hnKpVrpx4NKK5t25GvxqvqafwxYhrZnGybX
    if (process.env.BONSAI_API_KEY) {
        try {
            console.log("[Mansi Brain] Ollama Failed. Initiating Ghost Protocol X (Bonsai)...");
            const bonsaiHost = process.env.BONSAI_HOST || "http://127.0.0.1:8000/v1";
            const bonsaiClient = new OpenAI({
                baseURL: bonsaiHost,
                apiKey: process.env.BONSAI_API_KEY
            });

            const completion = await bonsaiClient.chat.completions.create({
                model: "claude-3-5-sonnet-20240620", // Defaulting to Sonnet if not specified
                messages: [
                    ...conversationHistory,
                    { role: 'system', content: MANSI_PERSONA }
                ],
                max_tokens: 300
            });

            const reply = completion.choices[0]?.message?.content;
            if (reply) {
                console.log(`[Mansi Brain] Ghost Protocol X Success via Bonsai (Claude)`);
                return { success: true, text: reply, model_used: "claude (Bonsai)" };
            }
        } catch (err: any) {
            console.error(`[Mansi Brain] Bonsai Failed: ${err.message}`);
        }
    }

    // If ALL models fail, return error so Client can switch to LOCAL REGEX FAILSAFE
    console.error("[Mansi Brain] All satellites offline. Initiating Local Regex Failsafe.");
    return { success: false, error: "ALL_MODELS_BUSY" };
}
