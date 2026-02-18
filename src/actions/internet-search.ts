'use server';

/**
 * Performs a real-time web search to augment Mansi's knowledge.
 * Uses Tavily Search API.
 */
export async function searchTheWeb(query: string) {
    const apiKey = process.env.TAVILY_API_KEY;
    if (!apiKey) {
        console.warn('[Mansi Internet] Search skipped: TAVILY_API_KEY not found.');
        return null;
    }

    try {
        console.log(`[Mansi Internet] Searching for: ${query}`);

        const response = await fetch('https://api.tavily.com/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: apiKey,
                query: query,
                search_depth: "basic",
                include_answer: true,
                max_results: 3
            })
        });

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            // Format the results for context injection
            const context = data.results.map((r: any) => `${r.title}: ${r.content} (${r.url})`).join('\n\n');
            return {
                answer: data.answer,
                context: context
            };
        }

        return null;
    } catch (error: any) {
        console.error('[Mansi Internet] Search failed:', error.message);
        return null;
    }
}
