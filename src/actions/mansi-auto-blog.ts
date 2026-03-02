'use server';

import OpenAI from 'openai';
import { sql } from '@vercel/postgres';

export async function generateTrendingBlog(topic: string) {
    // 1. Prompt the LLM
    const prompt = `
You are Akshat Mohanty, the master mechanical engineer at MotoFit Ahmedabad. 
Write a highly technical, engaging 800+ word blog post about the following topic: "${topic}".
The blog must be formatted in clean HTML (not markdown). 
Use <h2> and <h3> tags for headers, <ul>/<li> for lists, and <p> for paragraphs. 
Make sure the tone is a mix between an engineering lecture and an edgy mechanic.

Return ONLY a valid JSON object matching this schema exactly (no markdown block wrappers around the JSON):
{
  "title": "A catchy, aggressive title",
  "excerpt": "A short 2-sentence hook for the blog card",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "image": "A generic Unsplash motorcycle image URL fitting the topic",
  "content": "The full HTML string of the blog content"
}`;

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("Missing LLM API Key");

    const client = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey,
        defaultHeaders: { "HTTP-Referer": "https://motofit.in", "X-Title": "MotoFit Auto-Blog" }
    });

    try {
        console.log(`[Auto-Blog] Synthesizing article on: ${topic}`);
        const completion = await client.chat.completions.create({
            model: "google/gemini-2.0-flash-001", // Using Flash for speed and high reasoning capability
            messages: [{ role: "system", content: prompt }],
            temperature: 0.8,
            max_tokens: 3000,
            response_format: { type: "json_object" }
        });

        const reply = completion.choices[0]?.message?.content;
        if (!reply) throw new Error("No payload returned from generator");

        // 2. Parse JSON
        const data = JSON.parse(reply);

        // Ensure data consistency
        const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const readTime = Math.ceil(data.content.split(' ').length / 200) + " min read";

        // 3. Save to Neon Postgres
        await sql`
            INSERT INTO mansi_blogs (slug, title, excerpt, author, date, read_time, image, tags, content)
            VALUES (${slug}, ${data.title}, ${data.excerpt}, 'Mansi (AI generated)', ${date}, ${readTime}, ${data.image}, ${JSON.stringify(data.tags)}, ${data.content})
            ON CONFLICT (slug) DO NOTHING;
        `;

        console.log(`[Auto-Blog] Deployed article to database: ${slug}`);
        return { success: true, slug };

    } catch (e: any) {
        console.error("[Auto-Blog] Generator Error:", e.message);
        return { success: false, error: e.message };
    }
}
