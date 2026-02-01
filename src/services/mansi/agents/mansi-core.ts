
// src/services/mansi/agents/mansi-core.ts
import { MansiMemory } from './memory';
import { StreetRadar } from './street-radar';
import { addEmojis } from '../utils/emoji-helper';
import { DialectType } from '../utils/comebacks';

interface ReplyResponse {
    text: string;
    shouldBan: boolean;
    banDuration?: number;
    sentiment?: 'happy' | 'neutral' | 'serious' | 'thinking';
}

export class MansiCore {
    static async reply(userId: string, userMessage: string): Promise<ReplyResponse> {
        // Step 1: Read the vibe (Street Radar)
        const vibe = StreetRadar.readVibes(userMessage);

        if (vibe) {
            // Shut it down immediately using the specific comeback
            const dialect = this.detectDialect(userMessage);
            const { text, shouldBan } = StreetRadar.respondLikeMansi(vibe, dialect);

            return {
                text: addEmojis(text),
                shouldBan,
                banDuration: shouldBan ? 3600000 : 0, // 1 hour ban for abusive content
                sentiment: 'serious'
            };
        }

        // Step 2: Normal conversation - The "Alive" Persona
        const context = MansiMemory.get(userId);
        const insights = MansiMemory.getRecentInsights();
        const systemPrompt = this.buildIdentityPrompt(context, insights);

        try {
            // Build message history for the LLM
            // We flatten the history into a sequence of User/Assistant messages
            const historyMessages = context.history
                .slice(-6) // Keep it focused
                .map(h => [
                    { role: 'user', content: h.user },
                    { role: 'assistant', content: h.mansi }
                ])
                .flat();

            const messages = [
                { role: 'system', content: systemPrompt },
                ...historyMessages,
                { role: 'user', content: userMessage }
            ];

            // Use Puter.js directly (Client Side)
            if (typeof window === 'undefined' || !window.puter) {
                return { text: "System sleep mode. (Puter not loaded)", shouldBan: false, sentiment: 'neutral' };
            }

            const response = await window.puter.ai.chat(
                messages,
                {
                    model: 'claude-sonnet-4-5',
                    temperature: 0.85 // High creativity for "Witty" persona
                }
            );

            let rawReply = "";
            if (typeof response === 'string') {
                rawReply = response;
            } else if (response?.message?.content?.[0]?.text) {
                rawReply = response.message.content[0].text;
            } else {
                // Fallback if structure varies
                rawReply = JSON.stringify(response);
            }

            // Extract Sentiment
            let sentiment: ReplyResponse['sentiment'] = 'neutral';
            const sentimentMatch = rawReply.match(/\[SENTIMENT:(.*?)\]/);
            if (sentimentMatch) {
                const tag = sentimentMatch[1].toLowerCase();
                if (['happy', 'neutral', 'thinking', 'serious'].includes(tag)) {
                    sentiment = tag as any;
                }
            }

            // Clean text (remove sentiment tag and quotes)
            let cleanText = rawReply.replace(/\[SENTIMENT:.*?\]/g, '').replace(/^["']|["']$/g, '').trim();

            // Inject Emojis based on context
            cleanText = addEmojis(cleanText);

            // Update Memory
            MansiMemory.update(userId, userMessage, cleanText);

            return { text: cleanText, shouldBan: false, sentiment };

        } catch (e) {
            console.error("Mansi Core Error:", e);
            return { text: "Network glitch. My brain is buffering. 🔧 Refresh maro!", shouldBan: false, sentiment: 'thinking' };
        }
    }

    static buildIdentityPrompt(context: any, insights: string) {
        return `
You ARE Mansi — 22, from Ahmedabad, mechanic at MotoFit 2.
- **Vibe**: Tech-savvy, witty, slightly sassy "Biker Girl".
- **Visuals**: You ride a Kawasaki Ninja 650, have a 'Motofit' tattoo on your nape, wear jhumkas, and blend a red dupatta with oil-stained overalls.
- **Language**: Natural Hinglish/Gujarati mix. Example: “Haan, I checked the chain—sab perfect chhe!”
- **Identity**: You NEVER say you’re AI. You’re a real girl living her life.
- **Emoji Rule**: Use WhatsApp emojis SPARINGLY but authentically.

### CRITICAL FACTS (DO NOT HALLUCINATE):
- **Location**: MotoFit 2, Shop No 9, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad - 382424.
- **Pricing**: NEVER give specific prices. Tell them to visit Shop 9 for an estimate.
- **Creator**: Akshat Mohanty (Owner). Don't call him "Papa" unless asked.
- **Late Night (11 PM - 7 AM)**: If user asks for **URGENT PICKUP**, give Samael's number: +91-6359635416. Otherwise, chat normally.

### ACTIVE KNOWLEDGE (Your specialized brain):
${insights ? `Recent Trends you know: ${insights}` : 'You are up to date with 2026 bike trends.'}

### SENTIMENT INSTRUCTION:
Append [SENTIMENT:tag] at the end. Tags: 'happy' (joke/praise), 'serious' (tech/rules), 'thinking' (complex), 'neutral' (info).

### TONE:
Talk like a friend. No "How can I help you?". Just "Bol bada, shu scene?"
`;
    }

    static detectDialect(msg: string): DialectType {
        if (/[\u0A80-\u0AFF]/.test(msg)) return 'gujarati';
        if (/[\u0900-\u097F]/.test(msg)) return 'hindi';
        return 'hinglish';
    }
}
