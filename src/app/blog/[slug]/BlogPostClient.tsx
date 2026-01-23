'use client';

import { Badge } from '@/components/ui/graphics/Badge';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, User, Calendar, Clock, Share2 } from 'lucide-react';
import type { BlogPost } from '@/data/blogs';

export default function BlogPostClient({ blog }: { blog: BlogPost }) {
    return (
        <main className="min-h-screen bg-[#050505] pb-24 relative overflow-hidden">
            {/* Progress Bar (Simulated or Real, opting for simple scroll reading here) */}

            {/* Hero */}
            <div className="relative h-[60vh] md:h-[80vh] w-full">
                <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 md:px-8 pb-12">
                    <Link href="/blog" className="inline-flex items-center text-[#ff5e1a] mb-6 hover:-translate-x-1 transition-transform font-mono text-sm">
                        <ArrowLeft size={16} className="mr-2" /> BACK TO LOGS
                    </Link>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {blog.tags.map(tag => (
                            <Badge key={tag} variant="orange" glow>{tag}</Badge>
                        ))}
                    </div>

                    {/* Alignment: H1 Center - As requested globally */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase mb-8 max-w-4xl leading-[0.9]">
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-6 text-sm font-mono text-gray-400 border-t border-[#333] pt-6 max-w-2xl">
                        <span className="flex items-center gap-2 text-white">
                            <User size={16} className="text-[#ff5e1a]" /> {blog.author}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar size={16} /> {blog.date}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock size={16} /> {blog.readTime}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <article className="container mx-auto px-4 md:px-8 max-w-3xl pt-12">
                <div className="prose prose-invert prose-lg max-w-none 
                prose-h2:text-white prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-left
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-left
                prose-li:text-gray-300 prose-li:text-left
                prose-strong:text-[#ff5e1a]
                marker:text-[#ff5e1a]
            ">
                    <p className="lead text-xl md:text-2xl text-white font-light italic mb-12 border-l-4 border-[#ff5e1a] pl-6">
                        {blog.excerpt}
                    </p>

                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>

                <div className="mt-20 pt-12 border-t border-[#333] flex justify-between items-center">
                    <p className="font-mono text-gray-500 uppercase text-sm">Share this article</p>
                    <div className="flex gap-4">
                        <button className="p-3 rounded-full bg-[#1a1a1a] text-white hover:bg-[#ff5e1a] transition-colors">
                            <Share2 size={20} />
                        </button>
                        {/* Add more social buttons if needed */}
                    </div>
                </div>
            </article>

        </main>
    );
}
