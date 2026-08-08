import React from 'react';
import { getTours } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Clock, Star, Users, Check, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { StickyBookingCTA } from '@/components/tours/StickyBookingCTA';
import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const tours = await getTours();
  const tour = tours.find(t => t.slug === slug);
  
  if (!tour) return { title: 'Tour không tồn tại' };
  
  return {
    title: tour.title,
    description: tour.description || `Khám phá tour ${tour.title} cùng PTX Travel.`,
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const tours = await getTours();
  const tour = tours.find(t => t.slug === slug);

  if (!tour) {
    notFound();
  }

  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') return price;
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <>
      {/* Page Hero */}
      <div className="bg-slate-900 pt-24 pb-16 text-white relative">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image src={tour.image} alt={tour.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col gap-4 max-w-4xl">
            <div className="flex gap-2">
              <Badge variant="blue">{tour.category}</Badge>
              {tour.slots !== undefined && tour.slots < 5 && (
                <Badge variant="red">Chỉ còn {tour.slots} chỗ</Badge>
              )}
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-5xl leading-tight">
              {tour.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 mt-2 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                <span>{tour.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--color-primary)]" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-amber-400">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold text-white">{tour.rating}</span>
                <span className="text-slate-400">({tour.reviews} đánh giá)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            {/* Overview */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-8 shadow-sm">
              <h2 className="font-heading font-bold text-2xl mb-4 text-gray-900">Tổng quan chuyến đi</h2>
              <p className="text-gray-600 leading-relaxed">
                {tour.description || "Đây là hành trình tuyệt vời đưa bạn đến những địa danh nổi tiếng, trải nghiệm văn hóa độc đáo và thưởng thức ẩm thực đặc sắc. Với kinh nghiệm tổ chức tour chuyên nghiệp, PTX Travel cam kết mang đến cho bạn một chuyến đi an toàn, thoải mái và trọn vẹn nhất."}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Khởi hành</span>
                  <strong className="text-gray-900">Hàng tuần</strong>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Thời gian</span>
                  <strong className="text-gray-900">{tour.duration}</strong>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Phương tiện</span>
                  <strong className="text-gray-900">Ô tô, Máy bay</strong>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Khách sạn</span>
                  <strong className="text-gray-900">3 - 4 Sao</strong>
                </div>
              </div>
            </div>

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-8 shadow-sm">
                <h2 className="font-heading font-bold text-2xl mb-6 text-gray-900">Lịch trình chi tiết</h2>
                <div className="relative border-l-2 border-gray-100 ml-4 lg:ml-6 flex flex-col gap-8">
                  {tour.itinerary.map((day, idx) => (
                    <div key={idx} className="relative pl-8">
                      <div className="absolute w-8 h-8 rounded-full bg-[var(--color-primary-light)] border-4 border-white text-[var(--color-primary)] flex items-center justify-center -left-[17px] top-0 font-bold text-sm shadow-sm">
                        {idx + 1}
                      </div>
                      <h3 className="font-bold text-lg text-[var(--color-primary)] mb-1">{day.day}</h3>
                      <h4 className="font-semibold text-gray-900 mb-3">{day.title}</h4>
                      <p className="text-gray-600 leading-relaxed text-sm">{day.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sticky top-24">
              <div className="text-center pb-6 border-b border-gray-100 mb-6">
                <div className="text-sm text-gray-500 mb-2">Giá ưu đãi từ</div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <strong className="text-3xl font-extrabold text-[var(--color-red)]">
                    {formatPrice(tour.price)}
                  </strong>
                </div>
                {tour.originalPrice && (
                  <div className="text-sm text-gray-400 line-through">
                    {formatPrice(tour.originalPrice)}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Cam kết giá tốt nhất</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Hỗ trợ tư vấn 24/7</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Bảo hiểm du lịch 100%</span>
                </div>
              </div>

              <Button variant="red" size="lg" className="w-full h-14" asChild>
                <Link href={`/booking?tour=${tour.slug}`}>
                  <Calendar className="w-5 h-5 mr-2" /> Đặt Tour Này
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="w-full h-14 mt-3" asChild>
                <a href="tel:02103825678">Tư Vấn Thêm</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <StickyBookingCTA tour={tour} />
    </>
  );
}
