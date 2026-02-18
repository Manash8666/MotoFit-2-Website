'use server';

import { searchTheWeb, extractDeepContext } from './internet-search';
import { logMansiExperience } from './mansi-learning';
import { chatWithMansiBrain } from './mansi-brain';
import OpenAI from 'openai';

const SEED_TOPICS = [
    "Common engine issues in Royal Enfield Continental GT 650 repairs in India",
    "Honda Activa maintenance tips for Ahmedabad climate",
    "Ahmedabad Chandkheda local food and lifestyle for 22 year olds",
    "Hinglish and Gujarati mechanic slang used in Ahmedabad garages",
    "Maintaining bike performance during Ahmedabad extreme summer heat",
    "Top motorcycle accessories popular in Ahmedabad 2024",
    "How to handle bike punctures in rain on Ahmedabad roads",
    "Ahmedabad night life and café culture for youth in 2024",
    "Engine oil recommendations for Indian commuter bikes",
    "Brake pad replacement guide for Royal Enfield in Gujarati style"
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
