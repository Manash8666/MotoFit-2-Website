'use server';

const getTavilyClient = async () => {
    const apiKey = process.env.TAVILY_API_KEY;
    if (!apiKey) {
        console.warn('[Mansi Internet] API Key missing.');
        return null;
    }
    const { tavily } = await import('@tavily/core');
    return tavily({ apiKey });
};

/**
 * Performs a real-time web search.
 */
export async function searchTheWeb(query: string) {
    const client = await getTavilyClient();
    if (!client) return null;

    try {
        console.log(`[Mansi Internet] Searching: ${query}`);
        const response = await client.search(query, {
            searchDepth: "advanced",
            includeAnswer: true,
            maxResults: 5
        });

        if (response.results && response.results.length > 0) {
            const context = response.results.map((r: any) => `${r.title}: ${r.content} (${r.url})`).join('\n\n');
            return {
                answer: response.answer,
                context: context,
                urls: response.results.map((r: any) => r.url)
            };
        }
        return null;
    } catch (error: any) {
        console.error('[Mansi Internet] Search failed:', error.message);
        return null;
    }
}

/**
 * Deep Extraction logic for specific URLs found during search (e.g., Reddit/YouTube).
 */
/*
export async function extractDeepContext(urls: string[]) {
    const client = await getTavilyClient();
    if (!client) return null;

    try {
        console.log(`[Mansi Internet] Extracting deep context from ${urls.length} sources...`);
        // @ts-ignore
        const response = await client.extract(urls);

        // Extracting text content from the results
        const context = response.results.map((r: any) => `SOURCE: ${r.url}\nCONTENT: ${r.rawContent || r.content}`).join('\n\n---\n\n');
        return context;
    } catch (error: any) {
        console.error('[Mansi Internet] Extraction failed:', error.message);
        return null;
    }
}

export async function crawlSite(url: string) {
    const client = await getTavilyClient();
    if (!client) return null;

    try {
        console.log(`[Mansi Internet] Crawling: ${url}`);
        // @ts-ignore
        const response = await client.crawl(url, {
            extractDepth: "advanced",
            maxPages: 3
        });
        return response;
    } catch (error: any) {
        console.error('[Mansi Internet] Crawl failed:', error.message);
        return null;
    }
}
*/
