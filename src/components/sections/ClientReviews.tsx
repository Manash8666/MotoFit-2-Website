'use client';

import Script from 'next/script';
import { Star } from 'lucide-react';
import { Review } from '@/actions/reviews';

interface ClientReviewsProps {
    initialReviews?: Review[];
}

export default function ClientReviews({ initialReviews }: ClientReviewsProps) {
    // Elfsight Widget Implementation
    return (
        <section className="relative py-32 bg-[#050505] overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-6 font-heading">
                        Rider <span className="text-[#ff5e1a]">Feedback</span>
                    </h2>
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <span className="text-[#ff5e1a] font-bold text-xl">4.9</span>
                        <div className="flex text-[#ff5e1a]">
                            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                        </div>
                        <span className="text-[#666] text-sm">(127+ Google Reviews)</span>
                    </div>
                </div>

                {/* Elfsight Google Reviews Widget */}
                <div className="min-h-[400px]">
                    <div className="elfsight-app-42b4bea5-d44e-4003-9368-4c91bb82c076" data-elfsight-app-lazy></div>
                </div>

                <Script
                    src="https://elfsightcdn.com/platform.js"
                    strategy="lazyOnload"
                />

            </div>
        </section>
    );
}
