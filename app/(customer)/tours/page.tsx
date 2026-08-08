import React from 'react';
import { getTours } from '@/lib/data';
import { TourCard } from '@/components/tours/TourCard';
import { TourFilter } from '@/components/tours/TourFilter';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Danh sách Tour',
  description: 'Khám phá các tour du lịch trong nước và quốc tế hấp dẫn nhất cùng PTX Travel.',
};

export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const category = params.category as string | undefined;
  const sort = params.sort as string | undefined;
  
  let tours = await getTours();

  if (category && category !== 'all') {
    tours = tours.filter(t => t.category === category);
  }

  if (sort === 'price-asc') {
    tours.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sort === 'price-desc') {
    tours.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sort === 'rating') {
    tours.sort((a, b) => b.rating - a.rating);
  }

  return (
    <>
      <div className="bg-slate-900 pt-24 pb-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Khám Phá Các <span className="text-[var(--color-primary)]">Tours</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Hàng ngàn chuyến đi thú vị đang chờ đón bạn. Lựa chọn hành trình phù hợp nhất và bắt đầu chuyến đi trong mơ của bạn ngay hôm nay.
          </p>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filter */}
            <div className="w-full lg:w-1/4">
              <TourFilter currentCategory={category || 'all'} currentSort={sort || 'default'} />
            </div>

            {/* Tours Grid */}
            <div className="w-full lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-500">
                  Hiển thị <strong className="text-gray-900">{tours.length}</strong> kết quả
                </p>
              </div>

              {tours.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tours.map(tour => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-gray-500 text-lg">Không tìm thấy tour nào phù hợp với bộ lọc của bạn.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
