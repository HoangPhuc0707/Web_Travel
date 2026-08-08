import prisma from './prisma';

export interface Tour {
  id: string | number;
  title: string;
  slug: string;
  price: string | number;
  originalPrice?: string | number | null;
  duration: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  category: string;
  isNew?: boolean;
  featured?: boolean;
  slots?: number | null;
  itinerary?: { day: string; title: string; content: string }[];
  description?: string | null;
  [key: string]: any;
}

export interface Blog {
  id: string | number;
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
  content?: string | null;
  [key: string]: any;
}

export async function getTours(): Promise<Tour[]> {
  try {
    const rawTours = await prisma.tour.findMany({
      where: { isHidden: false },
      orderBy: { createdAt: 'desc' }
    });
    
    return rawTours.map((tour: any) => ({
      ...tour,
      images: tour.images ? JSON.parse(tour.images) : [],
      itinerary: tour.itinerary ? JSON.parse(tour.itinerary) : [],
      includes: tour.includes ? JSON.parse(tour.includes) : [],
      excludes: tour.excludes ? JSON.parse(tour.excludes) : [],
      departures: tour.departures ? JSON.parse(tour.departures) : [],
      highlights: tour.highlights ? JSON.parse(tour.highlights) : [],
      badges: tour.badges ? JSON.parse(tour.badges) : [],
    }));
  } catch (error) {
    console.error('Error reading tours data from DB:', error);
    return [];
  }
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    const rawBlogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return rawBlogs.map((blog: any) => ({
      ...blog
    }));
  } catch (error) {
    console.error('Error reading blogs data from DB:', error);
    return [];
  }
}
