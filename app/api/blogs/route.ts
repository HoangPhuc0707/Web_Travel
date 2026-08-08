import { NextResponse } from 'next/server';
import { getBlogs } from '@/lib/data';

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
