import { NextResponse } from 'next/server';
import { seedNeuralKnowledge } from '@/actions/mansi-neural-seeder';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const secret = searchParams.get('secret');

        // Basic security check to prevent unauthorized seeding costs
        if (secret !== process.env.OLLAMA_API_KEY?.substring(0, 10)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Start seeding in background (don't wait for it to finish as it might take time)
        // Note: In Vercel, serverless functions might time out. 
        // For a full 1000 credit run, this should be triggered multiple times or run locally.
        const result = await seedNeuralKnowledge();

        return NextResponse.json({
            message: 'Neural Seeding Complete',
            ...result
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
