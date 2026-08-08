import React from 'react';
import { getBlogs } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import { Calendar, User, Tag } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const blogs = await getBlogs();
  const blog = blogs.find(b => b.slug === slug);
  
  if (!blog) return { title: 'Bài viết không tồn tại' };
  
  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const blogs = await getBlogs();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="bg-white">
      {/* Header */}
      <div className="container mx-auto px-4 max-w-4xl pt-24 pb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--color-primary)] font-semibold mb-4">
          <Tag className="w-4 h-4" />
          <span>{blog.category}</span>
        </div>
        <h1 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 leading-tight mb-6">
          {blog.title}
        </h1>
        <div className="flex items-center gap-6 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{blog.date}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-4 max-w-5xl mb-12">
        <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg">
          <Image src={blog.image} alt={blog.title} fill className="object-cover" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl pb-20">
        <div 
          className="prose prose-lg max-w-none text-gray-700 leading-loose
            prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900
            prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-sm"
          dangerouslySetInnerHTML={{ __html: blog.content || '' }}
        />
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
          <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">Du lịch</span>
          <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">{blog.category}</span>
          <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">Kinh nghiệm</span>
        </div>
      </div>
    </article>
  );
}
