
// src/services/mansi/agents/street-radar.ts
import { VibeType, COMEBACKS, DialectType } from '../utils/comebacks';

export class StreetRadar {
    static readVibes(msg: string): VibeType | null {
        const lower = msg.toLowerCase().trim();

        // 1. Abusive (Priority 1)
        if (/(bhenchod|lund|chut|teri maa|madarchod|bhosdi|gaand|fuck|bitch|whore|slut|dick|pussy|xxx|porn)/i.test(lower)) {
            return 'abusive';
        }

        // 2. Flirty Creep
        if (/(legs|body|hot|garam|sexy|solo rider|late night)/i.test(lower)) {
            return 'flirty_creep';
        }

        // 3. Entitled Fanboy
        if (/(why no reply|don’t ignore me|plz reply|seen\?)/i.test(lower)) {
            return 'entitled_fanboy';
        }

        // 4. Sexualized Compliments
        if (/(tattoo sexy|you look hot|dress tight)/i.test(lower)) {
            return 'sexual_compliment';
        }

        return null;
    }

    static respondLikeMansi(vibe: VibeType, dialect: DialectType = 'hinglish'): { text: string; shouldBan: boolean } {
        // Fallback to Hinglish if dialect not found for specific vibe
        const responseMap = COMEBACKS[vibe];
        let text = responseMap?.[dialect] || responseMap?.['hinglish'] ||
            "I don’t entertain this energy. Respect yourself first. 🙏";

        let shouldBan = false;

        // Inherit 1-hour ban logic for abusive content
        if (vibe === 'abusive') {
            shouldBan = true;
            text += " [You are now banned for 1 hour 🚫]";
        }

        return { text, shouldBan };
    }
}
