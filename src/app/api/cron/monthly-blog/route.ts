import { NextRequest, NextResponse } from 'next/server';
import { generateTrendingBlog } from '@/actions/mansi-auto-blog';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow sufficient time for AI blog drafting & DB storage

const TOPIC_ROTATION = [
    "Why 15W-50 Synthetic Oil is Mandatory for Royal Enfield & KTM in Ahmedabad 45°C Summer Heat",
    "How E20 Petrol Melts Carburetor Rubber Seals & The MotoFit 2 Survival Treatment",
    "Sintered vs Organic Brake Pads: Real Stopping Distance Science on New CG Road",
    "Dyno Tuning the Interceptor 650: Unlocking 54 BHP and Mid-Range Torque Without Overheating",
    "The 60-Point Pre-Monsoon Motorcycle Survival Protocol for Ahmedabad Waterlogging",
    "Gold O-Ring vs Heavy Duty Chain Sprocket Kits: How Gujarat Dust Destroys Drivetrains"
];

export async function GET(req: NextRequest) {
    try {
        // Authorize Vercel Cron or manual admin trigger
        const authHeader = req.headers.get('authorization');
        const cronSecret = process.env.CRON_SECRET;
        if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
            // Check if request is from localhost / internal development
            const host = req.headers.get('host') || '';
            if (!host.includes('localhost') && !host.includes('127.0.0.1')) {
                return NextResponse.json({ error: 'Unauthorized cron trigger' }, { status: 401 });
            }
        }

        // Pick topic based on month index (0-11)
        const monthIndex = new Date().getMonth();
        const selectedTopic = TOPIC_ROTATION[monthIndex % TOPIC_ROTATION.length];

        console.log(`[Monthly Blog Cron] Starting automated generation for topic: "${selectedTopic}"`);
        const blogResult = await generateTrendingBlog(selectedTopic);

        if (!blogResult.success) {
            return NextResponse.json({
                success: false,
                topic: selectedTopic,
                error: blogResult.error
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            timestamp: new Date().toISOString(),
            topic: selectedTopic,
            blog: {
                title: blogResult.title,
                slug: blogResult.slug
            }
        });
    } catch (error: any) {
        console.error('[Monthly Blog Cron] Error generating automated blog:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Unknown error during blog generation' },
            { status: 500 }
        );
    }
}
