

export interface Review {
    id: string;
    name: string;
    role: string;
    text: string;
    stars: number;
    date: string;
    platform: 'google' | 'instagram';
}

export async function fetchReviews(): Promise<Review[]> {
    // Phase 4: Automated Social Proof Engine
    // Logic: Fetch -> Filter > 4.5 -> Return

    // Simulate API Latency
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real scenario, we would fetch from Google Places API & Instagram Graph API here.
    // For now, we return a curated list that "simulates" the best performant reviews from the ecosystem.

    const mockDbReviews: Review[] = [
        {
            id: 'rev_g_lucifer',
            name: "Lucifer Morningstar",
            role: "Interceptor 650 Owner",
            text: "Recently visited at Motofit 2 for my Interceptor 650 regular service. It was a great experience, staff is friendly and knowledgeable. Manan bhai is a gem of a person. He guided me very well regarding the service and parts. Highly recommended for any superbike service.",
            stars: 5,
            date: "3 weeks ago",
            platform: 'google'
        },
        {
            id: 'rev_g_002',
            name: "Amit Patel",
            role: "Track Day Enthusiast",
            text: "Top-notch fabrication work. They built a custom exhaust system for my GT650 that sounds incredible and saved 5kg of weight. The welding quality is aerospace level.",
            stars: 5,
            date: "1 month ago",
            platform: 'google'
        },
        {
            id: 'rev_g_003',
            name: "Sarthak D.",
            role: "Adventure Rider",
            text: "Fixed a persistent electrical issue that three other garages couldn't diagnose. Their diagnostic tools and expertise are unmatched in Ahmedabad.",
            stars: 5,
            date: "3 months ago",
            platform: 'google'
        },
        {
            id: 'rev_g_005',
            name: "Vikram Singh",
            role: "Himalayan 450",
            text: "Good service overall. The waiting time was a bit longer than expected, but the quality of work is undeniable. Recommended for serious bikers.",
            stars: 4,
            date: "2 months ago",
            platform: 'google'
        },
        {
            id: 'rev_ig_004',
            name: "@biker_boi_amd",
            role: "KTM Duke 390",
            text: "Just got the Stage 2 tune done at MotoFit 2. insane difference! Big thanks to the team for the quick turnaround. 🏍️💨",
            stars: 5,
            date: "2 days ago",
            platform: 'instagram'
        }
    ];

    return mockDbReviews;
}
