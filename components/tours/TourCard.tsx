import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, MapPin, Star, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export interface TourCardProps {
  tour: {
    slug: string;
    image: string;
    title: string;
    location: string;
    duration: string;
    rating: number;
    reviews: number;
    price: number | string;
    originalPrice?: number | string | null;
    isNew?: boolean;
    slots?: number | null;
  };
}

function formatPrice(price: number | string) {
  if (typeof price === 'string') return price;
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_10px_40px_rgba(0,87,184,0.12)] hover:-translate-y-1.5 overflow-hidden transition-all duration-300 flex flex-col h-full">
      {/* Image Wrapper */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {tour.isNew && (
            <Badge variant="blue">New</Badge>
          )}
          {tour.slots !== undefined && tour.slots !== null && tour.slots < 5 && (
            <Badge variant="red">Chỉ còn {tour.slots} chỗ</Badge>
          )}
        </div>
        
        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-colors" aria-label="Add to wishlist">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
            <span>{tour.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[var(--color-primary)]" />
            <span>{tour.duration}</span>
          </div>
        </div>
        
        <Link href={`/tours/${tour.slug}`}>
          <h3 className="font-heading font-bold text-xl text-gray-900 leading-snug mb-3 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
            {tour.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-4">
          <div className="flex items-center text-amber-500">
            <Star className="w-4 h-4 fill-current" />
          </div>
          <span className="font-semibold text-gray-900 ml-1">{tour.rating.toFixed(1)}</span>
          <span className="text-gray-500 text-sm">({tour.reviews} đánh giá)</span>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Giá chỉ từ</span>
            <div className="flex items-center gap-2">
              <strong className="text-xl font-bold text-[var(--color-red)]">
                {formatPrice(tour.price)}
              </strong>
              {tour.originalPrice && (
                <del className="text-sm text-gray-400 font-medium">
                  {formatPrice(tour.originalPrice)}
                </del>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
