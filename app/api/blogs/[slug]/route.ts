import { NextResponse } from 'next/server';
import { getBlogs } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const blogs = await getBlogs();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  return NextResponse.json(blog);
}
