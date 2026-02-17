
// src/services/mansi/agents/learner.ts
import { MansiMemory } from './memory';
import { chatWithMansiBrain } from '@/actions/mansi-brain';

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
        console.log("Mansi is scanning the web (via Server Brain)...");

        try {
            // We use the Server Brain (OpenRouter) to "scan" for trends relevant to Ahmedabad bikers.
            // This replaces the deprecated Client-Side Puter.js logic.
            const prompt = `You are Mansi's subconscious mind, scanning the world for her. Act as a trend watcher for Ahmedabad's motorcycling and street culture scene. 
                 List 3 key viral topics, local news, or trends for 2025/2026 regarding:
                 1. Traffic rules in Ahmedabad (Helmet cams, SG Highway fines, new challans)
                 2. New bike launches or viral motorcycle content (KTM Gen 3, RE 450s, Yamaha R15 V5)
                 3. Ahmedabad culture & life (Riverfront events, street food spots, weather alerts for bikers, Navratri/Garba season news)
                 4. Workshop tips (maintenance hacks, common monsoon bike issues, chain cleaning tricks)
                 
                 Return strictly a valid JSON array of objects: 
                 [{ "title": "Topic Title", "desc": "Brief description" }]
                 No markdown formatting. Just raw JSON.`;

            const response = await chatWithMansiBrain([
                { role: 'user', content: prompt }
            ]);

            if (!response.success || !response.text) {
                throw new Error("Server Brain failed to fetch trends");
            }

            let text = response.text;

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
                console.log("[Mansi Autonomy] Scan Complete. New neural pathways formed:", items);
            }

        } catch (e) {
            console.warn("Mansi learning cycle skipped:", e);
        }
    }
}
