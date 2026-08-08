import prisma from '../lib/prisma'
import fs from 'fs'
import path from 'path'

async function main() {
  console.log('Starting seed...')
  
  // 1. Seed Tours
  const toursPath = path.join(process.cwd(), 'data', 'tours.json')
  if (fs.existsSync(toursPath)) {
    const toursData = JSON.parse(fs.readFileSync(toursPath, 'utf8'))
    console.log(`Found ${toursData.length} tours. Seeding...`)
    
    for (const tour of toursData) {
      await prisma.tour.upsert({
        where: { slug: tour.slug },
        update: {},
        create: {
          slug: tour.slug,
          title: tour.title,
          price: parseInt(String(tour.price).replace(/\D/g, '') || '0'),
          originalPrice: tour.priceOriginal ? parseInt(String(tour.priceOriginal).replace(/\D/g, '') || '0') : null,
          duration: tour.duration,
          location: tour.location,
          destination: tour.destination,
          rating: parseFloat(tour.rating || '5.0'),
          reviews: parseInt(tour.reviews || '0'),
          image: tour.img?.startsWith('/') ? tour.img : `/${tour.img}`,
          images: JSON.stringify(tour.gallery ? tour.gallery.map((g: string) => g.startsWith('/') ? g : `/${g}`) : []),
          category: tour.category,
          isNew: tour.isNew || false,
          featured: tour.featured || false,
          slots: tour.slots ? parseInt(tour.slots) : null,
          description: tour.description || '',
          itinerary: JSON.stringify(tour.itinerary || []),
          includes: JSON.stringify(tour.includes || []),
          excludes: JSON.stringify(tour.excludes || []),
          departures: JSON.stringify(tour.departures || []),
          highlights: JSON.stringify(tour.highlights || []),
          badges: JSON.stringify(tour.badges || []),
        }
      })
    }
    console.log('✅ Tours seeded successfully')
  }

  // 2. Seed Blogs
  const blogsPath = path.join(process.cwd(), 'data', 'blogs.json')
  if (fs.existsSync(blogsPath)) {
    const blogsData = JSON.parse(fs.readFileSync(blogsPath, 'utf8'))
    console.log(`Found ${blogsData.length} blogs. Seeding...`)
    
    for (const blog of blogsData) {
      await prisma.blog.upsert({
        where: { slug: blog.slug },
        update: {},
        create: {
          slug: blog.slug,
          title: blog.title,
          date: blog.date,
          author: blog.author,
          category: blog.category,
          image: blog.img?.startsWith('/') ? blog.img : `/${blog.img}`,
          excerpt: blog.excerpt,
          content: blog.content || '',
        }
      })
    }
    console.log('✅ Blogs seeded successfully')
  }

}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
