'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Calendar, User, ArrowRight, ChevronLeft, ChevronRight, Tag } from 'lucide-react';

const CATEGORIES = ['Tất cả', 'Du lịch', 'Kinh nghiệm', 'Ẩm thực', 'Văn hóa', 'Khám phá', 'Tin tức'];
const PER_PAGE = 6;

const CATEGORY_COLORS: Record<string, string> = {
  'Du lịch': 'bg-blue-100 text-blue-700',
  'Kinh nghiệm': 'bg-green-100 text-green-700',
  'Ẩm thực': 'bg-orange-100 text-orange-700',
  'Văn hóa': 'bg-purple-100 text-purple-700',
  'Khám phá': 'bg-teal-100 text-teal-700',
  'Tin tức': 'bg-gray-100 text-gray-600',
};

export default function BlogListClient({ blogs }: { blogs: any[] }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [page, setPage] = useState(1);

  // Featured = first blog
  const featured = blogs[0];
  const restBlogs = blogs.slice(1);

  const filtered = useMemo(() => {
    return restBlogs.filter(b => {
      const matchCat = activeCategory === 'Tất cả' || b.category === activeCategory;
      const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        b.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [restBlogs, activeCategory, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-28 pb-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #0057B8 0%, transparent 60%), radial-gradient(circle at 70% 50%, #E8192C 0%, transparent 60%)' }} />
        <div className="container mx-auto px-4 relative">
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-blue-200 text-sm font-semibold rounded-full mb-4 border border-white/10">
            📝 Cẩm nang du lịch
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4 leading-tight">
            Blog <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Du Lịch</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Khám phá những câu chuyện thú vị, kinh nghiệm hữu ích và thông tin mới nhất về các điểm đến trên toàn thế giới.
          </p>
        </div>
      </div>

      <section className="bg-[var(--color-bg-soft)] min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-12">

          {/* Featured blog */}
          {featured && (
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-8 h-0.5 bg-[var(--color-primary)]" />
                <span className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">Bài viết nổi bật</span>
              </div>
              <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[featured.category] || 'bg-gray-100 text-gray-600'}`}>
                      {featured.category}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {featured.date}
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-2xl lg:text-3xl text-gray-900 mb-4 leading-tight group-hover:text-[var(--color-primary)] transition-colors line-clamp-3">
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 line-clamp-3 mb-6 leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{featured.author}</span>
                    </div>
                    <span className="ml-auto inline-flex items-center gap-1.5 text-[var(--color-primary)] font-semibold text-sm group-hover:gap-3 transition-all">
                      Đọc bài <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Filter + Search bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-[var(--color-primary)] text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Tìm kiếm bài viết..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] shadow-sm"
              />
            </div>
          </div>

          {/* Blog grid */}
          {paginated.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-xl font-medium mb-2">Không tìm thấy bài viết</p>
              <p className="text-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {paginated.map(blog => (
                <article
                  key={blog.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  <Link href={`/blog/${blog.slug}`} className="block relative h-52 overflow-hidden">
                    {blog.image ? (
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <Tag className="w-12 h-12 text-blue-200" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${CATEGORY_COLORS[blog.category] || 'bg-gray-100 text-gray-600'}`}>
                        {blog.category}
                      </span>
                    </div>
                  </Link>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{blog.date}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{blog.author}</span>
                    </div>

                    <Link href={`/blog/${blog.slug}`}>
                      <h3 className="font-heading font-bold text-lg text-gray-900 leading-snug mb-2.5 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                    </Link>

                    <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1 leading-relaxed">
                      {blog.excerpt}
                    </p>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 text-[var(--color-primary)] font-semibold text-sm hover:gap-3 transition-all mt-auto"
                    >
                      Đọc tiếp <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                    page === p
                      ? 'bg-[var(--color-primary)] text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
