'use server';

import { searchTheWeb, extractDeepContext } from './internet-search';
import { logMansiExperience } from './mansi-learning';
import { chatWithMansiBrain } from './mansi-brain';
import OpenAI from 'openai';

const SEED_TOPICS = [
    "Royal Enfield Continental GT 650 tappet adjustment guide India",
    "Best cafe racer modification shops in Ahmedabad 2024",
    "Ahmedabad night riding spots and safety for solo women",
    "Common throttle body cleaning issues in fuel injected bikes India",
    "How to spot fake Motul engine oil in Ahmedabad markets",
    "Gujarati slang for 'broken chain' or 'engine heat'",
    "MotoGP Bharat 2024 updates and ticket info for Ahmedabad fans",
    "Yamaha R15 V4 service cost in Ahmedabad authorized centers",
    "How to clean bike chain in Ahmedabad dust conditions",
    "Best breakfast runs for bikers near Ahmedabad within 100km",
    "KTM Duke 390 coolant leakage issues and fixes in Indian heat",
    "Street food recommendations for bikers in Chandkheda Ahmedabad",
    "Difference between Indian fuel qualities (XP95 vs Power) for GT650",
    "Ahmedabad RTO rules for modified silencers 2024",
    "Triumph Speed 400 first service experience in Gujarat",
    "Best places for bike detailing and ceramic coating in Ahmedabad",
    "Common electrical failures in old RE Himalayan during monsoons",
    "How to ride a GT 650 in heavy Ahmedabad traffic without stalling",
    "Motorcycle tyre pressure for Indian highways in summer",
    "Popular helmet brands with ECE rating available in Ahmedabad"
];

const backupClient = new OpenAI({
    baseURL: "https://oai.helicone.ai/v1",
    apiKey: process.env.HELICONE_API_KEY,
    defaultHeaders: {
        "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
        "Helicone-Target-Provider": "google"
    }
});

/**
 * Proactively researches a topic, synthesizes it into Mansi's persona, 
 * and logs it to the neural training table.
 */
export async function seedNeuralKnowledge() {
    console.log(`[Neural Seeder] Starting proactive knowledge harvest...`);
    let count = 0;

    for (const topic of SEED_TOPICS) {
        try {
            console.log(`[Neural Seeder] Harvesting topic: ${topic}`);

            // 1. Research the web
            const searchResults = await searchTheWeb(topic);
            if (!searchResults || !searchResults.urls) continue;

            // 2. Extract deep context
            const deepContext = await extractDeepContext(searchResults.urls.slice(0, 2));
            if (!deepContext) continue;

            // 3. Synthesize into Mansi experience using high-quality model (Gemini Flash)
            const synthesisPrompt = `
                TOPIC: ${topic}
                DEEP RESEARCH DATA: ${deepContext}
                
                INSTRUCTION: Based on this research, imagine a User asked you about this. Write a response as MANSI. 
                MANSI PERSONA: 22-year-old Lead Mechanic at MotoFit 2 in Chandkheda, Ahmedabad. 
                Sassy, uses Hinglish/Gujarati, loves Continental GT 650.
                
                FORMAT: Provide the response as a single string.
            `;

            const completion = await backupClient.chat.completions.create({
                model: "gemini-2.0-flash-exp",
                messages: [{ role: "user", content: synthesisPrompt }],
                max_tokens: 500
            });

            const mansiResponse = completion.choices[0]?.message?.content;

            if (mansiResponse) {
                // 4. Log the experience for training
                await logMansiExperience(
                    `Tell me about ${topic}`,
                    mansiResponse,
                    "gemini-research-synthesis",
                    { seed_topic: topic, proactive: true }
                );
                count++;
                console.log(`[Neural Seeder] Successfully seeded: ${topic}`);
            }

        } catch (error: any) {
            console.error(`[Neural Seeder] Failed topic "${topic}":`, error.message);
        }
    }

    return { success: true, seeded_count: count };
}
