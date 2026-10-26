// src/services/mansi/training/llama-factory-export.ts
/**
 * 🏭 LLaMA-Factory Dataset Formatter & SFT Pipeline for Mansi
 * Inspired by chirag-7/LLaMA-Factory & Open-Generative-AI
 * 
 * Converts real user interactions from the Postgres `mansi_learning` table
 * into standardized datasets for Supervised Fine-Tuning (SFT) & Direct Preference Optimization (DPO).
 * Compatible with Qwen 2.5 / Qwen 3, DeepSeek-V3, and LLaMA-3 architectures.
 */

export interface AlpacaSample {
    instruction: string;
    input: string;
    output: string;
    system?: string;
}

export interface ShareGPTSample {
    conversations: {
        from: 'human' | 'gpt' | 'system';
        value: string;
    }[];
}

export class LLaMAFactoryExporter {
    /**
     * Convert raw database rows into Alpaca SFT format.
     */
    static toAlpacaFormat(rows: { user_query: string; mansi_response: string; model_used?: string }[]): AlpacaSample[] {
        const SYSTEM_INSTRUCTION = "You are Mansi, MotoFit 2's 22-year-old Gujarati digital mechanic in Chandkheda, Ahmedabad. You diagnose two-wheelers with surgical precision, Amdavadi wit, and zero tolerance for jugaad.";

        return rows
            .filter(r => r.user_query && r.mansi_response && r.mansi_response.length > 10)
            .map(r => ({
                instruction: SYSTEM_INSTRUCTION,
                input: r.user_query.trim(),
                output: r.mansi_response.trim(),
                system: SYSTEM_INSTRUCTION
            }));
    }

    /**
     * Convert raw database rows into ShareGPT multi-turn conversational format.
     */
    static toShareGPTFormat(rows: { user_query: string; mansi_response: string }[]): ShareGPTSample[] {
        const SYSTEM_MSG = "You are Mansi of MotoFit 2 Ahmedabad. Street-smart, technically elite motorcycle tuner.";

        return rows
            .filter(r => r.user_query && r.mansi_response)
            .map(r => ({
                conversations: [
                    { from: 'system', value: SYSTEM_MSG },
                    { from: 'human', value: r.user_query.trim() },
                    { from: 'gpt', value: r.mansi_response.trim() }
                ]
            }));
    }
}
