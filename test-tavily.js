require('dotenv').config({ path: '.env.local' });
const { tavily } = require('@tavily/core');

async function testTavily() {
    const apiKey = process.env.TAVILY_API_KEY;
    console.log('Using API Key:', apiKey ? 'Loaded' : 'Missing');

    if (!apiKey) return;

    try {
        const client = tavily({ apiKey });
        console.log('Searching for "Mansi MotoFit"...');
        const results = await client.search("Mansi MotoFit 2 Ahmedabad", {
            searchDepth: "basic"
        });
        console.log('Search successful! Found results:', results.results.length);
        console.log('Credit usage should now be at least 1.');
    } catch (e) {
        console.error('Tavily Error:', e.message);
    }
}

testTavily();
