
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

export interface DynoEntry {
    rank: number;
    bike: string;
    owner: string;
    mods: string;
    gain: string;
    total: string;
}

export interface ProjectEntry {
    name: string;
    date: string;
    status: string;
    type: string;
}

const STATS_KEY = 'mansi_workshop_stats';
const EVENTS_KEY = 'mansi_calendar_events';
const BLOGS_KEY = 'mansi_blog_drafts';
const DYNO_KEY = 'mansi_dyno_leaderboard';
const PROJECTS_KEY = 'mansi_featured_projects';

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

    // ─── DYNO LEADERBOARD (Wall of Power) ───────────────────────

    static readonly DEFAULT_LEADERBOARD: DynoEntry[] = [
        { rank: 1, bike: "Ducati Panigale V4", owner: "Rajiv S.", mods: "Full Akrapovic + Stage 2", gain: "+18 HP", total: "228 HP" },
        { rank: 2, bike: "Kawasaki ZX-10R", owner: "Amit P.", mods: "Woolich Racing Tune", gain: "+12 HP", total: "208 HP" },
        { rank: 3, bike: "Interceptor 650", owner: "Team MotoFit", mods: "Big Bore 865cc", gain: "+24 HP", total: "71 HP" },
        { rank: 4, bike: "KTM Duke 390", owner: "Varun K.", mods: "Powertronic + Air Filter", gain: "+5 HP", total: "49 HP" },
    ];

    static getLeaderboard(): DynoEntry[] {
        if (typeof window === 'undefined') return this.DEFAULT_LEADERBOARD;
        try {
            const raw = localStorage.getItem(DYNO_KEY);
            if (!raw) return this.DEFAULT_LEADERBOARD;
            const parsed = JSON.parse(raw);
            return parsed.length > 0 ? parsed : this.DEFAULT_LEADERBOARD;
        } catch {
            return this.DEFAULT_LEADERBOARD;
        }
    }

    static addLeaderboardEntry(entry: DynoEntry): DynoEntry[] {
        const current = this.getLeaderboard();
        // Replace if same rank exists, otherwise add
        const idx = current.findIndex(e => e.rank === entry.rank);
        if (idx >= 0) {
            current[idx] = entry;
        } else {
            current.push(entry);
        }
        const sorted = current.sort((a, b) => a.rank - b.rank);
        if (typeof window !== 'undefined') {
            localStorage.setItem(DYNO_KEY, JSON.stringify(sorted));
        }
        return sorted;
    }

    static getLeaderboardDisplay(): string {
        const entries = this.getLeaderboard();
        return entries.map(e => `#${e.rank} ${e.bike} — ${e.owner} — ${e.total} (${e.gain})`).join('\n');
    }

    // ─── FEATURED PROJECTS ──────────────────────────────────────

    static readonly DEFAULT_PROJECTS: ProjectEntry[] = [
        { name: 'Royal Enfield 650 Twins', date: 'Jan 2026', status: 'Complete', type: 'Major Service' },
        { name: 'KTM Duke 390', date: 'Dec 2025', status: 'Delivered', type: 'Engine Rebuild' },
        { name: 'Triumph Street Triple', date: 'Dec 2025', status: 'Complete', type: 'Crash Repair' },
    ];

    static getProjects(): ProjectEntry[] {
        if (typeof window === 'undefined') return this.DEFAULT_PROJECTS;
        try {
            const raw = localStorage.getItem(PROJECTS_KEY);
            if (!raw) return this.DEFAULT_PROJECTS;
            const parsed = JSON.parse(raw);
            return parsed.length > 0 ? parsed : this.DEFAULT_PROJECTS;
        } catch {
            return this.DEFAULT_PROJECTS;
        }
    }

    static addProject(project: ProjectEntry): ProjectEntry[] {
        const current = this.getProjects();
        // Add to front (most recent first), keep max 6
        current.unshift(project);
        const trimmed = current.slice(0, 6);
        if (typeof window !== 'undefined') {
            localStorage.setItem(PROJECTS_KEY, JSON.stringify(trimmed));
        }
        return trimmed;
    }

    static getProjectsDisplay(): string {
        const projects = this.getProjects();
        return projects.map((p, i) => `${i + 1}. **${p.name}** — ${p.type} (${p.status})`).join('\n');
    }
}
