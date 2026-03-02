'use server';

import OpenAI from 'openai';

const HELICONE_API_KEY = process.env.HELICONE_API_KEY;

const SEED_TOPICS = [
    "Royal Enfield Continental GT 650 tappet adjustment guide India",
    "KTM Duke 390 quickshifter problems fix",
    "Best engine oil for Ahmedabad summer bike",
    "Modified exhaust laws Gujarat 2025",
    "Tubeless tyre puncture repair kit vs liquid sealant"
];

/**
 * Proactively researches a topic, synthesizes it into Mansi's persona, 
 * and logs it to the neural training table.
 */
export async function seedNeuralKnowledge() {
    console.log(`[Neural Seeder] Starting proactive knowledge harvest...`);

    if (!HELICONE_API_KEY) {
        console.warn("[Neural Seeder] Missing HELICONE_API_KEY. Skipping.");
        return { success: false, seeded_count: 0, error: "Missing Key" };
    }

    let count = 0;

    // Utilize the Tavily SDK we integrated earlier
    const { tavily } = require("@tavily/core");
    const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

    // Using OpenRouter for consistent formatting
    const client = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
        defaultHeaders: { "HTTP-Referer": "https://motofit.in", "X-Title": "MotoFit Seeder" }
    });

    for (const topic of SEED_TOPICS) {
        console.log(`[Neural Seeder] Harvesting: ${topic}...`);
        try {
            // 1. DDC (Deep Data Crawl)
            const searchRes = await tvly.search(topic, {
                searchDepth: "advanced",
                includeAnswer: true,
                maxResults: 3
            });

            if (!searchRes || !searchRes.results.length) continue;

            const context = searchRes.results.map((r: any) => r.content).join("\n\n");

            // 2. Synthesize using LLM
            const completion = await client.chat.completions.create({
                model: "google/gemini-2.0-flash-001",
                messages: [
                    { role: "system", content: "You are an expert motorcycle mechanic extracting core truths from raw data. Output ONLY JSON: { 'topic': string, 'insight': string, 'tags': string[] }" },
                    { role: "user", content: `CONTEXT:\n${context}\n\nTASK: Extract truth for '${topic}'` }
                ],
                response_format: { type: "json_object" }
            });

            const resultString = completion.choices[0]?.message?.content;
            if (resultString) {
                const insight = JSON.parse(resultString);
                // 3. Store in Memory (Using the existing Memory util)
                const { MansiMemory } = await import('@/services/mansi/agents/memory');
                MansiMemory.storeInsight("Proactive Neural Seeder", { type: "PROC_KNOWLEDGE", ...insight });
                count++;
            }

        } catch (e: any) {
            console.warn(`[Neural Seeder] Failed on ${topic}:`, e.message);
        }
    }

    console.log(`[Neural Seeder] Process Complete. Seeded: ${count} nodes.`);
    return { success: true, seeded_count: count, status: "Active", details: "Harvested knowledge clusters." };
}
