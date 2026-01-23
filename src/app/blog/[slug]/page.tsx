import { blogs } from '@/data/blogs';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';

// For Static Export
export async function generateStaticParams() {
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const blog = blogs.find(b => b.slug === params.slug);

    if (!blog) {
        notFound();
    }

    return <BlogPostClient blog={blog} />;
}
