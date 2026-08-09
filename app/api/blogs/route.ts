import { NextResponse } from 'next/server';
import { getBlogs } from '@/lib/data';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = searchParams.get('limit');
  
  let blogs = await getBlogs();

  if (category) blogs = blogs.filter(b => b.category === category);
  
  if (limit) {
    blogs = blogs.slice(0, parseInt(limit));
  }

  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc (tiêu đề, slug, nội dung)' }, { status: 400 });
    }

    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        slug: data.slug,
        date: data.date || new Date().toLocaleDateString('vi-VN'),
        author: data.author || 'Admin',
        category: data.category || 'Du lịch',
        image: data.image || '',
        excerpt: data.excerpt || '',
        content: data.content,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    console.error('Create blog error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug đã tồn tại, vui lòng chọn slug khác' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create blog' }, { status: 500 });
  }
}
