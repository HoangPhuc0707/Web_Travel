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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;
    const data = await request.json();
    
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
      images: typeof data.images === 'string' ? data.images : JSON.stringify(data.images || []),
      itinerary: typeof data.itinerary === 'string' ? data.itinerary : JSON.stringify(data.itinerary || []),
      includes: typeof data.includes === 'string' ? data.includes : JSON.stringify(data.includes || []),
      excludes: typeof data.excludes === 'string' ? data.excludes : JSON.stringify(data.excludes || []),
      departures: typeof data.departures === 'string' ? data.departures : JSON.stringify(data.departures || []),
      highlights: typeof data.highlights === 'string' ? data.highlights : JSON.stringify(data.highlights || []),
      badges: typeof data.badges === 'string' ? data.badges : JSON.stringify(data.badges || []),
    };

    // Remove id from payload if it exists
    delete tourData.id;

    const prismaModule = await import('@/lib/prisma');
    const prisma = prismaModule.default;

    const tour = await prisma.tour.update({
      where: { slug },
      data: tourData
    });

    return NextResponse.json(tour);
  } catch (error: any) {
    console.error('Update tour error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update tour' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;
    const prismaModule = await import('@/lib/prisma');
    const prisma = prismaModule.default;

    await prisma.tour.delete({
      where: { slug }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete tour error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete tour' }, { status: 500 });
  }
}
