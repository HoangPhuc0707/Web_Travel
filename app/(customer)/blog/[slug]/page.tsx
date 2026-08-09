import React from 'react';
import { getBlogs } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, User, Tag, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const blogs = await getBlogs();
  const blog = blogs.find(b => b.slug === slug);
  if (!blog) return { title: 'Bài viết không tồn tại' };
  return {
    title: `${blog.title} | PTX Travel Blog`,
    description: blog.excerpt,
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  'Du lịch': 'bg-blue-100 text-blue-700',
  'Kinh nghiệm': 'bg-green-100 text-green-700',
  'Ẩm thực': 'bg-orange-100 text-orange-700',
  'Văn hóa': 'bg-purple-100 text-purple-700',
  'Khám phá': 'bg-teal-100 text-teal-700',
  'Tin tức': 'bg-gray-100 text-gray-600',
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const blogs = await getBlogs();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) notFound();

  const related = blogs
    .filter(b => b.slug !== slug && b.category === blog.category)
    .slice(0, 3);

  return (
    <div className="bg-[var(--color-bg-soft)] min-h-screen">
      <article>
        {/* Hero */}
        <div className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden bg-slate-900">
          {blog.image && (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover opacity-70"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Breadcrumb */}
          <div className="absolute top-24 left-0 right-0 container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-white/70">
              <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/50 line-clamp-1 max-w-xs">{blog.title}</span>
            </nav>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[blog.category] || 'bg-white/20 text-white'}`}>
                {blog.category}
              </span>
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-white leading-tight drop-shadow-lg">
              {blog.title}
            </h1>
          </div>
        </div>

        {/* Meta bar */}
        <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center justify-between py-3 flex-wrap gap-4">
              <div className="flex items-center gap-5 text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-gray-400" /> {blog.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gray-400" /> {blog.date}</span>
                <span className="flex items-center gap-1.5"><Tag className="w-4 h-4 text-gray-400" /> {blog.category}</span>
              </div>
              <Link
                href="/blog"
                className="flex items-center gap-1.5 text-sm text-[var(--color-primary)] font-semibold hover:gap-3 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Về danh sách
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 max-w-3xl py-12">
          {/* Excerpt */}
          <p className="text-xl text-gray-600 leading-relaxed font-medium border-l-4 border-[var(--color-primary)] pl-5 mb-10 italic">
            {blog.excerpt}
          </p>

          {/* Body */}
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-loose
              prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mt-10 prose-headings:mb-4
              prose-h2:text-2xl prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-3
              prose-p:mb-5 prose-p:leading-[1.9]
              prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-img:rounded-2xl prose-img:shadow-md prose-img:my-8
              prose-ul:my-4 prose-li:mb-2
              prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: blog.content || '<p>Bài viết chưa có nội dung.</p>' }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
            <span className="text-sm font-semibold text-gray-500 mr-2 self-center">Tags:</span>
            <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-[var(--color-primary)] transition-colors cursor-default">Du lịch</span>
            <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-[var(--color-primary)] transition-colors cursor-default">{blog.category}</span>
            <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-[var(--color-primary)] transition-colors cursor-default">Kinh nghiệm</span>
          </div>

          {/* Back CTA */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Xem tất cả bài viết
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-white border-t border-gray-100 py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-heading font-bold text-2xl text-gray-900">Bài viết liên quan</h2>
                <p className="text-gray-500 text-sm mt-1">Cùng chủ đề {blog.category}</p>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-[var(--color-primary)] hover:underline flex items-center gap-1">
                Xem tất cả <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(rel => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group bg-[var(--color-bg-soft)] rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden">
                    {rel.image ? (
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100" />
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                      <Calendar className="w-3 h-3" /> {rel.date}
                    </div>
                    <h3 className="font-heading font-bold text-base text-gray-900 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors mb-2 leading-snug">
                      {rel.title}
                    </h3>
                    <p className="text-gray-500 text-xs line-clamp-2 flex-1">{rel.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
