'use client';

import { blogs } from '@/data/blogs';
import { Badge } from '@/components/ui/graphics/Badge';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock, User } from 'lucide-react';

export default function BlogIndex() {
    return (
        <main className="min-h-screen bg-[#050505] pt-24 pb-12 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Alignment: H1 Center */}
                <div className="text-center mb-16">
                    <Badge variant="cyan" glow className="mb-4">Content Engine</Badge>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-6 tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e1a] to-[#ff8a3d]">Garage</span> Logs
                    </h1>
                    <p className="text-[#a0a0a0] max-w-2xl mx-auto text-lg leading-relaxed">
                        Technical deep dives, maintenance protocols, and riding culture. Authored by the engineers at MotoFit 2.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[400px]">
                    {blogs.map((blog, i) => (
                        <motion.div
                            key={blog.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`group relative overflow-hidden rounded-3xl border border-[#333]/50 bg-[#0a0a0a] hover:border-[#ff5e1a]/50 transition-colors duration-500
                ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''} // Feature first post
                ${i === 3 ? 'md:col-span-2' : ''} // Wide post
              `}
                        >
                            <Link href={`/blog/${blog.slug}`} className="absolute inset-0 z-20" />

                            {/* Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-40"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-[#050505]/50 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="mb-auto flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-4 group-hover:translate-y-0">
                                    {blog.tags.map(tag => (
                                        <Badge key={tag} variant="orange" size="sm">{tag}</Badge>
                                    ))}
                                </div>

                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center gap-4 text-xs font-mono text-[#ff5e1a] mb-2 uppercase tracking-wide">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
                                    </div>

                                    {/* Alignment: H1 Center (Global), but Headings inside cards Left (for scanability) */}
                                    <h2 className={`font-bold text-white mb-3 group-hover:text-[#ff5e1a] transition-colors ${i === 0 ? 'text-3xl md:text-5xl' : 'text-2xl'}`}>
                                        {blog.title}
                                    </h2>

                                    <p className="text-gray-400 line-clamp-2 text-sm md:text-base">
                                        {blog.excerpt}
                                    </p>

                                    <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        <span className="text-xs font-mono text-gray-500">{blog.author}</span>
                                        <div className="bg-[#ff5e1a] p-2 rounded-full text-white">
                                            <ArrowUpRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
