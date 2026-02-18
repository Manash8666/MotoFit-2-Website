require('dotenv').config({ path: '.env.local' });
const { tavily } = require('@tavily/core');
const { OpenAI } = require('openai');
const { neon } = require('@neondatabase/serverless');

// Topics to Harvest
const TOPICS = [
    "Royal Enfield Continental GT 650 tappet adjustment and shims guide India",
    "Best cafe racer shops in Ahmedabad specialized in RE repairs",
    "Common throttle body cleaning issues in BS6 fuel injected bikes India",
    "Hinglish and Gujarati mechanic slang for engine sounds in Ahmedabad",
    "MotoGP Bharat performance analysis and Indian rider scene 2024",
    "Yamaha R15 V4 vs KTM RC 390 technical comparison for Indian tracks",
    "How to manage motorcycle engine overheating in Ahmedabad 45C summers",
    "Chandkheda Ahmedabad local youth lifestyle, cafes, and biker hangouts",
    "Fake vs Real Motul 300V engine oil identification in Indian local shops",
    "Best rainy season bike maintenance for Ahmedabad waterlogged roads",
    "Popular bike modifications legal vs illegal as per RTO Ahmedabad 2024",
    "Royal Enfield Himalayan 450 long term reliability reviews from India",
    "Triumph Speed 400 service costs and spare quality in Gujarat",
    "How to ride a cafe racer for long distances on Indian highways",
    "Ahmedabad biker groups and Sunday ride culture 2024",
    "Helmet ECE 22.06 vs ISI standards for high speed riding in India",
    "Chain maintenance best practices for dusty Ahmedabad environment",
    "DIY coolant flush for liquids cooled bikes like Duke 390 in India",
    "Top 10 scenic riding routes within 200km of Ahmedabad",
    "Mansi persona research: How a 22yo Ahmedabad mechanic girl would talk about Greasy hands"
];

async function startHarvest() {
    console.log('🚀 INITIALIZING NEURAL HARVEST (Pulse Mode)');

    const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });
    const openai = new OpenAI({ apiKey: process.env.OPENROUTER_API_KEY, baseURL: "https://openrouter.ai/api/v1" });
    const sql = neon(process.env.POSTGRES_URL); // Using POSTGRES_URL from env

    let count = 0;

    for (const topic of TOPICS) {
        try {
            console.log(`\n🔍 Researching: ${topic}...`);
            const search = await tavilyClient.search(topic, { searchDepth: "advanced", maxResults: 3 });

            console.log(`🧠 Synthesizing Mansi Experience...`);
            const completion = await openai.chat.completions.create({
                model: "google/gemini-2.0-flash-exp:free",
                messages: [
                    { role: "system", content: "You are MANSI, a 22yo Ahmedabad mechanic girl (Hinglish/Gujarati). Based on the context provided, write a sassy, technical response to this topic as if a user asked you." },
                    { role: "user", content: `Context: ${search.results.map(r => r.content).join(' ')}\n\nTopic: ${topic}` }
                ]
            });

            const response = completion.choices[0].message.content;

            console.log(`💾 Saving to Neural Memory...`);
            await sql`
                INSERT INTO mansi_learning (user_query, mansi_response, model_used, metadata)
                VALUES (${topic}, ${response}, 'gemini-harvest-standalone', ${JSON.stringify({ seeder: 'local-pulse', research_links: search.results.map(r => r.url) })})
            `;

            count++;
            console.log(`✅ Success (${count}/${TOPICS.length})`);
        } catch (e) {
            console.error(`❌ Failed: ${topic}`, e.message);
        }
    }

    console.log(`\n🎉 HARVEST COMPLETE! Seeded ${count} high-fidelity memories.`);
}

if (!process.env.POSTGRES_URL) {
    console.error('❌ Error: POSTGRES_URL missing in .env.local');
} else {
    startHarvest();
}
