
// src/services/mansi/agents/memory.ts

export interface ChatContext {
    history: { user: string; mansi: string; ts: number }[];
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
        ctx.history.push({ user: userMsg, mansi: mansiMsg, ts: Date.now() });

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
}
