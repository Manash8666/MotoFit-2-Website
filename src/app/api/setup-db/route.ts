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

        return NextResponse.json({
            message: 'Database Schema Initialized Successfully',
            table: 'leads'
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
