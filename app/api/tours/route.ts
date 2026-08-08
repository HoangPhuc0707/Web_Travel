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

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Convert to numbers and format appropriately
    const tourData = {
      ...data,
      price: parseInt(String(data.price).replace(/\D/g, '') || '0'),
      originalPrice: data.originalPrice ? parseInt(String(data.originalPrice).replace(/\D/g, '') || '0') : null,
      rating: parseFloat(String(data.rating || '5.0')),
      reviews: parseInt(String(data.reviews || '0')),
      slots: data.slots ? parseInt(String(data.slots)) : null,
      isNew: Boolean(data.isNew),
      featured: Boolean(data.featured),
      isHidden: Boolean(data.isHidden),
      // Arrays are passed as stringified JSON from the frontend for simplicity, or we can handle it here
      images: typeof data.images === 'string' ? data.images : JSON.stringify(data.images || []),
      itinerary: typeof data.itinerary === 'string' ? data.itinerary : JSON.stringify(data.itinerary || []),
      includes: typeof data.includes === 'string' ? data.includes : JSON.stringify(data.includes || []),
      excludes: typeof data.excludes === 'string' ? data.excludes : JSON.stringify(data.excludes || []),
      departures: typeof data.departures === 'string' ? data.departures : JSON.stringify(data.departures || []),
      highlights: typeof data.highlights === 'string' ? data.highlights : JSON.stringify(data.highlights || []),
      badges: typeof data.badges === 'string' ? data.badges : JSON.stringify(data.badges || []),
    };

    // We must use Prisma directly to create
    const { PrismaClient } = await import('@prisma/client');
    const { PrismaLibSql } = await import('@prisma/adapter-libsql');
    
    // Instead of instantiating Prisma directly here, we should import it from lib/prisma
    const prismaModule = await import('@/lib/prisma');
    const prisma = prismaModule.default;

    const tour = await prisma.tour.create({
      data: tourData
    });

    return NextResponse.json(tour, { status: 201 });
  } catch (error: any) {
    console.error('Create tour error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create tour' }, { status: 500 });
  }
}
