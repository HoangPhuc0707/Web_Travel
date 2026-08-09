export const dynamic = 'force-dynamic';
import React from 'react';
import { getBlogs } from '@/lib/data';
import { Metadata } from 'next';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
  title: 'Blog Du Lịch | PTX Travel',
  description: 'Cẩm nang du lịch, kinh nghiệm, và những câu chuyện thú vị trên những chuyến đi.',
};

export default async function BlogPage() {
  const blogs = await getBlogs();
  return <BlogListClient blogs={blogs} />;
}
