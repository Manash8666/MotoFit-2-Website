'use server';

import { sql } from '@vercel/postgres';

export async function logMansiExperience(
    query: string,
    response: string,
    modelUsed: string,
    metadata: any = {}
) {
    try {
        if (!query || !response) return { success: false, error: 'Missing data' };

        console.log(`[Mansi Learning] Logging experience from model: ${modelUsed}`);

        await sql`
      INSERT INTO mansi_learning (user_query, mansi_response, model_used, metadata)
      VALUES (${query}, ${response}, ${modelUsed}, ${JSON.stringify(metadata)})
    `;

        return { success: true };
    } catch (error: any) {
        console.error('[Mansi Learning] Failed to log experience:', error.message);
        return { success: false, error: error.message };
    }
}
