const OpenAI = require('openai');

const key = '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';

const client = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: key,
});

async function test() {
    try {
        console.log("Testing OpenRouter...");
        const completion = await client.chat.completions.create({
            model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
            messages: [{ role: 'user', content: 'Hello' }],
        });
        console.log("Success:", completion.choices[0].message.content);
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
