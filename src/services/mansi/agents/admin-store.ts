
// src/services/mansi/agents/admin-store.ts
// Mansi's Admin Panel — localStorage-backed store for admin-editable website data

export interface WorkshopStats {
    bikesServiced: number;
    googleReviews: number;
    satisfactionPercent: number;
}

export interface CalendarEvent {
    date: string;      // YYYY-MM-DD
    title: string;
    description?: string;
    ts: number;        // created timestamp
}

export interface BlogDraft {
    title: string;
    excerpt: string;
    author: string;
    tags: string[];
    ts: number;
}

const STATS_KEY = 'mansi_workshop_stats';
const EVENTS_KEY = 'mansi_calendar_events';
const BLOGS_KEY = 'mansi_blog_drafts';

// Default values (match the hardcoded values in IndustrialStats.tsx)
const DEFAULT_STATS: WorkshopStats = {
    bikesServiced: 5200,
    googleReviews: 127,
    satisfactionPercent: 98,
};

export class MansiAdminStore {
    // ─── WORKSHOP STATS ────────────────────────────────────────

    static getStats(): WorkshopStats {
        if (typeof window === 'undefined') return DEFAULT_STATS;
        try {
            const raw = localStorage.getItem(STATS_KEY);
            if (!raw) return DEFAULT_STATS;
            return { ...DEFAULT_STATS, ...JSON.parse(raw) };
        } catch {
            return DEFAULT_STATS;
        }
    }

    static updateStat(key: keyof WorkshopStats, value: number): WorkshopStats {
        const current = this.getStats();
        const updated = { ...current, [key]: value };
        if (typeof window !== 'undefined') {
            localStorage.setItem(STATS_KEY, JSON.stringify(updated));
        }
        return updated;
    }

    static getStatDisplay(): string {
        const s = this.getStats();
        return `1. Bikes Serviced: **${s.bikesServiced}**\n2. Google Reviews: **${s.googleReviews}**\n3. Satisfaction %: **${s.satisfactionPercent}%**`;
    }

    // ─── CALENDAR EVENTS ───────────────────────────────────────

    static getCalendarEvents(): CalendarEvent[] {
        if (typeof window === 'undefined') return [];
        try {
            const raw = localStorage.getItem(EVENTS_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    }

    static getEventsForDate(dateStr: string): CalendarEvent[] {
        return this.getCalendarEvents().filter(e => e.date === dateStr);
    }

    static addCalendarEvent(event: Omit<CalendarEvent, 'ts'>): CalendarEvent {
        const full: CalendarEvent = { ...event, ts: Date.now() };
        const events = this.getCalendarEvents();
        events.push(full);
        if (typeof window !== 'undefined') {
            localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
        }
        return full;
    }

    static getUpcomingEvents(count: number = 5): CalendarEvent[] {
        const today = new Date().toISOString().split('T')[0];
        return this.getCalendarEvents()
            .filter(e => e.date >= today)
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, count);
    }

    // ─── BLOG DRAFTS ──────────────────────────────────────────

    static getBlogDrafts(): BlogDraft[] {
        if (typeof window === 'undefined') return [];
        try {
            const raw = localStorage.getItem(BLOGS_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    }

    static addBlogDraft(draft: Omit<BlogDraft, 'ts'>): BlogDraft {
        const full: BlogDraft = { ...draft, ts: Date.now() };
        const drafts = this.getBlogDrafts();
        drafts.push(full);
        if (typeof window !== 'undefined') {
            localStorage.setItem(BLOGS_KEY, JSON.stringify(drafts));
        }
        return full;
    }
}
