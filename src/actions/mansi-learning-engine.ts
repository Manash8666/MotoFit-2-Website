'use server';

import { MANSI_LEARNING_MASTER_PROMPT } from '@/services/mansi/prompts/learning-master';
import { searchTheWeb } from './internet-search';
import OpenAI from 'openai';
import { MansiMemory } from '@/services/mansi/agents/memory'; // We'll need to enhance this for vector-like storage

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// PRIORITY CLUSTERS as defined in the prompt
const PRIORITY_CLUSTERS = [
    { name: "SCOOTER_SERVICE", queries: ["common engine problems in Activa 6G", "Jupiter 125 mileage loss causes", "Suzuki Access 125 starting trouble diagnosis", "TVS Ntorq clutch vibration issues"] },
    { name: "ROYAL_ENFIELD", queries: ["Royal Enfield Classic typically engine overheating causes", "Himalayan 411 tappet noise symptoms", "Interceptor 650 wobble at high speed solution"] },
    { name: "KTM_PERFORMANCE", queries: ["KTM Duke 390 heating issue fix Ahmedabad", "RC 200 coolant mixing with engine oil symptoms", "KTM quickshifter not working diagnosis"] },
    { name: "DIAGNOSTIC_MAPPING", queries: ["bike vibrates at 50kmph reason", "white smoke from silencer petrol bike causes", "hard gear shifting motorcycle reasons"] }
];

export async function runRapidLearningCycle() {
    console.log(`[Mansi Learning Engine] ⚡ ACTIVATING HIGH-INTENSITY LEARNING MODE...`);

    if (!OPENROUTER_API_KEY) {
        return { success: false, error: "Missing OpenRouter Key" };
    }

    const client = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: OPENROUTER_API_KEY,
        defaultHeaders: { "X-Title": "MotoFit Learning Engine" }
    });

    const results = [];

    // EXECUTION LOOP (Simulated Batch - effectively doing 1 from each cluster to demonstrate)
    // In a real 48-hour mode, this would be a cron job or a loop with delays.
    // Here we run ONE high-value cycle for demonstration/activation.

    for (const cluster of PRIORITY_CLUSTERS) {
        // Pick one query per cluster for this run
        const query = cluster.queries[Math.floor(Math.random() * cluster.queries.length)];

        console.log(`[Mansi Learning] 🔍 Searching: ${query}`);
        const searchResult = await searchTheWeb(query);

        if (!searchResult || !searchResult.context) {
            console.warn(`[Mansi Learning] No results for ${query}`);
            continue;
        }

        // SYNTHESIS & STRUCTURE
        console.log(`[Mansi Learning] 🧠 Synthesizing Knowledge for: ${query}`);
        try {
            // TRY PRIMARY (OpenRouter / Gemini)
            if (process.env.OPENROUTER_API_KEY) {
                const completion = await client.chat.completions.create({
                    model: "google/gemini-2.0-flash-001",
                    messages: [
                        { role: "system", content: MANSI_LEARNING_MASTER_PROMPT },
                        { role: "user", content: `CONTEXT FROM TAVILY SEARCH:\n${searchResult.context}\n\nTASK: Extract structured garage knowledge for '${query}' based on the Master Prompt JSON format.` }
                    ],
                    temperature: 0.2, // Strict JSON
                    response_format: { type: "json_object" }
                });

                const knowledgeJSON = completion.choices[0]?.message?.content;
                if (knowledgeJSON) {
                    const knowledge = JSON.parse(knowledgeJSON);
                    MansiMemory.storeInsight("Tavily Learning Engine", { type: "GARAGE_KNOWLEDGE", cluster: cluster.name, ...knowledge });
                    results.push({ query, success: true, knowledge });
                    continue; // Success! Next cluster.
                }
            }

            // FALLBACK: SARVAM AI (Indian Context)
            const SARVAM_KEY = process.env.SARVAM_API_KEY || "sk_gs85i0tn_ujGe15KXSh1CdlDRyVfn7VcG";
            if (SARVAM_KEY) {
                console.log(`[Mansi Learning] 🇮🇳 Switching to Sarvam AI for Synthesis...`);
                const sarvamClient = new OpenAI({ baseURL: "https://api.sarvam.ai/v1", apiKey: SARVAM_KEY });

                const completion = await sarvamClient.chat.completions.create({
                    model: "sarvam-2g",
                    messages: [
                        { role: "system", content: MANSI_LEARNING_MASTER_PROMPT },
                        { role: "user", content: `CONTEXT:\n${searchResult.context}\n\nTASK: Extract structured garage knowledge for '${query}'. Return ONLY VALID JSON.` }
                    ],
                    temperature: 0.1,
                });

                const text = completion.choices[0]?.message?.content || "";
                // Attempt JSON extract
                const jsonStart = text.indexOf('{');
                const jsonEnd = text.lastIndexOf('}') + 1;
                if (jsonStart !== -1) {
                    const knowledge = JSON.parse(text.substring(jsonStart, jsonEnd));
                    MansiMemory.storeInsight("Tavily Learning Engine (Sarvam)", { type: "GARAGE_KNOWLEDGE", cluster: cluster.name, ...knowledge });
                    results.push({ query, success: true, knowledge });
                    continue;
                }
            }

            throw new Error("All Synthesis Brains Failed");

        } catch (e: any) {
            console.error(`[Mansi Learning] Synthesis Failed:`, e.message);
            results.push({ query, success: false, error: e.message });
        }
    }

    return {
        success: true,
        message: "Learning Cycle Completed",
        stats: {
            cycles_run: PRIORITY_CLUSTERS.length,
            successful: results.filter(r => r.success).length
        },
        results
    };
}
