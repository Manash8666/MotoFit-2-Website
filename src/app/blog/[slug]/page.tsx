import { blogs as staticBlogs } from '@/data/blogs';
import { getBlogBySlug } from '@/actions/mansi-get-blogs';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';

// Pre-render static blogs
export async function generateStaticParams() {
    return staticBlogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const blog = await getBlogBySlug(params.slug);

    if (!blog) {
        notFound();
    }

    return <BlogPostClient blog={blog} />;
}
