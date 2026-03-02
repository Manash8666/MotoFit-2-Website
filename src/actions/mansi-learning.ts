'use server';

import { sql } from '@vercel/postgres';

export async function logMansiExperience(
    userQuery: string,
    mansiResponse: string,
    modelUsed: string,
    metadata: any = {}
) {
    // Fire and forget, don't block the UI if DB is slow or failing
    try {
        if (!process.env.POSTGRES_URL) {
            console.warn("[Mansi Logger] Skipping log: POSTGRES_URL is not set.");
            return { success: false, reason: "No DB Connection" };
        }

        await sql`
            INSERT INTO mansi_learning (user_query, mansi_response, model_used, metadata)
            VALUES (${userQuery}, ${mansiResponse}, ${modelUsed}, ${JSON.stringify(metadata)}::jsonb)
        `;

        console.log(`[Mansi Logger] Successfully logged interaction via ${modelUsed}`);
        return { success: true };
    } catch (error: any) {
        console.error("[Mansi Logger] Failed to log experience:", error.message);
        return { success: false, error: error.message };
    }
}
