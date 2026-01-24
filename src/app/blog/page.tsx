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
                    <Badge variant="cyan" glow className="mb-4">Engineering Knowledge</Badge>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-6 tracking-tight">
                        MotoFit <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e1a] to-[#ff8a3d]">Logs</span>
                    </h1>
                    <p className="text-[#a0a0a0] max-w-2xl mx-auto text-lg leading-relaxed">
                        We don't just work on bikes; we study them. Read our deep dives into performance tuning, maintenance myths, and touring prep.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[400px]">
                    {/* Inject Instagram Card as 3rd item (index 2) */}
                    {blogs.slice(0, 2).map((blog, i) => (
                        <BlogCard key={blog.slug} blog={blog} index={i} />
                    ))}

                    <div className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-[#ff5e1a] to-[#d94e12] rounded-3xl p-8 flex flex-col justify-center text-center relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black uppercase text-white mb-2 leading-none">Get Real-Time<br />Technical Tips</h3>
                            <p className="text-white/90 text-sm mb-6 font-medium">We post daily "Quick Fix" videos and hacks. Join our 10k journey.</p>
                            <a
                                href="https://instagram.com/motofit_2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-black text-white px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors inline-block"
                            >
                                Follow @motofit_2
                            </a>
                        </div>
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    </div>

                    {blogs.slice(2).map((blog, i) => (
                        <BlogCard key={blog.slug} blog={blog} index={i + 3} />
                    ))}
                </div>
            </div>
        </main>
    );
}

function BlogCard({ blog, index }: { blog: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group relative overflow-hidden rounded-3xl border border-[#333]/50 bg-[#0a0a0a] hover:border-[#ff5e1a]/50 transition-colors duration-500
                ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''} 
                ${index === 3 ? 'md:col-span-2' : ''} 
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
                    {blog.tags.map((tag: string) => (
                        <Badge key={tag} variant="orange" size="sm">{tag}</Badge>
                    ))}
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-4 text-xs font-mono text-[#ff5e1a] mb-2 uppercase tracking-wide">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
                    </div>

                    <h2 className={`font-bold text-white mb-3 group-hover:text-[#ff5e1a] transition-colors ${index === 0 ? 'text-3xl md:text-5xl' : 'text-2xl'}`}>
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
    );
}
