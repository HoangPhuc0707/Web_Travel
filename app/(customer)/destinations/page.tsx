import React from 'react';
import { Metadata } from 'next';
import { DestinationsGrid } from '@/components/home/DestinationsGrid';

export const metadata: Metadata = {
  title: 'Điểm Đến',
  description: 'Khám phá các điểm đến du lịch tuyệt vời nhất cùng PTX Travel.',
};

export default function DestinationsPage() {
  return (
    <>
      <div className="bg-slate-900 pt-24 pb-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Điểm Đến <span className="text-[var(--color-primary)]">Yêu Thích</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Khám phá thế giới qua những chuyến đi cùng PTX Travel. Từ những bãi biển nhiệt đới đến những thành phố cổ kính.
          </p>
        </div>
      </div>
      
      {/* We can reuse the DestinationsGrid from Home page here */}
      <div className="py-12">
        <DestinationsGrid />
      </div>
    </>
  );
}
