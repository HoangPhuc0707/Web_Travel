import { NextResponse } from 'next/server';
import { getTours } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const tours = await getTours();
  const tour = tours.find(t => t.slug === slug);

  if (!tour) {
    return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
  }

  return NextResponse.json(tour);
}
