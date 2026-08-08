import React from 'react';
import { getBlogs } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Du Lịch',
  description: 'Cẩm nang du lịch, kinh nghiệm, và những câu chuyện thú vị trên những chuyến đi.',
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      <div className="bg-slate-900 pt-24 pb-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Cẩm Nang <span className="text-[var(--color-primary)]">Du Lịch</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Khám phá những câu chuyện thú vị, kinh nghiệm hữu ích và thông tin mới nhất về các điểm đến trên toàn thế giới.
          </p>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <div key={blog.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col group">
                <Link href={`/blog/${blog.slug}`} className="block relative h-56 w-full overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs font-semibold text-[var(--color-primary)] mb-3">
                    <span>{blog.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{blog.category}</span>
                  </div>
                  <Link href={`/blog/${blog.slug}`}>
                    <h3 className="font-heading font-bold text-xl text-gray-900 leading-snug mb-3 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                    {blog.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Link href={`/blog/${blog.slug}`} className="text-[var(--color-primary)] font-semibold text-sm hover:underline">
                      Đọc tiếp →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
