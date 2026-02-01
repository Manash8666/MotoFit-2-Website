
// src/services/mansi/agents/learner.ts
import { MansiMemory } from './memory';

export class MansiLearner {
    static async start() {
        if (typeof window === 'undefined') return;

        // Check last run time to avoid spamming on every reload
        const lastRun = localStorage.getItem('mansi_last_learn_ts');
        const now = Date.now();
        const interval = 6 * 60 * 60 * 1000; // 6 Hours

        if (!lastRun || now - parseInt(lastRun) > interval) {
            await this.learn();
            localStorage.setItem('mansi_last_learn_ts', now.toString());
        }
    }

    static async learn() {
        if (typeof window === 'undefined' || !window.puter) return;

        console.log("Mansi is scanning the web (Simulated)...");

        try {
            // We use the LLM to "scan" for trends relevant to Ahmedabad bikers.
            // This replaces the raw YouTube API call from the original design 
            // to work without exposing keys client-side, while preserving the "self-learning" behavior.
            const response = await window.puter.ai.chat(
                `Act as a trend watcher for the Ahmedabad Motorcycling scene. 
                 List 3 key viral topics, local news, or mechanical trends for 2025/2026 regarding:
                 1. Traffic rules in Ahmedabad (e.g. Helmet cams, SG Highway fines)
                 2. New bike launches (KTM Gen 3, RE 450s)
                 3. Local riding spots (Riverfront, Science City road)
                 
                 Return strictly a valid JSON array of objects: 
                 [{ "title": "Topic Title", "desc": "Brief description" }]
                 No markdown formatting. Just raw JSON.`,
                {
                    model: 'claude-sonnet-4-5',
                    temperature: 0.7
                }
            );

            let text = "";
            if (typeof response === 'string') {
                text = response;
            } else if (response?.message?.content?.[0]?.text) {
                text = response.message.content[0].text;
            } else {
                text = JSON.stringify(response);
            }

            // Clean up potentially malformed JSON from LLM
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const items = JSON.parse(jsonStr);

            if (Array.isArray(items)) {
                for (const item of items) {
                    MansiMemory.storeInsight('simulated_web', {
                        title: item.title,
                        desc: item.desc
                    });
                }
                console.log("Mansi successfully learned new trends:", items);
            }

        } catch (e) {
            console.warn("Mansi learning cycle skipped:", e);
        }
    }
}
