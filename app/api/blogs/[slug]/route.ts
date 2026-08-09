import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const blog = await prisma.blog.findUnique({ where: { slug } });

  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  return NextResponse.json(blog);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;
    const data = await request.json();

    const blog = await prisma.blog.update({
      where: { slug },
      data: {
        title: data.title,
        slug: data.slug,
        date: data.date,
        author: data.author,
        category: data.category,
        image: data.image,
        excerpt: data.excerpt,
        content: data.content,
      },
    });

    return NextResponse.json(blog);
  } catch (error: any) {
    console.error('Update blog error:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Blog không tồn tại' }, { status: 404 });
    }
    return NextResponse.json({ error: error.message || 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;
    await prisma.blog.delete({ where: { slug } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete blog error:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Blog không tồn tại' }, { status: 404 });
    }
    return NextResponse.json({ error: error.message || 'Failed to delete blog' }, { status: 500 });
  }
}
