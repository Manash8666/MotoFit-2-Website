'use server';

/**
 * admin-store-db.ts
 * Server actions for reading and writing admin data (stats, leaderboard, projects)
 * to Neon Postgres. These replace the localStorage-only MansiAdminStore for
 * data that needs to be globally consistent across all users and devices.
 *
 * The client-side MansiAdminStore still acts as an instant local cache —
 * it reads from localStorage first for zero-latency UI, then these server
 * actions sync the source of truth to/from the DB.
 */

import { sql } from '@vercel/postgres';
import type { WorkshopStats, DynoEntry, ProjectEntry } from '@/services/mansi/agents/admin-store';

// ─── DEFAULT VALUES (mirrors admin-store.ts) ──────────────────────────────────

const DEFAULT_STATS: WorkshopStats = {
    bikesServiced: 5200,
    googleReviews: 127,
    satisfactionPercent: 98,
};

const DEFAULT_LEADERBOARD: DynoEntry[] = [
    { rank: 1, bike: "Ducati Panigale V4", owner: "Rajiv S.", mods: "Full Akrapovic + Stage 2", gain: "+18 HP", total: "228 HP" },
    { rank: 2, bike: "Kawasaki ZX-10R", owner: "Amit P.", mods: "Woolich Racing Tune", gain: "+12 HP", total: "208 HP" },
    { rank: 3, bike: "Interceptor 650", owner: "Team MotoFit", mods: "Big Bore 865cc", gain: "+24 HP", total: "71 HP" },
    { rank: 4, bike: "KTM Duke 390", owner: "Varun K.", mods: "Powertronic + Air Filter", gain: "+5 HP", total: "49 HP" },
];

const DEFAULT_PROJECTS: ProjectEntry[] = [
    { name: 'Royal Enfield 650 Twins', date: 'Jan 2026', status: 'Complete', type: 'Major Service' },
    { name: 'KTM Duke 390', date: 'Dec 2025', status: 'Delivered', type: 'Engine Rebuild' },
    { name: 'Triumph Street Triple', date: 'Dec 2025', status: 'Complete', type: 'Crash Repair' },
];

// ─── WORKSHOP STATS ───────────────────────────────────────────────────────────

export async function getStatsFromDB(): Promise<WorkshopStats> {
    try {
        const { rows } = await sql`
            SELECT key, value FROM motofit_admin_stats
        `;
        if (!rows.length) return DEFAULT_STATS;

        const map: Record<string, number> = {};
        rows.forEach(r => { map[r.key] = parseInt(r.value, 10); });

        return {
            bikesServiced: map['bikesServiced'] ?? DEFAULT_STATS.bikesServiced,
            googleReviews: map['googleReviews'] ?? DEFAULT_STATS.googleReviews,
            satisfactionPercent: map['satisfactionPercent'] ?? DEFAULT_STATS.satisfactionPercent,
        };
    } catch (e: any) {
        console.error('[AdminDB] getStats failed:', e.message);
        return DEFAULT_STATS;
    }
}

export async function updateStatInDB(key: keyof WorkshopStats, value: number): Promise<void> {
    try {
        await sql`
            INSERT INTO motofit_admin_stats (key, value, updated_at)
            VALUES (${key}, ${value.toString()}, NOW())
            ON CONFLICT (key) DO UPDATE SET value = ${value.toString()}, updated_at = NOW()
        `;
    } catch (e: any) {
        console.error('[AdminDB] updateStat failed:', e.message);
    }
}

// ─── DYNO LEADERBOARD ─────────────────────────────────────────────────────────

export async function getLeaderboardFromDB(): Promise<DynoEntry[]> {
    try {
        const { rows } = await sql`
            SELECT rank, bike, owner, mods, gain, total
            FROM motofit_dyno_leaderboard
            ORDER BY rank ASC
        `;
        return rows.length > 0 ? (rows as DynoEntry[]) : DEFAULT_LEADERBOARD;
    } catch (e: any) {
        console.error('[AdminDB] getLeaderboard failed:', e.message);
        return DEFAULT_LEADERBOARD;
    }
}

export async function upsertLeaderboardEntryInDB(entry: DynoEntry): Promise<void> {
    try {
        await sql`
            INSERT INTO motofit_dyno_leaderboard (rank, bike, owner, mods, gain, total, updated_at)
            VALUES (${entry.rank}, ${entry.bike}, ${entry.owner}, ${entry.mods}, ${entry.gain}, ${entry.total}, NOW())
            ON CONFLICT (rank) DO UPDATE SET
                bike = ${entry.bike},
                owner = ${entry.owner},
                mods = ${entry.mods},
                gain = ${entry.gain},
                total = ${entry.total},
                updated_at = NOW()
        `;
    } catch (e: any) {
        console.error('[AdminDB] upsertLeaderboardEntry failed:', e.message);
    }
}

// ─── FEATURED PROJECTS ────────────────────────────────────────────────────────

export async function getProjectsFromDB(): Promise<ProjectEntry[]> {
    try {
        const { rows } = await sql`
            SELECT name, date, status, type
            FROM motofit_featured_projects
            ORDER BY created_at DESC
            LIMIT 6
        `;
        return rows.length > 0 ? (rows as ProjectEntry[]) : DEFAULT_PROJECTS;
    } catch (e: any) {
        console.error('[AdminDB] getProjects failed:', e.message);
        return DEFAULT_PROJECTS;
    }
}

export async function addProjectToDB(project: ProjectEntry): Promise<void> {
    try {
        await sql`
            INSERT INTO motofit_featured_projects (name, date, status, type, created_at)
            VALUES (${project.name}, ${project.date}, ${project.status}, ${project.type}, NOW())
        `;
        // Keep max 6 — delete oldest beyond limit
        await sql`
            DELETE FROM motofit_featured_projects
            WHERE id NOT IN (
                SELECT id FROM motofit_featured_projects ORDER BY created_at DESC LIMIT 6
            )
        `;
    } catch (e: any) {
        console.error('[AdminDB] addProject failed:', e.message);
    }
}
