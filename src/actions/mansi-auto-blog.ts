'use server';

import OpenAI from 'openai';
import { sql } from '@vercel/postgres';

// High-resolution, SEO-compliant motorcycle workshop and superbike photography
const CURATED_IMAGES: Record<string, string> = {
    oil: "/images/parts/motul_oil.jpg",
    engine: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
    dyno: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    exhaust: "/images/parts/titanium_exhaust.jpg",
    suspension: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80",
    accident: "https://images.unsplash.com/photo-1571188654249-7a9021e06915?auto=format&fit=crop&w=1200&q=80",
    rebuild: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    default: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80"
};

function pickBestImage(topic: string): string {
    const lower = topic.toLowerCase();
    for (const [key, url] of Object.entries(CURATED_IMAGES)) {
        if (key !== 'default' && lower.includes(key)) {
            return url;
        }
    }
    return CURATED_IMAGES.default;
}

/**
 * 📈 Upgraded Mansi Blog Engine
 * Powered by:
 * - EdoStra/Marketing-for-Founders (Founder authority, technical differentiation, social proof)
 * - coreyhaines31/marketingskills (PAS, Hook-Story-Offer, Skimmability, Conversion CTAs, Featured Snippet targeting)
 * - Qwen 2.5/3 + DeepSeek-V3 + Gemini Multi-Model Chain
 */
export async function generateTrendingBlog(topic: string) {
    const bestImageUrl = pickBestImage(topic);

    const prompt = `
# SYSTEM ROLE:
You are Mansi, the sharp, 22-year-old Gujarati digital mechanic at MotoFit 2 in Chandkheda, Ahmedabad, co-authoring with Akshat Mohanty (Master Mechanical Engineer & Founder).

# MISSION:
Write an authoritative, high-converting, 900+ word engineering blog post about: "${topic}".
Follow the proven frameworks from "Marketing for Founders" and "marketingskills":
1. HOOK: Visceral, provocative opening exposing common roadside mechanic myths and costly mistakes.
2. FEATURED SNIPPET BOX (<div style="background: rgba(255, 94, 26, 0.08); border-left: 4px solid #ff5e1a; padding: 1rem; margin: 1.5rem 0;">): A concise 50-word TL;DR answering the core search intent for Google's featured snippet.
3. PROBLEM & AGITATION (PAS Framework): Explain why delaying this repair or using roadside "jugaad" (loose hammering, cheap 20W40 oil, fake spark plugs) causes 10x more damage under Ahmedabad's brutal 45°C summer heat and New CG Road construction dust.
4. ENGINEERING BREAKDOWN: Deep, precise technical explanation with exact specs:
   - Torque values in Nm (e.g., 12 Nm, 25 Nm)
   - Tolerances in mm (e.g., 0.05 mm, 0.10 mm feeler gauge clearance)
   - Fluid viscosities (e.g., Motul 300V 15W50 ester core)
   - Real chassis / dyno metrics from our Dynojet 250i bay.
5. LOCAL CONTEXT: Relate directly to Ahmedabad roads (SG Highway high-speed wobble, Visat junction traffic thermal soak, monsoon water wading).
6. SOCIAL PROOF: Mention real builds at MotoFit 2 (like our 235cc Big Bore Pulsar NS 200, RE 650 Twins valve shimming, or KTM 390 heat optimization).
7. HIGH-CONVERTING FOUNDER CTA BOX (<div style="background: #111; border: 1px solid #ff5e1a; border-radius: 12px; padding: 1.5rem; margin-top: 2.5rem; text-align: center;">):
   - Mention the 1-Year Engine Guarantee.
   - Highlight the active 5% discount code: <strong>MOTOFIT-RIDER-5</strong>.
   - Include a direct link to WhatsApp: <a href="https://wa.me/917259625881?text=Hi%20Akshat,%20I%20read%20your%20blog%20about%20${encodeURIComponent(topic)}%20and%20want%20to%20book%20an%20inspection%20with%20code%20MOTOFIT-RIDER-5" style="display: inline-block; background: #ff5e1a; color: white; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; margin-top: 10px;">WhatsApp Akshat to Book (+91 72596 25881)</a>
   - Mention workshop address: Shop No 9, Kirtan Complex, Chandkheda, Ahmedabad.
8. FAQ SECTION: 3 structured questions and answers at the end.

# FORMATTING:
Return ONLY a valid JSON object matching this schema exactly (no markdown code fences around the JSON):
{
  "title": "A high-CTR, aggressive engineering title (under 65 chars)",
  "excerpt": "A magnetic 2-sentence hook highlighting the mechanical stakes and solution",
  "tags": ["3-5 targeted SEO tags"],
  "image": "${bestImageUrl}",
  "content": "The full clean HTML string with <h2>, <h3>, <p>, <ul>, <li>, and the styled boxes above"
}`;

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("Missing LLM API Key");

    const client = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey,
        defaultHeaders: { "HTTP-Referer": "https://motofit.in", "X-Title": "MotoFit Marketing Blog Engine" }
    });

    // Multi-Model Fallback Chain featuring DeepSeek-V3 and Qwen
    const MODEL_CHAIN = [
        "google/gemini-2.0-flash-001",
        "deepseek/deepseek-chat", // DeepSeek-V3
        "qwen/qwen-2.5-72b-instruct", // Qwen 2.5
        "openai/gpt-4o-mini"
    ];

    let lastError: string = "Unknown error";

    for (const model of MODEL_CHAIN) {
        try {
            console.log(`[Marketing Blog Engine] 🚀 Generating via: ${model} | Topic: ${topic}`);
            const completion = await client.chat.completions.create({
                model,
                messages: [{ role: "system", content: prompt }],
                temperature: 0.75,
                max_tokens: 3800,
                response_format: { type: "json_object" }
            });

            let reply = completion.choices[0]?.message?.content;
            if (!reply) throw new Error("No payload returned from generator");

            // Strip any <think> tags if originating from reasoning models
            reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

            // Parse JSON
            const data = JSON.parse(reply);

            // Ensure data consistency
            const slug = (data.title || topic)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');

            const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const wordCount = data.content ? data.content.split(/\s+/).length : 850;
            const readTime = Math.ceil(wordCount / 200) + " min read";
            const author = "Mansi & Akshat Mohanty";

            // Save to Neon Postgres
            await sql`
                INSERT INTO mansi_blogs (slug, title, excerpt, author, date, read_time, image, tags, content)
                VALUES (
                    ${slug}, 
                    ${data.title}, 
                    ${data.excerpt}, 
                    ${author}, 
                    ${date}, 
                    ${readTime}, 
                    ${data.image || bestImageUrl}, 
                    ${JSON.stringify(data.tags || ['MotoFit 2', 'Engineering', 'Ahmedabad'])}, 
                    ${data.content}
                )
                ON CONFLICT (slug) DO UPDATE SET
                    title = EXCLUDED.title,
                    excerpt = EXCLUDED.excerpt,
                    content = EXCLUDED.content,
                    tags = EXCLUDED.tags;
            `;

            console.log(`[Marketing Blog Engine] ✅ Successfully Published & Synced: /blog/${slug}`);
            return { success: true, slug, title: data.title };

        } catch (e: any) {
            lastError = e.message || String(e);
            console.warn(`[Marketing Blog Engine] Model ${model} failed: ${lastError}. Trying next...`);
            await new Promise(r => setTimeout(r, 600));
        }
    }

    console.error("[Marketing Blog Engine] All models failed. Last error:", lastError);
    return { success: false, error: lastError };
}
