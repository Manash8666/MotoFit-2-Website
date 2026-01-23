'use client';

import { blogs } from '@/data/blogs';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/graphics/Badge';

export default function TrendingLogs() {
    // Get top 3 latest blogs
    const recentBlogs = blogs.slice(0, 3);

    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Header */}
            <div className="container mx-auto px-4 md:px-8 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <Badge variant="orange" glow className="mb-4">Knowledge Base</Badge>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-[0.9]">
                        Trending <span className="text-[#ff5e1a]">Logs</span>
                    </h2>
                </div>
                <Link href="/blog" className="group flex items-center gap-2 text-[#a0a0a0] hover:text-white transition-colors font-mono uppercase text-sm tracking-widest">
                    View All Archives
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#ff5e1a]" />
                </Link>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                    {recentBlogs.map((blog, i) => (
                        <motion.div
                            key={blog.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`group relative overflow-hidden rounded-3xl border border-[#333]/50 bg-[#0a0a0a] hover:border-[#ff5e1a]/50 transition-colors duration-500
                            ${i === 0 ? 'md:col-span-2' : ''}
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

                            {/* Text */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="mb-auto flex gap-2">
                                    <Badge variant="default" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">{blog.tags[0]}</Badge>
                                </div>

                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center gap-2 text-xs font-mono text-[#ff5e1a] mb-3">
                                        <Calendar size={12} /> {blog.date}
                                    </div>
                                    <h3 className={`font-bold text-white mb-2 group-hover:text-[#ff5e1a] transition-colors leading-tight ${i === 0 ? 'text-3xl' : 'text-xl'}`}>
                                        {blog.title}
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
