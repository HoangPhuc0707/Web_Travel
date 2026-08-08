"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

export function BlogPreview() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/blogs?limit=3')
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <section className="section bg-[var(--color-bg-soft)]">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          label="Cẩm Nang Du Lịch"
          title={<>Tin Tức & <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--color-primary)_0%,#0083FF_100%)]">Kinh Nghiệm</span></>}
          subtitle="Cập nhật những thông tin du lịch mới nhất và bí kíp hữu ích cho chuyến đi của bạn."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <Link href={`/blog/${blog.slug}`} className="block relative h-48 w-full overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs font-semibold text-[var(--color-primary)] mb-3">
                  <span>{blog.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>{blog.category}</span>
                </div>
                <Link href={`/blog/${blog.slug}`}>
                  <h3 className="font-heading font-bold text-lg text-gray-900 leading-snug mb-3 hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                  {blog.excerpt}
                </p>
                <div className="mt-auto">
                  <Link href={`/blog/${blog.slug}`} className="text-[var(--color-primary)] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Đọc tiếp <span>→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="/blog">Xem Tất Cả Bài Viết</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
