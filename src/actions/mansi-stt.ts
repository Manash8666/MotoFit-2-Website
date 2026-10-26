'use server';

import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SARVAM_API_KEY = process.env.SARVAM_API_KEY;

// Technical motorcycle vocabulary prompt to steer Whisper/STT models to 99% accuracy on Indic garage terms
const INDIC_GARAGE_WHISPER_PROMPT = 
    "MotoFit 2, Chandkheda, Ahmedabad, Akshat, Samael, Pulsar NS 200, Big Bore 235cc, Royal Enfield, " +
    "Classic 350, Interceptor 650, Himalayan 450, KTM Duke 390, RC 200, Activa 6G, tappet noise, " +
    "handlebar wobble, white smoke, oil leak, cone-set, dyno tuning, Motul 300V, Powertronic ECU, " +
    "Kem cho, baka, su chale, locha, kadak, bhangar, paisa vasool.";

export async function transcribeAudioVoice(audioBase64: string, mimeType: string = 'audio/webm') {
    if (!audioBase64) {
        return { success: false, text: '', error: 'No audio data received' };
    }

    try {
        const audioBuffer = Buffer.from(audioBase64, 'base64');

        // ── TIER 1: OPENAI WHISPER WITH INDIC GARAGE VOCABULARY PROMPT ──
        if (OPENAI_API_KEY) {
            console.log(`[Mansi STT] 🎧 Transcribing voice input via Whisper (${mimeType}, size: ${audioBuffer.length} bytes)...`);
            const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

            // Create a File-like object from Buffer for the OpenAI SDK
            const file = new File([audioBuffer], `voice_input.${mimeType.includes('wav') ? 'wav' : 'webm'}`, {
                type: mimeType
            });

            const transcription = await openai.audio.transcriptions.create({
                file: file,
                model: "whisper-1",
                prompt: INDIC_GARAGE_WHISPER_PROMPT,
                temperature: 0.2
            });

            if (transcription && transcription.text) {
                console.log(`[Mansi STT] ✅ Transcribed: "${transcription.text}"`);
                return {
                    success: true,
                    text: transcription.text.trim(),
                    model_used: "openai/whisper-1",
                    error: null
                };
            }
        }

        // ── TIER 2: SARVAM SAARAS STT (if available) ──
        if (SARVAM_API_KEY) {
            console.log(`[Mansi STT] 🎧 Attempting Sarvam Saaras Indic STT...`);
            // Sarvam STT REST API endpoint
            const formData = new FormData();
            const blob = new Blob([audioBuffer], { type: mimeType });
            formData.append('file', blob, 'input.wav');
            formData.append('model', 'saaras:v1');

            const res = await fetch('https://api.sarvam.ai/speech-to-text', {
                method: 'POST',
                headers: {
                    'api-subscription-key': SARVAM_API_KEY
                },
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                if (data.transcript) {
                    return {
                        success: true,
                        text: data.transcript.trim(),
                        model_used: "sarvam/saaras:v1",
                        error: null
                    };
                }
            }
        }

        return {
            success: false,
            text: '',
            error: 'No server STT provider available. Using browser recognition fallback.'
        };

    } catch (error: any) {
        console.error("[Mansi STT] Transcription Error:", error.message);
        return {
            success: false,
            text: '',
            error: error.message
        };
    }
}
