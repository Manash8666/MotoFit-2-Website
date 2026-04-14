import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // SECURITY: In production, you might want to protect this route or delete it after use
    // For now, we will just proceed to create the table

    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        phone TEXT,
        bike_model TEXT,
        message TEXT,
        status VARCHAR(50) DEFAULT 'pending', -- pending, synced, processed
        source VARCHAR(50) DEFAULT 'website',
        meta_data JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS mansi_learning (
        id SERIAL PRIMARY KEY,
        user_query TEXT,
        mansi_response TEXT,
        model_used TEXT,
        metadata JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS mansi_blogs (
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE,
        title TEXT,
        excerpt TEXT,
        author TEXT,
        date TEXT,
        read_time TEXT,
        image TEXT,
        tags JSONB,
        content TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // ── Admin Data Tables (replaces localStorage) ──────────────────────────

    await sql`
      CREATE TABLE IF NOT EXISTS motofit_admin_stats (
        key VARCHAR(100) PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed default stats if table is empty
    await sql`
      INSERT INTO motofit_admin_stats (key, value) VALUES
        ('bikesServiced', '5200'),
        ('googleReviews', '127'),
        ('satisfactionPercent', '98')
      ON CONFLICT (key) DO NOTHING;
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS motofit_dyno_leaderboard (
        id SERIAL PRIMARY KEY,
        rank INTEGER UNIQUE NOT NULL,
        bike TEXT NOT NULL,
        owner TEXT NOT NULL,
        mods TEXT NOT NULL,
        gain TEXT NOT NULL,
        total TEXT NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed default leaderboard if table is empty
    await sql`
      INSERT INTO motofit_dyno_leaderboard (rank, bike, owner, mods, gain, total) VALUES
        (1, 'Ducati Panigale V4', 'Rajiv S.', 'Full Akrapovic + Stage 2', '+18 HP', '228 HP'),
        (2, 'Kawasaki ZX-10R', 'Amit P.', 'Woolich Racing Tune', '+12 HP', '208 HP'),
        (3, 'Interceptor 650', 'Team MotoFit', 'Big Bore 865cc', '+24 HP', '71 HP'),
        (4, 'KTM Duke 390', 'Varun K.', 'Powertronic + Air Filter', '+5 HP', '49 HP')
      ON CONFLICT (rank) DO NOTHING;
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS motofit_featured_projects (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        date TEXT NOT NULL,
        status TEXT NOT NULL,
        type TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed default projects if table is empty
    await sql`
      INSERT INTO motofit_featured_projects (name, date, status, type) VALUES
        ('Royal Enfield 650 Twins', 'Jan 2026', 'Complete', 'Major Service'),
        ('KTM Duke 390', 'Dec 2025', 'Delivered', 'Engine Rebuild'),
        ('Triumph Street Triple', 'Dec 2025', 'Complete', 'Crash Repair')
      ON CONFLICT DO NOTHING;
    `;

    return NextResponse.json({
      message: 'Database Schema Initialized Successfully — all tables created and seeded.',
      tables: ['leads', 'mansi_learning', 'mansi_blogs', 'motofit_admin_stats', 'motofit_dyno_leaderboard', 'motofit_featured_projects']
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
