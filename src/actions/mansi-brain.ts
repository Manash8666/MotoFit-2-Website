'use server';

import OpenAI from 'openai';
import { logMansiExperience } from './mansi-learning';
import { getSeasonalIntel } from './mansi-seasonal-intel';

// --- ENVIRONMENT CONFIG ---
const KEYS = {
    OPENAI: process.env.OPENAI_API_KEY,
    OPENROUTER: process.env.OPENROUTER_API_KEY,
    DEEPSEEK: process.env.DEEPSEEK_API_KEY,
    QWEN: process.env.DASHSCOPE_API_KEY || process.env.QWEN_API_KEY,
    SARVAM: process.env.SARVAM_API_KEY,
    HELICONE: process.env.HELICONE_API_KEY,
    PORTKEY: process.env.PORTKEY_API_KEY,
    OLLAMA: process.env.OLLAMA_API_KEY,
    OLLAMA_HOST: process.env.OLLAMA_HOST,
    BONSAI: process.env.BONSAI_API_KEY,
    BONSAI_HOST: process.env.BONSAI_HOST
};

const MODELS = {
    // 🌟 Top Priority AI Models (Qwen & DeepSeek)
    QWEN_72B: "qwen/qwen-2.5-72b-instruct",
    DEEPSEEK_V3: "deepseek/deepseek-chat",
    DEEPSEEK_R1: "deepseek/deepseek-r1",
    QWEN_CODER: "qwen/qwen-2.5-coder-32b-instruct",
    QWEN_7B: "qwen/qwen-2.5-7b-instruct",
    DEEPSEEK_V3_EXP: "deepseek/deepseek-v3.2",
    OPENROUTER_FREE: "openrouter/free",

    // 🛡️ Secondary Server Fallback Models (Only if Qwen and DeepSeek have server issues)
    GEMINI_FALLBACK: "google/gemini-2.0-flash-001",
    OPENAI_FALLBACK: "openai/gpt-4o-mini",
    NATIVE_OPENAI: "gpt-4o-mini",
    SARVAM: "sarvam-m",
    HELICONE: "google/gemini-2.0-flash-001",
    PORTKEY: "gpt-4o-mini",
    OLLAMA_QWEN: "qwen2.5:7b",
    OLLAMA_DEEPSEEK: "deepseek-r1:8b"
};

import { WazuhSecurityEngine } from '@/services/mansi/security/wazuh-siem';

export async function chatWithMansiBrain(conversationHistory: any[], contextType: 'chat' | 'learning' = 'chat') {
    let lastError: string | null = null;
    const lastUserMessage = conversationHistory.filter(m => m.role === 'user').pop()?.content || "";

    // ── 🛡️ WAZUH SIEM: INBOUND PROMPT INJECTION & ATTACK INSPECTION ──
    if (contextType === 'chat' && lastUserMessage) {
        const securityCheck = WazuhSecurityEngine.inspectInboundPayload(lastUserMessage);
        if (!securityCheck.isSafe && securityCheck.threatScore >= 9) {
            console.warn(`[Wazuh SIEM] 🚨 Blocked adversarial payload: ${securityCheck.detectedThreats.join(', ')}`);
            return {
                success: true,
                text: "Bas dost! Mane moto mechanical work ane bikes badhu puche toh mast samjhavi dav, pan aava system tricks MotoFit par nai chale! Bike ni koi taklif hoy toh bolo, Chandkheda workshop par master technicians che! 🏍️🔧",
                model_used: "WAZUH_SIEM_GUARDRAIL",
                error: null
            };
        }
    }

    // ── INJECT SEASONAL INTELLIGENCE ──
    const systemMessageIndex = conversationHistory.findIndex(m => m.role === 'system');
    if (systemMessageIndex !== -1) {
        const intel = getSeasonalIntel();
        if (intel) {
            conversationHistory[systemMessageIndex].content += `\n\n${intel}`;
        }
    }

    // ── 0. DIRECT DEEPSEEK NATIVE API (if DEEPSEEK_API_KEY is configured) ──
    if (KEYS.DEEPSEEK) {
        console.log(`[Mansi Brain] 🧠 TARGET 0A: Direct DeepSeek API (deepseek-chat)...`);
        try {
            const client = new OpenAI({
                baseURL: "https://api.deepseek.com",
                apiKey: KEYS.DEEPSEEK
            });
            const completion = await client.chat.completions.create({
                model: "deepseek-chat",
                messages: conversationHistory,
                temperature: 0.88,
                max_tokens: 650,
            });
            let reply = completion.choices[0]?.message?.content;
            if (reply) {
                reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
                console.log("[Mansi Brain] ✅ TARGET 0A (DeepSeek Native) SUCCESS");
                logMansiExperience(lastUserMessage, reply, "DEEPSEEK/deepseek-chat");
                return { success: true, text: reply, model_used: "DEEPSEEK/deepseek-chat", error: null };
            }
        } catch (e: any) {
            console.warn(`[Mansi Brain] Direct DeepSeek API failed: ${e.message}`);
            lastError = e.message;
        }
    }

    // ── 0B. DIRECT QWEN DASHSCOPE API (if DASHSCOPE_API_KEY / QWEN_API_KEY is configured) ──
    if (KEYS.QWEN) {
        console.log(`[Mansi Brain] 🧠 TARGET 0B: Direct Qwen API (qwen-plus)...`);
        try {
            const client = new OpenAI({
                baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
                apiKey: KEYS.QWEN
            });
            const completion = await client.chat.completions.create({
                model: "qwen-plus",
                messages: conversationHistory,
                temperature: 0.88,
                max_tokens: 650,
            });
            let reply = completion.choices[0]?.message?.content;
            if (reply) {
                reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
                console.log("[Mansi Brain] ✅ TARGET 0B (Qwen Native) SUCCESS");
                logMansiExperience(lastUserMessage, reply, "QWEN/qwen-plus");
                return { success: true, text: reply, model_used: "QWEN/qwen-plus", error: null };
            }
        } catch (e: any) {
            console.warn(`[Mansi Brain] Direct Qwen API failed: ${e.message}`);
            lastError = e.message;
        }
    }

    // ── 1. PRIMARY AI LAYER: OPENROUTER (QWEN & DEEPSEEK PRIORITIZED) ──
    if (KEYS.OPENROUTER) {
        console.log(`[Mansi Brain] 🧠 TARGET 1: OpenRouter Chain (Prioritizing Qwen & DeepSeek)...`);
        // Prioritize Qwen and DeepSeek models first, then secondary fallback models only on failure
        const openRouterModels = [
            MODELS.QWEN_72B,        // #1 Qwen 2.5 72B Instruct (Top Indic & Motorcycle Engine Mastery)
            MODELS.DEEPSEEK_V3,     // #2 DeepSeek-V3 Chat (Top Conversational Reasoning)
            MODELS.DEEPSEEK_R1,     // #3 DeepSeek-R1 (Diagnostic Reasoning Chain)
            MODELS.QWEN_CODER,      // #4 Qwen 2.5 32B Instruct
            MODELS.QWEN_7B,         // #5 Qwen 2.5 7B Instruct
            MODELS.DEEPSEEK_V3_EXP, // #6 DeepSeek V3.2 Exp
            MODELS.OPENROUTER_FREE, // #7 OpenRouter Free Tier Router
            MODELS.GEMINI_FALLBACK, // #8 Gemini (Server issue fallback)
            MODELS.OPENAI_FALLBACK  // #9 OpenAI gpt-4o-mini (Server issue fallback)
        ];

        const client = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: KEYS.OPENROUTER,
            defaultHeaders: {
                "HTTP-Referer": "https://motofit2.in",
                "X-Title": "MotoFit 2 Mansi"
            }
        });

        for (const targetModel of openRouterModels) {
            try {
                const completion = await client.chat.completions.create({
                    model: targetModel,
                    messages: conversationHistory,
                    temperature: 0.88,
                    max_tokens: 650,
                });
                let reply = completion.choices[0]?.message?.content;
                if (reply) {
                    reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
                    console.log(`[Mansi Brain] ✅ TARGET 1 SUCCESS via ${targetModel}`);
                    logMansiExperience(lastUserMessage, reply, `OR/${targetModel}`);
                    return { success: true, text: reply, model_used: `OR/${targetModel}`, error: null };
                }
            } catch (e: any) {
                console.warn(`[Mansi Brain] Model ${targetModel} server issue: ${e.message}`);
                lastError = e.message;
            }
        }
    }

    // ── 2. SECONDARY AI LAYER: NATIVE OPENAI (SERVER ISSUE FALLBACK ONLY) ──
    // Only used if Qwen and DeepSeek models on OpenRouter experienced server issues
    if (KEYS.OPENAI) {
        console.log(`[Mansi Brain] 🛡️ TARGET 2: Native OpenAI Fallback (${MODELS.NATIVE_OPENAI})...`);
        try {
            const client = new OpenAI({ apiKey: KEYS.OPENAI });
            const completion = await client.chat.completions.create({
                model: MODELS.NATIVE_OPENAI,
                messages: conversationHistory,
                temperature: 0.88,
                max_tokens: 600,
            });
            let reply = completion.choices[0]?.message?.content;
            if (reply) {
                reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
                console.log("[Mansi Brain] ✅ TARGET 2 SUCCESS via Native OpenAI");
                logMansiExperience(lastUserMessage, reply, `OPENAI/${MODELS.NATIVE_OPENAI}`);
                return { success: true, text: reply, model_used: `OPENAI/${MODELS.NATIVE_OPENAI}`, error: null };
            }
        } catch (e: any) {
            console.warn(`[Mansi Brain] Native OpenAI Fallback Failed: ${e.message}`);
            lastError = e.message;
        }
    }

    // ── 3. RESILIENCE LAYER: SARVAM AI (INDIC CONTEXT) ──
    if (KEYS.SARVAM) {
        console.log(`[Mansi Brain] 🇮🇳 TARGET 3: Sarvam AI (Neural Core)...`);
        try {
            const client = new OpenAI({ baseURL: "https://api.sarvam.ai/v1", apiKey: KEYS.SARVAM });
            const completion = await client.chat.completions.create({
                model: MODELS.SARVAM,
                messages: conversationHistory,
                temperature: 0.7,
                max_tokens: 500,
            });
            const reply = completion.choices[0]?.message?.content;
            if (reply) {
                console.log("[Mansi Brain] ✅ TARGET 3 SUCCESS via Sarvam");
                logMansiExperience(lastUserMessage, reply, "SARVAM-M");
                return { success: true, text: reply, model_used: "SARVAM-M", error: null };
            }
        } catch (e: any) {
            console.warn(`[Mansi Brain] Sarvam AI Failed: ${e.message}`);
            lastError = e.message;
        }
    }

    // ── 4. GATEWAY LAYER A: HELICONE ──
    if (KEYS.HELICONE) {
        console.log(`[Mansi Brain] 🛡️ TARGET 4: Helicone Gateway...`);
        try {
            const client = new OpenAI({
                baseURL: "https://oai.helicone.ai/v1",
                apiKey: KEYS.OPENROUTER || KEYS.OPENAI || "placeholder",
                defaultHeaders: { "Helicone-Auth": `Bearer ${KEYS.HELICONE}` }
            });
            const completion = await client.chat.completions.create({
                model: MODELS.HELICONE,
                messages: conversationHistory
            });
            const reply = completion.choices[0]?.message?.content;
            if (reply) {
                console.log("[Mansi Brain] ✅ TARGET 4 SUCCESS via Helicone");
                logMansiExperience(lastUserMessage, reply, "HELICONE");
                return { success: true, text: reply, model_used: "HELICONE", error: null };
            }
        } catch (e: any) {
            console.warn(`[Mansi Brain] Helicone Gateway Failed: ${e.message}`);
            lastError = e.message;
        }
    }

    // ── 5. GATEWAY LAYER B: PORTKEY ──
    if (KEYS.PORTKEY) {
        console.log(`[Mansi Brain] 🔑 TARGET 5: Portkey Gateway...`);
        try {
            const client = new OpenAI({
                baseURL: "https://api.portkey.ai/v1",
                apiKey: KEYS.PORTKEY,
                defaultHeaders: { "x-portkey-provider": "openai" }
            });
            const completion = await client.chat.completions.create({
                model: MODELS.PORTKEY,
                messages: conversationHistory
            });
            const reply = completion.choices[0]?.message?.content;
            if (reply) {
                console.log("[Mansi Brain] ✅ TARGET 5 SUCCESS via Portkey");
                logMansiExperience(lastUserMessage, reply, "PORTKEY");
                return { success: true, text: reply, model_used: "PORTKEY", error: null };
            }
        } catch (e: any) {
            console.warn(`[Mansi Brain] Portkey Gateway Failed: ${e.message}`);
            lastError = e.message;
        }
    }

    // ── 6. LOCAL / HOSTED OLLAMA LAYER (QWEN & DEEPSEEK) ──
    if (KEYS.OLLAMA_HOST) {
        console.log(`[Mansi Brain] ☢️ TARGET 6: Ollama Host (Qwen / DeepSeek)...`);
        try {
            const host = KEYS.OLLAMA_HOST.endsWith('/') ? KEYS.OLLAMA_HOST : `${KEYS.OLLAMA_HOST}/`;
            const client = new OpenAI({
                baseURL: `${host}v1`,
                apiKey: KEYS.OLLAMA || "ollama"
            });
            for (const modelToTry of [MODELS.OLLAMA_QWEN, MODELS.OLLAMA_DEEPSEEK]) {
                try {
                    const completion = await client.chat.completions.create({
                        model: modelToTry,
                        messages: conversationHistory
                    });
                    let reply = completion.choices[0]?.message?.content;
                    if (reply) {
                        reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
                        console.log(`[Mansi Brain] ✅ TARGET 6 SUCCESS (${modelToTry})`);
                        logMansiExperience(lastUserMessage, reply, `OLLAMA/${modelToTry}`);
                        return { success: true, text: reply, model_used: `OLLAMA/${modelToTry}`, error: null };
                    }
                } catch (e: any) {
                    console.warn(`[Mansi Brain] Ollama model ${modelToTry} Failed: ${e.message}`);
                }
            }
        } catch (e: any) {
            console.warn(`[Mansi Brain] Ollama Host Failed: ${e.message}`);
            lastError = e.message;
        }
    }

    // ── 7. BONSAI FAILSAFE ──
    if (KEYS.BONSAI && KEYS.BONSAI_HOST) {
        console.log(`[Mansi Brain] 👻 TARGET 7: Bonsai Failsafe...`);
        try {
            const client = new OpenAI({ baseURL: `${KEYS.BONSAI_HOST}/v1`, apiKey: KEYS.BONSAI });
            const completion = await client.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: conversationHistory
            });
            const reply = completion.choices[0]?.message?.content;
            if (reply) {
                console.log("[Mansi Brain] ✅ TARGET 7 SUCCESS via Bonsai");
                logMansiExperience(lastUserMessage, reply, "BONSAI");
                return { success: true, text: reply, model_used: "BONSAI", error: null };
            }
        } catch (e: any) {
            console.warn(`[Mansi Brain] Bonsai Failsafe Failed: ${e.message}`);
            lastError = e.message;
        }
    }

    // ── 8. OFFLINE STATIC FALLBACK (ONLY IF ALL AI MODELS HAVE SERVER ISSUES) ──
    console.warn("[Mansi Brain] SYSTEM CRITICAL: All AI Model Tiers Experienced Server/Network Issues.");

    // JSON Request Fallback (Knowledge Hub)
    const lastUserMsg = conversationHistory[conversationHistory.length - 1]?.content || '';
    if (lastUserMsg.includes('JSON')) {
        const FALLBACK_FAQS = {
            faqs: [
                { category: "SURVIVAL", question: "Engine heating in Ahmedabad traffic?", answer: "Visat traffic is brutal. Use Motul 7100 10W50. It handles the 45°C heat better than stock oil.", icon: "🔥" },
                { category: "MODS", question: "Is exhaust modification legal?", answer: "Strictly specific zones only. SG Highway police will fine you. Keep the dB killer IN.", icon: "👮" },
                { category: "MAINTENANCE", question: "Best chain lube for dust?", answer: "EP90 Gear Oil. Messy but survives the dust. Sprays dry out too fast.", icon: "⛓️" }
            ],
            learned_concepts: ["Synthetics", "EP90", "dB Killer"]
        };
        return { success: true, text: JSON.stringify(FALLBACK_FAQS), model_used: "simulation-json", error: null };
    }

    return {
        success: false,
        text: null,
        error: lastError || "All AI model servers are currently unreachable. Offline protocol active."
    };
}
