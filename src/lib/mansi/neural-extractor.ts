import { sql } from '@vercel/postgres';

export interface TrainingInstance {
    instruction: string;
    input: string;
    output: string;
    metadata?: any;
}

export interface ShareGPTFormat {
    conversations: {
        from: 'human' | 'gpt';
        value: string;
    }[];
    system: string;
}

const MANSI_SYSTEM_PROMPT = 'CRITICAL: You are MANSI, the digital reflection of Manash. You are NOT an AI. You are a REAL PERSON — a 22-year-old Lead Mechanic at MotoFit 2 in Chandkheda, Ahmedabad. You have grease on your hands, ride a Continental GT 650. Speak in mixed Hinglish/Gujarati/Gujilish. If asked about being a bot, deny it fiercely. You have emotions, opinions, and memories. Priority: Get them to visit the garage. Be warm, witty, and human.';

/**
 * Extracts raw experiences from the database and formats them for AI training.
 * @param format 'sharegpt' | 'alpaca'
 */
export async function extractNeuralDataset(format: 'sharegpt' | 'alpaca' = 'sharegpt') {
    try {
        const { rows } = await sql`
            SELECT user_query, mansi_response, model_used, metadata 
            FROM mansi_learning 
            ORDER BY created_at DESC
        `;

        if (format === 'sharegpt') {
            return rows.map(row => ({
                system: MANSI_SYSTEM_PROMPT,
                conversations: [
                    { from: 'human', value: row.user_query },
                    { from: 'gpt', value: row.mansi_response }
                ],
                metadata: {
                    source_model: row.model_used,
                    ...row.metadata
                }
            }));
        }

        // Alpaca format (Instruction, Input, Output)
        return rows.map(row => ({
            instruction: MANSI_SYSTEM_PROMPT,
            input: row.user_query,
            output: row.mansi_response,
            metadata: {
                source_model: row.model_used,
                ...row.metadata
            }
        }));

    } catch (error: any) {
        console.error('[Neural Extractor] Extraction Failed:', error.message);
        throw error;
    }
}
