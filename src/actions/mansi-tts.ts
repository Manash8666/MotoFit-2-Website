'use server';

import { SarvamAIClient } from "sarvamai";

const SARVAM_API_KEY = process.env.SARVAM_API_KEY || "sk_gs85i0tn_ujGe15KXSh1CdlDRyVfn7VcG";

export async function convertTextToSpeech(text: string) {
    if (!text) return { success: false, error: "No text provided" };

    try {
        const client = new SarvamAIClient({
            apiSubscriptionKey: SARVAM_API_KEY
        });

        // Clean text (remove markdown for better speech)
        const cleanText = text
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/[🔧🏍️🔥📅🧠🔋📡👁️🗣️]/g, '')
            .replace(/---+/g, '')
            .trim();

        if (!cleanText) return { success: false, error: "Text became empty after cleaning" };

        const response = await client.textToSpeech.convert({
            text: cleanText,
            target_language_code: "hi-IN",
            speaker: "ritu",
            pace: 1.1,
            speech_sample_rate: 22050,
            enable_preprocessing: true,
            model: "bulbul:v3"
        });

        // The response usually contains the audio in base64 format (e.g., base64_content)
        // or directly as the response object depending on version.
        // According to Sarvam docs, it returns { audio_content: "base64String" }
        return {
            success: true,
            audio_content: (response as any).audio_content || (response as any).base64_content || null,
            error: null
        };

    } catch (error: any) {
        console.error("[Mansi TTS] Conversion Failed:", error.message);
        return { success: false, error: error.message };
    }
}
