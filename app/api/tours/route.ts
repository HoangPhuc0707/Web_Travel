import { NextResponse } from 'next/server';
import { getTours } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const isNew = searchParams.get('isNew');
  const featured = searchParams.get('featured');
  const limit = searchParams.get('limit');
  
  let tours = await getTours();

  if (category) tours = tours.filter(t => t.category === category);
  if (isNew) tours = tours.filter(t => t.isNew === (isNew === 'true'));
  if (featured) tours = tours.filter(t => t.featured === (featured === 'true'));
  
  if (limit) {
    tours = tours.slice(0, parseInt(limit));
  }

  return NextResponse.json(tours);
}
