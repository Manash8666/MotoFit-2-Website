'use server';

import { SarvamAIClient } from "sarvamai";
import OpenAI from "openai";
import { IndicNLP } from "@/services/mansi/nlp/indic-intel";

const SARVAM_API_KEY = process.env.SARVAM_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export interface TTSOptions {
    preferredLanguage?: 'gu-IN' | 'hi-IN' | 'en-IN';
    emotion?: 'anxious_breakdown' | 'enthusiastic_tuning' | 'casual_banter' | 'skeptical_pricing';
}

/**
 * Clean text for high-fidelity speech synthesis.
 * Removes markdown, technical symbols, emojis, and normalizes Amdavadi words.
 */
function sanitizeForSpeech(rawText: string): string {
    return rawText
        .replace(/<think>[\s\S]*?<\/think>/g, '') // Strip reasoning tags
        .replace(/\*\*(.*?)\*\*/g, '$1')           // Strip bold markdown
        .replace(/\*(.*?)\*/g, '$1')             // Strip italic markdown
        .replace(/`{1,3}[\s\S]*?`{1,3}/g, '')    // Strip code blocks
        .replace(/https?:\/\/\S+/g, '')          // Strip links
        .replace(/[🔧🏍️🔥📅🧠🔋📡👁️🗣️⚡🎉🛑⭐💙🚨🛒📚]/g, '') // Strip common emojis
        .replace(/---+/g, '')                    // Strip horizontal rules
        .replace(/\[SENTIMENT:.*?\]/g, '')       // Strip sentiment tokens
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Automatically determine the best Indic speech language code (gu-IN vs hi-IN vs en-IN).
 * Inspired by AI4Bharat IndicNLP language identification.
 */
function detectSpeechLanguage(text: string): 'gu-IN' | 'hi-IN' | 'en-IN' {
    const lower = text.toLowerCase();
    const gujaratiMarkers = ['kem', 'cho', 'su', 'che', 'nathi', 'locha', 'baka', 'thase', 'kare', 'avvu', 'chalu', 'kadak', 'paisa'];
    const hindiMarkers = ['kya', 'hai', 'nahi', 'bhai', 'kaise', 'kitna', 'hoga', 'mera', 'meri', 'karo', 'suno'];

    const gujScore = gujaratiMarkers.filter(m => lower.includes(m)).length;
    const hinScore = hindiMarkers.filter(m => lower.includes(m)).length;

    if (gujScore > 0 && gujScore >= hinScore) return 'gu-IN';
    if (hinScore > 0) return 'hi-IN';
    return 'hi-IN'; // Default Indian bilingual
}

/**
 * Calculate dynamic speech prosody based on conversational emotion (KuralHub SER inspired).
 */
function getSpeechProsody(emotion?: string): { pace: number; pitch: number; speaker: string } {
    if (emotion === 'anxious_breakdown') {
        // Calm, steady, grounding reassurance for accident/breakdown
        return { pace: 0.95, pitch: 0.98, speaker: "ritu" };
    }
    if (emotion === 'enthusiastic_tuning') {
        // Energetic, punchy petrolhead speed
        return { pace: 1.15, pitch: 1.08, speaker: "ritu" };
    }
    if (emotion === 'skeptical_pricing') {
        // Authoritative, firm mechanical honesty
        return { pace: 1.02, pitch: 1.0, speaker: "ritu" };
    }
    // Default witty Amdavadi banter
    return { pace: 1.08, pitch: 1.04, speaker: "ritu" };
}

export async function convertTextToSpeech(text: string, options?: TTSOptions) {
    if (!text) return { success: false, error: "No text provided" };

    const cleanText = sanitizeForSpeech(text);
    if (!cleanText) return { success: false, error: "Text became empty after cleaning" };

    const targetLang = options?.preferredLanguage || detectSpeechLanguage(cleanText);
    const emotionAnalysis = IndicNLP.analyzeEmotionAndDialect(cleanText);
    const effectiveEmotion = options?.emotion || emotionAnalysis.sentiment;
    const prosody = getSpeechProsody(effectiveEmotion);

    // ── TIER 1: SARVAM AI BULBUL V3 (Indic Neural Core) ──
    if (SARVAM_API_KEY) {
        try {
            console.log(`[Mansi TTS] 🎙️ Generating Indic Speech (${targetLang}, emotion: ${effectiveEmotion})...`);
            const client = new SarvamAIClient({
                apiSubscriptionKey: SARVAM_API_KEY
            });

            const response = await client.textToSpeech.convert({
                text: cleanText,
                target_language_code: targetLang,
                speaker: prosody.speaker as any,
                pace: prosody.pace,
                speech_sample_rate: 22050,
                enable_preprocessing: true,
                model: "bulbul:v3"
            });

            const audioContent = (response as any).audio_content || (response as any).base64_content || null;
            if (audioContent) {
                return {
                    success: true,
                    audio_content: audioContent,
                    format: "audio/wav",
                    language: targetLang,
                    model_used: `sarvam/bulbul:v3 (${targetLang})`,
                    error: null
                };
            }
        } catch (error: any) {
            console.warn(`[Mansi TTS] Sarvam Bulbul Failed (${error.message}), falling back to OpenAI TTS...`);
        }
    }

    // ── TIER 2: OPENAI AUDIO TTS FALLBACK (nova model with Indian english/hindi cadence) ──
    if (OPENAI_API_KEY) {
        try {
            console.log(`[Mansi TTS] 🎙️ Fallback to OpenAI TTS (nova)...`);
            const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
            const mp3 = await openai.audio.speech.create({
                model: "tts-1",
                voice: "nova", // High-clarity female voice matching Mansi's persona
                input: cleanText,
                speed: prosody.pace
            });

            const buffer = Buffer.from(await mp3.arrayBuffer());
            const base64Audio = buffer.toString('base64');

            return {
                success: true,
                audio_content: base64Audio,
                format: "audio/mp3",
                language: targetLang,
                model_used: "openai/tts-1-nova",
                error: null
            };
        } catch (error: any) {
            console.warn(`[Mansi TTS] OpenAI TTS Failed:`, error.message);
        }
    }

    // ── TIER 3: CLIENT FALLBACK SIGNAL ──
    return {
        success: false,
        error: "Server TTS unavailable, trigger client speech synthesis.",
        shouldFallbackToBrowser: true,
        detectedLang: targetLang,
        cleanText
    };
}
