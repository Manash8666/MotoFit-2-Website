
// src/services/mansi/agents/memory.ts


export interface ChatContext {
    history: { user: string; mansi: string; ts: number; topics?: string[] }[];
}

export class MansiMemory {
    private static KEY_PREFIX = 'mansi_v2_';
    private static INSIGHT_KEY = 'mansi_insights';

    static get(userId: string): ChatContext {
        if (typeof window === 'undefined') return { history: [] }; // Server-side safety

        try {
            const raw = localStorage.getItem(`${this.KEY_PREFIX}${userId}`);
            return raw ? JSON.parse(raw) : { history: [] };
        } catch {
            return { history: [] };
        }
    }

    static update(userId: string, userMsg: string, mansiMsg: string): void {
        if (typeof window === 'undefined') return;

        const ctx = this.get(userId);
        const topics = this.detectTopics(userMsg);

        ctx.history.push({ user: userMsg, mansi: mansiMsg, ts: Date.now(), topics });

        // Keep last 15 messages -> Moving Window
        if (ctx.history.length > 15) {
            ctx.history = ctx.history.slice(-15);
        }

        localStorage.setItem(`${this.KEY_PREFIX}${userId}`, JSON.stringify(ctx));
    }

    static storeInsight(source: string, data: any): void {
        if (typeof window === 'undefined') return;

        try {
            const raw = localStorage.getItem(this.INSIGHT_KEY);
            const insights = raw ? JSON.parse(raw) : [];

            insights.unshift({ source, data, ts: Date.now() });

            // Keep top 50 insights
            const trimmed = insights.slice(0, 50);

            localStorage.setItem(this.INSIGHT_KEY, JSON.stringify(trimmed));
        } catch (e) {
            console.error("Mansi Memory Write Error:", e);
        }
    }

    static getRecentInsights(): string {
        if (typeof window === 'undefined') return "";
        try {
            const raw = localStorage.getItem(this.INSIGHT_KEY);
            if (!raw) return "";

            const insights = JSON.parse(raw);
            return insights.slice(0, 5).map((i: any) => i.data.title || i.data.desc).join(", ");
        } catch {
            return "";
        }
    }

    static detectTopics(msg: string): string[] {
        const t: string[] = [];
        if (/bike|ninja|chain|engine/i.test(msg)) t.push('bike');
        if (/garba|navratri/i.test(msg)) t.push('garba');
        if (/tattoo|motofit/i.test(msg)) t.push('tattoo');
        if (/tired|chai|rest/i.test(msg)) t.push('wellness');
        return t;
    }

    static getPendingFollowUp(userId: string): string | null {
        if (typeof window === 'undefined') return null;

        const ctx = this.get(userId);
        const history = ctx.history;
        const now = Date.now();
        let pending = null;

        for (let i = history.length - 1; i >= 0; i--) {
            const entry = history[i];
            const topics = entry.topics || [];

            if (topics.includes('bike') && now - entry.ts > 48 * 60 * 60 * 1000) {
                pending = "Hey — did you check that bike issue? Don’t ignore it! 🔧";
                break;
            } else if (topics.includes('wellness') && now - entry.ts > 24 * 60 * 60 * 1000) {
                pending = "You mentioned being tired. Rest well, okay? 💙";
                break;
            }
        }
        return pending;
    }
}
