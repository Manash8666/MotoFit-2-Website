'use server';

import { sql } from '@vercel/postgres';
import { blogs as staticBlogs, BlogPost } from '@/data/blogs';

export async function getAllBlogs(): Promise<BlogPost[]> {
    try {
        const { rows } = await sql`SELECT * FROM mansi_blogs ORDER BY id DESC`;

        // Map DB rows to BlogPost type
        const dynamicBlogs: BlogPost[] = rows.map(r => ({
            slug: r.slug,
            title: r.title,
            excerpt: r.excerpt,
            author: r.author,
            date: r.date,
            readTime: r.read_time,
            image: r.image,
            tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : (r.tags || []),
            content: r.content
        }));

        // Merge dynamic blogs cleanly at the top
        return [...dynamicBlogs, ...staticBlogs];
    } catch (e: any) {
        console.error("[Get-Blogs] Error pulling DB blogs:", e.message);
        return staticBlogs; // Fallback to safe static blogs
    }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
        // Check dynamic DB first
        const { rows } = await sql`SELECT * FROM mansi_blogs WHERE slug = ${slug} LIMIT 1`;
        if (rows.length > 0) {
            const r = rows[0];
            return {
                slug: r.slug,
                title: r.title,
                excerpt: r.excerpt,
                author: r.author,
                date: r.date,
                readTime: r.read_time,
                image: r.image,
                tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : (r.tags || []),
                content: r.content
            };
        }
    } catch (e: any) {
        console.error(`[Get-Blogs] DB search failed for ${slug}:`, e.message);
    }

    // Fallback to static
    return staticBlogs.find(b => b.slug === slug) || null;
}
