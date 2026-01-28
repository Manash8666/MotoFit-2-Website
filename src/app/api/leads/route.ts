import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const secret = searchParams.get('key');

        // Simple API Key Protection
        // In a real app, use a proper Auth Header, but query param is easier for simple scripts
        const SERVER_SECRET = process.env.BRIDGE_SECRET || 'motofit_local_bridge_2026';

        if (secret !== SERVER_SECRET) {
            return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
        }

        // Fetch pending leads
        const result = await sql`
        SELECT * FROM leads 
        WHERE status = 'pending' 
        ORDER BY created_at ASC 
        LIMIT 50;
    `;

        return NextResponse.json({
            success: true,
            count: result.rowCount,
            leads: result.rows
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const secret = searchParams.get('key');
        const SERVER_SECRET = process.env.BRIDGE_SECRET || 'motofit_local_bridge_2026';

        if (secret !== SERVER_SECRET) {
            return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
        }

        const body = await request.json();
        const { leadIds } = body;

        if (!Array.isArray(leadIds) || leadIds.length === 0) {
            return NextResponse.json({ error: 'No leadIds provided' }, { status: 400 });
        }

        // secure way to update multiple IDs
        const ids = leadIds.join(',');

        // Note: Template literals in SQL should be careful, but here we expect numbers.
        // For @vercel/postgres, typically better to loop or use specific Array syntax if supported.
        // For simplicity and compatibility, we will loop updates (not efficient huge scale, but fine for 10 leads/day)

        for (const id of leadIds) {
            await sql`UPDATE leads SET status = 'synced' WHERE id = ${id}`;
        }

        return NextResponse.json({ success: true, message: `Marked ${leadIds.length} leads as synced` });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
