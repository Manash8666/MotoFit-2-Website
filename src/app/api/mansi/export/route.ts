import { NextResponse } from 'next/server';
import { extractNeuralDataset } from '@/lib/mansi/neural-extractor';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const format = (searchParams.get('format') as 'sharegpt' | 'alpaca') || 'sharegpt';

        // In a real production app, you would add an API key check here
        // const apiKey = request.headers.get('x-api-key');
        // if (apiKey !== process.env.ADMIN_SECRET) return ...

        const dataset = await extractNeuralDataset(format);

        return NextResponse.json({
            count: dataset.length,
            format: format,
            timestamp: new Date().toISOString(),
            data: dataset
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Content-Disposition': `attachment; filename="mansi_training_data_${format}.json"`
            }
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
